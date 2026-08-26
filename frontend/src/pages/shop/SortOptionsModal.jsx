import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const SORT_OPTIONS = [
  'Relevance',
  'Price: Low to High',
  'Price: High to Low',
  'Newest Arrivals',
  'Artisan Rating',
];

const CERAMICS_PRODUCTS = [
  {
    id: 1,
    name: 'Ochre Tides Vessel',
    tag: 'SIGNATURE WORK',
    price: 480.00,
    featured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCAqNifEclnbMe22FGUts9heg37g4GHLKFR7Phqxg2PXwcp4YWUjGvoLavluOLBebW9k2Zap1QJbKpaCbmmosc2p_Uag6VsrE_bStFiw_TEVcxOxL9S3wVuLgxXUK90G1oQTrYoNch8G_0GmzxWdpDtoaziqM1czygRJMTayo1xrA5x9QopBuC5l7FJQLasRCV-owNE3bDDloACtkLwTcMSQexA1GNoFC9xjKdRpqPn5Fy8gjM7LAo3g',
  },
  {
    id: 2,
    name: 'Basalt Breakfast Bowl',
    price: 65.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQTTWeuVYDDRe0x4ZU51h8rL4iG58TGr81FhoCMkQpQOUIVAGka_3xyykWtamLLGlvWL2pZO4hmx_gg1ZUB41Lhlzve-nlIwmKkNbyqYZdjc_6wjoA1HQXtbSK7pbx1saHgilkALjF20vG07_7qQfEBsZHP7-5Wstx2gtJuvENMBcybzoMo8RVY9ulri5MvvU5W88tw3k7kq5OPUHGbatM5VepcjaQPuBwzsFejZh6wwdSbomP-YDuuA',
  },
  {
    id: 3,
    name: 'Mesa Pouring Jug',
    price: 110.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc5AP7HQGh0LspMcziUto_0uYpmrPu1P-7z7EFsm99EDbaKdm-z01vIc7FjvFdStbcx-11XJS7OMRTK5KqTiylAKEOuShpESLCpop2DvpVzmd4xcN8DcLGOpugxxqp5m_ZcD97eCr1VS5qe4PGCQjM7ftNXa_iw9hAKnMm03TmbdRL5WUb6SxGqPcwEOYHeETHmguAWy7_SeDFWurBK8xgF6gk4OqT2CEWMWxnGs94RfsodsPc51-lkg',
  },
  {
    id: 4,
    name: 'Komorebi Tea Duo',
    price: 85.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRsAbCE5hzwo-4AuO2ROhc4s_eD2u0-fjQZMWQL21TiuiNMlMLSHliE2NzZrdQXvAsPw4neZ129tDCxa7LN6kdjQwE9FTMkTZn_nkz0Ti5t2fd977W2Eyyiekt8ltZMfPtc5nJiWyGztLXAyiqr5utJiGX1W9js0ISFGOUamDbwRKeKwWqVITHn407jcMGMYzNwvMXFsFhTAI9H13PQ_4o6mGUlsz8uyjYt0QN_wqDtdvvXeP2FDS4wQ',
  },
  {
    id: 5,
    name: 'Desert Plain Bowl',
    price: 145.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv8uUJE0kRFVYaPiokIGJmTfmPQQFrJ9mZmYwmp3Mkacuuca-Z8uawl7ZwAMveU7JPcFBV3nwVDQz146PAtuwhyqztsgr7_W8Xdw-yz6DXXFxDF5Z8RSdc2toWMPGfJE8fk994HBccBqtyJzC0MRbOx3zSvjtk15DZx2Dphl_XBbrmM89EUodN9CNuKRacf6PTGle2Zldhmw03MkioEaz22BakAyItU24Au1Dg15IMgH4YTC_Cp4_jHQ',
  },
  {
    id: 6,
    name: 'Forest Curation Jars',
    price: 90.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhzaetYRdJNKME-R2JoF7cu-bbRCCWIPRR5kfwYV5g00yn-P-A74ZPWzShTAJhu0IskvtnVBudJNMx5bCzmdGAWEjP48JgRVIqdruFvicFCt4xfhPtUiqEtdDTA1LuGtQysrAHysZd71zENSZNWMafchvJadKDhM4HM8FRt8B18Lnye-FoUaXdH8Ef0uF-qTJ4qUGH8ICKtDvlMWR9LfM-PZyJROsM3byJJpnG-VQrsJMb4rCYtwpaLQ',
  },
  {
    id: 7,
    name: 'Luna Incense Plinth',
    price: 75.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmCSbgY1LvExTVLg94muzZlWDzQkzjihwOKz-VcGDkvow8zAEjMqG1onfok4dBXTsQnhCg0c1DGunxuDbz95l7YltFPpZUStp2T3HFTlKGQaL36nxMi2LnzA1odh6X-a0WUTZED9XUgViR3piMa2oCgJTliXNfXfW3THrvKeUXGjvQLLgU9YisUhSyrqPHuKF28lPLZaheR56GWB37Zcg86KylMhkHABFDJDXiB6_438q1nF3pv2td8Q',
  },
];

