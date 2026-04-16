import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import momoBasket from '../assets/momo_basket.png';
import largeMomo from '../assets/large_momo.png';

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleStart = async () => {
    if (!file) {
      setError('Please select or drop a file first.');
      return;
    }
    setError('');
    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Is the backend running?');
      }

      const data = await response.json();
      navigate('/analysis', { state: { analysisData: data } });
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during analysis.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      <div className="deco-circle deco-1"></div>
      <div className="deco-circle deco-2"></div>
      
      <div style={{ position: 'absolute', top: '40px', left: '40px', fontSize: 'clamp(1.5rem, 5vw, 2rem)', letterSpacing: '2px', zIndex: 10 }}>
        MOMOTOPSY
      </div>

      <div style={{ textAlign: 'center', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {isAnalyzing ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '350px', position: 'relative' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'normal', marginBottom: '40px', letterSpacing: '1px' }}>Executing semantic extraction & clause autopsy...</h2>
            
            <div style={{ position: 'relative', width: '250px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '30px' }}>
              
              {/* Paper Background */}
              <div style={{ position: 'absolute', bottom: '10px', width: '120px', height: '140px', background: '#fff', borderRadius: '5px', boxShadow: '0 4px 15px rgba(56, 53, 38, 0.1)', transform: 'rotate(-5deg) translateX(-10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '15px 10px', gap: '15px' }}>
                <div style={{ width: '80%', height: '6px', background: '#e0dcd3', borderRadius: '3px' }}></div>
                <div style={{ width: '70%', height: '6px', background: '#e0dcd3', borderRadius: '3px', alignSelf: 'flex-start', marginLeft: '10%' }}></div>
                <div style={{ width: '85%', height: '6px', background: '#e0dcd3', borderRadius: '3px' }}></div>
                <div style={{ width: '50%', height: '6px', background: '#e0dcd3', borderRadius: '3px', alignSelf: 'flex-start', marginLeft: '10%' }}></div>
              </div>

              {/* Faceless Momo */}
              <div className="momo-body" style={{ position: 'absolute', bottom: '5px', width: '130px', height: '100px', background: 'var(--login-bg-color)', borderRadius: '60px 60px 15px 15px', boxShadow: 'inset -8px -8px 20px rgba(180, 169, 145, 0.4), 0 8px 15px rgba(56, 53, 38, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                
                {/* Wavy base */}
                <div style={{ position: 'absolute', bottom: '-6px', display: 'flex', justifyContent: 'space-evenly', width: '100%', padding: '0 5px' }}>
                   {[...Array(6)].map((_, i) => (
                     <div key={i} style={{ width: '18px', height: '18px', background: 'var(--login-bg-color)', borderRadius: '50%', boxShadow: '0 2px 5px rgba(56,53,38,0.1)' }}></div>
                   ))}
                </div>

                {/* Glasses */}
                <div style={{ position: 'absolute', top: '35px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '3px solid var(--text-primary)', background: 'rgba(255,255,255,0.9)' }}></div>
                  <div style={{ width: '12px', height: '3px', background: 'var(--text-primary)', borderRadius: '2px' }}></div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '3px solid var(--text-primary)', background: 'rgba(255,255,255,0.9)' }}></div>
                </div>
              </div>

              {/* Animated Magnifying Glass */}
              <div className="mag-glass" style={{ position: 'absolute', top: '60px', left: '80px', width: '45px', height: '45px', borderRadius: '50%', border: '5px solid var(--text-primary)', background: 'rgba(252, 251, 250, 0.4)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', zIndex: 5 }}>
                <div style={{ position: 'absolute', width: '6px', height: '30px', background: 'var(--text-primary)', bottom: '-28px', right: '-12px', transform: 'rotate(-45deg)', borderRadius: '3px' }}></div>
              </div>

            </div>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'normal', marginBottom: '10px' }}>Commence Document Analysis</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', letterSpacing: '1px', opacity: 0.9 }}>Secure ingestion via Momotopsy core pipeline</p>

            <div 
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className="fade-in"
              style={{
                width: '100%',
                maxWidth: '600px',
                height: 'clamp(200px, 30vh, 250px)',
                border: `3px dashed ${isDragging ? 'var(--text-primary)' : 'var(--text-secondary)'}`,
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isDragging ? 'rgba(235, 228, 213, 0.8)' : 'rgba(252, 251, 250, 0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: isDragging ? '0 10px 30px rgba(56, 53, 38, 0.15)' : '0 4px 15px rgba(56, 53, 38, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                marginBottom: '20px',
                cursor: 'pointer',
                position: 'relative',
                transform: isDragging ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input 
                type="file" 
                id="file-input" 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg,.docx"
              />
              <span style={{ fontSize: '1.2rem', color: file ? 'var(--text-primary)' : '#9c9586' }}>
                {file ? file.name : 'Drag & Drop your contract here'}
              </span>
            </div>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '30px', opacity: 0.8 }}>
              Supported forensics: .PDF / .JPG / .DOCX / .PNG <br/> <span style={{ fontSize: '0.9rem' }}>End-to-End Encrypted Processing</span>
            </p>

            {error && <p style={{ color: 'var(--danger)', marginBottom: '20px' }}>{error}</p>}

            <button 
              onClick={handleStart}
              className="action-btn"
              style={{
                padding: '12px 30px',
                borderRadius: '30px',
                border: '1px solid var(--border-light)',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                letterSpacing: '2px'
              }}
            >
              INITIATE AUTOPSY
            </button>
          </>
        )}
      </div>
    </div>
  );
}
