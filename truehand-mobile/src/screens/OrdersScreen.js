import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';;
import { useAuthStore } from '../store/useAuthStore';
import { useOrderStore } from '../store/useOrderStore';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme/theme';

export default function OrdersScreen({ navigation }) {
  const { user } = useAuthStore();
  const orders = useOrderStore(state => state.orders);
  const loading = useOrderStore(state => state.isLoadingOrders);
  const fetchUserOrders = useOrderStore(state => state.fetchUserOrders);
  
  const [filter, setFilter] = useState('ALL'); // ALL, ACTIVE, COMPLETED

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const getStatusStyles = (status) => {
    switch(status) {
      case 'DELIVERED': 
        return {
          bg: colors['primary-fixed'],
          text: colors['on-primary-fixed']
        };
      case 'CONFIRMED': 
      case 'PENDING':
      case 'IN_TRANSIT':
      case 'OUT_FOR_DELIVERY':
        return {
          bg: colors['surface-variant'],
          text: colors['on-surface-variant'],
          border: 'rgba(193, 200, 195, 0.3)'
        };
      case 'CANCELLED': 
        return {
          bg: colors['error-container'],
          text: colors['on-error-container']
        };
      default: 
        return {
          bg: colors['secondary-fixed'],
          text: colors['on-secondary-fixed']
        };
    }
  };

  const getDisplayStatus = (status) => {
    if (status === 'IN_TRANSIT' || status === 'OUT_FOR_DELIVERY') return 'In Transit';
    if (status === 'CONFIRMED' || status === 'PENDING') return 'Processing';
    if (status === 'DELIVERED') return 'Delivered';
    if (status === 'CANCELLED') return 'Cancelled';
    return status;
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'ALL') return true;
    if (filter === 'ACTIVE') return ['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY'].includes(order.status);
    if (filter === 'COMPLETED') return ['DELIVERED', 'CANCELLED'].includes(order.status);
    return true;
  });

  const renderOrderItem = ({ item }) => {
    // Determine the main item image
    const itemImage = item.orderItems && item.orderItems.length > 0 
      ? item.orderItems[0].productImageUrl || `https://picsum.photos/200/200?random=${item.id}`
      : `https://picsum.photos/200/200?random=${item.id}`;
      
    const itemName = item.orderItems && item.orderItems.length > 0 
      ? item.orderItems[0].productName || 'Artisan Goods'
      : 'Artisan Goods';

    const statusStyle = getStatusStyles(item.status);
    const displayStatus = getDisplayStatus(item.status);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

    return (
      <TouchableOpacity 
        style={[styles.card, item.status === 'DELIVERED' && {opacity: 0.85}]} 
        onPress={() => navigation.navigate('Tracking', { id: item.id })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: itemImage }} style={styles.image} />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.orderNumber}>ORDER #{item.orderNumber ? item.orderNumber.substring(0, 6).toUpperCase() : item.id.toString().substring(0, 6).toUpperCase()}</Text>
              <Text style={styles.itemName} numberOfLines={1}>{itemName}</Text>
            </View>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: statusStyle.bg },
              statusStyle.border && { borderWidth: 1, borderColor: statusStyle.border }
            ]}>
              <Text style={[styles.statusText, { color: statusStyle.text }]}>{displayStatus}</Text>
            </View>
          </View>
          <View style={styles.cardFooterRow}>
            <Text style={styles.dateText}>
              {displayStatus === 'Delivered' ? 'Delivered ' : 'Placed '}
              {new Date(item.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
            </Text>
            <Text style={styles.priceText}>${item.totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors['forest-green']} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>Artisan Goods</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="bag-handle-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Your Orders</Text>
          <Text style={styles.pageSubtitle}>Track and review your artisan acquisitions.</Text>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
            <TouchableOpacity 
              style={[styles.filterChip, filter === 'ALL' ? styles.filterChipActive : styles.filterChipInactive]}
              onPress={() => setFilter('ALL')}
            >
              <Text style={[styles.filterText, filter === 'ALL' ? styles.filterTextActive : styles.filterTextInactive]}>All Orders</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterChip, filter === 'ACTIVE' ? styles.filterChipActive : styles.filterChipInactive]}
              onPress={() => setFilter('ACTIVE')}
            >
              <Text style={[styles.filterText, filter === 'ACTIVE' ? styles.filterTextActive : styles.filterTextInactive]}>Active</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterChip, filter === 'COMPLETED' ? styles.filterChipActive : styles.filterChipInactive]}
              onPress={() => setFilter('COMPLETED')}
            >
              <Text style={[styles.filterText, filter === 'COMPLETED' ? styles.filterTextActive : styles.filterTextInactive]}>Completed</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
            <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList 
            data={filteredOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
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
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
  },
  brandTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  iconButton: {
    padding: spacing.stackSm,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.marginMobile,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors['surface-linen'],
  },
  pageHeader: {
    marginBottom: spacing.stackLg,
    marginTop: spacing.stackMd,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors.outline,
  },
  filtersContainer: {
    marginBottom: spacing.stackLg,
  },
  filtersScroll: {
    gap: spacing.stackSm,
    paddingBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
  },
  filterChipInactive: {
    backgroundColor: colors['surface-container'],
    borderColor: 'rgba(114, 121, 116, 0.2)',
  },
  filterText: {
    ...typography.labelMd,
  },
  filterTextActive: {
    color: colors['on-primary'],
  },
  filterTextInactive: {
    color: colors['on-surface-variant'],
  },
  listContent: {
    paddingBottom: spacing.sectionGap,
    gap: spacing.stackMd,
  },
  card: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackMd,
    flexDirection: 'row',
    gap: spacing.stackMd,
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent', // For hover effect in web, keeping it here for structure
  },
  imageContainer: {
    width: 96,
    height: 96,
    borderRadius: 8,
    backgroundColor: colors['surface-container'],
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  cardContent: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  orderNumber: {
    ...typography.labelSm,
    color: colors.outline,
    marginBottom: 4,
  },
  itemName: {
    ...typography.labelMd,
    color: colors.charcoal,
    maxWidth: 140, // prevent overlap with badge
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    ...typography.labelSm,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  dateText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  priceText: {
    ...typography.labelMd,
    color: colors['forest-green'],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...typography.bodyLg,
    color: colors.outline,
    marginBottom: spacing.stackLg,
  },
  shopButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  shopButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});
