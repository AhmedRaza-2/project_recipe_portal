import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChefCard = ({ chef }) => {
  const navigate = useNavigate();
  const [likesCount, setLikesCount] = useState(chef.likes || 0);
  const [isLiking, setIsLiking] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'C';
    const parts = name.trim().split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent card click if we had one
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      const response = await fetch(`http://localhost:5000/api/chefs/${chef.id}/like`, { method: 'POST' });
      if (response.ok) {
        const newCount = await response.json();
        setLikesCount(newCount);
      }
    } catch (err) {
      console.error("Error liking chef:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const hasImage = chef.image && chef.image.startsWith('http');

  return (
    <div className="chef-card" style={{ 
      background: 'white', 
      borderRadius: '20px', 
      overflow: 'hidden', 
      boxShadow: 'var(--shadow-lg)',
      transition: 'var(--transition)',
      border: '1px solid #f0f0f0'
    }}>
      {hasImage ? (
        <div className="chef-img" style={{ 
          height: '220px', 
          background: '#eee', 
          backgroundImage: `url(${chef.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
      ) : (
        <div className="chef-img-placeholder flex-center" style={{ 
          height: '220px', 
          background: 'linear-gradient(135deg, var(--primary-color), #FF8C5A)', 
          color: 'white',
          fontSize: '4rem',
          fontWeight: 'bold',
          letterSpacing: '2px'
        }}>
          {getInitials(chef.name)}
        </div>
      )}
      <div className="chef-info" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>Chef {chef.name}</h3>
        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{chef.specialty}</p>
        <div className="chef-stats flex-center" style={{ gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          <span>📘 {chef.recipeCount} Recipes</span>
          <span 
            onClick={handleLike} 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: isLiking ? 'var(--primary-color)' : 'inherit' }}
            title="Like this chef"
          >
            ❤️ {likesCount}
          </span>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ width: '100%' }}
          onClick={() => navigate(`/profile/${chef.id}`)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ChefCard;
