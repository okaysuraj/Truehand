import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const RouteOptimization = () => {
  const { user } = useAuth();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOptimizedRoute = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/delivery/route-optimization', {
        agentId: user?.id || 1,
        locations: [
          { lat: 12.9716, lng: 77.5946 },
          { lat: 12.9352, lng: 77.6245 }
        ]
      });
      setRoute(res.data);
    } catch (err) {
      setError('Failed to calculate optimized route.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="font-display-md text-display-md text-on-surface mb-2">Route Optimization</h1>
            <p className="font-body-md text-on-surface-variant">Calculate the most efficient delivery path for your active orders.</p>
          </div>
          <button 
            onClick={fetchOptimizedRoute}
            disabled={loading}
            className="bg-forest-green text-white px-6 py-3 rounded-lg font-label-md hover:bg-forest-green/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Calculating...' : 'Optimize Route'}
          </button>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-8 shadow-sm">
          {error && <div className="mb-4 p-4 bg-error-red/10 text-error-red rounded">{error}</div>}
          
          {!route && !loading && !error && (
            <div className="text-center text-outline-variant py-12">
              <span className="material-symbols-outlined text-5xl mb-4">map</span>
              <p>Click "Optimize Route" to fetch navigation data.</p>
            </div>
          )}

          {route && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container p-4 rounded border border-outline-variant/30">
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Total Distance</p>
                  <p className="font-headline-md text-forest-green">{(route.totalDistanceMeters / 1000).toFixed(1)} km</p>
                </div>
                <div className="bg-surface-container p-4 rounded border border-outline-variant/30">
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Est. Duration</p>
                  <p className="font-headline-md text-forest-green">{Math.round(route.estimatedDurationSeconds / 60)} mins</p>
                </div>
              </div>

              <div className="w-full h-96 bg-surface-container-high rounded flex items-center justify-center border border-outline-variant">
                <p className="text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined">satellite_alt</span>
                  [Map Integration Placeholder: Polyline rendered here]
                </p>
                <p className="hidden text-xs">{route.optimizedPolyline}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;
