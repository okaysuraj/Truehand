import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderFulfillmentDetail = () => {
  const navigate = useNavigate();
  const [fulfilling, setFulfilling] = useState(false);

  const handleStartFulfillment = () => {
    setFulfilling(true);
    setTimeout(() => {
      setFulfilling(false);
      navigate('/shipping-label-preview');
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" 
                alt="Master Potter" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="font-display-md text-sm font-bold text-forest-green">Master Potter</h2>
              <p className="text-[10px] text-on-surface-variant">Hand-thrown Ceramics</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/seller/fulfillment" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-emerald-50 text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Fulfillment
            </Link>
            <Link to="/shipping-label-preview" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Shipping
            </Link>
            <Link to="/seller/returns" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">assignment_return</span>
              Returns
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Breadcrumb & Start Fulfillment CTA */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <nav className="flex items-center gap-2 mb-2 text-xs text-on-surface-variant font-label-sm">
              <Link to="/seller/orders" className="hover:text-forest-green">Orders</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-terracotta font-mono font-bold">#ORD-88219-TL</span>
            </nav>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal">
              Order Fulfillment
            </h1>
          </div>

          <button 
            onClick={handleStartFulfillment}
            disabled={fulfilling}
            className="px-8 py-3.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">play_circle</span>
            {fulfilling ? 'Initiating...' : 'Start Fulfillment'}
          </button>
        </div>

        {/* 2-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Items Ordered & Totals & Shipping Method */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Items Ordered Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                <h3 className="font-display-lg text-lg font-bold text-charcoal">Items Ordered</h3>
                <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-semibold text-charcoal">
                  3 Items
                </span>
              </div>

              {/* Item 1 */}
              <div className="flex items-start gap-4 pb-6 border-b border-outline-variant/10">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" alt="Item" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline-md text-sm font-bold text-charcoal">Obsidian Shallow Bowl</h4>
                      <p className="text-[10px] text-on-surface-variant font-mono">SKU: CR-OBS-01</p>
                      <span className="mt-1 inline-block bg-surface-container px-2 py-0.5 rounded text-[9px] uppercase font-bold text-charcoal">
                        Hand-Thrown Ceramic
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-on-surface-variant block">Variant: <strong className="text-charcoal">Matte Black</strong></span>
                      <span className="font-headline-md text-sm font-bold text-charcoal">1 &times; $124.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4 pb-6 border-b border-outline-variant/10">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" alt="Item" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline-md text-sm font-bold text-charcoal">Crackle Glaze Tall Vase</h4>
                      <p className="text-[10px] text-on-surface-variant font-mono">SKU: CR-IVY-V2</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-on-surface-variant block">Variant: <strong className="text-charcoal">Smoked Ivory</strong></span>
                      <span className="font-headline-md text-sm font-bold text-charcoal">2 &times; $195.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Totals Box */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal">$514.00</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping</span>
                  <span className="font-semibold text-charcoal">$22.50</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-charcoal">$41.12</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-outline-variant/20 font-bold">
                  <span className="font-display-lg text-base text-charcoal">Total</span>
                  <span className="font-display-lg text-xl text-forest-green">$577.62</span>
                </div>
              </div>

            </div>

            {/* Shipping Method Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-forest-green text-xl">local_shipping</span>
                <h3 className="font-display-md text-base font-bold text-charcoal">Shipping Method</h3>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between gap-4 border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-charcoal font-bold text-sm shadow-sm">
                    !
                  </div>
                  <div>
                    <h4 className="font-headline-md text-xs font-bold text-charcoal uppercase tracking-wider">Priority Express Courier</h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">Signature required upon delivery. Fragile handling requested.</p>
                  </div>
                </div>
                <span className="bg-charcoal text-white px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider shrink-0">
                  Urgent
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Customer Details & Shipping Address & Internal Note */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Customer Details */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-xl font-display-md font-bold text-forest-green mx-auto shadow-sm">
                EH
              </div>
              <div>
                <h4 className="font-display-lg text-lg font-bold text-charcoal">Eleanor Hartley</h4>
                <p className="text-[11px] text-on-surface-variant italic">Collector since 2021</p>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 space-y-3 text-left text-xs">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-base">mail</span>
                  <span className="truncate">e.hartley@curatedliving.c...</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-base">call</span>
                  <span>+1 (212) 555-0198</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-forest-green font-bold">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span className="text-charcoal font-headline-md text-sm">Shipping Address</span>
                </div>
                <button onClick={() => alert('Editing shipping address')} className="text-terracotta font-bold text-[10px] uppercase tracking-wider hover:underline">
                  Edit
                </button>
              </div>

              <div className="space-y-0.5 text-on-surface-variant leading-relaxed">
                <p className="font-bold text-charcoal">Eleanor Hartley</p>
                <p>742 West End Avenue, Apt 4B</p>
                <p>Upper West Side</p>
                <p>New York, NY 10025</p>
                <p>United States</p>
              </div>

              {/* Map Preview Graphic */}
              <div className="h-28 bg-surface-container-low rounded-xl relative flex items-center justify-center overflow-hidden border border-outline-variant/20">
                <div className="w-3 h-3 rounded-full bg-terracotta ring-4 ring-terracotta/20 animate-pulse" />
              </div>
            </div>

            {/* Internal Note */}
            <div className="bg-[#fef8f4] p-5 rounded-2xl border-l-4 border-terracotta text-xs space-y-1">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-terracotta font-bold block">
                Internal Note
              </span>
              <p className="font-body-md text-xs text-charcoal italic leading-relaxed">
                "Customer requested sustainable packaging only. Include the personal thank-you note from the potter if possible."
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default OrderFulfillmentDetail;
