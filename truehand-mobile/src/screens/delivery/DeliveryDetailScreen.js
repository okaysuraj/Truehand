import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useDeliveryStore } from '../../store/useDeliveryStore';

export default function DeliveryDetailScreen() {
  const navigation = useNavigation();
  const activeDelivery = useDeliveryStore(state => state.activeDelivery);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Detail</Text>
        <View style={styles.iconButton} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Main Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{activeDelivery?.status || 'IN PROGRESS'}</Text>
            </View>
            <Text style={styles.addressTitle}>{activeDelivery?.deliveryAddress || '1248 Evergreen Terrace'}</Text>
            <Text style={styles.addressSubtitle}>Customer Address</Text>
          </View>

          <View style={styles.customerSection}>
            <View style={styles.customerInfo}>
              <View style={styles.customerAvatar}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB56VZj-sfdLANigJEy3Yf5RiUbS1sk8zT9HD8tAzFBP13JZU9WL4vg1aRwpPjrJLI5_n4xfcqR-DIfqwV8n9PcxHyBmSCbG6AakWf0ZV8JZdqLDaer65SCClpQFD3QZfuNCU7V311lUGOoWtqoRJ6FTPryC3qzWPSKzv5khoLiEP89CZwlHu0x1PNOMzYUtGDbckRbd0KMqLJBLiZUw7oYt9fRSw3nqUO-BFkl8cI30vxzT9LeJj3d6g' }}
                  style={styles.avatarImage}
                />
              </View>
              <View>
                <Text style={styles.customerName}>Customer</Text>
                <Text style={styles.customerRole}>Customer</Text>
              </View>
            </View>
            <View style={styles.contactActions}>
              <TouchableOpacity style={styles.actionCircleBtn}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.charcoal} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCircleBtn}>
                <Ionicons name="call-outline" size={20} color={colors.charcoal} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="navigate" size={18} color={colors['on-primary']} />
            <Text style={styles.mapButtonText}>Open in Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Instructions */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsCardHeader}>
            <Ionicons name="information-circle-outline" size={20} color={colors['forest-green']} />
            <Text style={styles.detailsCardTitle}>Delivery Instructions</Text>
          </View>
          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>
              {activeDelivery?.deliveryInstructions || '"Please leave the package at the back door."'}
            </Text>
          </View>
        </View>

        {/* Order Contents */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsCardHeader}>
            <Ionicons name="cube-outline" size={20} color={colors['forest-green']} />
            <Text style={styles.detailsCardTitle}>Order Contents</Text>
          </View>
          
          <View style={styles.orderList}>
            <View style={styles.orderListItem}>
              <Text style={styles.itemTitle}>Artisan Sourdough Loaf</Text>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>x2</Text>
              </View>
            </View>
            <View style={styles.orderListItem}>
              <Text style={styles.itemTitle}>Organic Honey Jar</Text>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>x1</Text>
              </View>
            </View>
            <View style={[styles.orderListItem, { borderBottomWidth: 0 }]}>
              <Text style={styles.itemTitle}>Hand-poured Beeswax Candle</Text>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>x1</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Action Area */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarNote}>
          <Ionicons name="camera-outline" size={16} color={colors['clay-outline']} />
          <Text style={styles.bottomBarNoteText}>Photo proof required</Text>
        </View>
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={() => navigation.navigate('ProofOfDeliveryUpload')}
        >
          <Text style={styles.completeButtonText}>Complete Delivery</Text>
          <Ionicons name="checkmark-circle" size={20} color={colors['on-primary']} />
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
    paddingTop: spacing.stackMd,
    paddingBottom: 120, // space for bottom bar
  },
  infoCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackMd,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 2,
    marginBottom: spacing.stackMd,
  },
  infoCardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-high'],
    paddingBottom: spacing.stackSm,
    marginBottom: spacing.stackSm,
  },
  statusBadge: {
    backgroundColor: colors['primary-container'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusBadgeText: {
    ...typography.labelSm,
    color: colors['on-primary-container'],
    letterSpacing: 1,
  },
  addressTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
  },
  addressSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginTop: 4,
  },
  customerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.stackSm,
    marginBottom: spacing.stackSm,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackSm,
  },
  customerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors['surface-container-high'],
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  customerName: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  customerRole: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  contactActions: {
    flexDirection: 'row',
    gap: spacing.stackSm,
  },
  actionCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 4,
  },
  mapButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  detailsCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackMd,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 2,
    marginBottom: spacing.stackMd,
  },
  detailsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.stackSm,
  },
  detailsCardTitle: {
    ...typography.labelMd,
    color: colors['forest-green'],
  },
  instructionBox: {
    borderLeftWidth: 2,
    borderLeftColor: colors['primary-fixed-dim'],
    paddingLeft: 12,
  },
  instructionText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    fontStyle: 'italic',
  },
  orderList: {
    flexDirection: 'column',
  },
  orderListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-high'],
  },
  itemTitle: {
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 1,
    borderTopColor: colors['surface-container'],
    padding: spacing.marginMobile,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 10,
  },
  bottomBarNote: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  bottomBarNoteText: {
    ...typography.labelSm,
    color: colors['clay-outline'],
  },
  completeButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 8,
  },
  completeButtonText: {
    ...typography.headlineMd,
    color: colors['on-primary'],
  },
});
