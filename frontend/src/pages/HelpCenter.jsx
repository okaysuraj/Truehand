import api from '../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
  const categories = [
    { icon: "local_shipping", title: "Shipping & Delivery", desc: "Track your order, shipping policies, and delivery timelines." },
    { icon: "replay", title: "Returns & Refunds", desc: "How to return an item, refund process, and our guarantee." },
    { icon: "inventory_2", title: "Order Management", desc: "Cancel an order, change address, or view order history." },
    { icon: "account_circle", title: "My Account", desc: "Manage your profile, password, and communication preferences." },
    { icon: "payments", title: "Payment & Pricing", desc: "Accepted payment methods, taxes, and price adjustments." },
    { icon: "handshake", title: "Artisan Inquiries", desc: "Information about our artisans, sourcing, and craft processes." }
  ];

  const popularArticles = [
    "How do I track my order?",
    "What is your return policy for handmade items?",
    "Can I cancel or change my order?",
    "How are shipping costs calculated?",
    "Do you ship internationally?",
    "How can I contact a specific artisan?"
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header & Search */}
        <div className="text-center mb-16">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-4">How can we help you?</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
            Search our knowledge base or browse categories below to find answers to your questions.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[24px]">search</span>
            <input 
              type="text" 
              placeholder="Search for articles, topics, or questions..." 
              className="w-full pl-14 pr-4 py-4 bg-surface-container-lowest border border-outline-variant/50 rounded-full focus:border-forest-green focus:shadow-md outline-none font-body-lg text-on-surface transition-all"
            />
          </div>
        </div>

        {/* Popular Articles & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-8 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-forest-green">trending_up</span>
              Popular Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {popularArticles.map((article, idx) => (
                <Link key={idx} to="/faq" className="flex items-start gap-3 group">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-forest-green transition-colors mt-0.5 text-[20px]">article</span>
                  <span className="font-body-md text-on-surface hover:text-forest-green transition-colors">{article}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
              <Link to="/faq" className="inline-flex items-center text-forest-green font-label-md hover:opacity-80 transition-opacity">
                View all FAQs <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="bg-forest-green text-white rounded-lg p-8 shadow-sm flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-5xl mb-4 opacity-90">support_agent</span>
            <h2 className="font-headline-md text-headline-md mb-2">Need more help?</h2>
            <p className="font-body-md opacity-90 mb-8">Our concierge team is available to assist you with any inquiries.</p>
            <Link to="/report-issue" className="w-full py-3 bg-white text-forest-green font-label-md rounded hover:bg-surface-linen transition-colors mb-3">
              Contact Support
            </Link>
            <p className="font-label-sm opacity-75">Average response time: 2 hours</p>
          </div>
        </div>

        {/* Categories */}
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8 text-center">Browse by Topic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link key={idx} to="/faq" className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 hover:border-forest-green hover:shadow-md transition-all group cursor-pointer block">
              <span className="material-symbols-outlined text-3xl text-forest-green mb-4 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{cat.title}</h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">{cat.desc}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HelpCenter;
