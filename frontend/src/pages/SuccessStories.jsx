import React from 'react';

const SuccessStories = () => {
  const stories = [
    {
      name: "Chef Marco Rossi",
      story: "Joining RecipeNest allowed me to reach a global audience. My traditional Italian recipes are now being cooked in over 50 countries!",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
      achievement: "Top Contributor 2023"
    },
    {
      name: "Chef Ayesha Khan",
      story: "I started as a home cook, and through RecipeNest, I've secured a cookbook deal. The community support here is unmatched.",
      image: "https://images.unsplash.com/photo-1583394238182-6f3ad43267b1?w=400&q=80",
      achievement: "Rising Star Award"
    },
    {
      name: "Chef Takashi Yamamoto",
      story: "The platform's focus on quality helped me showcase the intricate art of Kaiseki to the world. It's more than just a recipe site.",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80",
      achievement: "Master of Japanese Cuisine"
    }
  ];

  return (
    <div className="container" style={{ padding: '5rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem' }}>Success <span className="text-orange">Stories</span></h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1rem' }}>Hear from the chefs who have transformed their culinary careers with RecipeNest.</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        {stories.map((story, index) => (
          <div key={index} className="card" style={{ overflow: 'hidden', borderRadius: '20px' }}>
            <img src={story.image} alt={story.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <div style={{ padding: '2rem' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{story.achievement}</h4>
              <h3 style={{ marginBottom: '1rem' }}>{story.name}</h3>
              <p style={{ lineHeight: '1.7', fontStyle: 'italic', color: '#555' }}>"{story.story}"</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '6rem', textAlign: 'center', padding: '5rem', background: 'var(--primary-color)', color: 'white', borderRadius: '30px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Your story starts here.</h2>
        <p style={{ marginBottom: '2.5rem', opacity: 0.9 }}>Join our community and become the next culinary sensation.</p>
        <button className="btn btn-outline" style={{ border: '2px solid white', color: 'white', padding: '1rem 3rem' }}>Register Today</button>
      </div>
    </div>
  );
};

export default SuccessStories;
