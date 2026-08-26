import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CommissionSettings = () => {
  const navigate = useNavigate();
  const [globalRate, setGlobalRate] = useState('12.0');
  const [categoryRates, setCategoryRates] = useState({
    ceramics: '10.0',
    textiles: '15.0',
    woodwork: '12.5',
  });
  const [artisanRate, setArtisanRate] = useState('8.0');

  const handleSave = () => {
    alert('Commission settings saved successfully.');
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-display-md text-sm font-bold text-charcoal">TrueHand</h2>
              <p className="text-[10px] text-on-surface-variant font-mono">Marketplace Admin</p>
            </div>
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
            <Link to="/admin/products" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/platform-revenue" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/admin/banners" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">view_carousel</span>
              Content
            </Link>
            <Link to="/admin/commission-settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Save Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Commission Settings
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
              Manage platform fee structures and artisan revenue splits.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
            >
              Discard
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Global Base Rate, Category Overrides, Artisan Overrides */}
          <div className="lg:col-span-8 space-y-6 text-xs">
            
            {/* Global Base Rate */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-charcoal font-bold">
                <span className="material-symbols-outlined text-forest-green text-xl">public</span>
                <h3 className="font-display-md text-base font-bold">Global Base Rate</h3>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                The default platform fee applied to all transactions unless overridden by specific category or artisan rules.
              </p>

              <div className="max-w-xs space-y-1 pt-1">
                <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                  Percentage (%)
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1"
                    value={globalRate}
                    onChange={(e) => setGlobalRate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-mono font-bold text-charcoal focus:outline-none focus:border-forest-green"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-on-surface-variant font-bold">%</span>
                </div>
              </div>
            </div>

            {/* Category Overrides */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-2 text-charcoal font-bold">
                  <span className="material-symbols-outlined text-terracotta text-xl">category</span>
                  <h3 className="font-display-md text-base font-bold">Category Overrides</h3>
                </div>
                <button onClick={() => alert('Add category override modal')} className="text-forest-green font-bold text-xs hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Category
                </button>
              </div>

              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Specific commission rates based on product material or type.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex justify-between items-center">
                  <div className="flex items-center gap-2 font-bold text-charcoal">
                    <span className="material-symbols-outlined text-base text-forest-green">local_cafe</span>
                    <span>Ceramics</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      value={categoryRates.ceramics}
                      onChange={(e) => setCategoryRates({...categoryRates, ceramics: e.target.value})}
                      className="w-16 bg-surface-container-low border border-outline-variant/40 rounded-lg p-1.5 text-center font-mono font-bold text-xs"
                    />
                    <span className="font-mono text-on-surface-variant font-bold">%</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex justify-between items-center">
                  <div className="flex items-center gap-2 font-bold text-charcoal">
                    <span className="material-symbols-outlined text-base text-forest-green">dry_cleaning</span>
                    <span>Textiles</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      value={categoryRates.textiles}
                      onChange={(e) => setCategoryRates({...categoryRates, textiles: e.target.value})}
                      className="w-16 bg-surface-container-low border border-outline-variant/40 rounded-lg p-1.5 text-center font-mono font-bold text-xs"
                    />
                    <span className="font-mono text-on-surface-variant font-bold">%</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex justify-between items-center">
                  <div className="flex items-center gap-2 font-bold text-charcoal">
                    <span className="material-symbols-outlined text-base text-forest-green">carpenter</span>
                    <span>Woodwork</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      value={categoryRates.woodwork}
                      onChange={(e) => setCategoryRates({...categoryRates, woodwork: e.target.value})}
                      className="w-16 bg-surface-container-low border border-outline-variant/40 rounded-lg p-1.5 text-center font-mono font-bold text-xs"
                    />
                    <span className="font-mono text-on-surface-variant font-bold">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Artisan Overrides */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-2 text-charcoal font-bold">
                  <span className="material-symbols-outlined text-amber-500 text-xl">star</span>
                  <h3 className="font-display-md text-base font-bold">Artisan Overrides</h3>
                </div>
                <button onClick={() => alert('Add artisan override modal')} className="text-forest-green font-bold text-xs hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Artisan
                </button>
              </div>

              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Custom rates applied to specific sellers (e.g., legacy partners).
              </p>

              <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-charcoal">Elara Pottery Studio</h5>
                  <p className="text-[10px] text-on-surface-variant">Legacy Partner Agreement</p>
                </div>
                <div className="flex items-center gap-2 font-bold text-charcoal font-mono">
                  <span>{artisanRate}%</span>
                  <button onClick={() => alert('Edit rate')} className="text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-sm">edit</span></button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Audit Log Timeline */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex items-center gap-2 text-charcoal font-bold pb-2 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-forest-green text-lg">history</span>
              <h3 className="font-display-md text-base font-bold">Audit Log</h3>
            </div>

            <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
              
              <div className="relative space-y-1">
                <span className="w-4 h-4 rounded-full bg-surface-container border-2 border-forest-green absolute -left-6 top-0" />
                <span className="text-[10px] text-on-surface-variant font-mono">Oct 24, 10:42 AM</span>
                <h5 className="font-bold text-charcoal">Sarah Jenkins</h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Changed Textiles category rate from 12% to 15%.
                </p>
              </div>

              <div className="relative space-y-1">
                <span className="w-4 h-4 rounded-full bg-surface-container border-2 border-forest-green absolute -left-6 top-0" />
                <span className="text-[10px] text-on-surface-variant font-mono">Sep 01, 12:00 AM</span>
                <h5 className="font-bold text-charcoal">System</h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Applied promotional rate 10% globally for Fall Sale.
                </p>
              </div>

              <div className="relative space-y-1">
                <span className="w-4 h-4 rounded-full bg-surface-container border-2 border-forest-green absolute -left-6 top-0" />
                <span className="text-[10px] text-on-surface-variant font-mono">Jan 15, 09:15 AM</span>
                <h5 className="font-bold text-charcoal">Admin</h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Set initial Global Base Rate to 12%.
                </p>
              </div>

            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default CommissionSettings;
