import React from 'react';

const NotificationCenter = ({ notifications, onClose }) => {
  return (
    <div className="glass-panel slide-in-right" style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      width: '350px', 
      maxHeight: '80vh', 
      zIndex: 200, 
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Notifications</h3>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
      </div>

      <div style={{ padding: '10px', overflowY: 'auto', flex: 1 }}>
        {notifications.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No recent alerts. Everything looks clear.
          </div>
        ) : (
          notifications.map((notif, i) => (
            <div key={i} className="glass-card" style={{ marginBottom: '10px', padding: '15px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                <span className={`risk-badge ${notif.severity}`}>
                   {notif.severity}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{notif.time}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '500' }}>{notif.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
