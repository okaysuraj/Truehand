import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminPlatformRevenue = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/orders');
        setOrders(res.data || []);
      } catch { setOrders([]); }
      setLoading(false);
    };
    fetch();
  }, []);

  const now = new Date();
  const filteredOrders = orders.filter(o => {
    if (!o.createdAt) return true;
    const diffDays = (now - new Date(o.createdAt)) / (1000*60*60*24);
    return period === 'week' ? diffDays <= 7 : period === 'month' ? diffDays <= 30 : period === 'quarter' ? diffDays <= 90 : diffDays <= 365;
  }).filter(o => !['CANCELLED','REFUNDED'].includes((o.status||'').toUpperCase()));

  const GMV = filteredOrders.reduce((s,o) => s + parseFloat(o.totalAmount||0), 0);
  const platformRevenue = GMV * 0.05;
  const gst = GMV * 0.18;
  const netToSellers = GMV - platformRevenue;

  // Last 6 months labels
  const months = [...Array(6)].map((_,i) => {
    const d = new Date(now);
    d.setMonth(d.getMonth() - (5 - i));
    return d.toLocaleString('default', { month: 'short' });
  });

  const monthlyGMV = months.map((m, i) => {
    const total = orders.filter(o => {
      if (!o.createdAt) return false;
      const d = new Date(o.createdAt);
      const past = new Date(now);
      past.setMonth(past.getMonth() - (5-i));
      return d.getMonth() === past.getMonth() && d.getFullYear() === past.getFullYear();
    }).reduce((s, o) => s + parseFloat(o.totalAmount||0), 0);
    return { label: m, value: total };
  });

  const maxGMV = Math.max(...monthlyGMV.map(m => m.value), 1);

  const topStats = [
    { label: 'GMV', value: `$${GMV.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`, icon: 'trending_up', color: 'text-forest-green', change: '+18%' },
    { label: 'Platform Revenue (5%)', value: `$${platformRevenue.toFixed(2)}`, icon: 'payments', color: 'text-charcoal', change: '+18%' },
    { label: 'Total Orders', value: filteredOrders.length, icon: 'shopping_bag', color: 'text-blue-600', change: '+12%' },
    { label: 'Net to Sellers', value: `$${netToSellers.toFixed(2)}`, icon: 'savings', color: 'text-terracotta', change: '' },
  ];

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Platform Revenue</h1>
              <p className="font-body-md text-on-surface-variant">Real-time GMV, commissions, and financial overview.</p>
            </div>
            <div className="flex gap-2">
              {['week','month','quarter','year'].map(p => (
                <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${period===p?'bg-charcoal text-white':'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {topStats.map((s,i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
                {s.change && <span className="font-label-sm text-forest-green">{s.change}</span>}
              </div>
              <p className="font-label-sm text-on-surface-variant mb-1">{s.label}</p>
              {loading ? <div className="h-6 w-24 bg-surface-variant/40 rounded animate-pulse" /> : (
                <p className="font-headline-sm text-on-surface">{s.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="font-headline-sm text-on-surface mb-6">GMV — Last 6 Months</h2>
          <div className="flex items-end gap-3 h-44">
            {monthlyGMV.map((m,i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <p className="font-label-sm text-on-surface-variant text-[11px]">${m.value > 0 ? (m.value/1000).toFixed(1) + 'k' : '0'}</p>
                <div className="w-full" style={{ height: `${Math.max((m.value/maxGMV)*100, 3)}%`, minHeight: '6px' }}>
                  <div className="w-full h-full bg-gradient-to-t from-forest-green to-forest-green/60 rounded-t hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
                <p className="font-label-sm text-on-surface-variant text-[11px]">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue breakdown */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
          <h2 className="font-headline-sm text-on-surface mb-4">Revenue Breakdown</h2>
          <div className="space-y-3">
            {[
              { label: 'Gross Merchandise Value (GMV)', value: GMV, pct: 100, color: 'bg-forest-green' },
              { label: 'Platform Commission (5%)', value: platformRevenue, pct: 5, color: 'bg-charcoal' },
              { label: 'GST Collected (18%)', value: gst, pct: 18, color: 'bg-amber-500' },
              { label: 'Net to Sellers', value: netToSellers, pct: 95, color: 'bg-forest-green/40' },
            ].map((r,i) => (
              <div key={i} className="flex items-center gap-4">
                <p className="font-body-sm text-on-surface w-52 shrink-0">{r.label}</p>
                <div className="flex-1 h-3 bg-surface-variant/30 rounded-full overflow-hidden">
                  <div className={`h-full ${r.color} rounded-full transition-all duration-700`} style={{ width: `${r.pct}%` }} />
                </div>
                <p className="font-label-sm text-on-surface w-28 text-right">${r.value.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPlatformRevenue;
