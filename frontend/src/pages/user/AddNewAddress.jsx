import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const AddNewAddress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Julian Vane',
    line1: '',
    line2: '',
    city: 'London',
    zip: 'SW1A 1AA',
    region: 'Greater London',
    isDefault: true,
  });

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user?.id) {
        await api.post(`/addresses/user/${user.id}`, {
          label: 'Primary',
          streetAddress: `${form.line1}${form.line2 ? `, ${form.line2}` : ''}`,
          city: form.city,
          state: form.region,
          postalCode: form.zip,
          country: 'United Kingdom',
          isDefault: form.isDefault,
        });
      }
      navigate(-1);
    } catch (err) {
      console.warn(err);
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-4 text-xs font-label-sm text-on-surface-variant uppercase tracking-widest font-semibold max-w-2xl mx-auto">
        <Link to="/profile" className="hover:text-forest-green">Account</Link>
        <span>&gt;</span>
        <Link to="/manage-addresses" className="hover:text-forest-green">Addresses</Link>
        <span>&gt;</span>
        <span className="text-forest-green font-bold">New Address</span>
      </nav>

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="font-display-lg text-3xl md:text-5xl text-forest-green font-bold mb-2">Delivery Details</h1>
        <p className="font-body-md text-on-surface-variant text-xs md:text-sm leading-relaxed">
          Please provide your shipping information below. We use this to calculate delivery times and local taxes accurately.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-outline-variant/30 mb-12">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Full Name
            </label>
            <input 
              type="text" 
              name="fullName" 
              required 
              value={form.fullName} 
              onChange={handleChange}
              className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
              placeholder="e.g. Julian Vane" 
            />
          </div>

          {/* Address Line 1 */}
          <div className="space-y-1.5">
            <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Address Line 1
            </label>
            <input 
              type="text" 
              name="line1" 
              required 
              value={form.line1} 
              onChange={handleChange}
              className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
              placeholder="Street name and house number" 
            />
          </div>

          {/* Address Line 2 */}
          <div className="space-y-1.5">
            <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Address Line 2 (Optional)
            </label>
            <input 
              type="text" 
              name="line2" 
              value={form.line2} 
              onChange={handleChange}
              className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
              placeholder="Apartment, suite, unit, etc." 
            />
          </div>

          {/* City & Zip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                City
              </label>
              <input 
                type="text" 
                name="city" 
                required 
                value={form.city} 
                onChange={handleChange}
                className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
                placeholder="e.g. London" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Zip Code
              </label>
              <input 
                type="text" 
                name="zip" 
                required 
                value={form.zip} 
                onChange={handleChange}
                className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors font-mono" 
                placeholder="e.g. SW1A 1AA" 
              />
            </div>
          </div>

          {/* State / Province / Region */}
          <div className="space-y-1.5">
            <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              State / Province / Region
            </label>
            <select 
              name="region" 
              value={form.region} 
              onChange={handleChange}
              className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors cursor-pointer"
            >
              <option value="Greater London">Greater London</option>
              <option value="California">California</option>
              <option value="New York">New York</option>
              <option value="Oregon">Oregon</option>
              <option value="Île-de-France">Île-de-France</option>
              <option value="Bavaria">Bavaria</option>
            </select>
          </div>

          {/* Default Checkbox */}
          <div className="flex items-center gap-2.5 pt-2">
            <input 
              type="checkbox" 
              id="setDefault"
              name="isDefault" 
              checked={form.isDefault} 
              onChange={handleChange}
              className="w-4 h-4 accent-forest-green rounded cursor-pointer" 
            />
            <label htmlFor="setDefault" className="text-xs text-on-surface cursor-pointer select-none font-medium">
              Set as my default shipping address
            </label>
          </div>

          {/* CTAs */}
          <div className="pt-4 flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 py-3.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-bold shadow"
            >
              {loading ? 'Saving...' : 'Save & Continue'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="px-8 py-3.5 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-widest rounded-lg hover:bg-surface-container transition-all font-semibold"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>

      {/* Trust Cards Grid */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div>
            <span className="material-symbols-outlined text-forest-green text-2xl mb-2 block">local_shipping</span>
            <h3 className="font-headline-md text-base text-forest-green font-bold mb-1">Global Delivery</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              We ship to over 50 countries using carbon-neutral logistics partners. Expect delivery within 5-7 business days for most regions.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div>
            <span className="material-symbols-outlined text-forest-green text-2xl mb-2 block">lock</span>
            <h3 className="font-headline-md text-base text-forest-green font-bold mb-1">Secure Privacy</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Your personal data is encrypted and stored according to strict GDPR guidelines. We never share your address with third-party marketers.
            </p>
          </div>
        </div>

      </div>

    </main>
  );
};

export default AddNewAddress;
