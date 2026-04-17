import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ isSignup }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/upload');
  };

  return (
    <div className="living-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      <div className="fade-in-up glass-panel" style={{ width: '450px', padding: '60px', borderRadius: '30px', background: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'normal', color: 'var(--text-primary)', letterSpacing: '2px', marginBottom: '40px' }}>
          {isSignup ? "SIGN UP" : "WELCOME"}
        </h1>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '25px' }}>
             <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>IDENTIFICATION</label>
             <input type="text" placeholder="USERNAME / EMAIL" className="premium-input" required />
          </div>

          <div style={{ marginBottom: '25px' }}>
             <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>SECURITY KEY</label>
             <input type="password" placeholder="PASSWORD" className="premium-input" required />
          </div>

          {isSignup && (
            <div style={{ marginBottom: '25px' }}>
               <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>CONFIRMATION</label>
               <input type="password" placeholder="REPEAT PASSWORD" className="premium-input" required />
            </div>
          )}

          {!isSignup && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <input type="checkbox" style={{ accentColor: 'var(--accent-bronze)' }} /> Remember this device
            </label>
          )}

          <button type="submit" className="modern-btn primary" style={{ width: '100%', padding: '15px' }}>
            {isSignup ? 'CREATE ACCOUNT' : 'LOG IN'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0', color: 'var(--border-light)' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
            <span style={{ padding: '0 15px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
          </div>

          <button type="button" className="modern-btn" style={{ width: '100%', marginBottom: '15px' }}>
             CONTINUE WITH GOOGLE
          </button>
          
          {!isSignup ? (
             <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                New to the forensics? <span style={{ color: 'var(--accent-bronze)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/signup')}>Sign Up</span>
             </p>
          ) : (
             <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Already have an account? <span style={{ color: 'var(--accent-bronze)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/login')}>Log In</span>
             </p>
          )}
        </form>

        <button
          type="button"
          className="modern-btn"
          onClick={() => navigate('/upload')}
          style={{ position: 'absolute', top: '-100px', right: '0', fontSize: '0.8rem', padding: '8px 20px', background: 'var(--accent-gold)', color: 'white', border: 'none' }}
        >
          Hackathon Bypass ◈
        </button>
      </div>

      <div className="decorator-top-right" style={{ opacity: 0.3 }}></div>
      <div className="decorator-bottom-left" style={{ opacity: 0.1 }}></div>
    </div>
  );
}

