import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, FileText, CheckCircle, Clock, Search, ChevronRight, Loader, X, BarChart2, Users, Target, AlertTriangle, CreditCard } from 'lucide-react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import DeckModal from '../components/DeckModal';
import { getSubscriptionStatus } from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // null = loading, 'active'/'inactive' = set
  const [subCheckError, setSubCheckError] = useState('');

  // Read persisted user from localStorage (written by Hero login or Onboarding flow)
  const [currentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('safedeck_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = currentUser?.givenName || currentUser?.name?.split(' ')[0] || 'there';
  const fundName = currentUser?.user?.fund_name || null;
  const fundRole = currentUser?.user?.role || null;

  useEffect(() => {
    // 1. Check subscription status first
    const checkSubscription = async () => {
      if (!currentUser?.userId) {
        setSubscriptionStatus('inactive');
        setLoading(false);
        return;
      }

      try {
        const status = await getSubscriptionStatus(currentUser.userId);
        setSubscriptionStatus(status.is_active ? 'active' : 'inactive');
      } catch (err) {
        console.error('Subscription check failed:', err);
        setSubCheckError('Could not verify subscription. Showing limited access.');
        setSubscriptionStatus('inactive'); // fail safe — show paywall
      }
    };

    checkSubscription();
  }, [currentUser]);

  useEffect(() => {
    // 2. Fetch decks only after subscription check resolves
    if (subscriptionStatus === null) return; // still loading

    const fetchDecks = async () => {
      try {
        const response = await fetch('https://zh2feylzki.execute-api.eu-north-1.amazonaws.com/default/audits', {
          headers: {
            'x-api-key': import.meta.env.VITE_AWS_API_KEY
          }
        });
        
        if (response.ok) {
          let data = await response.json();
          // API gateway might return body as a string containing JSON array.
          if (data.body && typeof data.body === 'string') {
             try {
               data = JSON.parse(data.body);
             } catch(e) { console.error('Failed to parse response body', e); }
          }
          
          const decksData = Array.isArray(data) ? data : [];
          
          const parseAuditResult = (auditStr) => {
            if (!auditStr) return null;
            try {
              // Extract JSON from markdown
              const match = auditStr.match(/```json\s([\s\S]*?)\s```/);
              if (match && match[1]) return JSON.parse(match[1]);
              // Fallback
              return JSON.parse(auditStr);
            } catch(e) {
              return null;
            }
          };
          
          const mappedDecks = decksData.map((item, index) => {
            const details = parseAuditResult(item.audit_result) || {};
            
            // Extract the FY25A string safely
            let revenue = details['Revenue (Amount)'] || details['Current Round Exp Valuation'] || 'N/A';
            if (typeof details['Revenue (Year)'] === 'object') {
              revenue = details['Revenue (Year)'].FY25A || revenue;
            }
            
            return {
              id: item.id || item.audit_id || index,
              name: details.Company || item.company_name || 'Untitled Deck',
              status: 'Completed',
              sector: details.Sector || 'General',
              revenue: revenue,
              date: item.timestamp ? new Date(item.timestamp).toLocaleDateString() : new Date().toLocaleDateString(),
              details: details
            };
          });
          
          setDecks(mappedDecks);
        } else {
          console.error('Failed to fetch decks:', response.status);
        }
      } catch (error) {
        console.error('Error fetching decks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDecks();
  }, []);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('safedeck_user');
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'var(--accent-cyan)';
      case 'Processing': return 'var(--accent-purple)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'var(--accent-purple)',
        filter: 'blur(200px)',
        opacity: 0.15,
        borderRadius: '50%',
        zIndex: -1
      }} />

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', borderRadius: '8px' }}></div>
          SafeDeck <span style={{ fontWeight: 300, color: 'var(--text-secondary)' }}>| Dashboard</span>
        </div>

        {/* User chip in header */}
        <div className="mobile-btn-stack" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {currentUser && (
            <div className="mobile-hidden" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50px' }}>
              {currentUser.picture ? (
                <img src={currentUser.picture} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  {firstName[0]?.toUpperCase()}
                </div>
              )}
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, lineHeight: 1.2 }}>{currentUser.name || currentUser.email}</div>
                {fundRole && <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.2 }}>{fundRole}</div>}
              </div>
            </div>
          )}
          <button className="btn btn-secondary" onClick={() => navigate('/pricing')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Target size={16} color="var(--accent-cyan)" /> <span className="mobile-hidden">Pricing</span>
          </button>
          <button className="btn btn-secondary" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <LogOut size={16} /> <span className="mobile-hidden">Logout</span>
          </button>
        </div>
      </header>

      <main className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="responsive-flex-col" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', gap: '1.5rem' }}>
          <div>
            {/* Personalised greeting */}
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.4rem' }}>
              {getGreeting()}, <span className="text-gradient">{firstName}</span> 👋
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>Manage and review your AI-analyzed pitch decks.</p>
              {fundName && (
                <span style={{ padding: '0.2rem 0.65rem', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {fundName}
                </span>
              )}
            </div>
          </div>
          
          <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '20px', gap: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
             <Search size={18} color="var(--text-secondary)" />
             <input 
               type="text" 
               placeholder="Search decks..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '200px' }}
             />
          </div>
        </div>

        {loading || subscriptionStatus === null ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem', color: 'var(--accent-purple)' }}>
            <Loader size={40} style={{ animation: 'spin 2s linear infinite' }} />
          </div>
        ) : subscriptionStatus === 'inactive' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <AlertTriangle size={36} color="var(--accent-purple)" />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Subscription Required</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '480px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Your account doesn't have an active SafeDeck plan. Choose a plan to unlock unlimited pitch deck audits, AI-powered analysis, and CRM integration.
            </p>
            {subCheckError && (
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                {subCheckError}
              </div>
            )}
            <button
              className="btn"
              onClick={() => navigate('/pricing')}
              style={{ padding: '1rem 2.5rem', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))', border: 'none', borderRadius: '14px', color: 'white', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <CreditCard size={18} /> View Plans
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {decks.filter(deck => 
               deck.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               deck.sector.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((deck, index) => (
              <motion.div 
                key={deck.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel"
                onClick={() => setSelectedDeck(deck)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'transform 0.2s ease, border-color 0.2s',
                  cursor: 'pointer'
                }}
                whileHover={{ y: -5, borderColor: 'var(--accent-purple)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    <FileText size={24} color="var(--accent-cyan)" />
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.3rem', 
                    fontSize: '0.8rem', 
                    padding: '0.3rem 0.6rem', 
                    borderRadius: '12px',
                    background: `rgba(${deck.status === 'Completed' ? '56, 189, 248' : '168, 85, 247'}, 0.1)`,
                    color: getStatusColor(deck.status)
                  }}>
                    {deck.status === 'Completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {deck.status}
                  </div>
                </div>
                
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{deck.name}</h3>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{deck.sector}</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Revenue</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {deck.revenue !== 'Not stated' ? deck.revenue : 'N/A'}
                    </div>
                  </div>
                  <button className="btn" style={{ padding: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
            
            {!loading && decks.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                No pitch decks found matching your search.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Detail View Modal overlay */}
      <DeckModal deck={selectedDeck} onClose={() => setSelectedDeck(null)} />
    </div>
  );
};

export default Dashboard;
