import { useEffect, useState, useRef } from 'react';

export const useWebSocketTracking = (orderId) => {
  const [trackingData, setTrackingData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [status, setStatus] = useState('');
  const wsRef = useRef(null);

  useEffect(() => {
    if (!orderId) return;

    // Determine WebSocket URL
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProtocol}//localhost:8080/ws/tracking`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('connected');
        console.log('WebSocket connected');
        
        // Subscribe to order tracking
        const subscribeMsg = {
          action: 'SUBSCRIBE',
          orderId: orderId,
          data: ''
        };
        ws.send(JSON.stringify(subscribeMsg));
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === 'LOCATION_UPDATE') {
            setTrackingData({
              latitude: message.latitude,
              longitude: message.longitude,
              accuracy: message.accuracy,
              timestamp: message.timestamp,
              status: message.status
            });
          } else if (message.type === 'STATUS_UPDATE') {
            setStatus(message.message);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
        console.log('WebSocket disconnected');
      };

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setConnectionStatus('error');
    }
  }, [orderId]);

  return {
    trackingData,
    connectionStatus,
    status
  };
};
