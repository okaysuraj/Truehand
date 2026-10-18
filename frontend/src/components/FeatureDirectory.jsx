import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import definitions from '../../../shared/marketplace-features.json';
import { useAuth } from '../context/AuthProvider';
import MarketplaceFeature from './MarketplaceFeature';
export function FeatureRoute() {
  const { feature } = useParams();
  return definitions[feature] ? (
    <MarketplaceFeature feature={feature} />
  ) : (
    <Navigate to="/404" replace />
  );
}
export default function FeatureDirectory() {
  const { user } = useAuth();
  return (
    <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-4xl font-display-lg text-forest-green">TrueHand features</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(definitions)
          .filter(([, definition]) => !definition.roles || definition.roles.includes(user?.role))
          .map(([feature, definition]) => (
            <Link className="border p-4" key={feature} to={'/features/' + feature}>
              {definition.title}
            </Link>
          ))}
      </div>
    </main>
  );
}
