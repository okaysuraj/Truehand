import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const REVIEW_QUEUE = [
  {
    id: 'TXN-8924A',
    score: 94,
    scoreClass: 'text-red-600',
    description: 'Velocity limit exceeded. Multiple IP origins.',
    timeAgo: '10 mins ago',
  },
  {
    id: 'TXN-8921B',
    score: 82,
    scoreClass: 'text-red-600',
    description: 'Billing/Shipping mismatch. New device.',
    timeAgo: '45 mins ago',
  },
  {
    id: 'USR-2041',
    score: 78,
    scoreClass: 'text-amber-700',
    description: 'Suspicious account creation pattern.',
    timeAgo: '2 hours ago',
  },
];

const FraudDetection = () => {
  const [timeFilter, setTimeFilter] = useState('7d');

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisan Admin</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Quiet Luxury Management</p>
          </div>

          <Link to="/new-listing" className="w-full bg-forest-green text-white py-2.5 px-4 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow">
            <span className="material-symbols-outlined text-sm">add</span>
            Add New Product
          </Link>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">group</span>
              Users
            </Link>
            <Link to="/admin/fraud-detection" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">gpm</span>
              Safety &amp; Fraud
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

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Export */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Security &amp; Fraud Overview
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Real-time monitoring of platform integrity and transaction risk.
            </p>
          </div>

          <button 
            onClick={() => alert('Exporting fraud report...')}
            className="px-5 py-2.5 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Export Report
          </button>
        </div>

        {/* 4 Metric Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">System Health Score</span>
              <span className="p-1 rounded-full bg-emerald-50 text-forest-green"><span className="material-symbols-outlined text-sm">shield</span></span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-charcoal">98.4%</h3>
            <span className="text-[11px] text-emerald-700 font-semibold">&uarr; +0.2% from last week</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Flagged Transactions</span>
              <span className="p-1 rounded-full bg-red-50 text-red-600"><span className="material-symbols-outlined text-sm">warning</span></span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-charcoal">24</h3>
            <span className="text-[11px] text-red-600 font-semibold">&uarr; +5 needing review</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Blocked IPs (24H)</span>
              <span className="p-1 rounded-full bg-amber-50 text-amber-800"><span className="material-symbols-outlined text-sm">block</span></span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-charcoal">142</h3>
            <span className="text-[11px] text-on-surface-variant font-semibold">Normal volume</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Active Monitoring</span>
              <span className="p-1 rounded-full bg-emerald-50 text-forest-green"><span className="material-symbols-outlined text-sm">radar</span></span>
            </div>
            <h3 className="font-display-lg text-2xl font-bold text-forest-green">Online</h3>
            <span className="text-[11px] text-on-surface-variant font-semibold">All AI models active</span>
          </div>

        </div>

        {/* 2-Column Section: Risk Score Distribution & Review Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Risk Score Distribution Chart */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-display-md text-base font-bold text-charcoal">Transaction Risk Score Distribution</h3>
              <div className="flex bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/30 font-semibold">
                {['24h', '7d', '30d'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeFilter(t)}
                    className={`px-3 py-1 rounded-md text-[11px] ${
                      timeFilter === t ? 'bg-charcoal text-white font-bold' : 'text-on-surface-variant'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Bars */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 px-4">
              <div className="flex-1 bg-[#a3c2b2] rounded-t-xl h-[85%]" />
              <div className="flex-1 bg-[#a3c2b2] rounded-t-xl h-[95%]" />
              <div className="flex-1 bg-[#a3c2b2] rounded-t-xl h-[75%]" />
              <div className="flex-1 bg-[#f5b8a0] rounded-t-xl h-[30%]" />
              <div className="flex-1 bg-[#f5b8a0] rounded-t-xl h-[20%]" />
              <div className="flex-1 bg-[#fccbc3] rounded-t-xl h-[10%]" />
              <div className="flex-1 bg-[#fccbc3] rounded-t-xl h-[5%]" />
            </div>

            <div className="flex justify-between items-center text-[11px] font-semibold pt-3 border-t border-outline-variant/20">
              <span className="flex items-center gap-1.5 text-charcoal">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a3c2b2]" />
                Low Risk (0-30)
              </span>
              <span className="flex items-center gap-1.5 text-charcoal">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5b8a0]" />
                Elevated (31-70)
              </span>
              <span className="flex items-center gap-1.5 text-charcoal">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fccbc3]" />
                High Risk (71-100)
              </span>
            </div>
          </div>

          {/* Review Queue */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display-md text-base font-bold text-charcoal">Review Queue</h3>
                <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-red-50 text-red-600">
                  5 Critical
                </span>
              </div>

              <div className="space-y-3">
                {REVIEW_QUEUE.map(q => (
                  <div key={q.id} className="p-4 rounded-xl border border-outline-variant/30 space-y-1 hover:bg-surface-container-low transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-charcoal font-mono">{q.id}</span>
                      <span className={`font-bold font-mono text-[11px] ${q.scoreClass}`}>Score: {q.score}</span>
                    </div>
                    <p className="text-[11px] text-charcoal leading-relaxed">{q.description}</p>
                    <span className="text-[10px] text-on-surface-variant block mt-1">{q.timeAgo}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => alert('All flags view')}
              className="w-full py-2.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors mt-4"
            >
              View All Flags
            </button>
          </div>

        </div>

      </main>

    </div>
  );
};

export default FraudDetection;
