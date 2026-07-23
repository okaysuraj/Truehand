import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const SUBCATEGORY_MAP = {
  Ceramics: ['Tea Bowls', 'Vases', 'Plates', 'Mugs', 'Bowls', 'Sculpture'],
  Textiles: ['Scarves', 'Rugs', 'Tapestries', 'Bags', 'Table Linens', 'Cushions'],
  Woodwork: ['Furniture', 'Cutting Boards', 'Bowls', 'Sculptures', 'Frames', 'Toys'],
  Metalwork: ['Jewelry', 'Candle Holders', 'Wall Art', 'Kitchenware', 'Decor'],
  Jewelry: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Brooches', 'Sets'],
  Leather: ['Bags', 'Wallets', 'Belts', 'Journals', 'Phone Cases', 'Shoes'],
  Glasswork: ['Vases', 'Pendants', 'Bowls', 'Art Pieces', 'Drinkware'],
  Sculpture: ['Stone', 'Clay', 'Metal', 'Wood', 'Mixed Media'],
};

const Subcategories = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcat, setActiveSubcat] = useState('All');

  const subcats = ['All', ...(SUBCATEGORY_MAP[category] || [])];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/category/${encodeURIComponent(category)}`);
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    if (category) fetchProducts();
  }, [category]);

  const filtered = activeSubcat === 'All'
    ? products
    : products.filter(p => p.name?.toLowerCase().includes(activeSubcat.toLowerCase()));

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-label-sm text-on-surface-variant mb-8">
          <Link to="/" className="hover:text-forest-green transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/categories" className="hover:text-forest-green transition-colors">Categories</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface">{category}</span>
        </nav>

        <div className="mb-10">
          <h1 className="font-display-md text-display-md text-on-surface mb-2">{category}</h1>
          <p className="font-body-md text-on-surface-variant">
            {loading ? '...' : `${products.length} handcrafted pieces`}
          </p>
        </div>

        {/* Subcategory Pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {subcats.map(s => (
            <button
              key={s}
              onClick={() => setActiveSubcat(s)}
              className={`px-5 py-2 rounded-full font-label-sm transition-all duration-200 ${
                activeSubcat === s
                  ? 'bg-charcoal text-white shadow-md'
                  : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface hover:border-forest-green hover:text-forest-green'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-surface-variant/50" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-surface-variant/50 rounded w-3/4" />
                  <div className="h-4 bg-surface-variant/50 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-outline-variant block mb-4">category</span>
            <p className="font-headline-sm text-on-surface mb-2">No products found</p>
            <p className="font-body-md text-on-surface-variant mb-6">Be the first to list in this subcategory.</p>
            <Link to="/products" className="px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group bg-surface-container-lowest border border-outline-variant/20 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-surface-variant/30">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-label-sm text-on-surface-variant mb-1">{product.sellerName || 'Artisan'}</p>
                  <h3 className="font-label-md text-on-surface mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-on-surface">${product.price?.toFixed(2)}</span>
                    {product.averageRating > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-amber-500 text-[14px] filled">star</span>
                        <span className="font-label-sm text-on-surface-variant">{product.averageRating?.toFixed(1)}</span>
                      </div>
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

export default Subcategories;
