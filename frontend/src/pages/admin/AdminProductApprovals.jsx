import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PENDING_PRODUCTS = [
  {
    id: 1,
    title: 'Obsidian Teapot',
    sku: 'CR-892',
    artisan: 'Elena Rostova',
    artisanStatus: 'New Seller',
    category: 'Ceramics',
    submitted: 'Oct 24, 2023',
    timeAgo: '2 days ago',
    riskLevel: 'High',
    riskClass: 'bg-red-50 text-red-600',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
  },
  {
    id: 2,
    title: 'Linen Weave Throw',
    sku: 'TX-114',
    artisan: 'Marcus Chen',
    artisanStatus: 'Verified Artisan',
    category: 'Textiles',
    submitted: 'Oct 25, 2023',
    timeAgo: 'Yesterday',
    riskLevel: 'Low',
    riskClass: 'bg-emerald-50 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
  },
  {
    id: 3,
    title: 'Walnut Serving Bowl',
    sku: 'WD-402',
    artisan: 'Sarah Jenkins',
    artisanStatus: 'Pending Verification',
    category: 'Woodwork',
    submitted: 'Oct 26, 2023',
    timeAgo: 'Today',
    riskLevel: 'Med',
    riskClass: 'bg-amber-50 text-amber-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
  },
];

const AdminProductApprovals = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(PENDING_PRODUCTS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [category, setCategory] = useState('All Categories');
  const [riskLevel, setRiskLevel] = useState('All Risk Levels');
  const [sortBy, setSortBy] = useState('Oldest First');

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleApprove = () => {
    if (selectedIds.length === 0) return alert('Please select products to approve.');
    alert(`${selectedIds.length} product(s) approved and published to catalog.`);
    setItems(prev => prev.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
  };

  const handleReject = () => {
    if (selectedIds.length === 0) return alert('Please select products to reject.');
    alert(`${selectedIds.length} product(s) rejected and returned for revision.`);
    setItems(prev => prev.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
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
            <Link to="/admin/product-approvals" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/finances" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-outline-variant/20 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 bg-surface-container-low rounded-xl">
            <div className="w-8 h-8 rounded-full bg-forest-green text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div>
              <p className="font-label-md text-xs font-bold text-charcoal">Admin User</p>
              <p className="text-[10px] text-on-surface-variant">Curator</p>
            </div>
          </div>
          <Link to="/storefront-preview" className="w-full py-2.5 border border-charcoal text-charcoal rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all flex items-center justify-center">
            View Storefront
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Top Search */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search product queues, SKUs..."
              className="w-full bg-white border border-outline-variant/40 rounded-full py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-forest-green shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-on-surface-variant hover:text-charcoal rounded-full hover:bg-white relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terracotta" />
            </button>
            <button className="p-2 text-on-surface-variant hover:text-charcoal rounded-full hover:bg-white">
              <span className="material-symbols-outlined text-xl">help</span>
            </button>
          </div>
        </div>

        {/* Header & Reject / Approve Buttons */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Product Approval Queue
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Review and manage pending artisanal listings.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={handleReject}
              className="px-6 py-2.5 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Reject Selected
            </button>
            <button 
              onClick={handleApprove}
              className="px-6 py-2.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-sm">check</span>
              Approve Selected
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mb-6 text-xs">
          
          <div className="sm:col-span-4 space-y-1">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Category</span>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-xs font-semibold text-charcoal focus:outline-none"
            >
              <option>All Categories</option>
              <option>Ceramics</option>
              <option>Textiles</option>
              <option>Woodwork</option>
            </select>
          </div>

          <div className="sm:col-span-4 space-y-1">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Risk Level</span>
            <select 
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-xs font-semibold text-charcoal focus:outline-none"
            >
              <option>All Risk Levels</option>
              <option>Low</option>
              <option>Med</option>
              <option>High</option>
            </select>
          </div>

          <div className="sm:col-span-3 space-y-1">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Sort By</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-2 text-xs font-semibold text-charcoal focus:outline-none"
            >
              <option>Oldest First</option>
              <option>Newest First</option>
              <option>Highest Risk</option>
            </select>
          </div>

          <div className="sm:col-span-1 flex justify-end pt-4">
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container">
              <span className="material-symbols-outlined text-base text-charcoal">filter_list</span>
            </button>
          </div>

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6 w-10">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) setSelectedIds(items.map(i => i.id));
                        else setSelectedIds([]);
                      }}
                      checked={selectedIds.length === items.length && items.length > 0}
                      className="rounded" 
                    />
                  </th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Artisan</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4 text-center">Risk Level</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(item.id)} 
                        onChange={() => toggleSelect(item.id)}
                        className="rounded" 
                      />
                    </td>

                    <td className="p-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-headline-md text-xs font-bold text-charcoal">{item.title}</h4>
                        <p className="text-[10px] text-on-surface-variant font-mono">SKU: {item.sku}</p>
                      </div>
                    </td>

                    <td className="p-4">
                      <p className="font-bold text-charcoal">{item.artisan}</p>
                      <p className="text-[10px] text-on-surface-variant">{item.artisanStatus}</p>
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 bg-surface-container rounded-full text-[11px] font-semibold text-charcoal">
                        {item.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-charcoal">{item.submitted}</p>
                      <p className="text-[10px] text-on-surface-variant">{item.timeAgo}</p>
                    </td>

                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${item.riskClass}`}>
                        {item.riskLevel === 'High' && <span className="material-symbols-outlined text-[13px]">warning</span>}
                        {item.riskLevel === 'Low' && <span className="material-symbols-outlined text-[13px]">check_circle</span>}
                        {item.riskLevel === 'Med' && <span className="material-symbols-outlined text-[13px]">info</span>}
                        <span>{item.riskLevel}</span>
                      </span>
                    </td>

                    <td className="p-4 text-right pr-6">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => {
                            alert(`Approved ${item.title}`);
                            setItems(items.filter(i => i.id !== item.id));
                          }}
                          className="p-1.5 text-forest-green hover:bg-emerald-50 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-base">check</span>
                        </button>
                        <button 
                          onClick={() => {
                            alert(`Rejected ${item.title}`);
                            setItems(items.filter(i => i.id !== item.id));
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-base">close</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 px-6 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
            <span>Showing <strong>1 to 3</strong> of <strong>124</strong> entries</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-charcoal text-white font-bold text-xs flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-xs">
                2
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-xs">
                3
              </button>
              <span className="px-1">&bull;&bull;&bull;</span>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-xs">
                12
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};

export default AdminProductApprovals;
