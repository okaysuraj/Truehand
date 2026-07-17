import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';

const ShippingLabelPreview = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch { setOrder(null); }
      setLoading(false);
    };
    fetch();
  }, [orderId]);

  const handlePrint = () => window.print();

  if (loading) return <div className="pt-24 min-h-screen flex items-center justify-center"><span className="material-symbols-outlined animate-spin text-forest-green text-4xl">progress_activity</span></div>;

  const addr = order?.shippingAddress || {};

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="mb-8 print:hidden">
          <Link to={`/seller/orders`} className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="font-display-md text-display-md text-on-surface">Shipping Label</h1>
            <button onClick={handlePrint} className="px-5 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">print</span>
              Print Label
            </button>
          </div>
        </div>

        {/* Label */}
        <div className="bg-white border-2 border-charcoal rounded-lg overflow-hidden shadow-lg font-mono">
          {/* Header */}
          <div className="bg-charcoal text-white p-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/60">TrueHand Marketplace</p>
              <p className="font-bold text-lg">SHIPPING LABEL</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">ORDER</p>
              <p className="font-bold">{order?.orderNumber || `TH-${orderId}`}</p>
            </div>
          </div>

          <div className="p-6">
            {/* FROM */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">From:</p>
              <p className="font-bold text-lg">TrueHand Seller</p>
              <p className="text-sm text-gray-600">Fulfilled via TrueHand Marketplace</p>
            </div>

            <div className="border-t-2 border-dashed border-gray-300 mb-6" />

            {/* TO */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Ship To:</p>
              {addr.street || addr.city ? (
                <div>
                  <p className="font-bold text-xl">{order?.customerName || `Customer #${order?.userId}`}</p>
                  <p className="text-base mt-1">{addr.street}</p>
                  <p className="text-base">{addr.city}, {addr.state} {addr.zipCode}</p>
                  <p className="text-base">{addr.country || 'India'}</p>
                </div>
              ) : (
                <p className="text-gray-400 italic">Shipping address not available</p>
              )}
            </div>

            {/* Barcode (simulated) */}
            <div className="border border-gray-200 rounded p-4 text-center bg-gray-50">
              <div className="flex justify-center gap-0.5 mb-2">
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="bg-black rounded-sm" style={{ width: `${Math.random() > 0.5 ? 3 : 2}px`, height: '40px' }} />
                ))}
              </div>
              <p className="text-xs tracking-widest">{order?.orderNumber || `TH${orderId}00${Date.now().toString().slice(-6)}`}</p>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between text-xs text-gray-400">
              <span>Printed: {new Date().toLocaleDateString()}</span>
              <span>Weight: Calculate at dispatch</span>
              <span>Handle with care</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        {order?.items?.length > 0 && (
          <div className="mt-6 bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm print:hidden">
            <h2 className="font-headline-sm text-on-surface mb-4">Order Contents</h2>
            <ul className="space-y-3">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-outline-variant/20 last:border-0">
                  <div>
                    <p className="font-label-md text-on-surface">{item.productName}</p>
                    <p className="font-body-sm text-on-surface-variant">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-label-md text-on-surface">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingLabelPreview;
