import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title">Handmade with Intention</h1>
        <p className="hero-subtitle">
          Discover curated pieces from independent makers, crafted with care and designed
          to bring warmth and authenticity into your space.
        </p>
        <button className="btn-primary">Explore the Collection</button>
      </div>
    </section>
  );
};

export default Hero;
