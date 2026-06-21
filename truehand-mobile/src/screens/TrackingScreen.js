import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

const { width } = Dimensions.get('window');

const STEPS = ['PENDING', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'];

export default function TrackingScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  const fetchDelivery = async () => {
    try {
      const res = await api.get(`/deliveries/${id}`);
      setDelivery(res.data);
      setLoading(false);
      
      // Animate map to new coordinate if available
      if (res.data?.currentLocation && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: res.data.currentLocation.latitude,
          longitude: res.data.currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      }
    } catch (err) {
      console.error('Error fetching delivery:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDelivery();
    const interval = setInterval(() => {
      fetchDelivery();
    }, 3000);
    return () => clearInterval(interval);
  }, [id]);

  const simulateMovement = async () => {
    try {
      await api.post(`/deliveries/${id}/simulate`);
      fetchDelivery();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !delivery) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007185" />
        <Text style={{marginTop: 10}}>Loading Tracking Details...</Text>
      </View>
    );
  }

  const currentLoc = delivery.currentLocation || { latitude: 12.9716, longitude: 77.5946 };
  const currentStepIndex = STEPS.indexOf(delivery.status);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backBtn}>
          <Ionicons name="home" size={24} color="#0f1111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Package</Text>
      </View>

      <View style={styles.container}>
        
        {/* Order Details */}
        <View style={styles.infoBox}>
          <Text style={styles.orderId}>Order #{id}</Text>
          <Text style={styles.estDelivery}>
            Estimated Delivery: {delivery.estimatedDeliveryTime ? new Date(delivery.estimatedDeliveryTime).toLocaleString() : 'Pending'}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLineBackground} />
          <View style={[styles.progressLineFill, { width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }]} />
          
          {STEPS.map((step, idx) => (
            <View key={step} style={styles.stepNode}>
              <View style={[styles.stepCircle, idx <= currentStepIndex && styles.stepCircleActive]}>
                {idx < currentStepIndex ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : (
                  <Text style={[styles.stepText, idx === currentStepIndex && styles.stepTextActive]}>{idx + 1}</Text>
                )}
              </View>
              <Text style={[styles.stepLabel, idx === currentStepIndex && styles.stepLabelActive]}>
                {step.replace(/_/g, ' ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: currentLoc.latitude,
              longitude: currentLoc.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLoc.latitude,
                longitude: currentLoc.longitude
              }}
              title="Your Package"
              description={`Last updated: ${currentLoc.timestamp ? new Date(currentLoc.timestamp).toLocaleTimeString() : 'Just now'}`}
            >
              {/* Custom Truck Icon using Ionicons */}
              <View style={styles.markerCircle}>
                <Ionicons name="car" size={20} color="#fff" />
              </View>
            </Marker>
          </MapView>
        </View>

        {/* Debug Controls */}
        {delivery.status !== 'DELIVERED' && (
          <TouchableOpacity style={styles.simulateBtn} onPress={simulateMovement}>
            <Text style={styles.simulateBtnText}>Simulate Truck Movement (Debug)</Text>
          </TouchableOpacity>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeded',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backBtn: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  container: {
    flex: 1,
    backgroundColor: '#eaeded',
    padding: 15,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f1111',
    marginBottom: 5,
  },
  estDelivery: {
    fontSize: 14,
    color: '#555',
  },
  progressContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  progressLineBackground: {
    position: 'absolute',
    top: 32, // approx middle of circle
    left: 30,
    right: 30,
    height: 4,
    backgroundColor: '#eee',
    zIndex: 1,
  },
  progressLineFill: {
    position: 'absolute',
    top: 32,
    left: 30,
    height: 4,
    backgroundColor: '#007600',
    zIndex: 2,
  },
  stepNode: {
    alignItems: 'center',
    width: width / 5,
    zIndex: 3,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    borderWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: '#007600',
  },
  stepText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepTextActive: {
    color: '#fff',
  },
  stepLabel: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#0f1111',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  markerCircle: {
    backgroundColor: '#007185',
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  simulateBtn: {
    backgroundColor: '#f0c14b',
    borderWidth: 1,
    borderColor: '#a88734',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  simulateBtnText: {
    color: '#0f1111',
    fontWeight: 'bold',
    fontSize: 15,
  }
});
