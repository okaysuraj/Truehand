import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function DeliverySuccessScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Celebration Header */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-circle" size={64} color={colors['forest-green']} />
          </View>
          <Text style={styles.title}>Delivery Successful</Text>
          <Text style={styles.subtitle}>The craft has found its new home.</Text>
        </View>

        {/* Delivery Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.photoPreviewContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl4-TXv4Rw1ZTDnHzAp8r9oPxoFKiRUZtzu9yJYCrWlvRSBU5cpfaX6IagoCgkIS3YsSEw-Dp7HUj8oJxMIE2wElMIbV3ks25z-m_Boc2aPtXw4IdZpFyUr-0tXi12lcXeAEwcLyOIK2m2aMnEBjs9RWPd9S3QNi1l20Qv_jxeBHYBfeKA4TPxZMHZPFzsJUMZCF-Y4vUwaLjzPb9KGX3VdfqVP4g-kWCZ4pFcwGJsE3ys7bcdJ5sdmA' }}
              style={styles.photoPreview}
            />
            <View style={styles.photoBadge}>
              <Ionicons name="camera" size={16} color={colors['forest-green']} />
              <Text style={styles.photoBadgeText}>Proof of Delivery</Text>
            </View>
          </View>

          <View style={styles.itemsSection}>
            <Text style={styles.itemsSectionLabel}>DELIVERED ITEMS</Text>
            
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <View style={styles.itemIconBg}>
                  <Ionicons name="cube-outline" size={20} color={colors.charcoal} style={{ opacity: 0.5 }} />
                </View>
                <Text style={styles.itemText}>Hand-thrown Ceramic Vase</Text>
              </View>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>Qty: 1</Text>
              </View>
            </View>
            
            <View style={[styles.itemRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
              <View style={styles.itemInfo}>
                <View style={styles.itemIconBg}>
                  <Ionicons name="cube-outline" size={20} color={colors.charcoal} style={{ opacity: 0.5 }} />
                </View>
                <Text style={styles.itemText}>Artisan Linen Napkin Set</Text>
              </View>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>Qty: 2</Text>
              </View>
            </View>
            
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionArea}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('DeliveryHome')}
          >
            <Ionicons name="arrow-back" size={18} color={colors.charcoal} />
            <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('DeliveryHome')}
          >
            <Text style={styles.primaryButtonText}>Start Next Delivery</Text>
            <Ionicons name="car-outline" size={18} color={colors['on-primary']} />
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
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.sectionGap,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(200, 234, 216, 0.3)', // primary-fixed with opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  title: {
    ...typography.displayLg,
    fontSize: 36, // scaled down slightly for mobile
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    maxWidth: 300,
  },
  summaryCard: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackMd,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
  },
  photoPreviewContainer: {
    width: '100%',
    height: 192,
    borderRadius: 8,
    backgroundColor: colors['surface-container-low'],
    overflow: 'hidden',
    marginBottom: spacing.stackMd,
    position: 'relative',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  photoBadgeText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  itemsSection: {},
  itemsSectionLabel: {
    ...typography.labelSm,
    fontSize: 11,
    color: colors['on-surface-variant'],
    letterSpacing: 1,
    marginBottom: spacing.stackSm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemIconBg: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: colors['surface-container-high'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  qtyBadge: {
    backgroundColor: colors['surface-container'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  qtyText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  actionArea: {
    width: '100%',
    maxWidth: 600,
    marginTop: spacing.stackLg,
    gap: spacing.stackMd,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.charcoal,
    borderRadius: 4,
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: colors['forest-green'],
    borderRadius: 4,
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});
