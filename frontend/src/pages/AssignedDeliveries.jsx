import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AssignedDeliveries = () => {
  const [filter, setFilter] = useState('pending');

  const deliveries = [
    { id: 'DEL-4821', orderId: 'TH-29481', customer: 'Jane Doe', address: '123 Artisan Lane, Portland, OR 97201', distance: '3.2 km', estimatedTime: '15 min', status: 'pending', items: 2, pickup: 'Elena Studio Warehouse' },
    { id: 'DEL-4819', orderId: 'TH-29462', customer: 'Michael T.', address: '456 Market Street, Portland, OR 97204', distance: '5.8 km', estimatedTime: '25 min', status: 'in-transit', items: 1, pickup: 'Tidal Textiles HQ' },
    { id: 'DEL-4815', orderId: 'TH-29440', customer: 'Sarah L.', address: '789 Oak Drive, Portland, OR 97209', distance: '2.1 km', estimatedTime: '10 min', status: 'completed', items: 1, pickup: 'Stone & Time Studio' },
    { id: 'DEL-4812', orderId: 'TH-29415', customer: 'David K.', address: '321 Pine Ave, Portland, OR 97205', distance: '4.5 km', estimatedTime: '20 min', status: 'completed', items: 3, pickup: 'Central Warehouse' }
  ];

  const statusColor = (s) => {
    switch(s) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'in-transit': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-forest-green/10 text-forest-green border-forest-green/20';
      default: return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const filtered = filter === 'all' ? deliveries : deliveries.filter(d => d.status === filter);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/delivery/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Dashboard
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Assigned Deliveries</h1>
          <p className="font-body-md text-on-surface-variant">{deliveries.filter(d => d.status !== 'completed').length} active deliveries</p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {['pending', 'in-transit', 'completed', 'all'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full font-label-md capitalize transition-colors ${
              filter === f ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
            }`}>{f === 'in-transit' ? 'In Transit' : f}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(del => (
            <div key={del.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-label-md text-on-surface">{del.id}</span>
                    <span className={`font-label-sm px-2.5 py-0.5 rounded border capitalize ${statusColor(del.status)}`}>{del.status.replace('-', ' ')}</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant">Order: <Link to={`/order/${del.orderId}`} className="text-forest-green hover:underline">{del.orderId}</Link> · {del.items} item{del.items > 1 ? 's' : ''}</p>
                </div>
                <div className="flex gap-2">
                  {del.status === 'pending' && (
                    <button className="px-5 py-2 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">Start Delivery</button>
                  )}
                  {del.status === 'in-transit' && (
                    <Link to={`/delivery/details/${del.id}`} className="px-5 py-2 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">View Details</Link>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-forest-green text-[20px] mt-0.5 shrink-0">store</span>
                  <div>
                    <p className="font-label-sm text-on-surface-variant">Pickup</p>
                    <p className="font-body-md text-on-surface">{del.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5 shrink-0">location_on</span>
                  <div>
                    <p className="font-label-sm text-on-surface-variant">Deliver to: {del.customer}</p>
                    <p className="font-body-md text-on-surface">{del.address}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-outline-variant/20 font-body-sm text-on-surface-variant">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">straighten</span>{del.distance}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span>Est. {del.estimatedTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
