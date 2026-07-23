import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const BrandListing = () => {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Ceramics', 'Textiles', 'Woodwork', 'Jewelry', 'Metalwork', 'Leather', 'Glasswork'];

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        // Derive brands from trending products' seller info
        const res = await api.get('/products?size=50');
        const products = res.data?.content || res.data || [];
        const sellerMap = {};
        products.forEach(p => {
          if (p.sellerId && !sellerMap[p.sellerId]) {
            sellerMap[p.sellerId] = {
              id: p.sellerId,
              name: p.sellerName || `Artisan #${p.sellerId}`,
              category: p.category || 'Various',
              productCount: 1,
              sampleImage: p.imageUrl,
              rating: p.averageRating || 0,
            };
          } else if (p.sellerId && sellerMap[p.sellerId]) {
            sellerMap[p.sellerId].productCount++;
          }
        });
        setSellers(Object.values(sellerMap));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchBrands();
  }, []);

  const filtered = sellers
    .filter(s => category === 'All' || s.category === category)
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Artisan Brands</h1>
          <p className="font-body-md text-on-surface-variant">Discover the independent makers and studios behind every piece.</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              type="text"
              placeholder="Search artisans..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full font-label-sm transition-colors ${
                  category === c ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 animate-pulse">
                <div className="h-32 bg-surface-variant/40" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-surface-variant/40 rounded w-2/3" />
                  <div className="h-3 bg-surface-variant/40 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-outline-variant block mb-4">storefront</span>
            <p className="font-headline-sm text-on-surface mb-2">No artisans found</p>
            <p className="font-body-md text-on-surface-variant">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(seller => (
              <div
                key={seller.id}
                onClick={() => navigate(`/storefront/${seller.id}`)}
                className="group bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Banner */}
                <div className="h-32 bg-gradient-to-br from-forest-green/10 to-terracotta/10 overflow-hidden relative">
                  {seller.sampleImage && (
                    <img src={seller.sampleImage} alt={seller.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-surface-container-lowest border-2 border-outline-variant/30 shadow flex items-center justify-center">
                      <span className="font-display-sm text-display-sm text-forest-green">{seller.name.charAt(0)}</span>
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4 text-center">
                  <h3 className="font-label-md text-on-surface mb-1 truncate">{seller.name}</h3>
                  <p className="font-body-sm text-on-surface-variant mb-2">{seller.category}</p>
                  <div className="flex items-center justify-center gap-3 font-label-sm text-on-surface-variant">
                    <span>{seller.productCount} items</span>
                    {seller.rating > 0 && (
                      <>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-amber-500 text-[12px]">star</span>
                          <span>{seller.rating.toFixed(1)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandListing;
