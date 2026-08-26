import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_RECENT = [
  {
    id: 1,
    name: 'Charcoal Artisan Bowl',
    category: 'Ceramics',
    price: 120.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQTTWeuVYDDRe0x4ZU51h8rL4iG58TGr81FhoCMkQpQOUIVAGka_3xyykWtamLLGlvWL2pZO4hmx_gg1ZUB41Lhlzve-nlIwmKkNbyqYZdjc_6wjoA1HQXtbSK7pbx1saHgilkALjF20vG07_7qQfEBsZHP7-5Wstx2gtJuvENMBcybzoMo8RVY9ulri5MvvU5W88tw3k7kq5OPUHGbatM5VepcjaQPuBwzsFejZh6wwdSbomP-YDuuA',
  },
  {
    id: 2,
    name: 'Raw Flax Studio Apron',
    category: 'Textiles',
    price: 85.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR3YEpO5L0apghvB3goidQwJ5VZh0K5VLpEhEgI3I-U15N1mA0R_TWQwVG69pXglj8DZGMJCsmWWzS66CCkBm-UpYjGAXorx2n06aQ_oxgnkON7LimK8Z8SSkATz9VACWb6Rz1NlW3vrl2NCZ_NjjCPUQvgMzVHAwoEsYpvDAEoKZgSXyhsr7NiyL3o5KwauGrY6X8J1fMrQMbdXdI5SlzHxZE6iX8rd5kAVxK5cRnyqWZcUhVQ5kpmw',
  },
  {
    id: 3,
    name: 'Curved Ash Desk',
    category: 'Furniture',
    price: 1450.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7ECS9_K9KympJW-TZiH00jHXe0mbNNLOzc6npCThc97kIs1PcTylbCG43ozBVC6QLCAOMObiFq9idTjMRECbM9k_PFDZx3qQhURNZ01feEvUgg_pEG_PvBfOvQWBJjh2hWhsCgzGZFvAEWmJRFroka8ZqtDxAZATcXFNbyvAPWBr16lDrq5vb2kQTx-mBTFJr1FZ3FKyMQIFqoi8s9gR-y25If_hLY97K23h2aPt5kqoRyzMWtQDzhw',
  },
  {
    id: 4,
    name: 'Hand-blown Glass Vessel',
    category: 'Glassware',
    price: 210.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqrJcBsnpkOIVuk91tCM2u_TezqD_G5DGwOWd4yM1kCgMAPNRm7F-uP-4q9t_4q5bLY4OySgbmhvg5Luvwnl_WLmwQ_R43PUHaoSOnYE6VxCRIVRrct2Sdf1q17deBrxrCUiph8YdHRScu0DGAArwOGo5EZbWwhlWE0lx5Y0LEaSWZTILOq0rzRIjvD6sv7oCdaAj91FZB31kcOSDkuJLy6BZ0GBsnmdNFtZqYl7pCh46XJdSDUSJOQw',
  },
  {
    id: 5,
    name: 'Hammered Copper Kettle',
    category: 'Kitchen',
    price: 340.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi_x2k4tms2987TmQ_e3rlRixjfHXCQwxxDldxK0_MizHsEebaLjz4qt7VuYX4GOtQN-ncWUpjWnlLhYogdkwF-w25ulkyECQat3mJ-zTHgHAhHL03NaAVjWWYQ5jf85WooIsiOfCZuxYd-6285Jc3PGf1c8D7Url1f3T_rNl1qEcn-2qRS-KOA4ipyKQ-mjj5lA1942yMTx1zgnpglW7mv5SkeeptJfh2sKOIPR_UMWV02n83RfB_kg',
  },
];

