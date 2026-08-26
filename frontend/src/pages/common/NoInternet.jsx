import React from 'react';
import { Link } from 'react-router-dom';

const NoInternet = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-xl w-full mx-auto p-6 md:p-12 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Kintsugi Ceramic Image Card */}
        <div className="w-full max-w-sm bg-white p-3 rounded-3xl border border-outline-variant/30 shadow-lg relative">
          <div className="h-44 rounded-2xl overflow-hidden bg-surface-container">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" 
              alt="Kintsugi Ceramic" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="absolute -bottom-3 right-6 px-3 py-1 bg-surface-container rounded-full text-[9px] font-bold text-charcoal shadow-sm border border-outline-variant/30">
            Hand-thrown Ceramic
          </div>
        </div>

        {/* Headline & Copy */}
        <div className="space-y-3 max-w-md">
          <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">
            Lost Connection
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            Even the finest craftsmanship requires a steady thread. Our digital workshop has momentarily lost its link to your screen.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2 w-full max-w-xs">
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">sync</span>
            RETRY CONNECTION
          </button>

          <button 
            onClick={() => alert('Network status: Checking connection parameters...')}
            className="text-xs font-semibold text-charcoal hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <span>Check Status</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </main>

    </div>
  );
};

export default NoInternet;
