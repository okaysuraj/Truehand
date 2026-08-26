import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const SAMPLE_TRANSACTIONS = {
  today: [
    {
      id: 1,
      name: 'Hand-thrown Ceramic Bowl (Large)',
      subtitle: 'Order #AS-88219 • 10:45 AM',
      status: 'Cleared',
      statusColor: 'bg-emerald-100 text-emerald-800',
      amount: 124.00,
      type: 'credit',
      label: 'Stripe Payout',
      icon: 'account_balance_wallet',
    },
    {
      id: 2,
      name: 'Platform Processing Fee',
      subtitle: 'Order #AS-88219 • 10:45 AM',
      status: 'Cleared',
      statusColor: 'bg-emerald-100 text-emerald-800',
      amount: -3.72,
      type: 'debit',
      label: 'ArtisanStudio Fee',
      icon: 'receipt',
    },
  ],
  yesterday: [
    {
      id: 3,
      name: 'Minimalist Walnut Floating Shelf',
      subtitle: 'Order #AS-88210 • 04:22 PM',
      status: 'Pending',
      statusColor: 'bg-amber-100 text-amber-900',
      amount: 340.00,
      type: 'credit',
      label: 'Customer Payment',
      icon: 'account_balance_wallet',
    },
    {
      id: 4,
      name: 'Weekly Payout Transfer',
      subtitle: 'Transfer ID #TR-1192 • 09:15 AM',
      status: 'Processing',
      statusColor: 'bg-blue-100 text-blue-800',
      amount: -1250.00,
      type: 'debit',
      label: 'to Chase Bank (...4421)',
      icon: 'payments',
    },
  ],
  oct21: [
    {
      id: 5,
      name: 'Linen Throw Pillow Case (Set of 2)',
      subtitle: 'Order #AS-88195 • 02:10 PM',
      status: 'Cleared',
      statusColor: 'bg-emerald-100 text-emerald-800',
      amount: 85.00,
      type: 'credit',
      label: 'Stripe Payout',
      icon: 'account_balance_wallet',
    },
    {
      id: 6,
      name: 'Platform Processing Fee',
      subtitle: 'Order #AS-88195 • 02:10 PM',
      status: 'Cleared',
      statusColor: 'bg-emerald-100 text-emerald-800',
      amount: -2.55,
      type: 'debit',
      label: 'ArtisanStudio Fee',
      icon: 'receipt',
    },
  ],
};

const TransactionHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [data, setData] = useState(SAMPLE_TRANSACTIONS);

  useEffect(() => {
    if (user?.id) {
      api.get(`/wallet/${user.id}/transactions`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            // keep populated
          }
        })
        .catch(e => console.warn(e));
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Studio Manager Sidebar */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-forest-green">Studio Manager</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Handcrafted Excellence</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/seller/inventory" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-outline-variant/20">
          <Link to="/new-listing" className="w-full py-3 bg-forest-green text-white rounded-lg text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow">
            Create Listing
          </Link>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold text-forest-green">
              AS
            </div>
            <div>
              <p className="font-label-md text-xs font-bold text-forest-green">Artisan Studio</p>
              <p className="text-[10px] text-on-surface-variant">Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 max-w-5xl">
        
        {/* Header with Search and Export */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <h1 className="font-display-lg text-2xl md:text-4xl text-forest-green font-bold">
            Transaction History
          </h1>

          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input 
                type="text" 
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border border-outline-variant/40 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-forest-green"
              />
            </div>
            <button 
              onClick={() => alert('Exporting transactions as CSV...')}
              className="px-4 py-2 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all flex items-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export CSV
            </button>
          </div>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center gap-3 mb-10 text-xs font-semibold">
          <button className="px-4 py-2 bg-white rounded-lg border border-outline-variant/40 flex items-center gap-2 text-charcoal shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">calendar_today</span>
            Date Range: Last 30 Days
          </button>
          <button className="px-4 py-2 bg-white rounded-lg border border-outline-variant/40 flex items-center gap-2 text-charcoal shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">filter_list</span>
            Status: All
          </button>
          <button className="px-4 py-2 bg-white rounded-lg border border-outline-variant/40 flex items-center gap-2 text-charcoal shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">category</span>
            Type: All Types
          </button>
          <button 
            onClick={() => setSearch('')}
            className="text-on-surface-variant hover:text-forest-green underline font-medium ml-auto"
          >
            Reset Filters
          </button>
        </div>

        {/* Transactions Feed Grouped by Day */}
        <div className="space-y-8">
          
          {/* Today */}
          <div>
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Today
            </span>
            <div className="space-y-3">
              {data.today.map(tx => (
                <div key={tx.id} className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-green shrink-0">
                      <span className="material-symbols-outlined text-lg">{tx.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-xs sm:text-sm font-bold text-charcoal">{tx.name}</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">{tx.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${tx.statusColor}`}>
                      {tx.status}
                    </span>
                    <div className="text-right">
                      <span className={`font-headline-md text-sm font-bold block ${tx.amount > 0 ? 'text-charcoal' : 'text-charcoal'}`}>
                        {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">{tx.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Yesterday */}
          <div>
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Yesterday
            </span>
            <div className="space-y-3">
              {data.yesterday.map(tx => (
                <div key={tx.id} className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-green shrink-0">
                      <span className="material-symbols-outlined text-lg">{tx.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-xs sm:text-sm font-bold text-charcoal">{tx.name}</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">{tx.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${tx.statusColor}`}>
                      {tx.status}
                    </span>
                    <div className="text-right">
                      <span className="font-headline-md text-sm font-bold text-charcoal block">
                        {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">{tx.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Oct 21 */}
          <div>
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
              Oct 21
            </span>
            <div className="space-y-3">
              {data.oct21.map(tx => (
                <div key={tx.id} className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-green shrink-0">
                      <span className="material-symbols-outlined text-lg">{tx.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-xs sm:text-sm font-bold text-charcoal">{tx.name}</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">{tx.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${tx.statusColor}`}>
                      {tx.status}
                    </span>
                    <div className="text-right">
                      <span className="font-headline-md text-sm font-bold text-charcoal block">
                        {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">{tx.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => alert('Loading older transactions...')}
            className="px-8 py-3 bg-white border border-outline-variant text-charcoal rounded-xl font-label-md text-xs font-semibold hover:bg-surface-container transition-all shadow-sm"
          >
            Load More Transactions
          </button>
        </div>

      </main>

    </div>
  );
};

export default TransactionHistory;
