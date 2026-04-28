import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>About RecipeNest</h4>
            <p style={{ color: '#D1D5DB', fontSize: '0.95rem' }}>
              RecipeNest is your ultimate destination for discovering and sharing authentic recipes from professional and home chefs around the world.
            </p>
            <div className="social-links flex" style={{ gap: '1rem', marginTop: '1.5rem' }}>
              {/* Simple icons placeholders */}
              <span style={{ cursor: 'pointer' }}>FB</span>
              <span style={{ cursor: 'pointer' }}>TW</span>
              <span style={{ cursor: 'pointer' }}>IG</span>
              <span style={{ cursor: 'pointer' }}>YT</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">Browse Recipes</Link></li>
              <li><Link to="/chefs">Find Chefs</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>For Chefs</h4>
            <ul>
              <li><Link to="/join">Join as Chef</Link></li>
              <li><Link to="/submit">Submit Recipe</Link></li>
              <li><Link to="/guidelines">Chef Guidelines</Link></li>
              <li><Link to="/success">Success Stories</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul style={{ color: '#D1D5DB' }}>
              <li className="flex" style={{ gap: '0.5rem' }}>📧 info@recipenest.com</li>
              <li className="flex" style={{ gap: '0.5rem' }}>📞 +1 234 567 8900</li>
              <li className="flex" style={{ gap: '0.5rem' }}>📍 123 Culinary Street, Food City</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 RecipeNest. All rights reserved. Made with ❤️ for food lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
