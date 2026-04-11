import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { saveSheetMapping } from '../../utils/api';

const slideVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  marginBottom: '0.4rem',
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
};

// Our 53 fields — representative subset shown in mapper
const OUR_FIELDS = [
  'Promoter Name', 'Founder LinkedIn', 'Revenue', 'Revenue Growth Rate',
  'TAM', 'SAM', 'Problem Size', 'Market Growth Rate', 'Customer Count',
  'Unit Economics', 'Burn Rate', 'Runway', 'Churn Rate', 'ARR',
  'Competitors Listed', 'Moat', 'IP / Patents', 'Current Round',
  'Pre-money Valuation', 'Post-money Valuation', 'Prior Investors',
  'Cap Table', 'Use of Funds', 'Dilution %', 'Product Stage',
  'Product Differentiation', 'Tech Stack', 'Switching Cost',
  'NPS Score', 'Gross Margin', 'Founder Background', 'Past Exits',
  'Option Pool %',
];

const SAMPLE_EXISTING_COLUMNS = [
  'Company Name', 'Founder Name', 'LinkedIn URL', 'Sector', 'Stage',
  'Revenue FY24', 'Revenue Growth %', 'TAM', 'SAM', 'Growth Rate',
  'Customers', 'LTV/CAC', 'Burn', 'Runway', 'Churn',
  'ARR', 'Competitors', 'Moat', 'IP', 'Current Round',
  'Pre-money', 'Post-money', 'Prior Investors', 'Cap Table',
  'Use of Funds', 'Dilution', 'Product Stage', 'Differentiation',
  'Tech Stack', 'Switching Cost', 'NPS', 'Gross Margin',
  'Founder Background', 'Past Exits', 'Option Pool',
];

