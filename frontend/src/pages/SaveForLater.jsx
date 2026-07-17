import api from '../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const SaveForLater = () => {
  const items = [
    { id: 1, name: 'Hand-Thrown Ceramic Vase', artisan: 'Elena Studio', price: 120, savedAt: 'Oct 20, 2023', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw' },
    { id: 2, name: 'Woven Indigo Throw', artisan: 'Tidal Textiles', price: 200, savedAt: 'Oct 18, 2023', inStock: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A' },
    { id: 3, name: 'Raw Sandstone Sculpture', artisan: 'Stone & Time', price: 450, savedAt: 'Oct 15, 2023', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtExz30CUj3OhHY1qRJT7iqKjlA9owNKpJOiK-Au2lQn8jlbdXjp4f5lwhvkZeb_mCCQctKKkZr1IPtZDaDUihMrsKNYMsfLU8F__veHjFnFgtDRBictWZ9qj5CfmWIxkNLS6GgK8zTh6nkzPm9OgAPoZR60g1mQL0cjNzVNiDiZPg0z10EuS4LYLBkbqQeSDGjeljCWLmsXoBa9EKITfu4BAvzuBCkDPuIpUw_jBKTHQazw_GkZwZKw' }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/cart" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Cart
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Saved for Later</h1>
          <p className="font-body-md text-on-surface-variant">{items.length} items saved</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          {items.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">bookmark_border</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Nothing Saved Yet</h3>
              <p className="font-body-md text-on-surface-variant mb-6">Items you save from your cart will appear here.</p>
              <Link to="/products" className="inline-flex items-center px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">Explore Products</Link>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/30">
              {items.map(item => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img src={item.image} alt={item.name} className={`w-24 h-24 object-cover rounded ${!item.inStock ? 'grayscale opacity-60' : ''}`} />
                  </Link>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                      <Link to={`/product/${item.id}`} className="hover:text-forest-green transition-colors">{item.name}</Link>
                    </h3>
                    <p className="font-body-sm text-on-surface-variant mb-1">by {item.artisan}</p>
                    <p className="font-label-md text-on-surface mb-2">${item.price.toFixed(2)}</p>
                    {!item.inStock && (
                      <span className="font-label-sm text-red-600 flex items-center gap-1 justify-center sm:justify-start">
                        <span className="material-symbols-outlined text-[14px]">error</span>Currently out of stock
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                    {item.inStock && (
                      <button className="px-5 py-2 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                        <span className="material-symbols-outlined text-[18px]">shopping_cart</span>Move to Cart
                      </button>
                    )}
                    <button className="px-5 py-2 text-red-600 font-label-sm hover:bg-red-50 rounded transition-colors flex items-center gap-1 justify-center">
                      <span className="material-symbols-outlined text-[16px]">delete</span>Remove
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

export default SaveForLater;
