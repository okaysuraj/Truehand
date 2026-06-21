import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // Fetch a few products as "deals"
    api.get('/products?size=6')
      .then(res => setDeals(res.data.content || res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="home-container">
      <div className="hero-banner">
        <div className="hero-text">
          <p>You are on TrueHand.com. You can also shop on TrueHand India for millions of products with fast local delivery.</p>
        </div>
      </div>

      <div className="category-grid">
        <div className="category-card">
          <h3>Gaming accessories</h3>
          <div className="category-card-img" style={{backgroundImage: 'url(https://picsum.photos/400/300?random=1)', backgroundSize:'cover'}}></div>
          <Link to="/products?category=Electronics">See more</Link>
        </div>
        <div className="category-card">
          <h3>Fresh Groceries</h3>
          <div className="category-card-img" style={{backgroundImage: 'url(https://picsum.photos/400/300?random=2)', backgroundSize:'cover'}}></div>
          <Link to="/products?category=Groceries">Shop now</Link>
        </div>
        <div className="category-card">
          <h3>Home & Kitchen</h3>
          <div className="category-card-img" style={{backgroundImage: 'url(https://picsum.photos/400/300?random=3)', backgroundSize:'cover'}}></div>
          <Link to="/products?category=Home">Explore more</Link>
        </div>
        <div className="category-card">
          <h3>Sign in for the best experience</h3>
          <Link to="/login" className="btn btn-primary w-full mt-md">Sign in securely</Link>
        </div>
      </div>

      <div className="a-box" style={{margin: '20px', padding: '20px'}}>
        <h2 style={{marginBottom: '20px'}}>Exciting Deals</h2>
        <div className="products-grid">
          {deals.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img-container">
                <img src={`https://picsum.photos/200/200?random=${p.id}`} alt={p.name} className="product-img" />
              </div>
              <Link to={`/product/${p.id}`}><h3 className="product-title">{p.name}</h3></Link>
              <div className="star-rating">
                ★★★★☆ <span className="rating-count">1,024</span>
              </div>
              <div className="price-display">
                <span className="price-symbol">₹</span>
                <span className="price-whole">{Math.floor(p.price)}</span>
                <span className="price-fraction">{(p.price % 1).toFixed(2).substring(2)}</span>
              </div>
              <div className="prime-badge">✓ prime</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
