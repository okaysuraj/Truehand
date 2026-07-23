import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DealsOffers = () => {
  const [activeTab, setActiveTab] = useState('all');

  const deals = [
    { id: 1, title: 'First Order Discount', code: 'FIRST15', discount: '15% off', description: 'Get 15% off your very first purchase from any artisan.', minOrder: 50, expires: 'Dec 31, 2023', type: 'new-user' },
    { id: 2, title: 'Free Shipping Weekend', code: 'SHIPFREE', discount: 'Free Shipping', description: 'Free standard shipping on all orders this weekend.', minOrder: 75, expires: 'Nov 5, 2023', type: 'shipping' },
    { id: 3, title: 'Ceramics Collection', code: 'CLAY20', discount: '20% off', description: 'Save 20% on all ceramic and pottery items.', minOrder: 100, expires: 'Nov 30, 2023', type: 'category' },
    { id: 4, title: 'Holiday Bundle', code: 'BUNDLE25', discount: '25% off', description: 'Buy 3 or more items and save 25% on your entire order.', minOrder: 200, expires: 'Dec 25, 2023', type: 'bundle' },
    { id: 5, title: 'Refer a Friend', code: 'REFER10', discount: '$10 credit', description: 'Both you and your friend get $10 when they make their first purchase.', minOrder: 0, expires: 'Ongoing', type: 'referral' }
  ];

  const tabs = [
    { key: 'all', label: 'All Deals' },
    { key: 'new-user', label: 'New Users' },
    { key: 'category', label: 'Categories' },
    { key: 'shipping', label: 'Shipping' }
  ];

  const filtered = activeTab === 'all' ? deals : deals.filter(d => d.type === activeTab);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        <div className="text-center mb-10">
          <h1 className="font-display-md text-display-md text-on-surface mb-3">Deals & Offers</h1>
          <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">Exclusive discounts and promotions on handcrafted artisan goods.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-10 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-5 py-2 rounded-full font-label-md transition-colors ${
              activeTab === tab.key ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
            }`}>{tab.label}</button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(deal => (
            <div key={deal.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="font-label-sm text-forest-green bg-forest-green/10 px-2.5 py-0.5 rounded mb-2 inline-block">{deal.discount}</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{deal.title}</h3>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant">local_offer</span>
                </div>
                <p className="font-body-md text-on-surface-variant mb-4 leading-relaxed">{deal.description}</p>
                <div className="flex flex-wrap items-center gap-3 font-body-sm text-on-surface-variant mb-5">
                  {deal.minOrder > 0 && <span>Min. order: ${deal.minOrder}</span>}
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span>Expires: {deal.expires}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-surface-variant/50 border border-dashed border-outline-variant rounded px-4 py-2.5 flex items-center justify-between">
                    <span className="font-mono font-bold text-forest-green tracking-wider">{deal.code}</span>
                    <button className="text-forest-green font-label-sm hover:underline">Copy</button>
                  </div>
                  <Link to="/products" className="px-5 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity whitespace-nowrap">Shop Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsOffers;
