import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ChefsList from './pages/ChefsList';
import ChefProfile from './pages/ChefProfile';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import RecipesList from './pages/RecipesList';
import Guidelines from './pages/Guidelines';
import SuccessStories from './pages/SuccessStories';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chefs" element={<ChefsList />} />
            <Route path="/recipes" element={<RecipesList />} />
            <Route path="/about" element={<About />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/success" element={<SuccessStories />} />
            <Route path="/join" element={<Auth defaultLogin={false} />} />
            <Route path="/submit" element={<Dashboard />} />
            <Route path="/profile" element={<ChefProfile />} />
            <Route path="/profile/:id" element={<ChefProfile />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
