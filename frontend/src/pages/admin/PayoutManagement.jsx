import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PAYOUT_REQUESTS = [
  {
    id: 1,
    artisan: 'Elias Woodworks',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
    available: '$3,450.00',
    requested: '$2,000.00',
    bank: '...4892',
    status: 'Pending',
    statusClass: 'bg-[#ffdecb] text-[#97472a]',
  },
  {
    id: 2,
    artisan: 'Lumina Textiles',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
    available: '$1,200.00',
    requested: '$1,200.00',
    bank: '...1034',
    status: 'Approved',
    statusClass: 'bg-emerald-50 text-forest-green',
  },
  {
    id: 3,
    artisan: 'Hearth Ceramics',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
    available: '$8,900.50',
    requested: '$5,000.00',
    bank: '...7712',
    status: 'Pending',
    statusClass: 'bg-[#ffdecb] text-[#97472a]',
  },
  {
    id: 4,
    artisan: 'Oakhaven Goods',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
    available: '$450.00',
    requested: '$800.00',
    bank: '...2291',
    status: 'Processed',
    statusClass: 'bg-surface-container text-on-surface-variant',
  },
];

const PayoutManagement = () => {
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [amountFilter, setAmountFilter] = useState('Any Amount');

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
            <Link to="/admin/payouts" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
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
          <span className="font-bold text-charcoal">Manager</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Export Action */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Payout Management
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
              Review and process artisan withdrawal requests.
            </p>
          </div>

          <button 
            onClick={() => alert('Exporting payout report...')}
            className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Export Report
          </button>
        </div>

        {/* 3 Metric Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div className="w-9 h-9 rounded-xl bg-[#ffdecb] text-[#97472a] flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">pending_actions</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-[#ffdecb] text-[#97472a]">
                Needs Action
              </span>
            </div>
            <div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Pending Payouts</span>
              <h3 className="font-display-lg text-3xl font-bold text-charcoal mt-0.5">24</h3>
            </div>
            <p className="text-[11px] text-on-surface-variant font-semibold">Totaling $12,450.00</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-forest-green flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">check_circle</span>
            </div>
            <div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Processed Today</span>
              <h3 className="font-display-lg text-3xl font-bold text-charcoal mt-0.5">18</h3>
            </div>
            <p className="text-[11px] text-on-surface-variant font-semibold">Totaling $8,200.00</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-surface-container text-charcoal flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
            </div>
            <div>
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Next Scheduled Run</span>
              <h3 className="font-display-lg text-3xl font-bold text-charcoal mt-0.5">Oct 24</h3>
            </div>
            <p className="text-[10px] text-on-surface-variant">Automated batch processing</p>
          </div>

        </div>

        {/* Filter Bar */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-outline-variant/40 rounded-xl p-2.5 text-xs font-semibold text-charcoal focus:outline-none shadow-sm"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Processed</option>
            </select>
            <select 
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="bg-white border border-outline-variant/40 rounded-xl p-2.5 text-xs font-semibold text-charcoal focus:outline-none shadow-sm"
            >
              <option>Any Amount</option>
              <option>&lt; $1,000</option>
              <option>$1,000 - $5,000</option>
              <option>&gt; $5,000</option>
            </select>
          </div>

          <button className="w-10 h-10 bg-white border border-outline-variant/40 rounded-xl flex items-center justify-center text-charcoal hover:bg-surface-container shadow-sm">
            <span className="material-symbols-outlined text-lg">tune</span>
          </button>
        </div>

        {/* Payouts Table */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">Artisan Name</th>
                  <th className="p-4">Available Balance</th>
                  <th className="p-4">Requested Amount</th>
                  <th className="p-4">Bank Details</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {PAYOUT_REQUESTS.map(req => (
                  <tr key={req.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                          <img src={req.avatar} alt={req.artisan} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-charcoal">{req.artisan}</span>
                      </div>
                    </td>

                    <td className="p-4 font-mono text-on-surface-variant font-semibold">
                      {req.available}
                    </td>

                    <td className="p-4 font-mono font-bold text-charcoal">
                      {req.requested}
                    </td>

                    <td className="p-4 text-on-surface-variant flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-sm">account_balance</span>
                      {req.bank}
                    </td>

                    <td className="p-4">
                      <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${req.statusClass}`}>
                        {req.status}
                      </span>
                    </td>

                    <td className="p-4 text-right pr-6">
                      {req.status === 'Pending' ? (
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => alert(`Approved payout for ${req.artisan}`)} className="text-forest-green font-bold hover:underline">
                            Approve
                          </button>
                          <span className="text-outline-variant">&bull;</span>
                          <button onClick={() => alert(`Denied payout for ${req.artisan}`)} className="text-terracotta font-bold hover:underline">
                            Deny
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => alert(`View receipt for ${req.artisan}`)} className="text-on-surface-variant font-semibold hover:text-charcoal">
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 px-6 border-t border-outline-variant/20 flex justify-between items-center text-xs text-on-surface-variant">
            <span>Showing 1 to 4 of 24 entries</span>
            <div className="flex items-center gap-1 font-semibold">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container">&lt;</button>
              <button className="w-8 h-8 rounded-lg bg-surface-container text-charcoal font-bold">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container">2</button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container">3</button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container">&gt;</button>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};

export default PayoutManagement;
