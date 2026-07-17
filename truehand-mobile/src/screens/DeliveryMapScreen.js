import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

const DeliveryMapScreen = ({ navigation }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [routeData, setRouteData] = useState(null);

  // Mock location for demo
  const [location, setLocation] = useState({ lat: 12.9716, lng: 77.5946 });

  useEffect(() => {
    // Start background pinging
    const interval = setInterval(() => {
      sendLocationPing();
    }, 15000); // 15 seconds
    return () => clearInterval(interval);
  }, [user]);

  const sendLocationPing = async () => {
    if (!user) return;
    try {
      setPinging(true);
      await api.post(`/delivery/fleet/${user.id}/ping`, location);
    } catch (err) {
      console.error('Failed to ping location', err);
    } finally {
      setPinging(false);
    }
  };

  const getOptimizedRoute = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.post('/delivery/route-optimization', { agentId: user.id });
      setRouteData(res.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch optimized route');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Delivery Map</Text>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, pinging && styles.statusDotActive]} />
          <Text style={styles.statusText}>{pinging ? 'Syncing...' : 'Online'}</Text>
        </View>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map Integration Required</Text>
        <Text style={styles.mapSubText}>React Native Maps / Google Maps API key needed.</Text>
        <Text style={styles.coordText}>Current: {location.lat}, {location.lng}</Text>
        
        {routeData && (
          <View style={styles.routeOverlay}>
            <Text style={styles.routeTitle}>Route Active</Text>
            <Text style={styles.routeStat}>{(routeData.totalDistanceMeters / 1000).toFixed(1)} km remaining</Text>
            <Text style={styles.routeStat}>{Math.round(routeData.estimatedDurationSeconds / 60)} mins est.</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.actionBtn} 
          onPress={getOptimizedRoute}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.actionBtnText}>Optimize Route</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionBtn, styles.secondaryBtn]}
          onPress={() => navigation.navigate('OTPDeliveryVerification')}
        >
          <Text style={styles.secondaryBtnText}>Verify OTP & Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFDF9',
  },
  header: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E3DD',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1C19',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusDotActive: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    color: '#2E6C36',
    fontWeight: 'bold',
    fontSize: 12,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#757575',
  },
  mapSubText: {
    color: '#9E9E9E',
    marginTop: 8,
  },
  coordText: {
    marginTop: 16,
    fontFamily: 'monospace',
    color: '#2E6C36',
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 4,
  },
  routeOverlay: {
    position: 'absolute',
    top: 24,
    left: 24,
    right: 24,
    backgroundColor: '#2E6C36',
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  routeTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  routeStat: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E3DD',
    gap: 12,
  },
  actionBtn: {
    backgroundColor: '#2E6C36',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2E6C36',
  },
  secondaryBtnText: {
    color: '#2E6C36',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeliveryMapScreen;
