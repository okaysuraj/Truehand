import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const OrderTracking = () => {
  const { id, orderId } = useParams();
  const activeId = id || orderId || 'ASH-928341';
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8 pb-4 border-b border-outline-variant/30">
        <div>
          <span className="font-label-sm text-xs text-terracotta uppercase tracking-widest font-bold block mb-1">
            Order #{activeId.startsWith('#') ? activeId.slice(1) : activeId}
          </span>
          <h1 className="font-display-lg text-3xl md:text-5xl text-forest-green font-bold">
            Out for Delivery
          </h1>
        </div>

        <div className="md:text-right">
          <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider block font-semibold">
            Estimated Arrival
          </span>
          <span className="font-display-lg text-xl md:text-2xl text-forest-green font-bold">
            Today, 2:45 PM — 3:15 PM
          </span>
        </div>
      </div>

      {/* Main Grid: Map & Tracking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: Live Map Canvas */}
        <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] bg-surface-container rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 group">
          
          {/* Stylized Map Underlay */}
          <img 
            className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
            alt="City Map Route" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9sLL9JIqWYcZyiXC4PiCwpfwOWftaTlB2UgiFq58PjMAr9iGw4TefDE_FpwooRqfB3-KSaV69AfgT5bwQRfODFk3Uz4phVlpUEnueeslL6ur8ihub3Z9U1NN0kusAbLdqj9nNa5XPOuJo3HwMwOmHTKBnPrYI7Gl_gSx3wa-wRbQOupwC6z-aW3JtF6zmQQDIzl8QGg-EDzrnN81mGAjmaGgyUOtUwvx5CmVVpq14WpsQSgLP0l9f_g" 
          />

          {/* Pulsing Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute w-8 h-8 rounded-full bg-forest-green opacity-40"></span>
              <div className="w-5 h-5 rounded-full bg-forest-green border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow border border-outline-variant/30 p-1">
            <button className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-surface-container rounded text-sm font-bold">+</button>
            <button className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-surface-container rounded text-sm font-bold">&minus;</button>
            <button className="w-8 h-8 flex items-center justify-center text-forest-green hover:bg-surface-container rounded">
              <span className="material-symbols-outlined text-[18px]">my_location</span>
            </button>
          </div>

          {/* Floating Courier Badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-outline-variant/30 flex items-center justify-between gap-4 sm:min-w-[280px]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-outline-variant shrink-0">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Julian Vance" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU3O6ywVK7jEMLvKVA2kxssgwGL1XlWsOAd84tu2XqZg4CgzMYwltj5tWAQ2Ql8IT5-5vy-eHa4sLDQptw0SRhg91q6t80nQZblBDtMIfRgO6xDTt-aalUaPfafhqNy6M2zGihlYjIFhars6KFVaVaaXuwbb1XPoHyo2Tean4Jy8_9ET7nngtylq-67tC3Lz5ezyZgAqsdw6ASwH_K2vf_bCNtZUQmDTguRdIoB-r5OyDzVc98AqtFxQ" 
                />
              </div>
              <div>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider block font-semibold">Your Courier</span>
                <p className="font-headline-md text-sm text-forest-green font-bold">Julian Vance</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => alert('Calling courier Julian Vance...')}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-forest-green hover:bg-forest-green hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </button>
              <button 
                onClick={() => alert('Opening direct chat with courier...')}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-forest-green hover:bg-forest-green hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Tracking History & Package Contents */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Tracking History */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <h2 className="font-headline-md text-lg text-forest-green font-bold mb-6 pb-3 border-b border-outline-variant/20">
              Tracking History
            </h2>

            <div className="space-y-6 relative pl-4 border-l-2 border-outline-variant/30">
              
              {/* Event 1 */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-forest-green ring-4 ring-emerald-100"></div>
                <p className="font-headline-md text-xs font-bold text-forest-green">1:15 PM &mdash; Out for Delivery</p>
                <p className="font-body-md text-[11px] text-on-surface-variant">Regional Distribution Hub, Zurich</p>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-outline-variant"></div>
                <p className="font-headline-md text-xs font-semibold text-charcoal">10:45 AM &mdash; Arrived at Hub</p>
                <p className="font-body-md text-[11px] text-on-surface-variant">Central Sorting Facility</p>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-outline-variant"></div>
                <p className="font-headline-md text-xs font-semibold text-charcoal">08:20 AM &mdash; Handed to Courier</p>
                <p className="font-body-md text-[11px] text-on-surface-variant">Aesthete Artisan Workshop, Geneva</p>
              </div>

              {/* Event 4 */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-outline-variant"></div>
                <p className="font-headline-md text-xs font-semibold text-charcoal">Yesterday, 4:30 PM &mdash; Order Prepared</p>
                <p className="font-body-md text-[11px] text-on-surface-variant">Quality Control &amp; Preservation Wrap</p>
              </div>

            </div>
          </div>

          {/* Package Contents */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <h2 className="font-headline-md text-base text-forest-green font-bold">Package Contents</h2>
              <span className="font-label-sm text-xs text-on-surface-variant">2 Items</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-14 bg-surface-container rounded-lg overflow-hidden shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w" alt="Terra Sigillata Vase" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-label-md text-xs font-bold text-on-surface">Terra Sigillata Vase</h4>
                  <p className="text-[10px] text-on-surface-variant">Hand-thrown Ceramic &bull; Ivory</p>
                </div>
                <span className="font-headline-md text-xs font-bold text-forest-green">$240.00</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-14 bg-surface-container rounded-lg overflow-hidden shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXA3GWA23w_MtAVNZ6230AT9lqrn3LPY-iyOqp3NaVS_V4YrxE_AdmK_2g1FPAM4jkeQZGiAAJiVjSlds-VhJi4GOAyJ-QZ9HresMcSzWUiyvISEpJN87fqj_92rBN9GFvGdBC5rvM6TnCER5WekVhFNUEVNoXVn5BPclzHj3Qn78Pst4X8_RVMiSd-S2MIkdC6d1I_4SjGQOrh26YZzbQtdydbgUhD8a9JqyyrraLEZ2lJE4yu9WGPA" alt="Heirloom Linen Set" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-label-md text-xs font-bold text-on-surface">Heirloom Linen Set</h4>
                  <p className="text-[10px] text-on-surface-variant">Set of 4 &bull; Forest Green</p>
                </div>
                <span className="font-headline-md text-xs font-bold text-forest-green">$85.00</span>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-baseline">
              <span className="font-label-md text-xs text-on-surface-variant font-bold">Order Total</span>
              <span className="font-display-lg text-lg text-forest-green font-bold">$325.00</span>
            </div>
          </div>

        </div>

      </div>

      {/* Trust Features Grid */}
      <div className="pt-8 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-forest-green text-2xl mb-2 block">verified</span>
          <h3 className="font-headline-md text-sm text-forest-green font-bold mb-1">Authenticity Guarantee</h3>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Each piece is hand-selected and verified by our curators before shipping.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-forest-green text-2xl mb-2 block">eco</span>
          <h3 className="font-headline-md text-sm text-forest-green font-bold mb-1">Preservation Wrap</h3>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Packaged with 100% biodegradable materials designed for artifact safety.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-forest-green text-2xl mb-2 block">support_agent</span>
          <h3 className="font-headline-md text-sm text-forest-green font-bold mb-1">Dedicated Concierge</h3>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Our support team is available 24/7 to assist with your delivery logistics.
          </p>
        </div>
      </div>

    </main>
  );
};

export default OrderTracking;
