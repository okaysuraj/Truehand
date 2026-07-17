import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { useOrderStore } from '../store/useOrderStore';

export default function CancelOrderScreen() {
  const navigation = useNavigation();
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherReason, setOtherReason] = useState('');

  const reasons = [
    { id: 'mistake', label: 'I ordered by mistake' },
    { id: 'delivery', label: 'Delivery time is too long' },
    { id: 'price', label: 'Total cost was too high' },
    { id: 'other', label: 'Other reason' }
  ];

  const cancelOrder = useOrderStore(state => state.cancelOrder);
  const currentOrder = useOrderStore(state => state.currentOrder);
  
  const handleCancel = async () => {
    try {
      if (currentOrder?.id) {
        await cancelOrder(currentOrder.id, selectedReason === 'other' ? otherReason : selectedReason);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Failed to cancel order', error);
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cancel Order</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.orderSummaryCard}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.orderIdLabel}>ORDER #{currentOrder?.orderNumber || 'AH-7829'}</Text>
                <Text style={styles.orderTitle}>Order Cancellation</Text>
              </View>
              <Text style={styles.orderPrice}>${currentOrder?.totalAmount || '85.00'}</Text>
            </View>
            
            <View style={styles.cardDetails}>
              <View style={styles.imageContainer}>
                <Ionicons name="image-outline" size={32} color={colors.outline} />
              </View>
              <View style={styles.detailsTextCol}>
                <Text style={styles.detailText}>Artisan: Studio Koto</Text>
                <Text style={styles.detailText}>Material: Speckled Clay</Text>
                <Text style={styles.detailText}>Status: <Text style={{ color: colors['surface-tint'] }}>Processing</Text></Text>
              </View>
            </View>
          </View>

          <View style={styles.reasonsSection}>
            <Text style={styles.sectionTitle}>Why are you canceling?</Text>
            <Text style={styles.sectionSubtitle}>Please let us know so we can improve the artisan experience.</Text>
            
            <View style={styles.optionsList}>
              {reasons.map((reason) => {
                const isSelected = selectedReason === reason.id;
                return (
                  <TouchableOpacity 
                    key={reason.id}
                    style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                    onPress={() => setSelectedReason(reason.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{reason.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {selectedReason === 'other' && (
              <TextInput
                style={styles.otherInput}
                placeholder="Briefly describe your reason..."
                placeholderTextColor={colors['on-surface-variant']}
                multiline
                numberOfLines={3}
                value={otherReason}
                onChangeText={setOtherReason}
              />
            )}
            
            <Text style={styles.noteText}>Note: Refunds typically process within 3-5 business days to the original payment method.</Text>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomBar}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnText}>Keep Order</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.primaryBtn, !selectedReason && { opacity: 0.5 }]} 
            onPress={handleCancel}
            disabled={!selectedReason}
          >
            <Text style={styles.primaryBtnText}>Confirm Cancellation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, backgroundColor: 'rgba(252, 249, 248, 0.8)' },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'], fontWeight: '700' },
  backButton: { padding: 8, marginHorizontal: -8 },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: 100, alignItems: 'center' },
  
  orderSummaryCard: { width: '100%', maxWidth: 600, backgroundColor: colors['surface-container-lowest'], padding: spacing.stackMd, borderRadius: 8, borderWidth: 1, borderColor: colors['surface-variant'], shadowColor: colors.charcoal, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, marginBottom: spacing.stackLg },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderBottomWidth: 1, borderBottomColor: colors['surface-variant'], paddingBottom: 16, marginBottom: 16 },
  orderIdLabel: { ...typography.labelSm, color: colors.outline, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  orderTitle: { ...typography.headlineMd, color: colors.charcoal },
  orderPrice: { ...typography.labelMd, color: colors.charcoal },
  
  cardDetails: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  imageContainer: { width: 80, height: 80, backgroundColor: colors['surface-container-high'], borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  detailsTextCol: { gap: 4 },
  detailText: { ...typography.labelSm, color: colors['on-surface-variant'] },
  
  reasonsSection: { width: '100%', maxWidth: 600 },
  sectionTitle: { ...typography.headlineMd, color: colors.charcoal, marginBottom: 8 },
  sectionSubtitle: { ...typography.bodyMd, color: colors['on-surface-variant'], marginBottom: 16 },
  
  optionsList: { gap: 12 },
  optionCard: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: colors['surface-container-lowest'], borderRadius: 8, borderWidth: 1, borderColor: colors['surface-variant'] },
  optionCardSelected: { borderColor: colors['forest-green'], backgroundColor: 'rgba(22, 52, 40, 0.02)' },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: colors['clay-outline'], alignItems: 'center', justifyContent: 'center' },
  radioOuterSelected: { borderColor: colors['forest-green'] },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors['forest-green'] },
  optionText: { ...typography.bodyMd, color: colors.charcoal },
  optionTextSelected: { color: colors['forest-green'] },
  
  otherInput: { marginTop: 12, backgroundColor: 'transparent', borderWidth: 0, borderBottomWidth: 1, borderBottomColor: colors['clay-outline'], ...typography.bodyMd, color: colors.charcoal, paddingVertical: 8, minHeight: 80, textAlignVertical: 'top' },
  
  noteText: { ...typography.labelSm, color: colors.outline, textAlign: 'center', marginTop: spacing.stackLg },
  
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors['surface-linen'], borderTopWidth: 1, borderTopColor: colors['surface-variant'], padding: spacing.marginMobile, paddingBottom: Platform.OS === 'ios' ? 34 : spacing.marginMobile },
  actionRow: { flexDirection: 'row', gap: 16, maxWidth: 600, alignSelf: 'center', width: '100%' },
  primaryBtn: { flex: 1, backgroundColor: colors['surface-container-highest'], paddingVertical: 16, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { ...typography.labelMd, color: colors.charcoal },
  secondaryBtn: { flex: 1, backgroundColor: colors['forest-green'], paddingVertical: 16, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  secondaryBtnText: { ...typography.labelMd, color: colors['on-primary'] }
});
