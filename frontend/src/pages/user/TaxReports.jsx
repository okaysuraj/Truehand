import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const TaxReports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [quarter, setQuarter] = useState('all');

  useEffect(() => {
    if (!user || (user.role !== 'SELLER' && user.role !== 'ADMIN')) { navigate('/'); return; }
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/seller/${user.id}/orders`);
        setOrders(res.data || []);
      } catch { console.error('Failed to fetch orders'); }
      setLoading(false);
    };
    fetch();
  }, [user, navigate]);

  const filteredOrders = orders.filter(o => {
    if (!o.createdAt) return false;
    const d = new Date(o.createdAt);
    if (d.getFullYear() !== year) return false;
    if (quarter === 'all') return true;
    const q = Math.ceil((d.getMonth() + 1) / 3);
    return q === parseInt(quarter);
  }).filter(o => !['CANCELLED','REFUNDED'].includes((o.status||'').toUpperCase()));

  const totalRevenue = filteredOrders.reduce((s, o) => s + (parseFloat(o.totalAmount)||0), 0);
  const gstRate = 0.18;
  const gstAmount = totalRevenue * gstRate;
  const netRevenue = totalRevenue - gstAmount;
  const platformFee = totalRevenue * 0.05;

  const downloadCSV = () => {
    const rows = [
      ['Order Number', 'Date', 'Amount', 'GST (18%)', 'Net', 'Platform Fee (5%)'],
      ...filteredOrders.map(o => [
        o.orderNumber || o.id,
        o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '',
        parseFloat(o.totalAmount||0).toFixed(2),
        (parseFloat(o.totalAmount||0) * 0.18).toFixed(2),
        (parseFloat(o.totalAmount||0) * 0.82).toFixed(2),
        (parseFloat(o.totalAmount||0) * 0.05).toFixed(2),
      ])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax_report_${year}_Q${quarter}.csv`;
    a.click();
  };

  const YEARS = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2];

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/seller/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Tax Reports</h1>
              <p className="font-body-md text-on-surface-variant">GST and revenue summary for your seller account.</p>
            </div>
            <button onClick={downloadCSV} className="px-5 py-2.5 border border-forest-green text-forest-green font-label-md rounded hover:bg-forest-green/5 transition-colors flex items-center gap-2 self-start">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex gap-2">
            {YEARS.map(y => (
              <button key={y} onClick={() => setYear(y)} className={`px-4 py-2 rounded-full font-label-sm transition-colors ${
                year === y ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
              }`}>{y}</button>
            ))}
          </div>
          <div className="flex gap-2">
            {[['all','Full Year'],['1','Q1'],['2','Q2'],['3','Q3'],['4','Q4']].map(([v, l]) => (
              <button key={v} onClick={() => setQuarter(v)} className={`px-4 py-2 rounded-full font-label-sm transition-colors ${
                quarter === v ? 'bg-forest-green text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
              }`}>{l}</button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Gross Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: 'payments', color: 'text-forest-green' },
            { label: 'GST Collected (18%)', value: `$${gstAmount.toFixed(2)}`, icon: 'account_balance', color: 'text-amber-600' },
            { label: 'Net Revenue', value: `$${netRevenue.toFixed(2)}`, icon: 'savings', color: 'text-charcoal' },
            { label: 'Platform Fee (5%)', value: `$${platformFee.toFixed(2)}`, icon: 'percent', color: 'text-blue-600' },
          ].map((s, i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-5 shadow-sm">
              <span className={`material-symbols-outlined ${s.color} mb-2 block`}>{s.icon}</span>
              <p className="font-label-sm text-on-surface-variant mb-1">{s.label}</p>
              {loading ? <div className="h-6 w-20 bg-surface-variant/40 rounded animate-pulse" /> : (
                <p className="font-headline-sm text-on-surface">{s.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="p-5 border-b border-outline-variant/20">
            <h2 className="font-headline-sm text-on-surface">Transactions ({filteredOrders.length})</h2>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center"><span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span></div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-4xl text-outline-variant block mb-3">receipt_long</span>
                <p className="font-body-md text-on-surface-variant">No transactions in this period.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/20 bg-surface-variant/10">
                    <th className="text-left p-4 font-label-sm text-on-surface-variant">Order</th>
                    <th className="text-left p-4 font-label-sm text-on-surface-variant">Date</th>
                    <th className="text-right p-4 font-label-sm text-on-surface-variant">Gross</th>
                    <th className="text-right p-4 font-label-sm text-on-surface-variant">GST 18%</th>
                    <th className="text-right p-4 font-label-sm text-on-surface-variant">Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {filteredOrders.map(o => {
                    const gross = parseFloat(o.totalAmount || 0);
                    const gst = gross * 0.18;
                    const net = gross - gst;
                    return (
                      <tr key={o.id} className="hover:bg-surface-linen/30">
                        <td className="p-4 font-label-sm text-on-surface">{o.orderNumber || `#${o.id}`}</td>
                        <td className="p-4 font-body-sm text-on-surface-variant">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '—'}</td>
                        <td className="p-4 text-right font-body-sm text-on-surface">${gross.toFixed(2)}</td>
                        <td className="p-4 text-right font-body-sm text-amber-600">${gst.toFixed(2)}</td>
                        <td className="p-4 text-right font-label-md text-forest-green">${net.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxReports;
