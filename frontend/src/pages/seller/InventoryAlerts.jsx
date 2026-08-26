import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OUT_OF_STOCK_ITEMS = [
  {
    sku: 'ART-CER-042',
    name: 'Driftwood Ceramic Vase',
    category: 'Home Decor • Hand-thrown Stoneware',
    current: '0 Units',
    threshold: '15 Units',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
  },
  {
    sku: 'ART-WOD-109',
    name: 'Walnut Carved Servers',
    category: 'Kitchenware • Solid Black Walnut',
    current: '0 Units',
    threshold: '8 Units',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
  },
];

const LOW_STOCK_ITEMS = [
  {
    sku: 'ART-JWL-22',
    name: 'Hammered Gold Studs',
    category: 'Jewelry',
    stock: 2,
    limit: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
  },
  {
    sku: 'ART-TEX-005',
    name: 'Woven Linen Set',
    category: 'Textiles',
    stock: 4,
    limit: 10,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
  },
  {
    sku: 'ART-SCT-88',
    name: 'Amber Woods Candle',
    category: 'Aromatherapy',
    stock: 3,
    limit: 20,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
  },
  {
    sku: 'ART-STA-14',
    name: 'Leather Field Notes',
    category: 'Stationery',
    stock: 5,
    limit: 15,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA',
  },
];

const InventoryAlerts = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#faf8f5] font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisan Portal</h1>
            <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">Master Workshop</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Overview
            </Link>
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Orders
            </Link>
            <Link to="/seller/inventory-alerts" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
            <Link to="/seller/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              Analytics
            </Link>
            <Link to="/seller/earnings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => navigate('/seller/new-listing')}
            className="w-full py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Listing
          </button>
          <Link to="/help" className="flex items-center gap-2 text-xs text-on-surface-variant px-1 font-semibold hover:text-charcoal">
            <span className="material-symbols-outlined text-base">help</span>
            Support
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-10 text-xs">
        
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider font-mono">Stock Alerts</span>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal mt-1">
              Inventory Alerts
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
              6 items require immediate attention to maintain gallery operations.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button className="px-5 py-2.5 bg-white border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">tune</span>
              Filter View
            </button>
            <button 
              onClick={() => alert('Opening bulk inventory update')}
              className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">sync</span>
              Update Inventory
            </button>
          </div>
        </div>

        {/* Section 1: Critical Out of Stock */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-terracotta text-xs tracking-wider uppercase">
            <span>CRITICAL: OUT OF STOCK (2)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OUT_OF_STOCK_ITEMS.map(item => (
              <div key={item.sku} className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm flex gap-5 items-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-[#ffdecb] text-[#97472a]">
                      OUT OF STOCK
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant">SKU: {item.sku}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal text-sm">{item.name}</h4>
                    <p className="text-[10px] text-on-surface-variant">{item.category}</p>
                  </div>

                  <div className="flex gap-6 text-[11px] pt-1">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-on-surface-variant block">CURRENT</span>
                      <span className="font-bold text-terracotta font-mono">{item.current}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-on-surface-variant block">THRESHOLD</span>
                      <span className="font-semibold text-charcoal font-mono">{item.threshold}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => alert(`Restock initiated for ${item.name}`)}
                      className="px-4 py-2 bg-forest-green text-white rounded-xl font-label-md text-[10px] uppercase tracking-wider font-bold hover:opacity-90 transition-all"
                    >
                      Initiate Restock
                    </button>
                    <button className="p-2 border border-outline-variant rounded-xl text-on-surface-variant hover:text-charcoal">
                      <span className="material-symbols-outlined text-sm">more_horiz</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Attention Low Stock */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-amber-700 text-xs tracking-wider uppercase">
            <span>ATTENTION: LOW STOCK (4)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOW_STOCK_ITEMS.map(item => (
              <div key={item.sku} className="bg-white p-5 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-40 rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/20">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-charcoal text-xs">{item.name}</h4>
                      <span className="px-1.5 py-0.5 rounded text-[8px] uppercase font-bold bg-amber-50 text-amber-800">
                        LOW
                      </span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant">{item.category} &bull; {item.sku}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-amber-600 h-1.5 rounded-full" 
                        style={{ width: `${(item.stock / item.limit) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-on-surface-variant font-mono font-semibold">
                      <span>Stock: {item.stock}</span>
                      <span>Limit: {item.limit}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Reordered ${item.name}`)}
                  className="w-full py-2.5 border border-charcoal text-charcoal rounded-xl font-bold text-xs hover:bg-surface-container transition-colors"
                >
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Insights Banner */}
        <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-forest-green flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <div>
              <h4 className="font-display-md text-base font-bold text-charcoal">Predictive Insights</h4>
              <p className="text-on-surface-variant text-xs">
                Based on recent gallery traffic, 3 more items may reach threshold by weekend.
              </p>
            </div>
          </div>

          <button 
            onClick={() => alert('Opening sales and stock forecast...')}
            className="px-6 py-3 bg-charcoal text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors shadow flex items-center gap-2 shrink-0"
          >
            <span>View Full Forecast</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </main>

    </div>
  );
};

export default InventoryAlerts;
