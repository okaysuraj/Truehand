import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProofOfDelivery = () => {
  const navigate = useNavigate();
  const [recipientName, setRecipientName] = useState('Julian Montgomery');
  const [notes, setNotes] = useState('');

  const handleComplete = () => {
    alert('Proof of delivery submitted successfully!');
    navigate('/delivery/success');
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Logistics Hub</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Premium Fulfillment</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/delivery/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Overview
            </Link>
            <Link to="/delivery/assigned" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Active Deliveries
            </Link>
            <Link to="/delivery/history" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">history</span>
              History
            </Link>
            <Link to="/delivery/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">help</span>
              Support
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider block">
              DELIVERY SESSION #TR-88219
            </span>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Proof of Delivery
            </h1>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Report issue modal opened')}
              className="px-5 py-2.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">report_problem</span>
              Report Issue
            </button>
            <button 
              onClick={handleComplete}
              className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-base">check_circle</span>
              Complete Delivery
            </button>
          </div>
        </div>

        {/* 2-Column Section: Photo Proof & Signature/Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Photo Proof */}
          <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-forest-green text-lg">photo_camera</span>
                <h3 className="font-display-md text-base font-bold text-charcoal">Photo Proof</h3>
              </div>
              <span className="text-[10px] text-on-surface-variant font-semibold">Required for Artisan Grade Items</span>
            </div>

            <div className="border-2 border-dashed border-outline-variant/60 rounded-3xl p-10 text-center space-y-3 bg-surface-container-lowest hover:border-forest-green transition-colors">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant">photo_camera</span>
              <p className="text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed">
                Capture or upload photo of the parcel at the destination
              </p>
              <button 
                onClick={() => alert('Camera activated')}
                className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow"
              >
                Capture Photo
              </button>
            </div>

            {/* Quick Action Tiles */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
                <span className="material-symbols-outlined text-xl">cached</span>
              </button>
              <button className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
                <span className="material-symbols-outlined text-xl">flash_on</span>
              </button>
              <button className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
                <span className="material-symbols-outlined text-xl">brightness_medium</span>
              </button>
            </div>
          </div>

          {/* Right: Customer Signature & Delivery Notes */}
          <div className="lg:col-span-6 space-y-6 text-xs">
            
            {/* Customer Signature */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-forest-green text-lg">draw</span>
                <h3 className="font-display-md text-base font-bold text-charcoal">Customer Signature</h3>
              </div>

              <div className="h-32 border-2 border-dashed border-outline-variant/40 rounded-2xl flex items-center justify-center bg-surface-container-lowest text-on-surface-variant italic">
                Sign within this area
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                    Full Recipient Name
                  </label>
                  <button type="button" onClick={() => setRecipientName('')} className="text-forest-green font-bold text-[10px] hover:underline">
                    Clear Signature
                  </button>
                </div>
                <input 
                  type="text" 
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green font-semibold text-charcoal"
                />
              </div>
            </div>

            {/* Delivery Notes */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-forest-green text-lg">notes</span>
                <h3 className="font-display-md text-base font-bold text-charcoal">Delivery Notes</h3>
              </div>

              <textarea 
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any specific placement or customer interactions..."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green leading-relaxed"
              />

              <div className="flex flex-wrap gap-2 pt-1">
                {['Left with Concierge', 'Safe Place', 'Hand-delivered'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNotes(prev => prev ? `${prev}, ${t}` : t)}
                    className="px-3 py-1 rounded-lg bg-surface-container text-on-surface-variant font-semibold hover:bg-surface-container-high"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Summary Strip */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface-container border border-outline-variant/30 flex items-center justify-center font-bold text-sm text-charcoal">
              +2
            </div>
            <div>
              <h4 className="font-bold text-charcoal text-sm">3 Items in Delivery</h4>
              <p className="text-[11px] text-on-surface-variant">Hand-thrown Ceramic (x2), Linen Throw (x1)</p>
            </div>
          </div>

          <div className="flex items-center gap-8 text-right">
            <div>
              <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Scheduled for</span>
              <strong className="text-charcoal font-semibold">Today, 14:30 &mdash; 16:00</strong>
            </div>

            <div>
              <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Location Accuracy</span>
              <strong className="text-forest-green font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-forest-green inline-block" />
                98% Verified
              </strong>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};

export default ProofOfDelivery;
