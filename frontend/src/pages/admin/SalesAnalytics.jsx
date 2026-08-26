import React from 'react';
import { Link } from 'react-router-dom';

const SalesAnalytics = () => {
  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisan Portal</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Master Workshop</p>
          </div>

          <Link to="/new-listing" className="w-full bg-forest-green text-white py-2.5 px-4 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow">
            <span className="material-symbols-outlined text-sm">add</span>
            New Listing
          </Link>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Overview
            </Link>
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Orders
            </Link>
            <Link to="/seller/inventory" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
            <Link to="/seller/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-terracotta font-bold border-r-2 border-terracotta">
              <span className="material-symbols-outlined text-[18px]">insights</span>
              Analytics
            </Link>
            <Link to="/finances" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
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
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal">
            Performance Insights
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            Track your craftsmanship impact and market trends.
          </p>
        </div>

        {/* 4 Metric Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Total Sales</span>
              <span className="p-1 rounded-full bg-emerald-50 text-forest-green"><span className="material-symbols-outlined text-sm">trending_up</span></span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-charcoal">$24,850</h3>
            <span className="text-[11px] text-emerald-700 font-semibold">&uarr; 12.5% vs last month</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Conversion Rate</span>
              <span className="p-1 rounded-full bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined text-sm">swap_horiz</span></span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-charcoal">3.2%</h3>
            <span className="text-[11px] text-on-surface-variant font-semibold">&darr; 0.4% vs last month</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Store Views</span>
              <span className="p-1 rounded-full bg-emerald-50 text-forest-green"><span className="material-symbols-outlined text-sm">visibility</span></span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-charcoal">12,403</h3>
            <span className="text-[11px] text-emerald-700 font-semibold">&uarr; 8.1% vs last month</span>
          </div>

          <div className="bg-[#163428] text-white p-6 rounded-2xl shadow-md space-y-2 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Top Trend</span>
              <span className="material-symbols-outlined text-sm">search</span>
            </div>
            <div>
              <h3 className="font-display-md text-xl font-bold italic">"Ceramic Vases"</h3>
              <span className="text-[11px] text-white/80">High demand in your category</span>
            </div>
          </div>

        </div>

        {/* 2-Column Section: Top Performing Craft & Customer Reach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Top Performing Craft */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <h3 className="font-display-md text-base font-bold text-charcoal">Top Performing Craft</h3>
              <button className="text-forest-green font-bold text-[11px] hover:underline">View All</button>
            </div>

            <div className="space-y-6">
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal text-sm">Speckled Earth Mug</h5>
                    <p className="text-[11px] text-on-surface-variant">Ceramics &bull; 142 sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-display-md text-base font-bold text-charcoal block">$4,970</span>
                  <div className="w-24 bg-surface-container rounded-full h-1.5 mt-1 ml-auto">
                    <div className="bg-forest-green h-1.5 rounded-full w-[90%]" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal text-sm">Oatmeal Linen Throw</h5>
                    <p className="text-[11px] text-on-surface-variant">Textiles &bull; 89 sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-display-md text-base font-bold text-charcoal block">$7,120</span>
                  <div className="w-24 bg-surface-container rounded-full h-1.5 mt-1 ml-auto">
                    <div className="bg-forest-green h-1.5 rounded-full w-[70%]" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal text-sm">Walnut Serving Spoons</h5>
                    <p className="text-[11px] text-on-surface-variant">Woodwork &bull; 210 sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-display-md text-base font-bold text-charcoal block">$5,250</span>
                  <div className="w-24 bg-surface-container rounded-full h-1.5 mt-1 ml-auto">
                    <div className="bg-forest-green h-1.5 rounded-full w-[80%]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Customer Reach */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
            <h3 className="font-display-md text-base font-bold text-charcoal">Customer Reach</h3>
            <div className="h-56 rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/20 relative flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-outline-variant/60">public</span>
            </div>
            <div className="space-y-1 text-on-surface-variant pt-2">
              <p>1. New York, NY (24%)</p>
              <p>2. Los Angeles, CA (18%)</p>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default SalesAnalytics;
