import React from 'react';
import { AppState } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import api from './api';
import { createLocationSharingHook } from '../../../shared/delivery-tracking';
async function watch(onLocation, onError) {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted)
    throw new Error('Location access was not granted. Enable it in device settings to share GPS.');
  const subscription = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 10000,
      distanceInterval: 10,
    },
    (position) => onLocation(position.coords),
    (message) => onError(new Error(message)),
  );
  return () => subscription.remove();
}
const useSharing = createLocationSharingHook(React, api, watch);
export function useDeliveryLocation(id, user, delivery) {
  const focused = useIsFocused();
  const [active, setActive] = React.useState(AppState.currentState === 'active');
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (value) =>
      setActive(value === 'active'),
    );
    return () => subscription.remove();
  }, []);
  return useSharing(id, user, delivery, focused && active);
}
