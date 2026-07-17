import api from '../services/api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const cart = {
    items: [
      { id: 1, name: 'Hand-Thrown Ceramic Vase', artisan: 'Elena Studio', price: 120.00, qty: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw' },
      { id: 2, name: 'Minimalist Serving Bowl', artisan: 'Elena Studio', price: 58.00, qty: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaTz-qflZ7IMuB-nWdpZZit1KTgQeWKJw72aUN0UPx4kl2YNnkVIxKM5JhT7C4ZrT9XjlldHtwyp_rRgiIoxZqLKW_8fNKb0x1e3rEgJo2kdmgSQ-rgDTflRmPHAJg8UXAvBhsID5kT3HPcM2Z3otZ2u4zFjCnZ1XkL65chFD6AAKKbzT9KA-av00tTmXK_44-ABgYkqv9Pr151nIMAm_0cpE4yUgmXj5SCtEkyCZJPVbXu9ny_MByCw' }
    ],
    subtotal: 236.00,
    shipping: 12.50,
    tax: 18.88,
    total: 267.38
  };

  const address = { name: 'Jane Doe', line1: '123 Artisan Lane', city: 'Portland', state: 'OR', zip: '97201' };
  const payment = { type: 'Visa', last4: '4242' };

  const handlePlaceOrder = () => {
    setSubmitting(true);
    setTimeout(() => navigate('/order-success'), 2000);
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <Link to="/checkout" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Checkout
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface">Review Your Order</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Details */}
          <div className="flex-1 space-y-6">
            
            {/* Delivery Info */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm flex justify-between items-start">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Shipping Address</h3>
                <p className="font-body-md text-on-surface-variant">{address.name}<br/>{address.line1}<br/>{address.city}, {address.state} {address.zip}</p>
              </div>
              <button className="text-forest-green font-label-sm hover:underline">Edit</button>
            </div>

            {/* Payment Info */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm flex justify-between items-start">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Payment Method</h3>
                <div className="flex items-center gap-2 font-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined">credit_card</span>
                  {payment.type} ending in {payment.last4}
                </div>
              </div>
              <button className="text-forest-green font-label-sm hover:underline">Edit</button>
            </div>

            {/* Items */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Items in your order</h3>
              <div className="space-y-4 divide-y divide-outline-variant/30">
                {cart.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pt-4 first:pt-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-body-md text-on-surface">{item.name}</h4>
                        <span className="font-label-md text-on-surface">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant mb-1">{item.artisan}</p>
                      <p className="font-label-sm text-on-surface-variant">Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[340px] shrink-0">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Order Summary</h2>
              
              <div className="space-y-3 font-body-md mb-6">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Items ({cart.items.length})</span>
                  <span className="text-on-surface">${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="text-on-surface">${cart.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Estimated Tax</span>
                  <span className="text-on-surface">${cart.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-outline-variant/30 pt-3 flex justify-between items-center">
                  <span className="font-headline-sm text-headline-sm text-on-surface">Order Total</span>
                  <span className="font-display-sm text-display-sm text-forest-green">${cart.total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder} 
                disabled={submitting}
                className={`w-full py-3 rounded-lg font-label-md transition-opacity flex justify-center items-center gap-2 ${
                  submitting ? 'bg-forest-green/70 text-white cursor-not-allowed' : 'bg-forest-green text-white hover:opacity-90'
                }`}
              >
                {submitting ? (
                  <><span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>Processing...</>
                ) : 'Place Order'}
              </button>
              
              <p className="font-body-sm text-on-surface-variant text-center mt-4 leading-relaxed">
                By placing your order, you agree to TrueHand's <Link to="/terms" className="underline hover:text-forest-green">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-forest-green">Privacy Policy</Link>.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
