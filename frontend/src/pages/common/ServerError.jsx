import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ServerError = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-6 md:p-12 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Kiln Graphic Simulation Card */}
        <div className="w-full max-w-md bg-white p-3 rounded-3xl border border-outline-variant/30 shadow-lg">
          <div className="rounded-2xl overflow-hidden relative min-h-[220px] flex flex-col items-center justify-center text-white p-6">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" 
              alt="Kiln glowing embers" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            <div className="relative z-10 space-y-2">
              <h3 className="font-display-lg text-4xl font-bold">503</h3>
              <h4 className="font-display-md text-base font-bold">Kiln Firing in Progress</h4>
              <p className="text-[10px] text-white/80 max-w-xs mx-auto leading-relaxed">
                Our artisanal kiln is currently reaching peak temperatures. Perfection cannot be rushed. Please refresh the page or try again shortly.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 px-3 py-1 bg-white/90 text-charcoal rounded-lg text-[9px] uppercase tracking-wider font-bold hover:bg-white"
              >
                Refresh Artisan View
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 max-w-lg">
          <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-widest block font-mono">
            STATUS 500
          </span>
          <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-charcoal">
            Refining the Craft
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            Our digital workshop is currently undergoing a necessary tempering. We are perfecting the connection between artisan and collector.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-8 py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return to Gallery
          </button>

          <Link 
            to="/story"
            className="text-xs font-bold text-charcoal underline hover:text-forest-green transition-colors"
          >
            Visit Our Story
          </Link>
        </div>

        <p className="text-[10px] text-on-surface-variant font-mono">
          Wait for the fire to settle. The system will be restored momentarily.
        </p>

      </main>

    </div>
  );
};

export default ServerError;
