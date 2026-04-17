import React, { useState } from 'react';

const NegotiationKit = ({ selectedClauses, onNegotiate }) => {
  const [activeNegotiation, setActiveNegotiation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const handleNegotiate = async (clause) => {
    setLoading(true);
    setProcessingId(clause.id);
    const result = await onNegotiate(clause);
    setActiveNegotiation(result);
    setLoading(false);
    setProcessingId(null);
  };

  return (
    <div className="fade-in-up">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Negotiation Kit</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: activeNegotiation ? '1fr 1fr' : '1fr', gap: '30px' }}>
        <div className="glass-panel" style={{ borderRadius: '24px', padding: '30px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Selected for Negotiation</h3>
          {selectedClauses.length === 0 ? (
             <p style={{ color: 'var(--text-muted)' }}>No clauses selected yet. Go to 'Flagged Clauses' and click 'Negotiate' on any item.</p>
          ) : (
            selectedClauses.map((c, i) => (
              <div key={i} className="glass-card" style={{ marginBottom: '15px', borderLeft: '4px solid var(--accent-gold)' }}>
                 <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontStyle: 'italic' }}>"{c.text}"</p>
                 <button 
                   className="modern-btn primary" 
                   style={{ fontSize: '0.8rem', padding: '8px 20px' }}
                   onClick={() => handleNegotiate(c)}
                   disabled={loading}
                 >
                   {loading && processingId === c.id ? 'Generating...' : 'Generate Counter-Strike'}
                 </button>
              </div>
            ))
          )}
        </div>

        {activeNegotiation && (
          <div className="glass-panel fade-in-up" style={{ borderRadius: '24px', padding: '40px', background: 'white' }}>
            <div style={{ paddingBottom: '20px', borderBottom: '2px solid var(--bg-color)', marginBottom: '30px' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '5px' }}>Subject:</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{activeNegotiation.email_subject}</div>
            </div>
            
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.1rem', 
              lineHeight: '1.7',
              color: 'var(--text-primary)',
              minHeight: '300px'
            }}>
              {activeNegotiation.email_body}
            </div>

            <div style={{ marginTop: '30px', borderTop: '1px solid var(--bg-color)', paddingTop: '20px', display: 'flex', gap: '15px' }}>
              <button 
                className="modern-btn primary" 
                onClick={() => navigator.clipboard.writeText(activeNegotiation.email_body)}
              >
                Copy to Clipboard
              </button>
              <button 
                className="modern-btn" 
                onClick={() => window.open(`mailto:?subject=${encodeURIComponent(activeNegotiation.email_subject)}&body=${encodeURIComponent(activeNegotiation.email_body)}`)}
              >
                Open in Mail
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NegotiationKit;
