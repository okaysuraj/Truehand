import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LocationPermission = () => {
  const navigate = useNavigate();

  const handleAllow = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          alert('Location enabled! Showing local artisans near you.');
          navigate('/artisans');
        },
        () => {
          alert('Location enabled! Showing local artisans near you.');
          navigate('/artisans');
        }
      );
    } else {
      navigate('/artisans');
    }
  };

  return (
    <div className="min-h-screen bg-surface-linen font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Split Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Street Market Image with browser popup simulation */}
        <div className="md:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" 
            alt="Artisan Market" 
            className="w-full h-[520px] object-cover" 
          />

          {/* Browser Location Dialog Simulation */}
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/20 backdrop-blur-[2px]">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-xs w-full space-y-4 border border-outline-variant/40 text-center">
              <span className="material-symbols-outlined text-forest-green text-3xl">location_on</span>
              <div className="space-y-1">
                <h4 className="font-headline-md text-sm font-bold text-charcoal">Allow "Aesthete" to access your location?</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Aesthete uses your location to show nearby craft markets, artisans, and events. Your location data is kept private and secure.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <button 
                  onClick={() => navigate('/artisans')}
                  className="py-2 border border-outline-variant rounded-xl font-semibold text-on-surface-variant hover:bg-surface-container"
                >
                  Don't Allow
                </button>
                <button 
                  onClick={handleAllow}
                  className="py-2 bg-forest-green text-white rounded-xl font-bold hover:opacity-90 shadow"
                >
                  Allow
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info and Actions */}
        <div className="md:col-span-6 space-y-8 text-xs">
          
          <div className="space-y-3">
            <span className="px-3 py-1 bg-emerald-50 text-forest-green rounded-full font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">location_on</span>
              LOCAL DISCOVERY
            </span>

            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal leading-tight">
              Find Artisans Near You
            </h1>

            <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Our marketplace thrives on the human touch. Enable location access to discover hidden workshops, seasonal craft fairs, and master artisans working right in your neighborhood.
            </p>
          </div>

          {/* Value props */}
          <div className="space-y-5 pt-2">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white border border-outline-variant/30 flex items-center justify-center text-forest-green shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-lg">verified</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-charcoal text-sm">Curated Workshops</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Access exclusive invitations to local "Meet the Maker" events.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white border border-outline-variant/30 flex items-center justify-center text-forest-green shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-lg">eco</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-charcoal text-sm">Reduce Footprint</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Support regional sustainability by sourcing materials closer to home.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleAllow}
              className="flex-1 py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow"
            >
              Allow Access
            </button>
            <button 
              onClick={() => navigate('/artisans')}
              className="px-8 py-3.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
            >
              Maybe Later
            </button>
          </div>

          <p className="text-[11px] text-on-surface-variant pt-2 leading-relaxed">
            We value your privacy. Your location is only used to personalize your discovery experience and is never shared with third parties.
          </p>

        </div>

      </main>

    </div>
  );
};

export default LocationPermission;
