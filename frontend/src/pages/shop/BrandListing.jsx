import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_STUDIOS = [
  {
    id: 1,
    name: 'Aether Ceramics',
    craft: 'Hand-thrown Stoneware',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl2s1XVEiX-T8Z6HGO_TPjMp-oJTRlByE8t2yw6Sezyujsg3gAS0TVamHq-UuQchWi_k6jlsHl_bLCXUZKn5yNA7zeGwJ9yvYXrkl4bFqJ1s_LkpBw-oaz51nswZqMQoNo0eOIbL_63LcIDp8sdtvjDx4lfEMfHB2gLPCxhUn-IyiackcEFRgT0FLD1BIfOehschBjxdMDdlsQdlMxBVQLYn7pyIUW0St5o_hMDct7agW7VQcsFhj0WQ',
  },
  {
    id: 2,
    name: 'Alpen Forge',
    craft: 'Architectural Ironwork',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQIAvXPJVRASQZfddjghS4gUegu5xki1c8XtxFr_CMrFXFUnwBtRvUMxLiv_hcCHXYSxmRtuh07SIFWx8hpWCv-vyyctysSotQuHv0N0B3XhMWNkt1wabE4kgzJwoX9efUNWvmSRKsYL8qbCpVy5b8MdZZRsG1m8aWrWJtsM4dCK3l-j04SIG3TAGl-LbhW6aLHR4_n-L3qsFJYUqe2EVux9a-hoA39Czt4XgIRluYFGRrBWtVxAKRUQ',
  },
  {
    id: 3,
    name: 'Artisan Looms',
    craft: 'Natural Fiber Textiles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDvO9oHKpcArlVFF08rZCpI4zxr23iK4Ocd1VEeR-ThEf7ABS8apSQwP8yAzvLlFFK2CavUnF79l-QMrlhk4BdAWIBFlicwo88_EBliydqmivMLT41KxTKztdVkb4561iiywKySCZrh0JgqNrAYvj0Zt-Y6HQN7yUDv-b_cINMvsAXBbzBKDX2_9MX-EDo8cSWZMQUE2kiYnGuITVXKbJNMelswgYbd5PCW9ZvtjhSOMQJ0DJoh3WyDw',
  },
  {
    id: 4,
    name: 'Bower Woodworking',
    craft: 'Solid Walnut Furniture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASp_xxeHlxv8QFJO22JAa_gjfMe2EyGd-gNIWun7BvnHRvy-t6I9vYl_Ttvu3zTjnQzf_RoPwFN0G0avFPELWBqlhOu_vj1-VSvbt71XEOFVhq55bCGfSWF7IEADlzYaxSYs9e-ow4VTyv7gqwZXOV1wpQm2jq1qGhzeNayI-ritbAmDkeRNkOJRh2MaU_7uCIuEXigZ_m4oAHpXJZ1ulpIjEtyJxUCDT_L70EjE_bfIgkKQ32_g1e7g',
  },
  {
    id: 5,
    name: 'Brass & Bone',
    craft: 'Bespoke Hardware',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2UKQdl-ZZ58kvOOAqdZK5cZQY1K-g73mvqwtahzkRFr34Eie7EJMuHzHWFlhIEoI-BKsbWtch-LishA8R88KFyah8TGqN107Q3YP1142iD4my-YHMaOyX5L2z7FfiN_YG3bfwVsitB4CVLR3sTlRNrVfv83R9Y95Lc7Mou2O10ok_0vu8EHw4RN9ZntgRxhabfLirFsBxIpExEaRQaajYGiqTk7RhZPfmBmGR3o36b3SS6D-Fpg-SWQ',
  },
  {
    id: 6,
    name: 'Earthen Kiln',
    craft: 'Terracotta Apothecary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpUyt_DLeamEVf1oySF-GlLJ1UpYYGh0zCHK41BDvOPpc9jn3nIoOhe79ImOxBFh1cQFcVreKXLPd2PAj4eB_b9RAcXV5ZmlLj_15zv_vdy26OKodAm9IzLMO73D6VDN3-mIXkmpLe-OF3cOsuaCi_yOYAaH9ftd8_a0lVf5QM1wIB8hfaN475wDsdIIls5URUoyun_kySAi-hrSGjPY4T2E_9u8l7hMc2FYmH7qoK0qQpQr4BG8A7CQ',
  },
];

