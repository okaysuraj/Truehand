import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const JULIAN_COLLECTION = [
  {
    id: 1,
    name: 'Crater Glaze Tall Vessel',
    price: 280.00,
    tag: 'Hand-thrown',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxErMHRhrn2KkUOXA18bGbCos5_fd9pw1YBh0ocHhUnaIHEJxDFws_74yq_iB_himwxbHWzqM2BEYcqZOuCVo3CN2RlR93gNaUA3WnX6oYUyeptNi_PSJrzkwv0KeZUOGM_vnH1frl3UVVwid0Lak_QIHjumia3urt26J2qMRf7v14cG_xUieyxqE7RfO3Etxs35v_pUICyZ2jw4QdUL5x-S20xH-SUsVuKqR6xINIntrJzUrUNS1NRQ',
  },
  {
    id: 2,
    name: 'Nested Harvest Bowls (Set of 2)',
    price: 145.00,
    tag: 'Stoneware',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZqd4TL6YM-02s_QxvUuoHr9W8C8c6zr6POoUxUDOS0PxjQcYqP3L1S8V1b-eE8dFGBE6-eGZ4EruYb3UHYl1jp36TbyAAeDPJSx472DW2rZMvOQQJ8bEMQUBJulQvwF5PAxoG9o578JKM48AdILKjy-a0BYsJ5S0SgVO9mw-SqRqLabQtaHE-V0e5Im0EIJdDRvnMEBmJTH3S2iPK9fdX-6_WtAXXkL7s4E9yeMmFRcI62hlgt-tVRg',
  },
  {
    id: 3,
    name: 'Moss Sculpture Pitcher',
    price: 310.00,
    tag: 'Collector Piece',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR__-9BuWaEaTInfxL_o4KderSVZpGMnrGscsA5mslkOtsrFb7Xy7CaAubodzxWEMM1vTcTI6IOhzVWL8Uj-OWkCo-6hNCVIUFhgypdN1SR5bO8igCLKKYTI-rMx35qxUvU0qVWcDdbeY6YzkJ1iSDnMPoaY2cBA_woPN7mRcJQvkQbB9NznTGvqF_xKgFZyRJJBRM92MhpYGEfqdv_Oh3Tk7eGqZiqNyVM8hI2vX_TBGc71Ic6bw-PA',
  },
  {
    id: 4,
    name: 'Oatmeal Speckle Dinnerware',
    price: 48.00,
    tag: 'Series',
    pricePrefix: 'From ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt9-4REWLg4KxTGH-RyHBRm-WwHTdQLw6hS-bdom7q_dnS2iBO5j2tOvAP0tebe30-xfRHgsEsdQw0bnfALf5RfgZriYmid42PDhVntz2pjOJN8DgQR9AJrLxPx0j5hD65J1kaKxfSaC5EFRAzIa6vgSJSiSfqynry-GV31h34xaqjet_ZZnmOfGbpuyuPewX6xn6DF1MWgbrl7T6hxIoOc7VMpBvmoM2EKk9ROXtpKo3iHeoFKkrniw',
  },
  {
    id: 5,
    name: 'River Glass Centerpiece',
    price: 390.00,
    tag: 'Unique Fire',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt-XRzVGJk4b0CPkAPtK9bXvDKJHcScHiYzDak-21vCJvuw3-g4Wo3Frp2S_K-eSdYY-ke8VyOSBAZn0GXAkNN7jL-zG0ehrAFM5fsFGEVRni7OmGzK1VqIAEo-tqgIN5Zro2Rix6nAZeLe1pno6uOoTU5gjXZxgzZF6-g5MBSo1BrMrM2tTdzOGo6Kd3HlBnzEmZBMa9TPM6iHKoOvyLmlsS2OiWC4GgdS-dIOuLji7XpE9XicENNOA',
  },
  {
    id: 6,
    name: 'Coastal Tea Duo',
    price: 180.00,
    tag: 'Limited Batch',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGcftdShi8LvpSYkn5DD1Z8jyVySY75VDR2kh2Xo4WMPxzN1HZSPR5lS93OnGdDEL6TpSH-Q8kwMtb3RjZH7s14yZGOnTWs2X_e0ahUZuKc8cbyThXtdZrJMLEyyFcOQuGjJPgCmm6cCCRAfuowVhqKiC0KB1pCYnnQX7g47xk2DalqcnMZ-7wVjhgeFl6YLyUeNu7IluMwv8tE6WyBzG3zBxGSKdqFtk3SIKNiGVZiPOSqjE60ZWT8A',
  },
];

