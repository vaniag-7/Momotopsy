import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Analysis Overview', icon: '◈' },
    { id: 'clauses', label: 'Flagged Clauses', icon: '⚠' },
    { id: 'negotiation', label: 'Negotiation Kit', icon: '✉' },
    { id: 'radar', label: 'Scam Radar', icon: '📡' },
  ];

  return (
    <div className="sidebar-nav">
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', letterSpacing: '4px', color: 'var(--text-primary)', margin: 0 }}>MOMO</h2>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>TOPSY</div>
      </div>

      <div style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span style={{ fontWeight: '500' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '15px', marginTop: 'auto' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Logged in as</div>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Senior Analyst</div>
      </div>
    </div>
  );
};

export default Sidebar;
