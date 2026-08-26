import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DEFAULT_SAVED = [
  {
    id: 1,
    name: 'Hand-thrown Vase',
    tag: 'Hand-thrown Ceramic',
    price: 185.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyrKeIo6Taxk27zHb3kFjKhnp24z23blh1KN90bmNxZ49M16rFegACZio81wD7RBNl47-qMIaSjZ-c1HdzJI1cADLHlNA0nsorUegCJEdH1Xdx5m1PqrmOVtJQI0rcMHtpEesii1Fj3ReAfo7lFqiaH82Z6wP35Y7Ob2w0OfP42m2IIhIMI7a7Rm8rBEkS1DrOhy_RS5UO4KqQQaH8Fq9efLzL6wa_9OS10FvfNPiMSRXUbnbMpXoU1A',
  },
  {
    id: 2,
    name: 'Linen Throw',
    tag: 'Natural Textile',
    price: 240.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDswcYZpBSXIwptN99qYj6ivbPklAFFzwtH4O711dpha986yn0J_U08Ts6k5voaYg-8poJ8eqvUKVDfXoFqUA-LNVlLrqBepGrsRSExq626bYxLaLG0bx7pFMQXF6NYbbRD-MoQhK08lFJrzG1xNEezdn2bbh5ct8OmXBdmbruWdZ1yCg4vkj-hYV1dYji76fOVjzoSYvMQRiK1ua_VAr6gVKpjVjdjWzIk0a6Q_aYYGI9qdJOdRtwX7w',
  },
  {
    id: 3,
    name: 'Carved Serving Spoon',
    tag: 'Hand-carved Wood',
    price: 65.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV_EkemQXISDe2Dj1u8HaXN6TMG37wtR0fwHNsvZ8NdIHb0a1czXdyo7X40h9yIFoZbbWFNCq7P97jya5LvOqFIIq_6mNnZjVQIDOGTSiqB5KXDdCVBQRcJav2hXwrSEIx434Hf8T667euBlKcQU63Hk80jv4VA8iJNJGhJwz8Tsw-VEZu5iKSKFndqfi4Mzjl2xA9PIIwkvVlWhjUhFeZKTctSpKI7EjjXvu7KFebUUSZNnveu9DCKw',
  },
];

const SaveForLater = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(DEFAULT_SAVED);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const moveAllToCart = () => {
    navigate('/cart');
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop bg-surface-linen text-on-surface font-body-md min-h-screen">
      
      {/* Header Section */}
      <section className="mb-12 flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-outline-variant/20 pb-6">
        <div>
          <h1 className="font-display-lg text-display-lg text-forest-green mb-2">Saved for Later</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">A curated selection of your favorite handcrafted pieces.</p>
        </div>
        {items.length > 0 && (
          <div className="flex gap-4">
            <button 
              onClick={moveAllToCart}
              className="px-6 py-2.5 border border-charcoal font-label-md text-label-md hover:bg-forest-green hover:border-forest-green hover:text-white transition-all duration-300 rounded font-semibold text-sm shadow-sm"
            >
              Move All to Cart
            </button>
          </div>
        )}
      </section>

      {/* Product Grid */}
      {items.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-xl border border-outline-variant/30 mb-16">
          <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">bookmark_border</span>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No Saved Items</h3>
          <p className="font-body-md text-on-surface-variant mb-6">Explore the collections and save pieces you adore for later.</p>
          <Link to="/products" className="inline-flex items-center px-6 py-3 bg-forest-green text-white font-label-md rounded font-semibold hover:opacity-90 transition-opacity">
            Explore Gallery
          </Link>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-20">
          {items.map(item => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-white rounded-lg shadow-sm">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={item.name} 
                  src={item.image} 
                />
                
                {/* Hover Add to Cart Bar */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex flex-col">
                  <button 
                    onClick={() => navigate('/cart')}
                    className="w-full py-3 bg-forest-green text-white font-label-md text-sm rounded shadow hover:bg-forest-green/90 transition-colors font-semibold"
                  >
                    Move to Cart
                  </button>
                </div>

                {/* Remove button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white text-terracotta transition-colors rounded-full shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-surface-container text-on-surface-variant font-label-sm text-xs rounded-full mb-2">
                  {item.tag}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-1 font-semibold">{item.name}</h3>
                <p className="font-label-md text-label-md text-terracotta font-bold">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Recommendation Teaser */}
      <section className="py-16 border-t border-outline-variant/30 text-center">
        <h2 className="font-headline-lg text-headline-lg text-forest-green mb-8 font-bold">Consider adding these to your collection</h2>
        <div className="flex justify-center gap-8 flex-wrap">
          <div 
            onClick={() => navigate('/products?category=Ceramics')}
            className="group cursor-pointer max-w-[200px]"
          >
            <div className="aspect-square bg-surface-container mb-3 overflow-hidden rounded-lg shadow-sm">
              <img 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                alt="Clay Incense Burner" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmCSbgY1LvExTVLg94muzZlWDzQkzjihwOKz-VcGDkvow8zAEjMqG1onfok4dBXTsQnhCg0c1DGunxuDbz95l7YltFPpZUStp2T3HFTlKGQaL36nxMi2LnzA1odh6X-a0WUTZED9XUgViR3piMa2oCgJTliXNfXfW3THrvKeUXGjvQLLgU9YisUhSyrqPHuKF28lPLZaheR56GWB37Zcg86KylMhkHABFDJDXiB6_438q1nF3pv2td8Q" 
              />
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant group-hover:text-terracotta transition-colors font-medium">Clay Incense Burner</p>
          </div>

          <div 
            onClick={() => navigate('/products?category=Home')}
            className="group cursor-pointer max-w-[200px]"
          >
            <div className="aspect-square bg-surface-container mb-3 overflow-hidden rounded-lg shadow-sm">
              <img 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                alt="Hand-dipped Tapers" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtNMzwiZ1VybUN8ljmv8g6r_z789RTHM-M5vHUlVVJkYwVWL2vBiqFo8V8VvtuD44G5oaEtLxeHVZM5-7x0Bg8oq9AravyABgpyXmclqHZwTDJwWgmYHLXIGOK5lnpiWtQTxlYX7RTe_fTNyZETUpp-B3bg0ufHOEdFn83vYhfTe00D9Q2wEsIxGVQx8s4GMJotjpxPazD5QupX90VlVLS7jhCFtF-3XDtmG4mFnpMwe7Zw1uaVlv8MQ" 
              />
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant group-hover:text-terracotta transition-colors font-medium">Hand-dipped Tapers</p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default SaveForLater;
