import api from '../../services/api';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const WishlistCollection = () => {
  const { listId } = useParams();
  
  const collection = {
    id: listId || 'list-1',
    name: 'Living Room Remodel',
    itemCount: 4,
    visibility: 'Private',
    items: [
      { id: 2, name: 'Woven Indigo Throw', artisan: 'Tidal Textiles', price: 200, inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A' },
      { id: 3, name: 'Raw Sandstone Sculpture', artisan: 'Stone & Time', price: 450, inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtExz30CUj3OhHY1qRJT7iqKjlA9owNKpJOiK-Au2lQn8jlbdXjp4f5lwhvkZeb_mCCQctKKkZr1IPtZDaDUihMrsKNYMsfLU8F__veHjFnFgtDRBictWZ9qj5CfmWIxkNLS6GgK8zTh6nkzPm9OgAPoZR60g1mQL0cjNzVNiDiZPg0z10EuS4LYLBkbqQeSDGjeljCWLmsXoBa9EKITfu4BAvzuBCkDPuIpUw_jBKTHQazw_GkZwZKw' },
      { id: 4, name: 'Carved Walnut Nesting Set', artisan: 'Woodland Craft', price: 240, inStock: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAihgFBpVMJrO3PO3Nkh0kMNQ_O3fG1p1x6mmmQjhpuxwDJtojvNkz0hHHUz-Dh0FHrXCTr4JxY3U7XlM97FLLPZ0a19omKGqfFJg0aGD2DNr1yFoLUxyimit52f4VN6cjsv3z0fKvXLvOc_Kjwm_aautVn6LWP1mFnNTlcFyjHCdSlA8vGC9eQMvut6TxHemacNecCLXNaL26n7wGEcz8cER6qPbmVU-JcxAzHzYX7lsksV-PGoXoJMA' }
    ]
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
          <div>
            <Link to="/profile" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
              <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Lists
            </Link>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-display-md text-display-md text-on-surface">{collection.name}</h1>
              <span className="bg-surface-variant/50 text-on-surface font-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">{collection.visibility === 'Private' ? 'lock' : 'public'}</span>
                {collection.visibility}
              </span>
            </div>
            <p className="font-body-md text-on-surface-variant">{collection.itemCount} items</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">share</span>Share
            </button>
            <button className="px-4 py-2 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">edit</span>Edit
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center gap-2 cursor-pointer font-label-md text-on-surface">
            <input type="checkbox" className="accent-forest-green" /> Select All
          </label>
          <button className="text-forest-green font-label-md hover:underline">Add Selected to Cart</button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.items.map((item, idx) => (
            <div key={idx} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden group">
              <div className="relative aspect-square">
                <img src={item.image} alt={item.name} className={`w-full h-full object-cover ${!item.inStock ? 'grayscale opacity-60' : ''}`} />
                <div className="absolute top-3 left-3">
                  <input type="checkbox" className="accent-forest-green w-5 h-5 shadow-sm" />
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-on-surface-variant hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
                {!item.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-surface-container-lowest/90 px-4 py-2 rounded font-label-md text-on-surface shadow-sm">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <Link to={`/product/${item.id}`} className="block font-body-md text-on-surface hover:text-forest-green transition-colors mb-1 truncate">{item.name}</Link>
                <p className="font-body-sm text-on-surface-variant mb-2">{item.artisan}</p>
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-on-surface">${item.price.toFixed(2)}</span>
                  {item.inStock ? (
                    <button className="text-forest-green hover:bg-forest-green/10 p-2 rounded-full transition-colors flex">
                      <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    </button>
                  ) : (
                    <button className="text-on-surface-variant hover:bg-surface-variant/30 p-2 rounded-full transition-colors flex" title="Notify me when available">
                      <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistCollection;
