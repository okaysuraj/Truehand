import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const TRANSACTIONS = [
  {
    id: 1,
    title: 'Hand-Thrown Stone Vase',
    date: 'May 14, 2024 • Artisan Direct',
    amount: -450.00,
    type: 'PURCHASE',
    icon: 'shopping_bag',
  },
  {
    id: 2,
    title: 'Wallet Top Up',
    date: 'May 10, 2024 • Bank Transfer',
    amount: 2000.00,
    type: 'CREDIT',
    icon: 'account_balance_wallet',
  },
  {
    id: 3,
    title: 'Refund: Hand-Woven Silk Rug',
    date: 'May 02, 2024 • Return ID: #8821',
    amount: 1200.00,
    type: 'REFUND',
    icon: 'replay',
  },
  {
    id: 4,
    title: 'Bespoke Culinary Set',
    date: 'April 28, 2024 • Limited Collection',
    amount: -820.50,
    type: 'PURCHASE',
    icon: 'restaurant',
  },
];

const DigitalWallet = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(12450.80);
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amountInput, setAmountInput] = useState('');

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleTopUp = (e) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (!val || val <= 0) return;
    setBalance(prev => prev + val);
    setTransactions([
      {
        id: Date.now(),
        title: 'Instant Top Up',
        date: 'Today • Vault Direct',
        amount: val,
        type: 'CREDIT',
        icon: 'account_balance_wallet',
      },
      ...transactions,
    ]);
    setShowTopUp(false);
    setAmountInput('');
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (!val || val <= 0 || val > balance) return;
    setBalance(prev => prev - val);
    setTransactions([
      {
        id: Date.now(),
        title: 'Payout Withdrawal',
        date: 'Today • Heritage Trust Bank',
        amount: -val,
        type: 'WITHDRAWAL',
        icon: 'account_balance',
      },
      ...transactions,
    ]);
    setShowWithdraw(false);
    setAmountInput('');
  };

  return (
    <main className="flex-grow pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="font-display-lg text-4xl md:text-6xl text-forest-green font-bold mb-1">The Vault</h1>
        <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-[0.2em] font-semibold">
          Your Curated Balance
        </p>
      </div>

      {/* Balance Card */}
      <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-2xl border border-outline-variant/30 shadow-sm text-center mb-16">
        <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-medium">
          Total Available Balance
        </p>
        <div className="font-display-lg text-4xl md:text-5xl text-forest-green font-bold mb-8 tracking-tight">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => setShowTopUp(true)}
            className="px-6 py-3 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-semibold flex items-center gap-2 shadow"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Top Up
          </button>
          <button 
            onClick={() => setShowWithdraw(true)}
            className="px-6 py-3 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-widest rounded-lg hover:bg-surface-container transition-all font-semibold flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            Withdraw
          </button>
        </div>
      </div>

      {/* Recent History Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <h2 className="font-headline-md text-xl text-forest-green font-bold">Recent History</h2>
            <p className="font-body-md text-xs text-on-surface-variant">Transaction activity from the last 30 days</p>
          </div>
          <button 
            onClick={() => alert('Exporting monthly statement PDF...')}
            className="font-label-md text-xs text-terracotta hover:underline font-bold flex items-center gap-1"
          >
            <span>View Statements</span>
            <span className="material-symbols-outlined text-[14px]">north_east</span>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm divide-y divide-outline-variant/20 overflow-hidden">
          {transactions.map(t => (
            <div key={t.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-surface-container-low/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  t.amount > 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-surface-container text-charcoal'
                }`}>
                  <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
                </div>
                <div>
                  <h3 className="font-body-md text-xs sm:text-sm font-bold text-on-surface">{t.title}</h3>
                  <p className="font-label-sm text-[11px] text-on-surface-variant">{t.date}</p>
                </div>
              </div>

              <div className="text-right">
                <p className={`font-headline-md text-sm sm:text-base font-bold ${
                  t.amount > 0 ? 'text-emerald-700' : 'text-charcoal'
                }`}>
                  {t.amount > 0 ? `+$${t.amount.toFixed(2)}` : `-$${Math.abs(t.amount).toFixed(2)}`}
                </p>
                <span className="inline-block font-label-sm text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant mt-0.5">
                  {t.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => alert('All transactions loaded.')}
            className="px-8 py-2.5 border border-outline-variant text-charcoal font-label-md text-xs uppercase tracking-widest rounded hover:bg-surface-container transition-colors font-semibold"
          >
            Load More
          </button>
        </div>
      </div>

      {/* Bento Footer Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Artisan Grant Program Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm h-72 group cursor-pointer">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt="Artisan Hands" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent p-6 flex flex-col justify-end text-white">
            <h3 className="font-headline-md text-xl font-bold mb-1">Artisan Grant Program</h3>
            <p className="font-body-md text-xs text-white/90 mb-4 leading-relaxed">
              Invest your balance directly into supporting local craftsmanship through our curated grants.
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="w-fit px-4 py-2 bg-white text-charcoal font-label-md text-xs uppercase tracking-wider rounded font-bold hover:bg-surface-container"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Unrivaled Security Card */}
        <div className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-center">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-forest-green mb-4">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <h3 className="font-headline-md text-xl text-forest-green font-bold mb-2">Unrivaled Security</h3>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-6">
            Every transaction in your Vault is protected by state-of-the-art encryption and authenticated with the quiet confidence of physical biometric security.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-charcoal">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-forest-green text-[18px]">lock</span>
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-forest-green text-[18px]">shield</span>
              <span>Cold Storage Funds</span>
            </div>
          </div>
        </div>

      </div>

      {/* Top Up Modal */}
      {showTopUp && (
        <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-headline-md text-lg text-forest-green font-bold mb-4">Top Up Vault Balance</h3>
            <form onSubmit={handleTopUp} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-on-surface-variant mb-1">Amount ($)</label>
                <input 
                  type="number" 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-lg font-bold font-mono focus:outline-none focus:border-forest-green" 
                  placeholder="500.00" 
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                {[100, 500, 1000, 2500].map(amt => (
                  <button 
                    key={amt} 
                    type="button" 
                    onClick={() => setAmountInput(amt.toString())}
                    className="flex-1 py-1.5 border border-outline-variant rounded text-xs font-semibold hover:bg-surface-container"
                  >
                    +${amt}
                  </button>
                ))}
              </div>
              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowTopUp(false)}
                  className="flex-1 py-2.5 border border-charcoal rounded-lg font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-forest-green text-white rounded-lg font-semibold uppercase tracking-wider hover:opacity-90 shadow"
                >
                  Confirm Top Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-headline-md text-lg text-forest-green font-bold mb-4">Withdraw to Bank</h3>
            <form onSubmit={handleWithdraw} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-on-surface-variant mb-1">Amount ($)</label>
                <input 
                  type="number" 
                  max={balance}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-lg font-bold font-mono focus:outline-none focus:border-forest-green" 
                  placeholder="500.00" 
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  required
                />
              </div>
              <p className="text-[11px] text-on-surface-variant">Available for withdrawal: ${balance.toFixed(2)}</p>
              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowWithdraw(false)}
                  className="flex-1 py-2.5 border border-charcoal rounded-lg font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-forest-green text-white rounded-lg font-semibold uppercase tracking-wider hover:opacity-90 shadow"
                >
                  Withdraw
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
};

export default DigitalWallet;
