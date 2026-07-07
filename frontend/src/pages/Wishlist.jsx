import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../services/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchWishlist();
  }, [user, navigate]);

  const fetchWishlist = async () => {
    try {
      const res = await api.get(`/wishlist/user/${user.id}`);
      setProducts(res.data);
    } catch (e) {
      console.error('Failed to fetch wishlist', e);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/wishlist/user/${user.id}/product/${productId}`);
      fetchWishlist();
    } catch (e) {
      alert('Failed to remove item');
    }
  };

  if (!user) return null;

  return (
    <div className="container" style={{ padding: '20px 0' }}>
      <h1>Your Wishlist</h1>
      {products.length === 0 ? (
        <p>Your wishlist is empty. <Link to="/products">Start shopping</Link></p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {products.map(p => (
            <div key={p.id} className="a-box" style={{ padding: 10, textAlign: 'center' }}>
              <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={p.imageUrl || `https://picsum.photos/200/200?random=${p.id}`} alt={p.name} style={{ width: '100%', height: 150, objectFit: 'contain' }} />
                <h4 style={{ margin: '10px 0 5px 0' }}>{p.name}</h4>
                <p style={{ color: '#B12704', fontWeight: 'bold' }}>₹{p.price}</p>
              </Link>
              <button onClick={() => handleRemove(p.id)} style={{ marginTop: 10, padding: '5px 10px', background: '#f0f2f2', border: '1px solid #d5d9d9', borderRadius: 4, cursor: 'pointer' }}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
