import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('id') || 'TH-9482-A';
  
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId && orderId !== 'TH-9482-A' && orderId !== 'new') {
      api.get(`/orders/${orderId}`)
        .then(res => setOrder(res.data))
        .catch(err => console.warn(err));
    }
  }, [orderId]);

  const estDelivery = new Date();
  estDelivery.setDate(estDelivery.getDate() + 7);
  const estDeliveryString = estDelivery.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <main className="pt-28 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Messaging */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="flex items-center gap-2 mb-4 text-emerald-800 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-200">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span className="font-label-md text-xs uppercase tracking-widest font-bold">Order Confirmed</span>
          </div>

          <h1 className="font-display-lg text-3xl md:text-5xl lg:text-6xl text-forest-green mb-4 leading-tight font-bold">
            Thank You, <br />
            for choosing the <span className="italic font-normal">unhurried</span>.
          </h1>

          <p className="font-body-lg text-on-surface-variant text-sm md:text-base max-w-xl mb-8 leading-relaxed">
            Your order has been received and is currently being prepared by our studio artisans. A confirmation email with your digital receipt has been sent to your inbox.
          </p>

          {/* Status Cards Bento Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-center">
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
                Order Number
              </span>
              <span className="font-headline-md text-xl text-forest-green font-bold">
                {order?.orderNumber || (orderId.startsWith('TH-') ? orderId : `#TH-${orderId}`)}
              </span>
            </div>

            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-center">
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
                Expected Delivery
              </span>
              <span className="font-headline-md text-xl text-terracotta font-bold">
                {estDeliveryString}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/orders')}
              className="px-8 py-3.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-semibold flex items-center gap-2 shadow"
            >
              <span>View Order Status</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button 
              onClick={() => navigate('/products')}
              className="px-8 py-3.5 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-widest rounded-lg hover:bg-surface-container transition-all font-semibold"
            >
              Continue Shopping
            </button>
          </div>

        </div>

        {/* Imagery & Content Collage */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border border-outline-variant/30">
            <img 
              className="w-full h-full object-cover" 
              alt="Serene Artisan Studio" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD42tjF1AyI4DU0GqJSkeEI81LQc8_5w7FYDdBU0Fexrwx4qE9KOIuy7rhlSjaUuv8PNMjIvpDhTKs5H_ASA62mk5oCWY08MgLdpf59XmdhZF3NpgVWpu-gKXM7TIusf231jolSBFfsR6eokoyQP_0DDX6L27Z_JAu0VtEJ0fJPMGVPvk5wtSkKzhJYGtapeo8XLBL0yAfnyxUikrsfimQbUSuig97drZHMbSLC1jawlMYK-yyVwIWF9g" 
            />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-surface-linen/95 backdrop-blur-md border-t border-outline-variant/20">
              <p className="font-body-md text-xs text-forest-green italic leading-relaxed">
                "Every piece is a dialogue between the artisan and the earth, crafted to last for generations."
              </p>
            </div>
          </div>

          {/* Floating Detail Card */}
          <div className="absolute -left-6 -bottom-6 hidden sm:block bg-white p-4 rounded-xl border border-outline-variant/30 shadow-lg max-w-[220px]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Studio Update</span>
            </div>
            <p className="font-label-md text-xs text-on-surface font-semibold">Your selection is currently in the finishing stage.</p>
          </div>
        </div>

      </div>

      {/* Trust Features Grid */}
      <div className="mt-20 pt-12 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="flex flex-col gap-2">
          <span className="material-symbols-outlined text-forest-green text-3xl">verified</span>
          <h3 className="font-label-md text-xs text-forest-green uppercase tracking-widest font-bold">
            Lifetime Authenticity
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Each item includes a serialized certificate of origin from the specific artisan studio.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="material-symbols-outlined text-forest-green text-3xl">eco</span>
          <h3 className="font-label-md text-xs text-forest-green uppercase tracking-widest font-bold">
            Sustainably Sourced
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Materials are harvested in accordance with regenerative forestry and traditional ethics.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="material-symbols-outlined text-forest-green text-3xl">support_agent</span>
          <h3 className="font-label-md text-xs text-forest-green uppercase tracking-widest font-bold">
            Personal Concierge
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Questions regarding your pieces? Our curators are available for one-on-one consultation.
          </p>
        </div>

      </div>

    </main>
  );
};

export default OrderSuccess;
