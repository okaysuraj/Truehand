import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

  if (loading) return <div style={{padding: 40, textAlign: 'center'}}>Loading tracking details...</div>;
  if (!delivery) return <div style={{padding: 40, textAlign: 'center'}}>Delivery information not available yet.</div>;

  const currentLoc = delivery.currentLocation || { latitude: 12.9716, longitude: 77.5946 };
  const position = [currentLoc.latitude, currentLoc.longitude];

  const steps = ['PENDING', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const currentStepIndex = steps.indexOf(delivery.status);

  return (
    <div style={{background: '#eaeded', minHeight: '100vh', padding: '20px 0'}}>
      <div style={{maxWidth: 1000, margin: '0 auto', background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
          <h2 style={{margin: 0, fontWeight: 300}}>Track your package</h2>
          <div style={{color: '#565959'}}>Order #{id}</div>
        </div>

        {/* Progress Bar */}
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 30, position: 'relative'}}>
          <div style={{position: 'absolute', top: 15, left: 0, right: 0, height: 4, background: '#eee', zIndex: 1}}></div>
          <div style={{
            position: 'absolute', top: 15, left: 0, height: 4, background: '#007600', zIndex: 2,
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`, transition: 'width 0.5s ease'
          }}></div>
          
          {steps.map((step, idx) => (
            <div key={step} style={{position: 'relative', zIndex: 3, textAlign: 'center', width: 100}}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%', background: idx <= currentStepIndex ? '#007600' : '#ddd',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
                fontWeight: 'bold', border: '3px solid #fff'
              }}>
                {idx < currentStepIndex ? '✓' : idx + 1}
              </div>
              <div style={{fontSize: 12, marginTop: 8, fontWeight: idx === currentStepIndex ? 'bold' : 'normal'}}>
                {step.replace(/_/g, ' ')}
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div style={{height: 400, borderRadius: 8, overflow: 'hidden', border: '1px solid #ddd', marginBottom: 20}}>
          <MapContainer center={position} zoom={15} style={{height: '100%', width: '100%'}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeView center={position} />
            <Marker position={position} icon={truckIcon}>
              <Popup>
                Your package is here.<br/>
                Last updated: {currentLoc.timestamp ? new Date(currentLoc.timestamp).toLocaleTimeString() : 'Just now'}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontSize: 14, color: '#565959'}}>
            Estimated Delivery: {delivery.estimatedDeliveryTime ? new Date(delivery.estimatedDeliveryTime).toLocaleString() : 'Pending'}
          </div>
          
          {/* Debug Button to move the truck */}
          {delivery.status !== 'DELIVERED' && (
            <button 
              onClick={simulateMovement}
              style={{background: '#f0c14b', border: '1px solid #a88734', padding: '6px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 13}}
            >
              Simulate Truck Movement (Debug)
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Tracking;
