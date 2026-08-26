import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AgentOnboarding = () => {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState('Bicycle / Cargo Bike');
  const [regNumber, setRegNumber] = useState('ABC-12345');

  const handleContinue = (e) => {
    e.preventDefault();
    alert('Verification submitted! Moving to Training Modules.');
    navigate('/delivery/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between">
      
      {/* Top Bar */}
      <header className="px-6 md:px-12 py-5 flex justify-between items-center border-b border-outline-variant/20 bg-white">
        <Link to="/" className="flex items-center gap-2 text-forest-green">
          <span className="material-symbols-outlined text-2xl">local_shipping</span>
          <span className="font-display-md text-lg font-bold tracking-tight text-charcoal">TrueHand Logistics</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
            <span>Step 2 of 4</span>
            <div className="w-24 bg-surface-container rounded-full h-1.5 overflow-hidden">
              <div className="bg-charcoal h-1.5 rounded-full w-1/2" />
            </div>
          </div>
          <button onClick={() => navigate('/delivery/dashboard')} className="text-on-surface-variant hover:text-charcoal">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Sidebar Steps */}
        <div className="md:col-span-4 space-y-6">
          <div className="space-y-1">
            <h2 className="font-display-md text-xl font-bold text-charcoal">Agent Onboarding</h2>
            <p className="text-xs text-on-surface-variant">Complete these steps to start your first delivery route.</p>
          </div>

          <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40 text-xs">
            
            {/* Step 1 */}
            <div className="relative">
              <span className="w-5 h-5 rounded-full bg-forest-green text-white flex items-center justify-center text-[10px] absolute -left-6 top-0 font-bold">&check;</span>
              <h5 className="font-bold text-charcoal">Basic Information</h5>
              <p className="text-[10px] text-on-surface-variant">Completed</p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="w-5 h-5 rounded-full bg-white border-2 border-forest-green text-forest-green flex items-center justify-center text-[10px] absolute -left-6 top-0 font-bold">&bull;</span>
              <h5 className="font-bold text-forest-green">Identity &amp; Vehicle</h5>
              <p className="text-[10px] text-on-surface-variant font-semibold">In Progress</p>
            </div>

            {/* Step 3 */}
            <div className="relative opacity-40">
              <span className="w-5 h-5 rounded-full bg-surface-container absolute -left-6 top-0" />
              <h5 className="font-bold text-charcoal">Training Modules</h5>
              <p className="text-[10px] text-on-surface-variant">Pending</p>
            </div>

            {/* Step 4 */}
            <div className="relative opacity-40">
              <span className="w-5 h-5 rounded-full bg-surface-container absolute -left-6 top-0" />
              <h5 className="font-bold text-charcoal">Carrier Agreement</h5>
              <p className="text-[10px] text-on-surface-variant">Pending</p>
            </div>

          </div>

          {/* Encryption Note */}
          <div className="p-4 rounded-2xl bg-white border border-outline-variant/30 text-xs space-y-1.5 shadow-sm">
            <span className="material-symbols-outlined text-forest-green text-lg">verified_user</span>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Your data is encrypted and handled according to our <strong className="text-charcoal underline">Privacy Policy</strong>. We only use these details for fulfillment verification.
            </p>
          </div>
        </div>

        {/* Right Form: Verification Details */}
        <div className="md:col-span-8 space-y-6">
          <div>
            <h1 className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal mb-1">
              Verification Details
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant">
              Please upload high-quality scans or photographs of your credentials. Ensure all text is legible and no edges are cropped.
            </p>
          </div>

          {/* Card 1: Government ID */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <div>
                <h4 className="font-display-md text-base font-bold text-charcoal">Government ID</h4>
                <p className="text-[11px] text-on-surface-variant">Passport, Driver's License, or National ID Card.</p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-xl">badge</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="border-2 border-dashed border-outline-variant/60 hover:border-forest-green rounded-2xl p-6 text-center space-y-2 cursor-pointer transition-colors bg-surface-container-lowest">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">add_a_photo</span>
                <h5 className="font-bold text-charcoal">Front Side</h5>
                <p className="text-[10px] text-on-surface-variant">JPEG or PNG, max 10MB</p>
              </div>

              <div className="border-2 border-dashed border-outline-variant/60 hover:border-forest-green rounded-2xl p-6 text-center space-y-2 cursor-pointer transition-colors bg-surface-container-lowest">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">add_a_photo</span>
                <h5 className="font-bold text-charcoal">Back Side</h5>
                <p className="text-[10px] text-on-surface-variant">JPEG or PNG, max 10MB</p>
              </div>
            </div>
          </div>

          {/* Card 2: Vehicle Details */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <div>
                <h4 className="font-display-md text-base font-bold text-charcoal">Vehicle Details</h4>
                <p className="text-[11px] text-on-surface-variant">Information regarding your primary delivery vehicle.</p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-xl">directions_car</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                  Vehicle Type
                </label>
                <select 
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-semibold text-charcoal focus:outline-none"
                >
                  <option>Bicycle / Cargo Bike</option>
                  <option>E-Scooter</option>
                  <option>Cargo Van</option>
                  <option>Sedan / Hatchback</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                  Registration Number
                </label>
                <input 
                  type="text" 
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-semibold font-mono text-charcoal focus:outline-none"
                />
              </div>
            </div>

            {/* Insurance & Registration Scans */}
            <div className="space-y-2 pt-2">
              <span className="font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider block">
                Insurance &amp; Registration Scans
              </span>

              <div className="p-3.5 rounded-xl border border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
                <div className="flex items-center gap-2 text-charcoal font-semibold">
                  <span className="material-symbols-outlined text-base">description</span>
                  <span>Commercial Insurance Policy</span>
                </div>
                <span className="material-symbols-outlined text-base text-on-surface-variant">upload</span>
              </div>

              <div className="p-3.5 rounded-xl border border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
                <div className="flex items-center gap-2 text-charcoal font-semibold">
                  <span className="material-symbols-outlined text-base">description</span>
                  <span>Vehicle Registration Document</span>
                </div>
                <span className="material-symbols-outlined text-base text-on-surface-variant">upload</span>
              </div>
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => alert('Draft saved.')}
              className="px-6 py-3 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors w-full sm:w-auto"
            >
              Save Draft
            </button>

            <div className="flex gap-3 w-full sm:w-auto justify-end">
              <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="px-5 py-3 border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
              >
                Back
              </button>
              <button 
                type="button" 
                onClick={handleContinue}
                className="px-8 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Continue to Training</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
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

export default AgentOnboarding;
