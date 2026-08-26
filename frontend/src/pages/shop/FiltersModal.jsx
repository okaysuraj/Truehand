import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const MOCK_MATERIALS = [
  {
    id: 1,
    name: 'Komorebi Vessel',
    price: 120.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzZ475ImN91Kq-3eXaFzk0hxqWxVqzjkwAP47AoaAiit8rHhf_KqZl7ZXYO3KM7VgwslgkbMRY3GOXL3iDy4wu2TXONdKDTMtvshSa0EBTlnVKpLcV2ONz7qMxv3XchZp_gaMs72l-Ho0GB7MFdOGb9Kn4PehkduNZPqJEyHU7WMUd5ahtBhP0KnVB4_NVMv4QS81gBNqObiG8_mIgGWmKUqJMikvSrYxJ9kNixLsF0eFG6xnul1W0KA',
  },
  {
    id: 2,
    name: 'Obsidian Tray',
    price: 245.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3k4XfZf-zvxUypi4txPrvM_DEVSHH8ZPxBNhR6aIIYTHj1-RG3ctvohz0VGHOzeqcUqhq8uE5NjeEcL7Fnkz9j5A89rw_Fa3mXAUwiB57lbCODwkuKf2JVXYNg0x8xyO0TwvB3MPyHktRiyd7ont80hd9xOJh9R89FS2xvMGWbAwwuDyprELXvlOA6XBIO5G5O64tata2aSyPHn7rCNfSKo9305Mb1eTS0auR-qt0rWX--B0eqfMEKQ',
  },
  {
    id: 3,
    name: 'Tidal Weave',
    price: 380.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb34aSpRpZHx_5-M9gtWQm07_TStIWNq0IyCRxUK4gIbhfgmBOahNcDGxgB7rNtjEA2BsTW3by2X4GTGG5L6rIQm5ImI414hjiCuFZE-9h4bdxYHaBVrQt3g-tWvOj2x0GLy_Wgoemn0KPUxF5BOVoUH8BXoa0q9bFXwmr_nVLrKbO2OZIXF3s7QdAVLjjl_rgI5GsA2SKp7PXxrkH-ZmxYzgCE_YSru4XGNelqNQg-p_a3n3w7ADGZw',
  },
];

const FiltersModal = ({ onClose, onApply }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedMaterials, setSelectedMaterials] = useState(['Wood']);
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(800);
  const [selectedOrigins, setSelectedOrigins] = useState(['Kyoto, Japan']);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const toggleMaterial = (mat) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const toggleOrigin = (orig) => {
    setSelectedOrigins(prev => 
      prev.includes(orig) ? prev.filter(o => o !== orig) : [...prev, orig]
    );
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
    else navigate(-1);
  };

  const handleApply = () => {
    if (onApply) {
      onApply({ materials: selectedMaterials, minPrice, maxPrice, origins: selectedOrigins });
    }
    navigate('/search?q=Curated%20Materials');
  };

  return (
    <div className="relative min-h-screen bg-surface font-body-md text-on-surface">
      
      {/* Background Content Canvas */}
      <main className="pt-28 min-h-screen px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-display-lg text-headline-lg md:text-display-lg text-forest-green mb-2">Artisanal Materials</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Curated collections of objects crafted from the earth's finest raw elements.
            </p>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 border border-charcoal hover:bg-charcoal hover:text-white transition-all rounded font-semibold text-xs uppercase tracking-wider"
          >
            <span>Filter &amp; Sort</span>
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter opacity-40 select-none">
          {MOCK_MATERIALS.map(item => (
            <div key={item.id} className="group">
              <div className="aspect-[4/5] bg-surface-container mb-3 overflow-hidden rounded-lg">
                <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
              </div>
              <div className="text-center">
                <h3 className="font-body-md text-body-md text-on-surface font-medium">{item.name}</h3>
                <p className="font-label-md text-sm text-on-surface-variant mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Slide-over Filter Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-forest-green/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleClose}
          />

          {/* Filter Panel */}
          <aside className="relative z-10 h-full w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="px-6 md:px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Refine Selection</h2>
              <button 
                onClick={handleClose}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-8">
              
              {/* Material Selection */}
              <section>
                <h3 className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-semibold">Material Selection</h3>
                <div className="flex flex-wrap gap-2">
                  {['Ceramic', 'Wood', 'Textile', 'Glass', 'Metal'].map(mat => (
                    <button
                      key={mat}
                      onClick={() => toggleMaterial(mat)}
                      className={`px-5 py-2 rounded-full font-label-sm text-xs font-semibold transition-colors ${
                        selectedMaterials.includes(mat)
                          ? 'bg-forest-green text-white shadow-sm'
                          : 'bg-surface-container-high text-on-surface hover:bg-forest-green hover:text-white'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </section>

              {/* Price Range */}
              <section>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Price Range</h3>
                  <span className="font-label-md text-xs text-forest-green font-bold">${minPrice} — ${maxPrice}+</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="1500" 
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-forest-green cursor-pointer"
                />
              </section>

              {/* Artisan Origin */}
              <section>
                <h3 className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-semibold">Artisan Origin</h3>
                <div className="space-y-2">
                  {['Kyoto, Japan', 'Mediterranean', 'Nordic Scandinavia', 'Oaxaca, Mexico'].map(origin => (
                    <label key={origin} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={selectedOrigins.includes(origin)}
                        onChange={() => toggleOrigin(origin)}
                        className="w-4 h-4 rounded border-outline accent-forest-green"
                      />
                      <span className="font-body-md text-sm text-on-surface-variant group-hover:text-on-surface">
                        {origin}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

            </div>

            {/* Sticky Action Footer */}
            <div className="p-6 border-t border-outline-variant/30 bg-surface-container-low flex gap-4">
              <button 
                onClick={() => { setSelectedMaterials([]); setSelectedOrigins([]); setMaxPrice(800); }}
                className="flex-1 py-3 border border-outline-variant rounded font-label-md text-xs uppercase tracking-wider text-on-surface hover:bg-white transition-colors font-semibold"
              >
                Clear All
              </button>
              <button 
                onClick={handleApply}
                className="flex-1 py-3 bg-forest-green text-white rounded font-label-md text-xs uppercase tracking-wider hover:opacity-90 transition-opacity font-semibold shadow-sm"
              >
                Apply (14 Results)
              </button>
            </div>

          </aside>
        </div>
      )}

    </div>
  );
};

export default FiltersModal;
