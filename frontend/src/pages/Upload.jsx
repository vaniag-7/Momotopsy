import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      
      <div style={{ position: 'absolute', top: '40px', left: '40px', fontSize: '2rem', letterSpacing: '2px' }}>
        MOMOTOPSY
      </div>

      <div style={{ textAlign: 'center', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'normal', marginBottom: '10px' }}>What's inside your Contract?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Drop your contract to analyze filling</p>

        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          style={{
            width: '600px',
            height: '250px',
            border: `3px dashed ${isDragging ? 'var(--text-primary)' : 'var(--text-secondary)'}`,
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isDragging ? '#f0ede1' : 'transparent',
            transition: 'background 0.2s',
            marginBottom: '20px',
            cursor: 'pointer',
            position: 'relative'
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

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>
          Supported files: .PDF/ .JPG/ .DOCX / .PNG
        </p>

        {error && <p style={{ color: 'var(--danger)', marginBottom: '20px' }}>{error}</p>}

        <button 
          onClick={handleStart}
          disabled={isAnalyzing}
          style={{
            padding: '12px 30px',
            borderRadius: '30px',
            border: '1px solid var(--border-light)',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontWeight: 'bold',
            cursor: isAnalyzing ? 'wait' : 'pointer',
            fontSize: '1rem',
            fontFamily: 'inherit',
            letterSpacing: '1px'
          }}
        >
          {isAnalyzing ? 'ANALYZING...' : 'START MOMOTOPSY'}
        </button>
      </div>
    </div>
  );
}
