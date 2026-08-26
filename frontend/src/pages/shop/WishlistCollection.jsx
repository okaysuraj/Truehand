import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../context/CartProvider';

const COLLECTION_PRODUCTS = [
  {
    id: 'ws_1',
    name: 'Tall Ribbed Ovoid Vessel',
    artisan: 'Kanso Studio',
    price: 320.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
  },
  {
    id: 'ws_2',
    name: 'Low Basin in Moss',
    artisan: 'Archaic Forms',
    price: 185.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
  },
  {
    id: 'ws_3',
    name: 'Asymmetric Pouring Vessel',
    artisan: 'Mizu Works',
    price: 240.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ',
  },
  {
    id: 'ws_4',
    name: 'Pinch Nesting Trio',
    artisan: 'Terra Flora',
    price: 115.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZqd4TL6YM-02s_QxvUuoHr9W8C8c6zr6POoUxUDOS0PxjQcYqP3L1S8V1b-eE8dFGBE6-eGZ4EruYb3UHYl1jp36TbyAAeDPJSx472DW2rZMvOQQJ8bEMQUBJulQvwF5PAxoG9o578JKM48AdILKjy-a0BYsJ5S0SgVO9mw-SqRqLabQtaHE-V0e5Im0EIJdDRvnMEBmJTH3S2iPK9fdX-6_WtAXXkL7s4E9yeMmFRcI62hlgt-tVRg',
  },
  {
    id: 'ws_5',
    name: 'Crackle Globe Bud Vase',
    artisan: 'Solitude Ceramics',
    price: 95.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw',
  },
];

const ALSO_SEEK = [
  {
    id: 'as_1',
    category: 'SMALL OBJECTS',
    name: 'Soothe Incense Holder',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxErMHRhrn2KkUOXA18bGbCos5_fd9pw1YBh0ocHhUnaIHEJxDFws_74yq_iB_himwxbHWzqM2BEYcqZOuCVo3CN2RlR93gNaUA3WnX6oYUyeptNi_PSJrzkwv0KeZUOGM_vnH1frl3UVVwid0Lak_QIHjumia3urt26J2qMRf7v14cG_xUieyxqE7RfO3Etxs35v_pUICyZ2jw4QdUL5x-S20xH-SUsVuKqR6xINIntrJzUrUNS1NRQ',
  },
  {
    id: 'as_2',
    category: 'DRINKWARE',
    name: 'Yunomi Tea Bowl',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3KdQhtwd8spgVuyFTX6XeVjz5CGI0lS-vtaWReroSaHZR4gq6Pk0m0MOVCz5ULclmEOvOYffuIQB0w2EsPBLM8HOa2WaN89cmmRIz8XKiKVEpnMvRxLdFWlnitUJWuwKfOvfNRuFdV-pmVTSSLlTx77fn9q6LRR8hb_htr__EejMLwbBQdmflT7-dsBYPkmK8ZyakX9zRfvGI0lIvYVn5fJd01qKN00ZizmOE8RYnTdV7xna-B3ZI9w',
  },
  {
    id: 'as_3',
    category: 'WALL ART',
    name: 'Fragment No. 42',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Hn6pbs0x1d42fVQX8eBE4UcAefe8_7hOV57QENJUWYVL3g0166wXlnIbvYvF8FgZvPK0q7r_p6tzugVv5gJ_lgQcDW7-T3a85Sroj77NIFTJI0tiLEeQcy1MvPL5AHRSYC8XP-Y_Aov6Z5tiKG9uQMi5cIUCgBP1WZZyT2PfqvI3X_IvztlRh2sAiarMgwrcyhhCHUfbcN4Vicj_kHLjTULdPQJpg9JASuHaf3nAEEyeSu9hPCNTXw',
  },
  {
    id: 'as_4',
    category: 'HOME ACCENTS',
    name: 'Raw Edge Coaster Set',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
  },
];

