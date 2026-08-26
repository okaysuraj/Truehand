import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';;
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme/theme';

export default function OTPVerificationScreen() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if there's a value
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    Keyboard.dismiss();
    const code = otp.join('');
    // Mock verification
    navigation.navigate('Login');
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Ionicons name="lock-closed-outline" size={48} color={colors['forest-green']} style={styles.icon} />
              <Text style={styles.title}>Enter Verification Code</Text>
              <Text style={styles.subtitle}>
                We've sent a 4-digit code to{'\n'}
                <Text style={styles.highlightText}>your email</Text>
              </Text>
            </View>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => inputs.current[index] = ref}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : null
                  ]}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                <Text style={styles.verifyButtonText}>Verify & Login</Text>
              </TouchableOpacity>

              <View style={styles.secondaryActions}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.linkText}>Change Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resendContainer}>
                  <Ionicons name="refresh-outline" size={16} color={colors.charcoal} />
                  <Text style={styles.resendText}>Resend Code <Text style={styles.timerText}>(0:45)</Text></Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Secure connection encrypted by TrueHand</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.marginMobile,
  },
  card: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackLg,
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  icon: {
    marginBottom: spacing.stackMd,
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors['clay-outline'],
    textAlign: 'center',
    lineHeight: 24,
  },
  highlightText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.stackMd,
    width: '100%',
    marginBottom: spacing.stackLg,
  },
  otpInput: {
    width: 56,
    height: 64,
    borderBottomWidth: 1.5,
    borderBottomColor: colors['outline-variant'],
    ...typography.headlineMd,
    color: colors.charcoal,
    textAlign: 'center',
  },
  otpInputFilled: {
    borderBottomColor: colors['forest-green'],
    borderBottomWidth: 2,
  },
  actionsContainer: {
    width: '100%',
    gap: spacing.stackMd,
  },
  verifyButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
  },
  verifyButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  linkText: {
    ...typography.labelSm,
    color: colors['clay-outline'],
    textDecorationLine: 'underline',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resendText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  timerText: {
    color: colors['clay-outline'],
  },
  footer: {
    paddingBottom: spacing.marginMobile,
    alignItems: 'center',
  },
  footerText: {
    ...typography.labelSm,
    color: colors['clay-outline'],
  }
});
