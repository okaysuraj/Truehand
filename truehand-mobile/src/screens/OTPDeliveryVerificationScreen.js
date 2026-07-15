import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function OTPDeliveryVerificationScreen() {
  const navigation = useNavigation();
  const [code, setCode] = useState('');

  const handleKeyPress = (val) => {
    if (code.length < 4) {
      setCode(prev => prev + val);
    }
  };

  const handleBackspace = () => {
    if (code.length > 0) {
      setCode(prev => prev.slice(0, -1));
    }
  };

  const handleVerify = () => {
    if (code.length === 4) {
      navigation.navigate('DeliverySuccess');
    }
  };

  // Render 4 boxes
  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 4; i++) {
      boxes.push(
        <View key={i} style={[styles.codeBox, code.length === i && styles.codeBoxActive]}>
          <Text style={styles.codeText}>{code[i] || ''}</Text>
        </View>
      );
    }
    return boxes;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Route</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="headset-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Ionicons name="lock-closed-outline" size={48} color={colors['forest-green']} style={styles.lockIcon} />
          <Text style={styles.title}>Secure Handover</Text>
          <Text style={styles.subtitle}>
            Please enter the 4-digit verification code provided by the customer to complete this premium delivery.
          </Text>

          <View style={styles.codeContainer}>
            {renderBoxes()}
          </View>

          <TouchableOpacity style={styles.resendBtn}>
            <Ionicons name="refresh-outline" size={16} color={colors.terracotta} />
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          {/* Custom Keypad */}
          <View style={styles.keypad}>
            {['1','2','3','4','5','6','7','8','9'].map(num => (
              <TouchableOpacity key={num} style={styles.keyBtn} onPress={() => handleKeyPress(num)}>
                <Text style={styles.keyText}>{num}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.keyBtn} />
            <TouchableOpacity style={styles.keyBtn} onPress={() => handleKeyPress('0')}>
              <Text style={styles.keyText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={handleBackspace}>
              <Ionicons name="backspace-outline" size={24} color={colors.charcoal} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, code.length < 4 && styles.primaryButtonDisabled]} 
            onPress={handleVerify}
            disabled={code.length < 4}
          >
            <Ionicons name="checkmark-done" size={20} color={colors['on-primary']} />
            <Text style={styles.primaryButtonText}>Verify & Handover</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
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
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -8,
    marginRight: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    flexGrow: 1,
    padding: spacing.marginMobile,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackLg,
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
  },
  lockIcon: {
    marginBottom: spacing.stackMd,
    fontWeight: '300',
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.stackLg,
    maxWidth: 280,
  },
  codeContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: spacing.stackLg,
  },
  codeBox: {
    width: 60,
    height: 72,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeBoxActive: {
    borderColor: colors['forest-green'],
    borderWidth: 2,
  },
  codeText: {
    ...typography.displayLg,
    color: colors.charcoal,
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.stackLg,
  },
  resendText: {
    ...typography.labelMd,
    color: colors.terracotta,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 280,
    marginBottom: spacing.stackLg,
  },
  keyBtn: {
    width: '33%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  primaryButton: {
    w_idth: '100%',
    width: '100%',
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 4,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
    marginTop: spacing.stackSm,
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
});
