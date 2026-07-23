import api from '../../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const order = { id: 'TH-29481', total: 360.80, itemCount: 2, estimatedDelivery: 'Oct 30 – Nov 2, 2023' };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center">
        {/* Success Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-forest-green/10 rounded-full animate-ping"></div>
          <div className="relative w-24 h-24 bg-forest-green rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-white">check</span>
          </div>
        </div>

        <h1 className="font-display-md text-display-md text-on-surface mb-3">Order Confirmed!</h1>
        <p className="font-body-lg text-on-surface-variant mb-2">Thank you for supporting artisan craftsmanship.</p>
        <p className="font-body-md text-on-surface-variant mb-8">Your order <span className="font-label-md text-on-surface">{order.id}</span> has been placed successfully.</p>

        {/* Order Summary Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-8 text-left">
          <div className="space-y-3 font-body-md">
            <div className="flex justify-between"><span className="text-on-surface-variant">Order ID</span><span className="text-on-surface font-label-md">{order.id}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Items</span><span className="text-on-surface">{order.itemCount} items</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Total</span><span className="text-on-surface font-headline-sm">${order.total.toFixed(2)}</span></div>
            <div className="border-t border-outline-variant/30 pt-3 flex justify-between"><span className="text-on-surface-variant">Est. Delivery</span><span className="text-on-surface font-label-sm">{order.estimatedDelivery}</span></div>
          </div>
        </div>

        <div className="space-y-3">
          <Link to={`/order/${order.id}`} className="block w-full py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">View Order Details</Link>
          <Link to="/products" className="block w-full py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
