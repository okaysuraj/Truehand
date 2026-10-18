import React from 'react';
import api from './api';
import { createLocationSharingHook } from '../../../shared/delivery-tracking';
function watch(onLocation, onError) {
  if (!navigator.geolocation) throw new Error('This browser does not support GPS sharing.');
  const watcher = navigator.geolocation.watchPosition(
    (position) => onLocation(position.coords),
    onError,
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
  );
  return () => navigator.geolocation.clearWatch(watcher);
}
const useSharing = createLocationSharingHook(React, api, watch);
export function useDeliveryLocation(id, user, delivery) {
  const [visible, setVisible] = React.useState(!document.hidden);
  React.useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return useSharing(id, user, delivery, visible);
}
