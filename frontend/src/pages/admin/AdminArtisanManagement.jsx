import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminArtisanManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [actioning, setActioning] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/artisans');
        setSellers(res.data || []);
      } catch {
        // fallback to users list
        try {
          const res = await api.get('/admin/users');
          setSellers((res.data || []).filter(u => u.role === 'SELLER'));
        } catch { setSellers([]); }
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleAction = async (sellerId, action) => {
    setActioning(sellerId);
    try {
      await api.put(`/admin/artisans/${sellerId}/${action}`);
      setSellers(s => s.map(seller =>
        seller.id === sellerId ? { ...seller, status: action === 'approve' ? 'APPROVED' : action === 'suspend' ? 'SUSPENDED' : 'ACTIVE' } : seller
      ));
    } catch (e) { alert('Action failed.'); }
    setActioning(null);
  };

  const filtered = sellers
    .filter(s => filter === 'all' || (s.kycStatus || s.status || '').toLowerCase() === filter)
    .filter(s => s.username?.toLowerCase().includes(search.toLowerCase()) || s.email?.toLowerCase().includes(search.toLowerCase()));

  const statusBadge = (s) => {
    const st = (s.kycStatus || s.status || 'active').toLowerCase();
    if (st === 'approved' || st === 'active') return 'bg-forest-green/10 text-forest-green';
    if (st === 'pending') return 'bg-amber-50 text-amber-700';
    if (st === 'suspended' || st === 'rejected') return 'bg-red-50 text-red-600';
    return 'bg-surface-variant text-on-surface-variant';
  };

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Artisan Management</h1>
          <p className="font-body-md text-on-surface-variant">Manage seller accounts, KYC verification, and marketplace access.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
          </div>
          <div className="flex gap-2">
            {['all','pending','approved','suspended'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${filter === f ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center"><span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant block mb-3">storefront</span>
              <p className="font-body-md text-on-surface-variant">No artisans found.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-variant/10">
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Artisan</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Email</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Status</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Joined</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filtered.map(s => (
                  <tr key={s.id} className="hover:bg-surface-linen/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-forest-green/10 flex items-center justify-center">
                          <span className="font-label-md text-forest-green">{(s.username || 'A')[0].toUpperCase()}</span>
                        </div>
                        <span className="font-label-md text-on-surface">{s.username || `Seller #${s.id}`}</span>
                      </div>
                    </td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{s.email}</td>
                    <td className="p-4">
                      <span className={`font-label-sm px-2.5 py-0.5 rounded ${statusBadge(s)}`}>{s.kycStatus || s.status || 'ACTIVE'}</span>
                    </td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '—'}</td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => handleAction(s.id, 'approve')} disabled={actioning === s.id}
                          className="px-3 py-1.5 text-xs font-label-sm bg-forest-green text-white rounded hover:opacity-90 disabled:opacity-50 transition-opacity">Approve</button>
                        <button onClick={() => handleAction(s.id, 'suspend')} disabled={actioning === s.id}
                          className="px-3 py-1.5 text-xs font-label-sm border border-red-300 text-red-600 rounded hover:bg-red-50 disabled:opacity-50 transition-colors">Suspend</button>
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

export default AdminArtisanManagement;
