import React, { useState } from 'react';
import { useCart } from '../services/CartProvider';
import { useAuth } from '../services/AuthProvider';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe (ensure you have your test key in .env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

const CheckoutContent = () => {
  const { cartItems, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || '');
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const placeOrder = async () => {
    if (!address) { alert('Enter delivery address'); return; }
    if (cartItems.length === 0) { alert('Cart is empty'); return; }
    if (!stripe || !elements) { alert('Stripe is not initialized'); return; }
    
    setLoading(true);
    try {
      // 1. Create Payment Intent on backend
      const totalAmount = getTotal();
      const paymentRes = await api.post('/payment/create-intent', {
        amount: totalAmount,
        currency: 'inr'
      });
      
      const clientSecret = paymentRes.data.clientSecret;

      // 2. Confirm the payment on the client
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.firstName + ' ' + user?.lastName,
          },
        }
      });

      if (result.error) {
        alert(result.error.message);
        setLoading(false);
        return;
      }

      // 3. Payment succeeded, create the order
      if (result.paymentIntent.status === 'succeeded') {
        const orderData = {
          totalAmount: totalAmount,
          deliveryAddress: address,
          paymentStatus: 'PAID',
          status: 'CONFIRMED'
        };
        const res = await api.post('/orders', orderData);
        clearCart();
        navigate(`/tracking/${res.data.id}`);
      }
    } catch (err) {
      alert(err.response?.data || 'Error processing payment and placing order');
    }
    setLoading(false);
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  return (
    <div style={{background: '#eaeded', minHeight: '100vh', paddingBottom: 40}}>
      {/* Checkout Header */}
      <div style={{background: 'linear-gradient(to bottom, #fff, #f6f6f6)', borderBottom: '1px solid #ddd', padding: '14px 0', textAlign: 'center'}}>
        <div style={{fontSize: 28, fontWeight: 300}}>
          <span style={{float: 'left', marginLeft: 20, fontWeight: 'bold', fontSize: 24}}>True<span style={{color: '#f08804'}}>Hand</span></span>
          Checkout (<span style={{color: '#007185'}}>{cartItems.reduce((a,c)=>a+c.quantity, 0)} items</span>)
          <span style={{float: 'right', marginRight: 20, fontSize: 20}}>🔒</span>
        </div>
      </div>

      <div style={{maxWidth: 1000, margin: '20px auto', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20}}>
        
        {/* Main flow */}
        <div>
          <div className="a-box" style={{marginBottom: 20, background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20}}>
            <div className="a-box-inner" style={{display: 'flex', gap: 20}}>
              <div style={{fontWeight: 'bold', width: 20}}>1</div>
              <div style={{flexGrow: 1}}>
                <div style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>Delivery address</div>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                  placeholder="Enter your full address"
                  style={{width: '100%', padding: 8}}
                />
              </div>
            </div>
          </div>

          <div className="a-box" style={{marginBottom: 20, background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20}}>
            <div className="a-box-inner" style={{display: 'flex', gap: 20}}>
              <div style={{fontWeight: 'bold', width: 20}}>2</div>
              <div style={{flexGrow: 1}}>
                <div style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>Payment method (Stripe)</div>
                <div style={{border: '1px solid #ccc', padding: 12, borderRadius: 4, background: '#f8f9fa'}}>
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
                <div style={{color: '#007185', fontSize: 12, marginTop: 10}}>
                  Payments are securely processed by Stripe. TrueHand does not store your credit card information.
                </div>
              </div>
            </div>
          </div>

          <div className="a-box" style={{background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20}}>
            <div className="a-box-inner" style={{display: 'flex', gap: 20}}>
              <div style={{fontWeight: 'bold', width: 20}}>3</div>
              <div style={{flexGrow: 1}}>
                <div style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>Review items and delivery</div>
                
                <div style={{border: '1px solid #d5d9d9', borderRadius: 8, padding: 14}}>
                  <div style={{color: '#007600', fontWeight: 'bold', marginBottom: 14}}>Guaranteed delivery: Tomorrow</div>
                  <div style={{fontSize: 12, color: '#565959', marginBottom: 14}}>Items dispatched by TrueHand</div>
                  
                  {cartItems.map(item => (
                    <div key={item.id} style={{display: 'flex', gap: 14, marginBottom: 14}}>
                      <img src={item.imageUrl || `https://picsum.photos/100/100?random=${item.id}`} alt="" style={{width: 80, height: 80, objectFit: 'contain'}} />
                      <div>
                        <div style={{fontWeight: 'bold'}}>{item.name}</div>
                        <div style={{color: '#B12704', fontWeight: 'bold'}}>₹{item.price.toFixed(2)}</div>
                        <div style={{fontSize: 12}}>Quantity: {item.quantity}</div>
                        <div style={{fontSize: 12}}>Sold by: {item.sellerName || 'TrueHand'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="a-box" style={{height: 'fit-content', background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20}}>
          <div className="a-box-inner">
            <button 
              className="btn btn-primary w-full" 
              style={{width: '100%', padding: '10px 0', borderRadius: 8, fontSize: 14, marginBottom: 10, background: '#FFD814', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}
              onClick={placeOrder}
              disabled={loading || !stripe}
            >
              {loading ? 'Processing...' : 'Place Your Order'}
            </button>
            <div style={{fontSize: 11, color: '#565959', textAlign: 'center', marginBottom: 20}}>
              By placing your order, you agree to TrueHand's privacy notice and conditions of use.
            </div>
            
            <h3 style={{fontSize: 18, marginBottom: 14}}>Order Summary</h3>
            
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4}}>
              <span>Items:</span>
              <span>₹{getTotal().toFixed(2)}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4}}>
              <span>Delivery:</span>
              <span>₹0.00</span>
            </div>
            
            <hr style={{margin: '10px 0', border: 'none', borderTop: '1px solid #d5d9d9'}} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 'bold', color: '#B12704'}}>
              <span>Order Total:</span>
              <span>₹{getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Wrap the Checkout component in the Stripe Elements provider
const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContent />
    </Elements>
  );
};

export default Checkout;
