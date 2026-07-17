import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { useCartStore } from '../store/useCartStore';
import { useOrderStore } from '../store/useOrderStore';

export default function OrderSummaryScreen() {
  const navigation = useNavigation();
  const cartItems = useCartStore(state => state.cartItems);
  const getTotal = useCartStore(state => state.getTotal);
  const checkoutData = useOrderStore(state => state.checkoutData);
  const createOrder = useOrderStore(state => state.createOrder);
  const isCreatingOrder = useOrderStore(state => state.isCreatingOrder);

  const subtotal = getTotal();
  const shipping = checkoutData.shipping === 'express' ? 15.00 : 0.00;
  const tax = subtotal * 0.095; // Fake tax
  const total = subtotal + shipping + tax;

  const handleCompletePurchase = async () => {
    try {
      await createOrder();
      navigation.navigate('OrderSuccessConfirmation');
    } catch (e) {
      console.error('Order creation failed:', e);
      // ideally show toast here
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.charcoal} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={styles.iconButton} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.pageTitle}>Order Summary</Text>

        <View style={styles.summaryCard}>
          
          {/* Items Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>ITEMS</Text>
            
            {cartItems.map(item => (
              <View key={item.id} style={[styles.itemRow, { marginBottom: 16 }]}>
                <View style={styles.itemImageContainer}>
                  <Image 
                    source={{ uri: item.imageUrl || 'https://via.placeholder.com/96' }}
                    style={styles.itemImage}
                  />
                </View>
                <View style={styles.itemDetails}>
                  <View style={styles.itemTitleRow}>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                      <Text style={styles.itemTitle}>{item.name}</Text>
                      {item.category && <Text style={styles.itemVariant}>{item.category}</Text>}
                    </View>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                  <Text style={styles.itemQty}>Qty: {item.quantity || 1}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            
            {/* Shipping Address */}
            <View style={styles.detailsCol}>
              <View style={styles.detailsHeaderRow}>
                <Ionicons name="car-outline" size={16} color={colors.outline} />
                <Text style={styles.sectionLabelInline}>SHIPPING ADDRESS</Text>
              </View>
              <Text style={styles.detailsText}>
                {checkoutData.address?.street || '123 Hill House Ln'}{'\n'}
                San Francisco, CA 94110
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Payment Method */}
            <View style={[styles.detailsCol, { marginTop: spacing.stackLg }]}>
              <View style={styles.detailsHeaderRow}>
                <Ionicons name="card-outline" size={16} color={colors.outline} />
                <Text style={styles.sectionLabelInline}>PAYMENT METHOD</Text>
              </View>
              <View style={styles.paymentRow}>
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>
                    {checkoutData.paymentMethod?.type === 'apple_pay' ? 'PAY' : 'CARD'}
                  </Text>
                </View>
                <Text style={styles.detailsText}>
                  {checkoutData.paymentMethod?.cardNumber ? `•••• ${checkoutData.paymentMethod.cardNumber.slice(-4)}` : '•••• 4242'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('PaymentMethodSelection')}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.divider} />

          {/* Price Breakdown */}
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Shipping</Text>
              <Text style={styles.priceValue}>${shipping.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabelLight}>Estimated Tax</Text>
              <Text style={styles.priceValueLight}>${tax.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>

        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleCompletePurchase}
          disabled={isCreatingOrder}
        >
          <Text style={styles.primaryButtonText}>{isCreatingOrder ? 'Processing...' : 'Complete Purchase'}</Text>
          {!isCreatingOrder && <Ionicons name="checkmark" size={18} color={colors['on-primary']} />}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By completing this purchase, you agree to our Terms of Service.
        </Text>

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
    paddingBottom: spacing.sectionGap,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: spacing.stackLg,
  },
  summaryCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 8,
    padding: spacing.marginMobile,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
    marginBottom: spacing.stackLg,
  },
  section: {
    marginBottom: spacing.stackLg,
  },
  sectionLabel: {
    ...typography.labelMd,
    color: colors.outline,
    letterSpacing: 1,
    marginBottom: spacing.stackMd,
  },
  sectionLabelInline: {
    ...typography.labelMd,
    color: colors.outline,
    letterSpacing: 1,
  },
  itemRow: {
    flexDirection: 'row',
    gap: spacing.stackMd,
  },
  itemImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 8,
    backgroundColor: colors['surface-container-low'],
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    ...typography.bodyLg,
    color: colors.charcoal,
  },
  itemVariant: {
    ...typography.labelSm,
    color: colors.outline,
    marginTop: 4,
  },
  itemPrice: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  itemQty: {
    ...typography.labelSm,
    color: colors.outline,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors['surface-container-high'],
    marginBottom: spacing.stackLg,
  },
  detailsGrid: {
    marginBottom: spacing.stackLg,
  },
  detailsCol: {
    // on mobile they stack, on desktop they'd be side-by-side
  },
  detailsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.stackSm,
  },
  detailsText: {
    ...typography.bodyMd,
    color: colors.charcoal,
    lineHeight: 24,
  },
  editText: {
    ...typography.labelSm,
    color: colors.terracotta,
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardBadge: {
    width: 40,
    height: 24,
    backgroundColor: colors['surface-container'],
    borderWidth: 1,
    borderColor: colors['surface-container-high'],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBadgeText: {
    ...typography.labelSm,
    color: colors.charcoal,
    fontWeight: 'bold',
  },
  priceBreakdown: {
    gap: spacing.stackSm,
    marginBottom: spacing.stackMd,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceLabel: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  priceValue: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  priceLabelLight: {
    ...typography.bodyMd,
    color: colors.outline,
  },
  priceValueLight: {
    ...typography.bodyMd,
    color: colors.outline,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.stackMd,
    borderTopWidth: 1,
    borderTopColor: colors['surface-container-high'],
  },
  totalLabel: {
    ...typography.labelMd,
    color: colors.charcoal,
    letterSpacing: 1,
  },
  totalValue: {
    ...typography.headlineMd,
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
  termsText: {
    ...typography.labelSm,
    color: colors.outline,
    textAlign: 'center',
    marginTop: spacing.stackMd,
  },
});
