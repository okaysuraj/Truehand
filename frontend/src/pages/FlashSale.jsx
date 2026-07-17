import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FlashSale = () => {
  const [timeLeft] = useState({ hours: 4, minutes: 32, seconds: 18 });

  const products = [
    { id: 1, name: 'Hand-Thrown Ceramic Vase', artisan: 'Elena Studio', originalPrice: 120, salePrice: 72, discount: '40%', sold: 67, total: 100, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw' },
    { id: 2, name: 'Woven Indigo Throw', artisan: 'Tidal Textiles', originalPrice: 200, salePrice: 140, discount: '30%', sold: 42, total: 50, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A' },
    { id: 3, name: 'Raw Sandstone Sculpture', artisan: 'Stone & Time', originalPrice: 450, salePrice: 270, discount: '40%', sold: 12, total: 20, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtExz30CUj3OhHY1qRJT7iqKjlA9owNKpJOiK-Au2lQn8jlbdXjp4f5lwhvkZeb_mCCQctKKkZr1IPtZDaDUihMrsKNYMsfLU8F__veHjFnFgtDRBictWZ9qj5CfmWIxkNLS6GgK8zTh6nkzPm9OgAPoZR60g1mQL0cjNzVNiDiZPg0z10EuS4LYLBkbqQeSDGjeljCWLmsXoBa9EKITfu4BAvzuBCkDPuIpUw_jBKTHQazw_GkZwZKw' },
    { id: 4, name: 'Smoke Tinted Glassware', artisan: 'Molten Light', originalPrice: 120, salePrice: 84, discount: '30%', sold: 88, total: 100, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl32JIaQbyVRfKquoWr73CBK1P7KEV3FclqyVydZOXMW9b83FV7EglQeDBblwAxNrdVTtU1zGODJuR-ITbtOV_kxNg5U3lQaJmwi5nM8nG6WAqB_yN3luvUoNa9kUE0XRNoJ59nFaXxzPZ7-Z49tZfwG8M91aHCkskouHxtDctoQFL4_2KLhHEITPcaXWh8U-WiowONVUJU3DFhT8ULsza8-8imKcb6BuhOqPokG7v5laz--K2E3KwRQ' }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Banner */}
        <div className="bg-gradient-to-r from-charcoal to-forest-green rounded-xl p-8 md:p-12 mb-10 text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-amber-400">bolt</span>
              <span className="font-label-md uppercase tracking-widest text-amber-300">Flash Sale</span>
            </div>
            <h1 className="font-display-lg text-display-lg mb-3">Artisan Collection Sale</h1>
            <p className="font-body-lg opacity-80 mb-8 max-w-xl">Up to 40% off on handcrafted pieces. Limited stock, limited time.</p>
            <div className="flex gap-4">
              {[
                { val: String(timeLeft.hours).padStart(2, '0'), label: 'Hours' },
                { val: String(timeLeft.minutes).padStart(2, '0'), label: 'Minutes' },
                { val: String(timeLeft.seconds).padStart(2, '0'), label: 'Seconds' }
              ].map((t, i) => (
                <div key={i} className="bg-white/10 backdrop-blur rounded-lg px-5 py-3 text-center border border-white/10">
                  <p className="font-display-md text-3xl">{t.val}</p>
                  <p className="font-label-sm text-white/60 uppercase tracking-wider">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3 bg-red-600 text-white font-label-md px-3 py-1 rounded">{product.discount} OFF</div>
              </div>
              <div className="p-4">
                <h3 className="font-label-md text-on-surface group-hover:text-forest-green transition-colors mb-1 truncate">{product.name}</h3>
                <p className="font-body-sm text-on-surface-variant mb-3">by {product.artisan}</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-headline-sm text-headline-sm text-on-surface">${product.salePrice}</span>
                  <span className="font-body-sm text-on-surface-variant line-through">${product.originalPrice}</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${(product.sold / product.total) * 100}%` }}></div>
                </div>
                <p className="font-label-sm text-on-surface-variant">{product.sold}/{product.total} sold</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
