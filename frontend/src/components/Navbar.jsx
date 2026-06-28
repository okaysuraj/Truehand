import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to={isAuthenticated ? (user?.role === 'SELLER' ? '/seller/dashboard' : '/profile') : '/'} className="navbar-logo">
          TrueHand
        </Link>
        <div className="navbar-links">
          <a href="#shop">Shop</a>
          <a href="#story">Our Story</a>
          <a href="#sell">Sell</a>
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
