import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { useArtisanStore } from '../store/useArtisanStore';

export default function OrderFulfillmentScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('New');

  const orders = useArtisanStore(state => state.orders);
  const fetchOrders = useArtisanStore(state => state.fetchOrders);
  const updateOrderStatus = useArtisanStore(state => state.updateOrderStatus);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'New') return order.status === 'PENDING';
    if (activeTab === 'InProgress') return order.status === 'PROCESSING' || order.status === 'SHIPPED';
    if (activeTab === 'Completed') return order.status === 'DELIVERED';
    return true;
  });

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (e) {
      console.error(e);
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand Seller</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Page Header & Tabs */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>New Orders</Text>
          <Text style={styles.pageSubtitle}>Review and manage recently placed orders requiring your attention and craftsmanship.</Text>
          
          <TouchableOpacity style={styles.printButton}>
            <Ionicons name="print-outline" size={18} color={colors['on-primary']} />
            <Text style={styles.printButtonText}>Print Slips</Text>
          </TouchableOpacity>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
            <View style={styles.tabsContainer}>
              <TouchableOpacity 
                style={[styles.tabBtn, activeTab === 'New' && styles.tabBtnActive]}
                onPress={() => setActiveTab('New')}
              >
                <Text style={[styles.tabText, activeTab === 'New' && styles.tabTextActive]}>New (12)</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tabBtn, activeTab === 'InProgress' && styles.tabBtnActive]}
                onPress={() => setActiveTab('InProgress')}
              >
                <Text style={[styles.tabText, activeTab === 'InProgress' && styles.tabTextActive]}>In Progress (5)</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tabBtn, activeTab === 'Completed' && styles.tabBtnActive]}
                onPress={() => setActiveTab('Completed')}
              >
                <Text style={[styles.tabText, activeTab === 'Completed' && styles.tabTextActive]}>Completed</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Order List */}
        <View style={styles.orderList}>
          {filteredOrders.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: colors.outline }}>No {activeTab.toLowerCase()} orders.</Text>
          ) : (
            filteredOrders.map(order => {
              const item = order.orderItems?.[0];
              return (
                <TouchableOpacity key={order.id} style={styles.orderCard} activeOpacity={0.9}>
                  <View style={styles.orderCardHeader}>
                    <View>
                      <View style={styles.orderIdRow}>
                        <Text style={styles.orderIdText}>#{order.orderNumber?.substring(0, 8).toUpperCase()}</Text>
                        <View style={styles.statusBadge}>
                          <View style={styles.statusDot} />
                          <Text style={styles.statusBadgeText}>{order.status}</Text>
                        </View>
                      </View>
                      <Text style={styles.orderTimeText}>Placed recently</Text>
                    </View>
                    <View style={styles.orderValueCol}>
                      <Text style={styles.orderPrice}>${order.totalAmount?.toFixed(2)}</Text>
                      <Text style={styles.orderItemCount}>{order.orderItems?.length || 0} items</Text>
                    </View>
                  </View>
                  
                  <View style={styles.orderItemsPreview}>
                    <Image 
                      source={{ uri: item?.productImageUrl || 'https://via.placeholder.com/64' }}
                      style={styles.itemPreviewImg}
                    />
                    <View style={styles.itemPreviewInfo}>
                      <Text style={styles.itemPreviewTitle} numberOfLines={1}>{item?.productName || 'Order Item'}</Text>
                      {order.orderItems?.length > 1 && (
                        <Text style={styles.itemPreviewSub}>+ {order.orderItems.length - 1} other item(s)</Text>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.orderCardFooter}>
                    <TouchableOpacity style={styles.outlineBtn}>
                      <Text style={styles.outlineBtnText}>Details</Text>
                    </TouchableOpacity>
                    {activeTab === 'New' && (
                      <TouchableOpacity 
                        style={styles.primaryBtn}
                        onPress={() => handleUpdateStatus(order.id, 'PROCESSING')}
                      >
                        <Text style={styles.primaryBtnText}>Accept Order</Text>
                      </TouchableOpacity>
                    )}
                    {activeTab === 'InProgress' && order.status === 'PROCESSING' && (
                      <TouchableOpacity 
                        style={styles.primaryBtn}
                        onPress={() => handleUpdateStatus(order.id, 'SHIPPED')}
                      >
                        <Text style={styles.primaryBtnText}>Mark Shipped</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          )}
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
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.primary,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackMd,
    paddingBottom: spacing.sectionGap,
  },
  headerSection: {
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.primary,
    marginBottom: 8,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginBottom: spacing.stackMd,
  },
  printButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: spacing.stackMd,
  },
  printButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  tabsScroll: {
    marginHorizontal: -spacing.marginMobile,
    paddingHorizontal: spacing.marginMobile,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    gap: 4,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  tabBtnActive: {
    backgroundColor: colors['surface-container-low'],
  },
  tabText: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
  },
  tabTextActive: {
    color: colors.primary,
  },
  orderList: {
    gap: spacing.stackLg,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: spacing.stackMd,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent', // hover would show outline-variant/30
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
    paddingBottom: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  orderIdText: {
    ...typography.labelMd,
    color: colors.primary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['surface-container'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
  },
  statusBadgeText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  orderTimeText: {
    ...typography.bodyMd,
    fontSize: 14,
    color: colors['on-surface-variant'],
  },
  orderValueCol: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  orderItemCount: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  orderItemsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  itemPreviewImg: {
    width: 64,
    height: 64,
    borderRadius: 4,
    backgroundColor: colors['surface-container'],
  },
  itemPreviewInfo: {
    flex: 1,
  },
  itemPreviewTitle: {
    ...typography.bodyMd,
    color: colors.primary,
    fontWeight: '500',
  },
  itemPreviewSub: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginTop: 2,
  },
  customItemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customBadge: {
    backgroundColor: colors['tertiary-fixed'],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  customBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors['on-tertiary-fixed'],
    letterSpacing: 1,
  },
  orderCardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.stackSm,
    paddingTop: spacing.stackSm,
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  outlineBtnText: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  primaryBtnText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});
