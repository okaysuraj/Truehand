import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LiveMapTracking = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Tracking Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-6">
        
        {/* Breadcrumb */}
        <Link 
          to="/orders" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-forest-green transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          ORDER #78421 / TRACKING
        </Link>

        {/* Map Container with Floating UI Panels */}
        <div className="relative rounded-3xl overflow-hidden border border-outline-variant/30 shadow-lg min-h-[580px] bg-[#e4e8e5] flex flex-col justify-between p-6">
          
          {/* Map Graphic Simulation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <span className="material-symbols-outlined text-9xl text-forest-green">near_me</span>
          </div>

          {/* Top/Left Floating Panel: Estimated Arrival & Courier */}
          <div className="relative z-10 w-full max-w-sm space-y-4">
            
            {/* Arrival Banner */}
            <div className="bg-[#163428] text-white p-6 rounded-3xl space-y-2 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                  ESTIMATED ARRIVAL
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-emerald-700 text-white">
                  LIVE
                </span>
              </div>

              <h2 className="font-display-lg text-3xl font-bold">
                14 <span className="font-normal text-lg font-body-md text-emerald-200">minutes away</span>
              </h2>

              <p className="text-xs text-emerald-100 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">location_on</span>
                Passing through Artisan Quarter
              </p>
            </div>

            {/* Courier & Progress Card */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xl space-y-6 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-headline-md text-sm font-bold text-charcoal">Julian Reed</h4>
                  <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                    <span className="text-amber-500 font-bold">&star; 4.9</span>
                    <span>(2,400+ deliveries)</span>
                  </p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-on-surface-variant uppercase">
                  <span>Picked up</span>
                  <span>In transit</span>
                  <span className="text-forest-green">Near you</span>
                  <span>Delivered</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5">
                  <div className="bg-forest-green h-1.5 rounded-full w-[75%]" />
                </div>
              </div>

              {/* Call & Message CTAs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => alert('Message courier')}
                  className="py-2.5 border border-charcoal text-charcoal rounded-xl font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Message
                </button>
                <button 
                  onClick={() => alert('Call courier')}
                  className="py-2.5 bg-forest-green text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 shadow"
                >
                  <span className="material-symbols-outlined text-base">phone</span>
                  Call
                </button>
              </div>
            </div>

          </div>

          {/* Right Floating Cards Stack */}
          <div className="relative z-10 w-full max-w-sm space-y-4 ml-auto self-end">
            
            {/* Delivery Address Card */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xl space-y-2 text-xs">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                DELIVERY ADDRESS
              </span>
              <h5 className="font-bold text-charcoal text-sm">12 Craft Lane, Studio B</h5>
              <p className="text-[11px] text-on-surface-variant">Shoreditch, London</p>
              <button onClick={() => alert('Add notes')} className="text-forest-green font-bold text-[11px] hover:underline flex items-center gap-1 pt-1">
                <span className="material-symbols-outlined text-sm">edit</span>
                Add delivery notes
              </button>
            </div>

            {/* Your Order Summary Card */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xl space-y-3 text-xs">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                YOUR ORDER
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="font-bold text-charcoal">Hand-thrown Stoneware Vase</h5>
                  <p className="text-[10px] text-on-surface-variant">Qty: 1</p>
                </div>
              </div>
            </div>

            {/* Artisan Certified Seal */}
            <div className="bg-white p-4 px-5 rounded-2xl border border-outline-variant/30 shadow-xl flex items-center gap-3 text-xs">
              <span className="material-symbols-outlined text-forest-green text-xl shrink-0">verified</span>
              <div>
                <h6 className="font-bold text-charcoal uppercase tracking-wider text-[10px]">ARTISAN CERTIFIED</h6>
                <p className="text-[10px] text-on-surface-variant">Packaged with sustainable hemp fibers and recycled paper.</p>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default LiveMapTracking;
