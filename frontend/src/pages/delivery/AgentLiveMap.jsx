import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AgentLiveMap = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between">
      
      {/* Top Bar */}
      <header className="px-6 md:px-12 py-4 flex justify-between items-center border-b border-outline-variant/20 bg-white z-20">
        <Link to="/" className="flex items-center gap-2 text-forest-green">
          <span className="material-symbols-outlined text-2xl">local_shipping</span>
          <span className="font-display-md text-lg font-bold tracking-tight text-charcoal">TrueHand Logistics</span>
        </Link>
        <div className="flex items-center gap-6 text-xs font-semibold">
          <Link to="/delivery/dashboard" className="text-on-surface-variant hover:text-charcoal">Dashboard</Link>
          <Link to="/delivery/assigned" className="text-on-surface-variant hover:text-charcoal">Tasks</Link>
          <Link to="/delivery/agent-map" className="text-forest-green font-bold border-b-2 border-forest-green pb-1">Routes</Link>
          <Link to="/admin/delivery-agents" className="text-on-surface-variant hover:text-charcoal">Fleet</Link>
        </div>
      </header>

      {/* Main Full-Area Map & Active Task Sidebar */}
      <main className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        
        {/* Left Active Task Panel */}
        <div className="w-full md:w-96 bg-white border-r border-outline-variant/30 p-6 md:p-8 flex flex-col justify-between z-10 space-y-6 shrink-0 shadow-lg text-xs overflow-y-auto">
          <div className="space-y-6">
            
            <div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider block mb-2">
                ACTIVE TASK
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display-lg text-2xl font-bold text-charcoal">Eleanor Vance</h2>
                  <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">Order #TH-8829 &bull; Artisan Pottery</p>
                </div>
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <span className="px-2.5 py-0.5 rounded text-[9px] uppercase font-bold bg-surface-container text-charcoal">
                  Premium Fulfillment
                </span>
                <span className="px-2.5 py-0.5 rounded text-[9px] uppercase font-bold bg-red-50 text-red-700">
                  Fragile Cargo
                </span>
              </div>
            </div>

            {/* Estimated Arrival */}
            <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 flex items-center gap-3">
              <span className="material-symbols-outlined text-forest-green text-xl">local_shipping</span>
              <div>
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">ESTIMATED ARRIVAL</span>
                <p className="font-display-md text-base font-bold text-charcoal mt-0.5">
                  14:20 <span className="font-normal text-xs text-on-surface-variant font-body-md">(12 mins remaining)</span>
                </p>
              </div>
            </div>

            {/* Delivery Instructions */}
            <div className="space-y-1.5 pt-2 border-t border-outline-variant/20">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                DELIVERY INSTRUCTIONS
              </span>
              <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 italic text-charcoal leading-relaxed">
                "Please leave the package at the side entrance under the wooden overhang. The ceramic piece is quite delicate. Do not ring the bell, thank you."
              </div>
            </div>

            {/* Destination Address */}
            <div className="space-y-1 pt-2 border-t border-outline-variant/20">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                DESTINATION
              </span>
              <h5 className="font-bold text-charcoal text-sm">821 Whispering Pines Dr.</h5>
              <p className="text-[11px] text-on-surface-variant">Blackwood, MA 01240</p>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-outline-variant/20">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => alert('Calling client...')}
                className="py-2.5 border border-charcoal text-charcoal rounded-xl font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-base">phone</span>
                Call
              </button>
              <button 
                onClick={() => alert('Messaging client...')}
                className="py-2.5 border border-charcoal text-charcoal rounded-xl font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Message
              </button>
            </div>

            <button 
              onClick={() => {
                alert('Marked as arrived! Proceeding to proof of delivery.');
                navigate('/delivery/proof-of-delivery');
              }}
              className="w-full py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow"
            >
              <span className="material-symbols-outlined text-base">check_circle</span>
              Mark as Arrived
            </button>
          </div>

        </div>

        {/* Right Map Canvas */}
        <div className="flex-1 bg-[#dfe5e2] relative flex flex-col justify-between p-6">
          
          {/* Top Weather & Traffic Tag */}
          <div className="self-end z-10">
            <div className="bg-white/90 backdrop-blur px-5 py-2.5 rounded-2xl shadow border border-outline-variant/30 flex items-center gap-4 text-xs font-semibold text-charcoal">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-blue-500">ac_unit</span>
                34&deg;F &bull; Light Flurries
              </span>
              <span className="w-[1px] h-4 bg-outline-variant/40" />
              <span className="flex items-center gap-1.5 text-forest-green">
                <span className="material-symbols-outlined text-base">traffic</span>
                Minimal Traffic
              </span>
            </div>
          </div>

          {/* Map Center Placeholder Graphics */}
          <div className="flex items-center justify-center text-on-surface-variant/40">
            <span className="material-symbols-outlined text-8xl text-forest-green/40">explore</span>
          </div>

          {/* Map Controls */}
          <div className="absolute right-6 bottom-6 flex flex-col gap-2 z-10">
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center font-bold text-charcoal hover:bg-surface-container">+</button>
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center font-bold text-charcoal hover:bg-surface-container">-</button>
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center text-forest-green hover:bg-surface-container">
              <span className="material-symbols-outlined text-lg">my_location</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
              <span className="material-symbols-outlined text-lg">layers</span>
            </button>
          </div>

        </div>

      </main>

    </div>
  );
};

export default AgentLiveMap;
