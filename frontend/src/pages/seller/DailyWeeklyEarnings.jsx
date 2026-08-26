import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DAILY_BREAKDOWN = [
  {
    date: 'Friday, Oct 27',
    deliveries: 12,
    basePay: '$192.00',
    tips: '$138.50',
    bonuses: '+$45.00',
    total: '$375.50',
    highlight: true,
  },
  {
    date: 'Thursday, Oct 26',
    deliveries: 9,
    basePay: '$144.00',
    tips: '$116.00',
    bonuses: '+$25.00',
    total: '$285.00',
  },
  {
    date: 'Wednesday, Oct 25',
    deliveries: 6,
    basePay: '$96.00',
    tips: '$84.00',
    bonuses: '+$30.00',
    total: '$210.00',
  },
  {
    date: 'Tuesday, Oct 24',
    deliveries: 8,
    basePay: '$128.00',
    tips: '$112.00',
    bonuses: '—',
    total: '$240.00',
  },
  {
    date: 'Monday, Oct 23',
    deliveries: 7,
    basePay: '$112.00',
    tips: '$68.00',
    bonuses: '—',
    total: '$180.00',
  },
];

const DailyWeeklyEarnings = () => {
  const [trendView, setTrendView] = useState('Daily');

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 space-y-8">
        
        {/* Header & Export Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-on-surface-variant font-mono">Oct 23 &mdash; Oct 29</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffdecb] text-[#97472a]">
                &nearr; +12% vs Last Week
              </span>
            </div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Weekly Earnings
            </h1>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Exporting CSV statements...')}
              className="px-5 py-2.5 bg-white border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors shadow-sm"
            >
              Export CSV
            </button>
            <button 
              onClick={() => alert('Instant cash out initiated')}
              className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
            >
              Cash Out Now
            </button>
          </div>
        </div>

        {/* 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2 relative overflow-hidden">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              NET EARNINGS
            </span>
            <h3 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">$1,428.50</h3>
            <p className="text-[11px] text-forest-green font-semibold flex items-center gap-1 pt-1">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Verified &amp; ready for payout
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              DELIVERIES COMPLETED
            </span>
            <h3 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">42</h3>
            <div className="space-y-1">
              <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-charcoal h-1.5 rounded-full w-[84%]" />
              </div>
              <p className="text-[10px] text-on-surface-variant italic font-semibold">84% of Weekly Goal (50)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              ACTIVE BONUSES
            </span>
            <h3 className="font-display-lg text-3xl md:text-4xl font-bold text-terracotta">$215.00</h3>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded bg-[#ffdecb] text-[#97472a] text-[9px] uppercase font-bold">
                PEAK HOUR BOOST
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-forest-green text-[9px] uppercase font-bold">
                WEEKEND WARRIOR
              </span>
            </div>
          </div>

        </div>

        {/* 2-Column Section: Earnings Trend & Promotions Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Earnings Trend Chart */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-display-md text-base font-bold text-charcoal">Earnings Trend</h3>
              <div className="flex bg-surface-container-low rounded-xl p-1 text-xs font-bold text-on-surface-variant">
                {['Daily', 'Weekly'].map(v => (
                  <button
                    key={v}
                    onClick={() => setTrendView(v)}
                    className={`px-3 py-1 rounded-lg transition-all ${trendView === v ? 'bg-white shadow-sm text-charcoal' : 'hover:text-charcoal'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-4 pt-6 px-4">
              {[
                { day: 'Mon', height: 40, val: '$180' },
                { day: 'Tue', height: 50, val: '$240' },
                { day: 'Wed', height: 45, val: '$210' },
                { day: 'Thu', height: 65, val: '$285' },
                { day: 'Fri', height: 95, val: '$375', active: true },
                { day: 'Sat', height: 60, val: '$260' },
                { day: 'Sun', height: 35, val: '$150' },
              ].map(bar => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                  {bar.active && (
                    <span className="px-2 py-0.5 rounded bg-charcoal text-white text-[9px] font-bold font-mono">
                      {bar.val}
                    </span>
                  )}
                  <div 
                    className={`w-full max-w-[56px] rounded-t-xl transition-all ${
                      bar.active ? 'bg-forest-green' : 'bg-surface-container-high'
                    }`}
                    style={{ height: `${bar.height}%` }}
                  />
                  <span className={`text-[10px] font-bold ${bar.active ? 'text-forest-green' : 'text-on-surface-variant'}`}>
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Upcoming Promotions & Support */}
          <div className="lg:col-span-4 space-y-6 text-xs">
            
            {/* Upcoming Promotions */}
            <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30 space-y-4">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                UPCOMING PROMOTIONS
              </span>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-terracotta text-lg shrink-0">bolt</span>
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-charcoal">Saturday Lunch Surge</h5>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      Earn +$3.00 per delivery from 11AM - 2PM tomorrow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-forest-green text-lg shrink-0">military_tech</span>
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-charcoal">50-Trip Milestone</h5>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      Complete 8 more deliveries to unlock a $50.00 bonus.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings Support */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                EARNINGS SUPPORT
              </span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Have questions about a specific transaction or adjustment?
              </p>
              <button 
                onClick={() => alert('Contacting earnings specialist...')}
                className="w-full py-2.5 border border-charcoal text-charcoal rounded-xl font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Contact Specialist
              </button>
            </div>

          </div>

        </div>

        {/* Daily Breakdown Table */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="p-6 pb-4 flex justify-between items-center">
            <h3 className="font-display-md text-base font-bold text-charcoal">Daily Breakdown</h3>
            <button className="text-forest-green font-bold hover:underline flex items-center gap-1">
              View History
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-y border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">DATE</th>
                  <th className="p-4">DELIVERIES</th>
                  <th className="p-4">BASE PAY</th>
                  <th className="p-4">TIPS</th>
                  <th className="p-4">BONUSES</th>
                  <th className="p-4 text-right pr-6">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {DAILY_BREAKDOWN.map(row => (
                  <tr key={row.date} className={`hover:bg-surface-container-low/30 transition-colors ${row.highlight ? 'bg-emerald-50/20' : ''}`}>
                    <td className="p-4 pl-6 font-bold text-charcoal">{row.date}</td>
                    <td className="p-4 font-mono font-semibold">{row.deliveries}</td>
                    <td className="p-4 font-mono text-on-surface-variant">{row.basePay}</td>
                    <td className="p-4 font-mono text-on-surface-variant">{row.tips}</td>
                    <td className="p-4">
                      {row.bonuses !== '—' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-forest-green font-mono">
                          {row.bonuses}
                        </span>
                      ) : (
                        <span className="text-on-surface-variant/60 font-mono">—</span>
                      )}
                    </td>
                    <td className="p-4 text-right pr-6 font-mono font-bold text-charcoal">
                      {row.total}
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

export default DailyWeeklyEarnings;
