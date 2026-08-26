import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartProvider';
import api from '../../services/api';

const ShippingDetails = () => {
  const navigate = useNavigate();
  const { cartItems, getTotal } = useCart();
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [giftNoteOpen, setGiftNoteOpen] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const subtotal = cartItems.length > 0 ? getTotal() : 365.00;
  const shippingCost = deliveryMethod === 'express' ? 12.50 : 0.00;
  const total = subtotal + shippingCost;

  return (
    <main className="flex-grow pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Multi-step Progress Indicator */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          
          {/* Step 1: Cart (Done) */}
          <div className="flex flex-col items-center z-10">
            <div className="w-9 h-9 rounded-full bg-forest-green text-white flex items-center justify-center mb-1 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="font-label-md text-xs text-on-surface font-semibold">Cart</span>
          </div>
          <div className="flex-1 h-[2px] bg-forest-green mx-2 -mt-5"></div>

          {/* Step 2: Shipping (Active) */}
          <div className="flex flex-col items-center z-10">
            <div className="w-9 h-9 rounded-full border-2 border-forest-green bg-white text-forest-green flex items-center justify-center mb-1 ring-4 ring-forest-green/10 font-bold text-xs shadow-sm">
              2
            </div>
            <span className="font-label-md text-xs text-forest-green font-bold">Shipping</span>
          </div>
          <div className="flex-1 h-[2px] bg-outline-variant/40 mx-2 -mt-5"></div>

          {/* Step 3: Payment */}
          <div className="flex flex-col items-center z-10">
            <div className="w-9 h-9 rounded-full border-2 border-outline-variant/60 bg-white text-on-surface-variant flex items-center justify-center mb-1 text-xs font-semibold">
              3
            </div>
            <span className="font-label-md text-xs text-on-surface-variant">Payment</span>
          </div>
          <div className="flex-1 h-[2px] bg-outline-variant/40 mx-2 -mt-5"></div>

          {/* Step 4: Review */}
          <div className="flex flex-col items-center z-10">
            <div className="w-9 h-9 rounded-full border-2 border-outline-variant/60 bg-white text-on-surface-variant flex items-center justify-center mb-1 text-xs font-semibold">
              4
            </div>
            <span className="font-label-md text-xs text-on-surface-variant">Review</span>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Shipping Selection */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Address Selection */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/30">
            <div className="flex justify-between items-end mb-6 border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-md text-lg text-forest-green font-bold">Shipping Address</h2>
              <button 
                onClick={() => navigate('/add-address')}
                className="font-label-md text-xs text-terracotta hover:underline transition-all flex items-center gap-1 font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">add</span> Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Home */}
              <div 
                onClick={() => setSelectedAddress('home')}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  selectedAddress === 'home' 
                    ? 'border-2 border-forest-green bg-surface-container-low/30 shadow-sm' 
                    : 'border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Home</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedAddress === 'home' ? 'border-forest-green' : 'border-outline-variant'
                  }`}>
                    {selectedAddress === 'home' && <div className="w-2.5 h-2.5 rounded-full bg-forest-green"></div>}
                  </div>
                </div>
                <h3 className="font-body-lg text-sm font-bold text-forest-green mb-1">Julian Thorne</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  24 Highbury Terrace, Suite 4B<br />
                  Islington, London<br />
                  N5 1UP, United Kingdom
                </p>
              </div>

              {/* Studio */}
              <div 
                onClick={() => setSelectedAddress('studio')}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  selectedAddress === 'studio' 
                    ? 'border-2 border-forest-green bg-surface-container-low/30 shadow-sm' 
                    : 'border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Studio</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedAddress === 'studio' ? 'border-forest-green' : 'border-outline-variant'
                  }`}>
                    {selectedAddress === 'studio' && <div className="w-2.5 h-2.5 rounded-full bg-forest-green"></div>}
                  </div>
                </div>
                <h3 className="font-body-lg text-sm font-bold text-forest-green mb-1">Aesthete Collective</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  The Old Foundry, Studio 12<br />
                  Hackney Wick, London<br />
                  E9 5EN, United Kingdom
                </p>
              </div>

            </div>
          </section>

          {/* Section: Delivery Speed */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/30">
            <h2 className="font-headline-md text-lg text-forest-green font-bold mb-6 border-b border-outline-variant/20 pb-4">
              Delivery Method
            </h2>

            <div className="space-y-4">
              
              {/* Standard */}
              <div 
                onClick={() => setDeliveryMethod('standard')}
                className={`flex items-center justify-between p-4 sm:p-5 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'standard' 
                    ? 'border-2 border-forest-green bg-surface-container-low/30 shadow-sm' 
                    : 'border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    deliveryMethod === 'standard' ? 'border-forest-green' : 'border-outline-variant'
                  }`}>
                    {deliveryMethod === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-forest-green"></div>}
                  </div>
                  <div>
                    <h4 className="font-body-md text-sm font-bold text-forest-green">Standard Delivery</h4>
                    <p className="text-xs text-on-surface-variant italic">3-5 business days &bull; Carbon Neutral</p>
                  </div>
                </div>
                <span className="font-label-md text-sm font-bold text-forest-green">£0.00</span>
              </div>

              {/* Express */}
              <div 
                onClick={() => setDeliveryMethod('express')}
                className={`flex items-center justify-between p-4 sm:p-5 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'express' 
                    ? 'border-2 border-forest-green bg-surface-container-low/30 shadow-sm' 
                    : 'border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    deliveryMethod === 'express' ? 'border-forest-green' : 'border-outline-variant'
                  }`}>
                    {deliveryMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-forest-green"></div>}
                  </div>
                  <div>
                    <h4 className="font-body-md text-sm font-bold text-forest-green">Express Courier</h4>
                    <p className="text-xs text-on-surface-variant italic">Next business day &bull; Fully Tracked</p>
                  </div>
                </div>
                <span className="font-label-md text-sm font-bold text-forest-green">£12.50</span>
              </div>

            </div>
          </section>

          {/* Additional Options: Gift */}
          <section className="bg-surface-container-low/60 p-5 rounded-xl border border-dashed border-outline-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-forest-green text-2xl">redeem</span>
              <div>
                <p className="font-label-md text-xs font-bold text-on-surface">Is this a gift?</p>
                <p className="text-[11px] text-on-surface-variant">We'll include a handwritten card and remove pricing from the invoice.</p>
              </div>
            </div>
            <button 
              onClick={() => setGiftNoteOpen(!giftNoteOpen)}
              className="px-4 py-2 border border-forest-green text-forest-green font-label-sm text-xs rounded hover:bg-forest-green hover:text-white transition-all font-semibold whitespace-nowrap"
            >
              {giftNoteOpen ? 'Close Note' : 'Add Gift Note'}
            </button>
          </section>

          {giftNoteOpen && (
            <div className="bg-white p-4 rounded-xl border border-outline-variant/30 space-y-2 animate-in fade-in">
              <label className="block text-xs font-semibold text-charcoal">Handwritten Gift Message</label>
              <textarea 
                rows="3"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-xs focus:outline-none focus:border-forest-green"
                placeholder="Write your personal message here..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
              />
            </div>
          )}

        </div>

        {/* Right Column: Order Summary */}
        <aside className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-xl border border-outline-variant/30 shadow-sm space-y-6">
            <h2 className="font-headline-md text-lg text-forest-green font-bold pb-3 border-b border-outline-variant/20">
              Order Summary
            </h2>

            {/* Item Previews */}
            <div className="space-y-4 pb-4 border-b border-outline-variant/20">
              {cartItems.length > 0 ? (
                cartItems.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-surface-container rounded-lg overflow-hidden shrink-0">
                      <img src={item.imageUrl || item.image || `https://picsum.photos/400/500?random=${item.id}`} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-label-md text-xs font-bold text-forest-green">{item.name}</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Qty: {item.quantity}</p>
                      <span className="text-xs font-bold text-on-surface block mt-1">${(item.price || 0).toFixed(2)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-surface-container rounded-lg overflow-hidden shrink-0">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWoXETNUlNgjOaTw9ggetPI9phXGAqqrfgoRIlqjkJ2sqGDl2GXqAVFUD2qZzKuHDKRkYPbYHDtq7HVmtnvnbBN6Ip5hlmfNuF7sP4ArNO38jBO-bBkRFqWWWjAYnJgNE8VvXJv6PX8UQP0tcH_7KIqXMhVtOW8_435VJslute05U9HfcQBglkQXTAtnRvbAALFL_QAxQa3BHXdVRsFWKfk5HJLT7YsISJwOSbPj7ed7zTl7PQhAy_Gw" alt="Elowen Ceramic Vase" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-label-md text-xs font-bold text-forest-green">Elowen Ceramic Vase</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Matte Bone &bull; Qty: 1</p>
                      <span className="text-xs font-bold text-on-surface block mt-1">£145.00</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-surface-container rounded-lg overflow-hidden shrink-0">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeCYhd7I4h-n4OM1vRaUr-klBuiAWPt303dcypGEeiQkgQNi6_Xv0cYw0ZcpS5QT1zScqAD19e49mMXCzODp8ERcB3QOqfywWILT7TYZJolsC869cHiXOyNTmb1gsvcnGb5tGdcFiERAxHzA71PQNa6Xlwijgtn2Yb7ah8-2Dfbe9FZGTW_GBJ9VpW1oc567uw1kDm43JPK2-f3VFcc4SQQ9gTZwb3Cuxi07FbV2Wtxsy1ylB0bZdaFg" alt="Heritage Wool Throw" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-label-md text-xs font-bold text-forest-green">Heritage Wool Throw</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Forest Weave &bull; Qty: 1</p>
                      <span className="text-xs font-bold text-on-surface block mt-1">£220.00</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-on-surface">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-800">{shippingCost === 0 ? 'Free' : `£${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (Included)</span>
                <span className="font-semibold text-on-surface">£{(subtotal * 0.2).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t border-outline-variant/20">
              <span className="font-headline-md text-base text-forest-green font-bold">Total</span>
              <span className="font-display-lg text-2xl text-forest-green font-bold">£{total.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => navigate('/order-summary')}
              className="w-full bg-forest-green text-white py-4 font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-bold shadow"
            >
              Continue to Payment
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant/70">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              <span>Secure Encrypted Transaction</span>
            </div>
          </div>

          {/* Promo Code Box */}
          <div className="p-6 bg-white rounded-xl border border-outline-variant/30">
            <label className="block font-label-sm text-xs text-on-surface-variant mb-2 font-semibold">
              Have a gift card or promo code?
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-forest-green font-mono" 
                placeholder="ENTER CODE" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button 
                onClick={() => { if (promoCode) alert(`Promo code ${promoCode} applied!`); }}
                className="px-4 py-2 border border-forest-green text-forest-green rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-forest-green hover:text-white transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </aside>

      </div>

    </main>
  );
};

export default ShippingDetails;
