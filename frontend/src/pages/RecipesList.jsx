import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });
  }, []);

  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.ingredients.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || r.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(recipes.map(r => r.category))];

  if (loading) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading delicious recipes...</div>;

  return (
    <div className="container" style={{ padding: '5rem 0' }}>
      <div className="flex-between" style={{ marginBottom: '4rem', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '3rem' }}>Browse All <span className="text-orange">Recipes</span></h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Discover culinary masterpieces from our global community.</p>
        </div>
        <div className="filters flex" style={{ gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search recipes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid #ddd', width: '300px' }}
          />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid #ddd' }}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '3rem' }}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '5rem' }}>
            <h3>No recipes found matching your criteria.</h3>
            <p>Try searching for something else!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesList;
