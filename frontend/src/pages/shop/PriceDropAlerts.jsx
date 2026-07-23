import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PriceDropAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: "Hand-Thrown Ceramic Vase",
      artisan: "Elena Studio",
      originalPrice: 120,
      targetPrice: 90,
      currentPrice: 120,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw",
      status: "active"
    },
    {
      id: 2,
      name: "Woven Indigo Throw",
      artisan: "Tidal Textiles",
      originalPrice: 200,
      targetPrice: 150,
      currentPrice: 145,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A",
      status: "reached"
    }
  ]);

  const removeAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <Link to="/profile" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Profile
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Price Drop Alerts</h1>
          <p className="font-body-md text-on-surface-variant">We'll notify you when these items reach your target price.</p>
        </div>

        {/* Alerts List */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm">
          {alerts.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">notifications_off</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">No Active Alerts</h3>
              <p className="font-body-md text-on-surface-variant mb-6">You haven't set up any price drop alerts yet.</p>
              <Link to="/products" className="inline-flex items-center px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/30">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  {/* Product Image */}
                  <Link to={`/product/${alert.id}`} className="block shrink-0">
                    <img src={alert.image} alt={alert.name} className="w-24 h-24 object-cover rounded" />
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                      <Link to={`/product/${alert.id}`} className="hover:text-forest-green transition-colors">{alert.name}</Link>
                    </h3>
                    <p className="font-body-sm text-on-surface-variant mb-3">by {alert.artisan}</p>
                    
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">payments</span>
                        <span className="font-label-sm text-on-surface-variant">Current: ${alert.currentPrice}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-forest-green">target</span>
                        <span className="font-label-sm text-forest-green">Target: ${alert.targetPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-center sm:items-end gap-3 shrink-0 w-full sm:w-auto">
                    {alert.status === 'reached' ? (
                      <div className="px-3 py-1 bg-forest-green/10 text-forest-green font-label-sm rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Target Reached!
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-surface-variant text-on-surface font-label-sm rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">notifications_active</span>
                        Monitoring
                      </div>
                    )}
                    
                    <button 
                      onClick={() => removeAlert(alert.id)}
                      className="text-error hover:text-error/80 font-label-sm flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      Remove Alert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default PriceDropAlerts;
