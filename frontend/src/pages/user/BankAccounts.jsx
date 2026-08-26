import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const INITIAL_BANK_ACCOUNTS = [
  {
    id: 1,
    bankName: 'Chase Sapphire Checking',
    lastFour: '4291',
    isPrimary: true,
    status: 'Verified',
    type: 'checking',
  },
  {
    id: 2,
    bankName: 'Amex Platinum Business',
    lastFour: '8802',
    isPrimary: false,
    status: 'Verified',
    type: 'wallet',
  },
];

const BankAccounts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(INITIAL_BANK_ACCOUNTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBank, setNewBank] = useState({
    bankName: 'Chase',
    accountType: 'Checking',
    accountNumber: '',
    routingNumber: '',
  });

  useEffect(() => {
    api.get('/wallet/banks')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setAccounts(res.data.map(b => ({
            id: b.id,
            bankName: b.bankName || 'Linked Bank',
            lastFour: b.accountNumber ? b.accountNumber.slice(-4) : '4291',
            isPrimary: !!b.isDefault,
            status: 'Verified',
            type: 'checking',
          })));
        }
      })
      .catch(e => console.warn(e));
  }, []);

  const makePrimary = (id) => {
    setAccounts(prev => prev.map(a => ({
      ...a,
      isPrimary: a.id === id,
    })));
  };

  const removeAccount = (id) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newBank.accountNumber) return;
    const added = {
      id: Date.now(),
      bankName: `${newBank.bankName} ${newBank.accountType}`,
      lastFour: newBank.accountNumber.slice(-4) || '9988',
      isPrimary: accounts.length === 0,
      status: 'Verified',
      type: 'checking',
    };
    setAccounts([...accounts, added]);
    setShowAddModal(false);
    setNewBank({ bankName: 'Chase', accountType: 'Checking', accountNumber: '', routingNumber: '' });
  };

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

        {/* User Card */}
        <div className="pt-6 border-t border-outline-variant/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" 
              alt="Elara Vance" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <p className="font-label-md text-xs font-bold text-forest-green">Elara Vance</p>
            <p className="text-[10px] text-on-surface-variant">Master Potter</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 max-w-5xl">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-xs text-on-surface-variant font-label-sm">
          <Link to="/settings" className="hover:text-forest-green">Settings</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-semibold text-forest-green">Payout &amp; Bank Accounts</span>
        </nav>

        {/* Header Description */}
        <div className="mb-10">
          <h2 className="font-display-lg text-2xl md:text-4xl text-forest-green font-bold mb-2">Linked Accounts</h2>
          <p className="text-on-surface-variant max-w-2xl font-body-md text-xs md:text-sm leading-relaxed">
            Manage the accounts where you receive payouts from sales and workshops. Changes to primary accounts may take up to 2 business days to verify.
          </p>
        </div>

        {/* Bento Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {accounts.map(acc => (
            <div 
              key={acc.id}
              className="bg-white rounded-2xl p-6 md:p-8 border border-outline-variant/30 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container-low text-forest-green">
                    <span className="material-symbols-outlined text-2xl">
                      {acc.type === 'wallet' ? 'account_balance_wallet' : 'account_balance'}
                    </span>
                  </div>
                  {acc.isPrimary && (
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
                      Primary
                    </span>
                  )}
                </div>
                <h3 className="font-headline-md text-sm sm:text-base font-bold text-forest-green mb-1">{acc.bankName}</h3>
                <p className="text-on-surface-variant font-mono text-xs tracking-widest">•••• •••• •••• {acc.lastFour}</p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-outline-variant/20">
                {acc.isPrimary ? (
                  <div className="flex items-center gap-1.5 text-xs text-forest-green font-semibold">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Verified</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => makePrimary(acc.id)}
                    className="text-xs text-forest-green hover:underline font-bold"
                  >
                    Make Primary
                  </button>
                )}

                <div className="flex gap-3 text-on-surface-variant">
                  <button 
                    onClick={() => alert(`Editing account ${acc.bankName}`)}
                    className="hover:text-forest-green transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button 
                    onClick={() => removeAccount(acc.id)}
                    className="hover:text-red-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link New Account Dashed Card */}
        <div 
          onClick={() => setShowAddModal(true)}
          className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-8 hover:bg-white hover:border-forest-green transition-all cursor-pointer text-center flex flex-col items-center justify-center mb-12 group"
        >
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-forest-green mb-3 group-hover:bg-forest-green group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-xl">add</span>
          </div>
          <span className="font-label-md text-xs uppercase tracking-widest text-charcoal font-bold group-hover:text-forest-green">
            Link New Account
          </span>
        </div>

        {/* Plaid Secure Connection Banner */}
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-green shrink-0">
              <span className="material-symbols-outlined text-xl">lock</span>
            </div>
            <div>
              <h4 className="font-headline-md text-xs font-bold text-charcoal">Secure Connection</h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                We use industry-standard 256-bit encryption to protect your data. Your login credentials are never stored on our servers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-on-surface-variant uppercase shrink-0">
            <span>Partnered with</span>
            <span className="text-forest-green font-black">PLAID</span>
          </div>
        </div>

        {/* Supported Institutions */}
        <div className="bg-surface-container-low/70 p-6 rounded-2xl border border-outline-variant/20">
          <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-4">
            Supported Institutions
          </span>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-charcoal">
            {['Chase', 'Bank of America', 'Wells Fargo', 'Citibank', 'US Bank', 'Fidelity'].map(b => (
              <span key={b} className="px-4 py-2 bg-white rounded-lg border border-outline-variant/30 shadow-sm">
                {b}
              </span>
            ))}
          </div>
          <button 
            onClick={() => alert('Viewing all 20,000+ supported institutions...')}
            className="text-xs text-forest-green font-bold hover:underline inline-flex items-center gap-1 mt-4"
          >
            <span>View all 20,000+</span>
            <span className="material-symbols-outlined text-[14px]">north_east</span>
          </button>
        </div>

      </main>

      {/* Add Bank Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-outline-variant/30 space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <h3 className="font-display-md text-lg text-forest-green font-bold">Link Bank Account</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-charcoal">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant mb-1">Bank Name</label>
                <input 
                  type="text" 
                  required
                  value={newBank.bankName}
                  onChange={(e) => setNewBank({ ...newBank, bankName: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5" 
                  placeholder="e.g. Chase Bank"
                />
              </div>

              <div>
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant mb-1">Routing Number</label>
                <input 
                  type="text" 
                  required
                  maxLength={9}
                  value={newBank.routingNumber}
                  onChange={(e) => setNewBank({ ...newBank, routingNumber: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 font-mono" 
                  placeholder="9-digit routing"
                />
              </div>

              <div>
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant mb-1">Account Number</label>
                <input 
                  type="password" 
                  required
                  value={newBank.accountNumber}
                  onChange={(e) => setNewBank({ ...newBank, accountNumber: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 font-mono" 
                  placeholder="Account number"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-charcoal rounded-lg font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-forest-green text-white rounded-lg font-bold uppercase tracking-wider shadow"
                >
                  Save &amp; Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BankAccounts;
