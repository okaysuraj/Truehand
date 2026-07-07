import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Compare = () => {
  const [compareItems, setCompareItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('compareItems')) || [];
    setCompareItems(items);
  }, []);

  const handleRemove = (id) => {
    const newItems = compareItems.filter(item => item.id !== id);
    setCompareItems(newItems);
    localStorage.setItem('compareItems', JSON.stringify(newItems));
  };

  if (compareItems.length === 0) {
    return (
      <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
        <h2>Compare Products</h2>
        <p>You haven't selected any products to compare.</p>
        <Link to="/products" style={{ color: '#007185', textDecoration: 'none' }}>Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '20px 0' }}>
      <h1>Compare Products</h1>
      <div style={{ overflowX: 'auto', marginTop: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ width: '20%', border: '1px solid #ddd', padding: 10, background: '#f8f8f8', textAlign: 'left' }}>Features</th>
              {compareItems.map(item => (
                <th key={item.id} style={{ width: `${80 / compareItems.length}%`, border: '1px solid #ddd', padding: 10, textAlign: 'center', background: '#fff' }}>
                  <img src={item.imageUrl || `https://picsum.photos/200/200?random=${item.id}`} alt={item.name} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                  <div style={{ marginTop: 10 }}>
                    <Link to={`/product/${item.id}`} style={{ color: '#007185', textDecoration: 'none' }}>{item.name}</Link>
                  </div>
                  <button onClick={() => handleRemove(item.id)} style={{ marginTop: 10, padding: '4px 8px', background: '#f0f2f2', border: '1px solid #d5d9d9', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Remove</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 10, fontWeight: 'bold', background: '#f8f8f8' }}>Price</td>
              {compareItems.map(item => (
                <td key={item.id} style={{ border: '1px solid #ddd', padding: 10, textAlign: 'center', color: '#B12704', fontWeight: 'bold' }}>₹{item.price}</td>
              ))}
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 10, fontWeight: 'bold', background: '#f8f8f8' }}>Category</td>
              {compareItems.map(item => (
                <td key={item.id} style={{ border: '1px solid #ddd', padding: 10, textAlign: 'center' }}>{item.category}</td>
              ))}
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 10, fontWeight: 'bold', background: '#f8f8f8' }}>Description</td>
              {compareItems.map(item => (
                <td key={item.id} style={{ border: '1px solid #ddd', padding: 10, fontSize: 14 }}>{item.description}</td>
              ))}
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: 10, fontWeight: 'bold', background: '#f8f8f8' }}>Availability</td>
              {compareItems.map(item => (
                <td key={item.id} style={{ border: '1px solid #ddd', padding: 10, textAlign: 'center', color: item.stockQuantity > 0 ? 'green' : 'red' }}>
                  {item.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
