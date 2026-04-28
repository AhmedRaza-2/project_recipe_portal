import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [chefData, setChefData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: '', category: '', timeToPrepare: '', ingredients: '', instructions: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [activeTab, setActiveTab] = useState('overview');

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('chefUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Fetch recipes for this chef
    fetch(`http://localhost:5000/api/chefs/${parsedUser.id}`)
      .then(res => res.json())
      .then(data => {
        setChefData(data);
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newRecipe, chefId: user.id })
      });
      if (response.ok) {
        const addedRecipe = await response.json();
        setRecipes([...recipes, addedRecipe]);
        setShowAddForm(false);
        setNewRecipe({ name: '', category: '', timeToPrepare: '', ingredients: '', instructions: '' });
        showToast("Recipe added successfully!", "success");
      } else {
        const errorData = await response.json();
        showToast(errorData.title || "Failed to add recipe. Please check your inputs.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Failed to add recipe.", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setRecipes(recipes.filter(r => r.id !== id));
          showToast("Recipe deleted successfully!", "success");
        } else {
          showToast("Failed to delete recipe on server.", "error");
        }
      } catch (err) {
        showToast("Network error. Failed to delete recipe.", "error");
      }
    }
  };

  if (loading) return <div className="container" style={{ padding: '4rem 0' }}>Loading Dashboard...</div>;

  return (
    <div className="dashboard-layout flex">
      <aside className="sidebar">
        <div className="sidebar-menu">
          <div className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>📊 Dashboard</div>
          <div className="menu-item" onClick={() => navigate(`/profile/${user.id}`)}>👤 My Public Profile</div>
          <div className={`menu-item ${activeTab === 'recipes' ? 'active' : ''}`} onClick={() => setActiveTab('recipes')}>📜 My Recipes</div>
          <div className="menu-item" onClick={() => {
            localStorage.removeItem('chefUser');
            window.dispatchEvent(new Event('authChange'));
            navigate('/login');
          }}>🚪 Logout</div>
        </div>
      </aside>

      <main className="dashboard-content container">
        <div className="flex-between" style={{ marginBottom: '2.5rem', marginTop: '2rem' }}>
          <div>
            <h1>Welcome back, <span className="text-orange">Chef {user?.name}!</span> 👨‍🍳</h1>
            <p className="text-muted">Manage your recipes and track your culinary success</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : '+ Add New Recipe'}
          </button>
        </div>

        {toast.show && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '8px',
            background: toast.type === 'success' ? '#D1FAE5' : '#FEE2E2',
            color: toast.type === 'success' ? '#065F46' : '#991B1B',
            border: `1px solid ${toast.type === 'success' ? '#34D399' : '#F87171'}`
          }}>
            {toast.message}
          </div>
        )}

        {showAddForm && (
          <div className="card" style={{ padding: '2rem', marginBottom: '3rem', background: '#f9f9f9' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Add New Recipe</h3>
            <form onSubmit={handleAddRecipe} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <input 
                type="text" placeholder="Recipe Name" required
                value={newRecipe.name} onChange={e => setNewRecipe({...newRecipe, name: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input 
                type="text" placeholder="Category (e.g. Italian, Dessert)" required
                value={newRecipe.category} onChange={e => setNewRecipe({...newRecipe, category: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input 
                type="text" placeholder="Time to Prepare (e.g. 30 mins)" required
                value={newRecipe.timeToPrepare} onChange={e => setNewRecipe({...newRecipe, timeToPrepare: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input 
                type="text" placeholder="Ingredients (comma separated)" required
                value={newRecipe.ingredients} onChange={e => setNewRecipe({...newRecipe, ingredients: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <textarea 
                placeholder="Instructions" required
                value={newRecipe.instructions} onChange={e => setNewRecipe({...newRecipe, instructions: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', gridColumn: 'span 2', height: '100px' }}
              ></textarea>
              <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2' }}>Save Recipe</button>
            </form>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="stats-grid grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="stat-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📜</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{recipes.length}</div>
              <div className="text-muted" style={{ fontSize: '0.9rem' }}>Total Recipes</div>
            </div>
            {/* Static stats for now */}
            <div className="stat-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>❤️</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{chefData?.likes || 0}</div>
              <div className="text-muted" style={{ fontSize: '0.9rem' }}>Total Likes</div>
            </div>
          </div>
        )}

        {(activeTab === 'overview' || activeTab === 'recipes') && (
          <div className="recipes-table-card" style={{ background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>My Recipes</h2>
            {recipes.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '1rem' }}>RECIPE NAME</th>
                    <th style={{ padding: '1rem' }}>CATEGORY</th>
                    <th style={{ padding: '1rem' }}>TIME</th>
                    <th style={{ padding: '1rem' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.map(recipe => (
                    <tr key={recipe.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                      <td style={{ padding: '1rem', fontWeight: '600' }}>{recipe.name}</td>
                      <td style={{ padding: '1rem' }}>{recipe.category}</td>
                      <td style={{ padding: '1rem' }}>{recipe.timeToPrepare}</td>
                      <td style={{ padding: '1rem' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>📝</button>
                        <button 
                          onClick={() => handleDelete(recipe.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>You haven't added any recipes yet.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
