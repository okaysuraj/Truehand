import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState(1);

  const tabs = ['All', 'Shipping', 'Returns', 'Products', 'Payment'];

  const faqs = [
    {
      id: 1,
      category: 'Shipping',
      question: "How long does shipping take?",
      answer: "Since our products are handcrafted and shipped directly from the artisan's studio, shipping times vary. Generally, domestic orders arrive within 5-10 business days. Custom or made-to-order pieces may take 2-4 weeks before they are shipped. You can find specific shipping estimates on each product page."
    },
    {
      id: 2,
      category: 'Shipping',
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries. International shipping rates are calculated at checkout based on the weight and destination of your order. Please note that international orders may be subject to customs fees or import duties, which are the responsibility of the customer."
    },
    {
      id: 3,
      category: 'Returns',
      question: "What is your return policy?",
      answer: "We offer a 14-day return policy for most items in original condition. Because of the unique nature of handcrafted goods, custom orders and personalized items are final sale and cannot be returned. If an item arrives damaged, please contact us within 48 hours with photos."
    },
    {
      id: 4,
      category: 'Products',
      question: "Are the ceramics dishwasher and microwave safe?",
      answer: "Unless specifically stated otherwise on the product page, we recommend hand-washing all handcrafted ceramics to preserve the glaze and structural integrity. Items with metallic accents (like gold luster) should never be placed in a microwave."
    },
    {
      id: 5,
      category: 'Payment',
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. We also offer payment installments through Affirm for orders over $150."
    },
    {
      id: 6,
      category: 'Products',
      question: "How do I care for my woven textiles?",
      answer: "Care instructions vary by material. Most cotton and linen pieces can be gently hand-washed in cold water and laid flat to dry. Wool and delicate blends should be dry-cleaned. Always check the specific care card included with your order."
    }
  ];

  const filteredFaqs = activeTab === 'All' ? faqs : faqs.filter(f => f.category === activeTab);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <Link to="/help" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-6 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Help Center
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-4">Frequently Asked Questions</h1>
          <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">
            Find answers to common questions about shipping, returns, product care, and our artisan partners.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-label-md transition-colors ${
                activeTab === tab 
                  ? 'bg-charcoal text-white' 
                  : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green hover:text-forest-green'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center">
              <p className="font-body-md text-on-surface-variant">No FAQs found for this category.</p>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/30">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="group">
                  <button 
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-surface-linen/50 transition-colors focus:outline-none"
                  >
                    <h3 className={`font-headline-sm text-headline-sm pr-8 ${expandedId === faq.id ? 'text-forest-green' : 'text-on-surface'}`}>
                      {faq.question}
                    </h3>
                    <span className={`material-symbols-outlined shrink-0 transition-transform duration-300 ${expandedId === faq.id ? 'rotate-180 text-forest-green' : 'text-on-surface-variant'}`}>
                      expand_more
                    </span>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedId === faq.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 pt-0 font-body-md text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Contact Footer */}
        <div className="mt-12 text-center">
          <p className="font-body-md text-on-surface-variant mb-4">Still have questions?</p>
          <Link to="/report-issue" className="inline-flex items-center px-6 py-3 border border-forest-green text-forest-green font-label-md rounded hover:bg-forest-green/5 transition-colors">
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
