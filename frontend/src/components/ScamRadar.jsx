import React, { useEffect, useState } from 'react';

const ScamRadar = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/trending-risks')
      .then(res => res.json())
      .then(data => {
        setTrending(data.trending || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch trending risks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fade-in-up">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Scam Radar</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Global trending contract risks identified by Momotopsy across all analyzed documents.</p>

      <div className="glass-panel" style={{ borderRadius: '24px', padding: '40px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '30px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
          Trending Risks (Last 30 Days)
        </h3>

        {loading ? (
          <p>Scanning global patterns...</p>
        ) : trending.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No global patterns identified yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {trending.map((item, i) => {
              const percentage = Math.min((item.count / trending[0].count) * 100, 100);
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '1.1rem' }}>
                    <span style={{ fontWeight: '600' }}>{item.issue}</span>
                    <span style={{ color: 'var(--accent-bronze)', fontWeight: 'bold' }}>{item.count} detections</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-dark)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${percentage}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, var(--accent-bronze), var(--accent-gold))',
                      transition: 'width 1s ease-out'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="glass-card" style={{ marginTop: '50px', background: 'var(--danger-soft)', border: '1px solid var(--danger)' }}>
           <h4 style={{ color: 'var(--danger)', margin: '0 0 10px 0' }}>💡 Risk Insight</h4>
           <p style={{ margin: 0, fontSize: '0.95rem' }}>
             "{trending[0]?.issue || 'Data harvesting'}" is currently the most frequent predatory pattern. We recommend extra scrutiny for any clauses related to this category in your current contract.
           </p>
        </div>
      </div>
    </div>
  );
};

export default ScamRadar;
