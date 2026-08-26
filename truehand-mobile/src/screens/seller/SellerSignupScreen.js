import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sellerService } from '../../services/sellerService';
import { colors, typography, spacing } from '../../theme/theme';

const SellerSignupScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    businessName: '', 
    panNumber: '', 
    gstNumber: '', 
    bankAccountNumber: '', 
    ifscCode: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!form.businessName || !form.panNumber) {
        Alert.alert('Required Fields', 'Please fill out Business Name and PAN.');
        return;
      }
      setStep(2);
    } else {
      if (!form.bankAccountNumber || !form.ifscCode) {
        Alert.alert('Required Fields', 'Please provide your bank details.');
        return;
      }
      
      setLoading(true);
      try {
        const userId = 1; // Replace with actual user ID from Auth context
        await sellerService.submitKYC(userId, form);
        Alert.alert('Success', 'Application submitted successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('SellerDashboard') }
        ]);
      } catch (err) {
        Alert.alert('Error', err.message || 'Failed to submit application.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Become an Artisan</Text>
        <Text style={styles.subtitle}>Verify your business to start selling.</Text>

        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, step >= 1 && styles.progressDotActive]} />
          <View style={[styles.progressLine, step >= 2 && styles.progressLineActive]} />
          <View style={[styles.progressDot, step >= 2 && styles.progressDotActive]} />
        </View>

        <View style={styles.formContainer}>
          {step === 1 ? (
            <View>
              <Text style={styles.sectionTitle}>Business Identity</Text>
              
              <Text style={styles.label}>Business Name *</Text>
              <TextInput 
                style={styles.input} 
                value={form.businessName}
                onChangeText={(text) => handleChange('businessName', text)}
                placeholder="e.g. Elena Studio Craftworks"
                placeholderTextColor={colors['on-surface-variant']}
              />

              <Text style={styles.label}>PAN Number *</Text>
              <TextInput 
                style={[styles.input, { textTransform: 'uppercase' }]} 
                value={form.panNumber}
                onChangeText={(text) => handleChange('panNumber', text.toUpperCase())}
                placeholder="ABCDE1234F"
                placeholderTextColor={colors['on-surface-variant']}
                autoCapitalize="characters"
              />
              <Text style={styles.hint}>Your Permanent Account Number for tax identity.</Text>

              <Text style={styles.label}>GST Number (Optional)</Text>
              <TextInput 
                style={[styles.input, { textTransform: 'uppercase' }]} 
                value={form.gstNumber}
                onChangeText={(text) => handleChange('gstNumber', text.toUpperCase())}
                placeholder="22AAAAA0000A1Z5"
                placeholderTextColor={colors['on-surface-variant']}
                autoCapitalize="characters"
              />
            </View>
          ) : (
            <View>
              <Text style={styles.sectionTitle}>Payout Details</Text>
              
              <Text style={styles.label}>Bank Account Number *</Text>
              <TextInput 
                style={styles.input} 
                value={form.bankAccountNumber}
                onChangeText={(text) => handleChange('bankAccountNumber', text)}
                placeholder="0000123456789"
                keyboardType="numeric"
                placeholderTextColor={colors['on-surface-variant']}
              />

              <Text style={styles.label}>IFSC Code *</Text>
              <TextInput 
                style={[styles.input, { textTransform: 'uppercase' }]} 
                value={form.ifscCode}
                onChangeText={(text) => handleChange('ifscCode', text.toUpperCase())}
                placeholder="SBIN0001234"
                placeholderTextColor={colors['on-surface-variant']}
                autoCapitalize="characters"
              />
              
              <View style={styles.secureBox}>
                <Text style={styles.secureText}>Your financial information is securely processed for payouts.</Text>
              </View>
            </View>
          )}

          <View style={styles.buttonRow}>
            {step > 1 && (
              <TouchableOpacity style={styles.backButton} onPress={() => setStep(step - 1)} disabled={loading}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.submitButton, step === 1 && { flex: 1 }]} onPress={handleNext} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={colors['on-primary']} />
              ) : (
                <Text style={styles.submitButtonText}>{step === 1 ? 'Continue' : 'Submit Application'}</Text>
              )}
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors['surface-linen'] },
  content: { padding: spacing.lg, paddingBottom: 40 },
  title: { ...typography.displayMd, color: colors['forest-green'], textAlign: 'center', marginBottom: spacing.xs },
  subtitle: { ...typography.bodyMd, color: colors['on-surface-variant'], textAlign: 'center', marginBottom: spacing.xl },
  
  progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  progressDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors['outline-variant'] },
  progressDotActive: { backgroundColor: colors['forest-green'] },
  progressLine: { width: 60, height: 2, backgroundColor: colors['outline-variant'], marginHorizontal: 8 },
  progressLineActive: { backgroundColor: colors['forest-green'] },

  formContainer: { backgroundColor: colors['surface-container-lowest'], padding: spacing.lg, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  sectionTitle: { ...typography.headlineSm, color: colors['on-surface'], marginBottom: spacing.lg },
  
  label: { ...typography.labelSm, color: colors['on-surface'], marginBottom: spacing.xs, marginTop: spacing.md },
  input: { borderWidth: 1, borderColor: colors['outline-variant'], borderRadius: 6, padding: spacing.md, ...typography.bodyMd, color: colors['on-surface'] },
  hint: { ...typography.bodySm, fontSize: 12, color: colors['on-surface-variant'], marginTop: 4 },
  
  secureBox: { backgroundColor: 'rgba(22, 52, 40, 0.05)', padding: spacing.md, borderRadius: 8, marginTop: spacing.xl },
  secureText: { ...typography.bodySm, color: colors['on-surface-variant'], textAlign: 'center' },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xl, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors['outline-variant'] },
  backButton: { paddingVertical: 12, paddingHorizontal: 20, borderWidth: 1, borderColor: colors['outline-variant'], borderRadius: 6 },
  backButtonText: { ...typography.labelMd, color: colors['on-surface'] },
  submitButton: { paddingVertical: 12, paddingHorizontal: 20, backgroundColor: colors['forest-green'], borderRadius: 6, flex: 1, marginLeft: spacing.md, alignItems: 'center' },
  submitButtonText: { ...typography.labelMd, color: colors['on-primary'] }
});

export default SellerSignupScreen;
