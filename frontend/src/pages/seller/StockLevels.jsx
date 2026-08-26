import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const INITIAL_STOCK = [
  {
    id: 1,
    name: 'Celadon Oolong Bowl',
    sku: 'CR-TEA-092',
    category: 'Ceramics',
    stock: 3,
    lowStock: true,
    adjustment: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w',
  },
  {
    id: 2,
    name: 'Indigo Woven Throw',
    sku: 'TX-THW-104',
    category: 'Textiles',
    stock: 24,
    lowStock: false,
    adjustment: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
  },
  {
    id: 3,
    name: 'Walnut Sculpted Spoon Set',
    sku: 'WD-KTN-055',
    category: 'Woodwork',
    stock: 1,
    lowStock: true,
    adjustment: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
  },
  {
    id: 4,
    name: 'Amber Swirl Carafe',
    sku: 'GL-DNR-211',
    category: 'Glassware',
    stock: 12,
    lowStock: false,
    adjustment: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ',
  },
];

const StockLevels = () => {
  const { user } = useAuth();
  const [items, setItems] = useState(INITIAL_STOCK);
  const [search, setSearch] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleAdjust = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const next = Math.max(1, (item.adjustment || 1) + delta);
        return { ...item, adjustment: next };
      }
      return item;
    }));
  };

  const handleUpdate = (id) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = item.stock + (item.adjustment || 1);
        return { ...item, stock: newStock, lowStock: newStock <= 3 };
      }
      return item;
    }));
    setToastMessage('Stock level updated successfully.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredItems = items.filter(item => {
    if (lowStockOnly && !item.lowStock) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisan Portal</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Master Workshop</p>
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
            <Link to="/seller/inventory" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-terracotta font-bold border-r-2 border-terracotta">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
            <Link to="/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
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

        <div className="space-y-3 pt-6 border-t border-outline-variant/20">
          <Link to="/new-listing" className="w-full bg-forest-green text-white py-3 px-4 rounded-lg font-label-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow">
            <span className="material-symbols-outlined text-sm">add</span>
            New Listing
          </Link>
          <Link to="/help" className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface-variant hover:text-forest-green transition-colors font-medium">
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            Support
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Top Search bar */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search inventory, SKUs, materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-outline-variant/40 rounded-full py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-forest-green shadow-sm"
            />
          </div>
        </div>

        {/* Header & Low Stock Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-2">Stock Inventory</h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl leading-relaxed">
              Monitor and manage your handcrafted inventory levels. Real-time adjustments reflect immediately across the marketplace.
            </p>
          </div>

          <div className="flex items-center gap-6 self-start md:self-auto">
            <button className="px-4 py-2 bg-white rounded-lg border border-outline-variant/40 text-xs font-semibold flex items-center gap-2 text-charcoal shadow-sm">
              <span className="material-symbols-outlined text-base text-on-surface-variant">filter_list</span>
              All Categories
            </button>

            <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-charcoal">
              <input 
                type="checkbox" 
                checked={lowStockOnly}
                onChange={(e) => setLowStockOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:bg-forest-green peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all relative"></div>
              <span>Low Stock Only</span>
            </label>
          </div>
        </div>

        {/* Table Column Headers */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-[11px] uppercase tracking-wider font-bold text-on-surface-variant border-b border-outline-variant/20 mb-4">
          <div className="col-span-12 sm:col-span-5">Product Details</div>
          <div className="hidden sm:block sm:col-span-2 text-center">Category</div>
          <div className="hidden sm:block sm:col-span-2 text-center">Stock Level</div>
          <div className="hidden sm:block sm:col-span-3 text-right">Adjustment</div>
        </div>

        {/* Product Stock Cards List */}
        <div className="space-y-4">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
            >
              {/* Product Info */}
              <div className="col-span-12 sm:col-span-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-headline-md text-sm font-bold text-charcoal">{item.name}</h4>
                  <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">SKU: {item.sku}</p>
                  {item.lowStock && (
                    <span className="mt-1 inline-block bg-[#ffdecb] text-[#97472a] px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider">
                      &bull; Low Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="col-span-6 sm:col-span-2 sm:text-center">
                <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-semibold text-charcoal">
                  {item.category}
                </span>
              </div>

              {/* Stock Level */}
              <div className="col-span-6 sm:col-span-2 sm:text-center">
                <span className={`font-display-lg text-xl font-bold ${item.lowStock ? 'text-terracotta' : 'text-charcoal'}`}>
                  {item.stock}
                </span>
                <span className="text-[10px] text-on-surface-variant block">Units left</span>
              </div>

              {/* Adjustment Stepper & Update */}
              <div className="col-span-12 sm:col-span-3 flex items-center justify-end gap-3">
                <div className="flex items-center border border-outline-variant/60 rounded-lg bg-surface-container-low px-2 py-1">
                  <button 
                    onClick={() => handleAdjust(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center text-charcoal hover:bg-white rounded font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold font-mono">{item.adjustment || 1}</span>
                  <button 
                    onClick={() => handleAdjust(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center text-charcoal hover:bg-white rounded font-bold"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => handleUpdate(item.id)}
                  className="px-5 py-2 bg-charcoal text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-forest-green transition-colors shadow"
                >
                  Update
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-xs text-on-surface-variant">
          Showing <strong>{filteredItems.length}</strong> of <strong>128</strong> products
        </div>

      </main>

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#1b1c1c] text-white px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold z-50 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default StockLevels;