const ArtisanProfile2 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Collection');
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  return (
    <main className="pt-24 bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Top Banner */}
      <section className="relative h-64 md:h-80 bg-surface-container overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          alt="Studio Background" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIiYXaMdqAqWyEsL4Wj6MSZ419HSbGDyVNQ7mWDGYxCyOpGJKLIW770hPm6Txl7Cdd5ic0WBEeedHcb8ngYp_Q0qycfR_Kg7TV8Jt0uJEADdL3IKVwsW71qK3kXOVhaKjL__G32ORQxBA5D3JhTVqZ5VTgJiWyecuoBjqVzKxUKe_cE995gb1RNbIljB2uJl4_a5oOShBzNPBo5TP0sT9zVdppVrIfcchuWypzae0dtT_ewTcYsTM7IA" 
        />
        <div className="absolute inset-0 bg-charcoal/20"></div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
        
        {/* Sidebar: Artisan Profile Card */}
        <aside className="lg:col-span-4 -mt-24 md:-mt-32 relative z-20">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-outline-variant/30 flex flex-col items-center text-center">
            
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <img 
                className="w-full h-full object-cover" 
                alt="Julian Thorne" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU3O6ywVK7jEMLvKVA2kxssgwGL1XlWsOAd84tu2XqZg4CgzMYwltj5tWAQ2Ql8IT5-5vy-eHa4sLDQptw0SRhg91q6t80nQZblBDtMIfRgO6xDTt-aalUaPfafhqNy6M2zGihlYjIFhars6KFVaVaaXuwbb1XPoHyo2Tean4Jy8_9ET7nngtylq-67tC3Lz5ezyZgAqsdw6ASwH_K2vf_bCNtZUQmDTguRdIoB-r5OyDzVc98AqtFxQ" 
              />
            </div>

            <h2 className="font-headline-md text-xl md:text-2xl text-forest-green font-bold">Julian Thorne</h2>
            <p className="font-label-md text-xs text-terracotta mb-3 uppercase tracking-wider font-semibold">Master Ceramicist</p>
            <p className="font-body-md text-xs text-on-surface-variant mb-6 leading-relaxed">
              Crafting soulful stoneware that celebrates the perfect imperfection of the natural world. Based in the rugged hills of Ojai.
            </p>

            <div className="flex items-center gap-1.5 text-on-surface-variant text-xs mb-6">
              <span className="material-symbols-outlined text-[16px] text-terracotta">location_on</span>
              <span>Ojai, California</span>
            </div>

            <div className="grid grid-cols-3 w-full gap-2 py-4 border-y border-outline-variant/30 mb-6 text-center">
              <div>
                <span className="font-headline-md text-lg text-forest-green font-bold block">412</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant">Pieces</span>
              </div>
              <div>
                <span className="font-headline-md text-lg text-forest-green font-bold block">4.9</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant">Rating</span>
              </div>
              <div>
                <span className="font-headline-md text-lg text-forest-green font-bold block">12</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant">Years</span>
              </div>
            </div>

            <div className="flex flex-col w-full gap-3">
              <button 
                onClick={() => setFollowing(!following)}
                className={`w-full py-3 rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold transition-all shadow-sm ${
                  following ? 'bg-surface-container text-forest-green border border-forest-green' : 'bg-forest-green text-white hover:opacity-90'
                }`}
              >
                {following ? 'Following Artisan' : 'Follow Artisan'}
              </button>
              <button 
                onClick={() => alert('Profile link copied to clipboard!')}
                className="w-full border border-charcoal text-charcoal py-2.5 rounded-lg font-label-md text-xs uppercase tracking-wider hover:bg-surface-container transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                Share Profile
              </button>
            </div>

          </div>
        </aside>

        {/* Main Content Area */}
        <section className="lg:col-span-8 pt-4">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-8 border-b border-outline-variant/30 mb-8 overflow-x-auto pb-1">
            {['Collection', 'Artisan Story', 'The Process', 'Workshops'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-label-md text-xs uppercase tracking-wider whitespace-nowrap transition-colors font-semibold ${
                  activeTab === tab 
                    ? 'border-b-2 border-forest-green text-forest-green' 
                    : 'text-on-surface-variant hover:text-forest-green'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Collection Grid */}
          {activeTab === 'Collection' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {JULIAN_COLLECTION.map(item => (
                <div 
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="group cursor-pointer bg-white rounded-lg p-3 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/5] bg-surface-container rounded overflow-hidden mb-3 relative">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={item.name} 
                      src={item.image} 
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert('Saved to wishlist'); }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1.5 rounded-full text-forest-green shadow-sm hover:scale-110"
                    >
                      <span className="material-symbols-outlined text-[16px]">favorite</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <h3 className="font-body-md text-xs font-semibold mb-1 text-on-surface line-clamp-1 group-hover:text-forest-green transition-colors">{item.name}</h3>
                    <p className="font-label-md text-xs text-on-surface-variant font-bold">
                      {item.pricePrefix || ''}${item.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex justify-center">
                      <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Artisan Story' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/30 space-y-4 text-sm leading-relaxed">
              <h3 className="font-headline-md text-xl text-forest-green font-bold">Roots in the Earth</h3>
              <p className="text-on-surface-variant">Julian Thorne began his journey with clay in the rugged mountains of California. With over a decade of dedication to wood-fired kilns and local earthen clays, his work embodies quiet simplicity and timeless form.</p>
              <p className="text-on-surface-variant">Every vessel is crafted on a kick wheel, embracing the natural textures and slight variations that make handmade ceramics truly soulful.</p>
            </div>
          )}

          {activeTab === 'The Process' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/30 space-y-4 text-sm leading-relaxed">
              <h3 className="font-headline-md text-xl text-forest-green font-bold">Wood-Fired Precision</h3>
              <p className="text-on-surface-variant">Firing stoneware for 36 continuous hours with seasoned oak results in rich, natural glaze variations that cannot be replicated with modern electric kilns.</p>
            </div>
          )}

          {activeTab === 'Workshops' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/30 text-center py-12">
              <span className="material-symbols-outlined text-4xl text-forest-green mb-2">school</span>
              <h3 className="font-headline-md text-lg text-forest-green font-bold mb-1">Upcoming Ojai Studio Workshops</h3>
              <p className="text-xs text-on-surface-variant">New dates for Spring 2025 will be announced to newsletter subscribers first.</p>
            </div>
          )}

        </section>

      </div>

    </main>
  );
};

export default ArtisanProfile2;
