import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ADDRESSES = [
  {
    id: 'addr_1',
    tag: 'DEFAULT DELIVERY',
    name: 'Home',
    recipient: 'Eleanor Sterling',
    address: "42 Artisan's Way, Suite 300",
    cityStateZip: 'Portland, OR 97201',
    country: 'United States',
    phone: '+1 (503) 555-0128',
    icon: 'home',
    isDefault: true,
  },
  {
    id: 'addr_2',
    tag: 'WORKPLACE',
    name: 'Studio',
    recipient: 'Sterling Fine Arts',
    address: '882 Industrial Avenue',
    cityStateZip: 'Creative Quarter, OR 97209',
    country: 'United States',
    phone: '+1 (503) 555-9942',
    icon: 'draw',
    isDefault: false,
  },
];

const AddressSelection = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(ADDRESSES);
  const [selectedId, setSelectedId] = useState('addr_1');

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const selectedAddress = addresses.find(a => a.id === selectedId) || addresses[0];

  const handleRemove = (id, e) => {
    e.stopPropagation();
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    if (selectedId === id && updated.length > 0) {
      setSelectedId(updated[0].id);
    }
  };

  return (
    <main className="flex-grow pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-4 text-xs font-label-sm text-on-surface-variant">
        <Link to="/cart" className="hover:text-forest-green">Checkout</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-forest-green font-semibold">Address Selection</span>
      </nav>

      {/* Header & Add CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 pb-6 border-b border-outline-variant/30">
        <div>
          <h1 className="font-display-lg text-3xl md:text-5xl text-forest-green font-bold mb-2">Select Shipping Address</h1>
          <p className="font-body-md text-on-surface-variant text-xs md:text-sm max-w-xl">
            Choose your preferred destination for this order. Each piece is packaged with care and shipped using carbon-neutral logistics.
          </p>
        </div>
        <button 
          onClick={() => navigate('/add-address')}
          className="px-6 py-3 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-semibold flex items-center gap-2 shadow shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add New Address
        </button>
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {addresses.map(addr => {
          const isSelected = selectedId === addr.id;
          return (
            <div 
              key={addr.id}
              onClick={() => setSelectedId(addr.id)}
              className={`p-6 rounded-xl border bg-white cursor-pointer transition-all duration-300 relative flex flex-col justify-between min-h-[260px] ${
                isSelected 
                  ? 'border-2 border-forest-green shadow-md ring-1 ring-forest-green/20' 
                  : 'border-outline-variant/30 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-label-sm text-[10px] text-terracotta uppercase tracking-widest font-bold block mb-1">
                      {addr.tag}
                    </span>
                    <h3 className="font-headline-md text-lg text-forest-green font-bold">{addr.name}</h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-forest-green text-white' : 'bg-surface-container text-charcoal'
                  }`}>
                    <span className="material-symbols-outlined text-[18px]">{addr.icon}</span>
                  </div>
                </div>

                <div className="text-xs text-on-surface-variant leading-relaxed space-y-0.5">
                  <p className="font-bold text-on-surface text-sm">{addr.recipient}</p>
                  <p>{addr.address}</p>
                  <p>{addr.cityStateZip}</p>
                  <p>{addr.country}</p>
                  <p className="pt-2 text-on-surface font-mono">{addr.phone}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center text-xs font-semibold">
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate('/edit-profile'); }}
                  className="text-forest-green hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">edit</span> Edit
                </button>
                <button 
                  onClick={(e) => handleRemove(addr.id, e)}
                  className="text-red-700 hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">delete</span> Remove
                </button>
              </div>
            </div>
          );
        })}

        {/* Dashed Ship to New Location Card */}
        <button 
          onClick={() => navigate('/add-new-address')}
          className="border-2 border-dashed border-outline-variant/60 hover:border-forest-green hover:bg-surface-container-low transition-all duration-300 p-6 rounded-xl flex flex-col items-center justify-center min-h-[260px] gap-3 text-center group"
        >
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-forest-green group-hover:bg-forest-green group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-2xl">add_location_alt</span>
          </div>
          <span className="font-label-md text-xs text-on-surface-variant group-hover:text-forest-green uppercase tracking-wider font-bold">
            Ship to a new location
          </span>
        </button>
      </div>

      {/* Selected Destination Preview & Continue */}
      {selectedAddress && (
        <div className="max-w-xl mx-auto bg-surface-container-high/60 p-6 rounded-xl text-center space-y-4 mb-8">
          <div className="text-xs text-on-surface-variant">
            <span className="font-semibold uppercase tracking-wider text-charcoal">Selected Destination: </span>
            <span className="font-bold text-forest-green">{selectedAddress.name}</span>
            <p className="mt-1 italic text-on-surface-variant/90">{selectedAddress.address}, {selectedAddress.cityStateZip}</p>
          </div>
          <button 
            onClick={() => navigate('/shipping-details')}
            className="px-10 py-3.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-bold shadow"
          >
            Continue to Payment
          </button>
        </div>
      )}

    </main>
  );
};

export default AddressSelection;
