import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DeliverySuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Split Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        
        {/* Left Photo with DELIVERED Badge */}
        <div className="md:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" 
            alt="Delivered Package" 
            className="w-full h-[460px] object-cover" 
          />
          
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl flex flex-col items-center gap-1">
            <span className="w-8 h-8 rounded-full bg-forest-green text-white flex items-center justify-center text-sm font-bold">&check;</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal">DELIVERED</span>
          </div>
        </div>

        {/* Right Fulfillment Summary & Actions */}
        <div className="md:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider block">
              CONFIRMATION #TH-98421
            </span>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Fulfillment Complete.
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
              The handcrafted ceramic vessels have been successfully delivered to the recipient. Your logistical journey for this task is now recorded.
            </p>
          </div>

          {/* Shipment Contents Card */}
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3 text-xs">
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block pb-1 border-b border-outline-variant/20">
              Shipment Contents
            </span>

            <div className="space-y-2 text-charcoal font-semibold">
              <div className="flex justify-between">
                <span>Hand-thrown Stoneware Vase</span>
                <span className="text-on-surface-variant font-mono">Qty 2</span>
              </div>
              <div className="flex justify-between">
                <span>Terracotta Planter (Large)</span>
                <span className="text-on-surface-variant font-mono">Qty 1</span>
              </div>
              <div className="flex justify-between">
                <span>Glazed Ceramic Incense Holder</span>
                <span className="text-on-surface-variant font-mono">Qty 3</span>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex items-center gap-2 text-forest-green font-bold text-[11px]">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>All items verified and inspected</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={() => navigate('/delivery/assigned')}
              className="flex-1 py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow"
            >
              <span>Start Next Delivery</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <button 
              onClick={() => navigate('/delivery/dashboard')}
              className="px-6 py-3.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">dashboard</span>
              Return to Dashboard
            </button>
          </div>

          <p className="text-xs text-on-surface-variant pt-2">
            Issue with this delivery? <button onClick={() => alert('Opening Hub Support...')} className="font-bold text-charcoal hover:underline">Contact Hub Support &gt;</button>
          </p>
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

export default DeliverySuccess;
