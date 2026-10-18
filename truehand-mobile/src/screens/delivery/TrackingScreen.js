import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import api from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import {
  createDeliveryTrackingHook,
  canManageDelivery,
  canShareDeliveryLocation,
  deliveryActionEndpoint,
  mapLink,
} from '../../../../shared/delivery-tracking';
import { useDeliveryLocation } from '../../services/delivery-location';
import { formatValue } from '../../../../shared/feature-contract';
import MarketplaceFeature from '../../components/MarketplaceFeature';
const useDeliveryTracking = createDeliveryTrackingHook(React, api);
const button = {
  borderWidth: 1,
  borderColor: '#c1c8c3',
  padding: 14,
  marginVertical: 8,
};
export default function TrackingScreen({ route, navigation }) {
  const id = route?.params?.orderId || route?.params?.id;
  const user = useAuthStore((state) => state.user);
  const { delivery, events, error, loading, reload } = useDeliveryTracking(id, user?.id);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const manage = canManageDelivery(delivery, user);
  const point = delivery?.currentLocation;
  const sharing = useDeliveryLocation(id, user, delivery);
  const embeddedMap =
    Platform.OS === 'ios' ||
    Constants.executionEnvironment === 'storeClient' ||
    !!process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY;
  async function act(path, body) {
    setBusy(true);
    setNotice('');
    try {
      await api.post(deliveryActionEndpoint(id, path), body);
      setNotice(
        path === 'handover-code'
          ? 'Handover email queued to the customer.'
          : path === 'verify-otp'
            ? 'Handover code verified.'
            : 'Saved.',
      );
      reload();
    } catch (failure) {
      setNotice(failure.response?.data?.error || 'Unable to save. Please retry.');
    } finally {
      setBusy(false);
    }
  }
  if (!id)
    return (
      <MarketplaceFeature
        feature={user?.role === 'DELIVERY' ? 'delivery-tasks' : 'orders'}
        route={route}
        navigation={navigation}
      />
    );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fcf9f8',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          gap: 16,
          paddingBottom: 60,
        }}
      >
        <TouchableOpacity style={button} onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Delivery tracking
        </Text>
        {!user ? (
          <TouchableOpacity style={button} onPress={() => navigation.navigate('Login')}>
            <Text>Sign in to view delivery tracking</Text>
          </TouchableOpacity>
        ) : (
          <>
            {loading && <ActivityIndicator />}
            {!!error && (
              <View>
                <Text accessibilityRole="alert">{error}</Text>
                <TouchableOpacity style={button} onPress={reload}>
                  <Text>Retry</Text>
                </TouchableOpacity>
              </View>
            )}
            {!!notice && <Text accessibilityRole="alert">{notice}</Text>}
            {delivery && (
              <>
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  {delivery.order.orderNumber}
                </Text>
                <Text>Delivery status: {delivery.status}</Text>
                <Text>Order status: {delivery.order.status}</Text>
                <Text>Delivery address: {delivery.order.deliveryAddress}</Text>
                <Text>
                  Estimated delivery: {formatValue(delivery.estimatedDeliveryTime, 'date')}
                </Text>
                <Text>Delivered: {formatValue(delivery.actualDeliveryTime, 'date')}</Text>
                <Text>
                  Delivery partner:{' '}
                  {delivery.deliveryBoy
                    ? [delivery.deliveryBoy.firstName, delivery.deliveryBoy.lastName]
                        .filter(Boolean)
                        .join(' ')
                    : 'Awaiting assignment'}
                </Text>
                {point ? (
                  <>
                    {embeddedMap && (
                      <MapView
                        key={`${point.latitude}:${point.longitude}`}
                        style={{
                          height: 360,
                          width: '100%',
                        }}
                        initialRegion={{
                          latitude: Number(point.latitude),
                          longitude: Number(point.longitude),
                          latitudeDelta: 0.02,
                          longitudeDelta: 0.02,
                        }}
                      >
                        <Marker
                          coordinate={{
                            latitude: Number(point.latitude),
                            longitude: Number(point.longitude),
                          }}
                          title="Latest reported delivery location"
                        />
                      </MapView>
                    )}
                    <Text>Last location update: {formatValue(point.timestamp, 'date')}</Text>
                    <TouchableOpacity
                      style={button}
                      onPress={() =>
                        Linking.openURL(mapLink(point)).catch(() =>
                          setNotice('Unable to open maps.'),
                        )
                      }
                    >
                      <Text>Open location in maps</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text>No delivery location has been reported.</Text>
                )}
                {manage && (
                  <View>
                    {delivery.status === 'ASSIGNED' && (
                      <TouchableOpacity disabled={busy} style={button} onPress={() => act('start')}>
                        <Text>Start delivery</Text>
                      </TouchableOpacity>
                    )}
                    {delivery.status === 'IN_TRANSIT' && (
                      <>
                        <TouchableOpacity
                          disabled={busy}
                          style={button}
                          onPress={() => act('handover-code')}
                        >
                          <Text>Send handover code</Text>
                        </TouchableOpacity>
                        <Text>Customer handover code</Text>
                        <TextInput
                          style={button}
                          accessibilityLabel="Customer handover code"
                          keyboardType="number-pad"
                          maxLength={6}
                          value={code}
                          onChangeText={setCode}
                        />
                        <TouchableOpacity
                          style={button}
                          disabled={busy || !/^\d{6}$/.test(code)}
                          onPress={() =>
                            act('verify-otp', {
                              otp: code,
                            })
                          }
                        >
                          <Text>Verify handover code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={button}
                          disabled={busy}
                          onPress={() => act('complete')}
                        >
                          <Text>Complete delivery</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                )}
                {canShareDeliveryLocation(delivery, user) && (
                  <View>
                    <TouchableOpacity style={button} onPress={sharing.toggle}>
                      <Text>{sharing.enabled ? 'Stop GPS sharing' : 'Share live GPS'}</Text>
                    </TouchableOpacity>
                    <Text>GPS sharing runs while this delivery screen is in the foreground.</Text>
                    {sharing.lastSent && (
                      <Text>Last GPS sent: {formatValue(sharing.lastSent, 'date')}</Text>
                    )}
                    {!!sharing.error && <Text accessibilityRole="alert">{sharing.error}</Text>}
                  </View>
                )}
                <TouchableOpacity
                  style={button}
                  onPress={() =>
                    navigation.navigate('ContactDeliveryAgent', {
                      orderId: id,
                      id,
                    })
                  }
                >
                  <Text>Delivery conversation</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  Order timeline
                </Text>
                {!events.length && <Text>No timeline events recorded.</Text>}
                {events.map((event) => (
                  <View style={button} key={event.id}>
                    <Text>{event.status}</Text>
                    <Text>{event.message}</Text>
                    <Text>{formatValue(event.createdAt, 'date')}</Text>
                  </View>
                ))}
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  Order items
                </Text>
                {delivery.order.orderItems.map((item) => (
                  <Text key={item.id}>
                    {item.productName} {item.variantDescription || item.variantSku} ×{' '}
                    {item.quantity}
                  </Text>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
