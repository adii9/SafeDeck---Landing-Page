import React from 'react';
import { motion } from 'framer-motion';
import { Mail, HardDrive, Cpu, FileSpreadsheet, Video, FileSignature } from 'lucide-react';
import WorkflowAnimation from './WorkflowAnimation';

const ProblemSolution = () => {
  const steps = [
    {
      title: '1. Email Ingestion',
      description: 'We directly monitor your inbox, scanning incoming emails to automatically detect and identify newly submitted pitch decks.',
      icon: <Mail size={28} color="var(--accent-blue)" />,
      borderColor: 'rgba(59, 130, 246, 0.3)',
      bg: 'rgba(59, 130, 246, 0.05)'
    },
    {
      title: '2. Organized Storage',
      description: 'Once a pitch deck is found, it is instantly saved into a centralized Drive folder, automatically categorized by the company name.',
      icon: <HardDrive size={28} color="var(--accent-purple)" />,
      borderColor: 'rgba(139, 92, 246, 0.3)',
      bg: 'rgba(139, 92, 246, 0.05)'
    },
    {
      title: '3. AI Validation',
      description: 'The deck is routed to our advanced AI agents which extract context, cross-reference claims, and rigorously validate all information.',
      icon: <Cpu size={28} color="var(--accent-cyan)" />,
      borderColor: 'rgba(6, 182, 212, 0.3)',
      bg: 'rgba(6, 182, 212, 0.05)'
    },
    {
      title: '4. Sheets & CRM Sync',
      description: 'The validated, structured data is instantly pushed into Google Sheets or your custom CRM, eliminating all manual data entry.',
      icon: <FileSpreadsheet size={28} color="var(--accent-green)" />,
      borderColor: 'rgba(16, 185, 129, 0.3)',
      bg: 'rgba(16, 185, 129, 0.05)'
    },
    {
      title: '5. Meeting Intelligence',
      description: 'Following the founder pitch, SafeDeck integrates and stores Firefly meeting notes alongside the deal profile for seamless review.',
      icon: <Video size={28} color="#f97316" />,
      borderColor: 'rgba(249, 115, 22, 0.3)',
      bg: 'rgba(249, 115, 22, 0.05)'
    },
    {
      title: '6. Deal Execution',
      description: 'Automatically schedule follow-up meetings and effortlessly generate standard term sheets and legal due diligence documents.',
      icon: <FileSignature size={28} color="#eab308" />,
      borderColor: 'rgba(234, 179, 8, 0.3)',
      bg: 'rgba(234, 179, 8, 0.05)'
    }
  ];

  return (
    <section id="problems" style={{ padding: '100px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
           <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>The Full <span className="text-gradient">Workflow</span></h2>
           <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
             From the moment a pitch hits your inbox to the final legal documents, SafeDeck completely automates the entire venture capital due diligence lifecycle.
           </p>
        </div>

        <WorkflowAnimation />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel"
              style={{ 
                padding: '2rem', 
                borderTop: `4px solid ${item.borderColor}`,
                background: `linear-gradient(180deg, ${item.bg} 0%, rgba(255,255,255,0.01) 100%)`,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: item.bg, border: `1px solid ${item.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'white' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
