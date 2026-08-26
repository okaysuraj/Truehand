import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AvailabilitySettings = () => {
  const navigate = useNavigate();
  const [offline, setOffline] = useState(false);
  const [autoAccept, setAutoAccept] = useState(true);
  const [radius, setRadius] = useState(25);

  const handleUpdate = () => {
    alert('Availability settings updated successfully!');
    navigate('/delivery/profile');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">
            Availability Settings
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            Configure how and when you receive artisanal delivery requests.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Toggles & Actions */}
          <div className="lg:col-span-5 space-y-6 text-xs">
            
            {/* Card 1: Status Control */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider block">
                    STATUS CONTROL
                  </span>
                  <h4 className="font-headline-md text-base font-bold text-charcoal mt-1">Go Offline</h4>
                </div>

                <button 
                  onClick={() => setOffline(!offline)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                    offline ? 'bg-forest-green justify-end' : 'bg-surface-container justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Temporarily stop receiving new delivery requests. You will still be able to complete active deliveries.
              </p>
            </div>

            {/* Card 2: Workflow Auto-Accept */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-label-sm text-[10px] uppercase font-bold text-forest-green tracking-wider block">
                    WORKFLOW
                  </span>
                  <h4 className="font-headline-md text-base font-bold text-charcoal mt-1">Auto-Accept Orders</h4>
                </div>

                <button 
                  onClick={() => setAutoAccept(!autoAccept)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                    autoAccept ? 'bg-forest-green justify-end' : 'bg-surface-container justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Automatically accept incoming requests that meet your criteria for a seamless, hands-free experience.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-3 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
              >
                Discard Changes
              </button>
              <button 
                type="button"
                onClick={handleUpdate}
                className="flex-1 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow"
              >
                Update Availability
              </button>
            </div>

          </div>

          {/* Right Column: Geofencing Radius & Map Simulation */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <div>
                <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">GEOFENCING</span>
                <h3 className="font-display-md text-base font-bold text-charcoal mt-0.5">Delivery Radius</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-forest-green rounded-xl font-bold font-mono text-xs">
                {radius} MILES
              </span>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full accent-forest-green cursor-pointer h-2 bg-surface-container rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant font-mono font-semibold">
                <span>1mi</span>
                <span>50mi</span>
              </div>
            </div>

            {/* Map Preview Graphic */}
            <div className="h-72 rounded-2xl overflow-hidden bg-[#e4e8e5] border border-outline-variant/20 relative flex items-center justify-center p-6">
              
              {/* Concentric Geofence Rings */}
              <div className="w-56 h-56 rounded-full border-2 border-forest-green/40 bg-forest-green/10 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-2 border-forest-green/60 bg-forest-green/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-forest-green ring-4 ring-white shadow-md" />
                </div>
              </div>

              {/* Map Tag overlay */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl border border-outline-variant/30 text-[10px] space-y-0.5 shadow-sm">
                <p className="font-bold text-charcoal">Delivery Radius Active</p>
                <p className="text-on-surface-variant">Central Hub &bull; {radius} miles coverage</p>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
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

export default AvailabilitySettings;
