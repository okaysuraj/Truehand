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
  const [isGift, setIsGift] = useState(false);

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
      <div className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop text-center">
        <h2 className="font-headline-lg text-headline-lg text-forest-green mb-8">Your collection is empty</h2>
        <button onClick={() => navigate('/products')} className="px-8 py-4 bg-forest-green text-white font-label-md uppercase tracking-widest hover:bg-forest-green/90 transition-colors">Explore Curated Pieces</button>
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
      setPromoMessage(`Promo code applied! You saved $${discount.toFixed(2)}`);
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
          specialInstructions: isGift ? 'Gift order' : 'Leave at door',
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
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
      {/* Multi-step Progress Indicator */}
      <div className="mb-section-gap max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="flex flex-col items-center z-10">
            <div className="w-10 h-10 rounded-full bg-forest-green text-white flex items-center justify-center mb-stack-sm">
              <span className="material-symbols-outlined text-[20px]">check</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface">Cart</span>
          </div>
          <div className="flex-1 h-[2px] bg-forest-green mx-4 -mt-6"></div>
          <div className="flex flex-col items-center z-10">
            <div className="w-10 h-10 rounded-full border-2 border-forest-green bg-white text-forest-green flex items-center justify-center mb-stack-sm ring-4 ring-forest-green/5">
              <span className="font-label-md">2</span>
            </div>
            <span className="font-label-md text-label-md text-forest-green font-bold">Checkout</span>
          </div>
          <div className="flex-1 h-[2px] bg-surface-container-highest mx-4 -mt-6"></div>
          <div className="flex flex-col items-center z-10">
            <div className="w-10 h-10 rounded-full border-2 border-surface-container-highest bg-white text-on-surface-variant flex items-center justify-center mb-stack-sm">
              <span className="font-label-md">3</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant">Success</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-gutter items-start">
        {/* Left Column: Form */}
        <div className="col-span-12 lg:col-span-8 space-y-stack-lg">
          {/* Shipping Address */}
          <section>
            <div className="mb-stack-lg border-b border-surface-container pb-stack-sm flex justify-between items-end">
              <h2 className="font-headline-md text-headline-md text-forest-green">1. Shipping Address</h2>
            </div>
            <div className="bg-surface border border-surface-container p-stack-lg rounded-sm">
              <textarea 
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full address details (Street, City, Zip)"
                className="w-full bg-transparent border border-outline-variant p-4 font-body-md focus:outline-none focus:border-forest-green rounded-sm mb-4 resize-none"
                required
              />
              {addresses.length > 0 && (
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">Or select a saved address:</p>
                  <select 
                    onChange={(e) => {
                      const addr = addresses.find(a => a.id === parseInt(e.target.value));
                      if (addr) setAddress(`${addr.streetAddress}, ${addr.city}, ${addr.state} ${addr.postalCode}`);
                    }}
                    className="w-full bg-white border border-outline-variant p-3 font-body-md focus:outline-none focus:border-forest-green rounded-sm"
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
          </section>

          {/* Payment Method */}
          <section className="pt-stack-lg">
            <div className="mb-stack-lg border-b border-surface-container pb-stack-sm">
              <h2 className="font-headline-md text-headline-md text-forest-green">2. Payment Method</h2>
            </div>
            <div className="bg-surface border border-surface-container p-stack-lg rounded-sm">
              <div className="p-4 bg-white border border-outline-variant rounded-sm shadow-sm">
                <CardElement options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      fontFamily: '"Hanken Grotesk", sans-serif',
                      color: '#1b1c1b',
                      '::placeholder': {
                        color: '#989692',
                      },
                    },
                    invalid: {
                      color: '#ba1a1a',
                    },
                  },
                }} />
              </div>
            </div>
          </section>

          {/* Additional Options */}
          <section className="pt-stack-lg">
            <div className="flex items-center gap-stack-md p-stack-md bg-surface-container-low border border-dashed border-outline-variant rounded-sm">
              <span className="material-symbols-outlined text-forest-green">redeem</span>
              <div className="flex-1">
                <p className="font-label-md text-label-md text-on-surface">Is this a gift?</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">We'll remove pricing from the invoice.</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={isGift} onChange={() => setIsGift(!isGift)} />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${isGift ? 'bg-forest-green' : 'bg-surface-dim'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isGift ? 'transform translate-x-4' : ''}`}></div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="col-span-12 lg:col-span-4 sticky top-32 space-y-stack-lg">
          <div className="bg-white p-stack-lg border border-surface-container shadow-sm shadow-forest-green/5 rounded-sm">
            <h2 className="font-headline-md text-headline-md text-forest-green mb-stack-lg">Order Summary</h2>
            
            {/* Items Mini Preview */}
            <div className="space-y-stack-md mb-stack-lg pb-stack-lg border-b border-surface-container max-h-[300px] overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-stack-md">
                  <div className="w-16 h-20 bg-surface-container flex-shrink-0 rounded-sm overflow-hidden">
                    <img src={item.imageUrl || `https://picsum.photos/100/100?random=${item.id}`} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between py-1 flex-1">
                    <div>
                      <h4 className="font-label-md text-label-md text-forest-green leading-tight truncate w-[180px]">{item.name}</h4>
                      <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-label-md text-label-md text-forest-green">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-stack-sm mb-stack-lg">
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Shipping</span>
                <span className="text-on-primary-container">Free</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between font-body-md text-body-md text-error-red">
                  <span>Promo Discount</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Tax (Included)</span>
                <span>$0.00</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-stack-md border-t border-forest-green/10 mb-stack-lg">
              <span className="font-headline-md text-headline-md text-forest-green">Total</span>
              <span className="font-display-lg text-[24px] text-forest-green font-bold">${total.toFixed(2)}</span>
            </div>

            {/* CTA */}
            <button 
              onClick={handlePlaceOrder}
              disabled={loading || !stripe}
              className="w-full bg-forest-green text-white py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-forest-green/90 transition-all active:scale-[0.98] shadow-lg shadow-forest-green/20 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Place Order & Pay'}
            </button>
            <div className="mt-stack-md flex items-center justify-center gap-2 text-on-surface-variant opacity-60">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span className="text-label-sm font-label-sm">Secure Encrypted Transaction</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="p-stack-lg bg-surface border border-surface-container rounded-sm">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Have a gift card or promo code?
              <div className="flex gap-2 mt-2">
                <input 
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 bg-white border border-surface-container px-3 py-2 text-label-sm focus:ring-1 focus:ring-forest-green focus:outline-none placeholder:text-outline-variant rounded-sm"
                />
                <button 
                  onClick={handleApplyPromo}
                  className="px-4 py-2 border border-forest-green text-forest-green font-label-sm hover:bg-forest-green hover:text-white transition-all rounded-sm"
                >
                  Apply
                </button>
              </div>
            </label>
            {promoMessage && <p className={`text-label-sm font-label-sm mt-2 ${promoDiscount > 0 ? 'text-on-primary-container' : 'text-error-red'}`}>{promoMessage}</p>}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;

