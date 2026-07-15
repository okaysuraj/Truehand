import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';
import { colors, typography, spacing } from '../theme/theme';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const register = useAuthStore((state) => state.register);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = async () => {
    if (!agreeTerms) {
      Alert.alert('Terms & Conditions', 'You must agree to the terms and conditions.');
      return;
    }
    try {
      await register({ name: fullName, email, password });
      Alert.alert('Success', 'Account created successfully! Please login.', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') }
      ]);
    } catch (err) {
      Alert.alert('Registration Failed', err.message || 'Could not create account.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>
                Join the TrueHand collective and explore authentic craftsmanship.
              </Text>
            </View>

            <View style={styles.form}>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Jane Doe"
                  placeholderTextColor={colors.outline}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="jane@example.com"
                  placeholderTextColor={colors.outline}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="••••••••"
                    placeholderTextColor={colors.outline}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon} 
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color={colors.outline} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.termsContainer}>
                <TouchableOpacity 
                  style={styles.checkbox} 
                  onPress={() => setAgreeTerms(!agreeTerms)}
                >
                  <View style={[styles.checkboxBox, agreeTerms && styles.checkboxBoxActive]}>
                    {agreeTerms && <Ionicons name="checkmark" size={14} color={colors['surface-container-lowest']} />}
                  </View>
                  <Text style={styles.termsText}>
                    I agree to the <Text style={styles.linkText}>Terms & Conditions</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
                <Text style={styles.submitBtnText}>Join the Collective</Text>
                <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
              </TouchableOpacity>

              <View style={styles.loginLinkContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={styles.loginLinkText}>Sign In</Text>
                </TouchableOpacity>
              </View>

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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.marginMobile,
  },
  container: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 8,
    padding: spacing.stackLg,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    maxWidth: 450,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  form: {
    gap: spacing.stackMd,
  },
  inputGroup: {
    marginBottom: spacing.stackSm,
  },
  label: {
    ...typography.labelSm,
    color: colors.charcoal,
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors['outline-variant'],
    paddingVertical: spacing.stackSm,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors['outline-variant'],
  },
  passwordInput: {
    flex: 1,
    paddingVertical: spacing.stackSm,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  eyeIcon: {
    padding: 8,
  },
  termsContainer: {
    marginTop: spacing.stackSm,
    marginBottom: spacing.stackMd,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.stackSm,
  },
  checkboxBox: {
    width: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxActive: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
  },
  termsText: {
    ...typography.bodyMd,
    fontSize: 14,
    color: colors['on-surface-variant'],
    flex: 1,
    lineHeight: 20,
  },
  linkText: {
    color: colors['forest-green'],
    textDecorationLine: 'underline',
  },
  submitBtn: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.stackMd,
    borderRadius: 4,
    gap: spacing.stackSm,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitBtnText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.stackMd,
  },
  loginText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  loginLinkText: {
    ...typography.bodyMd,
    color: colors['forest-green'],
    fontWeight: '500',
    textDecorationLine: 'underline',
  }
});
