import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [methods, setMethods] = useState([
    { id: 'pm_1', type: 'card', brand: 'Visa', last4: '4242', expiry: '08 / 2026', isDefault: true },
    { id: 'pm_2', type: 'bank', name: 'Heritage Trust Bank', last4: '8829', verified: true, isDefault: false },
    { id: 'pm_3', type: 'applepay', name: 'Apple Pay', email: 'julian.v***@icloud.com', isDefault: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvc: '', name: '' });

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleSetDefault = (id) => {
    setMethods(methods.map(m => ({ ...m, isDefault: m.id === id })));
  };

  const handleRemove = (id) => {
    setMethods(methods.filter(m => m.id !== id));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.number) return;
    const added = {
      id: `pm_${Date.now()}`,
      type: 'card',
      brand: 'Mastercard',
      last4: newCard.number.slice(-4) || '1234',
      expiry: newCard.expiry || '12 / 2028',
      isDefault: false,
    };
    setMethods([...methods, added]);
    setShowAddModal(false);
    setNewCard({ number: '', expiry: '', cvc: '', name: '' });
  };

  return (
    <main className="flex-grow pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Section Header */}
      <div className="text-center mb-12 max-w-xl mx-auto">
        <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mb-1 block font-semibold">
          Account Settings
        </span>
        <h1 className="font-display-lg text-3xl md:text-5xl text-forest-green font-bold mb-3">
          Payment Preferences
        </h1>
        <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
          Securely manage your saved payment methods and set a default for seamless artisanal procurement.
        </p>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        
        {methods.map((method) => (
          <div 
            key={method.id}
            className="group bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[220px]"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-forest-green">
                <span className="material-symbols-outlined text-2xl">
                  {method.type === 'card' ? 'credit_card' : method.type === 'bank' ? 'account_balance' : 'contactless'}
                </span>
                <span className="font-label-md text-sm text-on-surface font-bold">
                  {method.type === 'card' ? `•••• ${method.last4}` : method.name}
                </span>
              </div>
              {method.isDefault && (
                <span className="bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Default
                </span>
              )}
            </div>

            <div className="my-4">
              <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                {method.type === 'card' ? 'Expiry' : method.type === 'bank' ? 'Account Ending' : 'Connected Account'}
              </p>
              <p className="font-body-md text-sm text-on-surface font-medium mt-0.5">
                {method.type === 'card' ? method.expiry : method.type === 'bank' ? `•••• ${method.last4}` : method.email}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
              {method.type === 'bank' ? (
                <div className="flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Verified</span>
                </div>
              ) : method.type === 'applepay' ? (
                <span className="material-symbols-outlined text-on-surface-variant text-xl">apps</span>
              ) : (
                <span className="text-xs uppercase font-bold text-on-surface-variant/70 tracking-widest">{method.brand}</span>
              )}

              <div className="flex gap-3 text-xs font-semibold">
                {!method.isDefault && (
                  <button 
                    onClick={() => handleSetDefault(method.id)}
                    className="text-forest-green hover:underline"
                  >
                    Set Default
                  </button>
                )}
                <button 
                  onClick={() => handleRemove(method.id)}
                  className="text-red-700 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Payment Method (Dashed Card) */}
        <button 
          onClick={() => setShowAddModal(true)}
          className="group border-2 border-dashed border-outline-variant/60 hover:border-forest-green hover:bg-surface-container-low transition-all duration-300 p-6 rounded-xl flex flex-col items-center justify-center min-h-[220px] gap-3"
        >
          <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:border-forest-green group-hover:bg-forest-green group-hover:text-white transition-all text-forest-green">
            <span className="material-symbols-outlined text-2xl">add</span>
          </div>
          <span className="font-label-md text-xs text-on-surface-variant group-hover:text-forest-green transition-colors uppercase tracking-widest font-bold">
            Add Payment Method
          </span>
        </button>

      </div>

      {/* Security Notice */}
      <div className="pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-forest-green text-[18px]">lock</span>
          <p>Your transaction data is encrypted and stored according to PCI DSS standards.</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant/80">
          <span>256-BIT ENCRYPTION</span>
          <span>&bull;</span>
          <span>SOC-2 COMPLIANT</span>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-outline-variant/30 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-lg text-forest-green font-bold">Add Payment Card</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-charcoal">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-on-surface-variant mb-1 tracking-wider">Name on Card</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:outline-none focus:border-forest-green" 
                  placeholder="Eleanor Vance" 
                  value={newCard.name}
                  onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block uppercase font-bold text-on-surface-variant mb-1 tracking-wider">Card Number</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-mono focus:outline-none focus:border-forest-green" 
                  placeholder="•••• •••• •••• 4242" 
                  value={newCard.number}
                  onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-bold text-on-surface-variant mb-1 tracking-wider">Expiry (MM/YY)</label>
                  <input 
                    type="text" 
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-mono focus:outline-none focus:border-forest-green" 
                    placeholder="12 / 28" 
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-on-surface-variant mb-1 tracking-wider">CVC / CVV</label>
                  <input 
                    type="password" 
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-mono focus:outline-none focus:border-forest-green" 
                    placeholder="•••" 
                    maxLength={4}
                    value={newCard.cvc}
                    onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-charcoal rounded-lg font-semibold uppercase tracking-wider hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-forest-green text-white rounded-lg font-semibold uppercase tracking-wider hover:opacity-90 shadow"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
};

export default PaymentMethods;
