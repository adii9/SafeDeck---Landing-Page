import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, LogOut } from 'lucide-react';
import { googleLogout } from '@react-oauth/google';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Check for logged-in user
    try {
      const stored = localStorage.getItem('safedeck_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {}

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    try {
      googleLogout();
    } catch (e) {}
    localStorage.removeItem('safedeck_user');
    window.location.href = '/';
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100,
      transition: 'all 0.3s ease',
      padding: scrolled ? '1rem 0' : '1.5rem 0',
      background: scrolled ? 'rgba(8, 10, 14, 0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'white' }}
          >
            <div style={{ color: 'var(--accent-cyan)' }}>
              <Layers size={28} />
            </div>
            SafeDeck
          </motion.div>
        </a>
        
        <motion.nav 
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontWeight: '500' }}
        >
          <a href="/#problems" className="mobile-hidden" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>How it Works</a>
          <a href="/#features" className="mobile-hidden" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Features</a>
          <a href="/pricing" className="mobile-hidden" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Pricing</a>
          
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginLeft: '0.5rem' }}>
              <div style={{ textAlign: 'right' }} className="mobile-hidden">
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{currentUser?.user?.name || currentUser?.user?.email || 'User'}</div>
              </div>
              {currentUser?.user?.picture ? (
                <img src={currentUser.user.picture} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--accent-purple)' }} />
              ) : (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                  {(currentUser?.user?.name || currentUser?.user?.email || 'U')[0]?.toUpperCase()}
                </div>
              )}
              
              <button 
                className="btn btn-secondary" 
                onClick={handleLogout}
                style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
              >
                <LogOut size={14} /> <span className="mobile-hidden">Logout</span>
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => window.location.href = '/dashboard'}
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              >
                Dashboard
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.95rem' }}>
              Book Demo
            </button>
          )}
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;
