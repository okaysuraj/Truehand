import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CategoryManagement = () => {
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState({
    name: 'Ceramics & Pottery',
    slug: 'ceramics-pottery',
    description: 'Hand-thrown, molded, and fired clay goods created by independent artisans.',
    commissionRate: 12,
    requireApproval: true,
    attributes: ['Material', 'Firing Temp', 'Glaze Type'],
  });

  const removeAttribute = (attr) => {
    setSelectedCat(prev => ({
      ...prev,
      attributes: prev.attributes.filter(a => a !== attr),
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Category "${selectedCat.name}" updated successfully!`);
  };

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
            <Link to="/admin/categories" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">category</span>
              Categories
            </Link>
            <Link to="/admin/product-approvals" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
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

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-2 text-xs text-on-surface-variant font-label-sm">
          <Link to="/admin/product-approvals" className="hover:text-forest-green">Products</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-semibold text-charcoal">Categories</span>
        </nav>

        {/* Header & CTAs */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Category Taxonomy
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl">
              Organize the marketplace structure. Drag to reorder. Adjust commission rates and specific attributes per category to tailor the artisan experience.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Exporting categories...')}
              className="px-5 py-2.5 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Export
            </button>
            <button 
              onClick={() => alert('New Root Category dialog opened.')}
              className="px-6 py-2.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-base">add</span>
              New Root Category
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Taxonomy Tree & Edit Category Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Category Hierarchy */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Ceramics & Pottery (Expanded) */}
            <div className="bg-white rounded-2xl border-2 border-forest-green shadow-sm overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b border-outline-variant/20 bg-surface-container-low/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant cursor-grab">drag_indicator</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-headline-md text-sm font-bold text-charcoal">Ceramics &amp; Pottery</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-50 text-forest-green">Active</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      1,245 Items &bull; 84 Artisans &bull; 12% Comm.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-1 text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">edit</span></button>
                  <button className="p-1 text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">add</span></button>
                  <button className="p-1 text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">expand_less</span></button>
                </div>
              </div>

              {/* Subcategories */}
              <div className="p-4 pl-12 space-y-2 bg-surface-container-lowest text-xs">
                {['Tableware', 'Sculptural', 'Planters & Vases'].map(sub => (
                  <div key={sub} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant text-sm">subdirectory_arrow_right</span>
                      <span className="font-semibold text-charcoal">{sub}</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-base cursor-grab">drag_indicator</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Woodworking (Collapsed) */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant cursor-grab">drag_indicator</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline-md text-sm font-bold text-charcoal">Woodworking</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-50 text-forest-green">Active</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">892 Items &bull; 56 Artisans &bull; 15% Comm.</p>
                </div>
              </div>
              <button className="p-1 text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">expand_more</span></button>
            </div>

            {/* Textiles & Weaving (Collapsed) */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant cursor-grab">drag_indicator</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline-md text-sm font-bold text-charcoal">Textiles &amp; Weaving</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-50 text-forest-green">Active</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">2,104 Items &bull; 112 Artisans &bull; 10% Comm.</p>
                </div>
              </div>
              <button className="p-1 text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">expand_more</span></button>
            </div>

          </div>

          {/* Right Column: Edit Category Form */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <h3 className="font-display-md text-base font-bold text-charcoal">Edit Category</h3>
              <button onClick={() => alert('Category deletion requested.')} className="text-on-surface-variant hover:text-red-600">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                  Display Name
                </label>
                <input 
                  type="text" 
                  value={selectedCat.name}
                  onChange={(e) => setSelectedCat({ ...selectedCat, name: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green font-semibold text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                  URL Slug
                </label>
                <input 
                  type="text" 
                  value={selectedCat.slug}
                  onChange={(e) => setSelectedCat({ ...selectedCat, slug: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green font-mono text-on-surface-variant"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                  Description
                </label>
                <textarea 
                  rows={3}
                  value={selectedCat.description}
                  onChange={(e) => setSelectedCat({ ...selectedCat, description: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green leading-relaxed text-charcoal"
                />
              </div>

              {/* Business Rules */}
              <div className="pt-2 space-y-3 border-t border-outline-variant/20">
                <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  Business Rules
                </span>

                <div className="flex items-center justify-between">
                  <span className="text-charcoal font-semibold">Base Commission Rate (%)</span>
                  <input 
                    type="number" 
                    value={selectedCat.commissionRate}
                    onChange={(e) => setSelectedCat({ ...selectedCat, commissionRate: e.target.value })}
                    className="w-16 bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-center text-xs font-bold font-mono focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-charcoal font-semibold">Require Artisan Approval</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedCat.requireApproval}
                      onChange={(e) => setSelectedCat({ ...selectedCat, requireApproval: e.target.checked })}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-forest-green"></div>
                  </label>
                </div>
              </div>

              {/* Required Attributes */}
              <div className="pt-2 space-y-2 border-t border-outline-variant/20">
                <div className="flex justify-between items-center">
                  <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                    Required Attributes
                  </span>
                  <button type="button" onClick={() => alert('Add attribute modal')} className="text-forest-green font-bold text-[11px] hover:underline">
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedCat.attributes.map(attr => (
                    <span key={attr} className="px-3 py-1 bg-surface-container rounded-lg font-semibold text-charcoal flex items-center gap-1.5">
                      <span>{attr}</span>
                      <button type="button" onClick={() => removeAttribute(attr)} className="text-on-surface-variant hover:text-charcoal">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button 
                  type="button" 
                  onClick={() => alert('Changes discarded')}
                  className="px-5 py-2.5 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>

        </div>

      </main>

    </div>
  );
};

export default CategoryManagement;
