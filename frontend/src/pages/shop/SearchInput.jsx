import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_RECENT = [
  'Hand-thrown Stoneware',
  'Oak Dovetail Joinery',
  'Linen Weaving Kits',
];

const POPULAR_TAGS = [
  'Wabi-Sabi Tableware',
  'Indigo Dyeing',
  'Minimalist Furniture',
  'Kintsugi Kits',
  'Organic Cotton',
];

const CURATED_COLLECTIONS = [
  {
    title: 'The Ceramics Collection',
    category: 'Ceramics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYvao7A_KW99zXmjaXqpY0iHOStx5J5P_iGA7DD0yl_LzXNRjOr46dgxghikz689y29kgpisWcDLHQD259VoIjaQLuYVSQH09wx2qWKGgLNqtIP-JD6MeAZo9wOHC2Uk97dxwuhkZS8Q1M4auk99qqKOeKtVy8ttdr_akIBafFDJI38ZrAp81HAxCq8-tn_qUzsAqiZRdFw-z7QAJ6wtPJjX70BP_JTCFCrYrRPhsaLVpQ_ldob5nBuA',
  },
  {
    title: 'Natural Indigo',
    category: 'Textiles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_xX6XEhU-WTrQjlSLaFlfKZ1jajQPNlnMpkVfsJXQaHHCgModNCKc__zGXk7a9ZukGcFD4D7myKQgF5TSD7AeC-X0cwPBMrhggJjXdxUdhQRpQgHEc5HfKkoru-eNrvNoJJaqu_frcl4H-7Ip6X0RCPQy_6S85Gil029ytx-wg9HXALK0-QjSEAnCTLmPOpS8qgn-opLdF-MdKKvwo3X6BgyI4lVmEY6ye7QfKLKkCMswrKzOOmndDw',
  },
  {
    title: 'Modern Heritage Wood',
    category: 'Woodwork',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJPGJM3RLeiJ9Tnk67R34jajidHZFGSm5oiAO6jOj0qX1B67mMKKEfW21nwXGYOG4ADpL-_Q6k3vTLIS0MIbHM0-8w_r2FT3GfGQXGXvsf3jxHl2sGCquu3aOj7nPXx6IJM5oI3jdyb3f32U4MIDVjTLkc-vhwK8M-Hg8NTe1ICSQAwH2HoL7lLojIlb0mhJ9dkibBDFM9qmgdwjSmDHmxFtglNbSA9WGI4qmMGMOGE3yUvGRx6ISZSg',
  },
];

const SearchInput = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState(DEFAULT_RECENT);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const removeRecent = (index) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  const clearAllHistory = () => {
    setRecentSearches([]);
  };

  return (
    <main className="min-h-screen pt-28 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface text-on-surface font-body-md">
      
      {/* Focused Search Layout */}
      <div className="max-w-3xl mx-auto mt-12 md:mt-16">
        
        {/* Large Centered Search Bar */}
        <div className="relative group">
          <div className="flex items-center border-b-2 border-forest-green/20 focus-within:border-forest-green transition-colors py-4 px-2">
            <span className="material-symbols-outlined text-forest-green text-[32px] mr-4">search</span>
            <input 
              autoFocus
              className="w-full bg-transparent border-none focus:outline-none font-display-lg text-headline-lg md:text-display-lg text-on-surface placeholder:text-on-surface-variant/40" 
              placeholder="Search materials, artisans, or techniques" 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            {searchTerm && (
              <button 
                onClick={() => navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)}
                className="bg-forest-green text-white px-4 py-2 rounded text-xs uppercase tracking-widest font-semibold ml-2 hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            )}
          </div>
        </div>

        {/* Discovery Modules */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Recent Searches */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-6 text-xs font-semibold">Recent Searches</h3>
            {recentSearches.length > 0 ? (
              <>
                <ul className="space-y-4">
                  {recentSearches.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center group cursor-pointer"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(item)}`)}
                    >
                      <span className="material-symbols-outlined text-on-surface-variant/60 mr-3 text-[18px]">history</span>
                      <span className="font-body-md text-sm text-on-surface group-hover:text-forest-green transition-colors">{item}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeRecent(idx); }}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-on-surface-variant hover:text-charcoal"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={clearAllHistory}
                  className="mt-6 font-label-sm text-xs text-on-surface-variant hover:text-on-surface underline transition-colors"
                >
                  Clear all history
                </button>
              </>
            ) : (
              <p className="text-sm text-on-surface-variant italic">No recent searches.</p>
            )}
          </section>

          {/* Popular Now Tag Cloud */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-6 text-xs font-semibold">Popular Now</h3>
            <div className="flex flex-wrap gap-3">
              {POPULAR_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                  className="px-5 py-2.5 bg-surface-container-low border border-outline-variant/30 hover:border-forest-green hover:text-forest-green transition-all rounded-full font-label-md text-xs font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

        </div>

        {/* Curated Visual Suggestions */}
        <div className="mt-20">
          <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-8 text-center text-xs font-semibold">Curated Collections</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURATED_COLLECTIONS.map(col => (
              <div 
                key={col.title}
                onClick={() => navigate(`/products?category=${col.category}`)}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-lg mb-3 bg-surface-container shadow-sm">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={col.title} 
                    src={col.image} 
                  />
                </div>
                <p className="font-label-md text-sm text-center font-medium group-hover:text-forest-green transition-colors">{col.title}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </main>
  );
};

export default SearchInput;
