import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DeliveryLogin = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      alert('Please enter your Agent ID or mobile number.');
      return;
    }
    navigate('/delivery/verify-otp');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between">
      
      {/* Top Brand Bar */}
      <header className="px-6 md:px-12 py-5 flex justify-between items-center border-b border-outline-variant/20 bg-white">
        <Link to="/" className="flex items-center gap-2 text-forest-green">
          <span className="material-symbols-outlined text-2xl">local_shipping</span>
          <span className="font-display-md text-lg font-bold tracking-tight text-charcoal">TrueHand Logistics</span>
        </Link>
        <span className="text-xs text-on-surface-variant font-mono">Logistics Portal v2.4</span>
      </header>

      {/* Main Agent Access Card */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl border border-outline-variant/30 shadow-xl space-y-6 text-center">
          
          <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mx-auto text-forest-green">
            <span className="material-symbols-outlined text-2xl">pin_drop</span>
          </div>

          <div className="space-y-1.5">
            <h1 className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal">
              Agent Access
            </h1>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Authentic delivery for an artisan marketplace.<br />Please enter your credentials to begin your route.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="block font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                Agent ID or Phone Number
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="TH-000000 or 10-digit mobile"
                  className="w-full bg-surface-container-low border-b-2 border-outline-variant/50 focus:border-forest-green py-3 px-3 text-xs focus:outline-none font-mono text-charcoal"
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                  badge
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow"
            >
              <span>Get OTP</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>

          <div className="flex items-center gap-3 text-xs text-on-surface-variant">
            <div className="flex-1 h-[1px] bg-outline-variant/30" />
            <span className="font-semibold text-[10px] uppercase tracking-wider">OR</span>
            <div className="flex-1 h-[1px] bg-outline-variant/30" />
          </div>

          <button 
            type="button" 
            onClick={() => alert('Sign in with Hub Key opened')}
            className="w-full py-3 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
          >
            Sign in with Hub Key
          </button>

          <p className="text-xs text-on-surface-variant pt-2">
            Need assistance? <button onClick={() => alert('Contacting Hub Manager...')} className="font-bold text-charcoal hover:underline">Contact Hub Manager</button>
          </p>

        </div>
      </main>

      {/* Decorative Icon */}
      <div className="flex justify-center pb-4 opacity-40 text-forest-green">
        <span className="material-symbols-outlined text-4xl">eco</span>
      </div>

      {/* Bottom Footer */}
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

export default DeliveryLogin;
