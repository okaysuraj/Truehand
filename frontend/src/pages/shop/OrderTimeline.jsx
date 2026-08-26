import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const OrderTimeline = () => {
  const { id, orderId } = useParams();
  const activeId = id || orderId || 'ATH-8829104';
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Header Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <span className="font-label-md text-xs text-terracotta uppercase tracking-widest mb-1 block font-bold">
              Order Journey
            </span>
            <h1 className="font-display-lg text-3xl md:text-5xl text-forest-green font-bold">
              #{activeId.startsWith('#') ? activeId.slice(1) : activeId}
            </h1>
            <p className="font-body-lg text-xs md:text-sm text-on-surface-variant mt-2 max-w-xl leading-relaxed">
              Your handcrafted collection is on its way. We follow each step of the creation and transit process to ensure the highest artisanal standards.
            </p>
          </div>

          <div className="md:text-right">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full mb-1 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-green"></span>
              </span>
              <span>IN TRANSIT</span>
            </div>
            <p className="font-label-sm text-xs text-on-surface-variant font-medium">Estimated Delivery: Oct 24, 2024</p>
          </div>
        </div>
      </section>

      {/* Bento Layout for Order Details & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Tracking Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Courier Details Card */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <h3 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-4">
              Courier Details
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-forest-green shrink-0">
                <span className="material-symbols-outlined text-2xl">local_shipping</span>
              </div>
              <div>
                <p className="font-label-md text-xs font-bold text-forest-green">Global Artisan Logistics</p>
                <p className="font-mono text-xs text-on-surface-variant">Tracking: TRK900211330</p>
              </div>
            </div>
            <button 
              onClick={() => alert('Redirecting to Global Artisan Logistics portal...')}
              className="w-full border border-forest-green text-forest-green font-label-md text-xs uppercase tracking-wider py-2.5 rounded-lg hover:bg-forest-green hover:text-white transition-all font-semibold"
            >
              Track on External Site
            </button>
          </div>

          {/* Delivery Address Card */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <h3 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-3">
              Delivery Address
            </h3>
            <p className="font-body-md text-xs text-charcoal leading-relaxed">
              <span className="font-bold block">Julianne Sterling</span>
              224 Highveld Row, Apt 4B<br />
              Cape Town, 8001<br />
              South Africa
            </p>
          </div>

          {/* Product Mini-Gallery */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm">
            <h3 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-3">
              Order Content
            </h3>
            <div className="flex gap-2">
              <div className="w-16 h-16 bg-surface-container rounded-lg overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" alt="Vase" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w" />
              </div>
              <div className="w-16 h-16 bg-surface-container rounded-lg overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" alt="Throw" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXA3GWA23w_MtAVNZ6230AT9lqrn3LPY-iyOqp3NaVS_V4YrxE_AdmK_2g1FPAM4jkeQZGiAAJiVjSlds-VhJi4GOAyJ-QZ9HresMcSzWUiyvISEpJN87fqj_92rBN9GFvGdBC5rvM6TnCER5WekVhFNUEVNoXVn5BPclzHj3Qn78Pst4X8_RVMiSd-S2MIkdC6d1I_4SjGQOrh26YZzbQtdydbgUhD8a9JqyyrraLEZ2lJE4yu9WGPA" />
              </div>
              <div className="w-16 h-16 bg-surface-container-high rounded-lg flex items-center justify-center text-on-surface-variant font-bold text-xs">
                +1
              </div>
            </div>
          </div>

        </div>

        {/* Timeline Main Card */}
        <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-2xl border border-outline-variant/30 shadow-sm">
          <div className="relative">
            
            {/* Background Line */}
            <div className="absolute left-[15px] md:left-[19px] top-6 bottom-6 w-[2px] bg-outline-variant/30"></div>
            {/* Active Progress Line */}
            <div className="absolute left-[15px] md:left-[19px] top-24 bottom-6 w-[2px] bg-forest-green"></div>

            <div className="space-y-10">
              
              {/* Milestone 1: Delivered (Future) */}
              <div className="relative flex items-start gap-4 opacity-40">
                <div className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-outline-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">inventory_2</span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-headline-md text-base font-bold text-on-surface">Delivered</h4>
                    <span className="font-label-sm text-xs text-on-surface-variant">Expected Oct 24</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    The package will be handed over to you at your doorstep or secured at your chosen drop-off point.
                  </p>
                </div>
              </div>

              {/* Milestone 2: In Transit (Active) */}
              <div className="relative flex items-start gap-4">
                <div className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-forest-green text-white flex items-center justify-center shrink-0 ring-4 ring-emerald-200">
                  <span className="material-symbols-outlined text-lg">local_shipping</span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-headline-md text-base font-bold text-forest-green">In Transit</h4>
                    <span className="font-label-sm text-xs text-forest-green font-bold">Oct 19, 09:42 AM</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    The shipment has arrived at the regional distribution center in Johannesburg. Clearing customs for local transit.
                  </p>
                  <div className="mt-3 p-3 bg-surface-linen rounded-lg border border-outline-variant/30 flex items-center gap-2 text-xs">
                    <span className="material-symbols-outlined text-terracotta text-[18px]">location_on</span>
                    <span className="font-label-md font-semibold text-charcoal">Current Location: JHB International Hub</span>
                  </div>
                </div>
              </div>

              {/* Milestone 3: Shipped */}
              <div className="relative flex items-start gap-4">
                <div className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-forest-green text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">storefront</span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-headline-md text-base font-bold text-on-surface">Shipped from Studio</h4>
                    <span className="font-label-sm text-xs text-on-surface-variant">Oct 17, 03:15 PM</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    Your order has been carefully packaged with sustainable materials and left our Tokyo workshop.
                  </p>
                </div>
              </div>

              {/* Milestone 4: Confirmed */}
              <div className="relative flex items-start gap-4">
                <div className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-forest-green text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">verified</span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-headline-md text-base font-bold text-on-surface">Confirmed</h4>
                    <span className="font-label-sm text-xs text-on-surface-variant">Oct 16, 11:20 AM</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    Quality check completed. All items have been verified for craftsmanship and authenticity.
                  </p>
                </div>
              </div>

              {/* Milestone 5: Placed */}
              <div className="relative flex items-start gap-4">
                <div className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-forest-green text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">shopping_basket</span>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-headline-md text-base font-bold text-on-surface">Order Placed</h4>
                    <span className="font-label-sm text-xs text-on-surface-variant">Oct 16, 09:05 AM</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    We've received your request for these curated pieces. Our artisans are notified.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Help Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-forest-green p-8 md:p-12 rounded-2xl text-white shadow-lg">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold mb-3">Questions about your journey?</h2>
          <p className="font-body-lg text-xs md:text-sm text-white/80 mb-6 leading-relaxed">
            Our concierge team is available to help you with any inquiries regarding transit, shipping regulations, or specific artisan details.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => alert('Opening live chat with TrueHand Concierge...')}
              className="bg-white text-forest-green px-6 py-3 rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:bg-surface-container shadow"
            >
              Chat with Us
            </button>
            <button 
              onClick={() => navigate('/faq')}
              className="border border-white/40 text-white px-6 py-3 rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-white/10"
            >
              View FAQ
            </button>
          </div>
        </div>

        <div className="hidden md:block h-60 rounded-xl overflow-hidden shadow-2xl">
          <img 
            className="w-full h-full object-cover" 
            alt="Artisan studio desk" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" 
          />
        </div>
      </section>

    </main>
  );
};

export default OrderTimeline;
