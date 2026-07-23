import api from '../../services/api';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ReorderScreen = () => {
  const { orderId } = useParams();

  const items = [
    { id: 1, name: 'Hand-Thrown Ceramic Vase', artisan: 'Elena Studio', price: 120, quantity: 1, available: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw' },
    { id: 2, name: 'Woven Indigo Throw', artisan: 'Tidal Textiles', price: 200, quantity: 1, available: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A' }
  ];

  const availableItems = items.filter(i => i.available);
  const subtotal = availableItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link to={`/order/${orderId || 'TH-29481'}`} className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Order
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Reorder Items</h1>
          <p className="font-body-md text-on-surface-variant">From order {orderId || 'TH-29481'}</p>
        </div>

        {/* Items */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-outline-variant/30">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Items from this order</h2>
          </div>
          <div className="divide-y divide-outline-variant/30">
            {items.map((item) => (
              <div key={item.id} className={`p-6 flex items-center gap-6 ${!item.available ? 'opacity-60' : ''}`}>
                <img src={item.image} alt={item.name} className={`w-20 h-20 object-cover rounded shrink-0 ${!item.available ? 'grayscale' : ''}`} />
                <div className="flex-1">
                  <p className="font-label-md text-on-surface">{item.name}</p>
                  <p className="font-body-sm text-on-surface-variant">by {item.artisan}</p>
                  <p className="font-body-sm text-on-surface-variant mt-1">Qty: {item.quantity}</p>
                  {!item.available && (
                    <div className="mt-2 flex items-center gap-1.5 text-red-600 font-label-sm">
                      <span className="material-symbols-outlined text-[14px]">error</span>
                      Currently out of stock
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="font-label-md text-on-surface">${item.price.toFixed(2)}</p>
                  {item.available && (
                    <span className="font-label-sm text-forest-green flex items-center gap-1 justify-end mt-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      In Stock
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary and Action */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="font-label-md text-on-surface">Available to reorder</p>
              <p className="font-body-sm text-on-surface-variant">{availableItems.length} of {items.length} items</p>
            </div>
            <div className="text-right">
              <p className="font-body-sm text-on-surface-variant">Subtotal</p>
              <p className="font-headline-sm text-headline-sm text-on-surface">${subtotal.toFixed(2)}</p>
            </div>
          </div>

          {items.some(i => !i.available) && (
            <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-6">
              <p className="font-body-sm text-amber-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Some items are out of stock and will not be added to your cart.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/cart" className="flex-1 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Add to Cart ({availableItems.length} items)
            </Link>
            <Link to={`/back-in-stock-alerts`} className="py-3 px-6 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors text-center flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              Notify When Back
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReorderScreen;
