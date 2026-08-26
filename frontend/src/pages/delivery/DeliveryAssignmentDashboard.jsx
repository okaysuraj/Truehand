import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UNASSIGNED_ORDERS = [
  {
    id: 'ORD-8924',
    urgency: '15m Overdue',
    urgencyClass: 'text-red-600',
    zone: 'North Arts Dist.',
    pickup: 'Studio Ceramics Co.',
    tags: ['Fragile', 'Small'],
  },
  {
    id: 'ORD-8925',
    urgency: 'in 45m',
    urgencyClass: 'text-charcoal',
    zone: 'West End',
    pickup: 'Linen & Weave',
    tags: ['Standard', 'Medium'],
  },
  {
    id: 'ORD-8926',
    urgency: 'in 1h 20m',
    urgencyClass: 'text-on-surface-variant',
    zone: 'South Market',
    pickup: 'Artisan Woodworks',
    tags: ['Heavy', 'Large'],
  },
];

const DeliveryAssignmentDashboard = () => {
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [zoneFilter, setZoneFilter] = useState('All');

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">TrueHand</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Marketplace Admin</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/admin/delivery-assignment" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
              Dispatch Hub
            </Link>
            <Link to="/admin/delivery-agents" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Fleet
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
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

      {/* Main 3-Column Interface */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Column: Unassigned Orders */}
        <div className="w-full md:w-80 bg-white border-r border-outline-variant/30 p-6 flex flex-col justify-between shrink-0 space-y-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-display-md text-base font-bold text-charcoal">Unassigned Orders</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-surface-container text-charcoal">
                12
              </span>
            </div>

            <div className="flex gap-2 text-xs">
              <select 
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-xs font-semibold text-charcoal focus:outline-none"
              >
                <option>Urgency: All</option>
                <option>Overdue</option>
                <option>Next 1 hr</option>
              </select>
              <select 
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-xs font-semibold text-charcoal focus:outline-none"
              >
                <option>Zone: All</option>
                <option>North Arts Dist.</option>
                <option>West End</option>
                <option>South Market</option>
              </select>
            </div>

            <div className="space-y-3 pt-1">
              {UNASSIGNED_ORDERS.map(ord => (
                <div 
                  key={ord.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('orderId', ord.id)}
                  className="p-4 rounded-2xl border border-outline-variant/30 space-y-2 hover:border-forest-green transition-colors cursor-grab bg-surface-container-lowest text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-[11px] font-bold ${ord.urgencyClass}`}>
                      &bull; {ord.urgency}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-semibold">{ord.zone}</span>
                  </div>

                  <h4 className="font-headline-md text-sm font-bold text-charcoal">{ord.id}</h4>
                  <p className="text-[11px] text-on-surface-variant">Pickup: {ord.pickup}</p>

                  <div className="flex gap-1.5 pt-1">
                    {ord.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-surface-container rounded text-[9px] uppercase font-bold text-charcoal">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Interactive City Map */}
        <div className="flex-1 bg-[#dfe5e2] relative flex flex-col justify-between p-6">
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow border border-outline-variant/30 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-forest-green" /> Active Agent</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#97472a]" /> Pending Pickup</span>
            </div>
          </div>

          <div className="flex items-center justify-center text-on-surface-variant/40">
            <span className="material-symbols-outlined text-8xl text-forest-green/40">map</span>
          </div>

          <div className="flex justify-between items-center bg-white/90 backdrop-blur p-4 rounded-2xl border border-outline-variant/30 shadow-lg z-10 text-xs">
            <span className="text-on-surface-variant font-semibold">Drag orders onto agents or map markers to assign.</span>
            <button 
              onClick={() => alert('Auto-assigning unassigned orders based on proximity...')}
              className="px-5 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow"
            >
              Auto-Assign Remaining
            </button>
          </div>
        </div>

        {/* Right Column: Agent Queue */}
        <div className="w-full md:w-80 bg-white border-l border-outline-variant/30 p-6 flex flex-col justify-between shrink-0 space-y-4 overflow-y-auto text-xs">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display-md text-base font-bold text-charcoal">Agent Queue</h3>
              <span className="text-[11px] font-bold text-forest-green">&bull; 8 Online</span>
            </div>

            {/* Agent 1 (Available) */}
            <div className="p-4 rounded-2xl border border-outline-variant/30 space-y-3 bg-surface-container-lowest">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal">Sarah Jenkins</h5>
                    <p className="text-[10px] text-on-surface-variant">Available (Idle)</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-base text-on-surface-variant">two_wheeler</span>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold text-on-surface-variant mb-1">
                  <span>Capacity</span>
                  <span>1/3 slots</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-forest-green h-1.5 rounded-full w-[33%]" />
                </div>
              </div>

              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const id = e.dataTransfer.getData('orderId');
                  alert(`Assigned order ${id} to Sarah Jenkins`);
                }}
                className="border-2 border-dashed border-outline-variant/60 rounded-xl p-3 text-center text-[10px] font-semibold text-on-surface-variant hover:border-forest-green bg-surface-container-low/50 cursor-pointer"
              >
                Drop order to assign
              </div>
            </div>

            {/* Agent 2 (Busy) */}
            <div className="p-4 rounded-2xl border border-outline-variant/30 space-y-3 bg-surface-container-lowest opacity-70">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center font-bold text-xs text-charcoal">
                    MR
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal">Marcus R.</h5>
                    <p className="text-[10px] text-terracotta font-semibold">En Route (Delivery)</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-base text-on-surface-variant">local_shipping</span>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold text-on-surface-variant mb-1">
                  <span>Capacity</span>
                  <span>4/4 slots</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-terracotta h-1.5 rounded-full w-full" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
};

export default DeliveryAssignmentDashboard;
