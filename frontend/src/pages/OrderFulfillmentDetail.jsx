import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const OrderFulfillmentDetail = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data);
        setTrackingNumber(res.data?.trackingNumber || '');
      } catch { setError('Order not found.'); }
      setLoading(false);
    };
    fetch();
  }, [orderId]);

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      await api.put(`/seller/${user.id}/orders/${order.orderNumber}/status`, { status: newStatus });
      setOrder(o => ({ ...o, status: newStatus }));
    } catch (err) {
      setError('Failed to update status.');
    }
    setUpdating(false);
  };

  if (loading) return <div className="pt-24 min-h-screen flex items-center justify-center"><span className="material-symbols-outlined animate-spin text-forest-green text-4xl">progress_activity</span></div>;
  if (!order && !loading) return <div className="pt-24 min-h-screen flex items-center justify-center"><p className="text-on-surface-variant">{error || 'Order not found.'}</p></div>;

  const currentStep = ORDER_STATUSES.indexOf(order.status?.toUpperCase() || 'PENDING');
  const shippableStatuses = ['CONFIRMED', 'PROCESSING'];

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        <div className="mb-8">
          <Link to="/seller/orders" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Orders
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-1">Fulfil Order</h1>
              <p className="font-body-md text-on-surface-variant">{order.orderNumber}</p>
            </div>
            <span className={`px-3 py-1.5 rounded font-label-sm ${
              order.status === 'DELIVERED' ? 'bg-forest-green/10 text-forest-green' :
              order.status === 'CANCELLED' ? 'bg-red-50 text-red-600' :
              'bg-amber-50 text-amber-700'
            }`}>{order.status}</span>
          </div>
        </div>

        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-body-sm">{error}</div>}

        {/* Timeline */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="font-headline-sm text-on-surface mb-6">Order Timeline</h2>
          <div className="flex items-center gap-0">
            {['PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED'].map((s, i, arr) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    i <= currentStep ? 'bg-forest-green border-forest-green' : 'border-outline-variant bg-surface-container'
                  }`}>
                    {i < currentStep ? (
                      <span className="material-symbols-outlined text-white text-[14px]">check</span>
                    ) : i === currentStep ? (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    ) : null}
                  </div>
                  <p className={`font-label-sm mt-2 text-center text-[10px] leading-tight max-w-[50px] ${i <= currentStep ? 'text-forest-green' : 'text-on-surface-variant'}`}>{s}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className={`flex-1 h-0.5 mb-6 transition-all ${i < currentStep ? 'bg-forest-green' : 'bg-outline-variant/30'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Customer & Address */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-on-surface mb-4">Customer</h2>
            <p className="font-label-md text-on-surface">{order.customerName || `Customer #${order.userId}`}</p>
            <p className="font-body-sm text-on-surface-variant mt-1">Order placed: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-on-surface mb-4">Ship To</h2>
            {order.shippingAddress ? (
              <div className="font-body-sm text-on-surface-variant space-y-0.5">
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                <p>{order.shippingAddress.zipCode} {order.shippingAddress.country}</p>
              </div>
            ) : <p className="font-body-sm text-on-surface-variant">No address on file.</p>}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="p-6 border-b border-outline-variant/20">
            <h2 className="font-headline-sm text-on-surface">Order Items</h2>
          </div>
          <div className="divide-y divide-outline-variant/15">
            {(order.items || []).map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded bg-surface-variant/30 flex items-center justify-center shrink-0">
                  {item.imageUrl ? <img src={item.imageUrl} alt="" className="w-full h-full object-cover rounded" /> : <span className="material-symbols-outlined text-outline-variant">image</span>}
                </div>
                <div className="flex-1">
                  <p className="font-label-md text-on-surface">{item.productName}</p>
                  <p className="font-body-sm text-on-surface-variant">Qty: {item.quantity}</p>
                </div>
                <p className="font-label-md text-on-surface">${(parseFloat(item.price)*item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-outline-variant/20 bg-surface-variant/10 flex justify-between">
            <span className="font-label-md text-on-surface">Total</span>
            <span className="font-headline-sm text-on-surface">${parseFloat(order.totalAmount||0).toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        {!['DELIVERED','CANCELLED'].includes(order.status?.toUpperCase()) && (
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-6">
            <h2 className="font-headline-sm text-on-surface mb-4">Update Status</h2>
            <div className="flex gap-3 flex-wrap">
              {shippableStatuses.includes(order.status?.toUpperCase()) && (
                <button onClick={() => handleStatusUpdate('SHIPPED')} disabled={updating}
                  className="px-5 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  Mark as Shipped
                </button>
              )}
              {order.status?.toUpperCase() === 'SHIPPED' && (
                <button onClick={() => handleStatusUpdate('DELIVERED')} disabled={updating}
                  className="px-5 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">done_all</span>
                  Mark as Delivered
                </button>
              )}
              <Link to={`/seller/shipping-label/${orderId}`} className="px-5 py-2.5 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">print</span>
                Print Label
              </Link>
              <Link to={`/seller/packaging-qc`} className="px-5 py-2.5 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">inventory</span>
                QC Checklist
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderFulfillmentDetail;
