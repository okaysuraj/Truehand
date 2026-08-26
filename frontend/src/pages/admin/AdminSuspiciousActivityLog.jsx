import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SUSPICIOUS_INCIDENTS = [
  {
    id: 'INC-2204',
    userId: 'USR-8924-A',
    activityType: 'Rapid Transactions',
    typeClass: 'bg-red-50 text-red-600',
    icon: 'warning',
    riskScore: 88,
    scoreClass: 'border-red-600 text-red-600 bg-red-50/20',
    timestamp: 'Oct 24, 2023 14:32 EST',
  },
  {
    id: 'INC-2205',
    userId: 'USR-4410-B',
    activityType: 'Address Mismatch',
    typeClass: 'bg-amber-50 text-amber-700',
    icon: 'location_off',
    riskScore: 65,
    scoreClass: 'border-amber-600 text-amber-700 bg-amber-50/20',
    timestamp: 'Oct 24, 2023 11:15 EST',
  },
  {
    id: 'INC-2206',
    userId: 'USR-1192-C',
    activityType: 'Multiple Logins',
    typeClass: 'bg-red-50 text-red-700',
    icon: 'login',
    riskScore: 92,
    scoreClass: 'border-red-700 text-red-700 bg-red-50/30',
    timestamp: 'Oct 23, 2023 23:55 EST',
  },
];

const AdminSuspiciousActivityLog = () => {
  const navigate = useNavigate();

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
            <Link to="/adminsuspiciousactivitylog" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">security</span>
              Suspicious Activity
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
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Top Search bar */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search activities, user IDs..."
              className="w-full bg-white border border-outline-variant/40 rounded-full py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-forest-green shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-on-surface-variant hover:text-charcoal rounded-full hover:bg-white relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-charcoal rounded-full hover:bg-white">
              <span className="material-symbols-outlined text-xl">help</span>
            </button>
          </div>
        </div>

        {/* Header & Filter/Sort */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Suspicious Activity Review
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Monitor and adjudicate flagged behaviors across the artisan network.
            </p>
          </div>

          <div className="flex gap-2 shrink-0 text-xs font-semibold">
            <button className="px-4 py-2 bg-white rounded-lg border border-outline-variant/40 text-charcoal hover:bg-surface-container flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-base text-on-surface-variant">tune</span>
              Filter
            </button>
            <button className="px-4 py-2 bg-white rounded-lg border border-outline-variant/40 text-charcoal hover:bg-surface-container flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-base text-on-surface-variant">sort</span>
              Sort
            </button>
          </div>
        </div>

        {/* Activity Table */}
        <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">User &amp; Incident ID</th>
                  <th className="p-4">Activity Type</th>
                  <th className="p-4 text-center">Risk Score</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {SUSPICIOUS_INCIDENTS.map(inc => (
                  <tr key={inc.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6">
                      <h4 className="font-headline-md text-xs font-bold text-charcoal">{inc.userId}</h4>
                      <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">{inc.id}</p>
                    </td>

                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold ${inc.typeClass}`}>
                        <span className="material-symbols-outlined text-[14px]">{inc.icon}</span>
                        <span>{inc.activityType}</span>
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-8 rounded-lg border-2 font-display-md text-sm font-bold ${inc.scoreClass}`}>
                        {inc.riskScore}
                      </span>
                    </td>

                    <td className="p-4 text-on-surface-variant font-mono text-[11px]">
                      {inc.timestamp}
                    </td>

                    <td className="p-4 text-right pr-6">
                      <button 
                        onClick={() => alert(`Reviewing incident ${inc.id}`)}
                        className="px-4 py-1.5 bg-forest-green text-white rounded-lg font-bold text-[11px] hover:opacity-90 transition-all shadow"
                      >
                        Review
                      </button>
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

export default AdminSuspiciousActivityLog;
