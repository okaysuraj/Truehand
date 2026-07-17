import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { useOrderStore } from '../store/useOrderStore';

export default function ReturnRequestScreen() {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState({ item1: true, item2: false });
  const [returnReason, setReturnReason] = useState('');
  const [returnMethod, setReturnMethod] = useState('dropoff'); // dropoff | pickup
  const [comments, setComments] = useState('');

  const toggleItem = (itemId) => {
    setSelectedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const requestReturn = useOrderStore(state => state.requestReturn);
  const currentOrder = useOrderStore(state => state.currentOrder);

  const handleSubmitReturn = async () => {
    try {
      if (currentOrder?.id) {
        await requestReturn(currentOrder.id, { reason: returnReason, method: returnMethod, comments });
      }
      navigation.goBack(); // or navigate to a success screen
    } catch (error) {
      console.error('Failed to submit return', error);
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.charcoal} />
          <Text style={styles.cancelText}>Cancel Return</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Return Request</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Order #{currentOrder?.orderNumber || 'TH-94821'}</Text>
          <Text style={styles.pageSubtitle}>
            Select the items you wish to return from this order. Items marked as final sale cannot be returned.
          </Text>
        </View>

        {/* Items Selection */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>SELECT ITEMS</Text>
          
          <TouchableOpacity 
            style={[styles.itemRow, selectedItems.item1 && styles.itemRowSelected]} 
            onPress={() => toggleItem('item1')}
            activeOpacity={0.8}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, selectedItems.item1 && styles.checkboxChecked]}>
                {selectedItems.item1 && <Ionicons name="checkmark" size={14} color={colors['surface-container-lowest']} />}
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUr-iHnolfWYlG4snqGa4cxUHAat3IjA506G_a5I-3UEqmvu1dGvIx5e4Vi3XqYNxGNdtXh9SbHnu_JjjEmSSpy56Pj56Wtiq5iRZ5Ep1qk4XjEguRLsbQQd7joCth2zDkDlKosYJvrCUN2Hojxymk9qqiLzqgEEvw3eXPXRww3G9j_uhzBMxAVXu3oDPPHzkwe8WeFGi1CO42SEKapeLMWXueEHuN4xzdWiL0xEkHQZ8BA5JLMPoGXQ' }}
                style={styles.itemImage}
              />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Hand-thrown Speckled Mug</Text>
              <Text style={styles.itemVariant}>Variant: Natural Stone</Text>
              <Text style={styles.itemPrice}>$45.00</Text>
            </View>
            <View style={styles.qtyControls}>
              <TouchableOpacity style={styles.qtyBtn}><Ionicons name="remove" size={16} color={colors.outline} /></TouchableOpacity>
              <Text style={styles.qtyText}>1</Text>
              <TouchableOpacity style={styles.qtyBtn}><Ionicons name="add" size={16} color={colors.outline} /></TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.itemRow, selectedItems.item2 && styles.itemRowSelected, { opacity: 0.6 }]} 
            onPress={() => toggleItem('item2')}
            activeOpacity={0.8}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, selectedItems.item2 && styles.checkboxChecked]}>
                {selectedItems.item2 && <Ionicons name="checkmark" size={14} color={colors['surface-container-lowest']} />}
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC2cMJ36D8Z4s0Smq81YXGUKYBfbge0LOn0F24EVcsvknxvRug1dYAAgU7knCw-uX2WbUtL11ROB2tjnCmZzHclz4jLf7ci8NvahcJ8Q2I1fCr68AYXT66OJpbozg1pTAdw0bdkaLNRWgY1HiljJ9ZfzKpZ6T8rAwDgDBdx4EANaVL07j4GPNGXF-vUO9i8JmvN0owBU5EkmgBt-cLPff1-wUaKIsNuqrrC5coBcEiA0BYcD3Qnn9Jww' }}
                style={styles.itemImage}
              />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Artisan Linen Throw</Text>
              <Text style={styles.itemVariant}>Variant: Deep Moss</Text>
              <Text style={styles.itemPrice}>$120.00</Text>
            </View>
            <View style={[styles.qtyControls, { opacity: 0.5 }]}>
              <View style={styles.qtyBtn}><Ionicons name="remove" size={16} color={colors.outline} /></View>
              <Text style={styles.qtyText}>0</Text>
              <View style={styles.qtyBtn}><Ionicons name="add" size={16} color={colors.outline} /></View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Reason Details */}
        {selectedItems.item1 && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>RETURN DETAILS FOR: HAND-THROWN SPECKLED MUG</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Reason for Return</Text>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>{returnReason || 'Select a reason...'}</Text>
                <Ionicons name="chevron-down" size={20} color={colors.outline} />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Additional Comments (Optional)</Text>
              <TextInput 
                style={styles.textArea}
                multiline
                numberOfLines={3}
                placeholder="Please provide any additional details..."
                placeholderTextColor={colors.outline}
                value={comments}
                onChangeText={setComments}
              />
            </View>
          </View>
        )}

        {/* Return Method */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>RETURN METHOD</Text>
          
          <TouchableOpacity 
            style={[styles.methodCard, returnMethod === 'dropoff' && styles.methodCardSelected]}
            onPress={() => setReturnMethod('dropoff')}
            activeOpacity={0.8}
          >
            <View style={styles.methodHeader}>
              <Ionicons name="cube-outline" size={24} color={returnMethod === 'dropoff' ? colors['forest-green'] : colors.charcoal} />
              <View style={styles.radio}>
                {returnMethod === 'dropoff' && <View style={styles.radioInner} />}
              </View>
            </View>
            <Text style={styles.methodTitle}>Pre-paid Drop-off</Text>
            <Text style={styles.methodDesc}>Print label and drop at any partnered courier location.</Text>
            <Text style={styles.methodPrice}>Free</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.methodCard, returnMethod === 'pickup' && styles.methodCardSelected]}
            onPress={() => setReturnMethod('pickup')}
            activeOpacity={0.8}
          >
            <View style={styles.methodHeader}>
              <Ionicons name="home-outline" size={24} color={returnMethod === 'pickup' ? colors['forest-green'] : colors.charcoal} />
              <View style={styles.radio}>
                {returnMethod === 'pickup' && <View style={styles.radioInner} />}
              </View>
            </View>
            <Text style={styles.methodTitle}>Home Pickup</Text>
            <Text style={styles.methodDesc}>Courier collects package from your address next business day.</Text>
            <Text style={[styles.methodPrice, { color: colors.charcoal, fontWeight: 'normal' }]}>$5.00 deducted from refund</Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmitReturn}>
            <Text style={styles.primaryButtonText}>Submit Return Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Save Draft</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  cancelText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    textAlign: 'center',
    flex: 2,
  },
  headerRight: {
    flex: 1,
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
    marginBottom: 8,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  sectionCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.gutter,
    marginBottom: spacing.stackLg,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
    letterSpacing: 0.5,
    marginBottom: spacing.stackMd,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
    paddingBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.stackMd,
    padding: spacing.stackMd,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.5)',
    borderRadius: 8,
    marginBottom: spacing.stackMd,
  },
  itemRowSelected: {
    backgroundColor: 'rgba(246, 243, 242, 0.5)',
  },
  checkboxContainer: {
    paddingTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
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
  },
  itemName: {
    ...typography.bodyMd,
    color: colors.charcoal,
    marginBottom: 4,
  },
  itemVariant: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 8,
  },
  itemPrice: {
    ...typography.labelMd,
    color: colors['forest-green'],
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    borderRadius: 4,
    backgroundColor: colors['surface-container-lowest'],
    height: 32,
    alignSelf: 'flex-end',
  },
  qtyBtn: {
    paddingHorizontal: 8,
    height: '100%',
    justifyContent: 'center',
  },
  qtyText: {
    ...typography.labelSm,
    paddingHorizontal: 8,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.5)',
    height: '100%',
    textAlignVertical: 'center',
    lineHeight: 30, // rough vertical centering
  },
  formGroup: {
    marginBottom: spacing.stackMd,
  },
  inputLabel: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors['outline-variant'],
    paddingBottom: 8,
  },
  pickerText: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  textArea: {
    backgroundColor: colors['surface-container-low'],
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    borderRadius: 8,
    padding: 12,
    ...typography.bodyMd,
    color: colors.charcoal,
    textAlignVertical: 'top',
  },
  methodCard: {
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    borderRadius: 8,
    padding: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  methodCardSelected: {
    borderColor: colors['forest-green'],
    backgroundColor: 'rgba(22, 52, 40, 0.05)',
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors['forest-green'],
  },
  methodTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginBottom: 4,
  },
  methodDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    fontSize: 14,
    marginBottom: 8,
  },
  methodPrice: {
    ...typography.labelSm,
    color: colors['forest-green'],
    fontWeight: 'bold',
  },
  actionsContainer: {
    gap: spacing.stackMd,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.charcoal,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
});
