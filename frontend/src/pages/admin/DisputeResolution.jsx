import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DisputeResolution = () => {
  const navigate = useNavigate();
  const [verdict, setVerdict] = useState('split');
  const [notes, setNotes] = useState('');
  const [issuing, setIssuing] = useState(false);

  const handleIssueVerdict = (e) => {
    e.preventDefault();
    setIssuing(true);
    setTimeout(() => {
      setIssuing(false);
      alert('Dispute verdict issued successfully and parties notified.');
      navigate('/admin/orders');
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisanal Admin</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Marketplace Manager</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">group</span>
              Users
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
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
        
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <nav className="flex items-center gap-2 mb-2 text-xs text-on-surface-variant font-label-sm">
              <Link to="/admin/orders" className="hover:text-forest-green">Orders</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Disputes</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-semibold text-charcoal">Claim #DSP-8821</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal">
                Resolution Center
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ffdecb] text-[#97472a]">
                &bull; Action Required
              </span>
            </div>
          </div>

          <button 
            onClick={() => alert('Audit log history opened')}
            className="px-5 py-2.5 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">history</span>
            Audit Log
          </button>
        </div>

        {/* 2-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Order Details & Claims */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Order Details Banner */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Order Details
              </span>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" 
                    alt="Vase" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-headline-md text-sm font-bold text-charcoal">Hand-Thrown Terracotta Vase, Tall</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Order #ORD-4492 &bull; Placed Oct 12, 2023</p>
                  
                  <div className="flex items-center gap-8 mt-3 text-xs">
                    <div>
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Total Value</span>
                      <span className="font-bold text-charcoal">$245.00</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Funds Held</span>
                      <span className="font-bold text-terracotta">$245.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Claims Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Collector's Claim */}
              <div className="bg-white p-5 rounded-2xl border-l-4 border-terracotta border-outline-variant/30 shadow-sm space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-surface-container text-charcoal">
                    Collector
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Oct 24</span>
                </div>

                <h5 className="font-bold text-charcoal">Eleanor Vance</h5>

                <p className="font-body-md text-[11px] text-charcoal/90 leading-relaxed italic">
                  "The item arrived with a significant hairline crack down the side. The packaging seemed inadequate for fragile ceramics. Requesting a full refund."
                </p>

                <div className="pt-2 border-t border-outline-variant/20">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1.5">Evidence Provided</span>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden border border-outline-variant/30">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden border border-outline-variant/30">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Artisan's Claim */}
              <div className="bg-white p-5 rounded-2xl border-l-4 border-forest-green border-outline-variant/30 shadow-sm space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-50 text-forest-green">
                    Artisan
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Oct 25</span>
                </div>

                <h5 className="font-bold text-charcoal">Studio Kintsugi</h5>

                <p className="font-body-md text-[11px] text-charcoal/90 leading-relaxed italic">
                  "I pack all my items with triple-layer protection. The photo provided shows an unboxing state, but my drop-off receipt indicates it was handled properly on my end. I cannot accept a full refund for carrier damage."
                </p>

                <div className="pt-2 border-t border-outline-variant/20">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1.5">Evidence Provided</span>
                  <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden border border-outline-variant/30">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w" alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Moderator Action Form */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <h3 className="font-display-md text-base font-bold text-charcoal">Moderator Action</h3>

            <div className="space-y-3">
              <div 
                onClick={() => setVerdict('full_refund')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  verdict === 'full_refund' ? 'border-forest-green bg-emerald-50/20' : 'border-outline-variant/30'
                }`}
              >
                <input 
                  type="radio" 
                  name="verdict" 
                  checked={verdict === 'full_refund'} 
                  onChange={() => setVerdict('full_refund')}
                  className="accent-forest-green mt-0.5" 
                />
                <div>
                  <h5 className="font-bold text-charcoal">Full Refund to Collector</h5>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Item damaged beyond repair; artisan absorbs cost.</p>
                </div>
              </div>

              <div 
                onClick={() => setVerdict('release_funds')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  verdict === 'release_funds' ? 'border-forest-green bg-emerald-50/20' : 'border-outline-variant/30'
                }`}
              >
                <input 
                  type="radio" 
                  name="verdict" 
                  checked={verdict === 'release_funds'} 
                  onChange={() => setVerdict('release_funds')}
                  className="accent-forest-green mt-0.5" 
                />
                <div>
                  <h5 className="font-bold text-charcoal">Release Funds to Artisan</h5>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Insufficient evidence from collector; carrier fault.</p>
                </div>
              </div>

              <div 
                onClick={() => setVerdict('split')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  verdict === 'split' ? 'border-forest-green bg-emerald-50/20' : 'border-outline-variant/30'
                }`}
              >
                <input 
                  type="radio" 
                  name="verdict" 
                  checked={verdict === 'split'} 
                  onChange={() => setVerdict('split')}
                  className="accent-forest-green mt-0.5" 
                />
                <div>
                  <h5 className="font-bold text-charcoal">Split Liability (50/50)</h5>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Both parties share the cost; partial refund issued.</p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                Internal Notes (Visible to Admins only)
              </label>
              <textarea 
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Document reasoning for verdict..."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green"
              />
            </div>

            <button 
              type="button" 
              onClick={handleIssueVerdict}
              disabled={issuing}
              className="w-full py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
            >
              {issuing ? 'Recording Verdict...' : 'Issue Final Verdict'}
            </button>
          </div>

        </div>

      </main>

    </div>
  );
};

export default DisputeResolution;
