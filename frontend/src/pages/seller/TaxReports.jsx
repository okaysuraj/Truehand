import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MONTHS_2023 = [
  'December 2023',
  'November 2023',
  'October 2023',
  'September 2023',
  'August 2023',
  'July 2023',
  'June 2023',
  'May 2023',
  'April 2023',
  'March 2023',
  'February 2023',
  'January 2023',
];

const TaxReports = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2023');

  return (
    <div className="flex min-h-screen bg-[#faf8f5] font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Studio Manager</h1>
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
            <Link to="/seller/earnings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Studio Schedule
            </Link>
            <Link to="/seller/tax-reports" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              Tax &amp; Reports
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

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
          <div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Tax &amp; Reports
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
              Manage your studio finances and annual documentation.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-xl">notifications</span></button>
            <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-white border border-outline-variant/30 text-xs font-semibold text-charcoal shadow-sm">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-surface-container">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="" className="w-full h-full object-cover" />
              </div>
              <span>Artisan Studio</span>
            </div>
          </div>
        </div>

        {/* 2-Column Hero: Annual Income Statement & Seller Tax Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-xs">
          
          {/* Annual Income Statement Card */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-forest-green flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">description</span>
              </div>
              <h3 className="font-display-lg text-2xl font-bold text-charcoal">
                Annual Income Statement
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Download your comprehensive financial summary for the fiscal year 2023. This document includes gross sales, fees, and net payouts.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button 
                onClick={() => alert('Downloading 2023 annual income statement PDF...')}
                className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">download</span>
                Download PDF
              </button>
              <span className="text-[10px] text-on-surface-variant font-mono">Updated: Jan 15, 2024</span>
            </div>
          </div>

          {/* Seller Tax Guide Banner */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden relative shadow-md flex flex-col justify-end p-8 bg-charcoal text-white">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" 
              alt="Tax Guide" 
              className="absolute inset-0 w-full h-full object-cover opacity-30" 
            />
            <div className="relative z-10 space-y-2">
              <h4 className="font-display-lg text-2xl font-bold">Seller Tax Guide</h4>
              <p className="text-xs text-white/80 leading-relaxed font-body-md">
                Learn about reporting requirements and deductible expenses for your studio.
              </p>
              <button 
                onClick={() => alert('Opening Seller Tax Guide')}
                className="text-xs font-bold text-emerald-300 hover:underline flex items-center gap-1 pt-2"
              >
                <span>Read the Guide</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>

        {/* Monthly GST Reports Grid */}
        <div className="space-y-6 text-xs">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display-md text-xl font-bold text-charcoal">Monthly GST Reports</h3>
              <p className="text-[11px] text-on-surface-variant">View and download transaction-level tax breakdowns.</p>
            </div>

            <div className="flex bg-surface-container-low rounded-xl p-1 font-bold">
              {['2024', '2023'].map(y => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-4 py-1.5 rounded-lg transition-all ${selectedYear === y ? 'bg-charcoal text-white' : 'text-on-surface-variant hover:text-charcoal'}`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* 12 Month Download Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MONTHS_2023.map(month => (
              <div 
                key={month}
                className="p-4 px-5 rounded-2xl bg-white border border-outline-variant/30 shadow-sm flex items-center justify-between hover:bg-surface-container-low/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-charcoal">
                    <span className="material-symbols-outlined text-lg">grid_view</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal text-xs">{month}</h5>
                    <p className="text-[10px] text-on-surface-variant">Report generated Jan 02</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Downloading GST Report for ${month}`)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-forest-green hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
};

export default TaxReports;
