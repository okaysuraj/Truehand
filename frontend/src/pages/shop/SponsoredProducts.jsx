import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Sienna Earth Vessel',
    category: 'Ceramics • Large',
    sku: 'AS-POT-0921',
    tag: 'Featured',
    tagType: 'featured',
    impressions: '12,402',
    adRank: '#2.1',
    boosted: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3AoUmX8La34ZYtmSOG69aUzef5bD4UZIQ2emGtkJML5dDe17AT6_hMogw1ZKgNsvhyqBAPEkobaTl06wRaPzZY4tPsAdsyKdZH0Br0QUzVnCKnev5EhFTH3NYx7VScMOuiIIqxi9L7CVM_4CcxX03j4QA7Lp9IwSSrRg3-raPtAr0RDN2a31bGQB1BkuE9yZRdkkNFuUB0EFUB41BEOVPT_vVWfSxQu0PUmK8LZKBSssT9UUBH_pQbQ',
  },
  {
    id: 2,
    name: 'Indigo Weave Throw',
    category: 'Textiles • Artisan',
    sku: 'AS-TEX-4402',
    tag: 'New Arrival',
    tagType: 'new',
    impressions: '8,110',
    adRank: '#5.8',
    boosted: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXPyKek0j6VwS0kQOm9wT-e5dg_kDOPKySGR3YWwDKYi1MhLFbNgKqcUigAQBUpULTMm4RIKzKsgT-Seazg2agdOIJAxW6f2qKQD_QvK1IVLAO2Q2i4HHfAir83Esdl490uQGHqX65BRfikzie-GNORGyHfsFHhBVM8Vi18FqBSXuFCmR_PJ3Jk3IWaxBYOk7LLtxTEoTFkpK9Hui7FxSq9qm3bBs8KNIDAOQkm63-75SbT9Wv_ZUYyA',
  },
  {
    id: 3,
    name: 'Forged Brass Spoon Set',
    category: 'Kitchen • Metal',
    sku: 'AS-MET-1120',
    tag: 'Featured',
    tagType: 'featured',
    impressions: '5,420',
    adRank: '#12.4',
    boosted: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4UGaOWz3y8H9-ZfCI0EBKy5-tFUwkhH8h-z_sQhSxaQGPu-k6D9z0wCOhfleBZQ6czyVsSkA2gwx3P4XVdpsYK9rHGwa59BAbGC6f0dY-dkZHAL7lx5Frk_6O5Vr4Ovi0wDBplfUtiepmI0tayVPYy11UyiqC_ZIn5-y1ZoB68KATtrBOd5gk-PGxQidU4N3KFXgL2Fwo7cSoxH-wL26F3k23Ktsfr3MxK2u4VqhbLjeIGt0ehQmshw',
  },
  {
    id: 4,
    name: 'Oak Sculpted Board',
    category: 'Kitchen • Wood',
    sku: 'AS-WOD-8831',
    tag: 'Best Seller',
    tagType: 'bestseller',
    impressions: '18,944',
    adRank: '#1.4',
    boosted: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVJ1nlUzNWvo9GsOywccIEejQ3Yg6mJjxV0XHu1Eg1wnMuEQ4xuLW0GIBZH9nlcbYePKgdO2V38o4zREis8AmJnbwQ7HhJ_cwIIg51uTwrU-34GSVTJm2MVnYR3AnbG1mD1zcGHgeZDP-7K5J8yDalciYVmyaU06QyuL5o6UXe5HMW98NLWGBp3avqGYakeSojs6ZWf2I7BJzqapahbSUzA0iKa8nAU_Q5eki5Oxz--VLGEduHLkI8aA',
  },
];

const SponsoredProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const toggleBoost = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, boosted: !p.boosted } : p));
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-surface-linen text-on-surface font-body-md min-h-screen flex">
      
      {/* SideNavBar Integration */}
      <aside className="w-64 min-h-screen bg-surface-container-low border-r border-outline-variant/30 flex flex-col p-6 gap-6 shrink-0 hidden md:flex">
        <div className="flex flex-col gap-1 px-2">
          <h1 className="font-headline-md text-headline-md text-forest-green tracking-tight font-bold">ArtisanStudio</h1>
          <div className="flex flex-col">
            <span className="text-label-md font-label-md text-forest-green font-semibold">Studio Manager</span>
            <span className="text-xs text-on-surface-variant">Handcrafted Excellence</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-grow">
          <Link to="/seller/dashboard" className="flex items-center gap-3 text-on-surface-variant hover:bg-white/50 rounded-xl p-3 transition-all">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="font-body-md">Dashboard</span>
          </Link>
          <Link to="/seller/inventory" className="flex items-center gap-3 bg-white text-forest-green rounded-xl p-3 shadow-sm font-semibold">
            <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            <span className="font-body-md">Inventory</span>
          </Link>
          <Link to="/seller/orders" className="flex items-center gap-3 text-on-surface-variant hover:bg-white/50 rounded-xl p-3 transition-all">
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            <span className="font-body-md">Orders</span>
          </Link>
          <Link to="/seller/storefront" className="flex items-center gap-3 text-on-surface-variant hover:bg-white/50 rounded-xl p-3 transition-all">
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            <span className="font-body-md">Storefront</span>
          </Link>
          <Link to="/seller/earnings" className="flex items-center gap-3 text-on-surface-variant hover:bg-white/50 rounded-xl p-3 transition-all">
            <span className="material-symbols-outlined text-[20px]">payments</span>
            <span className="font-body-md">Earnings</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 text-on-surface-variant hover:bg-white/50 rounded-xl p-3 transition-all">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-body-md">Settings</span>
          </Link>
        </nav>

        <div className="mt-auto pt-4">
          <button 
            onClick={() => navigate('/seller/new-listing')}
            className="w-full bg-forest-green text-white py-3 rounded-lg font-label-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm font-semibold"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create Listing
          </button>
          
          <div className="mt-6 flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/50">
              <img 
                className="w-full h-full object-cover" 
                alt="Elena Rossi" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACJck_AXFeph4B0CKFtmMsIGXDNkdjVzWLUC_gQTbxHoNIC9weo_n5mx7WbEP4G5vZpzrp6VDg8-WDNOzoN35sbOtjPl9Cic2x-kxwm0oOQt7udhzFYzQEY80zlAueWdV-N-grua9IfuCJHyptd6wi6SnNXofVnHtPf4IhEu1Os9RCVzB0PMITsLWeBI87KJ7ej1ZeSCstizhUjKF1NXanWA1fHndS9KUoJ3sXrIC0WtAx65lAtQeqhA" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-label-md font-semibold text-on-surface">Elena Rossi</span>
              <span className="text-xs text-on-surface-variant">Master Potter</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 min-h-screen bg-surface-linen pb-20">
        
        {/* Top Header */}
        <header className="sticky top-0 bg-surface-linen/90 backdrop-blur-md z-40 px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant/20 shadow-sm">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-forest-green font-bold">Sponsored Products</h2>
            <p className="text-on-surface-variant font-body-md text-sm">Manage your product visibility and promotional performance.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input 
                className="pl-9 pr-4 py-2 bg-white border border-outline-variant/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-forest-green text-body-md text-sm w-56 md:w-64 transition-all" 
                placeholder="Search SKU or Name..." 
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="p-2 text-on-surface-variant hover:text-forest-green transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto space-y-8">
          
          {/* Metric Cards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Active Campaigns</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-headline-md text-forest-green font-bold">12</span>
                <span className="text-xs text-forest-green bg-primary-fixed px-2 py-0.5 rounded-full font-semibold">+2</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full mt-2 overflow-hidden">
                <div className="bg-forest-green h-full w-3/4"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Impressions</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-headline-md text-forest-green font-bold">48.2k</span>
                <span className="text-xs text-forest-green bg-primary-fixed px-2 py-0.5 rounded-full font-semibold">+14%</span>
              </div>
              <div className="text-xs text-on-surface-variant mt-1">Vs last 30 days</div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Clicks</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-headline-md text-forest-green font-bold">1,894</span>
                <span className="text-xs text-terracotta bg-secondary-fixed px-2 py-0.5 rounded-full font-semibold">3.9% CTR</span>
              </div>
              <div className="text-xs text-on-surface-variant mt-1">High conversion efficiency</div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Avg. Ad Rank</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-headline-md text-forest-green font-bold">#4.2</span>
                <span className="text-xs text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-full font-semibold">Top 5%</span>
              </div>
              <div className="text-xs text-on-surface-variant mt-1">Across primary categories</div>
            </div>

          </section>

          {/* Eligible Products Table Section */}
          <section className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <h3 className="font-headline-md text-forest-green font-bold text-lg">Eligible for Boosting</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-outline-variant/50 rounded-lg hover:bg-surface-container-low transition-colors font-medium">Filter</button>
                <button className="px-4 py-2 text-sm border border-outline-variant/50 rounded-lg hover:bg-surface-container-low transition-colors font-medium">Export CSV</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low text-xs text-on-surface-variant uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">SKU</th>
                    <th className="px-6 py-4 font-semibold text-center">Tags</th>
                    <th className="px-6 py-4 font-semibold text-right">Impressions</th>
                    <th className="px-6 py-4 font-semibold text-right">Ad Rank</th>
                    <th className="px-6 py-4 font-semibold text-center">Boost Item</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {filtered.map(product => (
                    <tr key={product.id} className="hover:bg-surface-linen/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden border border-outline-variant/30 shrink-0">
                            <img className="w-full h-full object-cover" alt={product.name} src={product.image} />
                          </div>
                          <div>
                            <div className="font-semibold text-forest-green">{product.name}</div>
                            <div className="text-xs text-on-surface-variant">{product.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-on-surface-variant">{product.sku}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          product.tagType === 'featured' ? 'bg-secondary-fixed text-on-secondary-fixed-variant' :
                          product.tagType === 'bestseller' ? 'bg-amber-100 text-amber-800' :
                          'bg-surface-container-high text-on-surface-variant'
                        }`}>
                          {product.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">{product.impressions}</td>
                      <td className="px-6 py-4 text-right font-medium text-forest-green">{product.adRank}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => toggleBoost(product.id)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 mx-auto ${
                            product.boosted ? 'bg-forest-green' : 'bg-outline-variant/50'
                          }`}
                        >
                          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            product.boosted ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-outline-variant/10 flex justify-between items-center text-sm text-on-surface-variant">
              <span>Showing {filtered.length} of 32 products</span>
              <div className="flex gap-1">
                <button className="px-3 py-1 border border-outline-variant/30 rounded hover:bg-surface-container-low text-xs">Previous</button>
                <button className="px-3 py-1 bg-forest-green text-white rounded text-xs font-semibold">1</button>
                <button className="px-3 py-1 border border-outline-variant/30 rounded hover:bg-surface-container-low text-xs">2</button>
                <button className="px-3 py-1 border border-outline-variant/30 rounded hover:bg-surface-container-low text-xs">Next</button>
              </div>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
};

export default SponsoredProducts;
