import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import { colors, typography, spacing } from '../theme/theme';

const { width } = Dimensions.get('window');

const STEPS = [
  { status: 'PENDING', label: 'Order placed', desc: 'Artisan has confirmed your order.', icon: 'cube-outline' },
  { status: 'IN_TRANSIT', label: 'In transit', desc: 'Departed sorting hub.', icon: 'airplane-outline' },
  { status: 'OUT_FOR_DELIVERY', label: 'Out for delivery', desc: 'Package is on its way to you.', icon: 'bicycle-outline' },
  { status: 'DELIVERED', label: 'Delivered', desc: 'Package arrived.', icon: 'checkmark-circle-outline' }
];

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
        <ActivityIndicator size="large" color={colors['forest-green']} />
        <Text style={styles.loadingText}>Loading Tracking Details...</Text>
      </View>
    );
  }

  const currentLoc = delivery.currentLocation || { latitude: 12.9716, longitude: 77.5946 };
  const currentStepIndex = STEPS.findIndex(s => s.status === delivery.status);

  // Get human readable status
  const getStatusLabel = () => {
    if (delivery.status === 'PENDING') return 'Order Confirmed';
    if (delivery.status === 'IN_TRANSIT') return 'In Transit';
    if (delivery.status === 'OUT_FOR_DELIVERY') return 'Out for Delivery';
    if (delivery.status === 'DELIVERED') return 'Delivered';
    return delivery.status;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>Artisan Goods</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bag-handle-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Status Header */}
        <View style={styles.statusHeader}>
          <Text style={styles.orderIdText}>ORDER #{id.toString().slice(0, 8).toUpperCase()}</Text>
          <Text style={styles.statusTitle}>{getStatusLabel()}</Text>
          <Text style={styles.etaText}>
            Arriving: {delivery.estimatedDeliveryTime ? new Date(delivery.estimatedDeliveryTime).toLocaleString() : 'Pending'}
          </Text>
        </View>

        {/* Map Container */}
        <View style={styles.mapWrapper}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: currentLoc.latitude,
              longitude: currentLoc.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLoc.latitude,
                longitude: currentLoc.longitude
              }}
            >
              <View style={styles.mapPinContainer}>
                <View style={styles.mapPinPulse} />
                <View style={styles.mapPinInner} />
              </View>
            </Marker>
          </MapView>
          
          <View style={styles.mapOverlay}>
            <View style={styles.etaCard}>
              <View style={styles.etaCardLeft}>
                <View style={styles.etaIconContainer}>
                  <Ionicons name="car" size={20} color={colors['forest-green']} />
                </View>
                <View>
                  <Text style={styles.etaCardTitle}>Current Status</Text>
                  <Text style={styles.etaCardDesc}>{getStatusLabel()}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Debug Controls */}
        {delivery.status !== 'DELIVERED' && (
          <TouchableOpacity style={styles.simulateBtn} onPress={simulateMovement}>
            <Text style={styles.simulateBtnText}>Simulate Movement (Debug)</Text>
          </TouchableOpacity>
        )}

        {/* Timeline */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Tracking History</Text>
          </View>
          
          <View style={styles.timelineContainer}>
            {STEPS.map((step, idx) => {
              // Reversed order for display: newest at top if we want, but let's stick to chronological top-down
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              const isFuture = idx > currentStepIndex;
              const isLast = idx === STEPS.length - 1;

              let iconBgColor = colors['surface-container-high'];
              let iconColor = colors['forest-green'];
              
              if (isActive || isPast) {
                iconBgColor = colors['forest-green'];
                iconColor = colors['on-primary'];
              }

              return (
                <View key={step.status} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={[styles.timelineIconContainer, { backgroundColor: iconBgColor }]}>
                      <Ionicons name={isActive || isPast ? "checkmark" : step.icon} size={14} color={iconColor} />
                    </View>
                    {!isLast && <View style={[styles.timelineLine, (isActive || isPast) && {backgroundColor: colors['forest-green']}]} />}
                  </View>
                  
                  <View style={[styles.timelineRight, isFuture && {opacity: 0.5}]}>
                    <Text style={styles.timelineStepTitle}>{step.label}</Text>
                    <Text style={styles.timelineStepDesc}>{step.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Package Contents */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Package Contents</Text>
          </View>
          
          <View style={styles.packageItem}>
            <View style={styles.packageImageContainer}>
              <Ionicons name="gift-outline" size={32} color={colors.outline} />
            </View>
            <View style={styles.packageDetails}>
              <Text style={styles.packageName}>TrueHand Artisan Order</Text>
              <Text style={styles.packageDesc}>Qty: 1 • Authentic Craft</Text>
              <Text style={styles.packagePrice}>View Receipt for Details</Text>
            </View>
          </View>

          <View style={styles.packageActions}>
            <TouchableOpacity style={styles.primaryActionBtn}>
              <Ionicons name="receipt-outline" size={18} color={colors['on-primary']} />
              <Text style={styles.primaryActionText}>View Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryActionBtn}>
              <Ionicons name="headset-outline" size={18} color={colors.charcoal} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors['surface-linen'],
  },
  loadingText: {
    ...typography.bodyMd,
    color: colors.outline,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
  },
  brandTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  iconButton: {
    padding: spacing.stackSm,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  statusHeader: {
    marginBottom: spacing.stackLg,
    alignItems: 'center',
  },
  orderIdText: {
    ...typography.labelSm,
    color: colors.terracotta,
    marginBottom: spacing.stackSm,
  },
  statusTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
  },
  etaText: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  mapWrapper: {
    width: '100%',
    height: 350,
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.stackLg,
    borderWidth: 1,
    borderColor: colors['surface-container-low'],
  },
  map: {
    flex: 1,
  },
  mapPinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  mapPinPulse: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(22, 52, 40, 0.2)',
    borderWidth: 1,
    borderColor: colors['forest-green'],
  },
  mapPinInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors['forest-green'],
  },
  mapOverlay: {
    position: 'absolute',
    bottom: spacing.stackMd,
    left: spacing.stackMd,
    right: spacing.stackMd,
  },
  etaCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: spacing.stackMd,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  etaCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
  },
  etaIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['surface-container-high'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaCardTitle: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  etaCardDesc: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  simulateBtn: {
    backgroundColor: colors.terracotta,
    padding: spacing.stackMd,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  simulateBtnText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  cardContainer: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.gutter,
    marginBottom: spacing.stackLg,
    borderWidth: 1,
    borderColor: colors['surface-container-low'],
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-low'],
    paddingBottom: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  cardTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  timelineContainer: {
    paddingTop: spacing.stackSm,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: spacing.stackMd,
    marginBottom: spacing.stackLg,
  },
  timelineLeft: {
    alignItems: 'center',
  },
  timelineIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    height: '100%',
    backgroundColor: colors['surface-container-high'],
    position: 'absolute',
    top: 24,
    zIndex: 1,
  },
  timelineRight: {
    flex: 1,
    paddingBottom: spacing.stackSm,
  },
  timelineStepTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  timelineStepDesc: {
    ...typography.bodyMd,
    fontSize: 14,
    color: colors['on-surface-variant'],
  },
  packageItem: {
    flexDirection: 'row',
    gap: spacing.stackMd,
    alignItems: 'center',
  },
  packageImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors['surface-container'],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageDetails: {
    flex: 1,
  },
  packageName: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  packageDesc: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginTop: 4,
  },
  packagePrice: {
    ...typography.labelMd,
    color: colors.terracotta,
    marginTop: 8,
  },
  packageActions: {
    flexDirection: 'row',
    gap: spacing.stackSm,
    marginTop: spacing.stackLg,
    paddingTop: spacing.stackLg,
    borderTopWidth: 1,
    borderTopColor: colors['surface-container-low'],
  },
  primaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors['forest-green'],
    paddingVertical: 12,
    borderRadius: 4,
  },
  primaryActionText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.charcoal,
    borderRadius: 4,
  }
});
