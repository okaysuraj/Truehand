import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const AdminOrders = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get('/orders/all');
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user, navigate]);

  const statusColor = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Delivered': return 'bg-forest-green/10 text-forest-green border-forest-green/20';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-200';
      case 'Refunded': return 'bg-purple-50 text-purple-600 border-purple-200';
      default: return 'bg-surface-variant text-on-surface-variant border-outline-variant/30';
    }
  };

  const filtered = orders
    .filter(o => filter === 'all' || (o.status && o.status.toLowerCase() === filter))
    .filter(o => {
      if (!search) return true;
      const orderNum = o.orderNumber ? o.orderNumber.toLowerCase() : '';
      const cName = o.customerName ? o.customerName.toLowerCase() : '';
      return orderNum.includes(search.toLowerCase()) || cName.includes(search.toLowerCase());
    });

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">All Orders</h1>
          <p className="font-body-md text-on-surface-variant">Platform-wide order management and monitoring.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: orders.length, icon: 'receipt_long' },
            { label: 'Processing', value: orders.filter(o => o.status === 'PROCESSING' || o.status === 'CONFIRMED' || o.status === 'PENDING').length, icon: 'hourglass_top' },
            { label: 'Shipped', value: orders.filter(o => o.status === 'SHIPPED').length, icon: 'local_shipping' },
            { label: 'Delivered', value: orders.filter(o => o.status === 'DELIVERED').length, icon: 'check_circle' },
            { label: 'Issues', value: orders.filter(o => ['CANCELLED', 'REFUNDED'].includes(o.status)).length, icon: 'warning' }
          ].map((s, i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">{s.icon}</span>
                <span className="font-label-sm text-on-surface-variant">{s.label}</span>
              </div>
              <p className="font-headline-md text-headline-md text-on-surface">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input type="text" placeholder="Search by order ID or customer..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${
                filter === f ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
              }`}>{f}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-variant/20">
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Order ID</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Customer</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Seller</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Date</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Items</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Status</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8">
                      <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8 font-body-md text-on-surface-variant">No orders found.</td>
                  </tr>
                ) : filtered.map(order => (
                  <tr key={order.id} className="hover:bg-surface-linen/30 transition-colors cursor-pointer">
                    <td className="p-4"><Link to={`/order/${order.id}`} className="font-label-md text-forest-green hover:underline">#{order.orderNumber ? order.orderNumber.substring(0,8) : order.id}</Link></td>
                    <td className="p-4 font-body-sm text-on-surface">{order.customerName || `User ${order.userId}`}</td>
                    <td className="p-4 font-body-sm text-on-surface-variant">System</td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{order.quantity || 1}</td>
                    <td className="p-4">
                      <span className={`font-label-sm px-2.5 py-0.5 rounded border ${statusColor(order.status ? (order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()) : '')}`}>{order.status}</span>
                    </td>
                    <td className="p-4 text-right font-label-md text-on-surface">${order.totalAmount ? order.totalAmount.toFixed(2) : order.price?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-outline-variant/30">
            {filtered.map(order => (
              <Link key={order.id} to={`/order/${order.id}`} className="p-4 flex justify-between items-center block">
                <div>
                  <p className="font-label-md text-on-surface mb-1">{order.id}</p>
                  <p className="font-body-sm text-on-surface-variant">{order.customer} · {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-on-surface mb-1">${order.total.toFixed(2)}</p>
                  <span className={`font-label-sm px-2 py-0.5 rounded border ${statusColor(order.status)}`}>{order.status}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
