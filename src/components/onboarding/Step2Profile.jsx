import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { saveFundProfile } from '../../utils/api';

const slideVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const inputStyle = (focused, field) => ({
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${focused === field ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)'}`,
  borderRadius: '10px',
  color: 'white',
  fontSize: '0.95rem',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s ease',
});

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  marginBottom: '0.4rem',
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
};

const volumeOptions = ['1–20', '20–50', '50–100', '100+'];

const Step2Profile = ({ onNext, data, setData, user }) => {
  const [focused, setFocused] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const isReturning = user && !user.isNewUser;

  // Pre-fill from the saved user record on first render if fields are blank
  React.useEffect(() => {
    const saved = user?.user || {};
    setData(prev => ({
      fundName: prev.fundName || saved.fund_name || '',
      role: prev.role || saved.role || '',
      website: prev.website || saved.website || '',
      volume: prev.volume || saved.decks_per_month || '',
    }));
  }, [user]);

  const handleChange = (key, val) => setData(prev => ({ ...prev, [key]: val }));

  const isValid = data.fundName && data.role && data.volume;

  const handleContinue = async () => {
    if (!isValid) return;
    setSaving(true);
    setError('');
    try {
      await saveFundProfile({
        userId: user?.userId,
        email: user?.email,
        fundName: data.fundName,
        role: data.role,
        website: data.website,
        volume: data.volume,
      });
      onNext();
    } catch (err) {
      console.error('Failed to save fund profile:', err);
      setError('Failed to save. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
      {/* User greeting + returning badge */}
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: isReturning ? 'rgba(16, 185, 129, 0.06)' : 'rgba(6, 182, 212, 0.05)', border: `1px solid ${isReturning ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.15)'}`, borderRadius: '10px', marginBottom: '1.5rem' }}>
          {user.picture && <img src={user.picture} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />}
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{user.email}</div>
          </div>
          <div style={{ marginLeft: 'auto', padding: '0.25rem 0.6rem', background: isReturning ? 'rgba(16, 185, 129, 0.12)' : 'rgba(6, 182, 212, 0.1)', border: `1px solid ${isReturning ? 'rgba(16, 185, 129, 0.3)' : 'rgba(6, 182, 212, 0.2)'}`, borderRadius: '6px', color: isReturning ? '#10b981' : 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
            {isReturning ? '↩ Welcome back!' : '✓ Verified'}
          </div>
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '0.3rem' }}>
          {isReturning ? 'Update your fund details' : 'Tell us about your fund'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          {isReturning ? 'Your saved details are pre-filled — update anything that has changed.' : 'This helps us personalise your SafeDeck experience.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label style={labelStyle}>Fund Name <span style={{ color: 'var(--accent-red)' }}>*</span></label>
          <input
            style={inputStyle(focused, 'fundName')}
            placeholder="e.g. Blume Ventures, Titan Capital"
            value={data.fundName || ''}
            onChange={e => handleChange('fundName', e.target.value)}
            onFocus={() => setFocused('fundName')}
            onBlur={() => setFocused(null)}
          />
        </div>

        <div>
          <label style={labelStyle}>Your Role <span style={{ color: 'var(--accent-red)' }}>*</span></label>
          <input
            style={inputStyle(focused, 'role')}
            placeholder="e.g. Partner, Analyst, Operations"
            value={data.role || ''}
            onChange={e => handleChange('role', e.target.value)}
            onFocus={() => setFocused('role')}
            onBlur={() => setFocused(null)}
          />
        </div>

        <div>
          <label style={labelStyle}>Fund Website</label>
          <input
            style={inputStyle(focused, 'website')}
            placeholder="https://yourfund.com"
            value={data.website || ''}
            onChange={e => handleChange('website', e.target.value)}
            onFocus={() => setFocused('website')}
            onBlur={() => setFocused(null)}
          />
        </div>

        <div>
          <label style={labelStyle}>Pitch decks received per month <span style={{ color: 'var(--accent-red)' }}>*</span></label>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            {volumeOptions.map(opt => (
              <button
                key={opt}
                onClick={() => handleChange('volume', opt)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: data.volume === opt ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
                  background: data.volume === opt ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255,255,255,0.03)',
                  color: data.volume === opt ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  fontWeight: data.volume === opt ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.85rem' }}>
          ❌ {error}
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={!isValid || saving}
        style={{
          marginTop: '1.5rem',
          padding: '0.9rem 2rem',
          background: isValid && !saving ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))' : 'rgba(255,255,255,0.08)',
          color: isValid && !saving ? 'white' : 'var(--text-secondary)',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: isValid && !saving ? 'pointer' : 'not-allowed',
          float: 'right',
          fontFamily: 'Inter, sans-serif',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {saving && <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
        {saving ? 'Saving...' : 'Continue →'}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
};

export default Step2Profile;
