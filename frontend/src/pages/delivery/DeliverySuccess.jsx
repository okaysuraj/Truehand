import api from '../../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const DeliverySuccess = () => {
  const delivery = { id: 'DEL-4819', orderId: 'TH-29462', customer: 'Michael T.', completedAt: '2:45 PM', duration: '22 min', distance: '5.8 km', tip: 5.00, earnings: 12.50 };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-forest-green/10 rounded-full animate-ping"></div>
          <div className="relative w-24 h-24 bg-forest-green rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-white">check</span>
          </div>
        </div>

        <h1 className="font-display-md text-display-md text-on-surface mb-3">Delivery Complete!</h1>
        <p className="font-body-md text-on-surface-variant mb-8">Package delivered to {delivery.customer}.</p>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-8 text-left">
          <div className="space-y-3 font-body-md">
            <div className="flex justify-between"><span className="text-on-surface-variant">Delivery ID</span><span className="text-on-surface font-label-md">{delivery.id}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Order</span><span className="text-on-surface font-label-md">{delivery.orderId}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Duration</span><span className="text-on-surface">{delivery.duration}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Distance</span><span className="text-on-surface">{delivery.distance}</span></div>
            <div className="border-t border-outline-variant/30 pt-3 space-y-2">
              <div className="flex justify-between"><span className="text-on-surface-variant">Delivery Fee</span><span className="text-on-surface">${delivery.earnings.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-on-surface-variant">Tip</span><span className="text-forest-green font-label-md">+${delivery.tip.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-outline-variant/30 pt-2"><span className="font-label-md text-on-surface">Total Earned</span><span className="font-headline-sm text-forest-green">${(delivery.earnings + delivery.tip).toFixed(2)}</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link to="/delivery/assigned" className="block w-full py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">View Next Delivery</Link>
          <Link to="/delivery/dashboard" className="block w-full py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default DeliverySuccess;
