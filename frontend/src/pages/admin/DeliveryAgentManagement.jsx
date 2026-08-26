import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AGENTS = [
  {
    id: 'DA-8821',
    name: 'Elias Thorne',
    region: 'North District',
    vehicle: 'E-Scooter',
    vehicleIcon: 'electric_scooter',
    status: 'Online',
    statusClass: 'bg-emerald-50 text-forest-green',
    rating: '4.9',
    deliveries: '1,240',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA',
  },
  {
    id: 'DA-9034',
    name: 'Clara Vance',
    region: 'West End Arts',
    vehicle: 'Cargo Van',
    vehicleIcon: 'local_shipping',
    status: 'Offline',
    statusClass: 'bg-surface-container text-on-surface-variant',
    rating: '4.7',
    deliveries: '892',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA',
  },
  {
    id: 'DA-7712',
    name: 'Marcus Reed',
    region: 'South Market',
    vehicle: 'Bicycle',
    vehicleIcon: 'pedal_bike',
    status: 'Online',
    statusClass: 'bg-emerald-50 text-forest-green',
    rating: '5.0',
    deliveries: '2,105',
    initials: 'MR',
  },
];

const DeliveryAgentManagement = () => {
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
            <Link to="/admin/delivery-agents" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Delivery Fleet
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

        <div className="pt-6 border-t border-outline-variant/20">
          <Link to="/storefront-preview" className="w-full py-2.5 border border-charcoal text-charcoal rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all flex items-center justify-center">
            View Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Active Agents
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl">
              Monitor and manage the logistics network. Currently displaying active delivery personnel and their operational metrics.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Filter options')}
              className="px-4 py-2.5 bg-white border border-outline-variant/40 rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">tune</span>
              Filter
            </button>
            <button 
              onClick={() => alert('Switching to live map view...')}
              className="px-4 py-2.5 bg-white border border-outline-variant/40 rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">map</span>
              Map View
            </button>
            <button 
              onClick={() => alert('Add new agent dialog opened')}
              className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-base">add</span>
              New Agent
            </button>
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">Agent Name &amp; ID</th>
                  <th className="p-4">Region</th>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Rating</th>
                  <th className="p-4 text-right pr-6">Deliveries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {AGENTS.map(agent => (
                  <tr key={agent.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6 flex items-center gap-3">
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
                        <p className="text-[10px] text-on-surface-variant font-mono">ID: {agent.id}</p>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-charcoal">{agent.region}</td>

                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-charcoal font-semibold">
                        <span className="material-symbols-outlined text-base text-on-surface-variant">{agent.vehicleIcon}</span>
                        {agent.vehicle}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${agent.statusClass}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {agent.status}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span className="font-bold text-charcoal flex items-center justify-center gap-0.5">
                        <span className="text-amber-500">&star;</span>
                        {agent.rating}
                      </span>
                    </td>

                    <td className="p-4 text-right pr-6 font-display-md text-xs font-bold text-charcoal">
                      {agent.deliveries}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section: Distribution Map & Quick Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Preview */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4 text-xs flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h3 className="font-display-md text-base font-bold text-charcoal">Agent Distribution Map</h3>
              <button className="text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">fullscreen</span></button>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/20 relative flex items-center justify-center">
              <div className="text-center space-y-1">
                <span className="material-symbols-outlined text-4xl text-outline-variant/70">location_city</span>
                <p className="text-xs text-on-surface-variant font-semibold">Interactive Fleet Map View</p>
                <p className="text-[10px] text-on-surface-variant">Live Feed &bull; 42 Agents Active Online</p>
              </div>
            </div>
          </div>

          {/* Metric Side Cards */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2 text-xs flex-1">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Total Active Agents
              </span>
              <h3 className="font-display-lg text-4xl font-bold text-charcoal">42</h3>
              <p className="text-[11px] text-on-surface-variant">out of 58 total registered</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2 text-xs flex-1">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Average Rating
              </span>
              <div className="flex items-center gap-2">
                <h3 className="font-display-lg text-4xl font-bold text-charcoal">4.8</h3>
                <span className="text-amber-500 text-2xl">&star;</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold">+0.2 from last month</span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default DeliveryAgentManagement;
