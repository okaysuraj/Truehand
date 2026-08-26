import React from 'react';
import { Link } from 'react-router-dom';

const EmptyWishlist = () => {
  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen flex flex-col items-center justify-center text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center text-outline-variant mx-auto shadow-sm">
          <span className="material-symbols-outlined text-5xl">favorite_border</span>
        </div>

        <div className="space-y-2">
          <span className="font-label-sm text-xs uppercase tracking-widest text-terracotta font-bold">
            Curated Sanctuary
          </span>
          <h1 className="font-display-lg text-3xl md:text-4xl text-forest-green font-bold">
            Your Gallery is Empty
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            You haven't saved any handcrafted treasures yet. Discover timeless pieces crafted with patience and intent by master artisans.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/products"
            className="px-8 py-3.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-bold shadow"
          >
            Start Exploring
          </Link>
          <Link 
            to="/trending"
            className="px-8 py-3.5 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-widest rounded-lg hover:bg-surface-container transition-all font-semibold"
          >
            View New Arrivals
          </Link>
        </div>
      </div>
    </main>
  );
};

export default EmptyWishlist;
