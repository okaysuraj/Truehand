import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FLAGGED_CONTENT = [
  { id: 1, type: 'Product', item: 'Hand-carved Wooden Figure', reason: 'Inappropriate imagery', reportedBy: 12, status: 'PENDING', reportedAt: new Date().toISOString() },
  { id: 2, type: 'Review', item: '"Absolutely terrible quality, scam!"', reason: 'Abusive language', reportedBy: 3, status: 'PENDING', reportedAt: new Date(Date.now()-3600000).toISOString() },
  { id: 3, type: 'Seller', item: 'FastArtisan99', reason: 'Fake reviews suspected', reportedBy: 7, status: 'REVIEWING', reportedAt: new Date(Date.now()-86400000).toISOString() },
  { id: 4, type: 'Product', item: 'Leather Wallet - Designer Inspired', reason: 'Possible trademark infringement', reportedBy: 2, status: 'RESOLVED', reportedAt: new Date(Date.now()-172800000).toISOString() },
];

const AdminModerationRestrictions = () => {
  const [items, setItems] = useState(FLAGGED_CONTENT);
  const [filter, setFilter] = useState('pending');

  const handleAction = (id, action) => {
    setItems(i => i.map(item => item.id === id ? { ...item, status: action === 'approve' ? 'CLEARED' : action === 'remove' ? 'REMOVED' : 'RESTRICTED' } : item));
  };

  const filtered = items.filter(i => filter === 'all' || i.status?.toLowerCase() === filter);
  const typeIcon = (t) => t === 'Product' ? 'inventory_2' : t === 'Review' ? 'rate_review' : 'storefront';
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Moderation & Restrictions</h1>
          <p className="font-body-md text-on-surface-variant">Review flagged content, restrict sellers, and enforce community guidelines.</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Pending', value: items.filter(i=>i.status==='PENDING').length, color: 'text-amber-600' },
            { label: 'Reviewing', value: items.filter(i=>i.status==='REVIEWING').length, color: 'text-blue-600' },
            { label: 'Removed', value: items.filter(i=>i.status==='REMOVED').length, color: 'text-red-600' },
            { label: 'Cleared', value: items.filter(i=>i.status==='CLEARED'||i.status==='RESOLVED').length, color: 'text-forest-green' },
          ].map((s,i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 shadow-sm text-center">
              <p className="font-label-sm text-on-surface-variant mb-1">{s.label}</p>
              <p className={`font-headline-md text-headline-md ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {['pending','reviewing','removed','cleared','all'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${filter===f?'bg-charcoal text-white':'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'}`}>{f}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant block mb-3">shield_check</span>
              <p className="font-body-md text-on-surface-variant">No {filter} flagged content.</p>
            </div>
          ) : filtered.map(item => (
            <div key={item.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-red-500 text-[18px]">{typeIcon(item.type)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-label-sm px-2 py-0.5 bg-surface-variant rounded text-on-surface-variant text-[11px]">{item.type}</span>
                      <span className={`font-label-sm text-[11px] px-2 py-0.5 rounded ${item.status==='CLEARED'||item.status==='RESOLVED'?'bg-forest-green/10 text-forest-green':item.status==='REMOVED'||item.status==='RESTRICTED'?'bg-red-50 text-red-600':item.status==='REVIEWING'?'bg-blue-50 text-blue-600':'bg-amber-50 text-amber-600'}`}>{item.status}</span>
                    </div>
                    <p className="font-label-md text-on-surface mb-1 line-clamp-1">"{item.item}"</p>
                    <p className="font-body-sm text-on-surface-variant">{item.reason} · {item.reportedBy} reports · {new Date(item.reportedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {!['CLEARED','REMOVED','RESOLVED'].includes(item.status) && (
                  <div className="flex gap-2">
                    <button onClick={() => handleAction(item.id, 'approve')} className="px-3 py-1.5 text-xs bg-forest-green text-white rounded font-label-sm hover:opacity-90">Clear</button>
                    <button onClick={() => handleAction(item.id, 'restrict')} className="px-3 py-1.5 text-xs border border-amber-300 text-amber-700 rounded font-label-sm hover:bg-amber-50">Restrict</button>
                    <button onClick={() => handleAction(item.id, 'remove')} className="px-3 py-1.5 text-xs bg-red-600 text-white rounded font-label-sm hover:opacity-90">Remove</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminModerationRestrictions;
