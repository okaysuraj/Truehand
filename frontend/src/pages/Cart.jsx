import React from 'react';
import { useCart } from '../services/CartProvider';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-layout">
      <div className="cart-main">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #ddd', paddingBottom: 10, marginBottom: 20}}>
          <h1 style={{fontSize: 28, fontWeight: 400}}>Shopping Cart</h1>
          <span style={{color: '#565959', fontSize: 14}}>Price</span>
        </div>

        {cartItems.length === 0 ? (
          <div style={{padding: '20px 0'}}>
            <h2 style={{fontSize: 20}}>Your TrueHand Cart is empty.</h2>
            <Link to="/products" style={{color: '#007185', display: 'inline-block', marginTop: 10}}>Shop today's deals</Link>
          </div>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={`https://picsum.photos/200/200?random=${item.id}`} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-info">
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to={`/product/${item.id}`} style={{fontSize: 18, color: '#0f1111'}}>{item.name}</Link>
                    <div className="cart-item-price">₹{item.price.toFixed(2)}</div>
                  </div>
                  
                  <div style={{color: '#007600', fontSize: 12, marginTop: 4}}>In stock</div>
                  <div style={{fontSize: 12, color: '#565959', marginTop: 2}}>Eligible for FREE Shipping</div>
                  <div style={{fontSize: 12, marginTop: 2}}>Sold by <span style={{color: '#007185'}}>{item.sellerName || 'TrueHand'}</span></div>
                  
                  <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 16}}>
                    <select 
                      value={item.quantity} 
                      onChange={e => updateQuantity(item.id, Number(e.target.value))}
                      style={{padding: '4px 8px', borderRadius: 8, background: '#f0f2f2', border: '1px solid #d5d9d9', boxShadow: '0 2px 5px rgba(15,17,17,.15)'}}
                    >
                      {[...Array(10).keys()].map(x => (
                        <option key={x+1} value={x+1}>Qty: {x+1}</option>
                      ))}
                    </select>
                    <div style={{color: '#ddd'}}>|</div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{background: 'none', border: 'none', color: '#007185', cursor: 'pointer', fontSize: 14}}
                    >
                      Delete
                    </button>
                    <div style={{color: '#ddd'}}>|</div>
                    <button style={{background: 'none', border: 'none', color: '#007185', cursor: 'pointer', fontSize: 14}}>Save for later</button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{textAlign: 'right', marginTop: 20, fontSize: 18}}>
              Subtotal ({cartItems.reduce((a,c)=>a+c.quantity, 0)} items): <span style={{fontWeight: 'bold'}}>₹{getTotal().toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-sidebar">
          <div style={{color: '#007600', fontSize: 14, marginBottom: 14, display: 'flex', gap: 8}}>
            <span style={{color: 'white', background: '#007600', borderRadius: '50%', width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10}}>✓</span>
            <div>
              Your order is eligible for FREE Delivery. <br/>
              Select this option at checkout.
            </div>
          </div>
          
          <div style={{fontSize: 18, marginBottom: 20}}>
            Subtotal ({cartItems.reduce((a,c)=>a+c.quantity, 0)} items): <span style={{fontWeight: 'bold'}}>₹{getTotal().toFixed(2)}</span>
          </div>
          
          <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, marginBottom: 20}}>
            <input type="checkbox" /> This order contains a gift
          </label>
          
          <button 
            className="btn btn-primary w-full" 
            style={{padding: '8px 0', borderRadius: 8}}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Buy
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
