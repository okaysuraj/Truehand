import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminDisputeResolution = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('open');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [resolution, setResolution] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/disputes');
        setDisputes(res.data || []);
      } catch {
        setDisputes([
          { id: 1, orderId: 1001, buyer: 'Alice M.', seller: 'Clay Studio', type: 'Item Not Received', status: 'OPEN', amount: 120, opened: new Date().toISOString(), description: 'Order marked delivered but item never arrived.' },
          { id: 2, orderId: 1002, buyer: 'Bob K.', seller: 'Tidal Textiles', type: 'Not as Described', status: 'REVIEWING', amount: 68, opened: new Date(Date.now()-86400000).toISOString(), description: 'Item color and size differ from listing photos.' },
          { id: 3, orderId: 998, buyer: 'Carol P.', seller: 'Forge & Flame', type: 'Damaged in Transit', status: 'RESOLVED', amount: 145, opened: new Date(Date.now()-172800000).toISOString(), description: 'Candle holder arrived shattered. Photos submitted.' },
        ]);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleResolve = async (id) => {
    if (!resolution.trim()) { alert('Please enter a resolution note.'); return; }
    try {
      await api.post(`/admin/disputes/${id}/resolve`, { resolution });
    } catch {}
    setDisputes(d => d.map(dis => dis.id === id ? { ...dis, status: 'RESOLVED', resolution } : dis));
    setSelectedDispute(null);
    setResolution('');
  };

  const filtered = disputes.filter(d => filter === 'all' || d.status?.toLowerCase() === filter);

  const typeIcon = (t) => t === 'Item Not Received' ? 'local_shipping' : t === 'Not as Described' ? 'image_not_supported' : 'broken_image';

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Dispute Resolution</h1>
          <p className="font-body-md text-on-surface-variant">Mediate disputes between buyers and sellers.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Open', value: disputes.filter(d=>d.status==='OPEN').length, color: 'text-red-600' },
            { label: 'Reviewing', value: disputes.filter(d=>d.status==='REVIEWING').length, color: 'text-amber-600' },
            { label: 'Resolved', value: disputes.filter(d=>d.status==='RESOLVED').length, color: 'text-forest-green' },
          ].map((s,i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-5 shadow-sm">
              <p className="font-label-sm text-on-surface-variant mb-1">{s.label}</p>
              <p className={`font-headline-md text-headline-md ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {['open','reviewing','resolved','all'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${filter===f?'bg-charcoal text-white':'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'}`}>{f}</button>
          ))}
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8"><span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span></div>
          ) : filtered.map(dispute => (
            <div key={dispute.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-amber-600 text-[18px]">{typeIcon(dispute.type)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-label-md text-on-surface">#{dispute.orderId} — {dispute.type}</p>
                      <span className={`font-label-sm text-[11px] px-2 py-0.5 rounded ${dispute.status==='RESOLVED'?'bg-forest-green/10 text-forest-green':dispute.status==='REVIEWING'?'bg-blue-50 text-blue-600':'bg-red-50 text-red-600'}`}>{dispute.status}</span>
                    </div>
                    <p className="font-body-sm text-on-surface-variant mb-1">{dispute.description}</p>
                    <p className="font-label-sm text-on-surface-variant">Buyer: {dispute.buyer} · Seller: {dispute.seller} · ${dispute.amount}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {dispute.status !== 'RESOLVED' && (
                    <button onClick={() => setSelectedDispute(dispute.id === selectedDispute ? null : dispute.id)}
                      className="px-4 py-1.5 text-xs bg-forest-green text-white rounded font-label-sm hover:opacity-90">
                      {selectedDispute === dispute.id ? 'Cancel' : 'Resolve'}
                    </button>
                  )}
                </div>
              </div>
              {selectedDispute === dispute.id && (
                <div className="mt-4 pt-4 border-t border-outline-variant/20 space-y-3">
                  <textarea value={resolution} onChange={e => setResolution(e.target.value)} rows={3}
                    placeholder="Enter resolution note (e.g. Refund approved, seller notified)..."
                    className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-none" />
                  <div className="flex gap-3">
                    <button onClick={() => handleResolve(dispute.id)} className="px-5 py-2 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">Mark Resolved</button>
                    <button className="px-5 py-2 border border-amber-300 text-amber-700 font-label-md rounded hover:bg-amber-50 transition-colors">Issue Refund</button>
                    <button className="px-5 py-2 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Contact Parties</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDisputeResolution;
