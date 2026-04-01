import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Bot, Zap, MailPlus, DatabaseZap } from 'lucide-react';

const TiltCard = ({ icon: Icon, title, description }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="glass-panel"
    >
      <div style={{ padding: '2.5rem', transform: 'translateZ(30px)' }}>
        <div style={{ 
          width: '50px', height: '50px', 
          borderRadius: '12px', 
          background: 'rgba(139, 92, 246, 0.1)', 
          border: '1px solid rgba(139, 92, 246, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.5rem',
          color: 'var(--accent-purple)'
        }}>
          <Icon size={24} />
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: MailPlus,
      title: 'Email Inbox Intercept',
      description: 'Connect your deal flow email once. We automatically catch, parse, and process every new PDF pitch deck the millisecond it arrives.'
    },
    {
      icon: DatabaseZap,
      title: 'Universal CRM Plugins',
      description: 'Push highly-structured audit data directly to Affinity, Salesforce, HubSpot, customized Excel sheets, or via raw API.'
    },
    {
      icon: Bot,
      title: 'Advanced AI Agents',
      description: 'Multiple specialized CrewAI agents work in tandem to evaluate the team, market size, and financials totally independently.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Workflows',
      description: 'From an email sitting unread in your inbox to a fully structured CRM entry in less time than it takes to brew coffee.'
    }
  ];

  return (
    <section id="features" style={{ padding: '100px 0', position: 'relative' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2>End-to-End <span className="text-gradient">Automation</span></h2>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', perspective: '1000px' }}>
             {features.map((f, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6, delay: i * 0.1 }}
                 key={i}
               >
                 <TiltCard {...f} />
               </motion.div>
             ))}
           </div>
        </div>
    </section>
  );
};

export default FeatureCards;