const BrandListing = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [studios, setStudios] = useState(DEFAULT_STUDIOS);

  useEffect(() => {
    api.get('/products?size=20')
      .then(res => {
        const products = res.data?.content || res.data || [];
        const sellerMap = {};
        products.forEach(p => {
          if (p.sellerId && !sellerMap[p.sellerId]) {
            sellerMap[p.sellerId] = {
              id: p.sellerId,
              name: p.sellerName || `Artisan Studio #${p.sellerId}`,
              craft: p.category || 'Handcrafted Goods',
              image: p.imageUrl,
            };
          }
        });
        const dynamic = Object.values(sellerMap);
        if (dynamic.length > 0) {
          // Merge dynamic with defaults
          setStudios([...dynamic, ...DEFAULT_STUDIOS]);
        }
      })
      .catch(e => console.warn(e));
  }, []);

  const filterRanges = ['All', 'A-D', 'E-H', 'I-L', 'M-P', 'Q-T', 'U-Z'];

  const filteredStudios = studios.filter(studio => {
    if (selectedFilter === 'All') return true;
    const firstLetter = studio.name.trim().charAt(0).toUpperCase();
    const [start, end] = selectedFilter.split('-');
    return firstLetter >= start && firstLetter <= end;
  });

  return (
    <main className="pt-28 pb-20 bg-surface text-on-surface font-body-md min-h-screen">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header Section */}
        <header className="mb-12 max-w-2xl">
          <div className="flex items-center space-x-2 mb-3">
            <div className="h-px w-8 bg-forest-green"></div>
            <span className="font-label-md text-label-md text-forest-green tracking-widest uppercase font-semibold">Partner Studios</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-4 leading-tight">Curating the exceptional.</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            A global directory of independent workshops and master artisans who share our commitment to material honesty and enduring craftsmanship.
          </p>
        </header>

        {/* Alphabetical Filter */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-outline-variant/30 pb-4">
          {filterRanges.map(range => (
            <button
              key={range}
              onClick={() => setSelectedFilter(range)}
              className={`font-label-md text-label-md px-4 py-1.5 rounded-lg transition-colors ${
                selectedFilter === range
                  ? 'bg-forest-green text-white'
                  : 'text-on-surface-variant hover:text-forest-green'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Bento / Grid Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredStudios.map(studio => (
            <div 
              key={studio.id} 
              onClick={() => navigate(`/storefront/${studio.id}`)}
              className="group cursor-pointer block"
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-surface-container-low mb-4 rounded-lg shadow-sm">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={studio.name} 
                  src={studio.image || DEFAULT_STUDIOS[0].image}
                />
                <div className="absolute inset-0 bg-forest-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-center">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{studio.name}</h3>
                <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">{studio.craft}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Atmospheric Call to Action */}
        <section className="mt-20 relative py-16 overflow-hidden bg-forest-green text-white rounded-xl shadow-md">
          <div className="relative z-10 text-center max-w-xl mx-auto px-6">
            <h2 className="font-headline-lg text-headline-lg mb-4 text-white">Join the Marketplace</h2>
            <p className="font-body-md text-body-md mb-8 opacity-90 leading-relaxed">
              We are always seeking artisans who push the boundaries of traditional craft through modern vision.
            </p>
            <button 
              onClick={() => navigate('/seller/signup')}
              className="bg-surface-linen text-forest-green px-8 py-3 rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors font-semibold shadow"
            >
              Apply as a Studio
            </button>
          </div>
        </section>

      </div>
    </main>
  );
};

export default BrandListing;
