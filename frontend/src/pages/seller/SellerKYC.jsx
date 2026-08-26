import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SellerKYC = () => {
  const navigate = useNavigate();
  const [docType, setDocType] = useState('passport');
  const [docNumber, setDocNumber] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate('/seller/approval-pending');
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Artisanal Admin Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-forest-green">Artisanal Admin</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Marketplace Manager</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        
        {/* Header & Stepper */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="font-label-sm text-[10px] uppercase tracking-widest text-terracotta font-bold">
            Security Protocol
          </span>
          <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">
            KYC Identity Verification
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            To ensure the integrity of our artisanal marketplace, please complete the verification of your merchant account identity.
          </p>

          {/* Stepper */}
          <div className="flex items-center justify-center max-w-md mx-auto py-6">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-forest-green text-white flex items-center justify-center font-bold text-xs shadow">1</div>
              <span className="font-label-md text-[11px] mt-1 font-bold text-forest-green">Document Type</span>
            </div>
            <div className="flex-1 h-[2px] bg-outline-variant/40 mx-3" />
            <div className="flex flex-col items-center opacity-40">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-charcoal flex items-center justify-center font-bold text-xs">2</div>
              <span className="font-label-md text-[11px] mt-1">Upload Photo</span>
            </div>
            <div className="flex-1 h-[2px] bg-outline-variant/40 mx-3" />
            <div className="flex flex-col items-center opacity-40">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-charcoal flex items-center justify-center font-bold text-xs">3</div>
              <span className="font-label-md text-[11px] mt-1">Review</span>
            </div>
          </div>
        </div>

        {/* Verification Card */}
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-2xl border border-outline-variant/30 shadow-sm space-y-8 text-xs">
          
          {/* Step 1: Select Document Type */}
          <div className="space-y-3">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              Step 1: Select Document Type
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setDocType('passport')}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer text-center space-y-2 ${
                  docType === 'passport' 
                    ? 'border-forest-green bg-emerald-50/30' 
                    : 'border-outline-variant/40 hover:border-forest-green/60'
                }`}
              >
                <span className="material-symbols-outlined text-3xl text-forest-green">menu_book</span>
                <h4 className="font-display-md text-base font-bold text-charcoal">Passport</h4>
                <p className="text-[11px] text-on-surface-variant">International travel document</p>
              </div>

              <div 
                onClick={() => setDocType('drivers_license')}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer text-center space-y-2 ${
                  docType === 'drivers_license' 
                    ? 'border-forest-green bg-emerald-50/30' 
                    : 'border-outline-variant/40 hover:border-forest-green/60'
                }`}
              >
                <span className="material-symbols-outlined text-3xl text-forest-green">badge</span>
                <h4 className="font-display-md text-base font-bold text-charcoal">Driver's License</h4>
                <p className="text-[11px] text-on-surface-variant">Government issued ID card</p>
              </div>
            </div>
          </div>

          {/* Step 2: Enter Details */}
          <div className="space-y-2">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              Step 2: Enter Details
            </span>
            <label className="block text-[11px] text-on-surface-variant">Document Number</label>
            <input 
              type="text" 
              required
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
              placeholder="Enter your identification number"
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green font-mono"
            />
          </div>

          {/* Step 3: Document Upload */}
          <div className="space-y-3">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              Step 3: Document Upload
            </span>

            <div className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-8 text-center bg-surface-container-lowest space-y-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-forest-green mx-auto">
                <span className="material-symbols-outlined text-2xl">cloud_upload</span>
              </div>
              <div>
                <h4 className="font-display-md text-base font-bold text-charcoal">Click to upload or drag &amp; drop</h4>
                <p className="text-[11px] text-on-surface-variant mt-1">PNG, JPG or PDF (max. 10MB). High-resolution image of the document front page required.</p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => { setFileUploaded(true); alert('File selected!'); }}
                  className="px-6 py-2.5 bg-forest-green text-white rounded-lg font-bold text-xs uppercase tracking-wider"
                >
                  {fileUploaded ? 'File Selected' : 'Select Files'}
                </button>
                <button 
                  type="button" 
                  onClick={() => alert('Camera scanner opened')}
                  className="px-6 py-2.5 border border-charcoal text-charcoal rounded-lg font-semibold text-xs uppercase tracking-wider"
                >
                  Take Photo
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-between">
            <button 
              type="button" 
              onClick={() => navigate('/seller/dashboard')}
              className="text-xs font-semibold text-on-surface-variant hover:text-charcoal flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Cancel Verification
            </button>
            <button 
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
            >
              {submitting ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>

        </form>

        {/* Bottom 3 Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center text-xs text-on-surface-variant">
          <div className="flex flex-col items-center gap-1.5">
            <span className="material-symbols-outlined text-forest-green text-2xl">verified_user</span>
            <span>Bank-level encryption standards</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="material-symbols-outlined text-forest-green text-2xl">lock</span>
            <span>Data stored securely and privately</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="material-symbols-outlined text-forest-green text-2xl">gavel</span>
            <span>Compliance with global regulations</span>
          </div>
        </div>

      </main>

    </div>
  );
};

export default SellerKYC;
