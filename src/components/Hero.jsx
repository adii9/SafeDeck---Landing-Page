import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail } from 'lucide-react';
import ThreeDScene from './ThreeDScene';

const Hero = () => {
  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'var(--accent-purple)',
        filter: 'blur(150px)',
        opacity: 0.2,
        borderRadius: '50%',
        zIndex: -1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'var(--accent-cyan)',
        filter: 'blur(150px)',
        opacity: 0.15,
        borderRadius: '50%',
        zIndex: -1
      }} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '20px',
            color: 'var(--accent-blue)',
            fontWeight: 600,
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: 'fit-content'
           }}>
            <Mail size={16} /> End-to-End Deal Flow Automation
          </div>
          <h1 style={{ lineHeight: '1.15' }}>
            From <span className="text-gradient">Inbox to CRM</span> Without Lifting a Finger.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '540px' }}>
            The moment a pitch hits your email, SafeDeck's AI intercepts it. It reads the deck, extracts all 53 vital data points, and perfectly populates your Excel sheet or Custom CRM. Zero manual entry.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
             <button className="btn btn-primary pulse-glowing">
                Start Free Trial <Zap size={18} />
             </button>
             <button className="btn btn-secondary">
                View Sample Audit
             </button>
          </div>
        </motion.div>

        {/* Immersive 3D Visual Element replaces CSS Cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ position: 'relative', height: '600px', overflow: 'visible', cursor: 'grab' }}
        >
           <ThreeDScene />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
