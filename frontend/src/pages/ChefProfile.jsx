import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const ChefProfile = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no id, default to first chef for demo, otherwise use ID from URL
    const chefId = id || 1; 
    fetch(`http://localhost:5000/api/chefs/${chefId}`)
      .then(res => res.json())
      .then(data => {
        setChef(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching chef profile:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading Profile...</div>;
  if (!chef) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Chef not found.</div>;

  const getInitials = (name) => {
    if (!name) return 'C';
    const parts = name.trim().split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const hasImage = chef.profileImageUrl && chef.profileImageUrl.startsWith('http');

  return (
    <div className="chef-profile-page container" style={{ padding: '4rem 0' }}>
      <div className="profile-header flex" style={{ gap: '3rem', marginBottom: '4rem', alignItems: 'flex-start' }}>
        <div className="profile-img-container" style={{ flex: '0 0 300px' }}>
          {hasImage ? (
            <img 
              src={chef.profileImageUrl} 
              alt={chef.name} 
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '20px', boxShadow: 'var(--shadow-lg)' }} 
            />
          ) : (
            <div className="flex-center" style={{ 
              width: '100%', 
              height: '300px', 
              borderRadius: '20px', 
              boxShadow: 'var(--shadow-lg)',
              background: 'linear-gradient(135deg, var(--primary-color), #FF8C5A)', 
              color: 'white',
              fontSize: '5rem',
              fontWeight: 'bold',
              letterSpacing: '2px'
            }}>
              {getInitials(chef.name)}
            </div>
          )}
        </div>
        <div className="profile-details" style={{ flex: '1' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Chef <span className="text-orange">{chef.name}</span></h1>
          <p className="specialty" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#4B5563', marginBottom: '1.5rem' }}>
            {chef.specialty || 'Emerging Culinary Artist'}
          </p>
          <p className="bio" style={{ fontSize: '1.05rem', color: '#6B7280', lineHeight: '1.7', marginBottom: '2rem' }}>
            {chef.bio || `Welcome to the profile of Chef ${chef.name}. They are passionate about sharing their culinary creations with the world.`}
          </p>
          
          <div className="contact-links flex" style={{ gap: '1.5rem', alignItems: 'center' }}>
            <button className="btn btn-primary">Connect with Chef</button>
            <button 
              onClick={async () => {
                try {
                  const response = await fetch(`http://localhost:5000/api/chefs/${chef.id}/like`, { method: 'POST' });
                  if (response.ok) {
                    const newCount = await response.json();
                    setChef({ ...chef, likes: newCount });
                  }
                } catch (err) {
                  console.error("Error liking chef:", err);
                }
              }}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              ❤️ {chef.likes} Likes
            </button>
            <div className="social-icons flex" style={{ gap: '1rem', fontSize: '1.5rem' }}>
              <span style={{ cursor: 'pointer' }}>📸</span>
              <span style={{ cursor: 'pointer' }}>🐦</span>
              <span style={{ cursor: 'pointer' }}>🌐</span>
            </div>
          </div>
        </div>

      </div>

      <section className="recipe-portfolio">
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Recipe <span className="text-orange">Portfolio</span></h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {chef.recipes && chef.recipes.length > 0 ? (
            chef.recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={{
                ...recipe,
                time: recipe.timeToPrepare // Map backend field
              }} />
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>This chef hasn't posted any recipes yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChefProfile;
