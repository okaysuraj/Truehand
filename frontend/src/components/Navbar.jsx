import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/CartProvider';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = (cartItems || []).reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-300">
      <nav className="flex justify-between items-center w-full px-margin-desktop py-stack-md max-w-container-max mx-auto h-20">
        {/* Brand Logo */}
        <div className="flex-1">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
            <img src="/images/logo.svg" alt="TrueHand Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <Link to="/features" className="underline">
          Features
        </Link>
        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link
              to="/products"
              className="font-label-md text-label-md text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/features/artisans"
              className="font-label-md text-label-md text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors"
            >
              Artisans
            </Link>
          </li>
          <li>
            <Link
              to="/features/categories"
              className="font-label-md text-label-md text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors"
            >
              Categories
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                to="/wishlist"
                className="font-label-md text-label-md text-on-surface-variant dark:text-on-tertiary-container hover:text-forest-green transition-colors"
              >
                Wishlist
              </Link>
            </li>
          )}
        </ul>

        {/* Trailing Actions */}
        <div className="flex-1 flex justify-end items-center gap-6 relative">
          {/* Search Toggle */}
          {isSearchOpen ? (
            <form
              onSubmit={handleSearch}
              className="absolute right-32 top-1/2 -translate-y-1/2 flex items-center bg-surface-container-low rounded-full px-4 py-1 border border-outline-variant animate-in fade-in slide-in-from-right-4"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none font-body-md text-on-surface w-40 placeholder:text-on-surface-variant/50"
                autoFocus
              />
              <button
                type="submit"
                className="material-symbols-outlined text-on-surface-variant hover:text-forest-green"
              >
                search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="material-symbols-outlined text-on-surface-variant hover:text-error-red ml-2 text-[18px]"
              >
                close
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="material-symbols-outlined text-on-surface cursor-pointer transition-all duration-300 hover:text-forest-green hover:scale-110"
            >
              search
            </button>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="material-symbols-outlined text-on-surface cursor-pointer transition-all duration-300 hover:text-forest-green hover:scale-110 relative group"
          >
            shopping_bag
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          {isAuthenticated ? (
            <div className="relative group">
              <Link
                to={user?.role === 'SELLER' ? '/seller/dashboard' : '/profile'}
                className="material-symbols-outlined text-on-surface cursor-pointer transition-all duration-300 hover:text-forest-green hover:scale-110"
              >
                account_circle
              </Link>
              {/* Dropdown (Hover) */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-outline-variant/30 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-2">
                <Link
                  to={user?.role === 'SELLER' ? '/seller/dashboard' : '/profile'}
                  className="px-4 py-2 font-label-md text-on-surface hover:bg-surface-container-low hover:text-forest-green"
                >
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  className="px-4 py-2 font-label-md text-on-surface hover:bg-surface-container-low hover:text-forest-green"
                >
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 font-label-md text-left text-error-red hover:bg-error-container/20"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="font-label-md text-label-md text-on-surface border border-outline-variant px-4 py-2 rounded-full hover:bg-surface-container hover:border-forest-green hover:text-forest-green transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
