import api from '../services/api';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const TABS = ['All Orders', 'Active', 'Completed'];

const ORDERS = [
  {
    id: '8492-A',
    title: 'Speckled Ceramic Bowl',
    status: 'In Transit',
    date: 'Arriving Oct 24',
    price: '$68.00',
    image: 'https://via.placeholder.com/150',
    isActive: true,
  },
  {
    id: '8501-B',
    title: 'Terracotta Leather Tote',
    status: 'Processing',
    date: 'Placed Oct 18',
    price: '$245.00',
    image: 'https://via.placeholder.com/150',
    isActive: true,
  },
  {
    id: '8210-C',
    title: 'Carved Walnut Spoon',
    status: 'Delivered',
    date: 'Delivered Sep 12',
    price: '$42.00',
    image: 'https://via.placeholder.com/150',
    isActive: false,
  }
];

export default function OrdersListScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All Orders');

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Transit':
        return { bg: colors['secondary-fixed'], text: colors['on-secondary-fixed'] };
      case 'Processing':
        return { bg: colors['surface-variant'], text: colors['on-surface-variant'] };
      case 'Delivered':
        return { bg: colors['primary-fixed'], text: colors['on-primary-fixed'] };
      default:
        return { bg: colors['surface-variant'], text: colors['on-surface-variant'] };
    }
  };

  const filteredOrders = ORDERS.filter(order => {
    if (activeTab === 'All Orders') return true;
    if (activeTab === 'Active') return order.isActive;
    if (activeTab === 'Completed') return !order.isActive;
    return true;
  });
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={28} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artisan Goods</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bag-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Your Orders</Text>
          <Text style={styles.pageSubtitle}>Track and review your artisan acquisitions.</Text>
        </View>

        {/* Filter Chips */}
        <View style={styles.chipsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
            {TABS.map(tab => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity 
                  key={tab} 
                  style={[styles.chip, isActive && styles.chipActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Orders List */}
        <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
          {filteredOrders.map(order => {
            const statusStyle = getStatusColor(order.status);
            
            return (
              <TouchableOpacity 
                key={order.id} 
                style={[styles.orderCard, !order.isActive && styles.orderCardInactive]}
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: order.image }} style={styles.orderImage} />
                </View>
                
                <View style={styles.orderInfo}>
                  <View style={styles.orderTopRow}>
                    <View style={styles.titleSection}>
                      <Text style={styles.orderId}>Order #{order.id}</Text>
                      <Text style={styles.orderTitle} numberOfLines={1}>{order.title}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                      <Text style={[styles.statusText, { color: statusStyle.text }]}>
                        {order.status}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.orderBottomRow}>
                    <Text style={styles.orderDate}>{order.date}</Text>
                    <Text style={styles.orderPrice}>{order.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22, 52, 40, 0.05)',
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    flex: 1,
    paddingTop: spacing.stackLg,
  },
  pageHeader: {
    paddingHorizontal: spacing.marginMobile,
    marginBottom: spacing.stackLg,
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
  chipsContainer: {
    marginBottom: spacing.stackLg,
  },
  chipsScroll: {
    paddingHorizontal: spacing.marginMobile,
    gap: spacing.stackSm,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors['surface-container'],
    borderWidth: 1,
    borderColor: 'rgba(114, 121, 116, 0.2)', // clay-outline/20
  },
  chipActive: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
  },
  chipText: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
  },
  chipTextActive: {
    color: colors['on-primary'],
  },
  listContainer: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.sectionGap,
    gap: spacing.stackMd,
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackSm,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  orderCardInactive: {
    opacity: 0.75,
  },
  imageContainer: {
    width: 96,
    height: 96,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors['surface-container'],
  },
  orderImage: {
    width: '100%',
    height: '100%',
  },
  orderInfo: {
    flex: 1,
    marginLeft: spacing.stackMd,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    paddingRight: 8,
  },
  orderId: {
    ...typography.labelSm,
    color: colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  orderTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    ...typography.labelSm,
  },
  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  orderDate: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  orderPrice: {
    ...typography.labelMd,
    color: colors['forest-green'],
  }
});
