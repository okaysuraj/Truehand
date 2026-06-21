import React from 'react';
import './NewArrivals.css';

const products = [
  { id: 1, name: 'Speckled Vase', price: '$65', image: '/images/product-vase.jpg' },
  { id: 2, name: 'Linen Throw', price: '$120', image: '/images/product-throw.jpg' },
  { id: 3, name: 'Walnut Spoon', price: '$35', image: '/images/product-spoon.jpg' },
  { id: 4, name: 'Raw Emerald Ring', price: '$185', image: '/images/product-ring.jpg' },
];

const NewArrivals = () => {
  return (
    <section className="new-arrivals container">
      <div className="arrivals-header">
        <h2 className="section-title">New Arrivals</h2>
        <a href="#shop-all" className="view-all">View All <span>&rarr;</span></a>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
