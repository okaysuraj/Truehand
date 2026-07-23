import api from '../../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const StorefrontPreview = () => {
  const store = {
    name: "Elena Studio",
    tagline: "Hand-crafted ceramics inspired by the Mediterranean coastline",
    location: "Portland, Oregon",
    rating: 4.9,
    reviewCount: 128,
    memberSince: "2021",
    bio: "Elena Studio is a small ceramics workshop founded by Elena Marchetti, a second-generation potter who combines traditional Italian wheel-throwing techniques with modern minimalist aesthetics. Each piece is hand-thrown, glazed with proprietary mineral-based glazes, and kiln-fired at 2300°F.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaTz-qflZ7IMuB-nWdpZZit1KTgQeWKJw72aUN0UPx4kl2YNnkVIxKM5JhT7C4ZrT9XjlldHtwyp_rRgiIoxZqLKW_8fNKb0x1e3rEgJo2kdmgSQ-rgDTflRmPHAJg8UXAvBhsID5kT3HPcM2Z3otZ2u4zFjCnZ1XkL65chFD6AAKKbzT9KA-av00tTmXK_44-ABgYkqv9Pr151nIMAm_0cpE4yUgmXj5SCtEkyCZJPVbXu9ny_MByCw",
    products: [
      { id: 1, name: 'Coastal Ceramic Vase', price: 120, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw' },
      { id: 2, name: 'Terracotta Bowl Set', price: 85, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX25REApHwjW6Bi7lmjTNDdMZpL0ylKZopLaBLxkzldUvq0RCo34G_y9cC08ZfJLyIb7t7vzQIuP3kZTWeKxEZcP0FlGgq2Vhc5WG80VCqtGVtz8MSvRqWg82-2jgU9zbKGqbR7XecGJeNNP2Z8xN9flT14xOuhOwrX4AR0Y-NGuSn6f2KnOSPPjtze04FRqoXJOBDigPQ_EqipZfns2WMcNj9muasL447a2JTlAuoeqtCMxSZNsEQA' },
      { id: 3, name: 'Stoneware Dinner Plate', price: 45, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnvq_o1x7ZpKHjIBpCbLtq7gYj6mW3OBFyBjLv2jU1GwyB6gML7G1DCfScRssPrqykpMPFoE_bRnXGC2P_8tFZjgDma6za59Vl26AsOzU1r4Xc0Wj-UTHlFqLnxBzm4Ma0rR-TDb8vP-XXg3Hjgci_dOfsKd_2DPp13vyCGCZLfvEkbdtgd6nwb_GFDoiM4vYTDlGrmNocpfAl0XBUqkDXiLb2Q3Z9d0qUdAkmPgBSkPr6YlxozAzugQ' }
    ]
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-20 pb-16 bg-surface-linen min-h-screen">
      
      {/* Cover Image */}
      <div className="relative w-full h-[360px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${store.coverImage}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent"></div>
        
        {/* Store Info on Cover */}
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-4 md:px-8 pb-8">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 bg-surface-container-lowest rounded-full border-4 border-surface-container-lowest flex items-center justify-center shrink-0 shadow-lg">
              <span className="font-display-md text-3xl text-forest-green">{store.name.charAt(0)}</span>
            </div>
            <div className="text-white pb-1">
              <h1 className="font-display-md text-display-md mb-1">{store.name}</h1>
              <p className="font-body-md opacity-90">{store.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Store Meta */}
        <div className="flex flex-wrap items-center gap-6 py-6 border-b border-outline-variant/30 mb-10">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-forest-green text-[18px] font-variation-fill">star</span>
            <span className="font-label-md text-on-surface">{store.rating}</span>
            <span className="font-body-sm text-on-surface-variant">({store.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">location_on</span>
            <span className="font-body-md text-on-surface-variant">{store.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">calendar_month</span>
            <span className="font-body-md text-on-surface-variant">Member since {store.memberSince}</span>
          </div>
        </div>

        {/* About */}
        <div className="mb-12">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">About the Studio</h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed max-w-3xl">{store.bio}</p>
        </div>

        {/* Products */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-headline-md text-headline-md text-on-surface">Products</h2>
            <Link to="/products" className="font-label-md text-forest-green hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {store.products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-surface-container rounded-lg mb-4 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-body-md text-on-surface group-hover:text-forest-green transition-colors mb-1">{product.name}</h3>
                <p className="font-label-md text-on-surface-variant">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StorefrontPreview;
