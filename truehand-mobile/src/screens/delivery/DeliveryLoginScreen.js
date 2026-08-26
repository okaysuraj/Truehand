import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function DeliveryLoginScreen() {
  const navigation = useNavigation();
  const login = useAuthStore((state) => state.login); // We'll simulate login
  const [stage, setStage] = useState('initial'); // 'initial' or 'otp'
  const [agentId, setAgentId] = useState('');
  const [otp, setOtp] = useState('');

  const handleGetOtp = () => {
    if (agentId.trim()) {
      setStage('otp');
    }
  };

  const handleVerify = async () => {
    if (otp.length === 6) {
      // In a real app, we'd verify the OTP specifically for delivery roles
      // For demo, we just login and then the app should route based on role.
      // Since our AppNavigator currently just drops us into MainTabs if authenticated,
      // we might need to adjust routing, but for now we'll just navigate to the DeliveryHome manually or trigger auth.
      // Let's just navigate to DeliveryHome for the prototype flow.
      navigation.replace('DeliveryHome');
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          {/* Header Image Area */}
          <ImageBackground
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAECyd6P_Oif71SjrmPZ7lLib0g71c-Jd7l9EV0dw5wFLdakVPH3E61kWT2WVEEd7UraETeF0ZM6X1RCUAR4ffaJPmSqiZ2P0pJjvTkglfqPaHJm98kDh-v-pZcDFtnR67DYlgKWfrWvpfGv5kIaMsVJhxmN-MCRLRvAEOsrKUxPXeDVyZnSqqNrTZUIYP_es9n9WV53rBHE5EL7AVvs6XkUaFzJLsds-7sSd__TsRLqY_MHGUW2R0kvg' }}
            style={styles.headerImage}
            imageStyle={{ opacity: 0.4 }}
          >
            <View style={styles.logoRow}>
              <Ionicons name="car" size={28} color={colors['forest-green']} />
              <Text style={styles.logoText}>TrueHand</Text>
            </View>
          </ImageBackground>

          {/* Form Area */}
          <View style={styles.formArea}>
            <View style={styles.textCenter}>
              <Text style={styles.title}>Agent Login</Text>
              <Text style={styles.subtitle}>Access your delivery manifest and schedule.</Text>
            </View>

            {stage === 'initial' ? (
              <View style={styles.stageContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone Number or Agent ID</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="id-card-outline" size={20} color={colors['clay-outline']} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. +1 555-0198"
                      placeholderTextColor={colors['outline-variant']}
                      value={agentId}
                      onChangeText={setAgentId}
                      keyboardType="default"
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={handleGetOtp}>
                  <Text style={styles.primaryButtonText}>Get OTP</Text>
                  <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.stageContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Enter 6-digit Code</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="keypad-outline" size={20} color={colors['clay-outline']} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, { textAlign: 'center', letterSpacing: 4 }]}
                      placeholder="• • • • • •"
                      placeholderTextColor={colors['outline-variant']}
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.resendText}>Resend Code</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
                  <Text style={styles.primaryButtonText}>Verify & Login</Text>
                  <Ionicons name="log-in-outline" size={18} color={colors['on-primary']} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => setStage('initial')}>
                  <Text style={styles.secondaryButtonText}>Back</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Interested in joining?{' '}
              </Text>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Register as Agent</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.marginMobile,
  },
  container: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  headerImage: {
    height: 128,
    backgroundColor: colors['surface-container-low'],
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-highest'],
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 10,
  },
  logoText: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    letterSpacing: -0.5,
  },
  formArea: {
    padding: spacing.stackLg,
  },
  textCenter: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  stageContainer: {
    gap: spacing.stackMd,
  },
  inputGroup: {
    marginBottom: spacing.stackMd,
  },
  inputLabel: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginBottom: spacing.base,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    backgroundColor: colors['surface-container-lowest'],
    borderWidth: 1,
    borderColor: colors['surface-container-highest'],
    borderRadius: 4,
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 16,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  resendText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    textAlign: 'right',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors['surface-container-highest'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  footer: {
    marginTop: spacing.stackLg,
    paddingTop: spacing.stackMd,
    borderTopWidth: 1,
    borderTopColor: colors['surface-container-highest'],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  footerLink: {
    ...typography.labelMd,
    color: colors['forest-green'],
    textDecorationLine: 'underline',
  },
});
