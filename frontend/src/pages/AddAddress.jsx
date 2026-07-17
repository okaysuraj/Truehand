import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const AddAddress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ label: 'Home', streetAddress: '', city: '', state: '', postalCode: '', country: 'USA', isDefault: false });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await api.post(`/addresses/user/${user.id}`, form);
      navigate('/addresses');
    } catch (err) {
      alert('Failed to add address');
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/addresses" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Addresses
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Add New Address</h1>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">Street Address *</label>
              <input type="text" name="streetAddress" required value={form.streetAddress} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">City *</label>
                <input type="text" name="city" required value={form.city} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">State *</label>
                <input type="text" name="state" required value={form.state} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">ZIP Code *</label>
                <input type="text" name="postalCode" required value={form.postalCode} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">Country *</label>
              <input type="text" name="country" required value={form.country} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" placeholder="USA" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                {['Home', 'Work', 'Other'].map(t => (
                  <button key={t} type="button" onClick={() => setForm({ ...form, label: t })} className={`px-4 py-2 rounded-full font-label-sm transition-colors ${form.label === t ? 'bg-charcoal text-white' : 'bg-surface-variant text-on-surface hover:bg-surface-variant/70'}`}>{t}</button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={handleChange} className="w-5 h-5 accent-forest-green rounded" />
              <span className="font-body-md text-on-surface">Set as default address</span>
            </label>
            <div className="pt-4 flex justify-end gap-3">
              <Link to="/addresses" className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Cancel</Link>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Address'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
