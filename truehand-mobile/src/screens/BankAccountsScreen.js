import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function BankAccountsScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={colors['outline-variant']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.introSection}>
          <Text style={styles.title}>Account Management</Text>
          <Text style={styles.subtitle}>Manage your linked financial institutions to seamlessly fund your bespoke commissions.</Text>
        </View>

        <View style={styles.accountsList}>
          
          <View style={styles.accountCard}>
            <View style={styles.cardMain}>
              <View style={styles.iconCircle}>
                <Ionicons name="business" size={24} color={colors['forest-green']} />
              </View>
              <View>
                <Text style={styles.accountName}>Chase Sapphire Checking</Text>
                <Text style={styles.accountNumber}>•••• •••• •••• 4209</Text>
              </View>
            </View>
            <View style={styles.cardActions}>
              <View style={styles.primaryBadge}>
                <Text style={styles.primaryBadgeText}>Primary</Text>
              </View>
              <View style={styles.iconActions}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Ionicons name="pencil" size={20} color={colors.outline} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Ionicons name="trash" size={20} color={colors.outline} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.accountCard}>
            <View style={styles.cardMain}>
              <View style={styles.iconCircle}>
                <Ionicons name="card" size={24} color={colors['forest-green']} />
              </View>
              <View>
                <Text style={styles.accountName}>Amex Platinum</Text>
                <Text style={styles.accountNumber}>•••• ••••• •1005</Text>
              </View>
            </View>
            <View style={styles.cardActions}>
              <View style={styles.iconActions}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Ionicons name="pencil" size={20} color={colors.outline} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Ionicons name="trash" size={20} color={colors.outline} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.addAccountBtn}>
            <View style={styles.addIconCircle}>
              <Ionicons name="add" size={24} color={colors['forest-green']} />
            </View>
            <Text style={styles.addAccountText}>Link New Account</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.infoPane}>
          <View style={styles.secureHeader}>
            <Ionicons name="shield-checkmark" size={28} color={colors['forest-green']} />
            <Text style={styles.secureTitle}>Secure Connection</Text>
          </View>
          <Text style={styles.secureDesc}>We use bank-level encryption to ensure your financial data remains private and secure. Your credentials are never stored on our servers.</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.supportedTitle}>SUPPORTED INSTITUTIONS</Text>
          <View style={styles.supportedTags}>
            <View style={styles.tag}><Text style={styles.tagText}>Chase</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Bank of America</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Wells Fargo</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Citi</Text></View>
            <Text style={styles.tagMore}>+ thousands more via Plaid</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, backgroundColor: 'rgba(252, 249, 248, 0.8)' },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'], fontWeight: '700' },
  backButton: { padding: 8, marginHorizontal: -8 },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  
  introSection: { marginBottom: spacing.stackLg, marginTop: spacing.stackLg },
  title: { ...typography.headlineLgMobile, color: colors['forest-green'], marginBottom: 8 },
  subtitle: { ...typography.bodyLg, color: colors['on-surface-variant'] },
  
  accountsList: { gap: spacing.stackMd, marginBottom: spacing.stackLg },
  accountCard: { backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 8, padding: spacing.gutter, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)', shadowColor: colors['forest-green'], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 1 },
  
  cardMain: { flexDirection: 'row', alignItems: 'center', gap: spacing.stackMd, marginBottom: spacing.stackMd },
  iconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors['surface-container-high'], alignItems: 'center', justifyContent: 'center' },
  accountName: { ...typography.headlineMd, color: colors['forest-green'], fontSize: 18 },
  accountNumber: { ...typography.labelMd, color: colors['clay-outline'] },
  
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  primaryBadge: { backgroundColor: colors['surface-container-high'], paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  primaryBadgeText: { ...typography.labelSm, color: colors.charcoal },
  iconActions: { flexDirection: 'row', gap: 8, marginLeft: 'auto' },
  iconBtn: { padding: 8 },
  
  addAccountBtn: { borderStyle: 'dashed', borderWidth: 1, borderColor: 'rgba(114, 121, 116, 0.5)', borderRadius: 8, padding: spacing.stackMd, alignItems: 'center', justifyContent: 'center', height: 120, gap: 8 },
  addIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(22, 52, 40, 0.1)', alignItems: 'center', justifyContent: 'center' },
  addAccountText: { ...typography.labelMd, color: colors['forest-green'] },
  
  infoPane: { backgroundColor: colors['surface-container-low'], borderRadius: 8, padding: spacing.gutter, borderWidth: 1, borderColor: colors['surface-container-highest'] },
  secureHeader: { marginBottom: 8 },
  secureTitle: { ...typography.headlineMd, color: colors['forest-green'], fontSize: 20, marginTop: 8 },
  secureDesc: { ...typography.bodyMd, color: colors['on-surface-variant'], fontSize: 14 },
  divider: { height: 1, backgroundColor: colors['surface-container-highest'], marginVertical: spacing.stackMd },
  supportedTitle: { ...typography.labelMd, color: colors.charcoal, marginBottom: spacing.stackSm, letterSpacing: 1 },
  supportedTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  tag: { backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, borderWidth: 1, borderColor: colors['surface-container-highest'] },
  tagText: { fontSize: 12, color: colors['clay-outline'] },
  tagMore: { fontSize: 12, color: colors['clay-outline'], marginLeft: 4 }
});
