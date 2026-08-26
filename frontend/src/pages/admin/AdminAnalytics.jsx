import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

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
            <Link to="/admin/product-approvals" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">insights</span>
              Analytics
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
        
        {/* Header & Export */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Platform Analytics
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Deep dive into key performance indicators and growth metrics.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs font-bold text-charcoal focus:outline-none shadow-sm cursor-pointer"
            >
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
            </select>
            <button 
              onClick={() => alert('Exporting full analytics report...')}
              className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Export Report
            </button>
          </div>
        </div>

        {/* Row 1: GMV Bar Chart & Category Share */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* GMV Monthly Bars */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  Gross Merchandise Value
                </span>
                <h3 className="font-display-lg text-3xl font-bold text-charcoal mt-1">$124,500</h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                &uarr; +12.4% vs last mo
              </span>
            </div>

            {/* Custom Bar Graph */}
            <div className="h-52 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { month: 'Jan', val: 35, color: 'bg-surface-container-high' },
                { month: 'Feb', val: 28, color: 'bg-surface-container-high' },
                { month: 'Mar', val: 42, color: 'bg-surface-container-high' },
                { month: 'Apr', val: 56, color: 'bg-surface-container-high' },
                { month: 'May', val: 52, color: 'bg-[#a3c2b2]' },
                { month: 'Jun', val: 78, color: 'bg-[#97472a]' },
                { month: 'Jul', val: 100, color: 'bg-[#163428]' },
              ].map(b => (
                <div key={b.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className={`w-full rounded-t-lg transition-all ${b.color}`} 
                    style={{ height: `${b.val * 1.6}px` }} 
                  />
                  <span className="text-[11px] font-semibold text-on-surface-variant">{b.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Share Geometric Card */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 flex flex-col justify-between text-xs">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              Order Volume by Category
            </span>

            {/* Geometric Pyramid Graphic simulation */}
            <div className="relative h-44 flex items-center justify-center">
              <div className="text-center">
                <span className="font-display-lg text-3xl font-bold text-charcoal block">1,248</span>
                <span className="text-[11px] text-on-surface-variant">Total Orders</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-outline-variant/20 pt-4">
              <div className="flex justify-between items-center font-semibold">
                <span className="flex items-center gap-2 text-charcoal">
                  <span className="w-3 h-3 rounded bg-forest-green" />
                  Ceramics
                </span>
                <span className="font-bold text-charcoal">55%</span>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <span className="flex items-center gap-2 text-charcoal">
                  <span className="w-3 h-3 rounded bg-[#97472a]" />
                  Woodwork
                </span>
                <span className="font-bold text-charcoal">25%</span>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <span className="flex items-center gap-2 text-charcoal">
                  <span className="w-3 h-3 rounded bg-[#a3c2b2]" />
                  Textiles
                </span>
                <span className="font-bold text-charcoal">20%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: User Growth & Retention Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* User Growth */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs flex flex-col justify-between">
            <div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block mb-4">
                User Growth
              </span>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between font-bold mb-1.5">
                    <span className="text-charcoal">Collectors</span>
                    <span className="text-forest-green">+450</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-charcoal h-2 rounded-full w-[80%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1.5">
                    <span className="text-charcoal">Sellers</span>
                    <span className="text-terracotta">+84</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-terracotta h-2 rounded-full w-[35%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low/70 rounded-2xl border border-outline-variant/20">
              <span className="text-[11px] text-on-surface-variant block">Strongest acquisition channel:</span>
              <strong className="text-charcoal font-bold text-xs">Organic Search (42%)</strong>
            </div>
          </div>

          {/* Retention Heatmap */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Retention Heatmap (Months)
              </span>
              <button className="text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-base">more_horiz</span></button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-on-surface-variant border-b border-outline-variant/20">
                    <th className="p-3 text-left">Cohort</th>
                    <th className="p-3">Users</th>
                    <th className="p-3">M1</th>
                    <th className="p-3">M2</th>
                    <th className="p-3">M3</th>
                    <th className="p-3">M4</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-xs font-semibold">
                  <tr>
                    <td className="p-3 text-left font-bold text-charcoal">Jan 2024</td>
                    <td className="p-3 text-on-surface-variant">342</td>
                    <td className="p-2"><span className="px-3 py-1.5 rounded-lg bg-[#163428] text-white inline-block w-14">45%</span></td>
                    <td className="p-2"><span className="px-3 py-1.5 rounded-lg bg-[#5c7a6b] text-white inline-block w-14">32%</span></td>
                    <td className="p-2"><span className="px-3 py-1.5 rounded-lg bg-[#8fa99c] text-charcoal inline-block w-14">28%</span></td>
                    <td className="p-2"><span className="px-3 py-1.5 rounded-lg bg-surface-container text-charcoal inline-block w-14">25%</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 text-left font-bold text-charcoal">Feb 2024</td>
                    <td className="p-3 text-on-surface-variant">415</td>
                    <td className="p-2"><span className="px-3 py-1.5 rounded-lg bg-[#163428] text-white inline-block w-14">52%</span></td>
                    <td className="p-2"><span className="px-3 py-1.5 rounded-lg bg-[#5c7a6b] text-white inline-block w-14">30%</span></td>
                    <td className="p-2"><span className="px-3 py-1.5 rounded-lg bg-[#8fa99c] text-charcoal inline-block w-14">25%</span></td>
                    <td className="p-2 text-on-surface-variant">-</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-left font-bold text-charcoal">Mar 2024</td>
                    <td className="p-3 text-on-surface-variant">289</td>
                    <td className="p-2"><span className="px-3 py-1.5 rounded-lg bg-[#5c7a6b] text-white inline-block w-14">40%</span></td>
                    <td className="p-2"><span className="px-3 py-1.5 rounded-lg bg-[#8fa99c] text-charcoal inline-block w-14">26%</span></td>
                    <td className="p-2 text-on-surface-variant">-</td>
                    <td className="p-2 text-on-surface-variant">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminAnalytics;
