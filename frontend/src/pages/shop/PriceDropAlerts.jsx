import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_ALERTS = [
  {
    id: 1,
    name: 'Earthen Sentinel Vase',
    category: 'Ceramics',
    originalPrice: 340,
    price: 285,
    badge: 'Price Drop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkiFJnbncgEkmqDmqe0MBDy2BiAcFqPTyzmH9VgwCBfhFozlFLHD7QCCjl720K3D4ukrkeSt_FU4dHoH5Wb8n0a_XxHk29Fk8ZfwrietxverrL4jyFHycqoz8cfPbIK1DO-fST3JuQdJX8XJnTsXLCUUknpYLt5ajy6Eh7l0ZGbeKxWTmMtDECgWrBUl5mknHy4O0FrPH1ZgKrx12XxohiW6k2o2NwJ9ZxuE_fN2tfLsW5vSeG92VRwA',
  },
  {
    id: 2,
    name: 'Lucent Brass Study Lamp',
    category: 'Lighting',
    originalPrice: 520,
    price: 410,
    badge: 'Limited Time',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7C20XAvKULeT-UH4TrvrCurPZ1SMF70Ey69MDSq6egYMB-7p32ugevtZM8HJrKJ5GlNYxINmZPy3kdxQb13ihzp1SKzYRtJ-RASIeaq5mTDQcNAnWJLRKGdrT3oaa45Ik8e6AFy35WbMR3SxwnER0B2MkjXfBckaw4IixwLAe52u3QWPtWP0gOx0jNS4Dyd0HwPFFgDP5PuJg1OkkLX6k3liIbs3NiClcEpDdPizfEIjYrFw4o-24pg',
  },
  {
    id: 3,
    name: 'Artisan Leather Porter',
    category: 'Leather',
    originalPrice: 890,
    price: 750,
    badge: 'Price Drop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxrDn7XdAXJ_f1T5WHkGYCwWJseRpbgATW-yxNUwxneBJ_DGB91j5eQcFzVq9yjiUmyvLteXMnJmjb7ljOvkklQkw5fFnBYqDql1OFnJRLNc1WPkvdFELVWdNLImXXDVVjLMjgTabFAIJOy3uUDFBJTFrelHn95-t-e1pilMMUgQ7WS1vRd8NsfG6SHcnJRVIQ3f8x0bLpYn18ilHcGhGW723RHn8252PGSLywh3DobaKrXpG81WHcsQ',
  },
  {
    id: 4,
    name: 'Slumber Glaze Nesting Set',
    category: 'Ceramics',
    originalPrice: 180,
    price: 145,
    badge: 'Price Drop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhzaetYRdJNKME-R2JoF7cu-bbRCCWIPRR5kfwYV5g00yn-P-A74ZPWzShTAJhu0IskvtnVBudJNMx5bCzmdGAWEjP48JgRVIqdruFvicFCt4xfhPtUiqEtdDTA1LuGtQysrAHysZd71zENSZNWMafchvJadKDhM4HM8FRt8B18Lnye-FoUaXdH8Ef0uF-qTJ4qUGH8ICKtDvlMWR9LfM-PZyJROsM3byJJpnG-VQrsJMb4rCYtwpaLQ',
  },
  {
    id: 5,
    name: 'Heritage Herringbone Throw',
    category: 'Textiles',
    originalPrice: 260,
    price: 195,
    badge: 'Flash Deal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaT7dWOFiybUu2bIJIMYXHwyA6a4T1occpNJ6e-2tR9GsXVAzFUR6HkX_msXoYZ3WmGlEgzkPoBAJEVRc4i8l7UbgiImagDq6MfN6TxqGRVxB5MHCxoDEmLmsu_u837751Uo4IrKa8ua3bM7-uAr2lvJOML3QWsY1DQOWnVZxs8Mma4RDceinZMsHZaI0VFdaq_RV_BOMWiumAsycF62dq9AF_d7j2ThwAo6GhzIg7HW_NXdkckvHeSQ',
  },
  {
    id: 6,
    name: 'Hand-Forged Culinaire Set',
    category: 'Kitchen',
    originalPrice: 450,
    price: 390,
    badge: 'Price Drop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNf9IsFInbAYEvB4xmdDyDEJzco7UMoSpW7oPZJ-ZsE-lRhqmUrTWvpSV9V28NkOvzxKHaEd7TGn5WhxFgBSteUTKHE3jD6xbFoVib0yM4l52KBN_h2PssZ_KCfh-0Q_NoS6vJnuAYviFz-LczgtFTNayZ0VFCXFWFpOrgyppRL1RbBmsKvpl6Stsejq3zL7UnN6mGLSr1B7J6XOFLSoqtW5pl32OMxA0iWr35LpWw-1nUk6k044y15w',
  },
];

const PriceDropAlerts = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All Savings');
  const [items, setItems] = useState(DEFAULT_ALERTS);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === 'All Savings') return true;
    return item.category === filter;
  });

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop bg-surface-linen text-on-surface font-body-md min-h-screen">
      
      {/* Page Header */}
      <div className="mb-8 border-b border-outline-variant/30 pb-6">
        <h1 className="font-headline-lg text-headline-lg text-forest-green mb-2 font-bold">Price Alerts</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Exceptional pieces from your curated list, now more accessible.</p>
      </div>

      {/* Filter/Sort Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div className="flex gap-3">
          {['All Savings', 'Ceramics', 'Lighting'].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-1.5 border text-label-sm font-label-sm rounded-full transition-colors ${
                filter === category
                  ? 'bg-forest-green text-white border-forest-green shadow-sm'
                  : 'bg-white border-outline-variant/40 text-on-surface hover:border-forest-green'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-1 text-label-md font-label-md text-forest-green cursor-pointer">
          <span>Sort by Newest</span>
          <span className="material-symbols-outlined text-[18px]">expand_more</span>
        </div>
      </div>

      {/* Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
        {filteredItems.map(product => (
          <article 
            key={product.id}
            className="group bg-white flex flex-col p-4 shadow-sm hover:shadow-md transition-all duration-500 rounded-lg border border-outline-variant/20"
          >
            <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-surface-container-low rounded">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={product.name}
                src={product.image}
              />
              <div className="absolute top-3 left-3 bg-terracotta text-white font-label-sm text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm font-semibold shadow">
                {product.badge}
              </div>
            </div>
            
            <div className="flex flex-col flex-grow text-center px-1 pb-1">
              <h3 className="font-body-md text-body-md text-charcoal mb-2 font-medium">{product.name}</h3>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-on-surface-variant line-through font-label-md text-label-md">${product.originalPrice}</span>
                <span className="text-terracotta font-label-md text-label-md font-bold">${product.price}</span>
              </div>
              <button 
                onClick={() => navigate(`/product/${product.id}`)}
                className="mt-auto w-full py-3 bg-forest-green text-white font-label-md text-label-md tracking-wider uppercase hover:bg-forest-green/90 transition-colors rounded font-semibold shadow-sm"
              >
                Claim Offer
              </button>
            </div>
          </article>
        ))}
      </section>

    </main>
  );
};

export default PriceDropAlerts;
