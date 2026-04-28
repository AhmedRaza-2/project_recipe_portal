import React, { useState, useEffect } from 'react';
import ChefCard from '../components/ChefCard';

const ChefsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/chefs')
      .then(res => res.json())
      .then(data => {
        setChefs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching chefs:", err);
        setLoading(false);
      });
  }, []);

  const filteredChefs = chefs.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading Chefs...</div>;

  return (
    <div className="chefs-list-page container" style={{ padding: '4rem 0' }}>
      <div className="flex-between" style={{ marginBottom: '3rem' }}>
        <h2>Explore Our <span className="text-orange">Chefs</span></h2>
        <div className="filters flex" style={{ gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search chefs..." 
            style={{ padding: '0.6rem 1rem', borderRadius: '25px', border: '1px solid #ddd', width: '250px' }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select style={{ padding: '0.6rem 1rem', borderRadius: '25px', border: '1px solid #ddd' }}>
            <option>Sort by: Most Popular</option>
            <option>Name (A-Z)</option>
            <option>Most Recipes</option>
          </select>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {filteredChefs.length > 0 ? (
          filteredChefs.map(chef => (
            <ChefCard key={chef.id} chef={{
              ...chef,
              image: chef.profileImageUrl, // Mapping DB field to component prop
              recipeCount: chef.recipeCount || 0,
              likes: chef.likes || 0
            }} />
          ))
        ) : (
          <p>No chefs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default ChefsList;
