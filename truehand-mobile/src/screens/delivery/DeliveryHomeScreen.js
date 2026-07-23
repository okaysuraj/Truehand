import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useDeliveryStore } from '../../store/useDeliveryStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function DeliveryHomeScreen() {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  
  const deliveries = useDeliveryStore(state => state.deliveries);
  const fetchDeliveries = useDeliveryStore(state => state.fetchDeliveries);

  React.useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artisan Delivery</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-circle-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Welcome & Status */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greetingText}>GOOD MORNING, {user?.name?.toUpperCase() || 'PARTNER'}</Text>
          <View style={styles.statusRow}>
            <Text style={styles.dashboardTitle}>Dashboard</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>

        {/* Bento Grid */}
        <View style={styles.bentoGrid}>
          <View style={styles.row}>
            {/* Today's Deliveries */}
            <View style={styles.bentoCard}>
              <Ionicons name="car-outline" size={24} color={colors['forest-green']} style={styles.bentoIcon} />
              <View>
                <Text style={styles.bentoValue}>{deliveries.length}</Text>
                <Text style={styles.bentoLabel}>DELIVERIES</Text>
              </View>
            </View>

            {/* Total Earnings */}
            <View style={styles.bentoCard}>
              <Ionicons name="wallet-outline" size={24} color={colors['forest-green']} style={styles.bentoIcon} />
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={styles.bentoValue}>$142</Text>
                  <Text style={styles.bentoValueDecimal}>.50</Text>
                </View>
                <Text style={styles.bentoLabel}>EARNINGS</Text>
              </View>
            </View>
          </View>

          {/* Quick Action */}
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('AssignedDeliveriesList')}
            activeOpacity={0.8}
          >
            <Ionicons name="scan-outline" size={32} color={colors['on-primary']} style={{ marginBottom: 8 }} />
            <Text style={styles.actionLabel}>View Deliveries & Scan</Text>
          </TouchableOpacity>
        </View>

        {/* Current Location / Map View */}
        <View style={styles.routeSection}>
          <View style={styles.routeHeader}>
            <Text style={styles.routeTitle}>Current Route</Text>
            <TouchableOpacity style={styles.routeDetailsBtn} onPress={() => navigation.navigate('DeliveryLiveMap')}>
              <Text style={styles.routeDetailsText}>View Details</Text>
              <Ionicons name="chevron-forward" size={16} color={colors['forest-green']} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.mapContainer} 
            activeOpacity={0.9}
            onPress={() => navigation.navigate('DeliveryLiveMap')}
          >
            <ImageBackground
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXR4HDaMBrJIY_TW6RR8J7LxN8JMGfAzUPLs_rgCdangs5a4IDNUpGdu3pEeXsrGS5BBNTCvqI2f0TLnXIV69LhrFvtnWoHDMXkMp7ohsp9ZzNmw8QoV-2WPi6QyTRT-Vv3DxIhcokUMWgt3W_bc7eMhArbAXKFJ7aYTFOoKw8Iz0HTswN9Fb5xj_YY-qWKM8xabGkLrTudDy56oxmckV7CfzFcw8cdhv-TqZ0J1VeCHaG-_4QXDUlFA' }}
              style={styles.mapImage}
            >
              <View style={styles.mapOverlay}>
                <View style={styles.mapIconBg}>
                  <Ionicons name="navigate" size={20} color={colors['forest-green']} />
                </View>
                <View>
                  <Text style={styles.overlayTitle}>Heading to Drop-off</Text>
                  <Text style={styles.overlaySubtitle}>12 min away • 2.4 miles</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
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
    marginLeft: -8,
    marginRight: -8,
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
  welcomeSection: {
    marginBottom: spacing.stackLg,
  },
  greetingText: {
    ...typography.labelMd,
    color: colors['clay-outline'],
    letterSpacing: 1,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashboardTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['surface-container-high'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors['forest-green'],
  },
  statusText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  bentoGrid: {
    marginBottom: spacing.stackLg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  bentoCard: {
    flex: 1,
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackMd,
    height: 120,
    justifyContent: 'space-between',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  bentoIcon: {
    opacity: 0.7,
  },
  bentoValue: {
    ...typography.displayLg,
    color: colors['forest-green'],
    fontSize: 40,
  },
  bentoValueDecimal: {
    ...typography.bodyLg,
    color: colors['clay-outline'],
  },
  bentoLabel: {
    ...typography.labelSm,
    color: colors['clay-outline'],
    letterSpacing: 1,
    marginTop: 4,
  },
  actionCard: {
    backgroundColor: colors['forest-green'],
    borderRadius: 12,
    padding: spacing.stackMd,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionLabel: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  routeSection: {
    marginBottom: spacing.sectionGap,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  routeTitle: {
    ...typography.bodyLg,
    color: colors.charcoal,
  },
  routeDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  routeDetailsText: {
    ...typography.labelSm,
    color: colors['forest-green'],
  },
  mapContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors['surface-container'],
  },
  mapImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  mapOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mapIconBg: {
    backgroundColor: colors['surface-container'],
    padding: 8,
    borderRadius: 20,
  },
  overlayTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  overlaySubtitle: {
    ...typography.labelSm,
    color: colors['clay-outline'],
    marginTop: 2,
  },
});
