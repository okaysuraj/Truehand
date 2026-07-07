import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setSearchQuery(transcript);
      navigate(`/products?search=${encodeURIComponent(transcript)}`);
    };
    recognition.start();
  };

  const handleImageSearch = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert('Image search endpoint placeholder. Searching visually similar products...');
      navigate(`/products?search=visually-similar`);
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to={isAuthenticated ? (user?.role === 'SELLER' ? '/seller/dashboard' : '/profile') : '/'} className="navbar-logo">
          TrueHand
        </Link>
        <div className="nav-search" style={{ display: 'flex', flex: 1, margin: '0 20px', alignItems: 'center' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', flex: 1, background: '#fff', borderRadius: 4, overflow: 'hidden', border: '1px solid #ccc' }}>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', border: 'none', outline: 'none' }}
            />
            <button type="button" onClick={handleVoiceSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 10px', fontSize: 18 }} title="Voice Search">🎤</button>
            <label style={{ cursor: 'pointer', padding: '0 10px', display: 'flex', alignItems: 'center', fontSize: 18 }} title="Image Search">
              📷
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageSearch} />
            </label>
            <button type="submit" style={{ background: '#febd69', border: 'none', cursor: 'pointer', padding: '0 15px', fontWeight: 'bold' }}>🔍</button>
          </form>
        </div>
        <div className="navbar-links">
          <Link to="/products">Shop</Link>
          <a href="#story">Our Story</a>
          <a href="#sell">Sell</a>
          {isAuthenticated && <Link to="/wishlist">Wishlist</Link>}
          <Link to="/compare">Compare</Link>
        </div>
        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <Link to={user?.role === 'SELLER' ? '/seller/dashboard' : '/profile'} className="nav-btn nav-btn-outline">Dashboard</Link>
              <button onClick={logout} className="nav-btn nav-btn-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn nav-btn-outline">Sign In</Link>
              <Link to="/register" className="nav-btn nav-btn-primary">Register</Link>
            </>
          )}
          <button aria-label="Shopping Bag" className="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
