import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const RETURNABLE_ITEMS = [
  {
    id: 'item_1',
    name: 'Obsidian Earth Vase',
    details: 'Hand-thrown Ceramic • Midnight Black',
    price: 245.00,
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Hn6pbs0x1d42fVQX8eBE4UcAefe8_7hOV57QENJUWYVL3g0166wXlnIbvYvF8FgZvPK0q7r_p6tzugVv5gJ_lgQcDW7-T3a85Sroj77NIFTJI0tiLEeQcy1MvPL5AHRSYC8XP-Y_Aov6Z5tiKG9uQMi5cIUCgBP1WZZyT2PfqvI3X_IvztlRh2sAiarMgwrcyhhCHUfbcN4Vicj_kHLjTULdPQJpg9JASuHaf3nAEEyeSu9hPCNTXw',
  },
  {
    id: 'item_2',
    name: 'Kyoto Oak Stool',
    details: 'Solid Oak • Natural Matte',
    price: 680.00,
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBNbckeOr6XwMGZnm7Wizo7ZPPhW_U4W9ww4M1qAPiQXcyuxMGJtiONdbcdnYl1XYuBFDZkivf6yukZ4Fal9O8mopJdtY1WTpVbpsVpztxS_5sBxR7hNwKsSSGtEt0bDFKpl2sxNC7XDN0e-k6ULL6grhWcIphJKTM8EEjE0-xI4Uu1C6_IdxlMBE24NX-Uggrg_5GJhmQrtHHmQs_uJTd6b2BYo4igsQq3cO_GTjkYQ6e7lLehUGIkA',
  },
];

