import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BannerManagement = () => {
  const [activeTab, setActiveTab] = useState('All');

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
            <Link to="/admin/banners" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">view_carousel</span>
              Banners
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

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & New Banner Button */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Banner Management
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl">
              Curate and schedule promotional placements across the marketplace interface. Ensure all imagery aligns with the minimal, tactile aesthetic.
            </p>
          </div>

          <button 
            onClick={() => alert('New banner creation modal opened')}
            className="px-6 py-2.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Banner
          </button>
        </div>

        {/* 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Placements Metric Box */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Active Placements
              </span>
              <h3 className="font-display-lg text-4xl font-bold text-charcoal mt-1">3</h3>
              <p className="text-[11px] text-on-surface-variant mt-1">Running currently</p>
            </div>

            <div className="pt-6 border-t border-outline-variant/20">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Total Impressions (30D)
              </span>
              <h4 className="font-display-lg text-2xl font-bold text-charcoal mt-1">124.5k</h4>
            </div>
          </div>

          {/* Current & Scheduled Table */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <h3 className="font-display-md text-base font-bold text-charcoal">Current &amp; Scheduled</h3>
              <div className="flex gap-2">
                {['All', 'Active', 'Drafts'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      activeTab === tab ? 'bg-charcoal text-white font-bold' : 'text-on-surface-variant hover:text-charcoal'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase font-bold text-on-surface-variant border-b border-outline-variant/20">
                  <tr>
                    <th className="p-3">Preview</th>
                    <th className="p-3">Details</th>
                    <th className="p-3">Placement</th>
                    <th className="p-3">CTR</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr>
                    <td className="p-3">
                      <div className="w-16 h-10 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/30">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-3">
                      <h5 className="font-bold text-charcoal">Spring Ceramics Collection</h5>
                      <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-emerald-50 text-forest-green inline-block mt-0.5">&bull; Active</span>
                    </td>
                    <td className="p-3 font-semibold text-charcoal">Home Hero</td>
                    <td className="p-3 font-bold text-forest-green">4.2%</td>
                    <td className="p-3 text-right">
                      <button className="text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">edit</span></button>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">
                      <div className="w-16 h-10 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/30">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw" alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-3">
                      <h5 className="font-bold text-charcoal">Leather Goods Feature</h5>
                      <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-surface-container text-on-surface-variant inline-block mt-0.5">Scheduled</span>
                    </td>
                    <td className="p-3 font-semibold text-charcoal">Category Top</td>
                    <td className="p-3 text-on-surface-variant">--</td>
                    <td className="p-3 text-right">
                      <button className="text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">edit</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default BannerManagement;
