import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FAQS = {
  orders: [
    {
      q: 'When will my artisanal piece arrive?',
      a: 'Each piece is hand-crafted and packaged with white-glove care. Delivery typically occurs within 3-5 business days after artisan completion.',
    },
    {
      q: 'Do you offer international climate-neutral shipping?',
      a: 'Yes, TrueHand partners with dedicated low-emission couriers and offsets 100% of transit carbon for global destinations.',
    },
  ],
  artisans: [
    {
      q: 'How do you select your featured artisans?',
      a: 'Artisans undergo a thorough review for ethical sourcing, mastery of ancestral craft, and dedication to sustainable production.',
    },
    {
      q: 'Are the materials ethically sourced?',
      a: 'All clays, timber, linens, and metals are traceable directly to sustainable mills and regional quarries.',
    },
    {
      q: 'Can I request a custom material or finish?',
      a: 'Yes! You can contact the artisan directly via their studio page or request a bespoke customization order.',
    },
  ],
};

const FAQ = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('orders');
  const [openItems, setOpenItems] = useState({});
  const [search, setSearch] = useState('');

  const toggleItem = (key) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal">
            How can we assist you?
          </h1>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
            Explore our curated guide to the most common inquiries regarding our artisanal process and services.
          </p>

          <div className="relative max-w-xl mx-auto pt-2">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
              search
            </span>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for answers..."
              className="w-full bg-white border border-outline-variant/40 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-semibold text-charcoal shadow-sm focus:outline-none focus:border-forest-green"
            />
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-4 space-y-6 text-xs">
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                CATEGORIES
              </span>

              <nav className="space-y-1 font-semibold">
                <button 
                  onClick={() => setActiveCategory('orders')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                    activeCategory === 'orders' ? 'bg-surface-container text-forest-green font-bold' : 'text-on-surface-variant hover:text-charcoal'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-green" />
                  Orders &amp; Shipping
                </button>
                <button 
                  onClick={() => setActiveCategory('artisans')}
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                    activeCategory === 'artisans' ? 'bg-surface-container text-forest-green font-bold' : 'text-on-surface-variant hover:text-charcoal'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                  Artisans &amp; Materials
                </button>
                <button 
                  onClick={() => setActiveCategory('care')}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-on-surface-variant hover:text-charcoal flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                  Care &amp; Maintenance
                </button>
                <button 
                  onClick={() => setActiveCategory('returns')}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-on-surface-variant hover:text-charcoal flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                  Returns &amp; Refunds
                </button>
              </nav>
            </div>

            {/* Need More Help Box */}
            <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30 space-y-3">
              <span className="text-[10px] text-on-surface-variant font-semibold">Need more help?</span>
              <h4 className="font-display-md text-base font-bold text-charcoal">
                Speak with a Concierge
              </h4>
              <button 
                onClick={() => navigate('/report-issue')}
                className="w-full py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Accordions List */}
          <div className="lg:col-span-8 space-y-8 text-xs">
            
            {/* Orders & Shipping Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-charcoal pb-1">
                <span className="material-symbols-outlined text-forest-green text-xl">local_shipping</span>
                <h3 className="font-display-md text-xl font-bold">Orders &amp; Shipping</h3>
              </div>

              <div className="space-y-3">
                {FAQS.orders.map((item, idx) => {
                  const key = `orders_${idx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div key={key} className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full p-5 text-left font-bold text-charcoal flex justify-between items-center gap-4 hover:bg-surface-container-low/40 transition-colors"
                      >
                        <span className="font-display-md text-sm">{item.q}</span>
                        <span className={`material-symbols-outlined text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      {isOpen && (
                        <div className="p-5 pt-0 text-on-surface-variant font-body-md text-xs leading-relaxed border-t border-outline-variant/10">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Artisans & Materials Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-charcoal pb-1">
                <span className="material-symbols-outlined text-terracotta text-xl">edit</span>
                <h3 className="font-display-md text-xl font-bold">Artisans &amp; Materials</h3>
              </div>

              <div className="space-y-3">
                {FAQS.artisans.slice(0, 2).map((item, idx) => {
                  const key = `artisan_${idx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div key={key} className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full p-5 text-left font-bold text-charcoal flex justify-between items-center gap-4 hover:bg-surface-container-low/40 transition-colors"
                      >
                        <span className="font-display-md text-sm">{item.q}</span>
                        <span className={`material-symbols-outlined text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      {isOpen && (
                        <div className="p-5 pt-0 text-on-surface-variant font-body-md text-xs leading-relaxed border-t border-outline-variant/10">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* The Human Touch photo card */}
                <div className="rounded-3xl overflow-hidden relative shadow-md p-8 md:p-12 min-h-[220px] flex flex-col justify-end text-white">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" 
                    alt="Artisan potter hands" 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 space-y-1">
                    <h4 className="font-display-lg text-2xl md:text-3xl font-bold">The Human Touch</h4>
                    <p className="text-xs text-white/90 font-serif italic">
                      Every piece tells the story of the hands that shaped it.
                    </p>
                  </div>
                </div>

                {FAQS.artisans.slice(2).map((item, idx) => {
                  const key = `artisan_custom_${idx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div key={key} className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full p-5 text-left font-bold text-charcoal flex justify-between items-center gap-4 hover:bg-surface-container-low/40 transition-colors"
                      >
                        <span className="font-display-md text-sm">{item.q}</span>
                        <span className={`material-symbols-outlined text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      {isOpen && (
                        <div className="p-5 pt-0 text-on-surface-variant font-body-md text-xs leading-relaxed border-t border-outline-variant/10">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default FAQ;
