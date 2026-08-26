import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { useCart } from '../../context/CartProvider';
import api from '../../services/api';

const SAMPLE_WISHLIST = [
  {
    id: 1,
    name: 'Ashen Tall Vessel',
    brand: 'Clay & Kiln',
    price: 320.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
    category: 'Winter Ceramics',
  },
  {
    id: 2,
    name: 'Artisan Weekender Tote',
    brand: 'TrueHand Leather',
    price: 850.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhhYgF4qfL2A5-osVSphMHrUIDwrbMWiKui9yxIoh5_s0HuLuWSG23I2w1CcVv-ypEUNA9wadn5Lx0LmcWk3gk-G9igglMpfPCHP0cGvU1lr_Zma7XO9OR3eXTDQPVEByK4IQ53TB0t21LpBf1YYQiJKNZJdrpheOiub8wvU98AUNdxks_Jo0uj5A6FArs_Z3qrglGvjWsc10g3X1EUAjDjLBTFQzpzA53O8lUR6evcUV_EeYQEoYY3w',
    category: 'Heirloom Textiles',
  },
  {
    id: 3,
    name: 'Walnut Nesting Trio',
    brand: 'Timber Collective',
    price: 210.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
    category: 'Modern Forge',
  },
  {
    id: 4,
    name: 'Damascus Utility Set',
    brand: 'Forge Master',
    price: 1200.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
    category: 'Modern Forge',
  },
  {
    id: 5,
    name: 'Hand-Woven Linen Set',
    brand: 'Looms & Lace',
    price: 85.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
    category: 'Heirloom Textiles',
  },
];

const Wishlist = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Items (12)');
  const [items, setItems] = useState(SAMPLE_WISHLIST);

  useEffect(() => {
    if (user?.id) {
      api.get(`/wishlist/user/${user.id}`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            const mapped = res.data.map(p => ({
              id: p.id,
              name: p.name,
              brand: 'Artisan Collective',
              price: p.price,
              image: p.imageUrl || SAMPLE_WISHLIST[0].image,
              category: 'Winter Ceramics',
            }));
            setItems(mapped);
          }
        })
        .catch(e => console.warn(e));
    }
  }, [user]);

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const filteredItems = items.filter(i => {
    if (activeTab === 'Winter Ceramics') return i.category === 'Winter Ceramics';
    if (activeTab === 'Heirloom Textiles') return i.category === 'Heirloom Textiles';
    if (activeTab === 'Modern Forge') return i.category === 'Modern Forge';
    return true;
  });

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-outline-variant/30 pb-8 gap-4">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-3xl md:text-5xl text-forest-green font-bold mb-2">My Collections</h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            A curated archive of the pieces that speak to you. Each selection is a testament to timeless craftsmanship and the enduring beauty of natural materials.
          </p>
        </div>

        <button 
          onClick={() => navigate('/wishlist-collections')}
          className="flex items-center gap-2 bg-forest-green text-white px-6 py-3 rounded-lg font-label-md text-xs uppercase tracking-widest hover:opacity-90 transition-all font-semibold shadow shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Collection
        </button>
      </header>

      {/* Category Filter Tabs */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
        {['All Items (12)', 'Winter Ceramics', 'Heirloom Textiles', 'Modern Forge'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-label-md text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'bg-forest-green text-white shadow-sm' 
                : 'border border-outline-variant text-on-surface-variant hover:border-forest-green bg-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="group flex flex-col items-center">
            
            {/* Image Box */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-surface-container mb-4 shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
              <Link to={`/product/${item.id}`}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </Link>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 bg-white/90 backdrop-blur-md rounded-full text-charcoal hover:bg-red-600 hover:text-white transition-all shadow"
                  title="Remove from Collection"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="text-center space-y-1 w-full">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">
                {item.brand}
              </span>
              <Link to={`/product/${item.id}`}>
                <h3 className="font-body-md text-sm font-semibold text-on-surface hover:text-forest-green transition-colors">
                  {item.name}
                </h3>
              </Link>
              <p className="font-headline-md text-xs font-bold text-forest-green">${item.price.toFixed(2)}</p>

              <button 
                onClick={() => {
                  addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 });
                  alert(`Added ${item.name} to your Cart.`);
                }}
                className="mt-3 w-full py-2.5 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-widest rounded-lg hover:bg-forest-green hover:text-white hover:border-forest-green transition-all font-semibold"
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}

        {/* Continue Exploring Card */}
        <Link 
          to="/products" 
          className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/60 rounded-xl aspect-[3/4] hover:bg-white hover:border-forest-green transition-all cursor-pointer group text-center p-6"
        >
          <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-forest-green transition-colors mb-3">bookmark_add</span>
          <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest font-bold group-hover:text-forest-green">
            Continue Exploring
          </span>
        </Link>
      </div>

    </main>
  );
};

export default Wishlist;
