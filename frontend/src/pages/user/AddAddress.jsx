import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const AddAddress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    street: '123 Artisan Way',
    suite: 'Studio 4B',
    city: 'Portland',
    state: 'Oregon',
    zip: '97201',
    country: 'United States',
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
          label: 'Home',
          streetAddress: `${form.street}${form.suite ? `, ${form.suite}` : ''}`,
          city: form.city,
          state: form.state,
          postalCode: form.zip,
          country: form.country,
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
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Context Image & Narrative */}
        <div className="hidden lg:block lg:col-span-5 sticky top-28">
          <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
            <img 
              className="w-full h-full object-cover" 
              alt="Serene Home Interior" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9w2ZPMB6iMY-ZebOR5S0IcbjXMBVxAlJmhScmEnMUYx3j690CrDOclgXUJHVtjxz5Z_VZkAN2EvTXuEVaSfjTAzH7uC-SP1XPu35bSFHNC14Ebdz0UE3H-sNRHgHzOBVCXmp1v76yHCFPwoqbzqWVwP7HgDoEYo4Olj_VM_FfDriEbANUo9WlA_X8biE71C4qS4mTO1uDYjDj2Tw76S3A9Bl8fINgylyLdwgOPa7HaByGBSAaYMdiog" 
            />
          </div>
          <p className="mt-4 text-on-surface-variant italic text-xs md:text-sm leading-relaxed opacity-80">
            "Home is where the heart finds rest. Let us bring the touch of craftsmanship to your doorstep."
          </p>
        </div>

        {/* Right Column: Address Form */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-outline-variant/30">
          <header className="mb-8">
            <h1 className="font-headline-lg text-2xl md:text-3xl text-forest-green font-bold mb-2">
              Where should we deliver?
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Provide your shipping details below for a seamless delivery experience.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            
            {/* Street Address */}
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Street Address
              </label>
              <input 
                type="text" 
                name="street" 
                required 
                value={form.street} 
                onChange={handleChange}
                className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
                placeholder="123 Artisan Way" 
              />
            </div>

            {/* Apt / Suite */}
            <div className="space-y-1.5">
              <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Apartment, Suite, etc. (Optional)
              </label>
              <input 
                type="text" 
                name="suite" 
                value={form.suite} 
                onChange={handleChange}
                className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
                placeholder="Studio 4B" 
              />
            </div>

            {/* City & State */}
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
                  placeholder="Portland" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  State / Province
                </label>
                <input 
                  type="text" 
                  name="state" 
                  required 
                  value={form.state} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
                  placeholder="Oregon" 
                />
              </div>
            </div>

            {/* Zip & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Zip / Postal Code
                </label>
                <input 
                  type="text" 
                  name="zip" 
                  required 
                  value={form.zip} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
                  placeholder="97201" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Country
                </label>
                <select 
                  name="country" 
                  value={form.country} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors cursor-pointer"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>

            {/* Set as Default Address */}
            <div className="flex items-center justify-between py-4 border-y border-outline-variant/30">
              <div>
                <span className="font-body-md text-xs font-bold text-on-surface block">Set as Default Address</span>
                <p className="text-[11px] text-on-surface-variant">Use this for future orders automatically.</p>
              </div>
              <input 
                type="checkbox" 
                name="isDefault" 
                checked={form.isDefault} 
                onChange={handleChange}
                className="w-5 h-5 accent-forest-green rounded cursor-pointer" 
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 py-3.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-bold shadow"
              >
                {loading ? 'Saving Address...' : 'Save Address'}
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

      </div>

    </main>
  );
};

export default AddAddress;
