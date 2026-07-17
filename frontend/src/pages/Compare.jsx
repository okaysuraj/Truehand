import api from '../services/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Compare = () => {
  const [compareItems, setCompareItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('compareItems')) || [];
    setCompareItems(items);
  }, []);

  const handleRemove = (id) => {
    const newItems = compareItems.filter(item => item.id !== id);
    setCompareItems(newItems);
    localStorage.setItem('compareItems', JSON.stringify(newItems));
  };

  if (compareItems.length === 0) {
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  
    return (
      <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop min-h-screen flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-stack-md">compare_arrows</span>
        <h2 className="font-display-lg text-display-lg text-forest-green mb-2">No items to compare</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">Select products from the shop to compare their features and craftsmanship.</p>
        <Link to="/products" className="px-8 py-3 bg-forest-green text-white font-label-md text-label-md hover:bg-forest-green/90 transition-all duration-300 uppercase tracking-widest rounded-sm">
          Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop min-h-screen">
      {/* Header Section */}
      <div className="mb-stack-lg border-b border-outline-variant pb-8">
        <nav className="flex items-center gap-2 mb-4">
          <Link to="/" className="font-label-sm text-label-sm text-on-surface-variant hover:text-forest-green uppercase tracking-widest transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/products" className="font-label-sm text-label-sm text-on-surface-variant hover:text-forest-green uppercase tracking-widest transition-colors">Shop</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-label-sm text-label-sm text-forest-green uppercase tracking-widest">Compare</span>
        </nav>
        <h1 className="font-display-lg text-display-lg text-forest-green">Compare Artisanal Pieces</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-2">Discover the subtle differences in texture, finish, and form between our most coveted hand-crafted pieces.</p>
      </div>

      {/* Comparison Table Container */}
      <div className="bg-white rounded-sm shadow-sm overflow-hidden border border-surface-container">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-forest-green scrollbar-track-surface-container pb-4">
          <div className="grid min-w-[800px]" style={{ gridTemplateColumns: `240px repeat(${compareItems.length}, minmax(280px, 1fr))` }}>
            
            {/* Top Row: Imagery & Titles */}
            <div className="sticky left-0 z-20 bg-surface-container-low p-stack-lg flex flex-col justify-end border-b border-r border-surface-container shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
              <span className="font-label-md text-label-md text-forest-green uppercase tracking-widest">Specifications</span>
            </div>
            
            {compareItems.map(item => (
              <div key={item.id} className="p-stack-lg bg-surface-container-lowest border-b border-r border-surface-container group relative">
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-4 right-4 p-2 bg-surface-container/50 hover:bg-error-red hover:text-white rounded-full text-on-surface-variant transition-colors z-10"
                  title="Remove"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                <div className="aspect-square mb-6 overflow-hidden bg-surface-linen rounded-sm">
                  <img 
                    src={item.imageUrl || `https://picsum.photos/400/400?random=${item.id}`} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <h3 className="font-headline-md text-headline-md text-charcoal mb-1 truncate">{item.name}</h3>
                <p className="font-label-md text-label-md text-secondary">${item.price?.toFixed(2)}</p>
                <Link to={`/product/${item.id}`} className="block w-full text-center mt-6 border border-charcoal text-charcoal py-3 font-label-md text-label-md rounded-sm hover:bg-charcoal hover:text-white transition-all">
                  View Details
                </Link>
              </div>
            ))}

            {/* Row: Category */}
            <div className="sticky left-0 z-20 bg-surface-container-low p-stack-md border-b border-r border-surface-container flex items-center shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Category</span>
            </div>
            {compareItems.map(item => (
              <div key={item.id} className="p-stack-md border-b border-r border-surface-container font-body-md text-body-md text-on-surface">
                {item.category}
              </div>
            ))}

            {/* Row: Availability */}
            <div className="sticky left-0 z-20 bg-surface-container-low p-stack-md border-b border-r border-surface-container flex items-center shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Availability</span>
            </div>
            {compareItems.map(item => (
              <div key={item.id} className="p-stack-md border-b border-r border-surface-container font-body-md text-body-md text-on-surface flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.stockQuantity > 0 ? 'bg-forest-green' : 'bg-error-red'}`}></span>
                {item.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
              </div>
            ))}

            {/* Row: Description */}
            <div className="sticky left-0 z-20 bg-surface-container-low p-stack-md border-b border-r border-surface-container flex items-start shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mt-1">Description</span>
            </div>
            {compareItems.map(item => (
              <div key={item.id} className="p-stack-md border-b border-r border-surface-container font-body-md text-body-md text-on-surface-variant line-clamp-4 leading-relaxed">
                {item.description}
              </div>
            ))}

          </div>
        </div>
      </div>
    </main>
  );
};

export default Compare;
