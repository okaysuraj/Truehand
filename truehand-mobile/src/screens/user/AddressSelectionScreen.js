import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

export default function AddressSelectionScreen() {
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState('address_1');

  const addresses = [
    {
      id: 'address_1',
      title: 'Home',
      isDefault: true,
      name: 'Jane Doe',
      line1: '123 Artisan Lane, Suite 4B',
      line2: 'Crafted District',
      cityStateZip: 'Portland, OR 97204',
      phone: '(555) 123-4567'
    },
    {
      id: 'address_2',
      title: 'Studio',
      isDefault: false,
      name: 'Jane Doe (Ceramics Dept)',
      line1: '4500 Maker Boulevard, Bldg 2',
      line2: 'North Yard',
      cityStateZip: 'Portland, OR 97217',
      phone: null
    }
  ];
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.introSection}>
          <Text style={styles.title}>Select Shipping Address</Text>
          <Text style={styles.subtitle}>Choose an existing address or add a new one for your delivery.</Text>
        </View>

        <View style={styles.addressList}>
          {addresses.map((address) => {
            const isSelected = selectedAddress === address.id;
            return (
              <TouchableOpacity 
                key={address.id} 
                style={[styles.addressCard, isSelected && styles.addressCardSelected]}
                onPress={() => setSelectedAddress(address.id)}
                activeOpacity={0.8}
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.cardInfo}>
                    <View style={styles.titleRow}>
                      <Text style={styles.addressTitle}>{address.title}</Text>
                      {address.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultBadgeText}>Default</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.nameText}>{address.name}</Text>
                    <Text style={styles.addressText}>{address.line1}</Text>
                    <Text style={styles.addressText}>{address.line2}</Text>
                    <Text style={styles.addressText}>{address.cityStateZip}</Text>
                    {address.phone && (
                      <View style={styles.phoneRow}>
                        <Ionicons name="call" size={14} color={colors['on-surface-variant']} />
                        <Text style={styles.phoneText}>{address.phone}</Text>
                      </View>
                    )}
                  </View>
                  <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                    {isSelected && <Ionicons name="checkmark" size={16} color={colors['on-primary']} />}
                  </View>
                </View>

                <View style={styles.cardActions}>
                  <TouchableOpacity>
                    <Text style={styles.editBtn}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.removeBtn}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddNewAddress')}
          >
            <View style={styles.addIconCircle}>
              <Ionicons name="add" size={24} color={colors['forest-green']} />
            </View>
            <Text style={styles.addBtnText}>Add New Address</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('PaymentMethodSelection')}>
            <Text style={styles.continueBtnText}>Continue to Payment</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, backgroundColor: 'rgba(252, 249, 248, 0.8)' },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'], fontWeight: '700' },
  backButton: { padding: 8, marginHorizontal: -8 },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  
  introSection: { marginBottom: spacing.stackLg, marginTop: spacing.stackLg },
  title: { ...typography.headlineLgMobile, color: colors.charcoal, marginBottom: 8 },
  subtitle: { ...typography.bodyMd, color: colors['on-surface-variant'] },
  
  addressList: { gap: spacing.stackMd },
  addressCard: { backgroundColor: colors['surface-container-lowest'], padding: spacing.gutter, borderRadius: 8, borderWidth: 1, borderColor: 'transparent', shadowColor: colors['forest-green'], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  addressCardSelected: { borderColor: colors['forest-green'], shadowOpacity: 0.1, shadowRadius: 16 },
  
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardInfo: { flex: 1, paddingRight: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  addressTitle: { ...typography.labelMd, color: colors.charcoal },
  defaultBadge: { backgroundColor: colors['surface-container-high'], paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  defaultBadgeText: { ...typography.labelSm, color: colors['on-surface-variant'] },
  
  nameText: { ...typography.bodyLg, color: colors.charcoal, marginBottom: 4 },
  addressText: { ...typography.bodyMd, color: colors['on-surface-variant'], lineHeight: 22 },
  
  phoneRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 },
  phoneText: { ...typography.bodyMd, color: colors['on-surface-variant'] },
  
  radioButton: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors['outline-variant'], alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  radioButtonSelected: { borderColor: colors['forest-green'], backgroundColor: colors['forest-green'] },
  
  cardActions: { flexDirection: 'row', marginTop: spacing.stackMd, paddingTop: spacing.stackSm, borderTopWidth: 1, borderTopColor: colors['surface-container-highest'], gap: spacing.stackMd },
  editBtn: { ...typography.labelMd, color: colors['forest-green'] },
  removeBtn: { ...typography.labelMd, color: colors.outline },
  
  bottomActions: { marginTop: spacing.sectionGap, gap: spacing.stackMd, flexDirection: 'column' },
  addBtn: { borderStyle: 'dashed', borderWidth: 1, borderColor: colors['clay-outline'], borderRadius: 8, padding: spacing.stackLg, alignItems: 'center', justifyContent: 'center', gap: 8 },
  addIconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors['surface-container-highest'], alignItems: 'center', justifyContent: 'center' },
  addBtnText: { ...typography.labelMd, color: colors.charcoal },
  
  continueBtn: { backgroundColor: colors['forest-green'], paddingVertical: 16, borderRadius: 4, alignItems: 'center' },
  continueBtnText: { ...typography.labelMd, color: colors['on-primary'] }
});
