import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const SellerEarnings = () => {
  const [period, setPeriod] = useState('month');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user.role !== 'SELLER' && user.role !== 'ADMIN')) {
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

  // Filter orders by selected period
  const now = new Date();
  const filteredOrders = orders.filter(order => {
    if (!order.createdAt) return true;
    const created = new Date(order.createdAt);
    const diffMs = now - created;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    if (period === 'week') return diffDays <= 7;
    if (period === 'month') return diffDays <= 30;
    if (period === 'quarter') return diffDays <= 90;
    if (period === 'year') return diffDays <= 365;
    return true;
  });

  // Derive stats from real orders
  const totalEarnings = filteredOrders
    .filter(o => !['CANCELLED', 'REFUNDED'].includes((o.status || '').toUpperCase()))
    .reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0);

  const pendingPayout = filteredOrders
    .filter(o => ['CONFIRMED', 'PENDING', 'PROCESSING', 'SHIPPED'].includes((o.status || '').toUpperCase()))
    .reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0);

  const paidOut = filteredOrders
    .filter(o => (o.status || '').toUpperCase() === 'DELIVERED')
    .reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0);

  const stats = {
    totalEarnings,
    pendingPayout,
    paidOut,
    totalOrders: filteredOrders.length
  };

  // Build transactions list from orders
  const transactions = filteredOrders.map(order => ({
    id: order.orderNumber ? `ORD-${order.orderNumber.substring(0, 8)}` : `ORD-${order.id}`,
    date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—',
    type: ['CANCELLED', 'REFUNDED'].includes((order.status || '').toUpperCase()) ? 'Refund' : 'Sale',
    amount: ['CANCELLED', 'REFUNDED'].includes((order.status || '').toUpperCase())
      ? -(parseFloat(order.totalAmount) || 0)
      : (parseFloat(order.totalAmount) || 0),
    status: (order.status || '').toUpperCase() === 'DELIVERED' ? 'Completed'
      : ['CANCELLED', 'REFUNDED'].includes((order.status || '').toUpperCase()) ? 'Processed'
      : 'Pending',
    method: 'Customer Order',
  }));

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link to="/seller/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Earnings & Payouts</h1>
              <p className="font-body-md text-on-surface-variant">Track your revenue and manage withdrawals.</p>
            </div>
            <button className="px-6 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0 self-start md:self-auto">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              Request Payout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Earnings', value: `$${stats.totalEarnings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, icon: 'trending_up', color: 'text-forest-green' },
            { label: 'Pending Payout', value: `$${stats.pendingPayout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, icon: 'schedule', color: 'text-amber-600' },
            { label: 'Paid Out', value: `$${stats.paidOut.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, icon: 'check_circle', color: 'text-forest-green' },
            { label: 'Total Orders', value: stats.totalOrders, icon: 'shopping_bag', color: 'text-charcoal' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
                <span className="font-label-sm text-on-surface-variant">{stat.label}</span>
              </div>
              {loading ? (
                <div className="h-7 w-24 bg-surface-variant/50 rounded animate-pulse" />
              ) : (
                <p className="font-headline-md text-headline-md text-on-surface">{stat.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          {['week', 'month', 'quarter', 'year'].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${
              period === p ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
            }`}>
              This {p}
            </button>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Transaction History</h2>
            <button className="flex items-center gap-1 text-forest-green font-label-sm hover:underline">
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export CSV
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-variant/20">
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">ID</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Date</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Type</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Method</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Status</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8">
                      <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8 font-body-md text-on-surface-variant">No transactions in this period.</td>
                  </tr>
                ) : transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-surface-linen/30 transition-colors">
                    <td className="p-4 font-label-sm text-on-surface">{tx.id}</td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{tx.date}</td>
                    <td className="p-4">
                      <span className={`font-label-sm px-2 py-0.5 rounded ${
                        tx.type === 'Sale' ? 'bg-forest-green/10 text-forest-green'
                        : tx.type === 'Payout' ? 'bg-blue-50 text-blue-700'
                        : 'bg-red-50 text-red-600'
                      }`}>{tx.type}</span>
                    </td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{tx.method}</td>
                    <td className="p-4">
                      <span className={`font-label-sm ${
                        tx.status === 'Completed' ? 'text-forest-green'
                        : tx.status === 'Pending' ? 'text-amber-600'
                        : 'text-on-surface-variant'
                      }`}>{tx.status}</span>
                    </td>
                    <td className={`p-4 text-right font-label-md ${tx.amount > 0 ? 'text-on-surface' : 'text-red-600'}`}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-outline-variant/30">
            {loading ? (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
              </div>
            ) : transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-label-md text-on-surface mb-1">{tx.type}</p>
                  <p className="font-body-sm text-on-surface-variant">{tx.date} · {tx.id}</p>
                </div>
                <p className={`font-label-md ${tx.amount > 0 ? 'text-on-surface' : 'text-red-600'}`}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SellerEarnings;
