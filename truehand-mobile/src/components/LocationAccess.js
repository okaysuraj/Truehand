import React, { useState } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { colors } from '../theme/theme';
export default function LocationAccess({ navigation }) {
  const [state, setState] = useState({ busy: false, position: null, error: '' });
  async function request() {
    setState({ busy: true, position: null, error: '' });
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted')
        throw new Error(
          'Location permission was denied. You can change it in your device settings.',
        );
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setState({ busy: false, position: position.coords, error: '' });
    } catch (error) {
      setState({
        busy: false,
        position: null,
        error: error.message || 'Unable to get your location.',
      });
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors['surface-linen'] }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
        <Text style={{ fontSize: 32, color: colors['forest-green'] }}>Location access</Text>
        <Text>
          Location access supports address coordinates and delivery tracking. Couriers can share
          their location from an assigned delivery while that screen is open.
        </Text>
        <TouchableOpacity disabled={state.busy} accessibilityRole="button" onPress={request}>
          <Text>{state.busy ? 'Getting location…' : 'Allow location access'}</Text>
        </TouchableOpacity>
        {!!state.error && <Text accessibilityRole="alert">{state.error}</Text>}
        {state.position && (
          <Text>
            Reported location: {state.position.latitude.toFixed(6)},{' '}
            {state.position.longitude.toFixed(6)}. Accuracy: {Math.round(state.position.accuracy)}{' '}
            m.
          </Text>
        )}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Return to marketplace</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