const RecentlyViewed = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(DEFAULT_RECENT);

  useEffect(() => {
    api.get('/products?size=5')
      .then(res => {
        const data = res.data?.content || res.data;
        if (Array.isArray(data) && data.length > 0) {
          // Merge dynamic with defaults
          const mapped = data.map((p, idx) => ({
            id: p.id,
            name: p.name,
            category: p.category || DEFAULT_RECENT[idx % DEFAULT_RECENT.length].category,
            price: p.price,
            image: p.imageUrl || DEFAULT_RECENT[idx % DEFAULT_RECENT.length].image,
          }));
          setItems([...mapped, ...DEFAULT_RECENT].slice(0, 5));
        }
      })
      .catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-28 pb-20 bg-surface-linen text-on-surface font-body-md min-h-screen">
      
      {/* Header Section */}
      <header className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-10 text-center md:text-left">
        <nav className="mb-4">
          <ul className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant justify-center md:justify-start">
            <li><Link to="/account/profile" className="hover:text-forest-green">Account</Link></li>
            <li><span className="material-symbols-outlined text-[12px]">chevron_right</span></li>
            <li className="text-on-surface font-semibold">Recently Viewed</li>
          </ul>
        </nav>
        <h1 className="font-display-lg text-display-lg mb-2 text-forest-green">Recently Viewed</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Rediscover your past inspirations</p>
      </header>

      {/* Product Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-12">
          {items.map(product => (
            <Link 
              to={`/product/${product.id}`}
              key={product.id}
              className="group cursor-pointer block"
            >
              <div className="relative overflow-hidden mb-4 aspect-[4/5] bg-surface-container-low rounded-lg shadow-sm">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={product.name}
                  src={product.image}
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="bg-white/90 p-2 rounded-full shadow-sm hover:bg-white text-forest-green"
                  >
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </button>
                </div>
              </div>
              <div className="text-center">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-body-md text-body-md text-on-surface mb-1 font-medium">{product.name}</h3>
                <p className="font-label-md text-label-md text-forest-green font-semibold">${Number(product.price).toFixed(2)}</p>
              </div>
            </Link>
          ))}

          {/* Keep Exploring Placeholder Card */}
          <div className="border border-dashed border-outline-variant/60 rounded-lg flex flex-col items-center justify-center p-8 text-center group transition-colors hover:bg-surface-container-low/50 min-h-[350px]">
            <span className="material-symbols-outlined text-outline-variant text-[48px] mb-4 group-hover:text-forest-green transition-colors">search_insights</span>
            <h4 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">Keep Exploring</h4>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-[200px] text-sm">Find more unique pieces from our latest artisanal collection.</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-forest-green text-white px-6 py-2.5 rounded font-label-md text-label-md hover:bg-forest-green/90 transition-colors shadow-sm font-semibold"
            >
              Browse Collections
            </button>
          </div>
        </div>
      </section>

      {/* Discovery Banner: Crafted for a Lifetime */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="relative h-[360px] md:h-[400px] flex items-center overflow-hidden rounded-xl bg-surface-container-low shadow-sm">
          <div className="absolute inset-0 w-full md:w-1/2">
            <img 
              className="w-full h-full object-cover opacity-90" 
              alt="Artisan at wheel" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGdkho9toIBTEnEEA6h9z04EjU2QfAY90ox6iAqnKufhgTK3kdpEo034nn_453D_Z8XSLN7fAfeO5MgAtluhmG2Bsg6LIIpEB9l6ENraR8rc54-hI9hkbRa3FBKsBq4aEbbO5HGvq9DRFK1D6kf0576fP3BRc4kFx3HXO3n3bnlnsSBmrWyeNd3A1_nE5ITmwm1phT5RoxNJMoKbl2r_QtVZ1yqCH2B8WaPgK070at0gNMZ1KAB1kQw" 
            />
          </div>
          <div className="relative z-10 w-full flex justify-end">
            <div className="w-full md:w-1/2 p-8 md:p-12 md:pl-16">
              <span className="font-label-sm text-label-sm text-terracotta uppercase tracking-[0.2em] mb-2 block font-semibold">Our Commitment</span>
              <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-3 leading-tight">Crafted for a Lifetime</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 max-w-md">Every piece you view is a result of hundreds of hours of patient work by masters of their craft.</p>
              <Link to="/brands" className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface border-b border-on-surface pb-1 hover:text-forest-green hover:border-forest-green transition-all font-semibold">
                Meet the Artisans <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default RecentlyViewed;
