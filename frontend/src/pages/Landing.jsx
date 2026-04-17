import React from 'react';
import { useNavigate } from 'react-router-dom';
import largeMomo from '../assets/large_momo.png';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="living-bg" style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>

      <div style={{ position: 'absolute', top: '40px', right: '40px', zIndex: 10 }}>
        <button
          onClick={() => navigate('/login')}
          className="modern-btn"
          style={{ padding: '10px 40px' }}
        >
          LOGIN
        </button>
      </div>

      <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: '1 1 0%', padding: '0 clamp(20px, 10vw, 150px)', zIndex: 2 }}>
        <h1 style={{ position: 'relative', fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 'normal', margin: '0px 0px 10px', letterSpacing: '2px', textShadow: '0 4px 20px rgba(56, 53, 38, 0.1)', lineHeight: 1.1 }}>
          MOMOTOPSY
        </h1>
        <div style={{ maxWidth: '700px' }}>
          <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', margin: '0px 0px 25px', color: 'var(--accent-bronze)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            Mapping the Rotten Filling in the Fine Print
          </p>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: '1.8', opacity: 0.9 }}>
            Automated legal contract analysis. Discover hidden predatory clauses, understand interconnected risk networks, and obtain plain-language explanations before you sign.
          </p>
          
          <button 
            className="modern-btn primary" 
            style={{ marginTop: '40px', padding: '15px 50px', fontSize: '1.1rem' }}
            onClick={() => navigate('/login')}
          >
            GET STARTED
          </button>
        </div>
      </div>

      {/* Hero Momo Illustration */}
      <img
        alt="Momo Illustration"
        src={largeMomo}
        style={{ 
          position: 'absolute', 
          top: '8vh', 
          right: '5vw', 
          width: 'clamp(300px, 45vw, 700px)', 
          transform: 'rotate(12deg)', 
          zIndex: 1, 
          opacity: 0.95,
          filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.15))'
        }}
      />

      <div className="glass-panel" style={{ padding: 'clamp(30px, 6vh, 60px) clamp(20px, 10vw, 150px)', borderTop: '1px solid var(--glass-border)', zIndex: 2, background: 'rgba(255, 255, 255, 0.4)' }}>
        <p style={{ lineHeight: '1.8', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', margin: '0', maxWidth: '50em', color: 'var(--text-secondary)' }}>
          Today, legal agreements are complex, expensive to review, and easy to misuse. Most people accept terms without fully understanding the risks involved. We saw this gap and set out to solve it using technology. Our platform breaks contracts into individual clauses and analyzes each one. It maps how clauses connect, revealing hidden patterns and risk networks. 
          <br /><br />
          <strong>Because signing should feel like a choice, not a trap.</strong>
        </p>
      </div>

      <div className="decorator-top-right" style={{ opacity: 0.4 }}></div>
      <div className="decorator-bottom-left" style={{ opacity: 0.2 }}></div>
    </div>
  );
}

