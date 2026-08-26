import React from 'react';
import { Link } from 'react-router-dom';

const DeliveryPerformance = () => {
  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">TrueHand</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Marketplace Admin</p>
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
            <Link to="/admin/products" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/delivery-performance" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">analytics</span>
              Performance
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-2xl border border-outline-variant/30 text-xs">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-container shrink-0">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <h5 className="font-bold text-charcoal">Admin User</h5>
            <p className="text-[10px] text-on-surface-variant">Logistics Dept</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-10">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
            Delivery Performance
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-2xl">
            Monitor logistics efficiency, agent performance, and customer satisfaction across the marketplace.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                AVERAGE DELIVERY TIME
              </span>
              <span className="material-symbols-outlined text-charcoal text-xl">schedule</span>
            </div>
            <div>
              <h3 className="font-display-lg text-4xl font-bold text-charcoal">
                1.2 <span className="text-xl font-normal font-body-md text-on-surface-variant">days</span>
              </h3>
              <p className="text-[11px] text-forest-green font-semibold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_down</span>
                -0.4 days vs last month
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                SUCCESSFUL DELIVERY RATE
              </span>
              <span className="material-symbols-outlined text-charcoal text-xl">check_circle</span>
            </div>
            <div>
              <h3 className="font-display-lg text-4xl font-bold text-charcoal">
                98.5 <span className="text-xl font-normal font-body-md text-on-surface-variant">%</span>
              </h3>
              <p className="text-[11px] text-forest-green font-semibold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                +1.2% vs last month
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                CUSTOMER SATISFACTION
              </span>
              <span className="material-symbols-outlined text-charcoal text-xl">mood</span>
            </div>
            <div>
              <h3 className="font-display-lg text-4xl font-bold text-charcoal">
                4.8 <span className="text-xl font-normal font-body-md text-on-surface-variant">/5</span>
              </h3>
              <p className="text-[11px] text-on-surface-variant font-semibold mt-2 flex items-center gap-1">
                <span>&mdash;</span>
                No change vs last month
              </p>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default DeliveryPerformance;
