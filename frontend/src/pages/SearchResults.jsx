import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || 'Ceramic Vase';
  
  const [filter, setFilter] = useState('relevance');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/products/filter', { params: { search: query, size: 20 } })
      .then(res => {
        if (res.data && res.data.content) setProducts(res.data.content);
        else setProducts(res.data || []);
      })
      .catch(err => console.error('Error fetching search results', err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Search Header */}
        <div className="mb-8">
          <p className="font-body-md text-on-surface-variant mb-2">Showing {products.length} results for</p>
          <h1 className="font-display-md text-display-md text-on-surface">"{query}"</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-forest-green" defaultChecked />
                  <span className="font-body-sm text-on-surface">Ceramics (12)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-forest-green" />
                  <span className="font-body-sm text-on-surface">Home Decor (8)</span>
                </label>
              </div>
            </div>
            
            <div className="pt-6 border-t border-outline-variant/30">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full p-2 bg-transparent border border-outline-variant/50 rounded text-center font-body-sm focus:border-forest-green outline-none" />
                <span>-</span>
                <input type="number" placeholder="Max" className="w-full p-2 bg-transparent border border-outline-variant/50 rounded text-center font-body-sm focus:border-forest-green outline-none" />
              </div>
            </div>
            
            <div className="pt-6 border-t border-outline-variant/30">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(stars => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="rating" className="accent-forest-green" />
                    <span className="flex items-center gap-1 font-body-sm text-on-surface">
                      {Array.from({length: stars}).map((_, i) => <span key={i} className="material-symbols-outlined text-[16px] text-amber-500 font-variation-fill">star</span>)}
                      & Up
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="hidden md:block"></div> {/* Spacer */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="font-body-sm text-on-surface-variant whitespace-nowrap">Sort by:</span>
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  className="p-2 bg-transparent border border-outline-variant/50 rounded font-body-sm focus:border-forest-green outline-none w-full md:w-auto"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
               <div className="w-full flex justify-center py-10">
                 <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
               </div>
            ) : products.length === 0 ? (
               <div className="py-10 text-center">
                 <p className="font-body-md text-on-surface-variant">No pieces found matching your search.</p>
               </div>
            ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-surface-container rounded-lg mb-3 relative">
                    <img src={product.imageUrl || product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-on-surface-variant hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">favorite_border</span>
                    </button>
                  </div>
                  <h3 className="font-body-md text-on-surface group-hover:text-forest-green transition-colors mb-1 truncate">{product.name}</h3>
                  <p className="font-body-sm text-on-surface-variant mb-1">by {product.sellerName || 'Artisan'}</p>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-label-md text-on-surface">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-amber-500 font-variation-fill">star</span>
                      <span className="font-label-sm text-on-surface">{product.averageRating ? product.averageRating.toFixed(1) : 'New'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2">
              <button className="w-10 h-10 rounded border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant/30 transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
              <button className="w-10 h-10 rounded border border-forest-green bg-forest-green text-white flex items-center justify-center font-label-md">1</button>
              <button className="w-10 h-10 rounded border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-variant/30 transition-colors font-label-md">2</button>
              <button className="w-10 h-10 rounded border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-variant/30 transition-colors font-label-md">3</button>
              <button className="w-10 h-10 rounded border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant/30 transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
