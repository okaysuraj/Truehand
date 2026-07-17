import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ManageCoupons = () => {
  const [showCreate, setShowCreate] = useState(false);

  const coupons = [
    { id: 1, code: 'WELCOME20', discount: '20%', type: 'Percentage', minOrder: 50, maxUses: 500, used: 312, expires: 'Dec 31, 2023', status: 'Active' },
    { id: 2, code: 'FREESHIP', discount: 'Free Shipping', type: 'Flat', minOrder: 100, maxUses: 100, used: 88, expires: 'Nov 15, 2023', status: 'Active' },
    { id: 3, code: 'ARTISAN10', discount: '$10', type: 'Flat', minOrder: 75, maxUses: 200, used: 200, expires: 'Oct 30, 2023', status: 'Expired' }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link to="/seller/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Manage Coupons</h1>
              <p className="font-body-md text-on-surface-variant">Create and manage discount codes for your storefront.</p>
            </div>
            <button onClick={() => setShowCreate(!showCreate)} className="px-6 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0 self-start md:self-auto">
              <span className="material-symbols-outlined text-[18px]">{showCreate ? 'close' : 'add'}</span>
              {showCreate ? 'Cancel' : 'Create Coupon'}
            </button>
          </div>
        </div>

        {/* Create Form */}
        {showCreate && (
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8 shadow-sm mb-8">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">New Coupon</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowCreate(false); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Coupon Code *</label>
                  <input type="text" required placeholder="e.g. SUMMER25" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface uppercase" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Discount Type *</label>
                  <select required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface appearance-none">
                    <option>Percentage</option>
                    <option>Flat Amount</option>
                    <option>Free Shipping</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Discount Value *</label>
                  <input type="number" required placeholder="e.g. 25" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Minimum Order ($)</label>
                  <input type="number" placeholder="0" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Max Uses</label>
                  <input type="number" placeholder="Unlimited" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Expiry Date *</label>
                  <input type="date" required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowCreate(false)} className="px-6 py-2.5 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">Create Coupon</button>
              </div>
            </form>
          </div>
        )}

        {/* Coupons List */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-outline-variant/30">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-mono font-bold text-lg text-forest-green bg-forest-green/5 px-3 py-1 rounded border border-dashed border-forest-green/30">{coupon.code}</span>
                    <span className={`font-label-sm px-2.5 py-0.5 rounded ${
                      coupon.status === 'Active' ? 'bg-forest-green/10 text-forest-green' : 'bg-surface-variant text-on-surface-variant'
                    }`}>{coupon.status}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 font-body-sm text-on-surface-variant">
                    <span>Discount: <span className="text-on-surface font-label-sm">{coupon.discount}</span></span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span>Min order: ${coupon.minOrder}</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span>Used: {coupon.used}/{coupon.maxUses}</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span>Expires: {coupon.expires}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="p-2 text-on-surface-variant hover:text-forest-green transition-colors rounded border border-outline-variant/30 hover:border-forest-green"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                  <button className="p-2 text-on-surface-variant hover:text-red-600 transition-colors rounded border border-outline-variant/30 hover:border-red-300"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageCoupons;
