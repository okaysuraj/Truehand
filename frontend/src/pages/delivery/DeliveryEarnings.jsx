import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RECENT_DELIVERY_PAYOUTS = [
  {
    id: '#DEL-9921',
    date: 'Oct 24, 2024',
    client: 'Eleanor Vance',
    type: 'Heirloom Ceramic Set',
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-forest-green',
    amount: '$34.50',
  },
  {
    id: '#DEL-9918',
    date: 'Oct 24, 2024',
    client: 'Arthur Pendelton',
    type: 'Stoneware Plate Collection',
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-forest-green',
    amount: '$28.00',
  },
  {
    id: '#DEL-9905',
    date: 'Oct 23, 2024',
    client: 'Marcus Sterling',
    type: 'Linen Runner & Napkins',
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-forest-green',
    amount: '$42.00',
  },
];

const DeliveryEarnings = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState('30 Days');

  return (
    <div className="flex min-h-screen bg-[#faf8f5] font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-1">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-display-md text-sm font-bold text-charcoal">Julian V.</h2>
              <p className="text-[10px] text-forest-green font-semibold">Verified Premium Agent</p>
              <span className="px-2 py-0.5 rounded-full text-[8px] bg-emerald-50 text-forest-green font-bold uppercase mt-1 inline-block">Active Status</span>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/delivery/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/delivery/onboarding" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">description</span>
              My Documents
            </Link>
            <Link to="/delivery/availability" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Shift Schedule
            </Link>
            <Link to="/delivery/earnings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Earnings
            </Link>
            <Link to="/delivery/profile" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="font-display-md text-xs text-on-surface-variant italic px-1">
          Artisan Delivery
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
          <h1 className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal">
            Logistics Earnings
          </h1>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/help" className="text-on-surface-variant hover:text-charcoal">Help Center</Link>
            <button 
              onClick={() => navigate('/delivery/withdrawal')}
              className="px-4 py-2 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow"
            >
              Withdraw Funds
            </button>
          </div>
        </div>

        {/* 3 Metric Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                Current Balance
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-forest-green flex items-center justify-center">
                <span className="material-symbols-outlined text-base">account_balance_wallet</span>
              </div>
            </div>
            <h3 className="font-display-lg text-3xl font-bold text-charcoal">$2,485.50</h3>
            <p className="text-[11px] text-forest-green font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              Available for withdrawal
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                Weekly Earnings
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-base">payments</span>
              </div>
            </div>
            <h3 className="font-display-lg text-3xl font-bold text-charcoal">$842.12</h3>
            <p className="text-[11px] text-forest-green font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              +12% from last week
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                Total Deliveries
              </span>
              <div className="w-8 h-8 rounded-xl bg-surface-container text-charcoal flex items-center justify-center">
                <span className="material-symbols-outlined text-base">package_2</span>
              </div>
            </div>
            <h3 className="font-display-lg text-3xl font-bold text-charcoal">124</h3>
            <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-forest-green">check_circle</span>
              98% customer rating
            </p>
          </div>

        </div>

        {/* 2-Column Section: Earnings Over Time & Payout Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Earnings Over Time Line Chart */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display-md text-base font-bold text-charcoal">Earnings Over Time</h3>
                <p className="text-[11px] text-on-surface-variant">Tracking performance across the last 30 days</p>
              </div>
              <div className="flex bg-surface-container-low rounded-xl p-1 text-xs font-bold text-on-surface-variant">
                {['30 Days', '90 Days'].map(r => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`px-3 py-1 rounded-lg transition-all ${range === r ? 'bg-white shadow-sm text-charcoal' : 'hover:text-charcoal'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Smooth SVG spline curve */}
            <div className="h-56 relative pt-4 flex flex-col justify-between">
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#163428" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#163428" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 0 110 Q 120 100 180 110 T 350 30 T 450 100 T 500 40 L 500 150 L 0 150 Z" 
                  fill="url(#earnGrad)" 
                />
                <path 
                  d="M 0 110 Q 120 100 180 110 T 350 30 T 450 100 T 500 40" 
                  fill="none" 
                  stroke="#163428" 
                  strokeWidth="2.5" 
                />
                <circle cx="180" cy="110" r="4" fill="#ffffff" stroke="#163428" strokeWidth="2" />
                <circle cx="350" cy="30" r="4" fill="#ffffff" stroke="#163428" strokeWidth="2" />
                <circle cx="500" cy="40" r="4" fill="#163428" />
              </svg>

              <div className="flex justify-between text-[10px] text-on-surface-variant font-mono font-semibold pt-2 border-t border-outline-variant/20">
                <span>Sept 01</span>
                <span>Sept 10</span>
                <span>Sept 20</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* Right Cards: Payout Schedule & Top Performer */}
          <div className="lg:col-span-4 space-y-6 text-xs">
            
            {/* Payout Schedule Card */}
            <div className="bg-[#163428] text-white p-6 md:p-8 rounded-3xl space-y-4 shadow-md">
              <h4 className="font-display-md text-lg font-bold">Payout Schedule</h4>
              <p className="text-xs text-white/80 leading-relaxed font-body-md">
                Your next payout of <strong className="text-white">$1,240.00</strong> is scheduled for processing on Monday morning.
              </p>
              <button 
                onClick={() => alert('Early withdrawal processed')}
                className="w-full py-3 bg-[#b5d3c4] text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors shadow"
              >
                Withdraw Early
              </button>
            </div>

            {/* Top Performer Card */}
            <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30 space-y-2">
              <div className="flex items-center gap-1.5 text-forest-green font-bold uppercase tracking-wider text-[10px]">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>TOP PERFORMER</span>
              </div>
              <p className="text-[11px] text-charcoal italic leading-relaxed">
                "Julian's precision in handling ceramic deliveries has resulted in zero breakage reports this month."
              </p>
            </div>

          </div>

        </div>

        {/* Recent Delivery Payouts */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="p-6 pb-4 flex justify-between items-center">
            <h3 className="font-display-md text-base font-bold text-charcoal">Recent Delivery Payouts</h3>
            <button className="text-on-surface-variant hover:text-charcoal flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-sm">tune</span>
              FILTER
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-y border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">ORDER ID</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">CLIENT / TYPE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-right pr-6">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {RECENT_DELIVERY_PAYOUTS.map(p => (
                  <tr key={p.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-charcoal">{p.id}</td>
                    <td className="p-4 text-on-surface-variant">{p.date}</td>
                    <td className="p-4">
                      <h5 className="font-bold text-charcoal">{p.client}</h5>
                      <p className="text-[10px] text-on-surface-variant">{p.type}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${p.statusClass}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6 font-mono font-bold text-charcoal">
                      {p.amount}
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

export default DeliveryEarnings;
