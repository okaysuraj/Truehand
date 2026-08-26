import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DELIVERIES = [
  {
    id: '#TH-9842-X',
    pickupPoint: 'The Ceramic Loft',
    pickupAddress: '42 Artisan Way, Studio 4',
    destination: 'Jameson Residence',
    destinationAddress: '812 Willow Creek Blvd',
    distance: '2.4 km',
    status: 'Ready for Pickup',
    statusClass: 'bg-[#ffdecb] text-[#97472a]',
    actionText: 'View Details',
    actionRoute: '/delivery/details/1',
  },
  {
    id: '#TH-8721-L',
    pickupPoint: 'Silver Thread Boutique',
    pickupAddress: '15 High Street, Unit B',
    destination: 'The Metropolitan Museum',
    destinationAddress: '1000 Fifth Avenue',
    distance: '14.8 km',
    status: 'In Transit',
    statusClass: 'bg-surface-container text-charcoal',
    actionText: 'Track Live',
    actionRoute: '/delivery/live-map',
  },
  {
    id: '#TH-1025-W',
    pickupPoint: 'Oak & Iron Woodworks',
    pickupAddress: 'Ind. Estate, Warehouse 7',
    destination: 'The Green Cafe',
    destinationAddress: '33 Organic Row',
    distance: '5.2 km',
    status: 'Assigned',
    statusClass: 'bg-surface-container text-on-surface-variant',
    actionText: 'Acknowledge',
    actionRoute: '/delivery/handover/1',
  },
  {
    id: '#TH-9901-K',
    pickupPoint: 'Handmade Glass Studio',
    pickupAddress: '8 Crystal Lane',
    destination: "Elena's Florals",
    destinationAddress: 'Main St Crossing',
    distance: '1.1 km',
    status: 'Ready for Pickup',
    statusClass: 'bg-[#ffdecb] text-[#97472a]',
    actionText: 'View Details',
    actionRoute: '/delivery/details/2',
  },
];

const AssignedDeliveries = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
            <Link to="/delivery/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Overview
            </Link>
            <Link to="/delivery/assigned" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
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
            onClick={() => navigate('/delivery/dashboard')}
            className="w-full py-3 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold bg-forest-green text-white shadow"
          >
            Go Online
          </button>
          
          <div className="flex justify-between items-center text-xs text-on-surface-variant px-1 font-semibold">
            <Link to="/help" className="hover:text-charcoal">Help</Link>
            <Link to="/login" className="hover:text-charcoal">Sign Out</Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider block">
              Courier Operations
            </span>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Assigned Deliveries
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl">
              A curated view of your current logistical commitments. Prioritize based on proximity and collection windows.
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">search</span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Order ID or Destina..."
                className="w-full bg-white border border-outline-variant/40 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:border-forest-green shadow-sm"
              />
            </div>
            <button className="px-4 py-2.5 bg-white border border-outline-variant/40 rounded-xl text-xs font-bold text-charcoal hover:bg-surface-container flex items-center gap-1.5 shadow-sm shrink-0">
              <span className="material-symbols-outlined text-base">tune</span>
              Filters
            </button>
          </div>
        </div>

        {/* Deliveries Table */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">ORDER ID</th>
                  <th className="p-4">PICKUP POINT</th>
                  <th className="p-4">DELIVERY DESTINATION</th>
                  <th className="p-4">DISTANCE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-right pr-6">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {DELIVERIES.map(del => (
                  <tr key={del.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-charcoal">
                      {del.id}
                    </td>

                    <td className="p-4">
                      <h5 className="font-bold text-charcoal">{del.pickupPoint}</h5>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">{del.pickupAddress}</p>
                    </td>

                    <td className="p-4">
                      <h5 className="font-bold text-charcoal">{del.destination}</h5>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">{del.destinationAddress}</p>
                    </td>

                    <td className="p-4 font-mono font-semibold text-charcoal">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-on-surface-variant">route</span>
                        {del.distance}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${del.statusClass}`}>
                        {del.status}
                      </span>
                    </td>

                    <td className="p-4 text-right pr-6">
                      <button 
                        onClick={() => navigate(del.actionRoute)}
                        className="text-forest-green font-bold hover:underline"
                      >
                        {del.actionText}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between text-xs">
            <div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Total Weight</span>
              <h4 className="font-display-md text-xl font-bold text-charcoal mt-0.5">42.5 kg</h4>
            </div>
            <span className="material-symbols-outlined text-terracotta text-2xl">shopping_bag</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between text-xs">
            <div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Est. Travel Time</span>
              <h4 className="font-display-md text-xl font-bold text-charcoal mt-0.5">1h 45m</h4>
            </div>
            <span className="material-symbols-outlined text-terracotta text-2xl">schedule</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between text-xs">
            <div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Route Efficiency</span>
              <h4 className="font-display-md text-xl font-bold text-charcoal mt-0.5">94%</h4>
            </div>
            <span className="material-symbols-outlined text-terracotta text-2xl">bolt</span>
          </div>

        </div>

      </main>

    </div>
  );
};

export default AssignedDeliveries;
