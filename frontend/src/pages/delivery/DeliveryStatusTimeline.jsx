import React from 'react';
import { Link } from 'react-router-dom';

const DeliveryStatusTimeline = () => {
  return (
    <div className="min-h-screen bg-surface-linen font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 space-y-10">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div className="space-y-1">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              ORDER #TH-92841
            </span>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Arriving Today
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl">
              Your artisanal hand-thrown ceramic set and linen textiles are on their way to your door.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Connecting to courier...')}
              className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow"
            >
              <span className="material-symbols-outlined text-base">support_agent</span>
              Contact Courier
            </button>
            <button 
              onClick={() => alert('Delivery instructions modal')}
              className="px-5 py-2.5 bg-white border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">description</span>
              Delivery Instructions
            </button>
          </div>
        </div>

        {/* 2-Column Section: Map Track & Journey Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Map Card */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
            <div className="relative h-80 rounded-2xl bg-[#dfe6e2] overflow-hidden p-6 flex flex-col justify-between">
              
              {/* Floating ETA */}
              <div className="bg-white/95 backdrop-blur px-4 py-2.5 rounded-2xl shadow border border-outline-variant/30 max-w-xs flex items-center gap-3">
                <span className="material-symbols-outlined text-forest-green text-2xl">local_shipping</span>
                <div>
                  <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">Estimated Delivery</span>
                  <p className="font-display-md text-sm font-bold text-charcoal">2:45 PM &mdash; 4:15 PM</p>
                </div>
              </div>

              {/* Map Illustration center */}
              <div className="flex items-center justify-center text-forest-green/40">
                <span className="material-symbols-outlined text-8xl animate-pulse">route</span>
              </div>

              {/* Bottom Path Bar */}
              <div className="bg-white/90 backdrop-blur p-3 px-4 rounded-xl border border-outline-variant/30 flex justify-between text-[11px] font-semibold text-charcoal">
                <span>Local Hub</span>
                <span className="text-forest-green font-bold">&bull; Out for Delivery</span>
                <span>Your Home</span>
              </div>

            </div>
          </div>

          {/* Right: Journey Details Timeline */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <h3 className="font-display-md text-base font-bold text-charcoal">Journey Details</h3>

            <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
              
              <div className="relative space-y-0.5">
                <span className="w-5 h-5 rounded-full bg-forest-green text-white flex items-center justify-center text-[10px] absolute -left-6 top-0 font-bold">&bull;</span>
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-charcoal">Out for Delivery</h5>
                  <span className="text-[10px] text-on-surface-variant font-mono">11:30 AM</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Courier is navigating to your neighborhood with your order.</p>
              </div>

              <div className="relative space-y-0.5">
                <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px] absolute -left-6 top-0 font-bold">&check;</span>
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-charcoal">Arrived at Local Hub</h5>
                  <span className="text-[10px] text-on-surface-variant font-mono">08:15 AM</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Package processed at the metropolitan distribution gallery.</p>
              </div>

              <div className="relative space-y-0.5">
                <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px] absolute -left-6 top-0 font-bold">&check;</span>
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-charcoal">Handed to Courier</h5>
                  <span className="text-[10px] text-on-surface-variant font-mono">Yesterday</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Our specialist logistics partner has collected your items.</p>
              </div>

              <div className="relative space-y-0.5">
                <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px] absolute -left-6 top-0 font-bold">&check;</span>
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-charcoal">Order Prepared</h5>
                  <span className="text-[10px] text-on-surface-variant font-mono">Oct 24</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Carefully wrapped in sustainable packaging at our artisan studio.</p>
              </div>

            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex items-center gap-2 text-on-surface-variant text-[11px]">
              <span className="material-symbols-outlined text-forest-green text-base">eco</span>
              <span>Insured &amp; Carbon Neutral Shipping</span>
            </div>
          </div>

        </div>

        {/* Package Contents Strip */}
        <div className="space-y-4">
          <h3 className="font-display-md text-center text-xl font-bold text-charcoal">
            Package Contents
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm text-center">
              <div className="h-64 bg-surface-container overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-0.5">
                <h4 className="font-headline-md text-sm font-bold text-charcoal">Tonal Ceramic Basin</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">ARTISAN REGISTRY: #8821</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm text-center">
              <div className="h-64 bg-surface-container overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-0.5">
                <h4 className="font-headline-md text-sm font-bold text-charcoal">Raw Linen Textile Set</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">NATURAL FIBER SERIES</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm text-center">
              <div className="h-64 bg-surface-container overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-0.5">
                <h4 className="font-headline-md text-sm font-bold text-charcoal">Studio Tool Kit</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">LIMITED EDITION</p>
              </div>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
};

export default DeliveryStatusTimeline;
