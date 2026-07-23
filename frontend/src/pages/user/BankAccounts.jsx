import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BankAccounts = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: "Chase Bank",
      accountType: "Checking",
      lastFour: "4582",
      isDefault: true,
      status: "Verified"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <Link to="/wallet" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Wallet
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Bank Accounts</h1>
              <p className="font-body-md text-on-surface-variant">Manage your linked accounts for withdrawals and payments.</p>
            </div>
            {!showAddForm && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2.5 bg-forest-green text-white font-label-md rounded flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Account
              </button>
            )}
          </div>
        </div>

        {/* Add Account Form */}
        {showAddForm && (
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8 shadow-sm mb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Link New Bank Account</h2>
              <button onClick={() => setShowAddForm(false)} className="text-on-surface-variant hover:text-charcoal transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Routing Number *</label>
                  <input type="text" required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" placeholder="9-digit routing number" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Account Number *</label>
                  <input type="text" required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" placeholder="Account number" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Confirm Account Number *</label>
                  <input type="text" required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" placeholder="Confirm account number" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Account Type *</label>
                  <div className="relative">
                    <select required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface appearance-none">
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Name on Account *</label>
                <input type="text" required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" placeholder="Full name as it appears on account" />
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2.5 border border-outline-variant/50 text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
                  Link Account
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Accounts List */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm">
          {accounts.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">account_balance</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">No Linked Accounts</h3>
              <p className="font-body-md text-on-surface-variant">You don't have any bank accounts linked yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/30">
              {accounts.map((acc) => (
                <div key={acc.id} className="p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-charcoal text-[24px]">account_balance</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">{acc.bankName}</h3>
                        {acc.isDefault && (
                          <span className="bg-forest-green/10 text-forest-green font-label-sm px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">Default</span>
                        )}
                      </div>
                      <p className="font-body-sm text-on-surface-variant">{acc.accountType} ending in {acc.lastFour}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <span className="flex items-center gap-1.5 text-forest-green font-label-sm">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      {acc.status}
                    </span>
                    <button className="p-2 text-on-surface-variant hover:text-charcoal transition-colors">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-surface-variant/30 rounded border border-outline-variant/30">
          <span className="material-symbols-outlined text-on-surface-variant shrink-0 mt-0.5">lock</span>
          <p className="font-body-sm text-on-surface-variant leading-relaxed">
            Your bank information is securely encrypted and stored by our payment partner, Stripe. TrueHand does not store your full bank account numbers on our servers.
          </p>
        </div>

      </div>
    </div>
  );
};

export default BankAccounts;
