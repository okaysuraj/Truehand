import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const SalesAnalytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    if (!user || (user.role !== 'SELLER' && user.role !== 'ADMIN')) { navigate('/'); return; }
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordRes, prodRes] = await Promise.all([
          api.get(`/seller/${user.id}/orders`),
          api.get(`/products/seller/${user.id}`)
        ]);
        setOrders(ordRes.data || []);
        setProducts(prodRes.data || []);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchData();
  }, [user, navigate]);

  const now = new Date();
  const filteredOrders = orders.filter(o => {
    if (!o.createdAt) return true;
    const diffDays = (now - new Date(o.createdAt)) / (1000 * 60 * 60 * 24);
    return period === 'week' ? diffDays <= 7 : period === 'month' ? diffDays <= 30 : period === 'quarter' ? diffDays <= 90 : diffDays <= 365;
  }).filter(o => !['CANCELLED','REFUNDED'].includes((o.status||'').toUpperCase()));

  const totalRevenue = filteredOrders.reduce((s, o) => s + (parseFloat(o.totalAmount)||0), 0);
  const avgOrderValue = filteredOrders.length ? totalRevenue / filteredOrders.length : 0;

  // Group revenue by day for last 7 days
  const last7 = [...Array(7)].map((_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayRevenue = orders.filter(o => {
      if (!o.createdAt) return false;
      const od = new Date(o.createdAt);
      return od.toDateString() === d.toDateString() && !['CANCELLED','REFUNDED'].includes((o.status||'').toUpperCase());
    }).reduce((s,o) => s + (parseFloat(o.totalAmount)||0), 0);
    return { label: dateStr, value: dayRevenue };
  });

  const maxRevDay = Math.max(...last7.map(d => d.value), 1);

  const conversionRate = products.length > 0 ? ((filteredOrders.length / (products.length * 10)) * 100).toFixed(1) : '0.0';

  const statCards = [
    { label: 'Revenue', value: `$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, icon: 'payments', color: 'text-forest-green', change: '+12%' },
    { label: 'Orders', value: filteredOrders.length, icon: 'shopping_bag', color: 'text-charcoal', change: '+8%' },
    { label: 'Avg. Order', value: `$${avgOrderValue.toFixed(2)}`, icon: 'receipt', color: 'text-terracotta', change: '+3%' },
    { label: 'Products', value: products.length, icon: 'inventory_2', color: 'text-blue-600', change: '' },
  ];

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/seller/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Sales Analytics</h1>
              <p className="font-body-md text-on-surface-variant">Track your performance, revenue, and product metrics.</p>
            </div>
            <div className="flex gap-2">
              {['week','month','quarter','year'].map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${
                    period === p ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
                  }`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
                {s.change && <span className="font-label-sm text-forest-green">{s.change}</span>}
              </div>
              <p className="font-label-sm text-on-surface-variant mb-1">{s.label}</p>
              {loading ? <div className="h-6 w-20 bg-surface-variant/50 rounded animate-pulse" /> : (
                <p className="font-headline-md text-headline-md text-on-surface">{s.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Revenue Chart (7 days) */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="font-headline-sm text-on-surface mb-6">Revenue — Last 7 Days</h2>
          {loading ? (
            <div className="h-32 bg-surface-variant/30 rounded animate-pulse" />
          ) : (
            <div className="flex items-end gap-2 h-36">
              {last7.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full relative" style={{ height: `${(d.value / maxRevDay) * 100}%`, minHeight: d.value > 0 ? '4px' : '2px' }}>
                    <div
                      className={`w-full rounded-t transition-all duration-700 ${d.value > 0 ? 'bg-forest-green/70 hover:bg-forest-green' : 'bg-surface-variant/40'}`}
                      style={{ height: '100%' }}
                      title={`$${d.value.toFixed(2)}`}
                    />
                  </div>
                  <p className="font-label-sm text-on-surface-variant text-[10px]">{d.label}</p>
                  {d.value > 0 && <p className="font-label-sm text-on-surface-variant text-[10px]">${d.value.toFixed(0)}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-outline-variant/20">
            <h2 className="font-headline-sm text-on-surface">Your Products</h2>
          </div>
          {loading ? (
            <div className="p-6">
              {[1,2,3].map(i => <div key={i} className="h-14 bg-surface-variant/30 rounded mb-3 animate-pulse" />)}
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant block mb-3">inventory_2</span>
              <p className="font-body-md text-on-surface-variant">No products listed yet.</p>
              <Link to="/seller/new-listing" className="mt-4 inline-block text-forest-green font-label-md hover:underline">Add your first product →</Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-variant/10">
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Product</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Category</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Price</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Stock</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {products.slice(0, 10).map(p => (
                  <tr key={p.id} className="hover:bg-surface-linen/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded overflow-hidden bg-surface-variant/30 shrink-0">
                          {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />}
                        </div>
                        <Link to={`/seller/edit-product/${p.id}`} className="font-label-md text-on-surface hover:text-forest-green line-clamp-1">{p.name}</Link>
                      </div>
                    </td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{p.category || '—'}</td>
                    <td className="p-4 text-right font-label-md text-on-surface">${parseFloat(p.price).toFixed(2)}</td>
                    <td className="p-4 text-right font-label-md text-on-surface">{p.stockQuantity ?? '—'}</td>
                    <td className="p-4">
                      <span className={`font-label-sm px-2 py-0.5 rounded text-[11px] ${
                        p.status === 'APPROVED' || !p.status ? 'bg-forest-green/10 text-forest-green'
                        : p.status === 'PENDING' ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-600'
                      }`}>{p.status || 'APPROVED'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
