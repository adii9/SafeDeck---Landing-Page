/**
 * SafeDeck API Utility
 * Central module for all backend API calls using the existing AWS API Gateway endpoints.
 */

const API_KEY = import.meta.env.VITE_AWS_API_KEY;

const USER_SYNC_URL = 'https://i7az96pt3l.execute-api.eu-north-1.amazonaws.com/default/user-sync';
const AUDITS_URL = 'https://zh2feylzki.execute-api.eu-north-1.amazonaws.com/default/audits';

/**
 * POST to user-sync API with the nested payload format it expects.
 */
const userSyncPost = async (bodyPayload) => {
  const response = await fetch(USER_SYNC_URL, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      httpMethod: 'POST',
      body: JSON.stringify(bodyPayload),
      headers: { 'Content-Type': 'application/json' },
      requestContext: { identity: { sourceIp: '127.0.0.1' } },
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

/**
 * Step 1: Login with Google access token.
 * Fetches user info from Google, then syncs with our backend.
 * Returns { userId, email, name, picture, isNewUser, user }
 */
export const loginWithGoogle = async (accessToken) => {
  // 1. Get user info from Google
  const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!userInfoRes.ok) throw new Error('Failed to fetch Google user info');
  const userInfo = await userInfoRes.json();

  // 2. Sync with backend — returns isNewUser + full user record
  const syncData = await userSyncPost({
    userId: userInfo.sub,
    email: userInfo.email,
  });

  // API Gateway sometimes wraps the body as a string — parse it defensively
  const data = typeof syncData.body === 'string'
    ? JSON.parse(syncData.body)
    : (syncData.body || syncData);

  const result = {
    userId: userInfo.sub,
    email: userInfo.email,
    name: userInfo.name,
    picture: userInfo.picture,
    givenName: userInfo.given_name,
    isNewUser: data.isNewUser ?? true,
    user: data.user || {},
  };

  // Persist so Dashboard (and any other page) can read user info without prop drilling
  localStorage.setItem('safedeck_user', JSON.stringify(result));

  return result;
};

/**
 * Step 2: Save fund profile details.
 */
export const saveFundProfile = async ({ userId, email, fundName, role, website, volume }) => {
  return userSyncPost({
    userId,
    email,
    fund_name: fundName,
    role,
    website: website || '',
    decks_per_month: volume,
  });
};

/**
 * Step 3: Save Google Sheet URL.
 */
export const saveSheetUrl = async ({ userId, email, sheetUrl }) => {
  return userSyncPost({
    userId,
    email,
    sheet_url: sheetUrl,
  });
};

/**
 * Step 4: Save Google Drive folder ID.
 */
export const saveDriveFolderId = async ({ userId, email, driveFolderId }) => {
  return userSyncPost({
    userId,
    email,
    drive_folder_id: driveFolderId,
  });
};

/**
 * Step 5: Save email routing preference.
 */
export const saveEmailRouting = async ({ userId, email, safedeckEmail }) => {
  return userSyncPost({
    userId,
    email,
    safedeck_email: safedeckEmail,
    email_routing_enabled: true,
  });
};

/**
 * Fetch all audits for the dashboard.
 */
export const fetchAudits = async () => {
  const response = await fetch(AUDITS_URL, {
    headers: { 'x-api-key': API_KEY },
  });
  if (!response.ok) throw new Error(`Fetch audits failed: ${response.status}`);
  return response.json();
};

/**
 * Create a new Razorpay order.
 */
export const createOrder = async ({ userId, email, plan }) => {
  const response = await fetch('https://nbp2cx7kfh.execute-api.eu-north-1.amazonaws.com/default/create-order', {
    method: 'POST',
    headers: {
      'x-api-key': 'nC5x6EXSgB5h2pNSauKsH77VZivYjJAo7k0yVZqZ',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, email, plan }),
  });
  if (!response.ok) throw new Error(`Failed to create order: ${response.status}`);

  const responseData = await response.json();
  let data = responseData.body || responseData;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      data = { id: data };
    }
  }
  return data;
};

export const verifyPayment = async ({ userId, razorpayOrderId, razorpayPaymentId, razorpaySignature }) => {
  const payload = {
    user_id: userId,
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
  };

  const response = await fetch('https://nbp2cx7kfh.execute-api.eu-north-1.amazonaws.com/default/verify-payment', {
    method: 'POST',
    headers: {
      'x-api-key': 'nC5x6EXSgB5h2pNSauKsH77VZivYjJAo7k0yVZqZ',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      httpMethod: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      requestContext: { identity: { sourceIp: '127.0.0.1' } },
    }),
  });
  if (!response.ok) throw new Error(`Failed to verify payment: ${response.status}`);

  const responseData = await response.json();
  let data = responseData.body || responseData;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      data = { result: data };
    }
  }
  return data;
};

/**
 * Check if the user's subscription is active.
 * Returns { is_active, subscription_status, plan, expires_at }
 */
export const getSubscriptionStatus = async (userId) => {
  const response = await fetch('https://7knp3nowoi4muemvcc3gavxfuu0pibru.lambda-url.eu-north-1.on.aws/', {
    method: 'POST',
    headers: {
      'x-api-key': 'nC5x6EXSgB5h2pNSauKsH77VZivYjJAo7k0yVZqZ',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId }),
  });
  if (!response.ok) throw new Error(`Failed to check subscription: ${response.status}`);

  const data = await response.json();
  return data;
};
