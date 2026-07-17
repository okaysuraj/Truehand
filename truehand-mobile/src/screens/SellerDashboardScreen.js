import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { useArtisanStore } from '../store/useArtisanStore';
import { useAuthStore } from '../store/useAuthStore';

export default function SellerDashboardScreen() {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  
  const stats = useArtisanStore(state => state.stats);
  const orders = useArtisanStore(state => state.orders);
  const fetchStats = useArtisanStore(state => state.fetchStats);
  const fetchOrders = useArtisanStore(state => state.fetchOrders);

  React.useEffect(() => {
    fetchStats();
    fetchOrders();
  }, [fetchStats, fetchOrders]);

  const recentOrders = orders.slice(0, 3);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5xvn8UzZM89rNRYtefG-jIUU5hKMBoxKE9Ql14gCuFHrlOBTrfDkRjqxd_Tdl2wcLyDK9r1dBFwdbfnIUAlHPI_0EvWVO_03B_lCdilbh6rP9GVEf5pmuPCtSg6g-lTfcoB7kro6Grsn_2JOCL5cFJghEjANVFFrASbnu7XT3aURKpj1zsOIaS9yxn83Dy5p38lnLAIGLrGCQ9mM75PWbMT7Z0f1GUU3a8RyCEsKFrAtLM1COyYhq1Q' }} 
            style={styles.avatarImage} 
          />
        </View>
        <Text style={styles.headerTitle}>Artisan Studio</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Welcome Module */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greetingText}>Good morning</Text>
          <Text style={styles.welcomeTitle}>Welcome back, {user?.name || 'Artisan'}</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions} contentContainerStyle={styles.quickActionsContent}>
            <TouchableOpacity 
              style={styles.primaryActionBtn}
              onPress={() => navigation.navigate('AddEditProduct')}
            >
              <Ionicons name="add" size={18} color={colors['on-primary']} />
              <Text style={styles.primaryActionText}>New Listing</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryActionBtn}>
              <Ionicons name="camera-outline" size={18} color={colors.charcoal} />
              <Text style={styles.secondaryActionText}>Capture Draft</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <View style={styles.cardHalf}>
            <View style={styles.cardHeader}>
              <Ionicons name="wallet-outline" size={20} color={colors['forest-green']} />
              <View style={styles.trendBadge}>
                <Ionicons name="trending-up" size={12} color={colors['forest-green']} />
                <Text style={styles.trendText}>12%</Text>
              </View>
            </View>
            <View>
              <Text style={styles.cardLabel}>Total Revenue</Text>
              <Text style={styles.cardValue}>${stats?.totalRevenue?.toFixed(2) || '0.00'}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.cardHalf}
            onPress={() => navigation.navigate('OrderFulfillment')}
          >
            <View style={styles.cardErrorBg} />
            <View style={styles.cardHeader}>
              <Ionicons name="cube-outline" size={20} color={colors['forest-green']} />
              <View style={styles.pulseDot} />
            </View>
            <View>
              <Text style={styles.cardLabel}>To Fulfill</Text>
              <Text style={styles.cardValue}>
                {stats?.pendingOrdersCount || 0} <Text style={styles.cardUnit}>orders</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.cardFull}>
            <View style={styles.storeVisitsHeader}>
              <View style={styles.visitsIconBg}>
                <Ionicons name="eye-outline" size={20} color={colors['forest-green']} />
              </View>
              <View>
                <Text style={styles.cardLabel}>Store Visits (7d)</Text>
                <Text style={styles.cardValueMd}>1,842</Text>
              </View>
            </View>
            <View style={styles.miniChart}>
              <View style={[styles.miniBar, { height: '30%' }]} />
              <View style={[styles.miniBar, { height: '50%' }]} />
              <View style={[styles.miniBar, { height: '40%' }]} />
              <View style={[styles.miniBar, { height: '80%' }]} />
              <View style={[styles.miniBar, { height: '60%' }]} />
              <View style={[styles.miniBar, { height: '100%' }]} />
            </View>
          </View>
        </View>

        {/* Studio Performance Chart Placeholder */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Studio Performance</Text>
            <View style={styles.timeFilter}>
              <Text style={styles.timeFilterText}>Last 7 Days</Text>
            </View>
          </View>
          
          <View style={styles.chartPlaceholder}>
            {/* Grid lines */}
            <View style={styles.gridLines}>
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
            </View>
            
            {/* Bars */}
            <View style={styles.barsContainer}>
              <View style={[styles.chartBar, { height: '40%' }]} />
              <View style={[styles.chartBar, { height: '65%' }]} />
              <View style={[styles.chartBar, { height: '30%' }]} />
              <View style={[styles.chartBar, { height: '85%' }]} />
              <View style={[styles.chartBar, { height: '55%' }]} />
              <View style={[styles.chartBarActive, { height: '100%' }]}>
                <View style={styles.chartTooltip}>
                  <Text style={styles.chartTooltipText}>$450</Text>
                </View>
              </View>
              <View style={[styles.chartBar, { height: '45%' }]} />
            </View>
          </View>
          
          <View style={styles.xAxis}>
            <Text style={styles.xLabel}>M</Text>
            <Text style={styles.xLabel}>T</Text>
            <Text style={styles.xLabel}>W</Text>
            <Text style={styles.xLabel}>T</Text>
            <Text style={styles.xLabel}>F</Text>
            <Text style={[styles.xLabel, styles.xLabelActive]}>S</Text>
            <Text style={styles.xLabel}>S</Text>
          </View>
        </View>

        {/* Recent Orders List */}
        <View style={styles.recentOrdersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => navigation.navigate('OrderFulfillment')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.orderList}>
            {recentOrders.length === 0 ? (
              <Text style={{ textAlign: 'center', padding: 20, color: colors.outline }}>No recent orders.</Text>
            ) : (
              recentOrders.map(order => {
                const item = order.orderItems?.[0];
                return (
                  <View key={order.id} style={styles.orderItem}>
                    <Image 
                      source={{ uri: item?.productImageUrl || 'https://via.placeholder.com/64' }}
                      style={styles.orderImg}
                    />
                    <View style={styles.orderInfo}>
                      <View style={styles.orderRow1}>
                        <Text style={styles.orderName} numberOfLines={1}>{item?.productName || 'Artisan Goods'}</Text>
                        <Text style={styles.orderPrice}>${order.totalAmount?.toFixed(2)}</Text>
                      </View>
                      <View style={styles.orderRow2}>
                        <Text style={styles.orderId}>Order #{order.orderNumber?.substring(0, 6).toUpperCase()}</Text>
                        <View style={[styles.orderStatusBadge, { backgroundColor: order.status === 'PENDING' ? 'rgba(255, 218, 214, 0.4)' : colors['primary-fixed'] }]}>
                          <Text style={[styles.orderStatusText, { color: order.status === 'PENDING' ? colors['on-error-container'] : colors['on-primary-fixed'] }]}>{order.status}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: 16,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    overflow: 'hidden',
    backgroundColor: colors['surface-container-high'],
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  iconButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.sectionGap,
  },
  welcomeSection: {
    marginTop: spacing.stackMd,
    marginBottom: spacing.stackLg,
  },
  greetingText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginBottom: 4,
  },
  welcomeTitle: {
    ...typography.headlineLgMobile,
    color: colors['on-surface'],
  },
  quickActions: {
    marginTop: spacing.stackMd,
  },
  quickActionsContent: {
    gap: spacing.stackSm,
    paddingBottom: 8,
  },
  primaryActionBtn: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    gap: 8,
  },
  primaryActionText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryActionBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.charcoal,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    gap: 8,
  },
  secondaryActionText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.stackSm,
    marginBottom: spacing.stackLg,
  },
  cardHalf: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    justifyContent: 'space-between',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  cardFull: {
    width: '100%',
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  trendBadge: {
    backgroundColor: 'rgba(200, 234, 216, 0.4)', // primary-fixed/40
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trendText: {
    ...typography.labelSm,
    color: colors['forest-green'],
  },
  cardLabel: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 4,
  },
  cardValue: {
    ...typography.headlineMd,
    color: colors['on-surface'],
  },
  cardValueMd: {
    ...typography.bodyLg,
    color: colors['on-surface'],
    fontWeight: '500',
  },
  cardUnit: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  cardErrorBg: {
    position: 'absolute',
    top: -16,
    right: -16,
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 218, 214, 0.4)', // error-container/40
    borderBottomLeftRadius: 64,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
  },
  storeVisitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  visitsIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['surface-container-low'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniChart: {
    height: 32,
    width: 96,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    opacity: 0.6,
  },
  miniBar: {
    width: 10,
    backgroundColor: colors['forest-green'],
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  chartSection: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: 20,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
    marginBottom: spacing.stackLg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.bodyLg,
    color: colors['on-surface'],
    fontWeight: '500',
  },
  timeFilter: {
    backgroundColor: colors['surface-container-low'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  timeFilterText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  chartPlaceholder: {
    height: 160,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
    paddingBottom: 8,
    position: 'relative',
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    opacity: 0.2,
  },
  gridLine: {
    borderTopWidth: 1,
    borderTopColor: colors['outline-variant'],
    width: '100%',
  },
  barsContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
  },
  chartBar: {
    flex: 1,
    backgroundColor: 'rgba(173, 206, 189, 0.5)', // primary-fixed-dim/50
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartBarActive: {
    flex: 1,
    backgroundColor: colors['forest-green'],
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'relative',
    alignItems: 'center',
  },
  chartTooltip: {
    position: 'absolute',
    top: -32,
    backgroundColor: colors.charcoal,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  chartTooltipText: {
    ...typography.labelSm,
    color: colors['on-primary'],
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  xLabel: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    width: 20,
    textAlign: 'center',
  },
  xLabelActive: {
    color: colors['forest-green'],
    fontWeight: 'bold',
  },
  recentOrdersSection: {
    marginBottom: spacing.sectionGap,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  viewAllText: {
    ...typography.labelSm,
    color: colors['forest-green'],
  },
  orderList: {
    gap: 12,
  },
  orderItem: {
    backgroundColor: colors['surface-container-lowest'],
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 1,
  },
  orderImg: {
    width: 64,
    height: 64,
    borderRadius: 4,
    backgroundColor: colors['surface-container-low'],
  },
  orderInfo: {
    flex: 1,
  },
  orderRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  orderName: {
    ...typography.bodyMd,
    color: colors['on-surface'],
    flex: 1,
    marginRight: 8,
  },
  orderPrice: {
    ...typography.labelMd,
    color: colors['on-surface'],
  },
  orderRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  orderId: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  orderStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  orderStatusText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
