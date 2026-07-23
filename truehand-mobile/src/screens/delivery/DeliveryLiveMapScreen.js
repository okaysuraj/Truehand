import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useDeliveryStore } from '../../store/useDeliveryStore';

export default function DeliveryLiveMapScreen() {
  const navigation = useNavigation();
  const activeDelivery = useDeliveryStore(state => state.activeDelivery);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <View style={styles.container}>
      {/* Background Map Image (Mocking a real map) */}
      <ImageBackground
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD8JRWcEBxF6XtCnbJ6qJQdwchL4cfHSqqnqfXntqXVCSC4e_HFLzctReYZroZXsmGP3ujktxL089DRKPo-NChO5kkbLPQOD6u3-7gpSGeqLHAXlHQxDRcDVkaEhz3k-suYt5hmqR6GNsw11BRqZVKa9PYZrU6eVST7pAUtDfrQtxUvHbalzaVwvq5S9ytIgW5mij_wDXwGe8u9r_jrJ2iWIAUhC_vJ-LGskbfWx91xE2qxjGUlnz-iA' }}
        style={styles.mapBackground}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* Top Header Overlay */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Delivery Route</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="headset-outline" size={24} color={colors['forest-green']} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} />

          {/* Bottom Info Sheet */}
          <View style={styles.bottomSheet}>
            
            <View style={styles.sheetHeader}>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>Customer</Text>
                <View style={styles.addressRow}>
                  <Ionicons name="location" size={16} color={colors['on-surface-variant']} />
                  <Text style={styles.addressText}>{activeDelivery?.deliveryAddress || 'Customer Address'}</Text>
                </View>
              </View>
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceText}>1.2 mi</Text>
              </View>
            </View>

            <View style={styles.instructionsBox}>
              <Text style={styles.instructionsLabel}>INSTRUCTIONS</Text>
              <Text style={styles.instructionsText}>
                {activeDelivery?.deliveryInstructions || 'Standard delivery'}
              </Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Ionicons name="call-outline" size={20} color={colors.charcoal} />
                <Text style={styles.secondaryButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.charcoal} />
                <Text style={styles.secondaryButtonText}>Message</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('OTPDeliveryVerification')}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color={colors['on-primary']} />
              <Text style={styles.primaryButtonText}>Arrived at Location</Text>
            </TouchableOpacity>
            
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
  },
  iconButton: {
    padding: spacing.stackSm,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 20,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  bottomSheet: {
    backgroundColor: colors['surface-container-lowest'],
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: spacing.marginMobile,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.stackMd,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  addressText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  distanceBadge: {
    backgroundColor: colors['secondary-container'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  distanceText: {
    ...typography.labelSm,
    color: colors['on-secondary-container'],
  },
  instructionsBox: {
    backgroundColor: colors['surface-container'],
    padding: spacing.stackSm,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: colors.secondary,
    marginBottom: spacing.stackMd,
  },
  instructionsLabel: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    letterSpacing: 1,
    marginBottom: 4,
  },
  instructionsText: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 4,
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});
