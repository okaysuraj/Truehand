import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BulkImport = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [step, setStep] = useState(1);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return;
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setStep(2);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisan Portal</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Master Workshop</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Overview
            </Link>
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Orders
            </Link>
            <Link to="/seller/inventory" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-terracotta font-bold border-r-2 border-terracotta">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
            <Link to="/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">insights</span>
              Analytics
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto">
        
        {/* Breadcrumb */}
        <Link 
          to="/seller/inventory" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-forest-green transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Inventory
        </Link>

        <div className="mb-10 space-y-2">
          <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal">
            Bulk Product Import
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Upload CSV or Excel spreadsheets to import or update multiple handcrafted catalog items and SKU quantities at once.
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-8">
            
            {/* Template Download Card */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-forest-green flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">description</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-xs font-bold text-charcoal">CSV Catalog Template</h4>
                  <p className="text-[11px] text-on-surface-variant">Includes standard columns: Title, SKU, Price, Materials, Stock</p>
                </div>
              </div>

              <button 
                onClick={() => alert('Downloading CSV template...')}
                className="px-5 py-2.5 border border-forest-green text-forest-green rounded-xl font-bold uppercase tracking-wider text-[11px] hover:bg-emerald-50 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span className="material-symbols-outlined text-base">download</span>
                Download Template
              </button>
            </div>

            {/* Dropzone */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-forest-green mx-auto">
                <span className="material-symbols-outlined text-3xl">upload_file</span>
              </div>
              <div>
                <h3 className="font-display-md text-lg font-bold text-charcoal">Upload your CSV or XLSX file</h3>
                <p className="text-xs text-on-surface-variant mt-1">Maximum file size: 25MB. Must match TrueHand schema.</p>
              </div>

              <input 
                type="file" 
                id="file-upload" 
                accept=".csv,.xlsx" 
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden" 
              />
              <label 
                htmlFor="file-upload"
                className="inline-block px-8 py-3 bg-charcoal text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold cursor-pointer hover:bg-forest-green transition-colors shadow"
              >
                {file ? file.name : 'Select File'}
              </label>
            </div>

            {file && (
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setFile(null)} 
                  className="px-6 py-2.5 border border-outline-variant text-charcoal rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpload}
                  disabled={importing}
                  className="px-8 py-3 bg-forest-green text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow"
                >
                  {importing ? 'Validating & Importing...' : 'Start Import'}
                </button>
              </div>
            )}

          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-forest-green flex items-center justify-center mx-auto text-3xl shadow">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <div className="space-y-1">
              <h2 className="font-display-lg text-2xl font-bold text-charcoal">Import Completed Successfully</h2>
              <p className="text-xs text-on-surface-variant">28 new artisan listings created and 14 stock quantities updated.</p>
            </div>
            <div className="flex justify-center gap-4 pt-4">
              <button 
                onClick={() => setStep(1)} 
                className="px-6 py-3 border border-charcoal text-charcoal rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Import Another File
              </button>
              <button 
                onClick={() => navigate('/seller/inventory')} 
                className="px-8 py-3 bg-forest-green text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow"
              >
                Go to Inventory
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};

export default BulkImport;
