import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ARTISANS = [
  {
    id: 1,
    name: 'Clara Weaver',
    studio: 'Earth & Ash Studio',
    category: 'Ceramics',
    status: 'Pending Review',
    statusClass: 'bg-red-50 text-red-600',
    listings: 14,
    sales: '--',
    rating: 'New',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA',
    pending: true,
  },
  {
    id: 2,
    name: 'Elias Thorne',
    studio: 'Thorne Woodworks',
    category: 'Woodworking',
    status: 'Verified',
    statusClass: 'bg-emerald-50 text-forest-green',
    listings: 42,
    sales: '$12.4k',
    rating: '4.9 (128)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA',
    verified: true,
  },
  {
    id: 3,
    name: 'Mariko Sato',
    studio: 'Sato Leather',
    category: 'Leathergoods',
    status: 'Verified',
    statusClass: 'bg-emerald-50 text-forest-green',
    listings: 18,
    sales: '$8.1k',
    rating: '5.0 (84)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw',
    verified: true,
  },
  {
    id: 4,
    name: 'Leo Mercer',
    studio: 'Mercer Metals',
    category: 'Jewelry',
    status: 'Unverified',
    statusClass: 'bg-surface-container text-on-surface-variant',
    listings: 0,
    sales: '--',
    rating: 'Needs Onboarding',
    initials: 'LM',
  },
];

const ArtisanManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pending Verification (12)');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

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
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-2 text-xs text-on-surface-variant font-label-sm">
          <Link to="/admin/customers" className="hover:text-forest-green">Directory</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-semibold text-charcoal">Sellers</span>
        </nav>

        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Artisan Directory
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl">
              Manage and verify independent creators on TrueHand. Review onboarding applications to ensure alignment with craftsmanship standards.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Exporting artisan directory CSV...')}
              className="px-5 py-2.5 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Export CSV
            </button>
            <button 
              onClick={() => alert('Invite artisan modal opened')}
              className="px-6 py-2.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              Invite Artisan
            </button>
          </div>
        </div>

        {/* Filter Pills Bar & Categories */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {['All Artisans (245)', 'Pending Verification (12)', 'Verified (230)', 'Unverified (3)'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl transition-colors ${
                  activeTab === tab 
                    ? tab.includes('Pending')
                      ? 'bg-[#fbe8e2] text-terracotta border border-terracotta/30 font-bold'
                      : 'bg-white text-charcoal border border-charcoal font-bold shadow-sm'
                    : 'bg-white text-on-surface-variant border border-outline-variant/30 hover:text-charcoal'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-outline-variant/40 rounded-xl px-4 py-2 text-xs font-semibold text-charcoal focus:outline-none shadow-sm cursor-pointer"
          >
            <option>All Categories</option>
            <option>Ceramics</option>
            <option>Woodworking</option>
            <option>Leathergoods</option>
            <option>Jewelry</option>
          </select>
        </div>

        {/* Artisan Table */}
        <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">Artisan / Studio</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Listings</th>
                  <th className="p-4">Sales / Rating</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {ARTISANS.map(art => (
                  <tr key={art.id} className={`hover:bg-surface-container-low/30 transition-colors ${art.pending ? 'bg-[#fffaf8]' : ''}`}>
                    <td className="p-4 pl-6 flex items-center gap-3">
                      {art.image ? (
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30 relative">
                          <img src={art.image} alt={art.name} className="w-full h-full object-cover" />
                          {art.pending && <span className="w-2.5 h-2.5 rounded-full bg-terracotta border-2 border-white absolute top-0 right-0" />}
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center font-bold text-xs text-charcoal shrink-0">
                          {art.initials}
                        </div>
                      )}
                      <div>
                        <h4 className="font-headline-md text-xs font-bold text-charcoal">{art.name}</h4>
                        <p className="text-[10px] text-on-surface-variant">{art.studio}</p>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 bg-surface-container rounded-full text-[11px] font-semibold text-charcoal">
                        {art.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${art.statusClass}`}>
                        {art.verified && <span className="material-symbols-outlined text-[14px]">check_circle</span>}
                        {art.pending && <span className="material-symbols-outlined text-[14px]">pending</span>}
                        <span>{art.status}</span>
                      </span>
                    </td>

                    <td className="p-4 text-center font-bold text-charcoal">{art.listings}</td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-charcoal">{art.sales}</p>
                        <p className="text-[10px] text-on-surface-variant">{art.rating}</p>
                      </div>
                    </td>

                    <td className="p-4 text-right pr-6">
                      {art.pending ? (
                        <button 
                          onClick={() => alert(`Reviewing application for ${art.name}`)}
                          className="p-2 text-terracotta hover:bg-terracotta/10 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-lg">rate_review</span>
                        </button>
                      ) : (
                        <button 
                          onClick={() => alert(`Managing artisan ${art.name}`)}
                          className="text-on-surface-variant hover:text-charcoal"
                        >
                          <span className="material-symbols-outlined text-base">more_vert</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 px-6 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
            <span>Showing <strong>1-4</strong> of <strong>245</strong> artisans</span>
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

export default ArtisanManagement;
