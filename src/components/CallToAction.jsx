import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '400px',
        background: 'var(--accent-purple)',
        filter: 'blur(200px)',
        opacity: 0.15,
        borderRadius: '50%',
        zIndex: -1
      }} />
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel" 
          style={{ padding: '4rem 2rem', textAlign: 'center', border: '1px solid var(--accent-purple)' }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to Scale Your <span className="text-gradient">Deal Flow?</span></h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Stop doing manual grunt work. Start finding the best founders faster than the competition.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary pulse-glowing" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Book Your Free Demo
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Pricing Plans
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
