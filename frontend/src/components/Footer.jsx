import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">TrueHand</div>
        
        <div className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#shipping">Shipping</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} TrueHand. Crafted with Intention.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
