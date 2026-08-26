import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Logistics Hub</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Premium Fulfillment</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/delivery/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
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
            <Link to="/delivery/earnings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Earnings
            </Link>
            <Link to="/delivery/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">help</span>
              Support
            </Link>
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-outline-variant/20">
          <button 
            onClick={() => setOnline(!online)}
            className={`w-full py-3 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold transition-all shadow ${
              online ? 'bg-forest-green text-white hover:bg-emerald-900' : 'bg-surface-container text-charcoal'
            }`}
          >
            {online ? 'Online (Active)' : 'Go Online'}
          </button>
          
          <div className="flex justify-between items-center text-xs text-on-surface-variant px-1 font-semibold">
            <Link to="/help" className="hover:text-charcoal">Help</Link>
            <Link to="/login" className="hover:text-charcoal">Sign Out</Link>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl space-y-8">
        
        {/* Header & Scan Parcel CTA */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <span className="text-xs font-semibold text-on-surface-variant font-mono">Thursday, October 24</span>
            <h1 className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal mt-0.5">
              Welcome back, Marcus
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Your route for today is optimized and ready for departure.
            </p>
          </div>

          <button 
            onClick={() => alert('Parcel QR camera scanner active')}
            className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">qr_code_scanner</span>
            Scan Parcel
          </button>
        </div>

        {/* 4 Metric Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2 text-xs">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-forest-green text-lg">local_shipping</span>
              <span className="font-bold text-forest-green">+12%</span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-charcoal">24 / 32</h3>
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Deliveries Today</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2 text-xs">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-forest-green text-lg">payments</span>
              <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-amber-50 text-amber-800">Premium</span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-charcoal">$482.50</h3>
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Earnings (Est.)</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2 text-xs">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-forest-green text-lg">schedule</span>
              <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-emerald-50 text-forest-green">On Time</span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-charcoal">02:45</h3>
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Remaining Shift</span>
          </div>

          <div className="bg-[#fff7f2] p-5 rounded-2xl border-l-4 border-terracotta border-outline-variant/30 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-terracotta font-bold">
              <span className="material-symbols-outlined text-base">traffic</span>
              <span>Traffic Alert</span>
            </div>
            <p className="text-[11px] text-charcoal leading-relaxed font-semibold">
              Congestion reported on Highway 101. Route recalculated via East Road.
            </p>
          </div>

        </div>

        {/* 2-Column Main Route View: Map & Stops Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Map with Next Destination & Route Progress */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="h-96 relative bg-[#e3e8e5] p-6 flex flex-col justify-between">
              
              {/* Floating Next Destination Card */}
              <div className="bg-white/95 backdrop-blur p-4 rounded-2xl border border-outline-variant/30 shadow-lg max-w-xs space-y-1 text-xs">
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  Next Destination
                </span>
                <h4 className="font-headline-md text-sm font-bold text-charcoal">742 Evergreen Terrace</h4>
                <div className="flex items-center gap-3 text-[11px] text-on-surface-variant pt-1 font-semibold">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">near_me</span> 1.2 mi</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">timer</span> 8 mins</span>
                </div>
              </div>

              {/* Map Center Placeholder / Graphics */}
              <div className="flex items-center justify-center text-on-surface-variant/40">
                <span className="material-symbols-outlined text-6xl">map</span>
              </div>

              {/* Map Controls */}
              <div className="absolute right-6 top-6 flex flex-col gap-2">
                <button className="w-9 h-9 bg-white rounded-xl shadow flex items-center justify-center font-bold text-charcoal hover:bg-surface-container">+</button>
                <button className="w-9 h-9 bg-white rounded-xl shadow flex items-center justify-center font-bold text-charcoal hover:bg-surface-container">-</button>
                <button className="w-9 h-9 bg-white rounded-xl shadow flex items-center justify-center text-forest-green hover:bg-surface-container">
                  <span className="material-symbols-outlined text-lg">my_location</span>
                </button>
              </div>

            </div>

            {/* Bottom Bar inside Map Box */}
            <div className="p-4 px-6 bg-charcoal text-white flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="font-semibold text-white/80">Route Progress</span>
                <div className="w-48 bg-white/20 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full w-[75%]" />
                </div>
                <span className="font-bold">75%</span>
              </div>

              <button 
                onClick={() => navigate('/delivery/navigation')}
                className="px-6 py-2.5 bg-white text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-surface-container transition-all"
              >
                View Navigation
              </button>
            </div>
          </div>

          {/* Right: Stops (32) Feed */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <h3 className="font-display-md text-base font-bold text-charcoal">Stops (32)</h3>
              <button className="text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">tune</span></button>
            </div>

            <div className="space-y-3">
              
              {/* Stop 24 Completed */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low/60 flex items-start gap-3 opacity-60">
                <span className="w-6 h-6 rounded-full bg-forest-green text-white flex items-center justify-center text-[10px] font-bold">&check;</span>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h5 className="font-bold text-charcoal">Artisan Pottery Studio</h5>
                    <span className="text-[10px] text-on-surface-variant">09:12 AM</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">128 Oak St, Suite 4</p>
                </div>
              </div>

              {/* Stop 25 Next */}
              <div className="p-4 rounded-2xl border-2 border-charcoal bg-white space-y-2 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-bold">25</span>
                    <h5 className="font-bold text-charcoal">Marcus Residence</h5>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-forest-green text-white">NEXT</span>
                </div>
                <p className="text-[11px] text-on-surface-variant pl-8">742 Evergreen Terrace</p>
                <div className="flex gap-2 pl-8 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container text-[9px] uppercase font-bold text-charcoal">Hand-thrown Ceramic</span>
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-[9px] uppercase font-bold">Fragile</span>
                </div>
              </div>

              {/* Stop 26 Pending */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low/60 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold text-on-surface-variant">26</span>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h5 className="font-bold text-charcoal">The Linen Gallery</h5>
                    <span className="text-[10px] text-on-surface-variant">Est. 10:45 AM</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">901 Industrial Ave</p>
                </div>
              </div>

              {/* Stop 27 Pending */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low/60 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold text-on-surface-variant">27</span>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h5 className="font-bold text-charcoal">Coastal Provisions</h5>
                    <span className="text-[10px] text-on-surface-variant">Est. 11:15 AM</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">33 Seaside Way</p>
                </div>
              </div>

            </div>

            <button 
              onClick={() => alert('Full itinerary list')}
              className="w-full py-2.5 text-center text-xs font-bold text-forest-green hover:underline pt-2"
            >
              See Full Itinerary
            </button>
          </div>

        </div>

      </main>

    </div>
  );
};

export default DeliveryDashboard;
