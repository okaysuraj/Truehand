import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PackagingQC = () => {
  const navigate = useNavigate();
  const [packedItems, setPackedItems] = useState([1]);
  const [inserts, setInserts] = useState(['Thank You Note', 'Care Guide', 'Brand Sticker']);
  const [checkedInspected, setCheckedInspected] = useState(true);
  const [checkedTaped, setCheckedTaped] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const toggleItem = (id) => {
    setPackedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleInsert = (name) => {
    setInserts(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
  };

  const handleFinish = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate('/shipping-label-preview');
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Nav */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" 
                alt="Master Potter" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="font-display-md text-sm font-bold text-forest-green">Master Potter</h2>
              <p className="text-[10px] text-on-surface-variant">Hand-thrown Ceramics</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/seller/fulfillment" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-emerald-50 text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Fulfillment
            </Link>
            <Link to="/shipping-label-preview" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Shipping
            </Link>
            <Link to="/seller/returns" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">assignment_return</span>
              Returns
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Back Link & Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <Link 
              to="/seller/orders" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-forest-green transition-colors mb-2"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              ORDER #TH-8921
            </Link>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal">
              Packaging &amp; Quality Control
            </h1>
          </div>

          <div className="flex gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-surface-container text-charcoal">
              Standard Shipping
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ffdecb] text-[#97472a]">
              High Fragility
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: 1. Items to Pack & 2. Packaging Materials */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Items to Pack */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                <h3 className="font-display-md text-base font-bold text-charcoal">1. Items to Pack</h3>
                <span className="text-xs text-on-surface-variant font-semibold">2 Items Total</span>
              </div>

              {/* Item 1 */}
              <div 
                onClick={() => toggleItem(1)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  packedItems.includes(1) ? 'border-forest-green bg-emerald-50/20' : 'border-outline-variant/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-headline-md text-xs sm:text-sm font-bold text-charcoal">Terra Ridge Vase</h4>
                    <p className="text-[11px] text-on-surface-variant">Variant: Smoked Seafoam / Large</p>
                    <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">SKU: TRV-001-SF &bull; Qty: 1</p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  packedItems.includes(1) ? 'bg-forest-green border-forest-green text-white' : 'border-outline-variant'
                }`}>
                  {packedItems.includes(1) && <span className="material-symbols-outlined text-[14px]">check</span>}
                </div>
              </div>

              {/* Item 2 */}
              <div 
                onClick={() => toggleItem(2)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                  packedItems.includes(2) ? 'border-forest-green bg-emerald-50/20' : 'border-outline-variant/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-headline-md text-xs sm:text-sm font-bold text-charcoal">Basalt Tea Cup Set</h4>
                    <p className="text-[11px] text-on-surface-variant">Variant: Obsidian Black / Set of 2</p>
                    <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">SKU: BTC-042-OB &bull; Qty: 1</p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  packedItems.includes(2) ? 'bg-forest-green border-forest-green text-white' : 'border-outline-variant'
                }`}>
                  {packedItems.includes(2) && <span className="material-symbols-outlined text-[14px]">check</span>}
                </div>
              </div>
            </div>

            {/* 2. Packaging Materials */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
              <h3 className="font-display-md text-base font-bold text-charcoal">2. Packaging Materials</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-label-sm uppercase font-semibold text-on-surface-variant">Box Selection</label>
                  <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 font-semibold text-charcoal">
                    Standard Medium (12x12x8)
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-label-sm uppercase font-semibold text-on-surface-variant">Internal Wrap</label>
                  <select className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 font-semibold text-charcoal focus:outline-none">
                    <option>Honeycomb Paper Wrap</option>
                    <option>Biodegradable Bubble Film</option>
                    <option>Wood Wool Excelsior</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant">Package Inserts</label>
                <div className="flex flex-wrap gap-3">
                  {['Thank You Note', 'Care Guide', 'Brand Sticker'].map(ins => (
                    <button
                      key={ins}
                      type="button"
                      onClick={() => toggleInsert(ins)}
                      className={`px-4 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all ${
                        inserts.includes(ins) 
                          ? 'bg-emerald-50 border-2 border-forest-green text-forest-green' 
                          : 'bg-surface-container-low border border-outline-variant text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {inserts.includes(ins) ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>{ins}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3. Quality Documentation */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6 flex flex-col justify-between text-xs">
            <div className="space-y-6">
              <div>
                <h3 className="font-display-md text-base font-bold text-charcoal">3. Quality Documentation</h3>
                <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Upload a photo of the open box showing secure internal packaging for insurance compliance.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div 
                onClick={() => alert('Photo upload dialog opened.')}
                className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-8 text-center bg-surface-container-lowest hover:border-forest-green hover:bg-surface-linen transition-all cursor-pointer space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-forest-green mx-auto">
                  <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                </div>
                <h4 className="font-headline-md text-xs font-bold text-charcoal">Click to upload or drag &amp; drop</h4>
                <p className="text-[10px] text-on-surface-variant">JPG or PNG, max 10MB</p>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-charcoal">
                  <input 
                    type="checkbox" 
                    checked={checkedInspected} 
                    onChange={(e) => setCheckedInspected(e.target.checked)}
                    className="accent-forest-green w-4 h-4 rounded" 
                  />
                  <span>Inspected for structural integrity</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-charcoal">
                  <input 
                    type="checkbox" 
                    checked={checkedTaped} 
                    onChange={(e) => setCheckedTaped(e.target.checked)}
                    className="accent-forest-green w-4 h-4 rounded" 
                  />
                  <span>Securely taped (H-taping method)</span>
                </label>
              </div>
            </div>

            {/* Action Button */}
            <div className="space-y-2 pt-4">
              <button 
                type="button" 
                onClick={handleFinish}
                disabled={submitting}
                className="w-full py-4 bg-[#7a9486] text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:bg-forest-green transition-all shadow"
              >
                {submitting ? 'Processing...' : 'Mark as Packed & Ready'}
              </button>
              <p className="text-[10px] text-center text-on-surface-variant">
                Ready to print shipping label &amp; manifest
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default PackagingQC;
