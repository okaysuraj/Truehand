import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LiveNavigation = () => {
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
          <Link to="/delivery/navigation" className="text-forest-green font-bold border-b-2 border-forest-green pb-1">Routes</Link>
          <Link to="/admin/delivery-agents" className="text-on-surface-variant hover:text-charcoal">Fleet</Link>
        </div>
      </header>

      {/* Main Full-Screen Navigation Container */}
      <main className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        
        {/* Left Turn-by-Turn Panel */}
        <div className="w-full md:w-96 bg-white border-r border-outline-variant/30 p-6 flex flex-col justify-between z-10 space-y-6 shrink-0 shadow-lg">
          <div className="space-y-6">
            
            {/* Route Status Card */}
            <div className="p-4 rounded-2xl bg-surface-container-low/70 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider">
                  LIVE TRACKING
                </span>
                <span className="px-2.5 py-0.5 rounded text-[9px] uppercase font-bold bg-charcoal text-white">
                  IN TRANSIT
                </span>
              </div>

              <h2 className="font-display-lg text-2xl font-bold text-charcoal">Route #882-A</h2>

              <div className="flex items-center gap-2 text-xs text-charcoal font-semibold pt-1 border-l-2 border-forest-green pl-2.5">
                <span className="material-symbols-outlined text-base text-forest-green">schedule</span>
                <div>
                  <p className="font-bold">14 min remaining</p>
                  <p className="text-[10px] text-on-surface-variant">Arrival estimated at 2:45 PM</p>
                </div>
              </div>
            </div>

            {/* Next Directions List */}
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-2 text-on-surface-variant font-bold">
                <span className="material-symbols-outlined text-base">alt_route</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider">Next Directions</span>
              </div>

              <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
                
                {/* Direction 1 */}
                <div className="relative space-y-0.5">
                  <span className="w-6 h-6 rounded-full bg-forest-green text-white flex items-center justify-center text-xs absolute -left-6 top-0 font-bold">
                    <span className="material-symbols-outlined text-sm">turn_right</span>
                  </span>
                  <h5 className="font-bold text-charcoal text-sm">Turn right onto Artisan Way</h5>
                  <p className="text-[11px] text-on-surface-variant">In 400 ft</p>
                </div>

                {/* Direction 2 */}
                <div className="relative space-y-0.5">
                  <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-xs absolute -left-6 top-0 font-bold text-charcoal">
                    <span className="material-symbols-outlined text-sm">straight</span>
                  </span>
                  <h5 className="font-semibold text-charcoal">Continue straight for 2.4 miles</h5>
                  <p className="text-[11px] text-on-surface-variant">Stay in center lane</p>
                </div>

                {/* Direction 3 */}
                <div className="relative space-y-0.5">
                  <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-xs absolute -left-6 top-0 font-bold text-charcoal">
                    <span className="material-symbols-outlined text-sm">turn_left</span>
                  </span>
                  <h5 className="font-semibold text-charcoal">Turn left on Pine Street</h5>
                  <p className="text-[11px] text-on-surface-variant">Final destination approaching</p>
                </div>

              </div>
            </div>

          </div>

          {/* Courier Card */}
          <div className="p-4 rounded-2xl border border-outline-variant/30 flex items-center justify-between bg-surface-container-low text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="font-bold text-charcoal">Marcus Thorne</h5>
                <p className="text-[10px] text-on-surface-variant">Senior Courier &bull; &star; 4.9</p>
              </div>
            </div>

            <div className="flex gap-1.5">
              <button className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-charcoal hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">phone</span>
              </button>
              <button className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-charcoal hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">chat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Map Canvas with Trajectory and Controls */}
        <div className="flex-1 relative bg-[#dfe6e2] flex flex-col justify-between p-6">
          
          {/* Map Controls */}
          <div className="absolute right-6 top-6 flex flex-col gap-2 z-10">
            <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center font-bold text-charcoal hover:bg-surface-container">+</button>
            <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center font-bold text-charcoal hover:bg-surface-container">-</button>
            <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-forest-green hover:bg-surface-container">
              <span className="material-symbols-outlined text-lg">my_location</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
              <span className="material-symbols-outlined text-lg">layers</span>
            </button>
          </div>

          {/* Map Center Placeholder Graphics */}
          <div className="flex-1 flex items-center justify-center text-on-surface-variant/40">
            <div className="text-center space-y-2">
              <span className="material-symbols-outlined text-7xl text-forest-green animate-pulse">navigation</span>
              <p className="text-xs font-semibold">Live GPS Route Active</p>
            </div>
          </div>

          {/* Bottom Floating Route Details Bar */}
          <div className="bg-white p-4 px-6 rounded-2xl border border-outline-variant/30 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4 text-xs z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 w-full sm:w-auto">
              <div>
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  DESTINATION
                </span>
                <p className="font-bold text-charcoal text-sm mt-0.5">1204 Mercantile Square, Suite 402</p>
              </div>

              <div>
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  PAYLOAD
                </span>
                <p className="font-bold text-charcoal text-sm mt-0.5">Hand-thrown Ceramic (Set of 4)</p>
              </div>
            </div>

            <button 
              onClick={() => alert('Opening full route details')}
              className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow shrink-0 w-full sm:w-auto"
            >
              VIEW FULL ROUTE
            </button>
          </div>

        </div>

      </main>

    </div>
  );
};

export default LiveNavigation;