const SortOptionsModal = () => {
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState('Relevance');
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleSelectSort = (opt) => {
    setSelectedSort(opt);
    setIsDropdownOpen(false);
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop bg-surface text-on-surface font-body-md min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-baseline gap-4 mb-10 border-b border-outline-variant/20 pb-6">
        <div>
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-charcoal mb-2 font-bold">Hand-Thrown Ceramics</h1>
          <p className="font-body-md text-on-surface-variant max-w-xl text-sm">
            A curated collection of functional art, shaped by the raw earth and fire of master artisans.
          </p>
        </div>

        {/* Sort Selector Trigger & Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant rounded-md bg-white font-label-md text-xs uppercase tracking-wider hover:border-forest-green transition-all shadow-sm font-semibold"
          >
            <span>SORT BY: {selectedSort}</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-outline-variant/30 rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectSort(opt)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-label-md transition-colors flex items-center justify-between ${
                    selectedSort === opt
                      ? 'bg-surface-container-low text-forest-green font-bold'
                      : 'text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedSort === opt && (
                    <span className="material-symbols-outlined text-sm text-forest-green">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
        
        {/* Large Feature Card */}
        <div 
          onClick={() => navigate('/product/1')}
          className="md:col-span-2 row-span-2 group bg-white rounded-lg overflow-hidden border border-outline-variant/20 shadow-sm cursor-pointer"
        >
          <div className="aspect-[16/10] w-full overflow-hidden bg-surface-container">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Ochre Tides Vessel" 
              src={CERAMICS_PRODUCTS[0].image} 
            />
          </div>
          <div className="p-6 flex justify-between items-start">
            <div>
              <span className="font-label-sm text-xs text-terracotta tracking-widest uppercase mb-1 block font-semibold">Signature Work</span>
              <h3 className="font-headline-md text-headline-md text-forest-green font-bold">Ochre Tides Vessel</h3>
            </div>
            <span className="font-headline-md text-lg text-on-surface font-bold">$480.00</span>
          </div>
        </div>

        {/* Small Cards */}
        {CERAMICS_PRODUCTS.slice(1, 3).map(product => (
          <div 
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group bg-white rounded-lg overflow-hidden border border-outline-variant/20 shadow-sm cursor-pointer"
          >
            <div className="aspect-square w-full overflow-hidden bg-surface-container">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt={product.name} 
                src={product.image} 
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-body-md text-sm text-on-surface font-semibold group-hover:text-forest-green transition-colors">{product.name}</h3>
              <p className="font-label-md text-xs text-on-surface-variant mt-1">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}

      </div>

      {/* Row of 4 smaller cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {CERAMICS_PRODUCTS.slice(3).map(product => (
          <div 
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group bg-white rounded-lg overflow-hidden border border-outline-variant/20 shadow-sm cursor-pointer"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-surface-container">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt={product.name} 
                src={product.image} 
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-body-md text-sm text-on-surface font-semibold group-hover:text-forest-green transition-colors">{product.name}</h3>
              <p className="font-label-md text-xs text-on-surface-variant mt-1">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
};

export default SortOptionsModal;
