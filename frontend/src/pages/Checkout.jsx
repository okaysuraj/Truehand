import React, { useState } from 'react';
import { useCart } from '../services/CartProvider';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      api.get(`/addresses/user/${user.id}`).then(res => {
        setAddresses(res.data);
        const def = res.data.find(a => a.isDefault);
        if (def && !address) setAddress(`${def.streetAddress}, ${def.city}, ${def.state} ${def.postalCode}`);
      }).catch(e => console.error(e));
    }
  }, [user]);

  const subtotal = getTotal();
  const total = Math.max(0, subtotal - promoDiscount);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} style={{ padding: '10px 20px', marginTop: 20 }}>Shop Now</button>
      </div>
    );
  }

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    try {
      const res = await api.get(`/promo/validate?code=${promoCode}`);
      const promo = res.data;
      let discount = (subtotal * promo.discountPercentage) / 100;
      if (promo.maxDiscountAmount && discount > promo.maxDiscountAmount) {
        discount = promo.maxDiscountAmount;
      }
      setPromoDiscount(discount);
      setPromoMessage(`Promo code applied! You saved ₹${discount.toFixed(2)}`);
    } catch (err) {
      setPromoDiscount(0);
      setPromoMessage('Invalid or expired promo code.');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address) {
      alert("Please enter a delivery address");
      return;
    }
    if (!stripe || !elements) {
      alert("Stripe has not loaded yet.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create PaymentIntent on the server
      const { data: intentData } = await api.post('/payment/create-intent', {
        amount: total,
        currency: 'inr'
      });

      // 2. Confirm Card Payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
          },
        },
      });

      if (error) {
        alert(`Payment failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // 3. Save Order to Backend
        const orderData = {
          totalAmount: total,
          deliveryAddress: address,
          promoCode: promoDiscount > 0 ? promoCode : null,
          specialInstructions: 'Leave at door',
        };
        
        const res = await api.post(`/orders/user/${user.id}`, orderData);
        clearCart();
        alert(`Order Placed Successfully! Order #${res.data.orderNumber}`);
        navigate('/tracking');
      }
    } catch (err) {
      alert(`Failed to place order: ${err.message || 'Unknown error'}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: 20, display: 'flex', gap: 30 }}>
      
      <div style={{ flex: 2 }}>
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Checkout</h2>
        
        <div className="a-box" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20, marginBottom: 20 }}>
          <h3 style={{ marginTop: 0 }}>1. Delivery Address</h3>
          <textarea 
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full address details (Street, City, Zip)"
            style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
            required
          />
          {addresses.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 'bold' }}>Or select a saved address:</p>
              <select 
                onChange={(e) => {
                  const addr = addresses.find(a => a.id === parseInt(e.target.value));
                  if (addr) setAddress(`${addr.streetAddress}, ${addr.city}, ${addr.state} ${addr.postalCode}`);
                }}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              >
                <option value="">-- Select Saved Address --</option>
                {addresses.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.label} - {a.streetAddress}, {a.city}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="a-box" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20, marginBottom: 20 }}>
          <h3 style={{ marginTop: 0 }}>2. Payment Method</h3>
          <div style={{ padding: 15, background: '#f8f8f8', border: '1px solid #ccc', borderRadius: 4 }}>
            <CardElement options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div className="a-box" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20 }}>
          <button 
            onClick={handlePlaceOrder}
            disabled={loading || !stripe}
            style={{ width: '100%', padding: '12px 0', background: '#FFD814', border: 'none', borderRadius: 20, cursor: 'pointer', fontWeight: 'bold', fontSize: 16, marginBottom: 15 }}
          >
            {loading ? 'Processing...' : 'Place Your Order'}
          </button>
          
          <h4 style={{ margin: '0 0 15px 0' }}>Order Summary</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span>Items:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span>Delivery:</span>
            <span>₹0.00</span>
          </div>
          
          {promoDiscount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8, color: '#b12704' }}>
              <span>Promo Discount:</span>
              <span>-₹{promoDiscount.toFixed(2)}</span>
            </div>
          )}

          <div style={{ borderTop: '1px solid #ddd', margin: '15px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 'bold', color: '#b12704' }}>
            <span>Order Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div style={{ borderTop: '1px solid #ddd', margin: '15px 0' }}></div>
          
          <h5 style={{ margin: '0 0 10px 0' }}>Apply Promo Code</h5>
          <div style={{ display: 'flex', gap: 10 }}>
            <input 
              type="text" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter Code"
              style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
            />
            <button 
              onClick={handleApplyPromo}
              style={{ padding: '8px 15px', background: '#e3e6e6', border: '1px solid #a6a6a6', borderRadius: 4, cursor: 'pointer' }}
            >
              Apply
            </button>
          </div>
          {promoMessage && <p style={{ fontSize: 12, marginTop: 10, color: promoDiscount > 0 ? 'green' : 'red' }}>{promoMessage}</p>}
        </div>
      </div>

    </div>
  );
};

export default Checkout;

