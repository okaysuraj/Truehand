import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchWishlist();
  }, [user, navigate]);

  const fetchWishlist = async () => {
    try {
      const res = await api.get(`/wishlist/user/${user.id}`);
      setProducts(res.data);
    } catch (e) {
      console.error('Failed to fetch wishlist', e);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/wishlist/user/${user.id}/product/${productId}`);
      fetchWishlist();
    } catch (e) {
      alert('Failed to remove item');
    }
  };

  if (!user) return null;

  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop min-h-screen">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-end mb-stack-lg border-b border-outline-variant pb-8">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-display-lg text-forest-green mb-stack-sm">My Collections</h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            A curated archive of the pieces that speak to you. Each selection is a testament to timeless craftsmanship and the enduring beauty of natural materials.
          </p>
        </div>
        <div className="mt-stack-lg md:mt-0">
          <Link to="/products" className="flex items-center gap-2 bg-forest-green text-on-primary px-6 py-3 rounded-sm font-label-md text-label-md hover:opacity-90 transition-all uppercase tracking-wider">
            <span className="material-symbols-outlined text-[20px]" data-icon="add">add</span>
            Browse More
          </Link>
        </div>
      </header>

      {/* Product Gallery Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-stack-md">favorite_border</span>
          <h2 className="font-headline-lg text-headline-lg text-forest-green mb-2">Your collection is empty</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">Discover timeless pieces crafted by world-class artisans.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map(p => (
            <div key={p.id} className="group flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-low mb-stack-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                <Link to={`/product/${p.id}`}>
                  <img 
                    src={p.imageUrl || `https://picsum.photos/400/533?random=${p.id}`} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </Link>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleRemove(p.id)}
                    className="p-2 bg-white/80 backdrop-blur-md rounded-full text-forest-green hover:bg-error-red hover:text-white transition-all shadow-sm"
                    title="Remove from Wishlist"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
              <div className="text-center space-y-1 w-full">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Curated Item</span>
                <Link to={`/product/${p.id}`}>
                  <h3 className="font-body-md text-body-md text-on-surface font-medium hover:text-forest-green transition-colors">{p.name}</h3>
                </Link>
                <p className="font-label-md text-label-md text-on-surface-variant">${p.price?.toFixed(2)}</p>
                <button 
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="mt-4 px-6 py-2 border border-charcoal text-charcoal font-label-md text-label-md hover:bg-charcoal hover:text-white transition-all uppercase tracking-tighter w-full rounded-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          
          <Link to="/products" className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant bg-surface-container-low aspect-[3/4] hover:bg-surface-container transition-colors cursor-pointer group rounded-sm">
            <span className="material-symbols-outlined text-[48px] text-outline-variant group-hover:text-forest-green transition-colors" data-icon="bookmark_add">bookmark_add</span>
            <span className="font-label-md text-label-md text-on-surface-variant mt-4 uppercase tracking-widest">Continue Exploring</span>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Wishlist;
