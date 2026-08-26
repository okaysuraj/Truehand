import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderDetailAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisanal Admin</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Marketplace Manager</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">group</span>
              Users
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        
        {/* Back Link & Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <Link 
              to="/admin/orders" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-forest-green transition-colors mb-2"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Orders
            </Link>
            <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
              ORDER #ORD-2023-8941
            </span>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Order Details
            </h1>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              Oct 24, 2023 at 2:34 PM
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Opening group message with buyer and seller...')}
              className="px-5 py-2.5 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">mail</span>
              Contact Parties
            </button>
            <button 
              onClick={() => alert('Status override modal opened')}
              className="px-6 py-2.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-base">edit</span>
              Manual Status Override
            </button>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Customer & Payment */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Customer */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 text-forest-green font-bold">
                <span className="material-symbols-outlined text-base">person</span>
                <span className="text-charcoal font-headline-md text-xs font-bold uppercase tracking-wider">Customer</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="font-bold text-charcoal">Eleanor Vance</h5>
                  <p className="text-[10px] text-on-surface-variant">eleanor.v@example.com</p>
                </div>
              </div>

              <span className="inline-block bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                &star; Gold Tier Patron
              </span>

              <div className="pt-2 border-t border-outline-variant/20 space-y-0.5 text-on-surface-variant">
                <span className="text-[10px] uppercase font-bold text-charcoal block">Shipping Address</span>
                <p>124 Heritage Lane</p>
                <p>Suite 4B</p>
                <p>Portland, OR 97205</p>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 text-forest-green font-bold">
                <span className="material-symbols-outlined text-base">payments</span>
                <span className="text-charcoal font-headline-md text-xs font-bold uppercase tracking-wider">Payment</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Status</span>
                  <span className="font-bold text-forest-green flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Paid
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Method</span>
                  <span className="font-semibold text-charcoal">Visa ending in 4242</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Fraud Risk</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] uppercase">Low</span>
                </div>
              </div>
            </div>

          </div>

          {/* Middle Column: Order Contents & Totals & Fulfillment Timeline */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Order Contents */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <h3 className="font-headline-md text-sm font-bold text-charcoal">Order Contents</h3>

              {/* Item 1 */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal">Hand-thrown Stoneware Bowl</h5>
                    <p className="text-[10px] text-on-surface-variant">Charcoal Glaze &bull; Qty: 1</p>
                    <span className="px-2 py-0.5 bg-surface-container rounded text-[9px] uppercase font-bold text-charcoal mt-1 inline-block">Ceramics</span>
                  </div>
                </div>
                <span className="font-display-md text-sm font-bold text-charcoal">$120.00</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal">Walnut Serving Spoon</h5>
                    <p className="text-[10px] text-on-surface-variant">Carved Walnut &bull; Qty: 2</p>
                    <span className="px-2 py-0.5 bg-surface-container rounded text-[9px] uppercase font-bold text-charcoal mt-1 inline-block">Woodwork</span>
                  </div>
                </div>
                <span className="font-display-md text-sm font-bold text-charcoal">$45.00</span>
              </div>

              {/* Totals */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal (3 items)</span>
                  <span className="font-semibold text-charcoal">$210.00</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping (Insured)</span>
                  <span className="font-semibold text-charcoal">$15.00</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Taxes</span>
                  <span className="font-semibold text-charcoal">$18.90</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-outline-variant/20 font-bold">
                  <span className="font-display-lg text-sm text-charcoal">Total</span>
                  <span className="font-display-lg text-lg text-forest-green">$243.90</span>
                </div>
              </div>
            </div>

            {/* Fulfillment Timeline */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 text-forest-green font-bold">
                <span className="material-symbols-outlined text-base">local_shipping</span>
                <span className="text-charcoal font-headline-md text-xs font-bold uppercase tracking-wider">Fulfillment Timeline</span>
              </div>

              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/40">
                <div className="relative">
                  <span className="w-5 h-5 rounded-full bg-forest-green text-white flex items-center justify-center text-[10px] absolute -left-6 top-0 font-bold">&check;</span>
                  <h5 className="font-bold text-charcoal">Order Placed</h5>
                  <p className="text-[10px] text-on-surface-variant">Oct 24, 2:34 PM</p>
                </div>
                <div className="relative">
                  <span className="w-5 h-5 rounded-full bg-forest-green text-white flex items-center justify-center text-[10px] absolute -left-6 top-0 font-bold">&check;</span>
                  <h5 className="font-bold text-charcoal">Artisan Accepted</h5>
                  <p className="text-[10px] text-on-surface-variant">Oct 24, 4:15 PM</p>
                </div>
                <div className="relative">
                  <span className="w-5 h-5 rounded-full bg-white border-2 border-forest-green absolute -left-6 top-0 animate-pulse" />
                  <h5 className="font-bold text-forest-green">In Production / Crafting</h5>
                  <p className="text-[10px] text-on-surface-variant">Estimated completion: Oct 28</p>
                </div>
                <div className="relative opacity-40">
                  <span className="w-5 h-5 rounded-full bg-surface-container absolute -left-6 top-0" />
                  <h5 className="font-bold text-charcoal">Ready for Shipping</h5>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Artisan & Internal Notes */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Artisan */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 text-forest-green font-bold">
                <span className="material-symbols-outlined text-base">handyman</span>
                <span className="text-charcoal font-headline-md text-xs font-bold uppercase tracking-wider">Artisan</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="font-bold text-charcoal">Elias Thorne</h5>
                  <p className="text-[10px] text-on-surface-variant">Thorne Ceramics &amp; Wood</p>
                </div>
              </div>

              <div className="space-y-1 text-on-surface-variant pt-2 border-t border-outline-variant/20">
                <div className="flex justify-between">
                  <span>Fulfillment Rating</span>
                  <span className="font-bold text-charcoal">&star; 4.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Orders</span>
                  <span className="font-bold text-charcoal">12</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/artisan/1')}
                className="w-full py-2 border border-charcoal text-charcoal rounded-lg font-semibold text-[11px] hover:bg-surface-container"
              >
                View Artisan Profile
              </button>
            </div>

            {/* Internal Notes */}
            <div className="bg-[#fef8f4] p-5 rounded-2xl border-l-4 border-terracotta text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-terracotta font-bold">
                  Internal Notes
                </span>
                <span className="text-[9px] bg-terracotta/10 text-terracotta px-1.5 py-0.5 rounded font-bold">Admin Only</span>
              </div>
              <p className="font-body-md text-xs text-charcoal italic leading-relaxed">
                "Customer requested extra secure packaging for the ceramic bowl due to a previous break (Order #8122). Note sent to Elias."
              </p>
              <button 
                onClick={() => alert('Add note dialog')}
                className="text-[11px] font-bold text-forest-green hover:underline pt-2 block"
              >
                + Add Note
              </button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default OrderDetailAdmin;
