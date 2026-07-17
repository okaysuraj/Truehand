import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DeliveryEarnings = () => {
  const [period, setPeriod] = useState('today');

  const earnings = {
    today: { total: 87.50, deliveries: 7, tips: 22.00, hours: 5.5 },
    week: { total: 542.00, deliveries: 42, tips: 138.00, hours: 34 },
    month: { total: 2180.00, deliveries: 168, tips: 560.00, hours: 142 }
  };

  const current = earnings[period];

  const recentPayouts = [
    { id: 'PO-110', date: 'Oct 25, 2023', amount: 680.00, status: 'Completed', method: 'Bank Transfer' },
    { id: 'PO-108', date: 'Oct 18, 2023', amount: 520.00, status: 'Completed', method: 'Bank Transfer' },
    { id: 'PO-105', date: 'Oct 11, 2023', amount: 610.00, status: 'Completed', method: 'Bank Transfer' }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/delivery/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Dashboard
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Earnings</h1>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          {['today', 'week', 'month'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-5 py-2 rounded-full font-label-md capitalize transition-colors ${
              period === p ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
            }`}>This {p === 'today' ? 'Today' : p}</button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Earned', value: `$${current.total.toFixed(2)}`, icon: 'payments', color: 'text-forest-green' },
            { label: 'Deliveries', value: current.deliveries, icon: 'local_shipping', color: 'text-charcoal' },
            { label: 'Tips', value: `$${current.tips.toFixed(2)}`, icon: 'volunteer_activism', color: 'text-amber-600' },
            { label: 'Hours Active', value: `${current.hours}h`, icon: 'schedule', color: 'text-blue-600' }
          ].map((s, i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className={`material-symbols-outlined text-[18px] ${s.color}`}>{s.icon}</span>
                <span className="font-label-sm text-on-surface-variant">{s.label}</span>
              </div>
              <p className="font-headline-md text-headline-md text-on-surface">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Payouts */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Payout History</h2>
            <button className="text-forest-green font-label-sm hover:underline">Request Payout</button>
          </div>
          <div className="divide-y divide-outline-variant/20">
            {recentPayouts.map(payout => (
              <div key={payout.id} className="p-5 flex justify-between items-center">
                <div>
                  <p className="font-label-md text-on-surface">{payout.id}</p>
                  <p className="font-body-sm text-on-surface-variant">{payout.date} · {payout.method}</p>
                </div>
                <div className="text-right">
                  <p className="font-label-md text-on-surface">${payout.amount.toFixed(2)}</p>
                  <p className="font-label-sm text-forest-green">{payout.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryEarnings;
