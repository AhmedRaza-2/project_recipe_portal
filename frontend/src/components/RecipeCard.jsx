import React, { useState } from 'react';

const RecipeCard = ({ recipe }) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="recipe-card" style={{ 
      background: 'white', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      border: '1px solid #eee',
      padding: '1.5rem'
    }}>
      <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{recipe.name}</h3>
      <div className="flex" style={{ gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
        <span style={{ background: '#FFF7ED', color: '#EA580C', padding: '2px 8px', borderRadius: '4px' }}>{recipe.category}</span>
        <span className="text-muted">⏱️ {recipe.timeToPrepare}</span>
      </div>
      <p style={{ fontSize: '0.9rem', color: '#4B5563', marginBottom: '1rem' }}>
        {showFull ? recipe.instructions : `${recipe.instructions?.substring(0, 100)}...`}
      </p>
      <div className="flex-between">
        <button 
          onClick={() => setShowFull(!showFull)}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--primary-color)', 
            fontWeight: '600', 
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {showFull ? 'Show Less' : 'Read More'}
        </button>
        <div className="flex" style={{ gap: '0.5rem' }}>
          {/* Social share icons */}
          <span style={{ cursor: 'pointer', fontSize: '1.2rem' }}>🔗</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
