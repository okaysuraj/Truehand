import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PENDING_REFUNDS = [
  {
    id: 'ORD-9938',
    reason: 'Damaged in Transit',
    product: 'Hand-thrown Ceramic Vase',
    customer: 'Eleanor Vance',
    timeAgo: 'Requested 2 hours ago',
    originalAmount: '$145.00',
    requestedRefund: '$145.00',
    gatewayLog: 'Confirmed Match',
  },
  {
    id: 'ORD-9932',
    reason: 'Item Not as Described',
    product: 'Walnut Coffee Scoop',
    customer: 'Marcus Chen',
    timeAgo: 'Requested 4 hours ago',
    originalAmount: '$45.00',
    requestedRefund: '$45.00',
    gatewayLog: 'Confirmed Match',
  },
];

const RefundApproval = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Awaiting Review');
  const [refunds, setRefunds] = useState(PENDING_REFUNDS);

  const handleApprove = (id) => {
    alert(`Refund for order #${id} approved successfully.`);
    setRefunds(refunds.filter(r => r.id !== id));
  };

  const handleDeny = (id) => {
    alert(`Refund for order #${id} denied.`);
    setRefunds(refunds.filter(r => r.id !== id));
  };

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
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/finances" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-outline-variant/20">
          <Link to="/storefront-preview" className="w-full py-2.5 border border-charcoal text-charcoal rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all flex items-center justify-center">
            View Storefront
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        
        {/* Header & Stats Cards */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">
          <div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              Awaiting Review
            </span>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Refund Hub
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Manage and process customer refund requests.
            </p>
          </div>

          <div className="flex gap-4 self-start md:self-auto">
            <div className="bg-white p-4 px-6 rounded-2xl border border-outline-variant/30 shadow-sm text-center">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Pending</span>
              <span className="font-display-lg text-2xl font-bold text-charcoal">12</span>
            </div>
            <div className="bg-white p-4 px-6 rounded-2xl border border-outline-variant/30 shadow-sm text-center">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Processed Today</span>
              <span className="font-display-lg text-2xl font-bold text-forest-green">8</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 text-xs font-semibold border-b border-outline-variant/20 mb-8 pb-3">
          {['Awaiting Review', 'Approved', 'Processed'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`transition-colors pb-1 ${
                activeTab === tab 
                  ? 'text-charcoal border-b-2 border-charcoal font-bold' 
                  : 'text-on-surface-variant hover:text-charcoal'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Refunds List */}
        <div className="space-y-4">
          {refunds.map(ref => (
            <div key={ref.id} className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-md text-xs font-bold text-charcoal">{ref.id}</span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-red-50 text-red-600">
                      {ref.reason}
                    </span>
                  </div>
                  <h4 className="font-headline-md text-sm font-bold text-charcoal">{ref.product}</h4>
                  <p className="text-[11px] text-on-surface-variant">Customer: <strong className="text-charcoal">{ref.customer}</strong> &bull; {ref.timeAgo}</p>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Original Amount: {ref.originalAmount}</span>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Requested Refund: <strong className="font-display-lg text-base text-forest-green">{ref.requestedRefund}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-on-surface-variant text-[11px]">
                  <span className="material-symbols-outlined text-base text-forest-green">receipt</span>
                  <span>Gateway Log: <strong className="text-charcoal">{ref.gatewayLog}</strong></span>
                </div>

                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button 
                    onClick={() => handleDeny(ref.id)}
                    className="px-6 py-2.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
                  >
                    &times; Deny
                  </button>
                  <button 
                    onClick={() => alert(`Partial refund dialog opened for order ${ref.id}`)}
                    className="px-5 py-2.5 border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
                  >
                    Partial...
                  </button>
                  <button 
                    onClick={() => handleApprove(ref.id)}
                    className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
                  >
                    Approve Full
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
};

export default RefundApproval;
