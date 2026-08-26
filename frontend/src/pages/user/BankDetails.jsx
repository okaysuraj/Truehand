import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BankDetails = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('Julian V. Aris');
  const [accountNo, setAccountNo] = useState('GB00 0000 0000 0000 0000 00');
  const [swift, setSwift] = useState('ARTISANGB2L');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Bank details updated successfully.');
    navigate(-1);
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
            <Link to="/admin/products" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/platform-revenue" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/admin/banners" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">view_carousel</span>
              Content
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow"
        >
          View Storefront
        </button>
      </aside>

      {/* Main Container */}
      <main className="flex-1 p-6 md:p-12 max-w-4xl space-y-10 text-xs">
        
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <h1 className="font-display-lg text-4xl font-bold text-charcoal">
            Bank Details
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Manage your payout destination. Please ensure all information matches your official bank records to avoid delays.
          </p>
        </div>

        {/* Bank Form Card */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-xl max-w-xl mx-auto space-y-8">
          
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-low rounded-full text-[10px] uppercase font-bold tracking-wider text-forest-green border border-outline-variant/30">
              <span className="material-symbols-outlined text-xs">lock</span>
              SECURE ENCRYPTED CONNECTION
            </span>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                Account Holder Name
              </label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Julian V. Aris"
                className="w-full bg-transparent border-b border-outline-variant/60 py-3 font-semibold text-charcoal focus:outline-none focus:border-forest-green"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                  IBAN / Account Number
                </label>
                <span className="material-symbols-outlined text-sm text-on-surface-variant">info</span>
              </div>
              <input 
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder="GB00 0000 0000 0000 0000 00"
                className="w-full bg-transparent border-b border-outline-variant/60 py-3 font-mono font-bold text-charcoal focus:outline-none focus:border-forest-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                SWIFT / BIC Code
              </label>
              <input 
                type="text"
                value={swift}
                onChange={(e) => setSwift(e.target.value)}
                placeholder="ARTISANGB2L"
                className="w-full bg-transparent border-b border-outline-variant/60 py-3 font-mono font-bold text-charcoal uppercase focus:outline-none focus:border-forest-green"
              />
            </div>

            <div className="space-y-3 pt-4">
              <button 
                type="submit"
                className="w-full py-4 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
              >
                Update Bank Information
              </button>
              <p className="text-[10px] text-center text-on-surface-variant leading-relaxed">
                All bank transfers are processed via our verified partner. Verification typically takes 2-3 business days.
              </p>
            </div>

          </form>

        </div>

      </main>

    </div>
  );
};

export default BankDetails;
