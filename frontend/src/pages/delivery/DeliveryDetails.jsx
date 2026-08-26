import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DeliveryDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 space-y-8">
        
        {/* Back link & Top Banner */}
        <div className="space-y-4">
          <Link 
            to="/delivery/assigned" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-forest-green transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Tasks
          </Link>

          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold bg-charcoal text-white">
                  IN PROGRESS
                </span>
                <span className="text-xs text-on-surface-variant font-mono">#TX-29384-H</span>
              </div>
              <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal">
                Fulfillment: Heirloom Ceramic Set
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Assigned to: <strong className="text-charcoal">Marcus Thorne</strong> &bull; Priority: <strong className="text-terracotta">High</strong>
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <button 
                onClick={() => alert('Issue report dialog opened')}
                className="px-5 py-2.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
              >
                Report Issue
              </button>
              <button 
                onClick={() => {
                  alert('Delivery completed successfully!');
                  navigate('/delivery/success');
                }}
                className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
              >
                Complete Delivery
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Destination Map & Customer */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Destination Card */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">Destination</span>
                  <h4 className="font-headline-md text-base font-bold text-charcoal mt-1">1242 Artisan Way, Ste 4</h4>
                  <p className="text-[11px] text-on-surface-variant">Pacific Palisades, CA 90272</p>
                </div>
                <button 
                  onClick={() => alert('Opening Google Maps navigation...')}
                  className="text-forest-green font-bold text-xs flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-base">map</span>
                  Open in Maps
                </button>
              </div>

              {/* Map Preview Canvas */}
              <div className="h-64 rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/20 relative flex items-center justify-center">
                <div className="text-center space-y-2 text-on-surface-variant/70">
                  <span className="material-symbols-outlined text-4xl text-forest-green animate-bounce">location_on</span>
                  <p className="text-xs font-semibold">1242 Artisan Way, Pacific Palisades</p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-headline-md text-sm font-bold text-charcoal">Eleanor Vance</h4>
                  <p className="text-[11px] text-on-surface-variant">Premium Member &bull; Since 2019</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-xl border border-outline-variant/40 flex items-center justify-center text-charcoal hover:bg-surface-container">
                  <span className="material-symbols-outlined text-lg">phone</span>
                </button>
                <button className="w-10 h-10 rounded-xl border border-outline-variant/40 flex items-center justify-center text-charcoal hover:bg-surface-container">
                  <span className="material-symbols-outlined text-lg">chat</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Order Contents, Special Instructions, Delivery Updates */}
          <div className="lg:col-span-5 space-y-6 text-xs">
            
            {/* Order Contents */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <h3 className="font-display-md text-base font-bold text-charcoal">Order Contents</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-charcoal">Heirloom Ceramic Vase</h5>
                      <div className="flex gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded bg-surface-container text-[9px] uppercase font-bold text-charcoal">LARGE</span>
                        <span className="px-2 py-0.5 rounded bg-surface-container text-[9px] uppercase font-bold text-charcoal">Hand-thrown</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-charcoal font-mono">x1</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-charcoal">Charcoal Dinner Plate Set</h5>
                      <div className="flex gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded bg-surface-container text-[9px] uppercase font-bold text-charcoal">SET OF 4</span>
                        <span className="px-2 py-0.5 rounded bg-surface-container text-[9px] uppercase font-bold text-charcoal">Reactive Glaze</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-charcoal font-mono">x1</span>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="bg-[#163428] text-white p-6 rounded-3xl space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <span className="material-symbols-outlined text-base">info</span>
                <span className="text-xs uppercase tracking-wider">Special Instructions</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs leading-relaxed text-white/90 italic">
                "Please ring the service bell at the side gate. The items are fragile; please ensure the package remains upright. No contact delivery preferred, leave on the teak bench near the entrance."
              </div>
            </div>

            {/* Delivery Updates Timeline */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <h3 className="font-display-md text-base font-bold text-charcoal">Delivery Updates</h3>

              <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
                <div className="relative">
                  <span className="w-5 h-5 rounded-full bg-forest-green text-white flex items-center justify-center text-[10px] absolute -left-6 top-0 font-bold">&check;</span>
                  <h5 className="font-bold text-charcoal">On Route to Destination</h5>
                  <p className="text-[10px] text-on-surface-variant">Today, 2:45 PM</p>
                </div>
                <div className="relative">
                  <span className="w-5 h-5 rounded-full bg-surface-container text-charcoal flex items-center justify-center text-[10px] absolute -left-6 top-0">&bull;</span>
                  <h5 className="font-bold text-charcoal">Departed Logistics Hub</h5>
                  <p className="text-[10px] text-on-surface-variant">Today, 1:15 PM</p>
                </div>
                <div className="relative">
                  <span className="w-5 h-5 rounded-full bg-surface-container text-charcoal flex items-center justify-center text-[10px] absolute -left-6 top-0">&bull;</span>
                  <h5 className="font-bold text-charcoal">Order Processed &amp; Wrapped</h5>
                  <p className="text-[10px] text-on-surface-variant">Yesterday, 4:30 PM</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Bottom Footer */}
      <footer className="px-6 md:px-12 py-5 border-t border-outline-variant/20 bg-white flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-on-surface-variant">
        <span>&copy; 2024 TrueHand Artisan Marketplace. Logistical Excellence.</span>
        <div className="flex items-center gap-6">
          <Link to="/settings" className="hover:text-charcoal">Terms of Service</Link>
          <Link to="/settings" className="hover:text-charcoal">Privacy Policy</Link>
          <Link to="/settings" className="hover:text-charcoal">Carrier Agreement</Link>
        </div>
      </footer>

    </div>
  );
};

export default DeliveryDetails;
