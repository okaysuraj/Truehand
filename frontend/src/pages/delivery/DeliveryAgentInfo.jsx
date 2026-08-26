import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DeliveryAgentInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-linen font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 space-y-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-label-sm uppercase tracking-wider font-semibold">
          <Link to="/admin/delivery-agents" className="hover:text-forest-green">Registry</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Logistics Partners</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-charcoal font-bold">Silas M.</span>
        </nav>

        {/* 2-Column Section: Silas M. Profile & Handling Specialties */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Portrait Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm space-y-4">
            <div className="h-80 bg-surface-container overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" 
                alt="Silas M." 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <h3 className="font-display-lg text-2xl font-bold text-charcoal">Silas M.</h3>
                <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider block mt-0.5">
                  ARTISAN'S COURIER &bull; LEVEL III
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-outline-variant/20">
                <div>
                  <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">DELIVERIES MADE</span>
                  <span className="font-display-md text-base font-bold text-charcoal">1,248</span>
                </div>
                <div>
                  <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">ARTISAN RATING</span>
                  <span className="font-display-md text-base font-bold text-charcoal flex items-center gap-1">
                    4.9 <span className="text-amber-500 text-sm">&star;</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button 
                  onClick={() => alert('Requesting studio pickup...')}
                  className="w-full py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow"
                >
                  Request for Studio Pickup
                </button>
                <button 
                  onClick={() => alert('Route schedule opened')}
                  className="w-full py-2.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
                >
                  View Route Schedule
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Quote, Handling Specialties, Service Philosophy */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quote Block */}
            <div className="space-y-2">
              <span className="text-4xl font-display-md text-terracotta leading-none block">“</span>
              <p className="font-display-lg text-xl md:text-2xl text-charcoal italic leading-snug">
                A delivery is not just a transfer of goods; it is the final handshake between the creator and the collector. I treat every piece as if the artisan's breath is still upon it.
              </p>
              <p className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-widest pt-1">
                &mdash; SILAS M. ON THE ART OF DELIVERY
              </p>
            </div>

            {/* Handling Specialties */}
            <div className="space-y-4 text-xs">
              <h4 className="font-display-md text-base font-bold text-charcoal border-b border-outline-variant/20 pb-2">
                Handling Specialties
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-forest-green">
                    <span className="material-symbols-outlined text-lg">local_cafe</span>
                    <h5 className="font-headline-md text-xs font-bold uppercase tracking-wider text-charcoal">Ceramics &amp; Glass</h5>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Certified in high-tension packing for fragile kiln-fired ceramics and hand-blown crystalline structures.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-forest-green">
                    <span className="material-symbols-outlined text-lg">storefront</span>
                    <h5 className="font-headline-md text-xs font-bold uppercase tracking-wider text-charcoal">Studio Direct</h5>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Trusted access to private artisan studios for secure, white-glove extraction of commission-only inventory.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-forest-green">
                    <span className="material-symbols-outlined text-lg">thermostat</span>
                    <h5 className="font-headline-md text-xs font-bold uppercase tracking-wider text-charcoal">Climate Controlled</h5>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Maintains strict temperature and humidity standards for raw materials and organic fiber-based art.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-forest-green">
                    <span className="material-symbols-outlined text-lg">verified</span>
                    <h5 className="font-headline-md text-xs font-bold uppercase tracking-wider text-charcoal">Archival Documentation</h5>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Expert handling of provenance papers and certificates of authenticity during the shipping transit.
                  </p>
                </div>

              </div>
            </div>

            {/* Service Philosophy Bento */}
            <div className="space-y-4 text-xs">
              <h4 className="font-display-md text-base font-bold text-charcoal border-b border-outline-variant/20 pb-2">
                Service Philosophy
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8 bg-[#163428] text-white p-6 rounded-3xl space-y-2 shadow-md">
                  <h5 className="font-display-lg text-lg font-bold">12 Years of Unbroken Trust</h5>
                  <p className="text-xs text-white/80 leading-relaxed font-body-md">
                    Silas joined AESTHETE in its founding year. He has moved over 4,000 unique artifacts across borders, ensuring that the soul of the work remains intact from the master's hand to the collector's shelf.
                  </p>
                </div>

                <div className="sm:col-span-4 bg-[#ffdecb] text-[#97472a] p-6 rounded-3xl space-y-2 shadow-sm flex flex-col justify-between text-center items-center">
                  <span className="material-symbols-outlined text-3xl">handshake</span>
                  <div>
                    <h6 className="font-bold uppercase tracking-wider text-[11px]">COMMUNITY PILLAR</h6>
                    <p className="text-[10px] font-semibold mt-1">Voted 'Courier of the Year' 2022 &amp; 2023</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default DeliveryAgentInfo;
