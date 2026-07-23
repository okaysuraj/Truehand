import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

export default function WalletScreen() {
  const navigation = useNavigation();

  const transactions = [
    {
      id: 1,
      type: 'credit',
      title: 'Credit Added',
      subtitle: 'Oct 24, 2023 • Bank Transfer',
      amount: '+$500.00',
      icon: 'arrow-down'
    },
    {
      id: 2,
      type: 'debit',
      title: 'Purchase #8921',
      subtitle: 'Oct 22, 2023 • Hand-thrown Ceramic Vase',
      amount: '-$120.00',
      icon: 'bag-handle'
    },
    {
      id: 3,
      type: 'credit',
      title: 'Refund Received',
      subtitle: 'Oct 18, 2023 • Order #8840 Cancelled',
      amount: '+$45.00',
      icon: 'arrow-undo'
    },
    {
      id: 4,
      type: 'debit',
      title: 'Purchase #8755',
      subtitle: 'Oct 10, 2023 • Woven Linen Throw',
      amount: '-$210.00',
      icon: 'bag-handle'
    }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Digital Wallet</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Wallet Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.watermarkIcon}>
            <Ionicons name="wallet" size={160} color="rgba(22, 52, 40, 0.05)" />
          </View>
          <Text style={styles.balanceLabel}>TRUEHAND CREDIT</Text>
          <Text style={styles.balanceAmount}>$1,245.00</Text>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryBtn}>
              <Ionicons name="add" size={18} color={colors['on-primary']} />
              <Text style={styles.primaryBtnText}>Top Up Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Ionicons name="arrow-up" size={18} color={colors.charcoal} />
              <Text style={styles.secondaryBtnText}>Withdraw Funds</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
          </View>

          <View style={styles.transactionsList}>
            {transactions.map((tx) => (
              <TouchableOpacity key={tx.id} style={styles.txCard}>
                <View style={styles.txLeft}>
                  <View style={[styles.txIconCircle, tx.type === 'debit' && styles.txIconCircleDebit]}>
                    <Ionicons 
                      name={tx.icon} 
                      size={20} 
                      color={tx.type === 'credit' ? colors['forest-green'] : colors['on-surface-variant']} 
                    />
                  </View>
                  <View>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txSubtitle}>{tx.subtitle}</Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.txAmount, tx.type === 'debit' && styles.txAmountDebit]}>
                    {tx.amount}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View All Transactions</Text>
            <Ionicons name="chevron-forward" size={16} color={colors['forest-green']} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, backgroundColor: 'rgba(252, 249, 248, 0.8)' },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'], fontWeight: '700' },
  backButton: { padding: 8, marginHorizontal: -8 },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: spacing.sectionGap, alignItems: 'center' },
  
  balanceCard: { width: '100%', maxWidth: 600, backgroundColor: colors['surface-container-lowest'], borderRadius: 12, padding: 32, alignItems: 'center', shadowColor: colors['forest-green'], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, marginBottom: spacing.sectionGap, overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: 'rgba(193, 200, 195, 0.3)' },
  watermarkIcon: { position: 'absolute', top: -20, right: -20, zIndex: 0 },
  balanceLabel: { ...typography.labelMd, color: colors['on-surface-variant'], letterSpacing: 2, zIndex: 1, marginBottom: spacing.stackSm },
  balanceAmount: { ...typography.displayLg, color: colors['forest-green'], zIndex: 1, marginBottom: spacing.stackLg },
  actionRow: { flexDirection: 'row', gap: spacing.stackMd, zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' },
  primaryBtn: { backgroundColor: colors['forest-green'], flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 4, gap: 8 },
  primaryBtnText: { ...typography.labelMd, color: colors['on-primary'] },
  secondaryBtn: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.charcoal, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 4, gap: 8 },
  secondaryBtnText: { ...typography.labelMd, color: colors.charcoal },
  
  transactionsSection: { width: '100%', maxWidth: 600 },
  sectionHeader: { borderBottomWidth: 1, borderBottomColor: 'rgba(193, 200, 195, 0.5)', paddingBottom: 8, marginBottom: spacing.stackMd },
  sectionTitle: { ...typography.headlineMd, color: colors['forest-green'] },
  
  transactionsList: { gap: 4 },
  txCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors['surface-container-lowest'], padding: 16, borderRadius: 8, borderWidth: 1, borderColor: 'transparent', shadowColor: colors['forest-green'], shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  txLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  txIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors['surface-container'], alignItems: 'center', justifyContent: 'center' },
  txIconCircleDebit: { backgroundColor: colors['surface-container-low'] },
  txTitle: { ...typography.bodyMd, color: colors['on-surface'], fontWeight: '500' },
  txSubtitle: { ...typography.labelSm, color: colors['on-surface-variant'], marginTop: 2 },
  txAmount: { ...typography.bodyMd, color: colors['forest-green'], fontWeight: '500' },
  txAmountDebit: { color: colors['on-surface-variant'] },
  
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.stackLg, gap: 4 },
  viewAllText: { ...typography.labelMd, color: colors['forest-green'] }
});
