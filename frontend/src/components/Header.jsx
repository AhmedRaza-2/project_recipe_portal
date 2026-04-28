import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('chefUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    window.addEventListener('authChange', checkUser); // Custom event for same-tab updates
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('authChange', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('chefUser');
    setUser(null);
    navigate('/');
  };

  return (
    <header>
      <div className="container flex-between">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '1.8rem' }}>🍴</span> RecipeNest
        </Link>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/chefs">Chefs List</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons flex" style={{ gap: '1rem' }}>
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/login" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