const Step4SheetMapping = ({ onNext, data, setData, user, alreadyConnected }) => {
  const [mode, setMode] = useState(data.sheetMappingType || 'default'); // 'default' | 'custom'
  const [sheetUrl, setSheetUrl] = useState(data.customSheetUrl || '');
  const [customColumns, setCustomColumns] = useState(data.customColumns || []);
  const [newColumn, setNewColumn] = useState('');
  const [mappings, setMappings] = useState(() => {
    // Pre-fill from saved if available
    if (data.fieldMappings) return data.fieldMappings;
    const initial = {};
    OUR_FIELDS.forEach((field, i) => {
      if (i < SAMPLE_EXISTING_COLUMNS.length) {
        initial[field] = SAMPLE_EXISTING_COLUMNS[i];
      } else {
        initial[field] = '';
      }
    });
    return initial;
  });
  const [editingField, setEditingField] = useState(null);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleMappingChange = (field, ourField, value) => {
    setMappings(prev => ({ ...prev, [ourField]: value }));
  };

  const addCustomColumn = () => {
    if (!newColumn.trim()) return;
    setCustomColumns(prev => [...prev, newColumn.trim()]);
    setNewColumn('');
  };

  const removeCustomColumn = (col) => {
    setCustomColumns(prev => prev.filter(c => c !== col));
  };

  const mappedCount = Object.values(mappings).filter(v => v.trim()).length;
  const unmappedFields = OUR_FIELDS.filter(f => !mappings[f]?.trim());

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await saveSheetMapping({
        userId: user?.userId,
        email: user?.email,
        outputSheetMapping: {
          type: mode,
          custom_url: mode === 'custom' ? sheetUrl : null,
          field_mappings: mappings,
        },
      });
      setData(prev => ({
        ...prev,
        sheetMappingType: mode,
        customSheetUrl: sheetUrl,
        fieldMappings: mappings,
        customColumns,
      }));
      onNext();
    } catch (err) {
      console.error('Failed to save sheet mapping:', err);
      setError('Failed to save mapping. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.35 }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🗺️</span>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', margin: 0 }}>Map your output sheet columns</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Tell us how to label our fields in <em>your</em> sheet. Once mapped, every deck audit fills your columns automatically — "teach once, repeat forever."
        </p>
      </div>

      {/* Mode Toggle */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <button
          onClick={() => setMode('default')}
          style={{
            flex: 1,
            padding: '0.7rem 1rem',
            borderRadius: '10px',
            border: '1px solid',
            borderColor: mode === 'default' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
            background: mode === 'default' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255,255,255,0.02)',
            color: mode === 'default' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: mode === 'default' ? 600 : 400,
            fontSize: '0.88rem',
            transition: 'all 0.2s',
          }}
        >
          ⚡ Use SafeDeck Default
        </button>
        <button
          onClick={() => setMode('custom')}
          style={{
            flex: 1,
            padding: '0.7rem 1rem',
            borderRadius: '10px',
            border: '1px solid',
            borderColor: mode === 'custom' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
            background: mode === 'custom' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255,255,255,0.02)',
            color: mode === 'custom' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: mode === 'custom' ? 600 : 400,
            fontSize: '0.88rem',
            transition: 'all 0.2s',
          }}
        >
          📊 Map to My Sheet
        </button>
      </div>

      {mode === 'custom' && (
        <>
          {/* Sheet URL */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Your Google Sheet URL</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                value={sheetUrl}
                onChange={e => setSheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                style={{ flex: 1, padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '0.88rem', fontFamily: 'Inter, sans-serif', outline: 'none' }}
              />
              <button
                onClick={() => setStatus('loading')}
                style={{ padding: '0.75rem 1rem', background: 'var(--accent-cyan)', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}
              >
                {status === 'loading' ? '...' : 'Import Columns'}
              </button>
            </div>
          </div>

          {/* Custom column list */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Or paste your column headers</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                value={newColumn}
                onChange={e => setNewColumn(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomColumn()}
                placeholder="e.g. FY24 Revenue..."
                style={{ flex: 1, padding: '0.65rem 0.9rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', outline: 'none' }}
              />
              <button onClick={addCustomColumn} style={{ padding: '0.65rem 1rem', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '10px', color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                + Add
              </button>
            </div>
            {customColumns.length > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {customColumns.map(col => (
                  <div key={col} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.25rem 0.6rem', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '6px', color: 'var(--accent-purple)', fontSize: '0.75rem' }}>
                    {col}
                    <button onClick={() => removeCustomColumn(col)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(139,92,246,0.5)', fontSize: '0.7rem', padding: 0, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visual Mapper */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
              <label style={labelStyle}>Field Mapping</label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {mappedCount}/{OUR_FIELDS.length} mapped
              </span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
              {/* Mapper Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px 1fr', gap: '0', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span>Our Field</span>
                <span style={{ textAlign: 'center' }}>→</span>
                <span>Your Column</span>
              </div>
              {/* Mapper Rows */}
              {OUR_FIELDS.slice(0, 18).map(field => (
                <div key={field} style={{ display: 'grid', gridTemplateColumns: '1fr 36px 1fr', gap: '0', padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: mappings[field]?.trim() ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.15)', flexShrink: 0, display: 'inline-block' }} />
                    {field}
                  </div>
                  <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>→</div>
                  <select
                    value={mappings[field] || ''}
                    onChange={e => handleMappingChange(null, field, e.target.value)}
                    style={{ padding: '0.3rem 0.5rem', background: mappings[field]?.trim() ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${mappings[field]?.trim() ? 'rgba(6,182,212,0.25)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '6px', color: mappings[field]?.trim() ? 'var(--accent-cyan)' : 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer', width: '100%' }}
                  >
                    <option value="">— skip —</option>
                    {[...SAMPLE_EXISTING_COLUMNS, ...customColumns].map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            {OUR_FIELDS.length > 18 && (
              <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderTop: 'none', borderRadius: '0 0 12px 12px' }}>
                + {OUR_FIELDS.length - 18} more fields
              </div>
            )}
          </div>
        </>
      )}

      {mode === 'default' && (
        <div style={{ padding: '1.25rem', background: 'rgba(6, 182, 212, 0.06)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '12px', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>⚡ SafeDeck Standard Sheet</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', margin: 0, lineHeight: 1.6 }}>
            We'll use our pre-built 53-column sheet with all fields properly named and formatted. You can rename columns later — the mapping updates automatically.
          </p>
          <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['Promoter Name', 'Revenue', 'TAM', 'Moat', 'Prior Investors', 'Product Stage'].map(f => (
              <span key={f} style={{ padding: '0.2rem 0.55rem', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '5px', color: 'var(--accent-cyan)', fontSize: '0.72rem' }}>{f}</span>
            ))}
            <span style={{ padding: '0.2rem 0.55rem', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '5px', color: 'var(--accent-cyan)', fontSize: '0.72rem' }}>+ 47 more</span>
          </div>
        </div>
      )}

      {error && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
          ❌ {error}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          marginTop: '0.5rem',
          padding: '0.9rem 2rem',
          background: saving ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
          color: saving ? 'var(--text-secondary)' : 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: saving ? 'not-allowed' : 'pointer',
          float: 'right',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {saving && <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
        {saving ? 'Saving...' : 'Continue →'}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
};

export default Step4SheetMapping;
