import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotificationDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12 space-y-10 text-xs">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate('/notifications')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-charcoal transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          BACK TO NOTIFICATIONS
        </button>

        {/* 2-Column Hero Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-10 rounded-3xl border border-outline-variant/30 shadow-sm">
          
          {/* Left: Kiln Image */}
          <div className="lg:col-span-6 h-80 md:h-[460px] rounded-2xl overflow-hidden bg-surface-container shadow-inner">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" 
              alt="Pottery kiln firing" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Right: Craft Story Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider block">
                THE FINAL FIRING
              </span>
              <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal leading-tight">
                Your piece is finished.
              </h1>
            </div>

            <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
              After three weeks of patient transformation, your handcrafted ceramic vase has emerged from its final firing. Master Artisan Elias Thorne oversaw the twelve-hour cooling process, ensuring the reactive glaze reached its intended depth of forest and charcoal hues.
            </p>

            <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
              The piece has been inspected for structural integrity and tactile finish. It now rests in our workshop, cooling completely before it is carefully wrapped in sustainable linen and prepared for its journey to you.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => navigate('/tracking')}
                className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow flex items-center gap-2"
              >
                <span>TRACK JOURNEY</span>
                <span className="material-symbols-outlined text-sm">local_shipping</span>
              </button>

              <button 
                onClick={() => alert('Viewing artisan studio notes...')}
                className="px-6 py-3 border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors shadow-sm"
              >
                VIEW ARTISAN NOTES
              </button>
            </div>

            {/* Artisan Signature Badge */}
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container border border-outline-variant/30 shrink-0">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="Elias Thorne" className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="font-bold text-charcoal text-xs">ELIAS THORNE</h5>
                <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider">MASTER CERAMICIST</p>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Value Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <span className="material-symbols-outlined text-forest-green text-xl">diamond</span>
            <h4 className="font-display-md text-base font-bold text-charcoal">Material Origin</h4>
            <p className="text-on-surface-variant font-body-md text-[11px] leading-relaxed">
              Harvested from the riverbeds of the Loire Valley, the clay used for your piece is celebrated for its purity and thermal resilience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <span className="material-symbols-outlined text-forest-green text-xl">schedule</span>
            <h4 className="font-display-md text-base font-bold text-charcoal">48 Hours of Heat</h4>
            <p className="text-on-surface-variant font-body-md text-[11px] leading-relaxed">
              The vase underwent a meticulous two-stage firing process, reaching temperatures of 2,300°F to achieve its stone-like durability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-2">
            <span className="material-symbols-outlined text-forest-green text-xl">verified</span>
            <h4 className="font-display-md text-base font-bold text-charcoal">Certified Grade</h4>
            <p className="text-on-surface-variant font-body-md text-[11px] leading-relaxed">
              Every piece is hand-stamped with the AESTHETE seal of authenticity, confirming it meets our 12-point craft standard.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
};

export default NotificationDetail;
