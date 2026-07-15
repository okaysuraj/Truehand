import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { useOrderStore } from '../store/useOrderStore';

export default function PaymentMethodSelectionScreen() {
  const navigation = useNavigation();
  const setCheckoutData = useOrderStore((state) => state.setCheckoutData);
  const checkoutData = useOrderStore((state) => state.checkoutData);

  const [selectedMethod, setSelectedMethod] = useState(checkoutData.paymentMethod?.type || 'card');
  const [cardNumber, setCardNumber] = useState(checkoutData.paymentMethod?.cardNumber || '');
  const [expiry, setExpiry] = useState(checkoutData.paymentMethod?.expiry || '');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState(checkoutData.paymentMethod?.cardName || '');

  const handleContinue = () => {
    setCheckoutData({
      paymentMethod: {
        type: selectedMethod,
        cardNumber,
        expiry,
        cardName,
      }
    });
    navigation.navigate('OrderSummary');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={styles.iconButton} /> {/* Spacer */}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Payment Method</Text>
            <Text style={styles.pageSubtitle}>Select how you'd like to pay for your handcrafted pieces.</Text>
          </View>

          <View style={styles.optionsList}>
            {/* Credit/Debit Card Option */}
            <TouchableOpacity 
              style={[styles.methodCard, selectedMethod === 'card' && styles.methodCardSelected]}
              onPress={() => setSelectedMethod('card')}
              activeOpacity={0.8}
            >
              <Ionicons name="card-outline" size={24} color={colors.outline} style={styles.methodIcon} />
              <Text style={styles.methodLabel}>Credit or Debit Card</Text>
              <View style={[styles.radioCircle, selectedMethod === 'card' && styles.radioCircleSelected]}>
                {selectedMethod === 'card' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            {/* Card Form */}
            {selectedMethod === 'card' && (
              <View style={styles.cardForm}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Card Number</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="card-outline" size={20} color={colors['outline-variant']} style={styles.inputIconLeft} />
                    <TextInput
                      style={[styles.input, { paddingLeft: 40 }]}
                      placeholder="0000 0000 0000 0000"
                      placeholderTextColor={colors['outline-variant']}
                      keyboardType="numeric"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.gutter }]}>
                    <Text style={styles.inputLabel}>Expiry Date</Text>
                    <TextInput
                      style={[styles.input, { textAlign: 'center' }]}
                      placeholder="MM/YY"
                      placeholderTextColor={colors['outline-variant']}
                      keyboardType="numeric"
                      value={expiry}
                      onChangeText={setExpiry}
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={[styles.input, { textAlign: 'center', paddingRight: 40 }]}
                        placeholder="123"
                        placeholderTextColor={colors['outline-variant']}
                        keyboardType="numeric"
                        secureTextEntry
                        value={cvv}
                        onChangeText={setCvv}
                      />
                      <Ionicons name="help-circle-outline" size={18} color={colors['outline-variant']} style={styles.inputIconRight} />
                    </View>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Name on Card</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Name as it appears on card"
                    placeholderTextColor={colors['outline-variant']}
                    value={cardName}
                    onChangeText={setCardName}
                  />
                </View>
              </View>
            )}

            {/* Apple Pay Option */}
            <TouchableOpacity 
              style={[styles.methodCard, selectedMethod === 'apple_pay' && styles.methodCardSelected]}
              onPress={() => setSelectedMethod('apple_pay')}
              activeOpacity={0.8}
            >
              <Ionicons name="phone-portrait-outline" size={24} color={colors.outline} style={styles.methodIcon} />
              <Text style={styles.methodLabel}>Apple Pay</Text>
              <View style={[styles.radioCircle, selectedMethod === 'apple_pay' && styles.radioCircleSelected]}>
                {selectedMethod === 'apple_pay' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            {/* Bank Transfer Option */}
            <TouchableOpacity 
              style={[styles.methodCard, selectedMethod === 'bank_transfer' && styles.methodCardSelected]}
              onPress={() => setSelectedMethod('bank_transfer')}
              activeOpacity={0.8}
            >
              <Ionicons name="business-outline" size={24} color={colors.outline} style={styles.methodIcon} />
              <Text style={styles.methodLabel}>Bank Transfer</Text>
              <View style={[styles.radioCircle, selectedMethod === 'bank_transfer' && styles.radioCircleSelected]}>
                {selectedMethod === 'bank_transfer' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleContinue}
            >
              <Text style={styles.primaryButtonText}>Continue to Review</Text>
            </TouchableOpacity>
            
            <View style={styles.secureTextRow}>
              <Ionicons name="lock-closed-outline" size={16} color={colors.outline} />
              <Text style={styles.secureText}>Secure Encrypted Checkout</Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  pageHeader: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors.outline,
    textAlign: 'center',
  },
  optionsList: {
    gap: spacing.stackSm,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors['outline-variant'],
  },
  methodCardSelected: {
    borderColor: colors['clay-outline'],
    backgroundColor: colors['surface-linen'],
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  methodIcon: {
    marginRight: 16,
  },
  methodLabel: {
    flex: 1,
    ...typography.labelMd,
    color: colors.charcoal,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: colors['forest-green'],
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors['forest-green'],
  },
  cardForm: {
    backgroundColor: colors['surface-container-low'],
    padding: 24,
    borderRadius: 4,
    marginTop: -8,
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: spacing.stackMd,
  },
  inputLabel: {
    ...typography.labelSm,
    color: colors.charcoal,
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIconLeft: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  inputIconRight: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
    padding: 12,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  row: {
    flexDirection: 'row',
  },
  actionsRow: {
    marginTop: spacing.stackLg,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  primaryButtonText: {
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
