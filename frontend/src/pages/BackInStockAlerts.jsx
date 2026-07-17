import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BackInStockAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 3,
      name: "Hand-Forged Nakiri Knife",
      artisan: "Takeshi Blades",
      price: 280,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw",
      status: "waiting", // 'waiting' or 'instock'
      dateAdded: "Oct 12, 2023"
    },
    {
      id: 4,
      name: "Raw Sandstone Sculpture",
      artisan: "Stone & Time",
      price: 450,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtExz30CUj3OhHY1qRJT7iqKjlA9owNKpJOiK-Au2lQn8jlbdXjp4f5lwhvkZeb_mCCQctKKkZr1IPtZDaDUihMrsKNYMsfLU8F__veHjFnFgtDRBictWZ9qj5CfmWIxkNLS6GgK8zTh6nkzPm9OgAPoZR60g1mQL0cjNzVNiDiZPg0z10EuS4LYLBkbqQeSDGjeljCWLmsXoBa9EKITfu4BAvzuBCkDPuIpUw_jBKTHQazw_GkZwZKw",
      status: "instock",
      dateAdded: "Sep 28, 2023"
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
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Back in Stock Alerts</h1>
          <p className="font-body-md text-on-surface-variant">We'll notify you the moment these limited items return to the collective.</p>
        </div>

        {/* Alerts List */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm">
          {alerts.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">inventory_2</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">No Active Alerts</h3>
              <p className="font-body-md text-on-surface-variant mb-6">You aren't watching any out-of-stock items right now.</p>
              <Link to="/products" className="inline-flex items-center px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/30">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  {/* Product Image */}
                  <Link to={`/product/${alert.id}`} className="block shrink-0 relative">
                    <img src={alert.image} alt={alert.name} className={`w-24 h-24 object-cover rounded ${alert.status === 'waiting' ? 'grayscale opacity-70' : ''}`} />
                    {alert.status === 'instock' && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-forest-green rounded-full flex items-center justify-center border-2 border-surface-container-lowest shadow-sm">
                        <span className="material-symbols-outlined text-[14px] text-white">check</span>
                      </div>
                    )}
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                      <Link to={`/product/${alert.id}`} className="hover:text-forest-green transition-colors">{alert.name}</Link>
                    </h3>
                    <p className="font-body-sm text-on-surface-variant mb-2">by {alert.artisan}</p>
                    <p className="font-label-md text-on-surface">${alert.price}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-center sm:items-end gap-3 shrink-0 w-full sm:w-auto">
                    {alert.status === 'instock' ? (
                      <Link to={`/product/${alert.id}`} className="px-6 py-2 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2 w-full sm:w-auto justify-center">
                        <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                        Buy Now
                      </Link>
                    ) : (
                      <div className="px-4 py-2 bg-surface-variant text-on-surface-variant font-label-md rounded flex items-center gap-2 w-full sm:w-auto justify-center">
                        <span className="material-symbols-outlined text-[18px]">hourglass_empty</span>
                        Waiting...
                      </div>
                    )}
                    
                    <button 
                      onClick={() => removeAlert(alert.id)}
                      className="text-error hover:text-error/80 font-label-sm flex items-center gap-1 transition-colors mt-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">notifications_off</span>
                      Cancel Alert
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

export default BackInStockAlerts;
