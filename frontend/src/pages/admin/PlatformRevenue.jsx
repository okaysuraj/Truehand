import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RECENT_PLATFORM_TRANSACTIONS = [
  {
    date: 'Oct 24, 2023',
    orderId: '#ORD-9921',
    artisan: 'Elena Lopez Ceramics',
    initials: 'EL',
    gross: '$245.00',
    commission: '$49.00',
    netRevenue: '$49.00',
  },
  {
    date: 'Oct 24, 2023',
    orderId: '#ORD-9920',
    artisan: 'Marcus Woodworks',
    initials: 'MW',
    gross: '$850.00',
    commission: '$170.00',
    netRevenue: '$170.00',
  },
  {
    date: 'Oct 23, 2023',
    orderId: '#ORD-9919',
    artisan: "Sarah's Textiles",
    initials: 'ST',
    gross: '$120.00',
    commission: '$24.00',
    netRevenue: '$24.00',
  },
  {
    date: 'Oct 22, 2023',
    orderId: '#ORD-9918',
    artisan: 'Elena Lopez Ceramics',
    initials: 'EL',
    gross: '$310.00',
    commission: '$62.00',
    netRevenue: '$62.00',
  },
];

const PlatformRevenue = () => {
  const [trendMode, setTrendMode] = useState('Monthly');

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">TrueHand</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Marketplace Admin</p>
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
            <Link to="/admin/platform-revenue" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/admin/banners" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">view_carousel</span>
              Content
            </Link>
            <Link to="/admin/commission-settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-2xl border border-outline-variant/30 text-xs">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container shrink-0">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <h5 className="font-bold text-charcoal">Admin User</h5>
            <p className="text-[10px] text-on-surface-variant">Manager</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Export Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Platform Revenue
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
              Comprehensive financial overview and transaction history.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Exporting platform CSV...')}
              className="px-5 py-2.5 bg-white border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Export CSV
            </button>
            <button className="px-5 py-2.5 bg-charcoal text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors shadow flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              This Month
            </button>
          </div>
        </div>

        {/* 4 Metric Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                Total Revenue
              </span>
              <span className="material-symbols-outlined text-charcoal text-lg">account_balance_wallet</span>
            </div>
            <h3 className="font-display-lg text-3xl font-bold text-charcoal">$142,500</h3>
            <p className="text-[10px] text-forest-green font-semibold">&nearr; +12%</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                Net Income (Platform)
              </span>
              <span className="material-symbols-outlined text-charcoal text-lg">savings</span>
            </div>
            <h3 className="font-display-lg text-3xl font-bold text-charcoal">$28,500</h3>
            <p className="text-[10px] text-forest-green font-semibold">&nearr; +15%</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                Average Order Value
              </span>
              <span className="material-symbols-outlined text-charcoal text-lg">receipt_long</span>
            </div>
            <h3 className="font-display-lg text-3xl font-bold text-charcoal">$185</h3>
            <p className="text-[10px] text-on-surface-variant font-semibold">&rarr; 0%</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                Tax Collected
              </span>
              <span className="material-symbols-outlined text-charcoal text-lg">account_balance</span>
            </div>
            <h3 className="font-display-lg text-3xl font-bold text-charcoal">$11,400</h3>
            <p className="text-[10px] text-forest-green font-semibold">&nearr; +5%</p>
          </div>

        </div>

        {/* Revenue Trends Line Chart */}
        <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
          <div className="flex justify-between items-center">
            <h3 className="font-display-md text-base font-bold text-charcoal">Revenue Trends</h3>
            <div className="flex bg-surface-container-low rounded-xl p-1 text-xs font-bold text-on-surface-variant">
              {['Weekly', 'Monthly'].map(m => (
                <button
                  key={m}
                  onClick={() => setTrendMode(m)}
                  className={`px-3 py-1 rounded-lg transition-all ${trendMode === m ? 'bg-charcoal text-white' : 'hover:text-charcoal'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="h-48 relative flex flex-col justify-between pt-2">
            <div className="flex justify-between text-[10px] text-on-surface-variant/60 font-mono">
              <span>$40k</span>
            </div>
            <div className="flex justify-between text-[10px] text-on-surface-variant/60 font-mono">
              <span>$30k</span>
            </div>
            <div className="flex justify-between text-[10px] text-on-surface-variant/60 font-mono">
              <span>$20k</span>
            </div>
            <div className="flex justify-between text-[10px] text-on-surface-variant/60 font-mono">
              <span>$10k</span>
            </div>
            <div className="flex justify-between text-[10px] text-on-surface-variant/60 font-mono border-b border-outline-variant/20 pb-1">
              <span>0</span>
            </div>

            <div className="flex justify-between text-[10px] text-on-surface-variant font-mono font-semibold pt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="p-6 pb-4 flex justify-between items-center">
            <h3 className="font-display-md text-base font-bold text-charcoal">Recent Transactions</h3>
            <div className="flex gap-3">
              <select className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-2 text-xs font-semibold text-charcoal focus:outline-none">
                <option>All Categories</option>
                <option>Ceramics</option>
                <option>Woodwork</option>
                <option>Textiles</option>
              </select>
              <select className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-2 text-xs font-semibold text-charcoal focus:outline-none">
                <option>All Statuses</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-y border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">Date</th>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Artisan</th>
                  <th className="p-4">Gross Amount</th>
                  <th className="p-4">Commission (20%)</th>
                  <th className="p-4 text-right pr-6">Net Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {RECENT_PLATFORM_TRANSACTIONS.map(tx => (
                  <tr key={tx.orderId} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6 text-on-surface-variant">{tx.date}</td>
                    <td className="p-4 font-mono font-bold text-charcoal">{tx.orderId}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-[10px] font-bold text-charcoal">
                          {tx.initials}
                        </span>
                        <span className="font-semibold text-charcoal">{tx.artisan}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-charcoal font-semibold">{tx.gross}</td>
                    <td className="p-4 font-mono text-forest-green font-semibold">{tx.commission}</td>
                    <td className="p-4 text-right pr-6 font-mono font-bold text-charcoal">{tx.netRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

    </div>
  );
};

export default PlatformRevenue;
