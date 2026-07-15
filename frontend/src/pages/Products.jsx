import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../services/CartProvider';
import { useAuth } from '../services/AuthProvider';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || '';

  const handleAddToWishlist = async (e, productId) => {
    e.preventDefault();
    if (!user) { alert('Please login to add to wishlist'); return; }
    try {
      await api.post(`/wishlist/user/${user.id}/product/${productId}`);
      alert('Added to Wishlist!');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (currentSearch) params.search = currentSearch;
        if (currentCategory) params.category = currentCategory;
        if (currentSort) params.sort = currentSort;
        
        // Always ask for 50 items for now
        params.size = 50;

        const res = await api.get('/products/filter', { params });
        if (res.data && res.data.content) {
          setProducts(res.data.content);
          setTotalElements(res.data.totalElements);
        } else {
          setProducts(res.data);
          setTotalElements(res.data.length);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [currentSearch, currentCategory, currentSort]);

  const updateFilter = (key, value) => {
    setSearchParams(prev => {
      if (value === null || value === '') {
        prev.delete(key);
      } else {
        prev.set(key, value);
      }
      return prev;
    });
  };

  const categories = ['All', 'Ceramics', 'Textiles', 'Woodwork', 'Glass', 'Jewelry'];

  return (
    <main className="pt-24 bg-surface-linen min-h-screen text-charcoal">
      <div className="px-margin-desktop max-w-container-max mx-auto w-full flex-1 mb-section-gap">
        
        {/* Page Header */}
        <section className="mb-10">
          <h1 className="font-display-lg text-display-lg text-forest-green mb-4">
            {currentSearch ? `Search: "${currentSearch}"` : currentCategory ? currentCategory : 'All Products'}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
            Discover artisanal pieces crafted with intention and heritage techniques.
          </p>
        </section>

        {/* Filters */}
        <nav className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-outline-variant/30 pb-4 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => {
              const isSelected = (currentCategory === cat) || (cat === 'All' && !currentCategory);
              return (
                <button 
                  key={cat}
                  onClick={() => updateFilter('category', cat === 'All' ? null : cat)}
                  className={`px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all ${isSelected ? 'bg-forest-green text-white' : 'text-outline hover:bg-surface-container hover:text-charcoal'}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-label-sm font-label-sm text-outline">Sort by:</span>
            <select 
              value={currentSort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-transparent border-none font-label-md text-label-md text-charcoal cursor-pointer focus:ring-0 outline-none p-0 pr-4"
            >
              <option value="">Featured</option>
              <option value="price,asc">Price: Low to High</option>
              <option value="price,desc">Price: High to Low</option>
              <option value="averageRating,desc">Highest Rated</option>
            </select>
          </div>
        </nav>

        {/* Header Results Count */}
        <div className="mb-6 font-label-sm text-label-sm text-outline tracking-wider uppercase">
          {products.length} {products.length === 1 ? 'Piece' : 'Pieces'}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-[64px] text-outline-variant mb-4">inventory_2</span>
            <h3 className="font-headline-md text-headline-md text-charcoal mb-2">No pieces found</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Try adjusting your filters or search terms.</p>
            <button onClick={() => setSearchParams({})} className="mt-6 border border-forest-green text-forest-green px-6 py-2 rounded font-label-md hover:bg-forest-green hover:text-white transition-colors">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {products.map(p => (
              <div key={p.id} className="group bg-white border border-transparent hover:border-outline-variant/30 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg">
                <Link to={`/product/${p.id}`} className="relative aspect-[4/5] overflow-hidden bg-surface-container-low block">
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-500 z-10 pointer-events-none"></div>
                  <img 
                    src={p.imageUrl || `https://picsum.photos/400/500?random=${p.id}`} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <button 
                    onClick={(e) => { e.preventDefault(); handleAddToWishlist(e, p.id); }}
                    className="absolute top-4 right-4 text-on-surface bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:text-terracotta hover:scale-110 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1 gap-4">
                    <Link to={`/product/${p.id}`} className="font-body-md text-body-md text-charcoal truncate hover:text-forest-green transition-colors flex-1">
                      {p.name}
                    </Link>
                    <span className="font-label-md text-label-md text-charcoal shrink-0">${Math.floor(p.price)}</span>
                  </div>
                  <p className="text-label-sm font-label-sm text-outline tracking-wider mb-4 truncate">{p.sellerName || 'TrueHand Collective'}</p>
                  
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-outline-variant/10">
                    <div className="flex items-center gap-1 text-terracotta">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-label-sm text-label-sm font-bold">{p.averageRating ? p.averageRating.toFixed(1) : 'New'}</span>
                      {p.reviewCount > 0 && <span className="text-outline font-normal">({p.reviewCount})</span>}
                    </div>
                    
                    <button 
                      onClick={() => addToCart(p, 1)}
                      className="text-forest-green font-label-sm text-label-sm hover:underline underline-offset-4 font-bold flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
