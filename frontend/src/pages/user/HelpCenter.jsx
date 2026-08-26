import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HELP_CATEGORIES = [
  {
    icon: 'receipt_long',
    title: 'Orders',
    description: 'Tracking, cancellations, and bespoke modification requests.',
    link: '/faq',
  },
  {
    icon: 'payments',
    title: 'Payments',
    description: 'Invoicing, secure transactions, and artisanal deposit structures.',
    link: '/faq',
  },
  {
    icon: 'local_shipping',
    title: 'Shipping',
    description: 'White-glove delivery, international duties, and careful crating.',
    link: '/faq',
  },
  {
    icon: 'handyman',
    title: 'Workshop',
    description: 'Material provenance, care guides, and artisan direct messaging.',
    link: '/faq',
  },
];

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/faq?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal">
            How can we assist you?
          </h1>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
            Explore our library of artisan resources and concierge support services.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto pt-2">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
              search
            </span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for orders, shipping, or workshop details..."
              className="w-full bg-white border border-outline-variant/40 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-semibold text-charcoal shadow-sm focus:outline-none focus:border-forest-green"
            />
          </form>
        </div>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {HELP_CATEGORIES.map(cat => (
            <div 
              key={cat.title}
              className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all text-left"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-charcoal">
                  <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display-md text-xl font-bold text-charcoal">{cat.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed font-body-md text-[11px]">
                    {cat.description}
                  </p>
                </div>
              </div>

              <Link 
                to={cat.link}
                className="text-xs font-bold text-forest-green hover:underline flex items-center gap-1 pt-2"
              >
                <span>View Articles</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Featured Resource Banner */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 h-72 lg:h-96 bg-surface-container overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" 
              alt="Artisan Studio Pottery" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="w-full lg:w-1/2 p-8 md:p-12 space-y-4 text-xs">
            <span className="font-label-sm text-[10px] uppercase font-bold text-terracotta tracking-wider block">
              FEATURED RESOURCE
            </span>
            <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">
              Our Material Provenance Guide
            </h2>
            <p className="text-on-surface-variant font-body-md text-xs leading-relaxed">
              Understand the journey of our raw materials, from sustainably sourced teak to high-fire stoneware. Each piece carries a legacy of ethical craftsmanship.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => navigate('/authentic-craft')}
                className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow"
              >
                Read the Guide
              </button>
            </div>
          </div>
        </div>

        {/* Contact Concierge Box */}
        <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-outline-variant/30 text-center space-y-6 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-white text-forest-green flex items-center justify-center mx-auto shadow-sm">
            <span className="material-symbols-outlined text-2xl">support_agent</span>
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal">
              Contact Concierge
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Can't find what you're looking for? Our dedicated concierge team is available to assist with bespoke inquiries and detailed product information.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => alert('Starting live messaging session...')}
              className="w-full sm:w-auto px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Live Messaging
            </button>
            <button 
              onClick={() => navigate('/report-issue')}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-surface-container transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">mail</span>
              Send an Inquiry
            </button>
          </div>
        </div>

      </main>

    </div>
  );
};

export default HelpCenter;
