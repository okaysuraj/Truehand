import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminPayoutManagement = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/payouts');
        setPayouts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch payouts", err);
        setPayouts([]);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await api.put(`/admin/payouts/${id}/${action}`);
      setPayouts(p => p.map(po => po.id === id ? { ...po, status: action === 'approve' ? 'APPROVED' : 'REJECTED' } : po));
    } catch { alert('Action failed.'); }
  };

  const filtered = payouts.filter(p => filter === 'all' || p.status?.toLowerCase() === filter);
  const totalPending = payouts.filter(p => p.status === 'PENDING').reduce((s, p) => s + parseFloat(p.amount||0), 0);

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Payout Management</h1>
          <p className="font-body-md text-on-surface-variant">Review and approve seller payout requests.</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Pending', value: payouts.filter(p=>p.status==='PENDING').length, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Pending Amount', value: `$${totalPending.toFixed(2)}`, color: 'text-forest-green', bg: 'bg-forest-green/5' },
            { label: 'Total Requests', value: payouts.length, color: 'text-charcoal', bg: 'bg-surface-variant/30' },
          ].map((s,i) => (
            <div key={i} className={`${s.bg} border border-outline-variant/30 rounded-lg p-5`}>
              <p className="font-label-sm text-on-surface-variant mb-1">{s.label}</p>
              <p className={`font-headline-md text-headline-md ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['pending','approved','rejected','all'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${filter===f?'bg-charcoal text-white':'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'}`}>{f}</button>
          ))}
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center"><span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant block mb-3">payments</span>
              <p className="font-body-md text-on-surface-variant">No {filter} payout requests.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-variant/10">
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Seller</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Bank</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Amount</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Requested</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Status</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-surface-linen/30">
                    <td className="p-4 font-label-md text-on-surface">{p.sellerName || `Seller #${p.sellerId}`}</td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{p.bankAccount || '—'}</td>
                    <td className="p-4 text-right font-label-md text-on-surface">${parseFloat(p.amount||0).toFixed(2)}</td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{p.requestedAt ? new Date(p.requestedAt).toLocaleDateString() : '—'}</td>
                    <td className="p-4">
                      <span className={`font-label-sm px-2.5 py-0.5 rounded ${p.status==='APPROVED'?'bg-forest-green/10 text-forest-green':p.status==='REJECTED'?'bg-red-50 text-red-600':'bg-amber-50 text-amber-700'}`}>{p.status}</span>
                    </td>
                    <td className="p-4">
                      {p.status === 'PENDING' && (
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => handleAction(p.id, 'approve')} className="px-3 py-1.5 text-xs bg-forest-green text-white rounded hover:opacity-90">Approve</button>
                          <button onClick={() => handleAction(p.id, 'reject')} className="px-3 py-1.5 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50">Reject</button>
                        </div>
                      )}
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

export default AdminPayoutManagement;
