import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const INITIAL_VARIANTS = [
  {
    id: 1,
    size: '500ml',
    glaze: 'Matte Bone',
    name: '500ml / Matte Bone',
    series: 'Stoneware Pitcher',
    sku: 'P-NS-S-MB',
    price: 45.00,
    stock: 24,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
  },
  {
    id: 2,
    size: '1.2L',
    glaze: 'Crackle Sage',
    name: '1.2L / Crackle Sage',
    series: 'Stoneware Pitcher',
    sku: 'P-NS-M-CS',
    price: 68.00,
    stock: 12,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
  },
  {
    id: 3,
    size: '2.5L',
    glaze: 'Volcanic Ash',
    name: '2.5L / Volcanic Ash',
    series: 'Stoneware Pitcher',
    sku: 'P-NS-L-VA',
    price: 95.00,
    stock: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ',
  },
  {
    id: 4,
    size: '500ml',
    glaze: 'Crackle Sage',
    name: '500ml / Crackle Sage',
    series: 'Stoneware Pitcher',
    sku: 'P-NS-S-CS',
    price: 45.00,
    stock: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZqd4TL6YM-02s_QxvUuoHr9W8C8c6zr6POoUxUDOS0PxjQcYqP3L1S8V1b-eE8dFGBE6-eGZ4EruYb3UHYl1jp36TbyAAeDPJSx472DW2rZMvOQQJ8bEMQUBJulQvwF5PAxoG9o578JKM48AdILKjy-a0BYsJ5S0SgVO9mw-SqRqLabQtaHE-V0e5Im0EIJdDRvnMEBmJTH3S2iPK9fdX-6_WtAXXkL7s4E9yeMmFRcI62hlgt-tVRg',
  },
];

const ManageVariants = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [variants, setVariants] = useState(INITIAL_VARIANTS);
  const [filterGlaze, setFilterGlaze] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);
  const [manualSku, setManualSku] = useState('');

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleAddManual = (e) => {
    e.preventDefault();
    if (!manualSku) return;
    const added = {
      id: Date.now(),
      size: '1.0L',
      glaze: 'Custom',
      name: '1.0L / Custom Variant',
      series: 'Stoneware Pitcher',
      sku: manualSku,
      price: 55.00,
      stock: 5,
      image: INITIAL_VARIANTS[0].image,
    };
    setVariants([...variants, added]);
    setManualSku('');
  };

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

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl pb-32">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-4 text-xs text-on-surface-variant font-label-sm">
          <Link to="/seller/inventory" className="hover:text-forest-green">Inventory</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Ceramics</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-semibold text-charcoal">Nordic Stoneware Collection</span>
        </nav>

        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">Manage Variants</h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl leading-relaxed">
              Configure size, glaze, and stock levels for the Nordic Stoneware Pitcher. Each variant represents a unique physical item in your inventory.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              type="button" 
              onClick={() => navigate('/seller/inventory')}
              className="px-6 py-2.5 font-label-md text-xs uppercase tracking-wider font-semibold border border-charcoal text-charcoal hover:bg-surface-container rounded-lg transition-colors"
            >
              Discard Changes
            </button>
            <button 
              type="button" 
              onClick={() => {
                alert('Variant configuration saved successfully.');
                navigate('/seller/inventory');
              }}
              className="px-6 py-2.5 font-label-md text-xs uppercase tracking-widest font-bold bg-forest-green text-white hover:opacity-90 rounded-lg transition-opacity shadow"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Variant Options */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
              <div className="flex justify-between items-center">
                <h3 className="font-headline-md text-sm font-bold text-charcoal">Variant Options</h3>
                <button onClick={() => alert('Editing options')} className="text-forest-green font-bold hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                  Edit
                </button>
              </div>

              {/* Size */}
              <div className="space-y-2">
                <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Size</span>
                <div className="flex flex-wrap gap-2">
                  {['500ml', '1.2L', '2.5L'].map(s => (
                    <span key={s} className="px-3.5 py-1.5 bg-surface-container rounded-lg font-semibold text-charcoal">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glaze Finish */}
              <div className="space-y-2">
                <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Glaze Finish</span>
                <div className="flex flex-wrap gap-2">
                  {['Matte Bone', 'Crackle Sage', 'Volcanic Ash'].map(g => (
                    <span key={g} className="px-3.5 py-1.5 bg-surface-container rounded-lg font-semibold text-charcoal">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add option button */}
              <button 
                onClick={() => alert('Option builder opened')}
                className="w-full py-2.5 border border-dashed border-outline-variant rounded-xl text-xs font-semibold text-on-surface-variant hover:border-forest-green hover:text-forest-green transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add another option
              </button>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3 text-xs">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Quick Actions
              </span>
              <div 
                onClick={() => alert('Bulk price update dialog opened.')}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer"
              >
                <div>
                  <h4 className="font-headline-md text-xs font-bold text-charcoal">Update All Prices</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Apply a bulk price change to all 9 variants</p>
                </div>
                <span className="material-symbols-outlined text-sm text-on-surface-variant">chevron_right</span>
              </div>
            </div>

          </div>

          {/* Right Panel: Variants Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
            
            <div className="p-4 px-6 border-b border-outline-variant/20 flex justify-between items-center">
              <span className="font-headline-md text-xs font-bold text-charcoal">9 Variants total</span>
              <div className="flex items-center gap-3">
                <select 
                  value={filterGlaze}
                  onChange={(e) => setFilterGlaze(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none"
                >
                  <option>Filter by Glaze</option>
                  <option>Matte Bone</option>
                  <option>Crackle Sage</option>
                  <option>Volcanic Ash</option>
                </select>
                <button className="text-on-surface-variant hover:text-charcoal">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/20">
                  <tr>
                    <th className="p-4 pl-6 w-10">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="p-4">Variant</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-center">Stock</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {variants.map(v => (
                    <tr key={v.id} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="p-4 pl-6">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(v.id)} 
                          onChange={() => toggleSelect(v.id)}
                          className="rounded" 
                        />
                      </td>
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-headline-md text-xs font-bold text-charcoal">{v.name}</h4>
                          <p className="text-[10px] text-on-surface-variant">{v.series}</p>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-on-surface-variant uppercase">{v.sku}</td>
                      <td className="p-4 font-bold text-charcoal">${v.price.toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          v.stock <= 3 ? 'bg-amber-100 text-amber-900' : 'bg-surface-container text-charcoal'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {v.stock}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6">
                        <button 
                          onClick={() => alert(`Editing variant ${v.name}`)}
                          className="text-on-surface-variant hover:text-forest-green"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </main>

      {/* Floating Bottom Bar: Add Manual Variant */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-outline-variant/30 p-4 px-6 z-40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            {INITIAL_VARIANTS.slice(0, 3).map((v, i) => (
              <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src={v.image} alt="" />
            ))}
          </div>
          <div>
            <h4 className="font-headline-md text-xs font-bold text-charcoal">Add Manual Variant</h4>
            <p className="text-[11px] text-on-surface-variant">Create a custom one-off or unique item variant</p>
          </div>
        </div>

        <form onSubmit={handleAddManual} className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
            <input 
              type="text" 
              placeholder="Jump to variant SKU..."
              value={manualSku}
              onChange={(e) => setManualSku(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-forest-green"
            />
          </div>
          <button 
            type="submit"
            className="px-6 py-2.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow shrink-0"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Manual Variant
          </button>
        </form>
      </div>

    </div>
  );
};

export default ManageVariants;