const ReturnRequest = () => {
  const { orderId } = useParams();
  const activeOrderId = orderId || 'AH-982104';
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState(new Set(['item_1']));
  const [reason, setReason] = useState('damaged');
  const [comments, setComments] = useState('');
  const [returnMethod, setReturnMethod] = useState('dropoff');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const toggleItem = (id) => {
    const next = new Set(selectedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedItems(next);
  };

  const estimatedRefund = RETURNABLE_ITEMS
    .filter(i => selectedItems.has(i.id))
    .reduce((sum, i) => sum + i.price, 0);

  const returnShippingCost = returnMethod === 'pickup' ? 15.00 : 0.00;
  const netTotal = Math.max(0, estimatedRefund - returnShippingCost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItems.size === 0) return;
    setSubmitting(true);
    try {
      if (orderId) {
        await api.post(`/orders/${orderId}/returns`, {
          reason,
          comments,
          returnMethod,
          items: Array.from(selectedItems),
        });
      }
      navigate(`/refund-status/${activeOrderId}`);
    } catch (err) {
      console.warn(err);
      navigate(`/refund-status/${activeOrderId}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Header & Breadcrumb */}
      <header className="mb-10">
        <nav className="flex items-center gap-2 text-xs font-label-sm text-on-surface-variant mb-3">
          <Link to="/profile" className="hover:text-forest-green">Account</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/orders" className="hover:text-forest-green">Orders</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-forest-green font-bold">Return Request</span>
        </nav>
        <h1 className="font-headline-lg text-2xl md:text-4xl text-forest-green font-bold mb-2">Initiate a Return</h1>
        <p className="text-on-surface-variant text-xs md:text-sm max-w-2xl leading-relaxed">
          Order #{activeOrderId} &mdash; Placed on October 12, 2023. Please select the items you wish to return and follow the steps below.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Item Selection */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-end mb-6">
              <h2 className="font-headline-md text-lg text-forest-green font-bold">1. Select Items</h2>
              <span className="font-label-sm text-xs text-on-surface-variant">3 items in order</span>
            </div>

            <div className="space-y-4">
              {RETURNABLE_ITEMS.map((item) => {
                const isChecked = selectedItems.has(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      isChecked 
                        ? 'border-2 border-forest-green bg-surface-container-low/30 shadow-sm' 
                        : 'border-outline-variant/30 hover:border-outline-variant'
                    }`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-5 h-5 accent-forest-green rounded cursor-pointer"
                      />
                    </div>
                    <div className="w-20 h-24 bg-surface-container rounded-lg overflow-hidden shrink-0">
                      <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-label-md text-xs sm:text-sm font-bold text-forest-green uppercase tracking-wide">{item.name}</h3>
                        <p className="font-label-sm text-xs text-on-surface-variant mt-0.5">{item.details}</p>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-label-sm text-xs text-on-surface-variant">Qty: {item.qty}</span>
                        <span className="font-headline-md text-sm sm:text-base font-bold text-forest-green">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 2: Return Details */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
            <h2 className="font-headline-md text-lg text-forest-green font-bold">2. Return Details</h2>
            
            <div className="space-y-2">
              <label className="block font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                Reason for Return
              </label>
              <select 
                value={reason} 
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-3 text-xs focus:outline-none focus:border-forest-green cursor-pointer font-medium"
              >
                <option value="damaged">Item arrived damaged</option>
                <option value="not-as-described">Not as described/pictured</option>
                <option value="quality">Quality not as expected</option>
                <option value="wrong-item">Received wrong item</option>
                <option value="changed-mind">Changed my mind</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                Additional Comments (Optional)
              </label>
              <textarea 
                rows="4" 
                value={comments} 
                onChange={(e) => setComments(e.target.value)}
                placeholder="Please provide any extra details regarding your return..."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg p-3 text-xs focus:outline-none focus:border-forest-green resize-none"
              />
            </div>
          </section>

          {/* Section 3: Return Method */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
            <h2 className="font-headline-md text-lg text-forest-green font-bold mb-6">3. Return Method</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Pre-paid Drop-off */}
              <div 
                onClick={() => setReturnMethod('dropoff')}
                className={`p-6 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  returnMethod === 'dropoff' 
                    ? 'border-2 border-forest-green bg-surface-container-low/30 shadow-sm' 
                    : 'border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-forest-green text-3xl">local_shipping</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    returnMethod === 'dropoff' ? 'border-forest-green' : 'border-outline-variant'
                  }`}>
                    {returnMethod === 'dropoff' && <div className="w-2.5 h-2.5 rounded-full bg-forest-green"></div>}
                  </div>
                </div>
                <div>
                  <h4 className="font-label-md text-xs uppercase tracking-wider font-bold text-forest-green mb-1">Pre-paid Drop-off</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    Print a label and drop off at any authorized carrier location.
                  </p>
                </div>
                <span className="font-label-md text-xs font-bold text-forest-green">Free</span>
              </div>

              {/* Home Pickup */}
              <div 
                onClick={() => setReturnMethod('pickup')}
                className={`p-6 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  returnMethod === 'pickup' 
                    ? 'border-2 border-forest-green bg-surface-container-low/30 shadow-sm' 
                    : 'border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-forest-green text-3xl">home</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    returnMethod === 'pickup' ? 'border-forest-green' : 'border-outline-variant'
                  }`}>
                    {returnMethod === 'pickup' && <div className="w-2.5 h-2.5 rounded-full bg-forest-green"></div>}
                  </div>
                </div>
                <div>
                  <h4 className="font-label-md text-xs uppercase tracking-wider font-bold text-forest-green mb-1">Home Pickup</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    A courier will collect the package from your doorstep at a scheduled time.
                  </p>
                </div>
                <span className="font-label-md text-xs font-bold text-forest-green">$15.00</span>
              </div>

            </div>
          </section>

        </div>

        {/* Right Column: Request Summary & Our Promise */}
        <aside className="lg:col-span-4 sticky top-28 space-y-6">
          
          {/* Summary Box */}
          <div className="bg-[#163428] text-white p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
            <h2 className="font-headline-md text-lg text-white font-bold pb-3 border-b border-white/20">
              Request Summary
            </h2>

            <div className="space-y-3 text-xs text-white/80">
              <div className="flex justify-between">
                <span>Estimated Refund</span>
                <span className="font-semibold text-white">${estimatedRefund.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Return Shipping</span>
                <span className="font-semibold text-emerald-300">{returnShippingCost === 0 ? 'Free' : `$${returnShippingCost.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-headline-md text-base text-white font-bold">NET TOTAL</span>
                <span className="font-display-lg text-2xl text-white font-bold">${netTotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-white/70 italic leading-relaxed">
                Refunds are processed back to the original payment method within 5-7 business days of receiving and inspecting your items at our workshop.
              </p>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={selectedItems.size === 0 || submitting}
              className={`w-full py-4 rounded-lg font-label-md text-xs uppercase tracking-widest font-bold transition-all shadow ${
                selectedItems.size === 0 
                  ? 'bg-white/20 text-white/40 cursor-not-allowed' 
                  : 'bg-[#ff9975] text-charcoal hover:bg-[#ffb59c]'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Return Request'}
            </button>

            <div className="text-center">
              <Link to={`/order/${activeOrderId}`} className="text-xs text-white/80 hover:text-white underline">
                Cancel &amp; Return to Order
              </Link>
            </div>
          </div>

          {/* Our Promise Box */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex items-start gap-3 text-xs">
            <span className="material-symbols-outlined text-forest-green text-2xl shrink-0">verified_user</span>
            <div>
              <p className="font-label-sm uppercase font-bold text-forest-green mb-1 tracking-wider">Our Promise</p>
              <p className="text-on-surface-variant leading-relaxed">
                Every return is handled by our artisans to ensure materials can be sustainably repurposed or refurbished.
              </p>
            </div>
          </div>

        </aside>

      </div>

    </main>
  );
};

export default ReturnRequest;
