import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useOrderStore } from '../../store/useOrderStore';

export default function OrderDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const orderId = route.params?.id || route.params?.orderId;
  const orders = useOrderStore(state => state.orders);
  
  const order = orders.find(o => o.id === orderId) || null;

  if (!order) {
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Order not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #{order.orderNumber ? order.orderNumber.substring(0, 6).toUpperCase() : order.id.toString().substring(0, 6).toUpperCase()}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Status Banner */}
        <View style={styles.card}>
          <View style={styles.statusHeader}>
            <Ionicons name="car" size={24} color={colors['forest-green']} />
            <Text style={styles.statusTitle}>{order.status}</Text>
          </View>
          <Text style={styles.statusDesc}>Estimated delivery 3-5 business days</Text>
          <Text style={styles.statusMeta}>Tracking updates available soon.</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Track Package</Text>
            <Ionicons name="open-outline" size={18} color={colors['on-primary']} />
          </TouchableOpacity>
        </View>

        {/* Items Ordered */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Items Ordered</Text>
          <View style={styles.divider} />
          
          {order.orderItems?.map((item, index) => (
            <React.Fragment key={item.id}>
              <View style={[styles.itemRow, index === order.orderItems.length - 1 && { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}>
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: item.productImageUrl || 'https://via.placeholder.com/80' }}
                    style={styles.itemImage}
                  />
                </View>
                <View style={styles.itemDetails}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.itemName}>{item.productName || 'Artisan Goods'}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                  <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                </View>
              </View>
              {index < order.orderItems.length - 1 && <View style={[styles.divider, { marginVertical: 0 }]} />}
            </React.Fragment>
          ))}
        </View>

        {/* Order Details (Date, Payment, Address) */}
        <View style={styles.card}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>ORDER DATE</Text>
            <Text style={styles.detailValue}>{new Date(order.createdAt).toLocaleDateString()}</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>SHIPPING ADDRESS</Text>
            <Text style={styles.detailValue}>
              {order.shippingAddress || '123 Maker Street\nPortland, OR 97204'}
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>PAYMENT METHOD</Text>
            <View style={styles.paymentMethodRow}>
              <Ionicons name="card-outline" size={20} color={colors.outline} />
              <Text style={styles.detailValue}>Paid</Text>
            </View>
          </View>
        </View>

        {/* Cost Breakdown */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${order.totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping & Tax</Text>
            <Text style={styles.summaryValue}>Included</Text>
          </View>
          <View style={styles.divider} />
          <View style={[styles.summaryRow, { marginTop: 8 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${order.totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="receipt-outline" size={18} color={colors['forest-green']} />
          <Text style={styles.downloadButtonText}>Download Invoice</Text>
        </TouchableOpacity>

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
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
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
  card: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.gutter,
    marginBottom: spacing.stackLg,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.2)',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statusTitle: {
    ...typography.labelMd,
    color: colors['forest-green'],
  },
  statusDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  statusMeta: {
    ...typography.labelSm,
    color: colors.outline,
    marginTop: 8,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors['surface-container-highest'],
    marginVertical: spacing.stackMd,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    paddingVertical: 8,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors['surface-container'],
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    gap: 4,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    ...typography.bodyMd,
    color: colors.charcoal,
    flex: 1,
    paddingRight: 8,
  },
  itemPrice: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  itemVariant: {
    ...typography.labelSm,
    color: colors.outline,
  },
  itemQty: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginTop: 4,
  },
  detailBlock: {
    gap: 4,
  },
  detailLabel: {
    ...typography.labelSm,
    color: colors.outline,
    letterSpacing: 0.5,
  },
  detailValue: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  summaryValue: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  totalLabel: {
    ...typography.labelMd,
    color: colors['forest-green'],
  },
  totalValue: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  downloadButtonText: {
    ...typography.labelMd,
    color: colors['forest-green'],
  },
});
