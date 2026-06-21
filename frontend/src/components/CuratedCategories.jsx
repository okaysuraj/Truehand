import React from 'react';
import './CuratedCategories.css';

const CuratedCategories = () => {
  return (
    <section className="categories-section container">
      <div className="section-header">
        <h2 className="section-title">Curated Categories</h2>
        <p className="section-subtitle">Explore by material and discipline</p>
      </div>
      
      <div className="categories-grid">
        <div className="category-card ceramics" style={{ backgroundImage: "url('/images/category-ceramics.jpg')" }}>
          <div className="category-content">
            <h3 className="category-name">Ceramics</h3>
            <span className="category-chip">Earthy Textures</span>
          </div>
        </div>
        
        <div className="category-card textiles" style={{ backgroundImage: "url('/images/category-textiles.jpg')" }}>
          <div className="category-content">
            <h3 className="category-name">Textiles</h3>
            <span className="category-chip">Woven Comfort</span>
          </div>
        </div>
        
        <div className="category-card jewelry" style={{ backgroundImage: "url('/images/category-jewelry.jpg')" }}>
          <div className="category-content">
            <h3 className="category-name">Jewelry</h3>
            <span className="category-chip">Fine Details</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedCategories;
