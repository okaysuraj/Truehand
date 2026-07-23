import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const PersonalizedRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate personalized recommendations by fetching trending and recent products
    api.get('/products?size=8&sort=averageRating,desc')
      .then(res => {
        const items = res.data.content || [];
        setRecommendations([
          {
            title: 'Picked for You',
            subtitle: 'Based on your recent browsing and purchases',
            products: items.slice(0, 4)
          },
          {
            title: 'Because You Liked Ceramics',
            subtitle: 'Similar crafts from artisans you may enjoy',
            products: items.slice(4, 8)
          }
        ]);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display-md text-display-md text-on-surface mb-3">Recommended for You</h1>
          <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">Personalized picks based on your taste and browsing history.</p>
        </div>

        {loading ? (
          <div className="w-full flex justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
          </div>
        ) : recommendations.map((section, idx) => (
          <div key={idx} className="mb-14 last:mb-0">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-1">{section.title}</h2>
                <p className="font-body-sm text-on-surface-variant">{section.subtitle}</p>
              </div>
              <Link to="/products" className="text-forest-green font-label-md hover:underline whitespace-nowrap">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {section.products.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-surface-container rounded-lg mb-3">
                    <img src={product.imageUrl || product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="font-body-md text-on-surface group-hover:text-forest-green transition-colors mb-1 truncate">{product.name}</h3>
                  <p className="font-body-sm text-on-surface-variant mb-1">{product.sellerName || 'Artisan'}</p>
                  <p className="font-label-md text-on-surface">${product.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
