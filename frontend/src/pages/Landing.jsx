import React from 'react';
import { useNavigate } from 'react-router-dom';
import largeMomo from '../assets/large_momo.png';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <img src={largeMomo} alt="Momo Illustration" style={{ position: 'absolute', top: '-50px', left: '-50px', width: '350px', zIndex: 1 }} />
      
      <div style={{ position: 'absolute', top: '40px', right: '40px', zIndex: 2 }}>
        <button 
          onClick={() => navigate('/login')}
          style={{ 
            padding: '10px 40px', 
            borderRadius: '30px', 
            border: '1px solid var(--border-light)', 
            background: 'transparent', 
            color: 'var(--text-primary)',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        >
          LOGIN
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: '10vh' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: 'normal', margin: '0 0 10px 0', letterSpacing: '2px' }}>MOMOTOPSY</h1>
        <p style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-secondary)' }}>Mapping the Rotten Filling in the Fine Print</p>
      </div>

      <div style={{ background: '#ebe4d5', padding: '40px 10%', textAlign: 'center', borderTop: '1px solid var(--border-light)' }}>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem', margin: '0 auto', maxWidth: '800px', color: 'var(--text-secondary)' }}>
          Today, legal agreements are complex, expensive to review, and easy to misuse. Most people accept terms without fully understanding the risks involved. We saw this gap and set out to solve it using technology. Our platform breaks contracts into individual clauses and analyzes each one. It maps how clauses connect, revealing hidden patterns and risk networks. We flag dangerous terms, explain them in simple language, and suggest safer alternatives. This goes beyond summaries—it shows how a contract actually works. Our goal is to make legal understanding accessible to everyone.<br/><br/>
          Because signing should feel like a choice, not a trap.
        </p>
      </div>
    </div>
  );
}
