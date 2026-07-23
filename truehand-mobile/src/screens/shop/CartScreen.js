import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useCartStore } from '../../store/useCartStore';

export default function CartScreen() {
  const navigation = useNavigation();
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const total = getTotal();
  const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TrueHand</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Your Collection</Text>
          <Text style={styles.pageSubtitle}>{itemCount} items carefully selected.</Text>
        </View>

        {/* Cart Items */}
        <View style={styles.cartItemsList}>
          {cartItems.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <View style={styles.emptyIconWrapper}>
                <Ionicons name="cart-outline" size={80} color={colors.outline} />
              </View>
              <Text style={styles.emptyCartTitle}>Your Gallery is Empty</Text>
              <Text style={styles.emptyCartSubtitle}>Discover unique pieces crafted by master artisans from around the world.</Text>
              <TouchableOpacity 
                style={styles.exploreButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.exploreButtonText}>Start Exploring</Text>
                <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
              </TouchableOpacity>
            </View>
          ) : (
            cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemImageContainer}>
                  <Image 
                    source={{ uri: item.imageUrl || 'https://via.placeholder.com/300' }}
                    style={styles.itemImage}
                  />
                </View>
                <View style={styles.itemDetails}>
                  <View style={styles.itemHeaderRow}>
                    <View style={styles.itemTitleBlock}>
                      <Text style={styles.itemTitle}>{item.name}</Text>
                      <Text style={styles.itemArtisan}>by {item.seller?.shopName || 'Unknown Artisan'}</Text>
                    </View>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                  
                  {item.category && (
                    <View style={styles.badgeRow}>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.category}</Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.itemActionsRow}>
                    <View style={styles.qtyControls}>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}>
                        <Ionicons name="remove" size={16} color={colors.charcoal} />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.quantity || 1}</Text>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>
                        <Ionicons name="add" size={16} color={colors.charcoal} />
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.textActionsRow}>
                      <TouchableOpacity style={styles.textActionBtn} onPress={() => removeFromCart(item.id)}>
                        <Ionicons name="trash-outline" size={18} color={colors.outline} />
                        <Text style={[styles.textActionLabel, { color: colors['error-red'] }]}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Summary Section */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Summary</Text>
          
          <View style={styles.summaryLines}>
            <View style={styles.summaryLine}>
              <Text style={styles.summaryLineLabel}>Subtotal</Text>
              <Text style={styles.summaryLineValue}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryLine}>
              <Text style={styles.summaryLineLabel}>Shipping</Text>
              <Text style={styles.summaryLineValue}>Calculated at checkout</Text>
            </View>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={20} color={colors['on-primary']} />
          </TouchableOpacity>

          <View style={styles.secureTextRow}>
            <Ionicons name="lock-closed" size={14} color={colors.outline} />
            <Text style={styles.secureText}>Secure transaction</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
    zIndex: 10,
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
  pageHeader: {
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors.outline,
    marginTop: spacing.stackSm,
  },
  cartItemsList: {
    gap: spacing.stackLg,
    marginBottom: spacing.sectionGap,
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sectionGap,
  },
  emptyIconWrapper: {
    marginBottom: spacing.stackLg,
    opacity: 0.5,
  },
  emptyCartTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  emptyCartSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.stackLg,
    maxWidth: 300,
  },
  exploreButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 4,
    gap: 8,
  },
  exploreButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  cartItem: {
    flexDirection: 'column',
    gap: spacing.gutter,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
    paddingBottom: spacing.stackLg,
  },
  itemImageContainer: {
    width: '100%',
    aspectRatio: 4/5,
    backgroundColor: colors['surface-container'],
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitleBlock: {
    flex: 1,
    paddingRight: 16,
  },
  itemTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  itemArtisan: {
    ...typography.bodyMd,
    color: colors.outline,
    marginTop: 4,
  },
  itemPrice: {
    ...typography.labelMd,
    color: colors.charcoal,
    fontSize: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: spacing.stackMd,
    marginBottom: spacing.stackLg,
  },
  badge: {
    backgroundColor: colors['surface-container-high'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  itemActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.stackMd,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    borderRadius: 4,
  },
  qtyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  qtyText: {
    ...typography.labelMd,
    color: colors.charcoal,
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors['outline-variant'],
  },
  textActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
  },
  textActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  textActionLabel: {
    ...typography.labelSm,
    color: colors.outline,
  },
  summaryCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 8,
    padding: spacing.gutter,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
    marginBottom: spacing.stackLg,
  },
  summaryLines: {
    gap: spacing.stackMd,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
    paddingBottom: spacing.stackLg,
    marginBottom: spacing.stackLg,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLineLabel: {
    ...typography.bodyMd,
    color: colors.outline,
  },
  summaryLineValue: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.stackLg,
  },
  totalLabel: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  totalValue: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  checkoutButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 4,
  },
  checkoutButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secureTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: spacing.stackMd,
  },
  secureText: {
    ...typography.labelSm,
    color: colors.outline,
  },
});
