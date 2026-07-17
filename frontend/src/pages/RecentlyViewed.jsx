import api from '../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const RecentlyViewed = () => {
  const products = [
    { id: 1, name: 'Hand-Thrown Ceramic Vase', artisan: 'Elena Studio', price: 120, viewedAt: '2 hours ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw' },
    { id: 2, name: 'Woven Indigo Throw', artisan: 'Tidal Textiles', price: 200, viewedAt: '5 hours ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A' },
    { id: 3, name: 'Raw Sandstone Sculpture', artisan: 'Stone & Time', price: 450, viewedAt: 'Yesterday', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtExz30CUj3OhHY1qRJT7iqKjlA9owNKpJOiK-Au2lQn8jlbdXjp4f5lwhvkZeb_mCCQctKKkZr1IPtZDaDUihMrsKNYMsfLU8F__veHjFnFgtDRBictWZ9qj5CfmWIxkNLS6GgK8zTh6nkzPm9OgAPoZR60g1mQL0cjNzVNiDiZPg0z10EuS4LYLBkbqQeSDGjeljCWLmsXoBa9EKITfu4BAvzuBCkDPuIpUw_jBKTHQazw_GkZwZKw' },
    { id: 4, name: 'Carved Walnut Nesting Set', artisan: 'Woodland Craft', price: 240, viewedAt: 'Yesterday', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAihgFBpVMJrO3PO3Nkh0kMNQ_O3fG1p1x6mmmQjhpuxwDJtojvNkz0hHHUz-Dh0FHrXCTr4JxY3U7XlM97FLLPZ0a19omKGqfFJg0aGD2DNr1yFoLUxyimit52f4VN6cjsv3z0fKvXLvOc_Kjwm_aautVn6LWP1mFnNTlcFyjHCdSlA8vGC9eQMvut6TxHemacNecCLXNaL26n7wGEcz8cER6qPbmVU-JcxAzHzYX7lsksV-PGoXoJMA' },
    { id: 5, name: 'Smoke Tinted Glassware', artisan: 'Molten Light', price: 120, viewedAt: '2 days ago', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl32JIaQbyVRfKquoWr73CBK1P7KEV3FclqyVydZOXMW9b83FV7EglQeDBblwAxNrdVTtU1zGODJuR-ITbtOV_kxNg5U3lQaJmwi5nM8nG6WAqB_yN3luvUoNa9kUE0XRNoJ59nFaXxzPZ7-Z49tZfwG8M91aHCkskouHxtDctoQFL4_2KLhHEITPcaXWh8U-WiowONVUJU3DFhT8ULsza8-8imKcb6BuhOqPokG7v5laz--K2E3KwRQ' }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="font-display-md text-display-md text-on-surface mb-2">Recently Viewed</h1>
            <p className="font-body-md text-on-surface-variant">Items you've browsed recently.</p>
          </div>
          <button className="text-on-surface-variant hover:text-red-600 font-label-md flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-[18px]">delete_sweep</span> Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-surface-container rounded-lg mb-3 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-body-md text-on-surface group-hover:text-forest-green transition-colors mb-1 truncate">{product.name}</h3>
              <p className="font-body-sm text-on-surface-variant mb-1">{product.artisan}</p>
              <div className="flex items-center justify-between">
                <span className="font-label-md text-on-surface">${product.price}</span>
                <span className="font-body-sm text-on-surface-variant">{product.viewedAt}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
