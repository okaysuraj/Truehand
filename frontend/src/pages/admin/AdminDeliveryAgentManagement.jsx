import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminDeliveryAgentManagement = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/users');
        setAgents((res.data || []).filter(u => u.role === 'DELIVERY'));
      } catch { setAgents([]); }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await api.put(`/admin/delivery-agents/${id}/${action}`);
      setAgents(a => a.map(ag => ag.id === id ? { ...ag, status: action === 'approve' ? 'APPROVED' : 'SUSPENDED' } : ag));
    } catch { alert('Action failed.'); }
  };

  const filtered = agents
    .filter(a => filter === 'all' || (a.status || 'active').toLowerCase() === filter)
    .filter(a => (a.username || '').toLowerCase().includes(search.toLowerCase()) || (a.email || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Delivery Agent Management</h1>
          <p className="font-body-md text-on-surface-variant">Review and manage delivery partner accounts and KYC verification.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search agents..."
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'suspended'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${filter === f ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center"><span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-5xl text-outline-variant block mb-3">delivery_dining</span>
              <p className="font-body-md text-on-surface-variant">No delivery agents found.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-variant/10">
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Agent</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Email</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Status</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-surface-linen/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-blue-600 text-[18px]">delivery_dining</span>
                        </div>
                        <span className="font-label-md text-on-surface">{a.username || `Agent #${a.id}`}</span>
                      </div>
                    </td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{a.email}</td>
                    <td className="p-4">
                      <span className={`font-label-sm px-2.5 py-0.5 rounded ${
                        (a.status||'').toLowerCase() === 'approved' ? 'bg-forest-green/10 text-forest-green'
                        : (a.status||'').toLowerCase() === 'suspended' ? 'bg-red-50 text-red-600'
                        : 'bg-amber-50 text-amber-700'
                      }`}>{a.status || 'PENDING'}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => handleAction(a.id, 'approve')} className="px-3 py-1.5 text-xs bg-forest-green text-white rounded hover:opacity-90">Approve</button>
                        <button onClick={() => handleAction(a.id, 'suspend')} className="px-3 py-1.5 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50">Suspend</button>
                      </div>
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

export default AdminDeliveryAgentManagement;
