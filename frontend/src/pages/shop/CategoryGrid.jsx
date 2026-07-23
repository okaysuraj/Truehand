import api from '../../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const categories = [
    { id: 1, name: 'Ceramics', count: 142, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw' },
    { id: 2, name: 'Textiles', count: 98, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A' },
    { id: 3, name: 'Sculpture', count: 67, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtExz30CUj3OhHY1qRJT7iqKjlA9owNKpJOiK-Au2lQn8jlbdXjp4f5lwhvkZeb_mCCQctKKkZr1IPtZDaDUihMrsKNYMsfLU8F__veHjFnFgtDRBictWZ9qj5CfmWIxkNLS6GgK8zTh6nkzPm9OgAPoZR60g1mQL0cjNzVNiDiZPg0z10EuS4LYLBkbqQeSDGjeljCWLmsXoBa9EKITfu4BAvzuBCkDPuIpUw_jBKTHQazw_GkZwZKw' },
    { id: 4, name: 'Woodwork', count: 89, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAihgFBpVMJrO3PO3Nkh0kMNQ_O3fG1p1x6mmmQjhpuxwDJtojvNkz0hHHUz-Dh0FHrXCTr4JxY3U7XlM97FLLPZ0a19omKGqfFJg0aGD2DNr1yFoLUxyimit52f4VN6cjsv3z0fKvXLvOc_Kjwm_aautVn6LWP1mFnNTlcFyjHCdSlA8vGC9eQMvut6TxHemacNecCLXNaL26n7wGEcz8cER6qPbmVU-JcxAzHzYX7lsksV-PGoXoJMA' },
    { id: 5, name: 'Glasswork', count: 54, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl32JIaQbyVRfKquoWr73CBK1P7KEV3FclqyVydZOXMW9b83FV7EglQeDBblwAxNrdVTtU1zGODJuR-ITbtOV_kxNg5U3lQaJmwi5nM8nG6WAqB_yN3luvUoNa9kUE0XRNoJ59nFaXxzPZ7-Z49tZfwG8M91aHCkskouHxtDctoQFL4_2KLhHEITPcaXWh8U-WiowONVUJU3DFhT8ULsza8-8imKcb6BuhOqPokG7v5laz--K2E3KwRQ' },
    { id: 6, name: 'Metalwork', count: 76, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaTz-qflZ7IMuB-nWdpZZit1KTgQeWKJw72aUN0UPx4kl2YNnkVIxKM5JhT7C4ZrT9XjlldHtwyp_rRgiIoxZqLKW_8fNKb0x1e3rEgJo2kdmgSQ-rgDTflRmPHAJg8UXAvBhsID5kT3HPcM2Z3otZ2u4zFjCnZ1XkL65chFD6AAKKbzT9KA-av00tTmXK_44-ABgYkqv9Pr151nIMAm_0cpE4yUgmXj5SCtEkyCZJPVbXu9ny_MByCw' },
    { id: 7, name: 'Jewelry', count: 113, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfX25REApHwjW6Bi7lmjTNDdMZpL0ylKZopLaBLxkzldUvq0RCo34G_y9cC08ZfJLyIb7t7vzQIuP3kZTWeKxEZcP0FlGgq2Vhc5WG80VCqtGVtz8MSvRqWg82-2jgU9zbKGqbR7XecGJeNNP2Z8xN9flT14xOuhOwrX4AR0Y-NGuSn6f2KnOSPPjtze04FRqoXJOBDigPQ_EqipZfns2WMcNj9muasL447a2JTlAuoeqtCMxSZNsEQA' },
    { id: 8, name: 'Leather', count: 45, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnvq_o1x7ZpKHjIBpCbLtq7gYj6mW3OBFyBjLv2jU1GwyB6gML7G1DCfScRssPrqykpMPFoE_bRnXGC2P_8tFZjgDma6za59Vl26AsOzU1r4Xc0Wj-UTHlFqLnxBzm4Ma0rR-TDb8vP-XXg3Hjgci_dOfsKd_2DPp13vyCGCZLfvEkbdtgd6nwb_GFDoiM4vYTDlGrmNocpfAl0XBUqkDXiLb2Q3Z9d0qUdAkmPgBSkPr6YlxozAzugQ' }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display-md text-display-md text-on-surface mb-3">Browse by Category</h1>
          <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">Explore our curated collection of handcrafted goods organized by craft tradition.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(cat => (
            <Link key={cat.id} to={`/products?category=${cat.name.toLowerCase()}`} className="group block relative rounded-lg overflow-hidden aspect-square">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-headline-sm text-headline-sm text-white mb-1">{cat.name}</h3>
                <p className="font-body-sm text-white/70">{cat.count} products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
