import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const SellerOrders = () => {
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'SELLER') {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/seller/${user.id}/orders`);
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const updateStatus = async (orderNumber, status) => {
    try {
      await api.put(`/seller/${user.id}/orders/${orderNumber}/status`, { status });
      fetchOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const statusColor = (s) => {
    const status = s ? s.toUpperCase() : '';
    switch (status) {
      case 'PENDING': return 'bg-amber-50 text-amber-700';
      case 'PROCESSING': return 'bg-blue-50 text-blue-700';
      case 'SHIPPED': return 'bg-purple-50 text-purple-700';
      case 'DELIVERED': return 'bg-forest-green/10 text-forest-green';
      case 'CANCELLED': return 'bg-red-50 text-red-600';
      default: return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status && o.status.toLowerCase() === filter);

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/seller/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Dashboard
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">My Orders</h1>
          <p className="font-body-md text-on-surface-variant">{orders.filter(o => o.status === 'New').length} new orders awaiting fulfillment</p>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${
              filter === f ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
            }`}>{f}</button>
          ))}
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="w-full flex justify-center py-20">
              <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 font-body-md text-on-surface-variant">No orders found.</div>
          ) : filtered.map(order => (
            <div key={order.orderNumber} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-label-md text-forest-green">{order.orderNumber}</span>
                    <span className={`font-label-sm px-2.5 py-0.5 rounded ${statusColor(order.status)}`}>{order.status}</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant">{order.customerName} · {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-headline-sm text-on-surface">${order.price.toFixed(2)} × {order.quantity}</span>
                  {order.status === 'PENDING' && (
                    <button onClick={() => updateStatus(order.orderNumber, 'PROCESSING')} className="px-4 py-2 bg-forest-green text-white font-label-sm rounded hover:opacity-90 transition-opacity">Process Order</button>
                  )}
                  {order.status === 'PROCESSING' && (
                    <button onClick={() => updateStatus(order.orderNumber, 'SHIPPED')} className="px-4 py-2 bg-forest-green text-white font-label-sm rounded hover:opacity-90 transition-opacity">Mark Shipped</button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                  <span className="font-body-sm text-on-surface-variant bg-surface-variant/40 px-3 py-1 rounded">{order.productName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
