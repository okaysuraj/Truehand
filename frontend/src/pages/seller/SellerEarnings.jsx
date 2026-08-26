import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RECENT_TRANSACTIONS = [
  {
    id: '#AS-98214',
    item: 'Hand-thrown Minimalist Vase',
    category: 'Ceramics • Large',
    amount: '$185.00',
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
  },
  {
    id: '#AS-98210',
    item: 'Organic Linen Napkin Set',
    category: 'Textiles • Set of 4',
    amount: '$64.00',
    status: 'Pending',
    statusClass: 'bg-surface-container text-on-surface-variant',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
  },
  {
    id: '#AS-98205',
    item: 'Walnut Salad Bowl',
    category: 'Woodwork • Hand-turned',
    amount: '$120.00',
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
  },
  {
    id: '#AS-98198',
    item: 'Brass Incense Holder',
    category: 'Metalwork • Brushed Finish',
    amount: '$45.00',
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-forest-green',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
  },
];

const SellerEarnings = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('M');

  return (
    <div className="flex min-h-screen bg-[#faf8f5] font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 rounded-xl bg-charcoal text-white flex items-center justify-center font-display-md text-base font-bold">
              A
            </div>
            <div>
              <h2 className="font-display-md text-sm font-bold text-charcoal">Studio Manager</h2>
              <p className="text-[10px] text-on-surface-variant font-mono">Handcrafted Excellence</p>
            </div>
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
            <Link to="/seller/earnings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Earnings
            </Link>
            <Link to="/seller/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">insights</span>
              Customer Insights
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <button 
          onClick={() => navigate('/seller/new-listing')}
          className="w-full py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow"
        >
          Create Listing
        </button>
      </aside>

      {/* Main Earnings Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-charcoal text-2xl">account_balance_wallet</span>
            <h1 className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal">Earnings</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-charcoal relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="w-2 h-2 rounded-full bg-red-600 absolute top-0 right-0" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container border border-outline-variant/30">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-semibold text-charcoal">Elena Rossi</span>
            </div>
          </div>
        </div>

        {/* 3 Bento Cards: Total Earnings / Net Revenue / Pending Payout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                TOTAL EARNINGS
              </span>
              <div className="flex items-baseline gap-3">
                <h2 className="font-display-lg text-4xl md:text-5xl font-bold text-charcoal">$12,480.00</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-forest-green">
                  &nearr; +14.2%
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => navigate('/seller/request-payout')}
                className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow"
              >
                Withdraw
              </button>
              <button 
                onClick={() => alert('Viewing monthly statements...')}
                className="px-6 py-2.5 border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
              >
                View Report
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-1">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                NET REVENUE
              </span>
              <h3 className="font-display-lg text-2xl font-bold text-charcoal">$10,608.00</h3>
              <p className="text-[10px] text-on-surface-variant italic">After 15% platform commission</p>
            </div>

            <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-1">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                PENDING PAYOUT
              </span>
              <h3 className="font-display-lg text-2xl font-bold text-charcoal">$2,140.50</h3>
              <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                Scheduled: Oct 15, 2024
              </p>
            </div>
          </div>

        </div>

        {/* Revenue Growth Chart */}
        <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display-md text-base font-bold text-charcoal">Revenue Growth</h3>
            <div className="flex bg-surface-container-low rounded-xl p-1 text-xs font-bold text-on-surface-variant">
              {['W', 'M', 'Y'].map(t => (
                <button
                  key={t}
                  onClick={() => setPeriod(t)}
                  className={`px-3 py-1 rounded-lg transition-all ${period === t ? 'bg-charcoal text-white' : 'hover:text-charcoal'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Bar graph bars */}
          <div className="h-48 flex items-end justify-between gap-4 pt-4 px-4">
            {[45, 60, 40, 70, 68, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full max-w-[48px] rounded-t-xl transition-all ${
                    i === 6 ? 'bg-forest-green' : i >= 3 ? 'bg-slate-400' : 'bg-slate-200'
                  }`}
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="p-6 pb-4 flex justify-between items-center">
            <h3 className="font-display-md text-base font-bold text-charcoal">Recent Transactions</h3>
            <button onClick={() => alert('Full transaction log')} className="text-forest-green font-bold hover:underline">
              View All Transactions
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-y border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">ITEM DETAILS</th>
                  <th className="p-4">ORDER ID</th>
                  <th className="p-4">AMOUNT</th>
                  <th className="p-4 text-right pr-6">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {RECENT_TRANSACTIONS.map(tx => (
                  <tr key={tx.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                          <img src={tx.image} alt={tx.item} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h5 className="font-bold text-charcoal">{tx.item}</h5>
                          <p className="text-[10px] text-on-surface-variant">{tx.category}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-semibold text-charcoal">
                      {tx.id}
                    </td>

                    <td className="p-4 font-bold text-charcoal font-mono">
                      {tx.amount}
                    </td>

                    <td className="p-4 text-right pr-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${tx.statusClass}`}>
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

export default SellerEarnings;
