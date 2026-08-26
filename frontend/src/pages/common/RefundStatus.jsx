import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

const RefundStatus = () => {
  const { orderId, id } = useParams();
  const activeOrderId = orderId || id || 'AH-82910';
  const [refundAmount, setRefundAmount] = useState(485.00);

  useEffect(() => {
    if (orderId) {
      api.get(`/orders/${orderId}`)
        .then(res => {
          if (res.data?.totalAmount) {
            setRefundAmount(res.data.totalAmount);
          }
        })
        .catch(e => console.warn(e));
    }
  }, [orderId]);

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Main Content: Refund Status */}
        <div className="flex-1 space-y-8 w-full">
          <header className="space-y-2">
            <h1 className="font-display-lg text-3xl md:text-5xl text-charcoal font-bold">Refund Status</h1>
            <p className="font-body-lg text-xs md:text-sm text-on-surface-variant max-w-xl leading-relaxed">
              We are processing your return for Order #{activeOrderId.startsWith('#') ? activeOrderId.slice(1) : activeOrderId}. Transparency is at the heart of our craft.
            </p>
          </header>

          {/* Status Card */}
          <div className="bg-white p-6 md:p-10 shadow-sm border border-outline-variant/30 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-outline-variant/20">
              <div>
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest font-bold block">Refund Amount</span>
                <div className="font-headline-lg text-2xl md:text-4xl text-forest-green font-bold mt-1">${refundAmount.toFixed(2)}</div>
              </div>
              <div className="flex flex-col justify-end md:items-end">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest font-bold block">Est. Completion</span>
                <div className="font-body-md text-sm text-charcoal font-semibold mt-1">Oct 24, 2024</div>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="space-y-8 relative">
              
              {/* Step 1 */}
              <div className="flex gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-label-md text-xs sm:text-sm font-bold text-charcoal">Return Received</h3>
                  <p className="font-body-md text-xs text-on-surface-variant mt-0.5">The package arrived at our artisan workshop in Florence on Oct 18.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-label-md text-xs sm:text-sm font-bold text-charcoal">Inspected</h3>
                  <p className="font-body-md text-xs text-on-surface-variant mt-0.5">Our material specialists have verified the condition of the ceramic vessels. Passed quality check.</p>
                </div>
              </div>

              {/* Step 3 (Active) */}
              <div className="flex gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-forest-green border border-forest-green text-white flex items-center justify-center shrink-0 z-10 ring-4 ring-emerald-200">
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-label-md text-xs sm:text-sm font-bold text-forest-green">Refund Approved</h3>
                  <p className="font-body-md text-xs text-charcoal font-medium mt-0.5">Approval granted on Oct 20. We are now initiating the transfer with your bank.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 relative opacity-60">
                <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-sm">payments</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-label-md text-xs sm:text-sm font-semibold text-on-surface-variant">Amount Credited</h3>
                  <p className="font-body-md text-xs text-on-surface-variant mt-0.5">Funds will appear in your account within 3-5 business days.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="w-full lg:w-80 space-y-6 shrink-0">
          
          {/* Payment Info */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
            <h2 className="font-label-sm text-xs text-charcoal uppercase tracking-widest font-bold">Original Payment</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-charcoal rounded flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-[10px] text-white font-bold tracking-tighter">VISA</span>
              </div>
              <div>
                <p className="font-headline-md text-xs font-bold text-charcoal">Visa ending in 4421</p>
                <p className="text-[10px] text-on-surface-variant">Exp 12/26</p>
              </div>
            </div>
            <div className="pt-3 border-t border-outline-variant/20 text-xs text-on-surface-variant leading-relaxed">
              <span className="uppercase text-[9px] font-bold text-outline block mb-0.5">Billing Address</span>
              1248 Heritage Way, London, SW1A 1AA, UK
            </div>
          </div>

          {/* Need Assistance */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <h3 className="font-headline-md text-sm text-forest-green font-bold">Need Assistance?</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Our dedicated Artisan Concierge is available to discuss any nuances regarding your refund or next selection.
            </p>
            <Link to="/help" className="text-xs font-bold text-forest-green hover:underline inline-flex items-center gap-1 pt-1">
              Contact Concierge &rarr;
            </Link>
          </div>

          {/* Image Banner */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20 relative group">
            <img 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="Artisan ceramic bowls" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <p className="text-white text-xs italic font-serif">"Beauty in every detail."</p>
            </div>
          </div>

        </aside>

      </div>

    </main>
  );
};

export default RefundStatus;
