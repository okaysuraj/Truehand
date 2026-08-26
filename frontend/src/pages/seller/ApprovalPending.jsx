import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ApprovalPending = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-forest-green">Artisanal Admin</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Marketplace Manager</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
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
            <Link to="/admin/finances" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-outline-variant/20">
          <Link to="/storefront-preview" className="w-full py-2.5 border border-charcoal text-charcoal rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all flex items-center justify-center">
            View Storefront
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto">
        
        {/* Atmosphere Banner Image with Curation in Progress chip */}
        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-sm mb-12 border border-outline-variant/30 flex items-end justify-center pb-6">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" 
            alt="Potter hands carving" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.85]" 
          />
          <div className="relative z-10 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold text-charcoal">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Curation in Progress</span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
            Application Approval Pending
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            Our curation team is currently reviewing your shop's application. To maintain our standard of quiet luxury and artisanal excellence, we verify each craftsperson's portfolio and material sourcing.
          </p>
        </div>

        {/* 3 Status Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm text-center space-y-2">
            <span className="material-symbols-outlined text-forest-green text-3xl">verified</span>
            <h4 className="font-headline-md text-sm font-bold text-charcoal">Quality Review</h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">Checking alignment with our craft standards.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm text-center space-y-2">
            <span className="material-symbols-outlined text-forest-green text-3xl">schedule</span>
            <h4 className="font-headline-md text-sm font-bold text-charcoal">Estimated Time</h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">Finalizing within 48-72 business hours.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm text-center space-y-2">
            <span className="material-symbols-outlined text-forest-green text-3xl">mail</span>
            <h4 className="font-headline-md text-sm font-bold text-charcoal">Notifications</h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">You will receive an email upon confirmation.</p>
          </div>

        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <button 
            onClick={() => navigate('/')}
            className="px-10 py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
          >
            Return to Homepage
          </button>
          <div>
            <Link to="/help" className="text-xs text-on-surface-variant hover:text-forest-green underline font-medium">
              Contact Support for Assistance
            </Link>
          </div>
        </div>

      </main>

    </div>
  );
};

export default ApprovalPending;
