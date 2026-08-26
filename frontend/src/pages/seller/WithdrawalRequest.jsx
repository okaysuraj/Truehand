import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ACCOUNTS = [
  {
    id: 'linen',
    bank: 'Linen Heritage Bank',
    type: 'Personal Checking •••• 8291',
    icon: 'account_balance',
  },
  {
    id: 'credit_union',
    bank: 'Artisan Credit Union',
    type: 'Business Savings •••• 1044',
    icon: 'savings',
  },
];

const WithdrawalRequest = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('linen');
  const availableBalance = 4280.50;

  const handleWithdrawAll = () => {
    setAmount(availableBalance.toFixed(2));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid withdrawal amount.');
      return;
    }
    if (parseFloat(amount) > availableBalance) {
      alert('Requested amount exceeds available balance.');
      return;
    }
    alert(`Withdrawal of $${amount} requested successfully!`);
    navigate('/delivery/earnings');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Form Center */}
      <main className="flex-1 max-w-xl w-full mx-auto p-6 md:p-10 space-y-6">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-forest-green transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Dashboard
        </button>

        {/* Withdrawal Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-outline-variant/30 shadow-xl space-y-6 relative overflow-hidden">
          
          {/* Watermark Bank Icon */}
          <div className="absolute top-6 right-6 opacity-10 text-charcoal pointer-events-none">
            <span className="material-symbols-outlined text-8xl">account_balance</span>
          </div>

          <div className="space-y-1">
            <h1 className="font-display-lg text-3xl font-bold text-charcoal">
              Withdraw Funds
            </h1>
            <p className="font-body-md text-xs text-on-surface-variant">
              Transfer your earnings to your verified bank account.
            </p>
          </div>

          {/* Available Balance Strip */}
          <div className="p-4 rounded-2xl bg-surface-container-low/80 border border-outline-variant/20 flex justify-between items-center text-xs">
            <div>
              <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                AVAILABLE BALANCE
              </span>
              <h3 className="font-display-lg text-2xl font-bold text-charcoal mt-0.5">
                ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-forest-green">
              VERIFIED
            </span>
          </div>

          <form onSubmit={handleConfirm} className="space-y-6 text-xs">
            
            {/* Withdrawal Amount Box */}
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                Withdrawal Amount
              </label>
              <div className="p-4 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest flex items-center gap-2">
                <span className="font-display-md text-2xl text-on-surface-variant/60">$</span>
                <input 
                  type="number" 
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent font-display-lg text-3xl font-bold text-charcoal focus:outline-none placeholder:text-on-surface-variant/30"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-semibold pt-1">
                <span>Daily Limit: $10,000.00</span>
                <button type="button" onClick={handleWithdrawAll} className="text-forest-green font-bold hover:underline">
                  Withdraw All
                </button>
              </div>
            </div>

            {/* Destination Account Selection */}
            <div className="space-y-3">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                Destination Account
              </label>

              <div className="space-y-2">
                {ACCOUNTS.map(acc => (
                  <div
                    key={acc.id}
                    onClick={() => setSelectedAccount(acc.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${
                      selectedAccount === acc.id 
                        ? 'border-charcoal bg-surface-container-lowest shadow-sm' 
                        : 'border-outline-variant/30 hover:border-outline-variant'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-charcoal">
                        <span className="material-symbols-outlined text-lg">{acc.icon}</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-charcoal text-xs">{acc.bank}</h5>
                        <p className="text-[10px] text-on-surface-variant">{acc.type}</p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAccount === acc.id ? 'border-charcoal bg-charcoal text-white' : 'border-outline-variant'
                    }`}>
                      {selectedAccount === acc.id && (
                        <span className="material-symbols-outlined text-xs">check</span>
                      )}
                    </div>
                  </div>
                ))}

                <button 
                  type="button" 
                  onClick={() => alert('Add bank account modal')}
                  className="w-full p-3.5 border-2 border-dashed border-outline-variant/60 rounded-2xl text-center font-bold text-charcoal hover:border-forest-green transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  Add New Account
                </button>
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/20 space-y-2 text-[11px]">
              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Arrival</span>
                <span className="font-semibold text-charcoal">Tomorrow, Sept 14</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Processing Fee</span>
                <span className="font-semibold text-charcoal font-mono">$0.00</span>
              </div>
              <div className="pt-2 border-t border-outline-variant/20 flex justify-between font-bold text-charcoal text-xs">
                <span>Total Withdrawal</span>
                <span className="font-mono text-sm">${amount ? parseFloat(amount).toFixed(2) : '0.00'}</span>
              </div>
            </div>

            {/* Action CTA */}
            <button 
              type="submit"
              className="w-full py-4 bg-forest-green text-white rounded-2xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow flex items-center justify-center gap-2"
            >
              <span>Confirm Withdrawal</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>

            <p className="text-[10px] text-center text-on-surface-variant pt-2 leading-relaxed">
              By confirming, you agree to our <button type="button" onClick={() => alert('Terms of Service')} className="underline font-semibold text-charcoal">Terms of Service</button>. Transfers to bank accounts typically take 1-3 business days.
            </p>

          </form>

        </div>

        {/* Footer Support Links */}
        <div className="flex justify-center items-center gap-6 text-xs text-on-surface-variant font-semibold pt-2">
          <button onClick={() => alert('Need help? Contact support')} className="flex items-center gap-1 hover:text-charcoal">
            <span className="material-symbols-outlined text-sm">help</span>
            Need Help?
          </button>
          <span>&bull;</span>
          <button onClick={() => alert('Withdrawal Policy')} className="flex items-center gap-1 hover:text-charcoal">
            <span className="material-symbols-outlined text-sm">description</span>
            Withdrawal Policy
          </button>
        </div>

      </main>

    </div>
  );
};

export default WithdrawalRequest;
