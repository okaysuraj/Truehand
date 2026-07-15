import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Dimensions, Alert } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';
import { colors, typography, spacing } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();
  const login = useAuthStore((state) => state.login);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0hesUW3cRu6fb32xJJ7TUnKWli_lloKp4witWrJ2bwAXxLl8M4GnRpXu83kWwhZ-GoHzdUN0btshsR3lzMOGr3mCDgodKdL4GnGJVYA9XZh2nb0CDUKrb63idWaozeqtDwa-jsULtJPj5bv_N1R9HRzuLARovywwbU88q--xC8DNm514ZrtNmvNG8JdpwNVPMBq6vwCxAMCyoUiTO-H7Jni4Kb6VB2Hy-J0yF43WslCGFeyI8_Uj2fw' }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.brandTitle}>TrueHand</Text>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue exploring curated craftsmanship.</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email or Phone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email or phone number"
                  placeholderTextColor={colors.outline}
                  value={identifier}
                  onChangeText={setIdentifier}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.outline}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={async () => {
                  try {
                    await login(identifier, password);
                  } catch (err) {
                    Alert.alert('Login Failed', err.message || 'Please check your credentials.');
                  }
                }}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
                <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
              </TouchableOpacity>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color={colors.charcoal} />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color={colors.charcoal} />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.footerLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.1,
    // Note: react-native doesn't support mix-blend-mode multiply directly on ImageBackground out of the box
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: spacing.marginMobile,
  },
  card: {
    backgroundColor: colors['surface-container-lowest'],
    width: '100%',
    maxWidth: 440,
    borderRadius: 8,
    padding: spacing.stackLg,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.5)',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  brandTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  title: {
    ...typography.displayLg,
    fontSize: 40,
    lineHeight: 44,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing.stackLg,
  },
  inputGroup: {
    marginBottom: spacing.stackMd,
  },
  label: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
    padding: 12,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 4,
    marginTop: spacing.stackMd,
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors['surface-variant'],
  },
  dividerText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    paddingHorizontal: 8,
    letterSpacing: 1,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.stackMd,
    marginBottom: spacing.stackLg,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
  },
  socialButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  footerLink: {
    ...typography.bodyMd,
    color: colors['forest-green'],
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
