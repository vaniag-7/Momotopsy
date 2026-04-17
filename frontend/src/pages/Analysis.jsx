import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NotificationCenter from '../components/NotificationCenter';
import NegotiationKit from '../components/NegotiationKit';
import ScamRadar from '../components/ScamRadar';

export default function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedClauses, setSelectedClauses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const data = location.state?.analysisData;

  useEffect(() => {
    if (data) {
      const predatoryCount = data.graph?.nodes.filter(n => n.label === 'Predatory').length || 0;
      if (predatoryCount > 0) {
        setNotifications([{
          severity: 'high',
          time: 'Just now',
          message: `Critical Alert: ${predatoryCount} predatory clauses detected in "${data.filename}".`
        }]);
      }
    }
  }, [data]);

  if (!data) {
    return (
      <div className="living-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '60px', borderRadius: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem' }}>No analysis data found.</h2>
          <button className="modern-btn primary" onClick={() => navigate('/upload')}>
            Go back to upload
          </button>
        </div>
      </div>
    );
  }

  const { filename, document_risk_score, graph } = data;
  const nodes = graph?.nodes || [];
  const flaggedClauses = nodes.filter(n => n.label === 'Predatory');

  const handleAddToNegotiate = (clause) => {
    if (!selectedClauses.find(c => c.id === clause.id)) {
      setSelectedClauses([...selectedClauses, clause]);
      setActiveTab('negotiation');
    }
  };

  const handleNegotiateAPI = async (clause) => {
    try {
      const response = await fetch('http://localhost:8000/api/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          node_id: clause.id,
          original_text: clause.text,
          improved_text: clause.improved_clause || "Make it more fair.",
          document_type: "Legal Agreement"
        })
      });
      return await response.json();
    } catch (error) {
      console.error("Negotiation API failed:", error);
      return { email_subject: "Error", email_body: "Failed to connect to negotiation server." };
    }
  };

  const renderOverview = () => {
     let riskLabel = 'LOW';
     let riskClass = 'low';
     if (document_risk_score > 0.7) { riskLabel = 'SEVERE'; riskClass = 'high'; }
     else if (document_risk_score >= 0.4) { riskLabel = 'MODERATE'; riskClass = 'medium'; }

     return (
        <div className="fade-in-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
            <div>
              <h4 style={{ color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '10px' }}>CURRENT DOCUMENT</h4>
              <h2 style={{ fontSize: '3.5rem', margin: 0 }}>{filename}</h2>
            </div>
            <div className="glass-card" style={{ textAlign: 'right', padding: '20px 40px' }}>
              <div className={`risk-badge ${riskClass}`} style={{ marginBottom: '10px' }}>{riskLabel} RISK</div>
              <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Aggregate Score</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{(document_risk_score * 100).toFixed(1)}%</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
            <div className="glass-panel" style={{ borderRadius: '24px', padding: '40px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Critical Insights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {flaggedClauses.slice(0, 3).map((c, i) => (
                  <div key={i} className="glass-card" style={{ borderLeft: '4px solid var(--danger)' }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: '600' }}>{c.reason_flagged}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Affects stability of "{c.text.substring(0, 80)}..."
                    </p>
                  </div>
                ))}
                {flaggedClauses.length === 0 && <p>No predatory clauses detected. This document is safe to sign.</p>}
              </div>
            </div>

            <div className="glass-panel" style={{ borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '3rem' }}>⚖</span>
               </div>
               <h3 style={{ margin: '0 0 10px 0' }}>Legally Balanced?</h3>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                 Based on {nodes.length} analyzed clauses, this contract is {document_risk_score > 0.5 ? 'heavily skewed towards the issuer.' : 'relatively balanced.'}
               </p>
               <button className="modern-btn" onClick={() => setActiveTab('clauses')}>View Detailed Breakdown</button>
            </div>
          </div>
        </div>
     );
  };

  const renderClauses = () => (
    <div className="fade-in-up">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Flagged Clauses</h2>
      <div className="glass-panel" style={{ borderRadius: '24px', padding: '20px' }}>
        {flaggedClauses.map((c, i) => (
          <div key={i} className="glass-card" style={{ marginBottom: '20px', display: 'flex', gap: '30px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 15px 0', fontSize: '1.1rem', lineHeight: '1.6' }}>{c.text}</p>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <span className="risk-badge high">Predatory</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Score: {(c.risk_score * 100).toFixed(1)}%</span>
              </div>
            </div>
            <div style={{ width: '300px', paddingLeft: '30px', borderLeft: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: '700', color: 'var(--danger)', marginBottom: '5px' }}>ISSUE:</div>
              <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem' }}>{c.reason_flagged}</p>
              <button className="modern-btn primary" style={{ width: '100%' }} onClick={() => handleAddToNegotiate(c)}>
                Negotiate Changes
              </button>
            </div>
          </div>
        ))}
        {flaggedClauses.length === 0 && <p style={{ padding: '40px', textAlign: 'center' }}>No flagged clauses in this document.</p>}
      </div>
    </div>
  );

  return (
    <div className="living-bg" style={{ minHeight: '100vh' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ position: 'fixed', top: '30px', right: '40px', zIndex: 110 }}>
         <button 
           className="modern-btn" 
           style={{ padding: '10px 20px', borderRadius: '15px' }}
           onClick={() => setShowNotifications(!showNotifications)}
         >
           🔔 {notifications.length > 0 && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)', display: 'inline-block', marginLeft: '5px' }}></span>}
         </button>
      </div>

      {showNotifications && <NotificationCenter notifications={notifications} onClose={() => setShowNotifications(false)} />}

      <main className="dashboard-main">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'clauses' && renderClauses()}
        {activeTab === 'negotiation' && (
          <NegotiationKit 
            selectedClauses={selectedClauses} 
            onNegotiate={handleNegotiateAPI} 
          />
        )}
        {activeTab === 'radar' && <ScamRadar />}
      </main>

      {/* Background Decorators */}
      <div className="decorator-top-right"></div>
      <div className="decorator-bottom-left" style={{ opacity: 0.3 }}></div>
    </div>
  );
}

