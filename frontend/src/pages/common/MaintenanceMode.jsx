import React from 'react';
import { Link } from 'react-router-dom';

const MaintenanceMode = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-12 flex items-center justify-center">
        
        {/* Maintenance Card */}
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-outline-variant/30 shadow-xl flex flex-col md:flex-row items-center gap-8 text-xs">
          
          {/* Potter on Wheel Photo */}
          <div className="w-full md:w-72 h-64 md:h-80 rounded-2xl overflow-hidden bg-surface-container shrink-0 shadow-inner">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" 
              alt="Artisan at pottery wheel" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Text & Timer Content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-widest block font-mono">
                TRUEHAND MARKETPLACE
              </span>
              <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">
                Refining the Craft
              </h1>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                We are currently updating our digital gallery to better showcase our artisans' work. We will return shortly with a more curated experience.
              </p>
            </div>

            {/* Expected Return Countdown Box */}
            <div className="p-4 rounded-2xl bg-surface-container-low/80 border border-outline-variant/20 space-y-1">
              <div className="flex items-center gap-1.5 text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>EXPECTED RETURN</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="font-display-lg text-2xl font-bold text-charcoal font-mono">02 : 45 : 09</h3>
                <span className="text-[10px] text-on-surface-variant font-mono">Until Completion</span>
              </div>
            </div>

            {/* Concierge & Share Actions */}
            <div className="flex justify-between items-center pt-2">
              <Link 
                to="/help"
                className="text-xs font-bold text-forest-green hover:underline flex items-center gap-1"
              >
                <span>Contact Concierge</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>

              <div className="flex items-center gap-3 text-on-surface-variant">
                <button className="hover:text-charcoal"><span className="material-symbols-outlined text-base">public</span></button>
                <button className="hover:text-charcoal"><span className="material-symbols-outlined text-base">share</span></button>
              </div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default MaintenanceMode;
