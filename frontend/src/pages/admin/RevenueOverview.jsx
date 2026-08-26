import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RECENT_REVENUE_TXS = [
  {
    id: 1,
    item: 'Hand-thrown Ceramic Mug',
    subtext: 'Order #ORD-7729',
    date: 'Oct 12, 2023',
    amount: '+$45.00',
    status: 'Cleared',
    statusClass: 'bg-emerald-50 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
  },
  {
    id: 2,
    item: 'Weekly Payout',
    subtext: 'Transfer to Bank ***4582',
    date: 'Oct 10, 2023',
    amount: '-$1,250.00',
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-forest-green',
    icon: 'account_balance',
  },
  {
    id: 3,
    item: 'Woven Linen Throw',
    subtext: 'Order #ORD-7725',
    date: 'Oct 09, 2023',
    amount: '+$180.00',
    status: 'Pending',
    statusClass: 'bg-[#ffdecb] text-[#97472a]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
  },
];

const RevenueOverview = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('W');

  return (
    <div className="flex min-h-screen bg-[#faf8f5] font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisan Portal</h1>
            <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">Master Workshop</p>
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
            <Link to="/seller/inventory" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
            <Link to="/seller/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              Analytics
            </Link>
            <Link to="/revenue-overview" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => navigate('/seller/new-listing')}
            className="w-full py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Listing
          </button>
          <Link to="/help" className="flex items-center gap-2 text-xs text-on-surface-variant px-1 font-semibold hover:text-charcoal">
            <span className="material-symbols-outlined text-base">help</span>
            Support
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Statement Action */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Revenue Overview
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
              Your financial performance and pending payouts.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button className="px-5 py-2.5 bg-white border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              This Month
            </button>
            <button 
              onClick={() => alert('Downloading statement PDF...')}
              className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Download Statement
            </button>
          </div>
        </div>

        {/* 2-Column Section: Total Revenue Chart & Net/Pending Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Total Revenue Bar Chart with Saturday Highlight */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  TOTAL REVENUE
                </span>
                <h3 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal mt-1">
                  $24,850.00
                </h3>
              </div>

              <div className="flex bg-surface-container-low rounded-xl p-1 text-xs font-bold text-on-surface-variant">
                {['W', 'M', 'Y'].map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1 rounded-lg transition-all ${period === p ? 'bg-white shadow-sm text-charcoal' : 'hover:text-charcoal'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Bars */}
            <div className="h-60 flex items-end justify-between gap-4 pt-6 px-4">
              {[
                { day: 'Mon', height: 35 },
                { day: 'Tue', height: 50 },
                { day: 'Wed', height: 42 },
                { day: 'Thu', height: 70 },
                { day: 'Fri', height: 60 },
                { day: 'Sat', height: 95, highlight: true },
                { day: 'Sun', height: 30 },
              ].map(bar => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className={`w-full max-w-[56px] rounded-t-xl transition-all ${
                      bar.highlight ? 'bg-[#b67d68]' : 'bg-surface-container-high'
                    }`}
                    style={{ height: `${bar.height}%` }}
                  />
                  <span className={`text-[10px] font-bold ${bar.highlight ? 'text-terracotta' : 'text-on-surface-variant'}`}>
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Net Earnings, Pending Payout, Refunds */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-forest-green font-bold">
                <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider">Net Earnings</span>
              </div>
              <h4 className="font-display-lg text-2xl font-bold text-charcoal">$21,122.50</h4>
              <p className="text-[10px] text-on-surface-variant italic">After 15% marketplace commission</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-terracotta font-bold">
                <span className="material-symbols-outlined text-base">pending</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider">Pending Payout</span>
              </div>
              <h4 className="font-display-lg text-2xl font-bold text-charcoal">$3,450.00</h4>
              <p className="text-[10px] text-on-surface-variant">Scheduled for Oct 15</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-charcoal font-bold">
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant">Refunds &amp; Adjustments</span>
                <span className="material-symbols-outlined text-red-600 text-base">trending_down</span>
              </div>
              <h4 className="font-display-lg text-2xl font-bold text-red-600">-$125.00</h4>
            </div>

          </div>

        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="p-6 pb-4 flex justify-between items-center">
            <h3 className="font-display-md text-base font-bold text-charcoal">Recent Transactions</h3>
            <button className="text-forest-green font-bold hover:underline">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-y border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">ITEM</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">AMOUNT</th>
                  <th className="p-4 text-right pr-6">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {RECENT_REVENUE_TXS.map(tx => (
                  <tr key={tx.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        {tx.image ? (
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                            <img src={tx.image} alt={tx.item} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-charcoal shrink-0">
                            <span className="material-symbols-outlined text-lg">{tx.icon}</span>
                          </div>
                        )}
                        <div>
                          <h5 className="font-bold text-charcoal">{tx.item}</h5>
                          <p className="text-[10px] text-on-surface-variant">{tx.subtext}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-on-surface-variant">{tx.date}</td>

                    <td className={`p-4 font-mono font-bold ${tx.amount.startsWith('+') ? 'text-charcoal' : 'text-on-surface-variant'}`}>
                      {tx.amount}
                    </td>

                    <td className="p-4 text-right pr-6">
                      <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${tx.statusClass}`}>
                        {tx.status}
                      </span>
                    </td>
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

export default RevenueOverview;
