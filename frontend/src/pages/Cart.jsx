import React from 'react';
import { useCart } from '../services/CartProvider';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  return (
    <main className="flex-grow pt-32 pb-section-gap px-margin-desktop max-w-container-max mx-auto w-full">
      {/* Title */}
      <div className="mb-12">
        <h1 className="font-display-lg text-display-lg text-forest-green">Your Collection</h1>
        <p className="font-body-md text-on-surface-variant mt-2 italic">A curated selection of crafted objects.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white shadow-sm shadow-forest-green/5">
          <span className="material-symbols-outlined text-[64px] text-outline mb-4">shopping_bag</span>
          <h2 className="font-headline-md text-headline-md text-charcoal mb-4">Your collection is empty.</h2>
          <Link to="/products" className="font-label-md text-label-md text-white bg-forest-green px-8 py-4 uppercase tracking-widest hover:bg-forest-green/90 transition-colors">
            Explore Curated Pieces
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-gutter">
          {/* Left Column: Items */}
          <div className="col-span-12 lg:col-span-8 space-y-gutter">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-container flex flex-col md:flex-row gap-stack-lg p-stack-lg bg-white shadow-sm shadow-forest-green/5 group rounded-sm">
                <div className="w-full md:w-48 h-64 overflow-hidden bg-surface-container rounded-sm flex-shrink-0 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                  <img 
                    src={item.imageUrl || `https://picsum.photos/400/500?random=${item.id}`} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" 
                  />
                </div>
                
                <div className="flex flex-grow flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-headline-md text-headline-md text-forest-green hover:text-terracotta transition-colors">{item.name}</h3>
                      </Link>
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 tracking-widest">{item.category || 'Artisan Collection'}</p>
                      <div className="font-label-sm text-label-sm text-on-surface-variant mt-2">Sold by: {item.sellerName || 'TrueHand'}</div>
                    </div>
                    <span className="font-label-md text-label-md text-forest-green">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center border border-outline/30 px-3 py-1 gap-4 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="hover:text-terracotta transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="font-label-md text-label-md w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                        className="hover:text-terracotta transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center space-x-6">
                    <button className="font-label-sm text-label-sm text-on-surface-variant hover:text-terracotta transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">favorite</span> Save
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="font-label-sm text-label-sm text-on-surface-variant hover:text-error-red transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-12 py-8 border-t border-outline/10">
              <Link to="/products" className="flex items-center gap-2 font-label-md text-label-md text-terracotta hover:gap-4 transition-all w-fit">
                <span className="material-symbols-outlined">arrow_back</span>
                Continue Exploring
              </Link>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-32 bg-white p-margin-desktop shadow-sm shadow-forest-green/5 space-y-6 rounded-sm">
              <h2 className="font-headline-md text-headline-md text-forest-green pb-4 border-b border-outline/10">Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>Subtotal ({cartItems.reduce((a,c)=>a+c.quantity, 0)} items)</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>Standard Delivery</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>Estimated Tax</span>
                  <span>$0.00</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-outline/10 flex justify-between items-baseline">
                <span className="font-headline-md text-headline-md text-forest-green">Total</span>
                <span className="font-display-lg text-[28px] text-forest-green">${getTotal().toFixed(2)}</span>
              </div>
              
              <div className="pt-4 space-y-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-forest-green text-white py-4 font-label-md text-label-md hover:bg-forest-green/90 transition-colors uppercase tracking-widest active:scale-[0.98] rounded-sm"
                >
                  Proceed to Checkout
                </button>
                <div className="flex flex-col items-center space-y-2 pt-4">
                  <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    Secure Checkout
                  </p>
                </div>
              </div>
              
              {/* Additional Context */}
              <div className="pt-8 space-y-4 border-t border-outline/10 mt-6">
                <div className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-terracotta">local_shipping</span>
                  <div>
                    <p className="font-label-md text-label-md text-forest-green">Complimentary Shipping</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">On all domestic orders within the continent.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-terracotta">history</span>
                  <div>
                    <p className="font-label-md text-label-md text-forest-green">30-Day Returns</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Returns are accepted for a full refund or exchange.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
