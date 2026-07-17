import api from '../services/api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CHECKLIST_ITEMS = [
  { id: 1, label: 'Product matches order description', category: 'Accuracy' },
  { id: 2, label: 'Correct quantity packed', category: 'Accuracy' },
  { id: 3, label: 'No visible defects or damage', category: 'Quality' },
  { id: 4, label: 'Fragile items wrapped with protective material', category: 'Quality' },
  { id: 5, label: 'Product cleaned and dust-free', category: 'Quality' },
  { id: 6, label: 'Box/mailer is the right size', category: 'Packaging' },
  { id: 7, label: 'Padding and cushioning adequate', category: 'Packaging' },
  { id: 8, label: 'Shipping label affixed correctly', category: 'Packaging' },
  { id: 9, label: 'Return address included', category: 'Packaging' },
  { id: 10, label: 'Thank-you card or insert included', category: 'Experience' },
  { id: 11, label: 'Box sealed securely', category: 'Packaging' },
  { id: 12, label: 'Weight noted for carrier', category: 'Dispatch' },
];

const CATEGORIES = [...new Set(CHECKLIST_ITEMS.map(i => i.category))];

const PackagingQC = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id) => setChecked(c => ({ ...c, [id]: !c[id] }));
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const total = CHECKLIST_ITEMS.length;
  const pct = Math.round((checkedCount / total) * 100);

  const handleSubmit = () => {
    if (checkedCount < total) {
      if (!window.confirm(`You've completed ${checkedCount}/${total} checks. Submit anyway?`)) return;
    }
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="pt-24 pb-16 min-h-screen bg-surface-linen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-5xl text-forest-green">inventory</span>
        </div>
        <h1 className="font-display-sm text-display-sm text-on-surface mb-3">QC Passed!</h1>
        <p className="font-body-md text-on-surface-variant mb-8">
          Package is ready for dispatch. {checkedCount}/{total} checks completed.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/seller/orders" className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">
            Back to Orders
          </Link>
          <button onClick={() => { setChecked({}); setSubmitted(false); }} className="px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
            New Package
          </button>
        </div>
      </div>
    </div>
  );
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/seller/orders" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Orders
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Packaging QC</h1>
          <p className="font-body-md text-on-surface-variant">Complete this checklist before dispatching each package to ensure quality delivery.</p>
        </div>

        {/* Progress */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-5 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-label-md text-on-surface">{checkedCount} of {total} checks</span>
            <span className={`font-label-md ${pct === 100 ? 'text-forest-green' : 'text-amber-600'}`}>{pct}%</span>
          </div>
          <div className="h-2 bg-surface-variant/40 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? 'bg-forest-green' : 'bg-amber-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Checklist by category */}
        {CATEGORIES.map(cat => (
          <div key={cat} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm mb-4">
            <div className="px-6 py-3 bg-surface-variant/20 border-b border-outline-variant/20">
              <p className="font-label-sm uppercase tracking-wider text-on-surface-variant">{cat}</p>
            </div>
            <ul className="divide-y divide-outline-variant/15">
              {CHECKLIST_ITEMS.filter(i => i.category === cat).map(item => (
                <li key={item.id}>
                  <label className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-surface-linen/30 transition-colors">
                    <div
                      onClick={() => toggle(item.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                        checked[item.id] ? 'border-forest-green bg-forest-green' : 'border-outline-variant'
                      }`}
                    >
                      {checked[item.id] && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                    </div>
                    <span className={`font-body-md transition-colors ${checked[item.id] ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                      {item.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Notes */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-6">
          <label className="block font-label-sm text-on-surface mb-2">Notes (optional)</label>
          <textarea
            value={notes} onChange={e => setNotes(e.target.value)}
            rows={3} placeholder="Any special handling notes for this package..."
            className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-y"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-forest-green text-white font-label-md rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">inventory</span>
          Mark Package Ready
        </button>
      </div>
    </div>
  );
};

export default PackagingQC;
