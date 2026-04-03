import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '₹30,000 / $375',
      period: 'per month',
      popular: false,
      features: [
        { label: 'Pitch Decks', value: '40 decks included' },
        { label: 'Additional decks', value: '₹600 / $7.50 per deck' },
        { label: 'AI Audit', value: 'Full CrewAI audit with team, market & financials analysis' },
        { label: 'CRM Sync', value: 'Google Sheets only' },
        { label: 'Email Inbox', value: '1 inbox connected' },
        { label: 'Audit Reports', value: 'Standard format' },
      ],
      capabilities: [
        { label: 'Red Flag Detection', supported: true },
        { label: 'API Access', supported: false },
        { label: 'Priority Support', supported: false },
      ]
    },
    {
      name: 'Growth',
      badge: 'Most Popular',
      price: '₹55,000 / $688',
      period: 'per month',
      popular: true,
      features: [
        { label: 'Pitch Decks', value: '120 decks included' },
        { label: 'Additional decks', value: '₹400 / $5 per deck' },
        { label: 'AI Audit', value: 'Full CrewAI audit + detailed red flags report' },
        { label: 'CRM Sync', value: 'Google Sheets + Affinity + HubSpot' },
        { label: 'Email Inbox', value: 'Up to 3 inboxes connected' },
        { label: 'Audit Reports', value: 'Detailed format with comparison views' },
      ],
      capabilities: [
        { label: 'Red Flag Detection', supported: true },
        { label: 'API Access', supported: true },
        { label: 'Priority Support', supported: true },
      ]
    },
    {
      name: 'Enterprise',
      badge: 'Custom',
      price: '₹1,00,000+ / $1,250+',
      period: 'per month',
      popular: false,
      features: [
        { label: 'Pitch Decks', value: 'Unlimited' },
        { label: 'Additional decks', value: 'Included' },
        { label: 'AI Audit', value: 'Custom CrewAI configuration + white-label reports' },
        { label: 'CRM Sync', value: 'Salesforce + Affinity + HubSpot + Custom API' },
        { label: 'Email Inbox', value: 'Unlimited inboxes' },
        { label: 'Audit Reports', value: 'Custom branded PDF reports' },
      ],
      capabilities: [
        { label: 'Red Flag Detection', supported: true },
        { label: 'API Access', supported: true },
        { label: 'Priority Support', value: 'Dedicated account manager', supported: true },
        { label: 'Onboarding', value: 'Custom setup & training', supported: true },
        { label: 'SLA', value: '99.9% uptime guarantee', supported: true },
      ]
    }
  ];

  return (
    <section id="pricing" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Simple, Transparent <span className="text-gradient">Pricing</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Choose the perfect plan for your deal flow. Scale effortlessly as your intake grows.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem',
          alignItems: 'center'
        }}>
          {plans.map((plan, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={i}
              className={`glass-panel ${plan.popular ? 'pulse-glowing' : ''}`}
              style={{
                padding: '2.5rem',
                position: 'relative',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                border: plan.popular ? '1px solid rgba(139, 92, 246, 0.5)' : '1px solid var(--glass-border)',
                zIndex: plan.popular ? 10 : 1
              }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '2rem',
                  background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
                }}>
                  {plan.badge}
                </div>
              )}
              
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <div style={{ marginBottom: '2rem' }}>
                <span className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{plan.price.split(' / ')[1]}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginLeft: '8px' }}>{plan.period}</span>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  {plan.price.split(' / ')[0]} {plan.period}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Features
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{feature.label}</span>
                      <span style={{ fontWeight: '500' }}>{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1.5rem 0' }} />

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {plan.capabilities.map((cap, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      {cap.supported ? (
                        <Check size={16} color="var(--accent-green)" style={{ flexShrink: 0 }} />
                      ) : (
                        <X size={16} color="var(--accent-red)" style={{ flexShrink: 0 }} />
                      )}
                      <span style={{ color: cap.supported ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {cap.label} {cap.value && <span style={{ opacity: 0.7 }}>— {cap.value}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ 
            marginTop: '4rem', 
            padding: '2rem', 
            background: 'rgba(139, 92, 246, 0.05)', 
            border: '1px solid rgba(139, 92, 246, 0.1)', 
            borderRadius: '16px',
            textAlign: 'center'
          }}
        >
          <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
            <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>SafeDeck replaces a full-time deal intake analyst.</span><br /> 
            For the price of one junior hire, you get unlimited pitch deck audits with zero manual work — delivered to your CRM automatically.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
