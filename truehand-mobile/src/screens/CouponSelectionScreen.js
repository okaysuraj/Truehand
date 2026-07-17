import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function CouponSelectionScreen() {
  const navigation = useNavigation();
  const [promoCode, setPromoCode] = useState('');

  const coupons = [
    {
      id: 1,
      category: 'Ceramics',
      discount: '15% Off',
      title: 'Spring Studio Collection',
      desc: 'Valid on all hand-thrown bowls and vases.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBKKs0mQKSd1xN_3gR4umVTZh9yoEM8ejFASMJyu9LOQDrPpMf10hQVzMBgFoe7oftvpsNXawlwxrQqUDduBLg-hVRVbUSHBsNL--WMUmo-T1y5gcNqq7IPm1SUA9SmSJRVYJAAa6SMQMLzXeVXsHmn8O-CNgEME3c3nUplc-oN-lR2pdN-qIrUznAYYXfXjBcPXw2wsJS0CgbsR75NZjW8nM1X1RrSwi2hmCBz44ptXpvFWEEQNtcCQ',
      expired: false
    },
    {
      id: 2,
      category: 'Textiles',
      discount: '$20 Off',
      title: 'Artisan Weaves',
      desc: 'Save on purchases over $100 in the textiles category.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH1iXlzIuuAmRPjD42evIdrR2Wt7UYfyccZcr20qpJaCT8YReo4dYhbuYJ5GWFFa8vTW70VjN0vyjO1iD4jIOWRfteuet5LkhOQKI6gSjNV0dO_puWSRdogDKpknnGKjq9Xgyof6AcwTJqFfmQrIUMuRMKEZEhDW00iNLjKprJ6hzu4CCHC-6bLY9i39M6XY97drCfRvsoABpVj7QYCeElCtrbO491uZKRmBoVbmGV7XVUz-pGw66sWw',
      expired: false
    },
    {
      id: 3,
      category: 'Woodwork',
      discount: 'Free Shipping',
      title: 'Winter Welcome',
      desc: 'Expired on Dec 31st.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3jWoEr_rQdE7VB6netCAdHggbkid7kwzl_NBWns39ojuXCNAawU4XSpHO6AajaDySUlDII-PHzRPK01WtwaPZ8oM5d7HuO9CdtxQrYfvDXwCW4VVqo7O5rKs97XvnjkCRgZZrpFtxWwnDL72HdnGbDX_XZ5DAISoSuEwoY5XDOYH0wY92aVyPTEutCEEgs5ZUKiOdlsHwbNmOxYDU30-8So7cENGKB3rot_z3knzAaT7pNp08gtuqTQ',
      expired: true
    }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.introSection}>
          <Text style={styles.title}>Available Rewards</Text>
          <Text style={styles.subtitle}>Select a coupon to apply to your artisanal purchase or enter a special code below.</Text>
        </View>

        <View style={styles.promoCodeSection}>
          <Text style={styles.promoLabel}>ENTER PROMO CODE</Text>
          <View style={styles.promoInputRow}>
            <TextInput 
              style={styles.promoInput}
              placeholder="e.g. CRAFT20"
              placeholderTextColor={colors['outline-variant']}
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>APPLY CODE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.couponList}>
          {coupons.map((coupon) => (
            <View key={coupon.id} style={[styles.couponCard, coupon.expired && styles.couponCardExpired]}>
              <View style={styles.couponImageContainer}>
                <Image source={{ uri: coupon.image }} style={[styles.couponImage, coupon.expired && styles.couponImageExpired]} />
                <View style={styles.couponImageOverlay} />
              </View>
              <View style={styles.couponDetails}>
                <View>
                  <View style={styles.couponHeader}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{coupon.category}</Text>
                    </View>
                    <Text style={[styles.discountText, coupon.expired && styles.discountTextExpired]}>{coupon.discount}</Text>
                  </View>
                  <Text style={[styles.couponTitle, coupon.expired && styles.couponTitleExpired]}>{coupon.title}</Text>
                  <Text style={styles.couponDesc}>{coupon.desc}</Text>
                </View>
                <View style={styles.couponActionRow}>
                  <TouchableOpacity 
                    style={[styles.useBtn, coupon.expired && styles.useBtnExpired]}
                    disabled={coupon.expired}
                  >
                    <Text style={[styles.useBtnText, coupon.expired && styles.useBtnTextExpired]}>
                      {coupon.expired ? 'EXPIRED' : 'APPLY'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
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
  scrollContent: { padding: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  
  introSection: { marginBottom: spacing.stackLg, marginTop: spacing.stackLg },
  title: { ...typography.headlineLgMobile, color: colors.charcoal, marginBottom: 8 },
  subtitle: { ...typography.bodyLg, color: colors['on-surface-variant'] },
  
  promoCodeSection: { backgroundColor: colors['surface-container-lowest'], padding: spacing.stackLg, borderRadius: 8, borderWidth: 1, borderColor: colors['surface-variant'], marginBottom: spacing.stackLg },
  promoLabel: { ...typography.labelMd, color: colors.charcoal, marginBottom: spacing.stackMd, letterSpacing: 1 },
  promoInputRow: { flexDirection: 'row', gap: 16 },
  promoInput: { flex: 1, borderBottomWidth: 1, borderBottomColor: colors['clay-outline'], fontSize: 16, color: colors.charcoal, paddingVertical: 8 },
  applyBtn: { backgroundColor: colors['forest-green'], paddingHorizontal: 24, paddingVertical: 12, borderRadius: 4, justifyContent: 'center' },
  applyBtnText: { ...typography.labelMd, color: colors['on-primary'], letterSpacing: 1 },
  
  couponList: { gap: spacing.stackMd },
  couponCard: { flexDirection: 'row', backgroundColor: colors['surface-container-lowest'], borderRadius: 4, borderWidth: 1, borderColor: colors['surface-variant'], overflow: 'hidden' },
  couponCardExpired: { opacity: 0.6 },
  couponImageContainer: { width: '33%', backgroundColor: colors['surface-container'], position: 'relative' },
  couponImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  couponImageExpired: { opacity: 0.5 },
  couponImageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(22, 52, 40, 0.1)' },
  couponDetails: { flex: 1, padding: spacing.stackMd, justifyContent: 'space-between', minHeight: 120 },
  couponHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  categoryBadge: { backgroundColor: colors['surface-container-low'], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 2 },
  categoryBadgeText: { ...typography.labelSm, color: colors.charcoal, letterSpacing: 1, textTransform: 'uppercase' },
  discountText: { ...typography.headlineMd, color: colors.terracotta },
  discountTextExpired: { color: colors.outline },
  couponTitle: { ...typography.bodyMd, color: colors.charcoal, marginBottom: 4 },
  couponTitleExpired: { color: colors['outline-variant'] },
  couponDesc: { ...typography.labelSm, color: colors['on-surface-variant'] },
  couponActionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
  useBtn: { borderWidth: 1, borderColor: colors.charcoal, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 4 },
  useBtnExpired: { borderColor: colors['outline-variant'] },
  useBtnText: { ...typography.labelMd, color: colors.charcoal },
  useBtnTextExpired: { color: colors['outline-variant'] }
});
