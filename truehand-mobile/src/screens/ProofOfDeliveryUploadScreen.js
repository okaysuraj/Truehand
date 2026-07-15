import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function ProofOfDeliveryUploadScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Proof of Delivery</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="headset-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Order Summary Card */}
        <View style={styles.orderSummaryCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="cube-outline" size={24} color={colors.outline} />
          </View>
          <View style={styles.summaryTextCol}>
            <Text style={styles.orderId}>ORDER #8849-B</Text>
            <Text style={styles.itemTitle}>Ceramic Vases Set</Text>
            <Text style={styles.deliverToText} numberOfLines={1}>Deliver to: 142 Artisan Ave, Suite 3</Text>
          </View>
        </View>

        {/* Photo Proof Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PHOTO PROOF</Text>
          </View>
          <Text style={styles.sectionDesc}>Capture a clear photo of the delivered item at the designated location.</Text>
          <TouchableOpacity style={styles.photoCaptureBox} activeOpacity={0.8}>
            <Ionicons name="camera-outline" size={32} color={colors.outline} style={{ marginBottom: 8 }} />
            <Text style={styles.photoCaptureText}>Tap to capture photo</Text>
          </TouchableOpacity>
        </View>

        {/* Customer Signature Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CUSTOMER SIGNATURE</Text>
          </View>
          <Text style={styles.sectionDesc}>Required for secure delivery handoff.</Text>
          
          <View style={styles.signaturePad}>
            {/* Simulated Signature Pad */}
            <View style={styles.clearBtnContainer}>
              <TouchableOpacity style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextInput 
            style={styles.signerNameInput}
            placeholder="Printed Name (Optional)"
            placeholderTextColor={colors['outline-variant']}
          />
        </View>

        {/* Delivery Notes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>DELIVERY NOTES</Text>
          </View>
          <TextInput 
            style={styles.notesInput}
            placeholder="Add any relevant details about the delivery location or handoff..."
            placeholderTextColor={colors['outline-variant']}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

      </ScrollView>

      {/* Bottom Action Area */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('DeliverySuccess')}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color={colors['on-primary']} />
          <Text style={styles.primaryButtonText}>Submit Proof & Complete</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 120, // Bottom bar spacing
    gap: spacing.stackLg,
  },
  orderSummaryCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackMd,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.stackMd,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)', // outline-variant with opacity
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors['surface-container-low'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTextCol: {
    flex: 1,
  },
  orderId: {
    ...typography.labelSm,
    color: colors.outline,
    letterSpacing: 1,
    marginBottom: 4,
  },
  itemTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
    lineHeight: 28,
  },
  deliverToText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  section: {
    flexDirection: 'column',
  },
  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
    paddingBottom: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
    letterSpacing: 1,
  },
  sectionDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    fontSize: 14,
    marginBottom: 12,
  },
  photoCaptureBox: {
    width: '100%',
    aspectRatio: 4/3,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(193, 200, 195, 0.5)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCaptureText: {
    ...typography.labelMd,
    color: colors.outline,
  },
  signaturePad: {
    width: '100%',
    height: 192,
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outline,
    position: 'relative',
  },
  clearBtnContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  clearBtn: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors['outline-variant'],
  },
  clearBtnText: {
    ...typography.labelSm,
    color: colors.outline,
  },
  signerNameInput: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.5)',
    paddingVertical: 12,
    ...typography.bodyMd,
    color: colors.charcoal,
    marginTop: 8,
  },
  notesInput: {
    width: '100%',
    backgroundColor: colors['surface-container-lowest'],
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.5)',
    borderRadius: 8,
    padding: spacing.stackSm,
    ...typography.bodyMd,
    color: colors.charcoal,
    height: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(252, 249, 248, 0.95)', // surface with opacity
    borderTopWidth: 1,
    borderTopColor: 'rgba(193, 200, 195, 0.2)',
    padding: spacing.marginMobile,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 10,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 30, // fully rounded
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});
