import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const ProblemSolution = () => {
  const problemsClasses = [
    {
      title: 'Manual Grunt Work',
      before: 'Receiving 50 emails a day, downloading PDFs, searching for revenue metrics, and hand-typing them into a spreadsheet.',
      after: 'SafeDeck intercepts the email, extracts all 53 key data points, and automatically pushes them into Excel or your CRM instantly.'
    },
    {
      title: 'Missed Red Flags',
      before: 'Tired eyes accidentally skip mismatched growth metrics or hidden competitor threats in deck 20 of the day.',
      after: 'Our CrewAI agents cross-reference all historical data and highlight gaps or realistic projections securely.'
    },
    {
      title: 'Speed to Lead',
      before: 'By the time you finish your manual pipeline research, a rival VC has already issued a term sheet.',
      after: 'The deep-dive audit finishes before you even open your inbox. You can reach the best founders first and dominate deal flow.'
    }
  ];

  return (
    <section id="problems" style={{ padding: '100px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>The "Real World" <span className="text-gradient">Problem</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Venture Capital moves fast, but manual due diligence moves slow. Here's how SafeDeck flips the script on deal flow automation.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {problemsClasses.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-panel responsive-grid mobile-p-4"
              style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'center' }}
            >
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{item.title}</h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <XCircle color="var(--accent-red)" style={{ flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Before</div>
                    <p style={{ color: 'var(--text-secondary)' }}>{item.before}</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <CheckCircle color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--accent-green)', marginBottom: '0.25rem' }}>With SafeDeck</div>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.after}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
