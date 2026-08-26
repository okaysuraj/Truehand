import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const COLLECTORS = [
  {
    id: 1,
    name: 'Arthur Pendelton',
    location: 'London, UK',
    email: 'arthur.p@example.com',
    phone: '+44 7700 900077',
    memberSince: 'Oct 12, 2021',
    acquisitions: '14 pieces',
    lifetimeValue: '$42,500',
    status: 'Patron',
    statusClass: 'bg-emerald-50 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA',
  },
  {
    id: 2,
    name: 'Eleanor Vance',
    location: 'New York, USA',
    email: 'e.vance@studio.com',
    phone: '+1 212-555-0199',
    memberSince: 'Mar 04, 2023',
    acquisitions: '3 pieces',
    lifetimeValue: '$8,200',
    status: 'Enthusiast',
    statusClass: 'bg-surface-container text-charcoal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA',
  },
  {
    id: 3,
    name: 'Marcus Sterling',
    location: 'Berlin, DE',
    email: 'marcus@sterling.de',
    phone: '+49 30 1234567',
    memberSince: 'Jan 15, 2024',
    acquisitions: '1 piece',
    lifetimeValue: '$1,500',
    status: 'Newcomer',
    statusClass: 'bg-surface-container text-on-surface-variant',
    initials: 'MS',
  },
];

const AdminCustomers = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterTier, setFilterTier] = useState('All');
  const [filterRegion, setFilterRegion] = useState('Global');

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
            <Link to="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">group</span>
              Users
            </Link>
            <Link to="/admin/product-approvals" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/finances" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
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

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Top Search bar */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search collectors, orders, or products..."
              className="w-full bg-white border border-outline-variant/40 rounded-full py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-forest-green shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-on-surface-variant hover:text-charcoal rounded-full hover:bg-white relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-charcoal rounded-full hover:bg-white">
              <span className="material-symbols-outlined text-xl">help</span>
            </button>
          </div>
        </div>

        {/* Header & Invite Collector CTA */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Collectors Registry
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Manage your community of art patrons and track their acquisition history.
            </p>
          </div>

          <button 
            onClick={() => alert('Invite collector modal opened')}
            className="px-6 py-3 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Invite Collector
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-semibold">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-charcoal">
              <span className="material-symbols-outlined text-base">tune</span>
              <span>Filters</span>
            </div>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none"
            >
              <option>Status: All</option>
              <option>Patron</option>
              <option>Enthusiast</option>
              <option>Newcomer</option>
            </select>

            <select 
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none"
            >
              <option>Tier: All</option>
              <option>Tier 1 ($20k+)</option>
              <option>Tier 2 ($5k-$20k)</option>
              <option>Tier 3 (Under $5k)</option>
            </select>

            <select 
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none"
            >
              <option>Region: Global</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia Pacific</option>
            </select>
          </div>

          <button 
            onClick={() => { setFilterStatus('All'); setFilterTier('All'); setFilterRegion('Global'); }}
            className="text-on-surface-variant hover:text-charcoal text-[11px]"
          >
            Clear Filters
          </button>
        </div>

        {/* Collectors Table */}
        <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">Collector</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Member Since</th>
                  <th className="p-4">Acquisitions</th>
                  <th className="p-4">Lifetime Value</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {COLLECTORS.map(col => (
                  <tr key={col.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6 flex items-center gap-3">
                      {col.image ? (
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                          <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-xs text-charcoal shrink-0">
                          {col.initials}
                        </div>
                      )}
                      <div>
                        <h4 className="font-headline-md text-xs font-bold text-charcoal">{col.name}</h4>
                        <p className="text-[10px] text-on-surface-variant">{col.location}</p>
                      </div>
                    </td>

                    <td className="p-4 font-mono text-[11px]">
                      <p className="text-charcoal">{col.email}</p>
                      <p className="text-on-surface-variant text-[10px]">{col.phone}</p>
                    </td>

                    <td className="p-4 text-on-surface-variant">{col.memberSince}</td>
                    <td className="p-4 font-semibold text-charcoal">{col.acquisitions}</td>
                    <td className="p-4 font-display-md text-sm font-bold text-charcoal">{col.lifetimeValue}</td>

                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${col.statusClass}`}>
                        {col.status}
                      </span>
                    </td>

                    <td className="p-4 text-right pr-6">
                      <button 
                        onClick={() => alert(`Managing collector ${col.name}`)}
                        className="text-on-surface-variant hover:text-forest-green"
                      >
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 px-6 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
            <span>Showing <strong>1 to 3</strong> of <strong>128</strong> collectors</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-charcoal text-white font-bold text-xs flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-xs">
                2
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-xs">
                3
              </button>
              <span className="px-1">&bull;&bull;&bull;</span>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-xs">
                12
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};

export default AdminCustomers;
