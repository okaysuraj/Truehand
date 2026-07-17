import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { useDeliveryStore } from '../store/useDeliveryStore';

export default function AssignedDeliveriesListScreen() {
  const navigation = useNavigation();
  const deliveries = useDeliveryStore(state => state.deliveries);
  const startDelivery = useDeliveryStore(state => state.startDelivery);
  const setActiveDelivery = useDeliveryStore(state => state.setActiveDelivery);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artisan Delivery</Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Current Tasks</Text>
          <Text style={styles.pageSubtitle}>Manage your assigned pickups and deliveries.</Text>
        </View>

        <View style={styles.list}>
          {deliveries.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: colors.outline }}>No deliveries assigned.</Text>
          ) : (
            deliveries.map(delivery => {
              const isAssigned = delivery.status === 'ASSIGNED';
              const isInTransit = delivery.status === 'IN_TRANSIT';
              
              if (!isAssigned && !isInTransit) return null; // Only show active tasks

              return (
                <TouchableOpacity 
                  key={delivery.id}
                  style={styles.card}
                  activeOpacity={0.9}
                  onPress={() => {
                    setActiveDelivery(delivery);
                    navigation.navigate(isInTransit ? 'DeliveryLiveMap' : 'DeliveryDetail');
                  }}
                >
                  <View style={[styles.cardIndicator, { backgroundColor: isInTransit ? colors['forest-green'] : colors.secondary }]} />
                  <View style={styles.cardHeader}>
                    <Text style={styles.orderId}>ORDER #{delivery.orderId}</Text>
                    <View style={[styles.badge, { backgroundColor: isInTransit ? colors['primary-fixed'] : colors['secondary-fixed'] }]}>
                      <Ionicons name={isInTransit ? "car-outline" : "cube-outline"} size={14} color={isInTransit ? colors['on-primary-fixed-variant'] : colors['on-secondary-container']} />
                      <Text style={[styles.badgeText, { color: isInTransit ? colors['on-primary-fixed-variant'] : colors['on-secondary-container'] }]}>
                        {isInTransit ? 'In Transit' : 'Ready for Pickup'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.locationsBlock}>
                    <View style={styles.locationRow}>
                      <View style={styles.locationIconCol}>
                        <Ionicons name="storefront-outline" size={20} color={colors['clay-outline']} />
                        <View style={styles.verticalLine} />
                      </View>
                      <View style={styles.locationTextCol}>
                        <Text style={styles.locationLabel}>Pickup</Text>
                        <Text style={styles.locationTitle}>Seller Studio</Text>
                      </View>
                    </View>
                    <View style={styles.locationRow}>
                      <View style={styles.locationIconCol}>
                        <Ionicons name="location" size={20} color={colors['forest-green']} />
                      </View>
                      <View style={styles.locationTextCol}>
                        <Text style={styles.locationLabel}>Deliver To</Text>
                        <Text style={styles.locationTitle}>Customer Address</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <View style={styles.footerInfo}>
                      <Ionicons name="time-outline" size={16} color={colors['clay-outline']} />
                      <Text style={styles.footerInfoText}>Est. time pending</Text>
                    </View>
                    {isAssigned ? (
                      <TouchableOpacity 
                        style={styles.primaryButton}
                        onPress={() => startDelivery(delivery.orderId)}
                      >
                        <Text style={styles.primaryButtonText}>Start Delivery</Text>
                        <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity 
                        style={styles.secondaryButton} 
                        onPress={() => {
                          setActiveDelivery(delivery);
                          navigation.navigate('OTPDeliveryVerification');
                        }}
                      >
                        <Text style={styles.secondaryButtonText}>Mark Delivered</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
  },
  iconButton: {
    padding: spacing.stackSm,
    width: 40,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  pageHeader: {
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: 4,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  list: {
    gap: spacing.stackLg,
  },
  card: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    overflow: 'hidden',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    position: 'relative',
    padding: spacing.stackMd,
    paddingLeft: spacing.stackMd + 4,
  },
  cardIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.stackMd,
  },
  orderId: {
    ...typography.labelSm,
    color: colors['clay-outline'],
    letterSpacing: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    ...typography.labelSm,
  },
  locationsBlock: {
    marginBottom: spacing.stackLg,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  locationIconCol: {
    alignItems: 'center',
    width: 24,
  },
  verticalLine: {
    width: 1,
    height: 32,
    backgroundColor: colors['outline-variant'],
    marginVertical: 4,
  },
  locationTextCol: {
    flex: 1,
    paddingBottom: spacing.stackSm,
  },
  locationLabel: {
    ...typography.labelSm,
    color: colors['clay-outline'],
  },
  locationTitle: {
    ...typography.bodyMd,
    color: colors.charcoal,
    fontWeight: '600',
    marginTop: 2,
  },
  locationDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  productPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: spacing.stackMd,
    backgroundColor: colors['surface-container-low'],
    padding: 12,
    borderRadius: 8,
  },
  productThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  productTitle: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  productAlert: {
    fontSize: 10,
    color: colors['clay-outline'],
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors['surface-variant'],
    paddingTop: spacing.stackSm,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerInfoText: {
    ...typography.labelSm,
    color: colors['clay-outline'],
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.charcoal,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
});
