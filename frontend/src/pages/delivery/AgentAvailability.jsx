import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AgentAvailability = () => {
  const [online, setOnline] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#faf8f5] font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Logistics Hub</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Premium Fulfillment</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/delivery/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Overview
            </Link>
            <Link to="/delivery/assigned" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Active Deliveries
            </Link>
            <Link to="/delivery/history" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">history</span>
              History
            </Link>
            <Link to="/delivery/availability" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">toggle_on</span>
              Availability
            </Link>
            <Link to="/delivery/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">help</span>
              Support
            </Link>
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-outline-variant/20 text-xs text-on-surface-variant font-semibold px-1">
          <Link to="/help" className="hover:text-charcoal block">Help</Link>
          <Link to="/login" className="hover:text-charcoal block">Sign Out</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto space-y-12 flex flex-col justify-between">
        
        {/* Top Headline */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider block">
            AGENT AVAILABILITY
          </span>
          <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
            Set Your Rhythm
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            Toggle your status to start receiving premium artisan delivery tasks or take a moment for yourself.
          </p>
        </div>

        {/* Center Control Box */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-xl max-w-xl mx-auto w-full text-center space-y-8">
          
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold bg-surface-container text-charcoal tracking-wide uppercase">
            {online ? 'YOU ARE CURRENTLY ONLINE' : 'YOU ARE CURRENTLY OFFLINE'}
          </span>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 text-sm font-bold">
            <span className={!online ? 'text-charcoal' : 'text-on-surface-variant/50'}>Offline</span>
            
            <button 
              onClick={() => setOnline(!online)}
              className={`w-20 h-10 rounded-full p-1 transition-all flex items-center shadow-inner ${
                online ? 'bg-forest-green justify-end' : 'bg-surface-container justify-start'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-charcoal">
                <span className="material-symbols-outlined text-base">
                  {online ? 'check' : 'close'}
                </span>
              </div>
            </button>

            <span className={online ? 'text-forest-green' : 'text-on-surface-variant/50'}>Online</span>
          </div>

          {/* 2 Metric Bento Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
            <div className="p-5 rounded-2xl bg-surface-container-low/60 border border-outline-variant/20 space-y-1">
              <span className="material-symbols-outlined text-forest-green text-xl">payments</span>
              <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">TODAY'S POTENTIAL</span>
              <h4 className="font-display-lg text-2xl font-bold text-charcoal">$342.50</h4>
              <p className="text-[10px] text-on-surface-variant">Based on current demand</p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low/60 border border-outline-variant/20 space-y-1">
              <span className="material-symbols-outlined text-forest-green text-xl">schedule</span>
              <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">ESTIMATED HOURS</span>
              <h4 className="font-display-lg text-2xl font-bold text-charcoal">6.5 hrs</h4>
              <p className="text-[10px] text-on-surface-variant">Fulfillment Window</p>
            </div>
          </div>

        </div>

        {/* Bottom Mood Images */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto opacity-70">
          <div className="h-44 rounded-2xl overflow-hidden bg-surface-container">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" alt="" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="h-44 rounded-2xl overflow-hidden bg-surface-container">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A" alt="" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="h-44 rounded-2xl overflow-hidden bg-surface-container">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" alt="" className="w-full h-full object-cover grayscale" />
          </div>
        </div>

      </main>

    </div>
  );
};

export default AgentAvailability;
