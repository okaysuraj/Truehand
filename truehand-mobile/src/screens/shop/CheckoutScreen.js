import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useOrderStore } from '../../store/useOrderStore';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const setCheckoutData = useOrderStore((state) => state.setCheckoutData);
  const checkoutData = useOrderStore((state) => state.checkoutData);
  
  const [selectedAddress, setSelectedAddress] = useState(checkoutData.address?.id || 'home');
  const [selectedShipping, setSelectedShipping] = useState(checkoutData.shipping || 'standard');

  const handleContinue = () => {
    // Save to store
    setCheckoutData({
      address: { id: selectedAddress, street: selectedAddress === 'home' ? '123 Craft Lane' : '456 Maker Blvd' },
      shipping: selectedShipping
    });
    navigation.navigate('PaymentMethodSelection');
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.charcoal} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={styles.iconButton} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <Text style={[styles.progressText, styles.progressTextActive]}>Address</Text>
            <View style={[styles.progressLine, styles.progressLineActive]} />
          </View>
          <View style={styles.progressConnector} />
          <View style={styles.progressStep}>
            <Text style={[styles.progressText, styles.progressTextInactive]}>Payment</Text>
            <View style={[styles.progressLine, styles.progressLineInactive]} />
          </View>
          <View style={styles.progressConnector} />
          <View style={styles.progressStep}>
            <Text style={[styles.progressText, styles.progressTextInactive]}>Review</Text>
            <View style={[styles.progressLine, styles.progressLineInactive]} />
          </View>
        </View>

        <Text style={styles.pageTitle}>Shipping Details</Text>

        <View style={styles.card}>
          
          {/* Select Address */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Select Address</Text>
              <TouchableOpacity>
                <Text style={styles.addText}>Add New</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {/* Address Option 1 */}
              <TouchableOpacity 
                style={[
                  styles.optionCard, 
                  selectedAddress === 'home' && styles.optionCardSelected
                ]}
                onPress={() => setSelectedAddress('home')}
                activeOpacity={0.8}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionLabel}>Home</Text>
                  <Text style={styles.optionName}>Jane Doe</Text>
                  <Text style={styles.optionDesc}>123 Craft Lane, Studio 4{'\n'}Artisanville, NY 10012</Text>
                </View>
                {selectedAddress === 'home' && (
                  <Ionicons name="checkmark-circle" size={24} color={colors['forest-green']} />
                )}
              </TouchableOpacity>

              {/* Address Option 2 */}
              <TouchableOpacity 
                style={[
                  styles.optionCard, 
                  selectedAddress === 'work' && styles.optionCardSelected
                ]}
                onPress={() => setSelectedAddress('work')}
                activeOpacity={0.8}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionLabel}>Studio</Text>
                  <Text style={styles.optionName}>Jane Doe</Text>
                  <Text style={styles.optionDesc}>456 Maker Blvd, Floor 2{'\n'}Creative City, CA 90210</Text>
                </View>
                {selectedAddress === 'work' && (
                  <Ionicons name="checkmark-circle" size={24} color={colors['forest-green']} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Shipping Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Speed</Text>
            
            <View style={styles.optionsList}>
              <TouchableOpacity 
                style={styles.shippingCard}
                onPress={() => setSelectedShipping('standard')}
                activeOpacity={0.8}
              >
                <View style={[styles.radioCircle, selectedShipping === 'standard' && styles.radioCircleSelected]}>
                  {selectedShipping === 'standard' && <View style={styles.radioInner} />}
                </View>
                <View style={styles.shippingDetails}>
                  <Text style={styles.shippingTitle}>Standard Craft Shipping</Text>
                  <Text style={styles.shippingDesc}>5-7 Business Days</Text>
                </View>
                <Text style={styles.shippingPrice}>Free</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.shippingCard}
                onPress={() => setSelectedShipping('express')}
                activeOpacity={0.8}
              >
                <View style={[styles.radioCircle, selectedShipping === 'express' && styles.radioCircleSelected]}>
                  {selectedShipping === 'express' && <View style={styles.radioInner} />}
                </View>
                <View style={styles.shippingDetails}>
                  <Text style={styles.shippingTitle}>Express Courier</Text>
                  <Text style={styles.shippingDesc}>2-3 Business Days</Text>
                </View>
                <Text style={styles.shippingPrice}>$15.00</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleContinue}
            >
              <Text style={styles.primaryButtonText}>Continue to Payment</Text>
            </TouchableOpacity>
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
    height: 64,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-high'],
  },
  iconButton: {
    padding: spacing.stackSm,
    width: 40,
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.stackLg,
    paddingHorizontal: spacing.stackSm,
  },
  progressStep: {
    flex: 1,
    alignItems: 'center',
  },
  progressText: {
    ...typography.labelMd,
    paddingBottom: 8,
  },
  progressTextActive: {
    color: colors.charcoal,
  },
  progressTextInactive: {
    color: colors.outline,
  },
  progressLine: {
    height: 2,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  progressLineActive: {
    backgroundColor: colors.charcoal,
  },
  progressLineInactive: {
    backgroundColor: 'transparent',
  },
  progressConnector: {
    width: 32,
    height: 1,
    backgroundColor: colors['surface-container-high'],
    marginBottom: -22, // adjust for alignment
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: spacing.stackLg,
  },
  card: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 8,
    padding: spacing.marginMobile,
    borderWidth: 1,
    borderColor: colors['surface-container'],
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  section: {
    marginBottom: spacing.stackLg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  sectionTitle: {
    ...typography.bodyLg,
    color: colors.charcoal,
    marginBottom: 0,
  },
  addText: {
    ...typography.labelSm,
    color: colors['forest-green'],
  },
  optionsList: {
    gap: spacing.stackMd,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: colors['surface-container-highest'],
    borderRadius: 8,
    backgroundColor: colors['surface-container-lowest'],
  },
  optionCardSelected: {
    borderColor: colors.charcoal,
    backgroundColor: colors.surface,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginBottom: 4,
  },
  optionName: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  optionDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors['surface-container-high'],
    marginBottom: spacing.stackLg,
  },
  shippingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: colors['surface-container-highest'],
    borderRadius: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  radioCircleSelected: {
    borderColor: colors['forest-green'],
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors['forest-green'],
  },
  shippingDetails: {
    flex: 1,
  },
  shippingTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  shippingDesc: {
    ...typography.bodyMd,
    color: colors.outline,
  },
  shippingPrice: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  actionsRow: {
    marginTop: spacing.stackMd,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});
