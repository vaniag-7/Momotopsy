import React from 'react';
import { useNavigate } from 'react-router-dom';
import momoBasket from '../assets/momo_basket.png';

export default function Login({ isSignup }) {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/upload');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 0',
    border: 'none',
    borderBottom: '1px solid var(--border-light)',
    background: 'transparent',
    marginBottom: '25px',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    outline: 'none',
    fontFamily: 'Georgia, serif',
    letterSpacing: '1px'
  };

  const btnStyle = {
    padding: '12px 40px',
    borderRadius: '30px',
    border: '1px solid var(--border-light)',
    background: 'transparent',
    color: 'var(--text-primary)',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'block',
    margin: '10px auto',
    fontFamily: 'inherit'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <img src={momoBasket} alt="Momo Basket" style={{ position: 'absolute', bottom: '20px', left: '20px', width: '250px', zIndex: 1 }} />
      
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'normal', letterSpacing: '4px', marginBottom: '40px', zIndex: 2 }}>
        {isSignup ? "SIGN UP" : "WELCOME BACK"}
      </h1>

      <div style={{ background: '#fcfbfa', padding: '50px', width: '450px', borderRadius: '8px', zIndex: 2 }}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="USERNAME/EMAILID" style={inputStyle} required />
          {isSignup && <input type="email" placeholder="EMAIL ID" style={inputStyle} required />}
          <input type="password" placeholder="PASSWORD" style={inputStyle} required />
          {isSignup && <input type="password" placeholder="CONFIRM PASSWORD" style={inputStyle} required />}
          
          {!isSignup && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <input type="checkbox" /> Remember Me
            </label>
          )}

          <button type="submit" style={btnStyle}>{isSignup ? 'SIGN UP' : 'LOG IN'}</button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0', color: 'var(--border-light)' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
            <span style={{ padding: '0 10px', fontSize: '0.8rem' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
             <button type="button" style={{...btnStyle, flex: 1, margin: 0, padding: '12px 10px', fontSize: '0.8rem'}}>{isSignup ? "SIGN UP WITH GOOGLE" : "SIGN IN WITH GOOGLE"}</button>
             {!isSignup && <button type="button" onClick={() => navigate('/signup')} style={{...btnStyle, flex: 1, margin: 0, padding: '12px 10px', fontSize: '0.8rem'}}>SIGN UP</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
