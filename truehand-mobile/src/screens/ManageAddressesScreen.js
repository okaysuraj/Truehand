import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const ADDRESSES = [
  {
    id: 1,
    label: 'Studio',
    isPrimary: true,
    name: 'Julian Thorne',
    address: '14 Artisan Way, Suite 4B\nCraftsmen District\nPortland, OR 97209\nUnited States',
    phone: '+1 (503) 555-0199'
  },
  {
    id: 2,
    label: 'Home',
    isPrimary: false,
    name: 'Julian Thorne',
    address: '842 Pine Ridge Road\nApt 12\nPortland, OR 97214\nUnited States',
    phone: '+1 (503) 555-0842'
  },
  {
    id: 3,
    label: 'Gallery Partner',
    isPrimary: false,
    name: 'Vanguard Ceramics Exhibition',
    address: '200 Main Street\nGallery Row\nSeattle, WA 98104\nUnited States',
    phone: '+1 (206) 555-0322'
  }
];

export default function ManageAddressesScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artisan Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Saved Locations</Text>
          <Text style={styles.pageSubtitle}>Manage your delivery and studio addresses. These details are used to calculate shipping for materials and bespoke commissions.</Text>
        </View>

        <View style={styles.addressList}>
          {ADDRESSES.map((addr) => (
            <View key={addr.id} style={styles.addressCard}>
              <View style={styles.cardHeader}>
                <View style={styles.labelBadge}>
                  <Text style={styles.labelText}>{addr.label}</Text>
                </View>
                {addr.isPrimary && (
                  <Ionicons name="checkmark-circle" size={24} color={colors['forest-green']} />
                )}
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{addr.name}</Text>
                <Text style={styles.cardAddress}>{addr.address}</Text>
                <Text style={styles.cardPhone}>
                  <Text style={styles.phoneLabel}>P: </Text>{addr.phone}
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={[styles.actionBtnText, styles.actionBtnDanger]}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionArea}>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={18} color={colors['on-primary']} />
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -spacing.stackSm,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
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
  pageHeader: {
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  addressList: {
    gap: spacing.stackLg,
    marginBottom: spacing.sectionGap,
  },
  addressCard: {
    backgroundColor: colors['surface-container-lowest'],
    padding: spacing.stackLg,
    borderRadius: 4,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.stackMd,
  },
  labelBadge: {
    backgroundColor: colors['surface-container-low'],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  labelText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  cardBody: {
    marginBottom: spacing.stackLg,
  },
  cardName: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginBottom: 4,
  },
  cardAddress: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    lineHeight: 24,
  },
  cardPhone: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginTop: 8,
  },
  phoneLabel: {
    color: colors['clay-outline'],
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    borderTopWidth: 1,
    borderTopColor: colors['surface-container'],
    paddingTop: spacing.stackMd,
  },
  actionBtn: {
    paddingVertical: 4,
  },
  actionBtnText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  actionBtnDanger: {
    color: colors['error-red'],
  },
  actionArea: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});
