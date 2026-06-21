import React, { useEffect, useState } from 'react';
import { useWebSocketTracking } from '../hooks/useWebSocketTracking';
import '../styles/LiveTracking.css';

const LiveTracking = ({ orderId }) => {
  const { trackingData, connectionStatus, status } = useWebSocketTracking(orderId);
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    if (trackingData) {
      setDriverLocation({
        lat: parseFloat(trackingData.latitude),
        lng: parseFloat(trackingData.longitude)
      });
    }
  }, [trackingData]);

  return (
    <div className="live-tracking-container">
      <div className="tracking-header">
        <h3>📍 Live Delivery Tracking</h3>
        <div className={`connection-status ${connectionStatus}`}>
          <span className="status-dot"></span>
          {connectionStatus === 'connected' ? 'Live' : 'Connecting...'}
        </div>
      </div>

      {connectionStatus === 'connected' ? (
        <div className="tracking-content">
          <div className="map-placeholder">
            <div className="map-container">
              {driverLocation ? (
                <div className="location-info">
                  <p>📍 Driver Location:</p>
                  <p className="coordinates">
                    Lat: {driverLocation.lat.toFixed(4)}, Lng: {driverLocation.lng.toFixed(4)}
                  </p>
                  {trackingData?.accuracy && (
                    <p className="accuracy">Accuracy: {trackingData.accuracy.toFixed(1)}m</p>
                  )}
                </div>
              ) : (
                <p className="waiting-message">Waiting for location update...</p>
              )}
            </div>
          </div>

          <div className="tracking-details">
            <div className="detail-item">
              <label>Order Status:</label>
              <p className="status-badge">{trackingData?.status || 'In Transit'}</p>
            </div>

            <div className="detail-item">
              <label>Status Message:</label>
              <p>{status || 'Your delivery is on the way'}</p>
            </div>

            {trackingData?.timestamp && (
              <div className="detail-item">
                <label>Last Update:</label>
                <p>{new Date(trackingData.timestamp).toLocaleTimeString()}</p>
              </div>
            )}
          </div>

          <div className="tracking-stats">
            <div className="stat">
              <span className="stat-label">Status</span>
              <span className="stat-value">{trackingData?.status || 'PENDING'}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Connection</span>
              <span className="stat-value">LIVE</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="connection-error">
          <p>Connecting to live tracking service...</p>
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LiveTracking;
