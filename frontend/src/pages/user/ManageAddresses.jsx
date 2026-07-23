import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const ManageAddresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = () => {
    if (!user) return;
    setLoading(true);
    api.get(`/addresses/user/${user.id}`)
      .then(res => setAddresses(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this address?')) {
      api.delete(`/addresses/${id}/user/${user.id}`)
        .then(() => fetchAddresses())
        .catch(err => alert('Failed to delete address'));
    }
  };

  const setAsDefault = (addr) => {
    api.put(`/addresses/${addr.id}/user/${user.id}`, { ...addr, isDefault: true })
      .then(() => fetchAddresses())
      .catch(err => alert('Failed to update address'));
  };

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/profile" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Profile
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">My Addresses</h1>
              <p className="font-body-md text-on-surface-variant">{addresses.length} saved addresses</p>
            </div>
            <Link to="/add-address" className="px-5 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>Add Address
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="w-full flex justify-center py-10">
              <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
            </div>
          ) : addresses.length === 0 ? (
            <p className="font-body-md text-on-surface-variant py-4">No addresses saved yet.</p>
          ) : (
            addresses.map(addr => (
              <div key={addr.id} className={`bg-surface-container-lowest border rounded-lg p-6 shadow-sm ${addr.isDefault ? 'border-forest-green' : 'border-outline-variant/30'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-on-surface">{addr.label || 'Home'}</span>
                    {addr.isDefault && <span className="bg-forest-green/10 text-forest-green font-label-sm px-2 py-0.5 rounded">Default</span>}
                  </div>
                  <div className="flex gap-2">
                    <button className="text-on-surface-variant hover:text-forest-green transition-colors p-1"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                    <button onClick={() => handleDelete(addr.id)} className="text-on-surface-variant hover:text-red-600 transition-colors p-1"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                  </div>
                </div>
                <div className="font-body-md text-on-surface-variant leading-relaxed">
                  <p className="text-on-surface font-label-md mb-1">{user?.firstName} {user?.lastName}</p>
                  <p>{addr.streetAddress}</p>
                  <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p>{addr.country}</p>
                </div>
                {!addr.isDefault && (
                  <button onClick={() => setAsDefault(addr)} className="mt-4 text-forest-green font-label-sm hover:underline">Set as Default</button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAddresses;
