import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RequestPayout = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('Chase Bank •••• 8942 (Checking)');
  const availableBalance = 4850.00;

  const handleMax = () => {
    setAmount(availableBalance.toFixed(2));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid payout amount.');
      return;
    }
    if (parseFloat(amount) > availableBalance) {
      alert('Requested amount exceeds available balance.');
      return;
    }
    alert(`Payout request of $${amount} submitted!`);
    navigate('/seller/earnings');
  };

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
            <Link to="/seller/request-payout" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Payouts
            </Link>
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
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
          className="w-full py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Create Listing
        </button>
      </aside>

      {/* Main Form Center */}
      <main className="flex-1 p-6 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white p-8 md:p-10 rounded-3xl border border-outline-variant/30 shadow-xl space-y-6">
          
          <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mx-auto text-forest-green">
            <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
          </div>

          <div className="text-center space-y-1">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              Available Balance
            </span>
            <h2 className="font-display-lg text-4xl font-bold text-charcoal">
              ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
          </div>

          <form onSubmit={handleConfirm} className="space-y-5 text-xs">
            
            {/* Withdrawal Amount */}
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                WITHDRAWAL AMOUNT
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display-md text-lg text-on-surface-variant">$</span>
                <input 
                  type="number" 
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl py-3.5 pl-8 pr-16 font-display-md text-lg font-bold text-charcoal focus:outline-none focus:border-forest-green"
                />
                <button 
                  type="button" 
                  onClick={handleMax}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-surface-container hover:bg-surface-container-high rounded-lg text-[10px] font-bold uppercase text-charcoal"
                >
                  Max
                </button>
              </div>
            </div>

            {/* Transfer To */}
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                TRANSFER TO
              </label>
              <select 
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-semibold text-charcoal focus:outline-none"
              >
                <option>Chase Bank &bull;&bull;&bull;&bull; 8942 (Checking)</option>
                <option>Wells Fargo &bull;&bull;&bull;&bull; 1044 (Savings)</option>
              </select>
            </div>

            {/* Calculations Box */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2 text-[11px]">
              <div className="flex justify-between text-on-surface-variant">
                <span>Processing Time</span>
                <span className="font-semibold text-charcoal">Standard (1-3 Days)</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Arrival</span>
                <span className="font-semibold text-charcoal">October 24, 2024</span>
              </div>
              <div className="pt-2 border-t border-outline-variant/20 flex justify-between font-bold text-charcoal text-xs">
                <span>TOTAL PAYOUT</span>
                <span className="font-mono text-sm">${amount ? parseFloat(amount).toFixed(2) : '0.00'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button 
                type="submit"
                className="w-full py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow flex items-center justify-center gap-2"
              >
                <span>Confirm Request</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button 
                type="button"
                onClick={() => navigate('/seller/earnings')}
                className="w-full py-3 border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
            </div>

            <p className="text-[10px] text-center text-on-surface-variant pt-2 leading-relaxed">
              By confirming, you agree to our <button type="button" onClick={() => alert('Payout Terms')} className="underline font-semibold text-charcoal">payout terms</button> and acknowledge standard banking delay times.
            </p>

          </form>

        </div>
      </main>

    </div>
  );
};

export default RequestPayout;
