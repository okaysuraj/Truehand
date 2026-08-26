import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PORTFOLIO_PREVIEWS = [
  {
    category: 'Ceramics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ',
  },
  {
    category: 'Hand-woven Textiles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_xX6XEhU-WTrQjlSLaFlfKZ1jajQPNlnMpkVfsJXQaHHCgModNCKc__zGXk7a9ZukGcFD4D7myKQgF5TSD7AeC-X0cwPBMrhggJjXdxUdhQRpQgHEc5HfKkoru-eNrvNoJJaqu_frcl4H-7Ip6X0RCPQy_6S85Gil029ytx-wg9HXALK0-QjSEAnCTLmPOpS8qgn-opLdF-MdKKvwo3X6BgyI4lVmEY6ye7QfKLKkCMswrKzOOmndDw',
  },
  {
    category: 'Modern Woodworking',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJPGJM3RLeiJ9Tnk67R34jajidHZFGSm5oiAO6jOj0qX1B67mMKKEfW21nwXGYOG4ADpL-_Q6k3vTLIS0MIbHM0-8w_r2FT3GfGQXGXvsf3jxHl2sGCquu3aOj7nPXx6IJM5oI3jdyb3f32U4MIDVjTLkc-vhwK8M-Hg8NTe1ICSQAwH2HoL7lLojIlb0mhJ9dkibBDFM9qmgdwjSmDHmxFtglNbSA9WGI4qmMGMOGE3yUvGRx6ISZSg',
  },
];

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-screen bg-surface-linen font-body-md text-on-surface flex flex-col items-center justify-center text-center">
      
      {/* Empty Bag Graphic */}
      <div className="w-24 h-24 mb-6 rounded-full bg-surface-container flex items-center justify-center text-forest-green shadow-sm">
        <span className="material-symbols-outlined text-[48px]">shopping_bag</span>
      </div>

      <h1 className="font-display-lg text-3xl md:text-5xl text-forest-green font-bold mb-3">Your Gallery is Empty</h1>
      <p className="font-body-lg text-on-surface-variant max-w-lg mb-8 text-sm md:text-base leading-relaxed">
        A curated selection of hand-crafted artisan pieces is waiting to be discovered. Start your journey into the world of authentic craftsmanship.
      </p>

      <div className="flex gap-4 flex-wrap justify-center mb-16">
        <button 
          onClick={() => navigate('/products')}
          className="px-8 py-3.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded hover:opacity-90 transition-all font-semibold shadow flex items-center gap-2"
        >
          <span>Start Exploring</span>
          <span>&rarr;</span>
        </button>
        <button 
          onClick={() => navigate('/trending')}
          className="px-8 py-3.5 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-widest rounded hover:bg-surface-container transition-all font-semibold"
        >
          View New Arrivals
        </button>
      </div>

      {/* Recommended Portfolios */}
      <div className="w-full max-w-4xl border-t border-outline-variant/30 pt-12">
        <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest block mb-4 font-semibold">
          Recommended Portfolios
        </span>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {['Ceramics', 'Hand-woven Textiles', 'Modern Woodworking', 'Fine Metalware'].map(cat => (
            <button
              key={cat}
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
              className="px-5 py-2 bg-surface-container-high rounded-full text-xs font-semibold text-charcoal hover:bg-forest-green hover:text-white transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PORTFOLIO_PREVIEWS.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => navigate('/products')}
              className="aspect-[4/3] rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer shadow-sm group"
            >
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.category} src={item.image} />
            </div>
          ))}
        </div>
      </div>

    </main>
  );
};

export default EmptyCart;
