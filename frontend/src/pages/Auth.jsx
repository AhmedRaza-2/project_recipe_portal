import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ defaultLogin = true }) => {
  const [isLogin, setIsLogin] = useState(defaultLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = isLogin 
      ? 'http://localhost:5000/api/auth/login' 
      : 'http://localhost:5000/api/auth/register';
    
    const body = isLogin 
      ? { email, password } 
      : { email, password, name, specialty: 'New Chef', bio: 'Welcome to my profile!' };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('chefUser', JSON.stringify(user));
        window.dispatchEvent(new Event('authChange'));
        navigate('/dashboard');
      } else {
        try {
          const errorData = await response.json();
          setError(errorData.message || 'Authentication failed');
        } catch (e) {
          const msg = await response.text();
          setError(msg || 'Authentication failed');
        }
      }
    } catch (err) {
      setError('Could not connect to the server');
    }
  };

  return (
    <div className="auth-page flex-center" style={{ minHeight: '80vh', padding: '2rem' }}>
      <div className="auth-card" style={{ 
        background: 'white', 
        padding: '3rem', 
        borderRadius: '20px', 
        boxShadow: 'var(--shadow-lg)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {isLogin ? 'Welcome back to ' : 'Join '}
          <span className="text-orange">RecipeNest</span>
        </h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleSubmit} className="flex" style={{ flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <div className="form-group flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chef John Doe" 
                required
                style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #ddd' }} 
              />
            </div>
          )}
          
          <div className="form-group flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chef@example.com" 
              required
              style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #ddd' }} 
            />
          </div>

          <div className="form-group flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #ddd' }} 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: 'var(--primary-color)', fontWeight: '700', cursor: 'pointer' }}
          >
            {isLogin ? 'Register now' : 'Login here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
