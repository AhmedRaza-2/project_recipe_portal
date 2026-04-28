import React, { useState } from 'react';

const About = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="about-page container" style={{ padding: '5rem 0' }}>
      <div className="flex-between" style={{ gap: '4rem', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            Empowering <span className="text-orange">Chefs</span> to Share Their Passion
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '2rem' }}>
            RecipeNest was born out of a simple idea: that every chef, whether a professional in a Michelin-starred kitchen 
            or a home cook with a secret family recipe, deserves a platform to showcase their talent.
          </p>
          <div className="stats flex" style={{ gap: '3rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>500+</h3>
              <p>Active Chefs</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>2k+</h3>
              <p>Verified Recipes</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>10k+</h3>
              <p>Monthly Users</p>
            </div>
          </div>
          <button className="btn btn-primary" style={{ padding: '1rem 2rem' }} onClick={() => setShowModal(true)}>
            Learn More About Our Mission
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80" 
            alt="Chef Cooking" 
            style={{ width: '100%', borderRadius: '30px', boxShadow: 'var(--shadow-lg)' }}
          />
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, 
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{
            background: 'white', padding: '3rem', borderRadius: '20px', 
            maxWidth: '600px', width: '90%', position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute', top: '15px', right: '20px', 
                background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'
              }}
            >
              ✖
            </button>
            <h2 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Our Mission</h2>
            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444' }}>
              At RecipeNest, our mission is to democratize culinary arts. We believe that a great recipe is a piece of cultural heritage that deserves to be preserved and shared. 
              We provide the tools, the community, and the platform for chefs to build their digital brand, monetize their skills, and inspire millions of home cooks worldwide.
            </p>
          </div>
        </div>
      )}

      <div style={{ marginTop: '6rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '3rem' }}>Why Choose <span className="text-orange">RecipeNest</span>?</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h3>Fast Performance</h3>
            <p>Our platform is optimized for speed, ensuring your recipes load instantly for your followers.</p>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
            <h3>Secure Hosting</h3>
            <p>Your culinary intellectual property is safe with us. We prioritize data privacy and security.</p>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
            <h3>Mobile Friendly</h3>
            <p>Chefs can manage their profiles and recipes on the go with our fully responsive design.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
