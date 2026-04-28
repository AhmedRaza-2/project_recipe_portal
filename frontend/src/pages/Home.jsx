import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="fade-in">Discover the Art of <span className="text-orange">Gourmet Cooking</span></h1>
            <p className="fade-in-delay">Join the world's most exclusive community of professional chefs and culinary enthusiasts.</p>
            <div className="hero-btns fade-in-delay">
              <Link to="/chefs" className="btn btn-primary" style={{ textDecoration: 'none' }}>Explore Chefs</Link>
              <Link to="/login" className="btn btn-outline" style={{ border: '2px solid white', color: 'white', textDecoration: 'none' }}>Join as a Chef</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features container" style={{ padding: '6rem 0' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          <div className="feature-item" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🥘</div>
            <h3>Share Recipes</h3>
            <p className="text-muted">Upload your unique culinary creations and share them with a global audience.</p>
          </div>
          <div className="feature-item" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>👨‍🍳</div>
            <h3>Build Your Brand</h3>
            <p className="text-muted">Create a professional chef profile and showcase your experience and specialties.</p>
          </div>
          <div className="feature-item" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🌟</div>
            <h3>Get Discovered</h3>
            <p className="text-muted">Connect with food lovers and potentially open doors to new culinary opportunities.</p>
          </div>
        </div>
      </section>

      <section className="cta" style={{ background: '#1a1a1a', color: 'white', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem' }}>Ready to start your <span className="text-orange">Culinary Journey?</span></h2>
          <p style={{ marginBottom: '2.5rem', opacity: 0.8 }}>Join thousands of chefs who have already found their home at RecipeNest.</p>
          <Link to="/login" className="btn btn-primary" style={{ padding: '1.2rem 3rem', textDecoration: 'none' }}>Get Started for Free</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
