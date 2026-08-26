import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ACTIVE_AGENTS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    vehicle: 'E-Bike',
    status: 'Delivering',
    statusClass: 'bg-[#ffdecb] text-[#97472a]',
    currentTask: 'Order #8892',
    estArrival: '4 mins',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA',
  },
  {
    id: 2,
    name: 'Michael T.',
    vehicle: 'Walker',
    status: 'Picking Up',
    statusClass: 'bg-emerald-50 text-forest-green',
    currentTask: 'Hub A',
    battery: 'N/A',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA',
  },
  {
    id: 3,
    name: 'David L.',
    vehicle: 'Van',
    status: 'Idle',
    statusClass: 'bg-surface-container text-on-surface-variant',
    location: 'North District',
    since: '12 mins',
    initials: 'DL',
  },
];

const LiveFleetTracking = () => {
  const [filter, setFilter] = useState('All Statuses');

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
            <Link to="/admin/fleet-live" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">share_location</span>
              Live Fleet
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

      {/* Main Full-Area Map & Active Agents Sidebar */}
      <main className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        
        {/* Map Container */}
        <div className="flex-1 bg-[#dfe5e2] relative flex flex-col justify-between p-6">
          
          {/* Top Floating Map Header */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow border border-outline-variant/30">
              <h2 className="font-display-lg text-lg font-bold text-charcoal">Live Fleet Tracking</h2>
              <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-emerald-50 text-forest-green animate-pulse">
                Live
              </span>
            </div>

            {/* Status Legend */}
            <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow border border-outline-variant/30 text-xs space-y-1.5">
              <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                STATUS LEGEND
              </span>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-charcoal">
                <span className="w-2.5 h-2.5 rounded-full bg-[#97472a]" />
                <span>Delivering (3)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-charcoal">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5c7a6b]" />
                <span>Picking Up (5)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-charcoal">
                <span className="w-2.5 h-2.5 rounded-full bg-surface-container-high border border-outline-variant/40" />
                <span>Idle (2)</span>
              </div>
            </div>
          </div>

          {/* Map Center Placeholder Graphics */}
          <div className="flex items-center justify-center text-on-surface-variant/40">
            <span className="material-symbols-outlined text-8xl text-forest-green/60">travel_explore</span>
          </div>

          {/* Map Controls */}
          <div className="absolute right-6 bottom-6 flex flex-col gap-2 z-10">
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center font-bold text-charcoal hover:bg-surface-container">+</button>
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center font-bold text-charcoal hover:bg-surface-container">-</button>
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center text-forest-green hover:bg-surface-container">
              <span className="material-symbols-outlined text-lg">my_location</span>
            </button>
          </div>

        </div>

        {/* Right Active Agents Column */}
        <div className="w-full md:w-96 bg-white border-l border-outline-variant/30 p-6 flex flex-col justify-between z-10 space-y-6 shrink-0 shadow-lg text-xs overflow-y-auto">
          <div className="space-y-4">
            
            <div className="flex justify-between items-center">
              <h3 className="font-display-md text-base font-bold text-charcoal">Active Agents</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ffdecb] text-[#97472a]">
                10 Online
              </span>
            </div>

            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5 text-xs font-semibold text-charcoal focus:outline-none"
            >
              <option>All Statuses</option>
              <option>Delivering</option>
              <option>Picking Up</option>
              <option>Idle</option>
            </select>

            {/* Agent List */}
            <div className="space-y-4 pt-2">
              {ACTIVE_AGENTS.map(agent => (
                <div 
                  key={agent.id}
                  className="p-4 rounded-2xl border border-outline-variant/30 space-y-3 hover:bg-surface-container-low/40 transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {agent.image ? (
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                          <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-xs text-charcoal shrink-0">
                          {agent.initials}
                        </div>
                      )}
                      <div>
                        <h4 className="font-headline-md text-xs font-bold text-charcoal">{agent.name}</h4>
                        <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">two_wheeler</span>
                          {agent.vehicle}
                        </p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${agent.statusClass}`}>
                      {agent.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/10 text-[11px]">
                    <div>
                      <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Current Task</span>
                      <strong className="text-charcoal">{agent.currentTask || agent.location}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-variant block uppercase font-bold">
                        {agent.estArrival ? 'Est. Arrival' : agent.battery ? 'Battery' : 'Since'}
                      </span>
                      <strong className="text-forest-green">{agent.estArrival || agent.battery || agent.since}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </main>

    </div>
  );
};

export default LiveFleetTracking;
