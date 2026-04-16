import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const data = location.state?.analysisData;

  if (!data) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>No analysis data found.</h2>
        <button onClick={() => navigate('/upload')}>Go back to upload</button>
      </div>
    );
  }

  const { filename, document_risk_score, graph } = data;
  const nodes = graph?.nodes || [];
  
  const flaggedClauses = nodes.filter(n => n.label === 'Predatory');
  const safeClauses = nodes.filter(n => n.label === 'Safe');

  const navBtnStyle = (isActive) => ({
    padding: '10px 20px',
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid var(--text-primary)' : '2px solid transparent',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
  });

  const renderOverview = () => (
    <div style={{ marginTop: '50px', maxWidth: '800px', margin: '50px auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'normal', textAlign: 'center', marginBottom: '50px' }}>{filename}</h2>
      
      <div style={{ fontSize: '1.5rem', marginBottom: '40px' }}>
        <strong>Risk Score:</strong> <span style={{ marginLeft: '20px' }}>{(document_risk_score * 100).toFixed(1)}%</span>
      </div>

      <div style={{ fontSize: '1.5rem' }}>
        <strong style={{ display: 'block', marginBottom: '20px' }}>Key issues:</strong>
        <ul style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
           {flaggedClauses.slice(0, 5).map((clause, idx) => (
             <li key={idx} style={{ marginBottom: '15px' }}>{clause.reason_flagged}</li>
           ))}
           {flaggedClauses.length === 0 && <li>No critical issues found!</li>}
        </ul>
      </div>
    </div>
  );

  const renderClauses = () => (
    <div style={{ marginTop: '30px' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
        <div style={{ flex: 3, fontSize: '1.2rem' }}>Flagged Clauses</div>
        <div style={{ flex: 1, fontSize: '1.2rem' }}>Risk</div>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', height: '60vh' }}>
        <div style={{ flex: 3, background: '#e8e5dc', borderRadius: '20px', padding: '20px', overflowY: 'auto' }}>
          {flaggedClauses.map((c, i) => (
            <div key={i} style={{ padding: '15px', borderBottom: '1px solid var(--border-light)', marginBottom: '10px' }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{c.text}</p>
              <p style={{ margin: 0, color: 'var(--danger)', fontSize: '0.9rem' }}>Reason: {c.reason_flagged}</p>
            </div>
          ))}
          {flaggedClauses.length === 0 && <p>All clauses safe.</p>}
        </div>
        
        <div style={{ flex: 1, background: '#e8e5dc', borderRadius: '20px', padding: '20px', overflowY: 'auto' }}>
           {flaggedClauses.map((c, i) => (
            <div key={i} style={{ padding: '15px', borderBottom: '1px solid var(--border-light)', marginBottom: '10px', display: 'flex', alignItems: 'center', height: '100%', minHeight: '80px' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--danger)' }}>{(c.risk_score * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFixes = () => (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'normal', marginBottom: '20px' }}>Improved Clauses</h3>
      <div style={{ background: '#e8e5dc', borderRadius: '20px', padding: '30px', height: '55vh', overflowY: 'auto' }}>
        {flaggedClauses.map((c, i) => (
           <div key={i} style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
             <h4 style={{ color: 'var(--danger)', margin: '0 0 10px 0' }}>Original Problematic Clause:</h4>
             <p style={{ margin: '0 0 20px 0', fontStyle: 'italic' }}>{c.text}</p>
             <h4 style={{ color: 'var(--success)', margin: '0 0 10px 0' }}>Suggested Improvement:</h4>
             <p style={{ margin: '0', fontSize: '1.1rem', background: '#fff', padding: '15px', borderRadius: '8px' }}>{c.improved_clause || "Awaiting LLM response..."}</p>
           </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button style={{ padding: '10px 30px', borderRadius: '30px', border: '1px solid var(--border-light)', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold' }}>
          DOWNLOAD REPORT
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '40px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
           <h1 style={{ fontSize: '3rem', fontWeight: 'normal', margin: '0 0 5px 0', borderBottom: '2px solid var(--text-primary)', display: 'inline-block' }}>
             {activeTab === 'overview' && 'ANALYSIS DASHBOARD'}
             {activeTab === 'clauses' && 'CLAUSE DETAILS'}
             {activeTab === 'fixes' && 'FIX THE FILLING'}
           </h1>
           <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
             <button style={navBtnStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>Overview</button>
             <button style={navBtnStyle(activeTab === 'clauses')} onClick={() => setActiveTab('clauses')}>Flagged Clauses</button>
             <button style={navBtnStyle(activeTab === 'fixes')} onClick={() => setActiveTab('fixes')}>Suggested Fixes</button>
           </div>
        </div>

        {activeTab === 'overview' && (
          <div style={{ display: 'flex', gap: '30px', textAlign: 'center' }}>
            <div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid var(--danger)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>😡</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '5px', fontWeight: 'bold' }}>HIGH RISK<br/>LEVEL</div>
            </div>
            <div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid var(--warning)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>😟</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--warning)', marginTop: '5px', fontWeight: 'bold' }}>MEDIUM RISK<br/>LEVEL</div>
            </div>
            <div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid var(--success)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>😊</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '5px', fontWeight: 'bold' }}>LOW RISK<br/>LEVEL</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ zIndex: 2, position: 'relative' }}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'clauses' && renderClauses()}
        {activeTab === 'fixes' && renderFixes()}
      </div>
    </div>
  );
}
