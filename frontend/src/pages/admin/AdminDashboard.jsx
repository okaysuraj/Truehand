import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
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
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
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
            <Link to="/admin/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">insights</span>
              Analytics
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
              <p className="text-[10px] text-on-surface-variant">System Manager</p>
            </div>
          </div>

          <Link 
            to="/storefront-preview" 
            className="w-full py-2.5 border border-charcoal text-charcoal rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            View Storefront
          </Link>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Top Search bar */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search marketplace, orders, artisans..."
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

        {/* Overview Header & Date Picker */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">Overview</h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              A high-level view of marketplace performance and recent artisanal activity.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
            <span className="text-on-surface-variant">DATE RANGE</span>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white border border-outline-variant/40 rounded-lg px-3 py-2 text-xs font-bold text-charcoal focus:outline-none shadow-sm cursor-pointer"
            >
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
        </div>

        {/* 4 Metric Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Gross Merchandise Value</span>
              <span className="material-symbols-outlined text-forest-green text-lg">receipt_long</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display-lg text-2xl font-bold text-charcoal">$124,500</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">&uarr; +12.5%</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Total Orders</span>
              <span className="material-symbols-outlined text-forest-green text-lg">local_shipping</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display-lg text-2xl font-bold text-charcoal">842</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">&uarr; +4.2%</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Active Artisans</span>
              <span className="material-symbols-outlined text-forest-green text-lg">handyman</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display-lg text-2xl font-bold text-charcoal">156</span>
              <span className="text-[11px] font-semibold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">&rarr; 0.0%</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">New Collectors</span>
              <span className="material-symbols-outlined text-forest-green text-lg">person_add</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display-lg text-2xl font-bold text-charcoal">328</span>
              <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">&darr; -2.1%</span>
            </div>
          </div>

        </div>

        {/* 2-Column Section: Marketplace Health Chart & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Marketplace Health Chart */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-display-md text-base font-bold text-charcoal">Marketplace Health</h3>
              <button className="text-on-surface-variant hover:text-charcoal">
                <span className="material-symbols-outlined text-base">more_horiz</span>
              </button>
            </div>

            {/* Custom Smooth SVG Chart */}
            <div className="h-64 relative flex items-end">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Background grid lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#f0ece9" strokeWidth="1" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#f0ece9" strokeWidth="1" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#f0ece9" strokeWidth="1" />

                {/* GMV Solid Line */}
                <path 
                  d="M 0 170 C 80 160, 150 120, 250 80 C 320 60, 400 70, 500 20" 
                  fill="none" 
                  stroke="#163428" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />

                {/* Order Volume Dashed Line */}
                <path 
                  d="M 0 185 C 100 175, 200 140, 300 95 C 380 75, 420 120, 500 65" 
                  fill="none" 
                  stroke="#c28468" 
                  strokeWidth="3" 
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex justify-between text-[11px] text-on-surface-variant border-t border-outline-variant/20 pt-3 font-semibold">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs font-semibold text-charcoal pt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-forest-green" />
                <span>GMV ($)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#c28468]" />
                <span>Order Volume</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6 flex flex-col justify-between text-xs">
            <div className="space-y-6">
              <h3 className="font-display-md text-base font-bold text-charcoal">Recent Activity</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-forest-green flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">verified</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-xs font-bold text-charcoal">New Artisan Approved</h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 leading-tight">Elena's Ceramics profile has been approved and published to the marketplace.</p>
                    <span className="text-[10px] text-on-surface-variant mt-1 block">10 mins ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-forest-green flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">payments</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-xs font-bold text-charcoal">High-Value Sale</h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 leading-tight">Order #8892 processed for 'Walnut Dining Table' ($3,200).</p>
                    <span className="text-[10px] text-on-surface-variant mt-1 block">1 hour ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">warning</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-xs font-bold text-charcoal">Dispute Opened</h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 leading-tight">Customer flagged issue with Order #8841 regarding shipping damage.</p>
                    <span className="text-[10px] text-on-surface-variant mt-1 block">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/admin/orders')}
              className="w-full py-2.5 text-center text-xs font-bold text-forest-green hover:underline border-t border-outline-variant/20 pt-4"
            >
              View All Activity
            </button>
          </div>

        </div>

        {/* Bottom Banner: Pending Approvals */}
        <div className="bg-[#163428] text-white p-6 md:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <h3 className="font-display-lg text-lg md:text-xl font-bold">Pending Approvals</h3>
            <p className="font-body-md text-xs text-white/80 max-w-xl">
              There are 12 artisan applications awaiting manual review this week to ensure they meet our craftsmanship standards.
            </p>
          </div>

          <button 
            onClick={() => navigate('/admin/product-approvals')}
            className="px-6 py-3 bg-white text-forest-green rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-surface-container transition-all shadow shrink-0"
          >
            Review Applications
          </button>
        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;
