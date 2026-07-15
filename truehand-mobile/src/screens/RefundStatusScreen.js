import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function RefundStatusScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refund Status</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Status Overview Card */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <View>
              <Text style={styles.orderNumber}>Order #8892-AC</Text>
              <Text style={styles.initiatedDate}>Initiated on Oct 12, 2023</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.refundAmount}>$145.00</Text>
              <Text style={styles.amountLabel}>Refund Amount</Text>
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.timelineContainer}>
            <View style={styles.timelineLine} />
            
            {/* Step 1 */}
            <View style={styles.timelineStep}>
              <View style={styles.timelineIconActive}>
                <Ionicons name="cube" size={20} color={colors['on-primary']} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.stepTitle}>Return Received</Text>
                <Text style={styles.stepDate}>Oct 14, 2023 at 10:24 AM</Text>
                <Text style={styles.stepDesc}>Your package has safely arrived at our workshop. We are preparing it for inspection.</Text>
              </View>
            </View>

            {/* Step 2 */}
            <View style={styles.timelineStep}>
              <View style={styles.timelineIconActive}>
                <Ionicons name="checkmark-circle" size={20} color={colors['on-primary']} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.stepTitle}>Inspected</Text>
                <Text style={styles.stepDate}>Oct 15, 2023 at 2:15 PM</Text>
                <Text style={styles.stepDesc}>The item has been reviewed and meets our return criteria for craftsmanship integrity.</Text>
              </View>
            </View>

            {/* Step 3 (Current) */}
            <View style={styles.timelineStep}>
              <View style={styles.timelineIconCurrent}>
                <Ionicons name="ribbon" size={20} color={colors['forest-green']} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.stepTitle, { color: colors['forest-green'] }]}>Refund Approved</Text>
                <Text style={[styles.stepDate, { color: colors['forest-green'] }]}>Today at 9:00 AM</Text>
                <Text style={styles.stepDescCurrent}>Your refund has been authorized and processing has begun.</Text>
                
                <View style={styles.itemDetailMini}>
                  <Image 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoV-pCwwJMkAgB9XBn_SYn36xh5BQVtXIF0wkb1yPmjZAdJ__QqYX5p1RrrQhck3bl6V1jnUiLAyTdbcaLGAA0eyvtg3G7ku89rqHhfgq8319-TzbD5eFSdoC5M4VH-i3c5x3zfJdugqOS35XqNsfJOgrHBOF-x6Wm_hvD8Oy2RsixePOhI5kDtVoMmVLE2L1ETWKgwTNdGZZ-NALAd_6c1hkIXx0zRWOr8_JELj9vRB_UPUVaxBxtIw' }}
                    style={styles.miniImage}
                  />
                  <View>
                    <Text style={styles.miniItemName}>Hand-thrown Ceramic Mug</Text>
                    <Text style={styles.miniItemQty}>Qty: 1</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Step 4 (Pending) */}
            <View style={[styles.timelineStep, styles.timelineStepLast, { opacity: 0.6 }]}>
              <View style={styles.timelineIconPending}>
                <Ionicons name="wallet-outline" size={20} color={colors.outline} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.stepTitlePending}>Amount Credited</Text>
                <Text style={styles.stepDatePending}>Pending (Est. Oct 18 - 20)</Text>
                <Text style={styles.stepDescPending}>Funds will be returned to your original payment method. Bank processing times may vary.</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Payment Method Card */}
        <View style={styles.detailCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="card-outline" size={18} color={colors.charcoal} />
            <Text style={styles.cardTitle}>Original Payment Method</Text>
          </View>
          <View style={styles.paymentRow}>
            <View style={styles.cardBadge}>
              <Text style={styles.cardBadgeText}>VISA</Text>
            </View>
            <View>
              <Text style={styles.paymentText}>Visa ending in 4242</Text>
              <Text style={styles.paymentSubtext}>Expected in 3-5 business days</Text>
            </View>
          </View>
        </View>

        {/* Support Card */}
        <View style={styles.detailCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="headset-outline" size={18} color={colors.charcoal} />
            <Text style={styles.cardTitle}>Need Assistance?</Text>
          </View>
          <Text style={styles.supportDesc}>If you have questions regarding this refund or our artisanal quality guarantee, our concierge is here to help.</Text>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Contact Artisan Concierge</Text>
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
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -spacing.stackSm,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  overviewCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackLg,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
    marginBottom: spacing.stackLg,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
    paddingBottom: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  orderNumber: {
    ...typography.bodyLg,
    color: colors.charcoal,
    marginBottom: 4,
  },
  initiatedDate: {
    ...typography.labelSm,
    color: colors.outline,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  refundAmount: {
    ...typography.displayLg,
    fontSize: 28, // smaller than displayLg for mobile fit
    lineHeight: 32,
    color: colors['forest-green'],
  },
  amountLabel: {
    ...typography.labelSm,
    color: colors.outline,
    marginTop: 4,
  },
  timelineContainer: {
    position: 'relative',
    paddingTop: 8,
  },
  timelineLine: {
    position: 'absolute',
    left: 20,
    top: 20,
    bottom: 20,
    width: 2,
    backgroundColor: colors['surface-variant'],
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.stackLg,
    gap: spacing.stackMd,
  },
  timelineStepLast: {
    marginBottom: 0,
  },
  timelineIconActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['forest-green'],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineIconCurrent: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['primary-fixed-dim'],
    borderWidth: 4,
    borderColor: colors['surface-container-lowest'],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineIconPending: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['surface-variant'],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 8,
  },
  stepTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  stepTitlePending: {
    ...typography.labelMd,
    color: colors.outline,
  },
  stepDate: {
    ...typography.labelSm,
    color: colors.outline,
    marginTop: 4,
  },
  stepDatePending: {
    ...typography.labelSm,
    color: colors.outline,
    marginTop: 4,
  },
  stepDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginTop: 8,
  },
  stepDescCurrent: {
    ...typography.bodyMd,
    color: colors['on-surface'],
    marginTop: 8,
  },
  stepDescPending: {
    ...typography.bodyMd,
    color: colors.outline,
    marginTop: 8,
  },
  itemDetailMini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors['surface-container-low'],
    padding: spacing.stackSm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    marginTop: spacing.stackMd,
    alignSelf: 'flex-start',
  },
  miniImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  miniItemName: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  miniItemQty: {
    ...typography.labelSm,
    color: colors.outline,
  },
  detailCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackMd,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 1,
    marginBottom: spacing.stackLg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.stackSm,
  },
  cardTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackSm,
    marginTop: spacing.stackSm,
  },
  cardBadge: {
    backgroundColor: colors['surface-variant'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardBadgeText: {
    fontFamily: 'Hanken Grotesk', // use standard label font
    fontSize: 10,
    fontWeight: 'bold',
    color: colors['on-surface-variant'],
    letterSpacing: 1,
  },
  paymentText: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  paymentSubtext: {
    ...typography.labelSm,
    color: colors.outline,
  },
  supportDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginBottom: spacing.stackMd,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.charcoal,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  outlineButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
});
