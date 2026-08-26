import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const SAMPLE_LOCATIONS = [
  {
    id: 'loc_1',
    tag: 'PRIMARY STUDIO',
    title: 'Main Studio & Workshop',
    attn: 'Aesthetic Labs c/o Julian Voss',
    line1: '142 Rue du Faubourg Saint-Honoré',
    cityZipCountry: '75008 Paris, France',
    phone: '+33 1 42 65 32 00',
    pinned: true,
  },
  {
    id: 'loc_2',
    tag: 'HOME',
    title: 'Private Residence',
    attn: 'Julian Voss',
    line1: 'Kaiser-Wilhelm-Straße 85',
    cityZipCountry: '20355 Hamburg, Germany',
    phone: '+49 40 34 56 78',
    pinned: false,
  },
  {
    id: 'loc_3',
    tag: 'GALLERY PARTNER',
    title: "L'Atelier Gallerie",
    attn: 'Attn: Marie Laurent',
    line1: 'Quai Voltaire 17',
    cityZipCountry: '75007 Paris, France',
    phone: '+33 1 45 44 22 11',
    pinned: false,
  },
];

const ManageAddresses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [locations, setLocations] = useState(SAMPLE_LOCATIONS);

  useEffect(() => {
    if (user?.id) {
      api.get(`/addresses/user/${user.id}`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            const mapped = res.data.map((d, i) => ({
              id: d.id,
              tag: d.isDefault ? 'PRIMARY' : 'SAVED',
              title: d.label || `Address ${i+1}`,
              attn: `${user.firstName || ''} ${user.lastName || ''}`,
              line1: d.streetAddress,
              cityZipCountry: `${d.postalCode || ''} ${d.city || ''}, ${d.country || ''}`,
              phone: d.phone || '+1 (555) 000-0000',
              pinned: d.isDefault,
            }));
            setLocations(mapped);
          }
        })
        .catch(e => console.warn(e));
    }
  }, [user]);

  const handleRemove = (id) => {
    setLocations(locations.filter(l => l.id !== id));
  };

  return (
    <main className="flex-grow pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-2 text-xs font-label-sm text-on-surface-variant uppercase tracking-widest font-semibold">
        <Link to="/profile" className="hover:text-forest-green">Account</Link>
        <span>/</span>
        <span className="text-forest-green font-bold">Addresses</span>
      </nav>

      {/* Header & Add CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 pb-6 border-b border-outline-variant/30">
        <div>
          <h1 className="font-display-lg text-3xl md:text-5xl text-forest-green font-bold mb-2">
            Shipping &amp; Studio Locations
          </h1>
          <p className="font-body-md text-on-surface-variant text-xs md:text-sm max-w-xl leading-relaxed">
            Manage your curated shipping destinations and professional studio addresses. Each location is handled with the same care as our artisanal pieces.
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

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {locations.map(loc => (
          <div 
            key={loc.id}
            className="p-6 rounded-xl border border-outline-variant/30 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="font-label-sm text-[10px] text-terracotta uppercase tracking-widest font-bold bg-surface-container px-2 py-0.5 rounded">
                  {loc.tag}
                </span>
                {loc.pinned && (
                  <span className="material-symbols-outlined text-forest-green text-[18px]" title="Primary Location">
                    push_pin
                  </span>
                )}
              </div>

              <h3 className="font-headline-md text-lg text-forest-green font-bold mb-1">{loc.title}</h3>
              <div className="text-xs text-on-surface-variant leading-relaxed space-y-0.5">
                <p className="font-semibold text-charcoal">{loc.attn}</p>
                <p>{loc.line1}</p>
                <p>{loc.cityZipCountry}</p>
                <p className="pt-2 text-on-surface font-mono">{loc.phone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center text-xs font-semibold">
              <button 
                onClick={() => navigate('/add-new-address')}
                className="text-forest-green hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">edit</span> Edit
              </button>
              <button 
                onClick={() => handleRemove(loc.id)}
                className="text-red-700 hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">delete</span> Remove
              </button>
            </div>
          </div>
        ))}

        {/* Add New Location (Dashed Card) */}
        <button 
          onClick={() => navigate('/add-new-address')}
          className="border-2 border-dashed border-outline-variant/60 hover:border-forest-green hover:bg-surface-container-low transition-all duration-300 p-6 rounded-xl flex flex-col items-center justify-center min-h-[240px] gap-2 text-center group"
        >
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-forest-green group-hover:bg-forest-green group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-2xl">add_location_alt</span>
          </div>
          <h4 className="font-headline-md text-base text-forest-green font-bold">Add New Location</h4>
          <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
            Register a new studio or home
          </p>
        </button>
      </div>

      {/* Bento Commitment Section */}
      <section className="bg-white rounded-2xl p-8 md:p-12 border border-outline-variant/30 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-6 rounded-xl overflow-hidden shadow-sm h-64 md:h-80">
          <img 
            className="w-full h-full object-cover" 
            alt="Artisan Studio Packing" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIiYXaMdqAqWyEsL4Wj6MSZ419HSbGDyVNQ7mWDGYxCyOpGJKLIW770hPm6Txl7Cdd5ic0WBEeedHcb8ngYp_Q0qycfR_Kg7TV8Jt0uJEADdL3IKVwsW71qK3kXOVhaKjL__G32ORQxBA5D3JhTVqZ5VTgJiWyecuoBjqVzKxUKe_cE995gb1RNbIljB2uJl4_a5oOShBzNPBo5TP0sT9zVdppVrIfcchuWypzae0dtT_ewTcYsTM7IA" 
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="font-label-sm text-xs text-terracotta uppercase tracking-widest font-bold block">
            Our Commitment
          </span>
          <h2 className="font-display-lg text-2xl md:text-3xl text-forest-green font-bold leading-snug">
            Ensuring Seamless Delivery of Your Collection
          </h2>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            We understand that the journey of a handcrafted object is as important as its creation. Our white-glove shipping partners are briefed on the specific handling requirements of every material in your portfolio.
          </p>

          <div className="space-y-3 text-xs font-semibold text-charcoal">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-forest-green text-[18px]">verified</span>
              <span>Climate-controlled storage for ceramics and wood</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-forest-green text-[18px]">verified</span>
              <span>Insurance coverage for all artisanal logistics</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-forest-green text-[18px]">verified</span>
              <span>Customized crating for sculptural works</span>
            </div>
          </div>
        </div>

      </section>

    </main>
  );
};

export default ManageAddresses;
