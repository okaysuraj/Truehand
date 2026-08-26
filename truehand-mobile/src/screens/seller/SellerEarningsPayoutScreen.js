import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useArtisanStore } from '../../store/useArtisanStore';

export default function SellerEarningsPayoutScreen() {
  const navigation = useNavigation();
  const stats = useArtisanStore(state => state.stats);
  const fetchStats = useArtisanStore(state => state.fetchStats);

  React.useEffect(() => {
    fetchStats();
  }, [fetchStats]);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.charcoal} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Revenue Overview</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.charcoal} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header & Filter */}
        <View style={styles.topSection}>
          <View>
            <Text style={styles.pageTitle}>Revenue Overview</Text>
            <Text style={styles.pageSubtitle}>Track your studio's performance.</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>This Month</Text>
            <Ionicons name="chevron-down" size={16} color={colors.charcoal} />
          </TouchableOpacity>
        </View>

        {/* Main Chart Area */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeaderInfo}>
            <Text style={styles.chartLabel}>TOTAL EARNED</Text>
            <View style={styles.chartValueRow}>
              <Text style={styles.chartValue}>${stats?.totalRevenue?.toFixed(2) || '0.00'}</Text>
              <Text style={styles.chartTrend}>+12% vs last</Text>
            </View>
          </View>
          
          {/* Conceptual Chart */}
          <View style={styles.barChartContainer}>
            {/* Grid lines */}
            <View style={styles.gridLines}>
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
            </View>
            
            <View style={styles.barsArea}>
              <View style={[styles.barItem, { height: '30%', backgroundColor: 'rgba(22, 52, 40, 0.1)' }]} />
              <View style={[styles.barItem, { height: '50%', backgroundColor: 'rgba(22, 52, 40, 0.2)' }]} />
              <View style={[styles.barItem, { height: '40%', backgroundColor: 'rgba(22, 52, 40, 0.4)' }]} />
              <View style={[styles.barItem, { height: '80%', backgroundColor: 'rgba(22, 52, 40, 0.6)' }]} />
              <View style={[styles.barItem, { height: '100%', backgroundColor: colors['forest-green'] }]}>
                <View style={styles.barTooltip}>
                  <Text style={styles.barTooltipText}>$620</Text>
                </View>
              </View>
              <View style={[styles.barItem, { height: '60%', backgroundColor: 'rgba(22, 52, 40, 0.2)' }]} />
            </View>
          </View>

          <View style={styles.xAxisLabels}>
            <Text style={styles.xAxisText}>Oct 1</Text>
            <Text style={styles.xAxisText}>Oct 15</Text>
            <Text style={styles.xAxisText}>Oct 31</Text>
          </View>
        </View>

        {/* Summary Cards Grid */}
        <View style={styles.summaryGrid}>
          {/* Net Earnings */}
          <View style={[styles.summaryCard, { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <Text style={styles.summaryLabel}>Net Earnings (After Comm.)</Text>
              <Text style={styles.summaryValue}>${(stats?.totalRevenue ? stats.totalRevenue * 0.9 : 0).toFixed(2)}</Text>
            </View>
            <View style={styles.summaryIconBg}>
              <Ionicons name="card-outline" size={20} color={colors['forest-green']} />
            </View>
          </View>

          <View style={styles.summaryCardsRow}>
            {/* Pending Payout */}
            <View style={[styles.summaryCard, { flex: 1 }]}>
              <View style={styles.summaryCardHeader}>
                <Ionicons name="time-outline" size={18} color={colors.secondary} />
                <Text style={styles.summaryLabelSm}>Pending Payout</Text>
              </View>
              <Text style={styles.summaryValueSm}>${(stats?.totalRevenue ? stats.totalRevenue * 0.1 : 0).toFixed(2)}</Text>
              <Text style={[styles.summarySubtext, { color: colors.secondary }]}>Scheduled Nov 3</Text>
            </View>

            {/* Refunds */}
            <View style={[styles.summaryCard, { flex: 1 }]}>
              <View style={styles.summaryCardHeader}>
                <Ionicons name="return-down-back-outline" size={18} color={colors['error-red']} />
                <Text style={styles.summaryLabelSm}>Refunds</Text>
              </View>
              <Text style={styles.summaryValueSm}>-$65.00</Text>
              <Text style={styles.summarySubtext}>1 Item</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionList}>
            
            {/* Tx 1 */}
            <View style={styles.txItem}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1YAWwG_-cCYONDXDj7CB0c1gRt-hltH5b5u76v4YEQXEgNaQu6JhGQSBFCRyefcMwSd-6ueZKF0a4WmvVKiyWgl7KTBmL7BuF2NsYwNyr2o3XeRlmyxHFJGllDewzpI3jehtLZ-WMwgg-kRj92Sv4oaTdVEMqYQWDfi5TCbEZ0jSMpYg4ZYP29Qzq5Azc7z2U1tg-OtADZbEQeLCdKuhq4HuhG6Os11JkUGiEAC8D1wW9_dgNxwTpdQ' }}
                style={styles.txImg}
              />
              <View style={styles.txInfo}>
                <Text style={styles.txTitle} numberOfLines={1}>Speckled Ceramic Bowl</Text>
                <Text style={styles.txDesc}>Oct 28 • Order #8921</Text>
              </View>
              <View style={styles.txStatus}>
                <Text style={styles.txAmount}>+$85.00</Text>
                <Text style={styles.txStatusText}>Cleared</Text>
              </View>
            </View>

            {/* Tx 2 */}
            <View style={styles.txItem}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiJtxgWFLAI40HqJqJxbxYIkVnitc2yXK1NEvK1SgQEzyz2_6l_DJk5H15kohdkNsf0FSTPxn3IdgbD7E_Pr04q6G4LY-40vjoqQGX5NRWR_tYLPEwfLC1Gd5uJ-i3yT4RpNjKOWj_hDEPbSafeZ5oE3poMnE-ysoiHIbCu2_x1xa_biFhmvyvbUMHf2mWCNlEyUqDMjVmimXdl6jQAkVPpSqJjmNSznM-YjArdGto9LaxuIRzuZY1bA' }}
                style={styles.txImg}
              />
              <View style={styles.txInfo}>
                <Text style={styles.txTitle} numberOfLines={1}>Hand-woven Linen Scarf</Text>
                <Text style={styles.txDesc}>Oct 27 • Order #8920</Text>
              </View>
              <View style={styles.txStatus}>
                <Text style={styles.txAmount}>+$120.00</Text>
                <Text style={[styles.txStatusText, { color: colors.secondary }]}>Pending</Text>
              </View>
            </View>

            {/* Tx 3 */}
            <View style={[styles.txItem, { borderBottomWidth: 0, paddingBottom: 0 }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc5QX1a9ogjM7OvZZtWj-tooJmSlNHiIRqkD-PqCTtGsswH8DboGKZWTM2NlaZPIRfiOnE58N3lxersKE8O-jSexvG4mewovNkH2XxaBXnZpgpb5JPK1gud1G51shiHKj3iyNRuMFlQD93k5UYneOcsOjFRcBHhLu1u8wm1W-DtKh3VewQdD-MyB1fvDcQ1QF3zGmomDn9a6nu4KMWIRE-34-DYuBQe0NtZIS_jcueNr__4dgiU_iCrg' }}
                style={[styles.txImg, { opacity: 0.6 }]}
              />
              <View style={styles.txInfo}>
                <Text style={styles.txTitle} numberOfLines={1}>Oak Coaster Set</Text>
                <Text style={[styles.txDesc, { color: colors['error-red'] }]}>Oct 25 • Refunded</Text>
              </View>
              <View style={styles.txStatus}>
                <Text style={[styles.txAmount, { color: colors.charcoal }]}>-$65.00</Text>
                <Text style={styles.txStatusText}>Completed</Text>
              </View>
            </View>

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
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
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
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginTop: 4,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors['surface-container-low'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(114, 121, 116, 0.2)', // clay-outline/20
  },
  filterText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  chartSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: spacing.stackMd,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(114, 121, 116, 0.1)',
    marginBottom: spacing.stackLg,
  },
  chartHeaderInfo: {
    marginBottom: 24,
  },
  chartLabel: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    letterSpacing: 1,
  },
  chartValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  chartValue: {
    ...typography.displayLg,
    color: colors['forest-green'],
  },
  chartTrend: {
    ...typography.labelSm,
    color: 'rgba(22, 52, 40, 0.7)',
  },
  barChartContainer: {
    height: 192,
    width: '100%',
    position: 'relative',
    marginTop: 16,
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    opacity: 0.2,
    zIndex: 0,
  },
  gridLine: {
    borderTopWidth: 1,
    borderTopColor: colors['clay-outline'],
    borderStyle: 'dashed',
    width: '100%',
  },
  barsArea: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 4,
    zIndex: 10,
  },
  barItem: {
    width: '15%',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    alignItems: 'center',
    position: 'relative',
  },
  barTooltip: {
    position: 'absolute',
    top: -24,
  },
  barTooltipText: {
    ...typography.labelSm,
    color: colors['forest-green'],
    fontWeight: 'bold',
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  xAxisText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  summaryGrid: {
    gap: spacing.stackSm,
    marginBottom: spacing.stackLg,
  },
  summaryCardsRow: {
    flexDirection: 'row',
    gap: spacing.stackSm,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(114, 121, 116, 0.05)',
  },
  summaryLabel: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 4,
  },
  summaryValue: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  summaryIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['surface-container-low'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  summaryLabelSm: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  summaryValueSm: {
    ...typography.headlineMd,
    color: colors.charcoal,
    marginBottom: 4,
  },
  summarySubtext: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  transactionsSection: {
    marginBottom: spacing.sectionGap,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  viewAllText: {
    ...typography.labelSm,
    color: colors['forest-green'],
  },
  transactionList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(114, 121, 116, 0.05)',
    padding: 16,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(114, 121, 116, 0.1)',
  },
  txImg: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors['surface-container-low'],
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  txDesc: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginTop: 2,
  },
  txStatus: {
    alignItems: 'flex-end',
  },
  txAmount: {
    ...typography.labelMd,
    color: colors['forest-green'],
  },
  txStatusText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginTop: 2,
  },
});
