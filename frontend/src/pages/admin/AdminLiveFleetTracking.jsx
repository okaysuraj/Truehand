import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const AdminLiveFleetTracking = () => {
  const { user } = useAuth();
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFleet();
    const interval = setInterval(fetchFleet, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchFleet = async () => {
    try {
      const res = await api.get('/delivery/fleet');
      setFleet(res.data || []);
    } catch (err) {
      console.error('Failed to fetch fleet data', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return <div className="p-24 text-center">Unauthorized. Admins only.</div>;
  }

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16 flex flex-col md:flex-row">
      {/* Sidebar logic reused from AdminDashboard ideally, but simplified here */}
      <nav className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 p-6 hidden md:block">
        <h2 className="font-headline-sm text-forest-green mb-8">Admin Navigation</h2>
        <Link to="/admin" className="block text-on-surface-variant hover:text-forest-green mb-4">Dashboard</Link>
        <Link to="/admin/fleet" className="block text-forest-green font-bold border-l-2 border-forest-green pl-2">Live Fleet</Link>
      </nav>

      <main className="flex-1 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="font-display-md text-display-md text-on-surface mb-2">Live Fleet Tracking</h1>
            <p className="font-body-md text-on-surface-variant">Monitor active delivery partners in real-time.</p>
          </div>
          <div className="flex items-center gap-2 text-forest-green bg-forest-green/10 px-4 py-2 rounded-full font-label-sm">
            <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse"></span>
            Live Updates
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List View */}
          <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 shadow-sm overflow-y-auto max-h-[600px]">
            <h3 className="font-label-md uppercase text-on-surface-variant mb-4 tracking-widest border-b border-outline-variant/20 pb-2">Active Vehicles</h3>
            
            {loading && fleet.length === 0 ? (
              <p className="text-center text-outline-variant my-8">Loading fleet...</p>
            ) : fleet.length === 0 ? (
              <p className="text-center text-outline-variant my-8">No active delivery vehicles.</p>
            ) : (
              fleet.map(vehicle => (
                <div key={vehicle.id} className="p-4 border border-outline-variant/30 rounded mb-3 hover:bg-surface-container-low transition-colors cursor-pointer border-l-4 border-l-forest-green">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-on-surface">{vehicle.vehicleRegistrationNumber}</p>
                    <span className="text-[10px] bg-forest-green text-white px-2 py-0.5 rounded-full">{vehicle.status}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Type: {vehicle.vehicleType}</p>
                  <p className="text-xs text-outline-variant mt-2">
                    Last ping: {vehicle.lastPingAt ? new Date(vehicle.lastPingAt).toLocaleTimeString() : 'Never'}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Map View */}
          <div className="lg:col-span-2 bg-surface-container-high border border-outline-variant/30 rounded-lg shadow-sm h-[600px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
            <div className="text-center z-10 p-8 bg-surface-container-lowest/90 rounded backdrop-blur-sm shadow-lg border border-outline-variant/20">
              <span className="material-symbols-outlined text-5xl text-forest-green mb-4">map</span>
              <h3 className="font-headline-sm text-on-surface mb-2">Map Integration Required</h3>
              <p className="text-on-surface-variant max-w-sm mx-auto">
                Real-time mapping requires Google Maps JavaScript API. The fleet data is successfully polling from the backend.
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {fleet.map(v => (
                   <span key={v.id} className="text-xs bg-forest-green/10 text-forest-green px-2 py-1 rounded">
                     {v.currentLat?.toFixed(2)}, {v.currentLng?.toFixed(2)}
                   </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminLiveFleetTracking;
