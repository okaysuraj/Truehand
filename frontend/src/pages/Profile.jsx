import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({ label: '', streetAddress: '', city: '', state: '', postalCode: '', country: 'India', isDefault: false });

  useEffect(() => {
    if (user) fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const res = await api.get(`/addresses/user/${user.id}`);
      setAddresses(res.data);
    } catch (e) {
      console.error('Failed to fetch addresses', e);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/addresses/user/${user.id}`, addressForm);
      setShowAddressForm(false);
      setAddressForm({ label: '', streetAddress: '', city: '', state: '', postalCode: '', country: 'India', isDefault: false });
      fetchAddresses();
    } catch (e) {
      alert('Failed to add address');
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await api.delete(`/addresses/${id}/user/${user.id}`);
      fetchAddresses();
    } catch (e) {
      alert('Failed to delete address');
    }
  };

  if (!user) return null;

  return (
    <main className="pt-32 pb-section-gap">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Profile Hero Section */}
        <section className="flex flex-col items-center text-center mb-section-gap">
          <div className="relative group mb-stack-lg">
            <div className="w-40 h-40 rounded-full overflow-hidden border border-outline-variant/30 shadow-sm shadow-forest-green/5">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Profile Avatar" 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}&backgroundColor=163428&textColor=ffffff`}
              />
            </div>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm">{user.firstName} {user.lastName}</h1>
          <p className="font-label-md text-label-md text-secondary uppercase tracking-[0.2em] mb-stack-md">Customer Account</p>
          <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Welcome to your personal TrueHand concierge. Manage your profile, track your artisanal acquisitions, and organize your shipping details.
          </p>
        </section>

        {/* Dashboard Navigation Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-section-gap">
          
          {/* Personal Info */}
          <div className="group bg-surface-container-lowest border border-outline-variant/20 p-stack-lg rounded-[4px] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between h-64">
            <div>
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center mb-stack-lg group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-forest-green">person_outline</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Personal Info</h3>
              <div className="font-body-md text-on-surface-variant text-[14px]">
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            </div>
          </div>

          {/* My Orders */}
          <Link to="/orders" className="group bg-surface-container-lowest border border-outline-variant/20 p-stack-lg rounded-[4px] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between h-64 cursor-pointer">
            <div>
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center mb-stack-lg group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-forest-green">package_2</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">My Orders</h3>
              <p className="font-body-md text-on-surface-variant">Track shipments, view detailed history, and manage your recent acquisitions.</p>
            </div>
            <div className="flex items-center gap-2 font-label-md text-forest-green">
              View History <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </Link>

          {/* Addresses */}
          <div 
            onClick={() => document.getElementById('addresses').scrollIntoView({ behavior: 'smooth' })}
            className="group bg-surface-container-lowest border border-outline-variant/20 p-stack-lg rounded-[4px] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col justify-between h-64 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center mb-stack-lg group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-forest-green">location_on</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Your Addresses</h3>
              <p className="font-body-md text-on-surface-variant">Manage shipping and billing addresses for faster checkout.</p>
            </div>
            <div className="flex items-center gap-2 font-label-md text-forest-green">
              Manage Addresses <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>

        </section>

        {/* Addresses Section */}
        <section id="addresses" className="pt-stack-lg border-t border-outline-variant/20">
          <div className="flex justify-between items-center mb-stack-lg">
            <h2 className="font-display-lg text-display-lg text-on-surface text-[36px]">Your Addresses</h2>
            <button 
              onClick={() => setShowAddressForm(true)}
              className="px-6 py-2 bg-forest-green text-white font-label-md rounded-sm hover:bg-forest-green/90 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add</span> Add Address
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {addresses.map(addr => (
              <div key={addr.id} className="relative bg-white border border-outline-variant/30 p-stack-lg rounded-sm shadow-sm flex flex-col justify-between">
                {addr.isDefault && (
                  <div className="absolute top-4 right-4 bg-primary-fixed text-on-primary-fixed text-[12px] px-2 py-1 rounded-full font-semibold uppercase tracking-widest">
                    Default
                  </div>
                )}
                <div>
                  <h4 className="font-headline-md text-forest-green mb-4 pb-2 border-b border-outline-variant/20">{addr.label}</h4>
                  <p className="font-body-md font-semibold text-on-surface">{user.firstName} {user.lastName}</p>
                  <p className="font-body-md text-on-surface-variant mt-2">{addr.streetAddress}</p>
                  <p className="font-body-md text-on-surface-variant">{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p className="font-body-md text-on-surface-variant">{addr.country}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-outline-variant/20 flex justify-end">
                  <button 
                    onClick={() => handleDeleteAddress(addr.id)} 
                    className="text-error-red hover:text-error-red/80 font-label-md transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span> Remove
                  </button>
                </div>
              </div>
            ))}
            
            {addresses.length === 0 && (
              <div className="col-span-full text-center py-12 border-2 border-dashed border-outline-variant/50 rounded-sm">
                <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">location_off</span>
                <p className="font-body-md text-on-surface-variant">You have no addresses saved yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Address Form Modal */}
        {showAddressForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-linen w-full max-w-lg rounded-sm p-8 shadow-xl relative animate-in fade-in zoom-in-95">
              <button 
                onClick={() => setShowAddressForm(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <h2 className="font-display-lg text-forest-green text-[32px] mb-6">Add Address</h2>
              
              <form onSubmit={handleAddAddress} className="space-y-4">
                <div>
                  <label className="block font-label-md text-on-surface mb-1 uppercase tracking-widest">Label (e.g. Home)</label>
                  <input 
                    required 
                    value={addressForm.label} 
                    onChange={e=>setAddressForm({...addressForm, label: e.target.value})} 
                    className="w-full bg-white border border-outline-variant/50 rounded-sm px-4 py-2 font-body-md focus:outline-none focus:border-forest-green" 
                  />
                </div>
                
                <div>
                  <label className="block font-label-md text-on-surface mb-1 uppercase tracking-widest">Street Address</label>
                  <input 
                    required 
                    value={addressForm.streetAddress} 
                    onChange={e=>setAddressForm({...addressForm, streetAddress: e.target.value})} 
                    className="w-full bg-white border border-outline-variant/50 rounded-sm px-4 py-2 font-body-md focus:outline-none focus:border-forest-green" 
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block font-label-md text-on-surface mb-1 uppercase tracking-widest">City</label>
                    <input 
                      required 
                      value={addressForm.city} 
                      onChange={e=>setAddressForm({...addressForm, city: e.target.value})} 
                      className="w-full bg-white border border-outline-variant/50 rounded-sm px-4 py-2 font-body-md focus:outline-none focus:border-forest-green" 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-label-md text-on-surface mb-1 uppercase tracking-widest">State</label>
                    <input 
                      required 
                      value={addressForm.state} 
                      onChange={e=>setAddressForm({...addressForm, state: e.target.value})} 
                      className="w-full bg-white border border-outline-variant/50 rounded-sm px-4 py-2 font-body-md focus:outline-none focus:border-forest-green" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-label-md text-on-surface mb-1 uppercase tracking-widest">ZIP / Postal Code</label>
                  <input 
                    required 
                    value={addressForm.postalCode} 
                    onChange={e=>setAddressForm({...addressForm, postalCode: e.target.value})} 
                    className="w-full bg-white border border-outline-variant/50 rounded-sm px-4 py-2 font-body-md focus:outline-none focus:border-forest-green" 
                  />
                </div>
                
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={addressForm.isDefault} 
                      onChange={e=>setAddressForm({...addressForm, isDefault: e.target.checked})} 
                      className="w-5 h-5 text-forest-green border-outline-variant/50 rounded-sm focus:ring-forest-green cursor-pointer"
                    />
                    <span className="font-label-md text-on-surface group-hover:text-forest-green transition-colors">Make this my default address</span>
                  </label>
                </div>
                
                <div className="flex gap-4 pt-4 mt-4 border-t border-outline-variant/20">
                  <button 
                    type="submit" 
                    className="flex-1 bg-forest-green text-white font-label-md uppercase tracking-widest py-3 rounded-sm hover:bg-forest-green/90 transition-colors"
                  >
                    Save Address
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowAddressForm(false)} 
                    className="flex-1 border border-forest-green text-forest-green font-label-md uppercase tracking-widest py-3 rounded-sm hover:bg-forest-green/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default Profile;
