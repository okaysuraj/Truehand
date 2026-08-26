import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const STOREFRONT_ITEMS = [
  {
    id: 1,
    name: 'Wabi-Sabi Tall Vessel',
    price: 420.00,
    tag: 'FEATURED',
    category: 'Vessels',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
  },
  {
    id: 2,
    name: 'Hand-Pinched Tea Set',
    price: 185.00,
    tag: 'NEW',
    category: 'Tableware',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w',
  },
  {
    id: 3,
    name: 'Glacial Texture Platter',
    price: 350.00,
    category: 'Tableware',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXA3GWA23w_MtAVNZ6230AT9lqrn3LPY-iyOqp3NaVS_V4YrxE_AdmK_2g1FPAM4jkeQZGiAAJiVjSlds-VhJi4GOAyJ-QZ9HresMcSzWUiyvISEpJN87fqj_92rBN9GFvGdBC5rvM6TnCER5WekVhFNUEVNoXVn5BPclzHj3Qn78Pst4X8_RVMiSd-S2MIkdC6d1I_4SjGQOrh26YZzbQtdydbgUhD8a9JqyyrraLEZ2lJE4yu9WGPA',
  },
  {
    id: 4,
    name: 'Basalt Trio Set',
    price: 580.00,
    category: 'Sculptural',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZqd4TL6YM-02s_QxvUuoHr9W8C8c6zr6POoUxUDOS0PxjQcYqP3L1S8V1b-eE8dFGBE6-eGZ4EruYb3UHYl1jp36TbyAAeDPJSx472DW2rZMvOQQJ8bEMQUBJulQvwF5PAxoG9o578JKM48AdILKjy-a0BYsJ5S0SgVO9mw-SqRqLabQtaHE-V0e5Im0EIJdDRvnMEBmJTH3S2iPK9fdX-6_WtAXXkL7s4E9yeMmFRcI62hlgt-tVRg',
  },
  {
    id: 5,
    name: 'Celadon Meditation Bowl',
    price: 210.00,
    tag: 'FEATURED',
    category: 'Vessels',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
  },
  {
    id: 6,
    name: 'Raw Earth Lamp Base',
    price: 490.00,
    category: 'Sculptural',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9w2ZPMB6iMY-ZebOR5S0IcbjXMBVxAlJmhScmEnMUYx3j690CrDOclgXUJHVtjxz5Z_VZkAN2EvTXuEVaSfjTAzH7uC-SP1XPu35bSFHNC14Ebdz0UE3H-sNRHgHzOBVCXmp1v76yHCFPwoqbzqWVwP7HgDoEYo4Olj_VM_FfDriEbANUo9WlA_X8biE71C4qS4mTO1uDYjDj2Tw76S3A9Bl8fINgylyLdwgOPa7HaByGBSAaYMdiog',
  },
];

const StorefrontPreview = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [items] = useState(STOREFRONT_ITEMS);

  const filtered = items.filter(item => {
    if (activeCategory === 'All Works') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-surface-linen font-body-md text-on-surface">
      
      {/* Top Banner: Storefront Preview Mode */}
      <div className="bg-[#163428] text-white py-3 px-6 fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2 text-xs">
          <span className="material-symbols-outlined text-emerald-400 text-lg">visibility</span>
          <span className="font-semibold">Storefront Preview Mode</span>
          <span className="text-white/70 hidden md:inline">&bull; This is how your studio gallery appears to collectors.</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Collector live view mode active.')}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">group</span>
            View as Collector
          </button>
          <button 
            onClick={() => navigate('/seller/dashboard')}
            className="px-4 py-1.5 bg-white text-forest-green rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-surface-container transition-colors shadow"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return to Dashboard
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex pt-16">
        
        {/* Side Nav */}
        <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0 h-[calc(100vh-64px)] sticky top-16">
          <div className="space-y-8">
            <div className="px-1">
              <h1 className="font-display-md text-base font-bold text-forest-green">Studio Manager</h1>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Handcrafted Excellence</p>
            </div>

            <nav className="space-y-1 text-xs font-semibold">
              <Link to="/seller/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                Dashboard
              </Link>
              <Link to="/seller/inventory" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                Inventory
              </Link>
              <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                Orders
              </Link>
              <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">settings</span>
                Settings
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-outline-variant/20 space-y-3">
            <div className="flex items-center gap-3 px-3 py-2 bg-surface-container-low rounded-xl">
              <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold text-forest-green">
                AS
              </div>
              <div>
                <p className="font-label-md text-xs font-bold text-charcoal">Artisan Studio</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Admin Profile</p>
              </div>
            </div>
            <Link to="/new-listing" className="w-full py-2.5 bg-forest-green text-white rounded-lg text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow">
              Create Listing
            </Link>
          </div>
        </aside>

        {/* Gallery Content Area */}
        <main className="flex-1 p-6 md:p-12 max-w-6xl">
          
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-terracotta font-bold">
              Makers Collection
            </span>
            <h2 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Studio Ceramics
            </h2>
            <div className="w-12 h-[2px] bg-terracotta mx-auto my-3" />
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Each piece is hand-thrown and double-fired in our wood-burning kiln. We celebrate the intentional imperfection and the quiet dialogue between clay and flame.
            </p>
          </div>

          {/* Filter Tabs & Sort */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10 border-b border-outline-variant/20 pb-4">
            <div className="flex gap-6 text-xs font-semibold">
              {['All Works', 'Vessels', 'Tableware', 'Sculptural'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`transition-colors pb-1 ${
                    activeCategory === tab 
                      ? 'text-charcoal border-b-2 border-charcoal font-bold' 
                      : 'text-on-surface-variant hover:text-charcoal'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-semibold">
              <span>Sort by:</span>
              <select className="bg-transparent border-0 font-bold text-charcoal focus:ring-0 cursor-pointer">
                <option>Most Recent</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* 3-Column Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filtered.map(item => (
              <div key={item.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container mb-4 shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {item.tag && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider bg-charcoal text-white shadow">
                        {item.tag}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center space-y-1">
                  <h4 className="font-display-md text-base font-bold text-charcoal group-hover:text-forest-green transition-colors">
                    {item.name}
                  </h4>
                  <p className="font-headline-md text-xs font-bold text-forest-green">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Card: Manage Listings */}
          <div className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm text-center max-w-lg mx-auto space-y-4">
            <p className="text-xs text-on-surface-variant font-semibold">
              Want to adjust your collection or update pricing?
            </p>
            <button 
              onClick={() => navigate('/seller/inventory')}
              className="px-8 py-3 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all flex items-center gap-2 mx-auto shadow"
            >
              <span className="material-symbols-outlined text-base">tune</span>
              Manage Listings
            </button>
          </div>

        </main>

      </div>

    </div>
  );
};

export default StorefrontPreview;
