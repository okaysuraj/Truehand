import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const CATALOG_ITEMS = [
  {
    id: 1,
    name: 'Tidal Flow Ceramic Vase',
    sku: 'CR-2045-A',
    category: 'Ceramics',
    stock: 24,
    price: 185,
    status: 'In Stock',
    statusBg: 'bg-white/90 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-GLEAp3HpxNBwg_e5zyUQpsEQvGzICuHYaQo91y_ZCsHMH5YcIlWSAzmk83WzhFPVD1MAgp4q1SB6qaJkMN8XkFwNJzxYm7racUM8s364PxWRpjR-ZGRplHoa9WVPpZPAAvhIFiXktNAz7_SCX0m6f72-qxdxN_WAOme4n-X5IloQwMHHYwYLb9LQT0_hl1G7RAroSKskzWePT9Fcb80C5JRALLHh8guPr6W44Dz4WxBHJzAUDBmwDQ',
  },
  {
    id: 2,
    name: 'Desert Horizon Tapestry',
    sku: 'TX-8821-B',
    category: 'Textiles',
    stock: 3,
    price: 420,
    status: 'Low Stock',
    statusBg: 'bg-[#ffdecb] text-[#97472a]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
  },
  {
    id: 3,
    name: 'Carved Walnut Platter',
    sku: 'WD-1109-C',
    category: 'Woodwork',
    stock: 0,
    price: 295,
    status: 'Out of Stock',
    waitlistOnly: true,
    statusBg: 'bg-red-100 text-red-800',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
  },
  {
    id: 4,
    name: 'Satin Brass Arc Studs',
    sku: 'JW-7732-S',
    category: 'Jewelry',
    stock: 12,
    price: 95,
    status: 'In Stock',
    statusBg: 'bg-white/90 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ',
  },
  {
    id: 5,
    name: 'Foundry Stone Coasters',
    sku: 'WD-3321-K',
    category: 'Woodwork',
    stock: '50+',
    price: 65,
    status: 'In Stock',
    statusBg: 'bg-white/90 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
  },
  {
    id: 6,
    name: 'Hand-spun Linen Throw',
    sku: 'TX-4450-F',
    category: 'Textiles',
    stock: 2,
    price: 210,
    status: 'Low Stock',
    statusBg: 'bg-[#ffdecb] text-[#97472a]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhhYgF4qfL2A5-osVSphMHrUIDwrbMWiKui9yxIoh5_s0HuLuWSG23I2w1CcVv-ypEUNA9wadn5Lx0LmcWk3gk-G9igglMpfPCHP0cGvU1lr_Zma7XO9OR3eXTDQPVEByK4IQ53TB0t21LpBf1YYQiJKNZJdrpheOiub8wvU98AUNdxks_Jo0uj5A6FArs_Z3qrglGvjWsc10g3X1EUAjDjLBTFQzpzA53O8lUR6evcUV_EeYQEoYY3w',
  },
  {
    id: 7,
    name: 'Midnight Espresso Cups (4pc)',
    sku: 'CR-1102-G',
    category: 'Ceramics',
    stock: 18,
    price: 75,
    status: 'In Stock',
    statusBg: 'bg-white/90 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
  },
];

const SellerInventory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(CATALOG_ITEMS);

  useEffect(() => {
    if (user?.id) {
      api.get(`/products/seller/${user.id}`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            // merge with custom products
          }
        })
        .catch(e => console.warn(e));
    }
  }, [user]);

  const filteredItems = items.filter(item => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
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
          <Link to="/help" className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface-variant hover:text-forest-green transition-colors font-medium">
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            Support
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 bg-surface-container-low rounded-xl">
            <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold text-forest-green">
              AP
            </div>
            <div>
              <p className="font-label-md text-xs font-bold text-charcoal">Artisan Profile</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Creator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        
        {/* Top Bar with Search & Add Product */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search inventory catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-outline-variant/40 rounded-full py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-forest-green shadow-sm"
            />
          </div>

          <Link 
            to="/new-listing"
            className="bg-forest-green text-white px-6 py-2.5 rounded-lg font-label-md text-xs uppercase tracking-wider hover:opacity-90 transition-all font-bold flex items-center gap-2 shadow self-start sm:self-auto shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Product
          </Link>
        </div>

        {/* Page Header & Stats */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-2">Inventory Catalog</h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-lg leading-relaxed">
              Manage and curate your handcrafted collection. Monitor stock levels across material categories and artisanal series.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col items-center min-w-[110px]">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-1">Total Items</span>
              <span className="font-display-lg text-2xl font-bold text-charcoal">142</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col items-center min-w-[110px]">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-1">Low Stock</span>
              <span className="font-display-lg text-2xl font-bold text-terracotta">12</span>
            </div>
          </div>
        </section>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 border-b border-outline-variant/20 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['All', 'Ceramics', 'Textiles', 'Woodwork', 'Jewelry'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-label-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-forest-green text-white shadow-sm'
                    : 'bg-white border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-on-surface-variant font-semibold">
            <span>Sort by:</span>
            <select className="bg-transparent border-0 font-bold text-charcoal focus:ring-0 cursor-pointer">
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Stock Level</option>
            </select>
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
              
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm ${item.statusBg}`}>
                    {item.status}
                  </span>
                </div>
                {item.waitlistOnly && (
                  <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px] flex items-center justify-center p-4">
                    <span className="bg-white text-charcoal px-4 py-2 rounded-lg font-label-md text-xs uppercase tracking-wider font-bold shadow-lg">
                      Waitlist Only
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-2">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-headline-md text-sm font-bold text-charcoal line-clamp-1 group-hover:text-forest-green transition-colors">
                      {item.name}
                    </h4>
                    <span className="font-headline-md text-sm font-bold text-charcoal">${item.price}</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant font-mono uppercase">SKU: {item.sku}</p>
                </div>

                <div className="pt-2 border-t border-outline-variant/20 flex justify-between items-center text-[11px] text-on-surface-variant">
                  <span>Category: <strong className="text-charcoal">{item.category}</strong></span>
                  <span>Stock: <strong className={item.stock === 0 ? 'text-red-700' : typeof item.stock === 'number' && item.stock <= 3 ? 'text-terracotta' : 'text-forest-green'}>{item.stock}</strong></span>
                </div>
              </div>

            </div>
          ))}

          {/* Dashed Add New Listing Card */}
          <Link 
            to="/new-listing"
            className="border-2 border-dashed border-outline-variant/60 rounded-2xl aspect-[4/5] hover:bg-white hover:border-forest-green transition-all cursor-pointer text-center flex flex-col items-center justify-center p-6 group"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-forest-green mb-3 group-hover:bg-forest-green group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-2xl">add</span>
            </div>
            <h3 className="font-display-md text-base font-bold text-charcoal mb-1 group-hover:text-forest-green">New Listing</h3>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Ready to add a new artisanal piece to your workshop catalog?
            </p>
          </Link>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-on-surface-variant pt-4 border-t border-outline-variant/20">
          <span>Showing <strong>12</strong> of <strong>142</strong> pieces</span>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-white">
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-forest-green text-white flex items-center justify-center font-bold">1</button>
            <button className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-white">2</button>
            <button className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-white">3</button>
            <span>...</span>
            <button className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-white">12</button>
            <button className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-white">
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>

      </main>

    </div>
  );
};

export default SellerInventory;
