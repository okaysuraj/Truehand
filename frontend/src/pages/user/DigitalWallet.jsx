import api from '../../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const DigitalWallet = () => {
  const transactions = [
    { id: 'TX-9982', date: 'Oct 24, 2023', type: 'Refund', amount: 145.00, status: 'Completed' },
    { id: 'TX-9951', date: 'Oct 15, 2023', type: 'Purchase', amount: -280.00, status: 'Completed' },
    { id: 'TX-9802', date: 'Sep 02, 2023', type: 'Deposit', amount: 300.00, status: 'Completed' },
    { id: 'TX-9755', date: 'Aug 18, 2023', type: 'Purchase', amount: -155.00, status: 'Completed' }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <Link to="/profile" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Profile
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Digital Wallet</h1>
          <p className="font-body-md text-on-surface-variant">Manage your TrueHand balance, view transaction history, and top up funds.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Balance & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Balance Card */}
            <div className="bg-charcoal text-white rounded-xl p-8 relative overflow-hidden shadow-md">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-forest-green/20 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <p className="font-label-md text-white/70 mb-2 uppercase tracking-widest">Available Balance</p>
                <h2 className="font-display-lg text-5xl mb-6">$145.00</h2>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-white text-charcoal py-2.5 rounded font-label-md hover:bg-surface-linen transition-colors text-center">
                    Top Up
                  </button>
                  <button className="flex-1 bg-white/10 border border-white/20 text-white py-2.5 rounded font-label-md hover:bg-white/20 transition-colors text-center">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Linked Methods */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Payment Methods</h3>
                <Link to="/bank-accounts" className="text-forest-green font-label-sm hover:underline">Manage</Link>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border border-outline-variant/50 rounded bg-surface-variant/20">
                  <span className="material-symbols-outlined text-charcoal">account_balance</span>
                  <div className="flex-1">
                    <p className="font-label-md text-on-surface">Chase Bank</p>
                    <p className="font-body-sm text-on-surface-variant">Checking •••• 4582</p>
                  </div>
                  <span className="font-label-sm text-forest-green bg-forest-green/10 px-2 py-0.5 rounded">Default</span>
                </div>
                
                <div className="flex items-center gap-4 p-3 border border-outline-variant/50 rounded">
                  <span className="material-symbols-outlined text-charcoal">credit_card</span>
                  <div className="flex-1">
                    <p className="font-label-md text-on-surface">Visa</p>
                    <p className="font-body-sm text-on-surface-variant">Credit •••• 9921</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 py-2.5 border border-dashed border-outline-variant/80 text-on-surface-variant font-label-md rounded flex justify-center items-center gap-2 hover:bg-surface-variant/30 transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Payment Method
              </button>
            </div>
            
          </div>

          {/* Right Column - Transaction History */}
          <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm flex flex-col h-full">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Transaction History</h3>
              <button className="flex items-center gap-1 text-on-surface-variant hover:text-forest-green transition-colors font-label-sm">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Filter
              </button>
            </div>
            
            <div className="p-6 flex-1">
              {transactions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">receipt_long</span>
                  <p className="font-body-md text-on-surface-variant">No transactions found.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          tx.amount > 0 ? 'bg-forest-green/10 text-forest-green' : 'bg-surface-variant text-charcoal'
                        }`}>
                          <span className="material-symbols-outlined text-[20px]">
                            {tx.type === 'Purchase' ? 'shopping_bag' : tx.type === 'Refund' ? 'replay' : 'account_balance_wallet'}
                          </span>
                        </div>
                        <div>
                          <p className="font-label-md text-on-surface mb-0.5">{tx.type}</p>
                          <div className="flex items-center gap-2 font-body-sm text-on-surface-variant">
                            <span>{tx.date}</span>
                            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                            <span>{tx.id}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-label-md mb-0.5 ${tx.amount > 0 ? 'text-forest-green' : 'text-on-surface'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                        </p>
                        <span className="font-label-sm text-on-surface-variant bg-surface-variant/50 px-2 py-0.5 rounded">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-outline-variant/30 text-center bg-surface-variant/20 rounded-b-lg">
              <button className="text-forest-green font-label-md hover:underline">View All Transactions</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DigitalWallet;
