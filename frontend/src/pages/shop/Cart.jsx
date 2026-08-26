import React, { useEffect } from 'react';
import { useCart } from '../../context/CartProvider';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import EmptyCart from './EmptyCart';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="flex-grow pt-28 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full bg-surface-linen font-body-md text-on-surface">
      
      {/* Title */}
      <div className="mb-10">
        <h1 className="font-display-lg text-headline-lg md:text-display-lg text-forest-green font-bold mb-1">Your Collection</h1>
        <p className="font-body-md text-on-surface-variant text-sm italic">A curated selection of crafted objects.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Items */}
        <div className="lg:col-span-8 space-y-6">
          {cartItems.map(item => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row gap-6 p-6 bg-white shadow-sm rounded-xl border border-outline-variant/30 group"
            >
              <div 
                className="w-full sm:w-44 h-56 overflow-hidden bg-surface-container rounded-lg shrink-0 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img 
                  src={item.imageUrl || item.image || `https://picsum.photos/400/500?random=${item.id}`} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              <div className="flex flex-grow flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="font-headline-md text-lg text-forest-green hover:text-terracotta transition-colors font-bold cursor-pointer"
                      >
                        {item.name}
                      </h3>
                      <p className="font-label-sm text-[11px] text-on-surface-variant uppercase mt-0.5 tracking-widest font-semibold">
                        {item.category || 'Handmade Craft'}
                      </p>
                    </div>
                    <span className="font-headline-md text-base text-on-surface font-bold">
                      ${(item.price || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="mt-6 sm:mt-0 space-y-4">
                  <div className="flex items-center">
                    <div className="flex items-center border border-outline-variant rounded px-3 py-1 gap-4 bg-surface-container-low/40">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-on-surface-variant hover:text-forest-green transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="font-label-md text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                        className="text-on-surface-variant hover:text-forest-green transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-semibold text-on-surface-variant">
                    <button 
                      onClick={() => alert('Saved to wishlist!')}
                      className="hover:text-terracotta transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px]">favorite</span> Save
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="hover:text-red-700 transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px]">close</span> Remove
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
          
          <div className="pt-6">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-xs font-label-md uppercase tracking-wider text-terracotta hover:text-forest-green transition-colors font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Continue Exploring
            </Link>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white p-6 md:p-8 shadow-sm rounded-xl border border-outline-variant/30 space-y-6">
            <h2 className="font-headline-md text-lg text-forest-green font-bold pb-3 border-b border-outline-variant/20">Summary</h2>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-semibold text-on-surface">${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Standard Delivery</span>
                <span className="font-semibold text-on-surface">$0.00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Tax</span>
                <span className="font-semibold text-on-surface">$0.00</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-baseline">
              <span className="font-headline-md text-base text-forest-green font-bold">Total</span>
              <span className="font-display-lg text-2xl text-forest-green font-bold">${getTotal().toFixed(2)}</span>
            </div>
            
            <button 
              onClick={() => navigate('/order-summary')}
              className="w-full py-4 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity font-bold shadow"
            >
              Proceed to Checkout
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant/80 font-medium pt-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Secure Checkout</span>
            </div>

            <div className="pt-6 border-t border-outline-variant/20 space-y-4 text-xs">
              <div className="flex items-start gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-forest-green text-[18px] shrink-0 mt-0.5">local_shipping</span>
                <div>
                  <p className="font-bold text-charcoal">Complimentary Shipping</p>
                  <p className="text-[11px] text-on-surface-variant/80">On all domestic orders within the continent.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-forest-green text-[18px] shrink-0 mt-0.5">published_with_changes</span>
                <div>
                  <p className="font-bold text-charcoal">30-Day Returns</p>
                  <p className="text-[11px] text-on-surface-variant/80">Returns are accepted for a full refund or exchange.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </main>
  );
};

export default Cart;
