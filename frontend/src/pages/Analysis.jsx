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
        <button className="action-btn" style={{ padding: '10px 30px', borderRadius: '30px', border: '1px solid var(--border-light)', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/upload')}>Go back to upload</button>
      </div>
    );
  }

  const { filename, document_risk_score, graph } = data;
  const nodes = graph?.nodes || [];
  
  const flaggedClauses = nodes.filter(n => n.label === 'Predatory');
  const safeClauses = nodes.filter(n => n.label === 'Safe');

  let docRiskColor = 'var(--success)';
  if (document_risk_score > 0.7) docRiskColor = 'var(--danger)';
  else if (document_risk_score >= 0.4) docRiskColor = 'var(--warning)';

  const navBtnStyle = (isActive) => ({
    padding: '10px 20px',
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid var(--text-primary)' : '2px solid transparent',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
    transition: 'all 0.3s ease'
  });

  const renderOverview = () => (
    <div style={{ marginTop: '50px', maxWidth: '800px', margin: '50px auto' }}>
      <div className="deco-circle deco-1"></div>
      <div className="deco-circle deco-2"></div>

      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'normal', textAlign: 'center', marginBottom: '50px', zIndex: 2, position: 'relative' }}>{filename}</h2>
      
      <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginBottom: '40px', zIndex: 2, position: 'relative', display: 'flex', alignItems: 'center' }}>
        <strong>Risk Score:</strong> 
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: docRiskColor, boxShadow: `0 0 8px ${docRiskColor}`, marginLeft: '20px', marginRight: '10px' }}></div>
        <span style={{ color: docRiskColor, fontWeight: 'bold' }}>{(document_risk_score * 100).toFixed(1)}%</span>
      </div>

      <div style={{ fontSize: '1.5rem', zIndex: 2, position: 'relative' }}>
        <strong style={{ display: 'block', marginBottom: '20px' }}>Key issues:</strong>
        <ul style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
           {flaggedClauses.flatMap(c => {
             if (Array.isArray(c.key_issues)) return c.key_issues;
             if (typeof c.key_issues === 'string') return [c.key_issues];
             return c.reason_flagged ? [c.reason_flagged] : [];
           }).slice(0, 5).map((issue, idx) => (
             <li key={idx} style={{ marginBottom: '15px' }}>{issue}</li>
           ))}
           {flaggedClauses.length === 0 && <li>No critical issues found!</li>}
        </ul>
      </div>
    </div>
  );

  const renderClauses = () => (
    <div style={{ marginTop: '30px', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
        <div style={{ flex: 3, fontSize: '1.2rem' }}>Flagged Clauses</div>
        <div style={{ flex: 1, fontSize: '1.2rem', textAlign: 'right' }}>Risk Assessment</div>
      </div>
      
      <div className="glass-panel fade-in" style={{ height: '100%', minHeight: '60vh', borderRadius: '20px', overflowY: 'auto', padding: 'clamp(15px, 3vw, 30px)' }}>
        {flaggedClauses.map((c, i) => {
           let riskColor = 'var(--success)';
           if (c.risk_score > 0.7) riskColor = 'var(--danger)';
           else if (c.risk_score >= 0.4) riskColor = 'var(--warning)';

           return (
             <div key={i} className="responsive-flex" style={{ borderBottom: '1px solid var(--border-light)', borderLeft: `4px solid ${riskColor}`, marginBottom: '20px', paddingBottom: '20px', paddingLeft: '15px', alignItems: 'center', background: 'rgba(252, 251, 250, 0.4)', borderRadius: '0 8px 8px 0' }}>
               <div style={{ flex: 3 }}>
                 <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem', lineHeight: '1.5' }}>{c.text}</p>
                 <p style={{ margin: 0, color: riskColor, fontSize: '0.95rem', fontWeight: 'bold' }}>Reason: {c.reason_flagged}</p>
                 {c.key_issues && <p style={{ margin: '5px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Issues: {Array.isArray(c.key_issues) ? c.key_issues.join(', ') : c.key_issues}</p>}
               </div>
               <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '15px' }}>
                 <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: riskColor, boxShadow: `0 0 8px ${riskColor}` }}></div>
                 <span style={{ fontSize: '1.8rem', color: riskColor, fontWeight: 'bold' }}>{(c.risk_score * 100).toFixed(1)}%</span>
               </div>
             </div>
           );
        })}
        {flaggedClauses.length === 0 && <p>All clauses safe.</p>}
      </div>
    </div>
  );

  const renderFixes = () => (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'normal', marginBottom: '20px' }}>Improved Clauses</h3>
      <div className="glass-panel fade-in" style={{ borderRadius: '20px', padding: '30px', height: '55vh', overflowY: 'auto' }}>
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
        <button className="action-btn" style={{ padding: '10px 30px', borderRadius: '30px', border: '1px solid var(--border-light)', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}>
          DOWNLOAD REPORT
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(40px, 5vw, 80px)', position: 'relative', overflowX: 'hidden' }}>
      <div className="responsive-flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', zIndex: 2, position: 'relative' }}>
        <div>
           <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'normal', margin: '0 0 5px 0', borderBottom: '2px solid var(--text-primary)', display: 'inline-block' }}>
             {activeTab === 'overview' && 'ANALYSIS DASHBOARD'}
             {activeTab === 'clauses' && 'CLAUSE DETAILS'}
             {activeTab === 'fixes' && 'RECTIFICATION PROPOSALS'}
           </h1>
           <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
             <button style={navBtnStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>Overview</button>
             <button style={navBtnStyle(activeTab === 'clauses')} onClick={() => setActiveTab('clauses')}>Flagged Clauses</button>
             <button style={navBtnStyle(activeTab === 'fixes')} onClick={() => setActiveTab('fixes')}>Rectification</button>
           </div>
        </div>

        {activeTab === 'overview' && (
          <div style={{ display: 'flex', gap: '30px', textAlign: 'center' }}>
            <div>
              <div style={{ width: '30px', height: '30px', borderRadius: '5px', backgroundColor: 'var(--danger)', margin: '0 auto', boxShadow: '0 0 10px rgba(156, 39, 39, 0.4)' }}></div>
              <div style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>SEVERE<br/>RISK</div>
            </div>
            <div>
              <div style={{ width: '30px', height: '30px', borderRadius: '5px', backgroundColor: 'var(--warning)', margin: '0 auto', boxShadow: '0 0 10px rgba(209, 154, 46, 0.4)' }}></div>
              <div style={{ fontSize: '0.8rem', color: 'var(--warning)', marginTop: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>MODERATE<br/>RISK</div>
            </div>
            <div>
              <div style={{ width: '30px', height: '30px', borderRadius: '5px', backgroundColor: 'var(--success)', margin: '0 auto', boxShadow: '0 0 10px rgba(53, 122, 56, 0.4)' }}></div>
              <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>LOW<br/>RISK</div>
            </div>
          </div>
        )}
        {activeTab === 'clauses' && (
          <div style={{ display: 'flex', gap: '30px', textAlign: 'center' }}>
            <div>
              <div style={{ width: '30px', height: '30px', borderRadius: '5px', backgroundColor: 'var(--danger)', margin: '0 auto', boxShadow: '0 0 10px rgba(156, 39, 39, 0.4)' }}></div>
              <div style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>SEVERE<br/>RISK</div>
            </div>
            <div>
              <div style={{ width: '30px', height: '30px', borderRadius: '5px', backgroundColor: 'var(--warning)', margin: '0 auto', boxShadow: '0 0 10px rgba(209, 154, 46, 0.4)' }}></div>
              <div style={{ fontSize: '0.8rem', color: 'var(--warning)', marginTop: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>MODERATE<br/>RISK</div>
            </div>
            <div>
              <div style={{ width: '30px', height: '30px', borderRadius: '5px', backgroundColor: 'var(--success)', margin: '0 auto', boxShadow: '0 0 10px rgba(53, 122, 56, 0.4)' }}></div>
              <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>LOW<br/>RISK</div>
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