const WishlistCollection = () => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-20 pb-20 w-full bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Hero Banner with Studio Atmosphere */}
      <section className="relative h-[480px] w-full flex items-center justify-center text-center overflow-hidden">
        <img 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7]" 
          alt="Ceramic Sanctuary Studio" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9w2ZPMB6iMY-ZebOR5S0IcbjXMBVxAlJmhScmEnMUYx3j690CrDOclgXUJHVtjxz5Z_VZkAN2EvTXuEVaSfjTAzH7uC-SP1XPu35bSFHNC14Ebdz0UE3H-sNRHgHzOBVCXmp1v76yHCFPwoqbzqWVwP7HgDoEYo4Olj_VM_FfDriEbANUo9WlA_X8biE71C4qS4mTO1uDYjDj2Tw76S3A9Bl8fINgylyLdwgOPa7HaByGBSAaYMdiog" 
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-white space-y-4">
          <span className="font-label-sm text-xs uppercase tracking-widest text-[#ffb59c] font-bold">
            Private Collection &bull; 5 Items
          </span>
          <h1 className="font-display-lg text-4xl md:text-6xl font-bold text-white tracking-tight">
            Ceramic Sanctuary
          </h1>
          <p className="font-body-md text-xs md:text-sm text-white/90 italic max-w-2xl mx-auto leading-relaxed">
            "A curated assembly of vessels that speak to the silence of clay. Each piece is selected for its ability to anchor a room in the present moment, celebrating the beautiful imperfections of the human hand."
          </p>
          <div className="pt-2 flex justify-center gap-6 text-xs font-label-md uppercase tracking-wider font-semibold">
            <button 
              onClick={() => alert('Collection link copied to clipboard!')}
              className="flex items-center gap-1.5 hover:text-[#ffb59c] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              Share Collection
            </button>
            <button 
              onClick={() => alert('Edit collection details modal opened.')}
              className="flex items-center gap-1.5 hover:text-[#ffb59c] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Edit Details
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: 5 Collection Products + Add to Collection Card */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {COLLECTION_PRODUCTS.map((p) => (
            <div key={p.id} className="group flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-surface-container mb-4 shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </Link>
              </div>
              <div className="text-center space-y-1">
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">{p.artisan}</span>
                <Link to={`/product/${p.id}`}>
                  <h3 className="font-display-md text-base font-bold text-charcoal hover:text-forest-green transition-colors">{p.name}</h3>
                </Link>
                <p className="font-headline-md text-xs font-bold text-forest-green">${p.price.toFixed(2)}</p>
              </div>
            </div>
          ))}

          {/* Add to Collection Dashed Card */}
          <Link 
            to="/products"
            className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/60 rounded-xl aspect-[4/5] hover:bg-white hover:border-forest-green transition-all cursor-pointer group text-center p-6"
          >
            <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-forest-green transition-colors mb-3">add</span>
            <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest font-bold group-hover:text-forest-green">
              Add to Collection
            </span>
          </Link>
        </div>
      </section>

      {/* Middle Narrative Section: The Soul of Clay */}
      <section className="bg-surface-container-low/70 py-16 border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display-lg text-3xl md:text-4xl text-forest-green font-bold">The Soul of Clay</h2>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Our ceramics are more than objects; they are a conversation between the artisan and the earth. We source our clays from specific regions known for their unique mineral compositions—from the iron-rich beds of the Black Forest to the pale, fine kaolin of Cornwall.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3.5 py-1 bg-white rounded-full text-xs font-semibold text-charcoal border border-outline-variant/40">High-Fire Stoneware</span>
              <span className="px-3.5 py-1 bg-white rounded-full text-xs font-semibold text-charcoal border border-outline-variant/40">Local Wild Clay</span>
              <span className="px-3.5 py-1 bg-white rounded-full text-xs font-semibold text-charcoal border border-outline-variant/40">Ash Glazes</span>
            </div>
            <button 
              onClick={() => navigate('/authenticity')}
              className="px-8 py-3.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-bold shadow"
            >
              Explore Our Materials
            </button>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="h-60 rounded-xl overflow-hidden shadow-sm">
              <img className="w-full h-full object-cover" alt="Clay shaping" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" />
            </div>
            <div className="h-60 rounded-xl overflow-hidden shadow-sm">
              <img className="w-full h-full object-cover" alt="Vessels collection" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXA3GWA23w_MtAVNZ6230AT9lqrn3LPY-iyOqp3NaVS_V4YrxE_AdmK_2g1FPAM4jkeQZGiAAJiVjSlds-VhJi4GOAyJ-QZ9HresMcSzWUiyvISEpJN87fqj_92rBN9GFvGdBC5rvM6TnCER5WekVhFNUEVNoXVn5BPclzHj3Qn78Pst4X8_RVMiSd-S2MIkdC6d1I_4SjGQOrh26YZzbQtdydbgUhD8a9JqyyrraLEZ2lJE4yu9WGPA" />
            </div>
          </div>

        </div>
      </section>

      {/* Bottom Section: You May Also Seek */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="font-display-lg text-2xl md:text-3xl text-forest-green font-bold">You May Also Seek</h2>
          <Link to="/products" className="font-label-md text-xs uppercase tracking-wider text-terracotta hover:underline font-bold flex items-center gap-1">
            View Registry &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALSO_SEEK.map(item => (
            <div key={item.id} className="group cursor-pointer" onClick={() => navigate('/products')}>
              <div className="aspect-square bg-surface-container rounded-xl overflow-hidden mb-3 shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">{item.category}</span>
              <h4 className="font-body-md text-xs sm:text-sm font-semibold text-charcoal group-hover:text-forest-green transition-colors">{item.name}</h4>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default WishlistCollection;
