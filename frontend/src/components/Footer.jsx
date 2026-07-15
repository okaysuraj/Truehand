import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container-low dark:bg-tertiary">
      <div className="w-full px-margin-desktop py-section-gap max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* Brand Info */}
        <div className="flex flex-col gap-6">
          <h2 className="font-headline-md text-headline-md text-on-surface dark:text-on-tertiary-fixed">TrueHand</h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-container">
            Curating the world's most exceptional handcrafted goods, honoring the hands that build our future.
          </p>
        </div>
        
        {/* Navigation Links Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md text-on-surface dark:text-on-tertiary-fixed uppercase tracking-wider">Explore</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/sustainability" className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors">Sustainability</Link>
            <Link to="/products?category=Artisans" className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors">Artisan Collective</Link>
            <Link to="/products?category=Materials" className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors">Materials Guide</Link>
          </nav>
        </div>
        
        {/* Help Links Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md text-on-surface dark:text-on-tertiary-fixed uppercase tracking-wider">Support</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/help" className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors">Help</Link>
            <Link to="/privacy" className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors">Privacy</Link>
            <Link to="/terms" className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors">Terms</Link>
          </nav>
        </div>
        
        {/* Copyright and Social */}
        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md text-on-surface dark:text-on-tertiary-fixed uppercase tracking-wider">Follow</h4>
          <div className="flex gap-4">
            <a href="#" className="material-symbols-outlined text-on-surface-variant hover:text-forest-green">public</a>
            <a href="#" className="material-symbols-outlined text-on-surface-variant hover:text-forest-green">photo_camera</a>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container mt-4">
            &copy; {new Date().getFullYear()} TrueHand Artisanal Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
