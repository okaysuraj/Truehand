import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon path issues with Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/709/709790.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// Component to dynamically set map view to the current location
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const Tracking = () => {
  const { id } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDelivery = async () => {
    try {
      const res = await api.get(`/deliveries/${id}`);
      setDelivery(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching delivery:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDelivery();
    // Poll every 3 seconds
    const interval = setInterval(() => {
      fetchDelivery();
    }, 3000);
    return () => clearInterval(interval);
  }, [id]);

  // Debug function to simulate backend movement
  const simulateMovement = async () => {
    try {
      await api.post(`/deliveries/${id}/simulate`);
      fetchDelivery();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop text-center text-forest-green font-headline-md">Loading tracking details...</div>;
  if (!delivery) return <div className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop text-center text-error-red font-headline-md">Delivery information not available yet.</div>;

  const currentLoc = delivery.currentLocation || { latitude: 12.9716, longitude: 77.5946 };
  const position = [currentLoc.latitude, currentLoc.longitude];

  const steps = ['PENDING', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const currentStepIndex = steps.indexOf(delivery.status);

  return (
    <main className="pt-32 pb-section-gap min-h-screen max-w-container-max mx-auto">
      {/* Live Tracking Header Section */}
      <section className="px-margin-desktop mb-stack-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-stack-md">
          <div>
            <span className="font-label-md text-label-md text-secondary tracking-widest uppercase mb-base block">Order #{id}</span>
            <h1 className="font-display-lg text-display-lg text-forest-green">
              {delivery.status.replace(/_/g, ' ')}
            </h1>
          </div>
          <div className="text-left md:text-right">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Estimated Arrival</p>
            <p className="font-headline-lg text-headline-lg text-forest-green">
              {delivery.estimatedDeliveryTime ? new Date(delivery.estimatedDeliveryTime).toLocaleString() : 'Pending'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Map & Tracking Interaction Area */}
      <section className="px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Live Map Visualization */}
          <div className="lg:col-span-8 relative h-[600px] bg-white rounded overflow-hidden shadow-sm shadow-forest-green/5 border border-outline-variant/20">
            <MapContainer center={position} zoom={15} style={{height: '100%', width: '100%', zIndex: 0}}>
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              <ChangeView center={position} />
              <Marker position={position} icon={truckIcon}>
                <Popup>
                  Your package is here.<br/>
                  Last updated: {currentLoc.timestamp ? new Date(currentLoc.timestamp).toLocaleTimeString() : 'Just now'}
                </Popup>
              </Marker>
            </MapContainer>

            {/* Courier Overlay */}
            {delivery.status !== 'DELIVERED' && (
              <div className="absolute bottom-6 left-6 z-10 bg-surface/90 backdrop-blur-md p-stack-md rounded-sm shadow-sm flex items-center gap-stack-md border border-outline-variant/30">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px] text-forest-green">local_shipping</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Your Courier</p>
                  <p className="font-body-md text-body-md font-semibold text-forest-green">TrueHand Delivery</p>
                </div>
                <div className="ml-4 flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-forest-green/20 hover:bg-forest-green/5 transition-all pointer-events-auto">
                    <span className="material-symbols-outlined text-forest-green text-[20px]">call</span>
                  </button>
                </div>
              </div>
            )}

            {/* Debug Button overlay */}
            {delivery.status !== 'DELIVERED' && (
              <div className="absolute top-6 left-6 z-[1000]">
                <button 
                  onClick={simulateMovement}
                  className="bg-secondary text-white px-4 py-2 font-label-sm rounded-sm shadow-sm hover:bg-secondary/90 transition-all pointer-events-auto"
                >
                  Simulate Movement (Debug)
                </button>
              </div>
            )}
          </div>

          {/* Package Details & History Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            
            {/* Tracking History */}
            <div className="bg-white p-stack-lg rounded-sm border border-outline-variant/20 flex-1 shadow-sm shadow-forest-green/5">
              <h3 className="font-headline-md text-headline-md text-forest-green mb-stack-md">Tracking History</h3>
              <div className="relative pl-6 flex flex-col gap-stack-lg">
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-outline-variant/50"></div>
                
                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <div key={step} className="relative">
                      <div className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full ${isCurrent ? 'bg-forest-green ring-4 ring-forest-green/10' : isCompleted ? 'bg-forest-green' : 'bg-outline-variant'}`}></div>
                      <p className={`font-body-md text-body-md ${isCurrent ? 'font-semibold text-forest-green' : 'text-on-surface'}`}>
                        {step.replace(/_/g, ' ')}
                      </p>
                      {isCurrent && <p className="font-label-sm text-label-sm text-on-surface-variant">Last updated: {currentLoc.timestamp ? new Date(currentLoc.timestamp).toLocaleTimeString() : 'Recently'}</p>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assistance Card */}
            <div className="bg-surface-container-low p-stack-lg rounded-sm border border-outline-variant/30 flex items-start gap-4 hover:border-forest-green/30 transition-all">
              <span className="material-symbols-outlined text-forest-green">support_agent</span>
              <div>
                <h4 className="font-headline-md text-headline-md text-forest-green mb-2 text-[20px]">Dedicated Concierge</h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-[14px]">Our support team is available 24/7 to assist with your delivery logistics.</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tracking;
