import React from 'react';
import { Layers } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', padding: '3rem 0', background: 'var(--bg-secondary)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
          <div style={{ color: 'var(--accent-cyan)' }}>
            <Layers size={24} />
          </div>
          SafeDeck
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} SafeDeck Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
