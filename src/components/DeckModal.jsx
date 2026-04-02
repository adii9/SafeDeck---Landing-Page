import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, BarChart2, Users, Briefcase, Link as LinkIcon, DollarSign, Globe } from 'lucide-react';

const DeckModal = ({ deck, onClose }) => {
  if (!deck) return null;
  const { details } = deck;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(8, 10, 14, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-secondary)',
            borderRadius: '24px',
            position: 'relative',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, background: 'rgba(15, 18, 24, 0.9)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
            <button 
              onClick={onClose}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', color: 'var(--accent-blue)', fontSize: '0.875rem', fontWeight: 600 }}>
                {details['Current Evaluation Stage'] || deck.status}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {details['Sector']} • {details['Location City']}, {details['Country']}
              </div>
            </div>
            <h2 style={{ fontSize: '2.5rem', margin: 0, paddingRight: '3rem' }}>{deck.name}</h2>
            {details.Website && details.Website !== 'Not stated' && (
              <a href={details.Website} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', textDecoration: 'none', marginTop: '1rem' }}>
                <LinkIcon size={16} /> {details.Website}
              </a>
            )}
          </div>

          {/* Body Content */}
          <div style={{ padding: '2rem', display: 'grid', gap: '3rem' }}>
            
            {/* Overview Section */}
            <section>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                <Target color="var(--accent-purple)" /> Overview & Pitch
              </h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Problem / Solution</h4>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{details['Problem / Solution'] || 'N/A'}</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Unique Differentiator</h4>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{details['Unique Differentiator?'] || 'N/A'}</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Product Offering</h4>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{details['Product Offering'] || 'N/A'}</p>
                </div>
              </div>
            </section>

            {/* Financials & Market */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <section>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                  <DollarSign color="var(--accent-cyan)" /> Financials
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Revenue Model</span>
                    <span style={{ textAlign: 'right', maxWidth: '60%' }}>{details['B2B/B2C/B2B2C/B2G?'] || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Current Revenue</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{deck.revenue}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>EBITDA</span>
                    <span style={{ textAlign: 'right' }}>{typeof details['EBITDA'] === 'object' ? Object.values(details['EBITDA'])[0] : (details['EBITDA'] || 'N/A')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Current Round Ask</span>
                    <span style={{ textAlign: 'right' }}>{details['Current Round Ask'] || 'N/A'}</span>
                  </div>
                </div>
              </section>

              <section>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                  <Globe color="var(--accent-blue)" /> Market Profile
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Industry CAGR</span>
                    <span style={{ textAlign: 'right', fontWeight: 600 }}>{details['Industry - CAGR'] || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Market Size</span>
                    <span style={{ textAlign: 'right', maxWidth: '60%' }}>{details['Total Market Size'] || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Addressable Market</span>
                    <span style={{ textAlign: 'right', maxWidth: '60%' }}>{details['Addressable Market Size'] || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Intellectual Property</span>
                    <span style={{ textAlign: 'right' }}>{details['Any IP - Patent Details?'] || 'N/A'}</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Team Section */}
            {Array.isArray(details['Senior Team']) && details['Senior Team'].length > 0 && (
              <section>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                  <Users color="var(--accent-green)" /> Senior Team
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {details['Senior Team'].map((member, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{member.Name}</div>
                      <div style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{member.Role}</div>
                      {Array.isArray(details['Prior Experience']) && details['Prior Experience'].find(pe => pe.Name === member.Name) && (
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          {details['Prior Experience'].find(pe => pe.Name === member.Name).Experience}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Competitors */}
             {Array.isArray(details['Competitor Name']) && details['Competitor Name'].length > 0 && (
              <section>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                  <Briefcase color="var(--accent-purple)" /> Competitor Landscape
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                  {details['Competitor Name'].map((comp, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{comp.Name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <span style={{ opacity: 0.7 }}>Last Valuation:</span><br/>
                        <span style={{ color: 'var(--text-primary)' }}>{comp['Last post-money valuation'] || 'Unknown'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeckModal;
