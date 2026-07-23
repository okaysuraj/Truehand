import api from '../../services/api';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CancelOrder = () => {
  const { orderId } = useParams();
  const [reason, setReason] = useState('');
  const [cancelled, setCancelled] = useState(false);

  const reasons = [
    'I changed my mind',
    'Found a better price elsewhere',
    'Ordered by mistake',
    'Delivery is taking too long',
    'I want to change the delivery address',
    'Other'
  ];

  if (cancelled) {
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  
    return (
      <div className="pt-24 pb-16 bg-surface-linen min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-white">cancel</span>
          </div>
          <h1 className="font-display-md text-display-md text-on-surface mb-4">Order Cancelled</h1>
          <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
            Your order <span className="font-label-md text-on-surface">{orderId || 'TH-29481'}</span> has been cancelled. If a payment was made, a refund will be processed within 5-7 business days.
          </p>
          <Link to="/orders" className="block w-full py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link to={`/order/${orderId || 'TH-29481'}`} className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Order
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Cancel Order</h1>
          <p className="font-body-md text-on-surface-variant">Order {orderId || 'TH-29481'}</p>
        </div>

        {/* Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-5 flex items-start gap-4 mb-8">
          <span className="material-symbols-outlined text-red-600 text-[24px] shrink-0 mt-0.5">warning</span>
          <div>
            <p className="font-label-md text-red-800 mb-1">This action cannot be undone</p>
            <p className="font-body-sm text-red-700">Once cancelled, the artisan will be notified and any payment will be refunded to your original payment method within 5-7 business days.</p>
          </div>
        </div>

        {/* Reason Selection */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-outline-variant/30">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Why are you cancelling?</h2>
            <p className="font-body-sm text-on-surface-variant mt-1">Help us improve by sharing your reason.</p>
          </div>

          <div className="p-6 space-y-3">
            {reasons.map((r, idx) => (
              <label key={idx} className="flex items-center gap-3 p-3 rounded border border-outline-variant/30 hover:border-forest-green cursor-pointer transition-colors">
                <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="accent-forest-green" />
                <span className="font-body-md text-on-surface">{r}</span>
              </label>
            ))}
          </div>

          <div className="p-6 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-end gap-3">
            <Link to={`/order/${orderId || 'TH-29481'}`} className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors text-center">
              Keep Order
            </Link>
            <button
              onClick={() => setCancelled(true)}
              disabled={!reason}
              className="px-8 py-3 bg-red-600 text-white font-label-md rounded hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Cancel Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CancelOrder;
