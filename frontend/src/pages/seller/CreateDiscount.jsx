import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateDiscount = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: 'Spring Revival 2024',
    type: 'percentage',
    value: '15',
    minPurchase: '50.00',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Discount offer "${form.name}" created successfully!`);
    navigate('/manage-coupons');
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-forest-green">Studio Manager</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Handcrafted Excellence</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/seller/inventory" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-outline-variant/20">
          <div className="flex items-center gap-3 px-3 py-2 bg-surface-container-low rounded-xl">
            <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold text-forest-green">
              AS
            </div>
            <div>
              <p className="font-label-md text-xs font-bold text-charcoal">Artisan Studio</p>
              <p className="text-[10px] text-on-surface-variant">Profile Settings</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 p-6 md:p-12 max-w-4xl">
        
        {/* Back Link */}
        <Link 
          to="/manage-coupons" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-forest-green transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Discounts
        </Link>

        <div className="mb-10 space-y-2">
          <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal">
            Create New Discount
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Set up a promotional offer for your handcrafted products. Discounts are applied at checkout and can be limited by duration or purchase value.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 text-xs">
          
          {/* Section 1: Offer Details */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
            <h3 className="font-headline-md text-base font-bold text-charcoal">Offer Details</h3>

            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                Discount Name
              </label>
              <input 
                type="text" 
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., Spring Revival 2024"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green"
              />
              <p className="text-[10px] text-on-surface-variant">Customers will see this name in their cart and checkout.</p>
            </div>

            <div className="space-y-3">
              <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                Discount Type
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-charcoal">
                  <input 
                    type="radio" 
                    name="type" 
                    value="percentage" 
                    checked={form.type === 'percentage'} 
                    onChange={handleChange}
                    className="accent-forest-green"
                  />
                  <span>Percentage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-charcoal">
                  <input 
                    type="radio" 
                    name="type" 
                    value="fixed" 
                    checked={form.type === 'fixed'} 
                    onChange={handleChange}
                    className="accent-forest-green"
                  />
                  <span>Fixed Amount</span>
                </label>
              </div>
            </div>

            <div className="space-y-1.5 max-w-xs">
              <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                Discount Value
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">
                  {form.type === 'percentage' ? '%' : '$'}
                </span>
                <input 
                  type="number" 
                  name="value"
                  required
                  value={form.value}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl pl-8 p-3 text-xs font-mono font-bold focus:outline-none focus:border-forest-green"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Requirements */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
            <h3 className="font-headline-md text-base font-bold text-charcoal">Requirements</h3>

            <div className="space-y-1.5 max-w-xs">
              <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                Minimum Purchase Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">$</span>
                <input 
                  type="text" 
                  name="minPurchase"
                  value={form.minPurchase}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl pl-8 p-3 text-xs font-mono focus:outline-none focus:border-forest-green"
                />
              </div>
              <p className="text-[10px] text-on-surface-variant">Optional. Leave as 0 for no minimum requirement.</p>
            </div>
          </div>

          {/* Section 3: Duration */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-md text-base font-bold text-charcoal">Duration</h3>
              <span className="material-symbols-outlined text-on-surface-variant text-base">calendar_today</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                  Start Date
                </label>
                <input 
                  type="date" 
                  name="startDate"
                  required
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-forest-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                  End Date
                </label>
                <input 
                  type="date" 
                  name="endDate"
                  required
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-forest-green"
                />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => navigate('/manage-coupons')}
              className="px-8 py-3.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-10 py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
            >
              Create Offer
            </button>
          </div>

        </form>

      </main>

    </div>
  );
};

export default CreateDiscount;
