import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ROUTE_STOPS = [
  {
    type: 'departure',
    time: '08:00',
    title: 'Hub Alpha - Paris North',
    address: '12 Rue de la Logistique, 75018',
  },
  {
    type: 'stop',
    num: 1,
    time: '08:25',
    title: 'Artisan Boutique Étoile',
    priority: 'Express',
    items: '3 items',
    stopDuration: '10m stop',
  },
  {
    type: 'stop',
    num: 2,
    time: '08:50',
    title: 'Gallerie Lafayette',
    priority: 'Standard Delivery',
  },
  {
    type: 'stop',
    num: 3,
    time: '09:15',
    title: 'The Craft House',
    alert: 'Narrow access route: Use side entrance',
  },
  {
    type: 'return',
    time: '10:15',
    title: 'Hub Alpha',
    subtext: 'Estimated Return: 10:15',
  },
];

const RouteOptimizationView = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

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
            <Link to="/route-optimization" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
              Routes
            </Link>
            <Link to="/delivery/earnings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">history</span>
              History
            </Link>
            <Link to="/delivery/onboarding" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`w-full py-3 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold transition-all shadow flex items-center justify-center gap-2 ${
              isOnline ? 'bg-forest-green text-white' : 'bg-charcoal text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
            {isOnline ? 'Go Online' : 'Go Offline'}
          </button>

          <Link to="/help" className="flex items-center gap-2 text-xs text-on-surface-variant px-1 font-semibold hover:text-charcoal">
            <span className="material-symbols-outlined text-base">help</span>
            Support
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden">
        
        {/* Left Interactive Map Canvas */}
        <div className="flex-1 relative bg-surface-container-high/40 overflow-hidden">
          
          {/* Map Grid Pattern Backdrop */}
          <div 
            className="w-full h-full opacity-60"
            style={{
              backgroundImage: 'radial-gradient(#97472a 0.75px, transparent 0.75px), radial-gradient(#163428 0.75px, #f4f0eb 0.75px)',
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 15px 15px',
            }}
          />

          {/* Top Floating Metric Bar */}
          <div className="absolute top-6 left-6 right-6 max-w-lg bg-white/95 backdrop-blur-md p-4 px-6 rounded-2xl border border-outline-variant/30 shadow-md flex justify-between items-center text-xs">
            <div>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant block tracking-wider font-mono">TOTAL DISTANCE</span>
              <h4 className="font-display-lg text-lg font-bold text-charcoal">42.8 km</h4>
            </div>

            <div className="h-8 w-[1px] bg-outline-variant/30" />

            <div>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant block tracking-wider font-mono">EST. DURATION</span>
              <h4 className="font-display-lg text-lg font-bold text-charcoal">2h 15m</h4>
            </div>

            <div className="h-8 w-[1px] bg-outline-variant/30" />

            <div>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant block tracking-wider font-mono">STOPS</span>
              <h4 className="font-display-lg text-lg font-bold text-charcoal">12</h4>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-6 left-6 flex flex-col gap-1 hidden md:flex">
            {/* Map zoom controls */}
          </div>
        </div>

        {/* Right Stop Sequence Sidebar */}
        <div className="w-full lg:w-96 bg-white border-l border-outline-variant/30 p-6 flex flex-col justify-between overflow-y-auto space-y-6 text-xs">
          
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <h3 className="font-display-md text-base font-bold text-charcoal">Stop Sequence</h3>
              <button 
                onClick={() => alert('Recalculating and optimizing route...')}
                className="text-forest-green font-bold text-xs flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-sm">tune</span>
                Optimize
              </button>
            </div>

            {/* Destination Search Box */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                search
              </span>
              <input 
                type="text"
                placeholder="Add a destination..."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-2.5 pl-9 pr-3 text-xs text-charcoal focus:outline-none focus:border-forest-green"
              />
            </div>

            {/* Stops Timeline */}
            <div className="space-y-4">
              {ROUTE_STOPS.map((stop, i) => (
                <div key={i} className="flex items-start gap-3 relative">
                  
                  {/* Pin Circle */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                    stop.type === 'departure' ? 'bg-forest-green text-white' :
                    stop.type === 'return' ? 'bg-charcoal text-white' :
                    'bg-surface-container text-charcoal border border-outline-variant'
                  }`}>
                    {stop.num ? stop.num : stop.type === 'departure' ? '●' : '⚑'}
                  </div>

                  {/* Stop Card */}
                  <div className={`flex-1 p-3.5 rounded-2xl border transition-all ${
                    stop.alert ? 'bg-amber-50/50 border-amber-200' : 'bg-surface-container-lowest border-outline-variant/30'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        {stop.type === 'departure' && (
                          <span className="text-[8px] uppercase font-bold text-forest-green tracking-wider block">DEPARTURE</span>
                        )}
                        {stop.type === 'return' && (
                          <span className="text-[8px] uppercase font-bold text-on-surface-variant tracking-wider block">RETURN BASE</span>
                        )}
                        <h5 className="font-bold text-charcoal text-xs">{stop.title}</h5>
                        {stop.address && <p className="text-[10px] text-on-surface-variant">{stop.address}</p>}
                        {stop.subtext && <p className="text-[10px] text-on-surface-variant">{stop.subtext}</p>}
                      </div>
                      <span className="font-mono text-[10px] font-bold text-charcoal">{stop.time}</span>
                    </div>

                    {stop.priority && (
                      <div className="flex gap-2 pt-2 items-center text-[9px] text-on-surface-variant font-semibold">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-forest-green font-bold">{stop.priority}</span>
                        {stop.items && <span>&bull; {stop.items}</span>}
                        {stop.stopDuration && <span>&bull; {stop.stopDuration}</span>}
                      </div>
                    )}

                    {stop.alert && (
                      <p className="text-[10px] text-amber-900 font-semibold flex items-center gap-1 pt-1.5">
                        <span className="material-symbols-outlined text-xs">warning</span>
                        {stop.alert}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="space-y-2 pt-4 border-t border-outline-variant/20">
            <button 
              onClick={() => navigate('/delivery/navigation')}
              className="w-full py-4 bg-forest-green text-white rounded-2xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow flex items-center justify-center gap-2"
            >
              <span>Start Optimized Route</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <p className="text-[9px] text-center text-on-surface-variant font-mono flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-xs">cloud_sync</span>
              Route data synced with mobile terminal
            </p>
          </div>

        </div>

      </main>

    </div>
  );
};

export default RouteOptimizationView;
