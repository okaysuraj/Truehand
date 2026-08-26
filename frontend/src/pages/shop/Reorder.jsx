import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../context/CartProvider';

const REORDER_ITEMS = [
  {
    id: 101,
    name: 'Earthenware Mug',
    category: 'CERAMICS',
    tagline: 'Last purchased Oct 2023',
    price: 45.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw',
  },
  {
    id: 102,
    name: 'Woven Linen Napkins',
    category: 'TEXTILES',
    tagline: 'Set of 4 — Reordered 2 times',
    price: 68.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
  },
  {
    id: 103,
    name: 'Carved Walnut Spoon',
    category: 'KITCHENWARE',
    tagline: 'Limited Batch Release',
    price: 52.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZqd4TL6YM-02s_QxvUuoHr9W8C8c6zr6POoUxUDOS0PxjQcYqP3L1S8V1b-eE8dFGBE6-eGZ4EruYb3UHYl1jp36TbyAAeDPJSx472DW2rZMvOQQJ8bEMQUBJulQvwF5PAxoG9o578JKM48AdILKjy-a0BYsJ5S0SgVO9mw-SqRqLabQtaHE-V0e5Im0EIJdDRvnMEBmJTH3S2iPK9fdX-6_WtAXXkL7s4E9yeMmFRcI62hlgt-tVRg',
  },
  {
    id: 104,
    name: 'Beeswax Tapers',
    category: 'LIVING',
    tagline: 'Last purchased Dec 2023',
    price: 36.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxErMHRhrn2KkUOXA18bGbCos5_fd9pw1YBh0ocHhUnaIHEJxDFws_74yq_iB_himwxbHWzqM2BEYcqZOuCVo3CN2RlR93gNaUA3WnX6oYUyeptNi_PSJrzkwv0KeZUOGM_vnH1frl3UVVwid0Lak_QIHjumia3urt26J2qMRf7v14cG_xUieyxqE7RfO3Etxs35v_pUICyZ2jw4QdUL5x-S20xH-SUsVuKqR6xINIntrJzUrUNS1NRQ',
  },
  {
    id: 105,
    name: 'Oatmeal Wool Throw',
    category: 'TEXTILES',
    tagline: 'Winter Essential',
    price: 220.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeCYhd7I4h-n4OM1vRaUr-klBuiAWPt303dcypGEeiQkgQNi6_Xv0cYw0ZcpS5QT1zScqAD19e49mMXCzODp8ERcB3QOqfywWILT7TYZJolsC869cHiXOyNTmb1gsvcnGb5tGdcFiERAxHzA71PQNa6Xlwijgtn2Yb7ah8-2Dfbe9FZGTW_GBJ9VpW1oc567uw1kDm43JPK2-f3VFcc4SQQ9gTZwb3Cuxi07FbV2Wtxsy1ylB0bZdaFg',
  },
  {
    id: 106,
    name: 'Indigo Dye Kit',
    category: 'STUDIO',
    tagline: 'Artisan Toolset',
    price: 85.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w',
  },
];

const Reorder = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleReorder = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    navigate('/cart');
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
        <h1 className="font-display-lg text-3xl md:text-5xl text-charcoal font-bold">
          Rediscover Your Favorites
        </h1>
        <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
          A curated history of your past selections, crafted with care and ready to rejoin your collection.
        </p>
      </div>

      {/* 6-Product Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {REORDER_ITEMS.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="aspect-[4/3] bg-surface-container overflow-hidden relative cursor-pointer" onClick={() => handleReorder(item)}>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            <div className="p-6 text-center space-y-2">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">
                {item.category}
              </span>
              <h3 className="font-display-md text-lg text-charcoal font-bold group-hover:text-forest-green transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-on-surface-variant italic pb-2">
                {item.tagline}
              </p>
              
              <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="font-headline-md text-sm text-forest-green font-bold">${item.price.toFixed(2)}</span>
                <button 
                  onClick={() => handleReorder(item)}
                  className="px-4 py-1.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-wider rounded hover:opacity-90 transition-all font-semibold"
                >
                  Reorder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sustainable Restock Bento Card */}
      <div className="bg-surface-container-low rounded-2xl p-8 md:p-12 border border-outline-variant/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-forest-green">
            <span className="material-symbols-outlined text-xl">eco</span>
            <span className="font-label-sm text-xs uppercase tracking-widest font-bold">Our Commitment</span>
          </div>
          <h2 className="font-display-lg text-2xl md:text-3xl text-forest-green font-bold">
            Sustainable Restock
          </h2>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            We believe in a circular economy for the home. Your reordered favorites are shipped using 100% plastic-free, compostable packaging. By choosing to restock artisanal items rather than mass-produced alternatives, you continue to support independent craft communities and preserve traditional techniques.
          </p>
          <button 
            onClick={() => navigate('/authenticity')}
            className="px-6 py-3 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-wider rounded-lg hover:bg-surface-container transition-all font-semibold"
          >
            Learn More About Our Ethics
          </button>
        </div>

        <div className="lg:col-span-5 h-64 rounded-xl overflow-hidden shadow-sm border border-outline-variant/30">
          <img 
            className="w-full h-full object-cover" 
            alt="Eco-friendly packaging" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" 
          />
        </div>

      </div>

    </main>
  );
};

export default Reorder;
