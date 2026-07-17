import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminAnalytics = () => {
  const [period, setPeriod] = useState('month');

  const kpis = [
    { label: 'Gross Merchandise Value', value: '$148,250', change: '+18.4%', positive: true, icon: 'trending_up' },
    { label: 'Platform Revenue', value: '$22,237', change: '+12.1%', positive: true, icon: 'payments' },
    { label: 'Active Customers', value: '2,841', change: '+8.3%', positive: true, icon: 'group' },
    { label: 'Average Order Value', value: '$164', change: '-2.1%', positive: false, icon: 'shopping_cart' },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.4%', positive: true, icon: 'percent' },
    { label: 'Return Rate', value: '2.1%', change: '-0.3%', positive: true, icon: 'assignment_return' }
  ];

  const topProducts = [
    { name: 'Hand-Thrown Ceramic Vase', seller: 'Elena Studio', sales: 142, revenue: '$17,040' },
    { name: 'Woven Indigo Throw', seller: 'Tidal Textiles', sales: 98, revenue: '$19,600' },
    { name: 'Raw Sandstone Sculpture', seller: 'Stone & Time', sales: 34, revenue: '$15,300' },
    { name: 'Carved Walnut Nesting Set', seller: 'Woodland Craft', sales: 67, revenue: '$16,080' },
    { name: 'Smoke Tinted Glassware Set', seller: 'Molten Light', sales: 89, revenue: '$10,680' }
  ];

  const topSellers = [
    { name: 'Elena Studio', category: 'Ceramics', orders: 312, revenue: '$42,800', rating: 4.9 },
    { name: 'Tidal Textiles', category: 'Textiles', orders: 256, revenue: '$38,400', rating: 4.8 },
    { name: 'Woodland Craft', category: 'Woodwork', orders: 198, revenue: '$29,700', rating: 4.7 },
    { name: 'Molten Light', category: 'Glasswork', orders: 167, revenue: '$24,150', rating: 4.9 }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Admin
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Platform Analytics</h1>
              <p className="font-body-md text-on-surface-variant">Key performance indicators and platform health metrics.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors shrink-0 self-start md:self-auto">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Report
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          {['week', 'month', 'quarter', 'year'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${
              period === p ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
            }`}>This {p}</button>
          ))}
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-on-surface-variant">{kpi.icon}</span>
                <span className={`font-label-sm px-2 py-0.5 rounded ${kpi.positive ? 'bg-forest-green/10 text-forest-green' : 'bg-red-50 text-red-600'}`}>{kpi.change}</span>
              </div>
              <p className="font-headline-md text-headline-md text-on-surface mb-1">{kpi.value}</p>
              <p className="font-label-sm text-on-surface-variant">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Top Products */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/30">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Top Products</h2>
            </div>
            <div className="divide-y divide-outline-variant/20">
              {topProducts.map((product, idx) => (
                <div key={idx} className="p-4 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-label-md text-on-surface-variant shrink-0">{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-on-surface truncate">{product.name}</p>
                    <p className="font-body-sm text-on-surface-variant">{product.seller}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-label-md text-on-surface">{product.revenue}</p>
                    <p className="font-body-sm text-on-surface-variant">{product.sales} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sellers */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/30">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Top Sellers</h2>
            </div>
            <div className="divide-y divide-outline-variant/20">
              {topSellers.map((seller, idx) => (
                <div key={idx} className="p-4 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-forest-green/10 flex items-center justify-center font-label-md text-forest-green shrink-0">{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-on-surface truncate">{seller.name}</p>
                    <div className="flex items-center gap-2 font-body-sm text-on-surface-variant">
                      <span>{seller.category}</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px] text-forest-green font-variation-fill">star</span>{seller.rating}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-label-md text-on-surface">{seller.revenue}</p>
                    <p className="font-body-sm text-on-surface-variant">{seller.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
