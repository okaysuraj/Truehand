import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';;
import { useAuthStore } from '../../store/useAuthStore';
import { colors, typography, spacing } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const register = useAuthStore((state) => state.register);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    if (!termsAccepted) {
      Alert.alert('Error', 'Please agree to the Terms & Conditions.');
      return;
    }

    const nameParts = form.fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    setLoading(true);
    try {
      await register({
        firstName,
        lastName,
        email: form.email,
        password: form.password,
        role: 'CUSTOMER'
      });
      Alert.alert('Success', 'Verification email sent. Please verify your email before logging in.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (err) {
      Alert.alert('Registration Failed', err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>Join the TrueHand collective and explore authentic craftsmanship.</Text>
            </View>
            
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Jane Doe"
                  placeholderTextColor={colors.outline}
                  value={form.fullName}
                  onChangeText={(val) => setForm({...form, fullName: val})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="jane@example.com"
                  placeholderTextColor={colors.outline}
                  value={form.email}
                  onChangeText={(val) => setForm({...form, email: val})}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput 
                    style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                    placeholder="••••••••"
                    placeholderTextColor={colors.outline}
                    value={form.password}
                    onChangeText={(val) => setForm({...form, password: val})}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.outline} />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputBorder} />
              </View>

              <View style={styles.termsContainer}>
                <TouchableOpacity 
                  style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
                  onPress={() => setTermsAccepted(!termsAccepted)}
                >
                  {termsAccepted && <Ionicons name="checkmark" size={14} color={colors['on-primary']} />}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I agree to the <Text style={styles.link}>Terms & Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.button} 
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors['on-primary']} />
                ) : (
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Join the Collective</Text>
                    <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Sign In</Text>
              </TouchableOpacity>
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
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.marginMobile,
  },
  card: {
    backgroundColor: colors['surface-container-lowest'],
    padding: spacing.stackLg,
    borderRadius: 8,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    marginBottom: spacing.stackMd,
  },
  label: {
    ...typography.labelSm,
    color: colors.charcoal,
    marginBottom: spacing.base,
  },
  input: {
    paddingVertical: spacing.stackSm,
    paddingHorizontal: 0,
    ...typography.bodyMd,
    color: colors.charcoal,
    borderBottomWidth: 1,
    borderBottomColor: colors['outline-variant'],
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBorder: {
    height: 1,
    backgroundColor: colors['outline-variant'],
  },
  eyeIcon: {
    padding: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.stackSm,
    gap: spacing.stackSm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
  },
  termsText: {
    ...typography.bodyMd,
    fontSize: 14,
    color: colors['on-surface-variant'],
    flex: 1,
  },
  button: {
    backgroundColor: colors['forest-green'],
    paddingVertical: spacing.stackMd,
    paddingHorizontal: spacing.gutter,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: spacing.stackMd,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackSm,
  },
  buttonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.stackMd,
  },
  footerText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  link: {
    ...typography.bodyMd,
    fontWeight: '500',
    color: colors['forest-green'],
    textDecorationLine: 'underline',
  },
});
