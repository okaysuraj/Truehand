import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';
import { deliveryService } from '../services/deliveryService';

export default function KYCVerificationScreen() {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);
  const [docType, setDocType] = useState('passport');
  const [docNumber, setDocNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!docNumber) {
      Alert.alert('Error', 'Please enter your document number.');
      return;
    }

    setLoading(true);
    try {
      if (user?.role === 'DELIVERY' || user?.role === 'CUSTOMER') { // Using CUSTOMER temporarily if role not updated
        await deliveryService.submitKYC(user?.id || 1, {
          userId: user?.id || 1,
          vehicleType: 'Car',
          vehicleNumber: 'N/A',
          kycStatus: 'PENDING'
        });
      }
      
      Alert.alert('Success', 'Document details submitted for verification.', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to submit KYC.');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <MaterialIcons name="security" size={18} color={colors['on-surface-variant']} />
          <Text style={styles.headerTitle}>Secure Verification</Text>
        </View>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="close" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.stepperContainer}>
            <View style={styles.stepperHeader}>
              <Text style={styles.stepperText}>STEP 2 OF 3</Text>
              <Text style={styles.stepperText}>DOCUMENT DETAILS</Text>
            </View>
            <View style={styles.stepperBars}>
              <View style={[styles.stepBar, styles.stepBarComplete]} />
              <View style={[styles.stepBar, styles.stepBarActive]} />
              <View style={[styles.stepBar, styles.stepBarPending]} />
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Verify your Identity</Text>
            <Text style={styles.subtitle}>Please provide a valid government-issued document to ensure the safety and authenticity of our community.</Text>
          </View>

          <View style={styles.formCard}>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>DOCUMENT TYPE</Text>
              <View style={styles.docTypeContainer}>
                
                <TouchableOpacity 
                  style={[styles.docOption, docType === 'passport' && styles.docOptionActive]} 
                  onPress={() => setDocType('passport')}
                >
                  <MaterialIcons name="menu-book" size={28} color={docType === 'passport' ? colors['forest-green'] : colors['on-surface-variant']} />
                  <Text style={[styles.docOptionText, docType === 'passport' && styles.docOptionTextActive]}>Passport</Text>
                  {docType === 'passport' && (
                    <View style={styles.checkIcon}>
                      <Ionicons name="checkmark" size={14} color={colors['on-primary']} />
                    </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.docOption, docType === 'license' && styles.docOptionActive]} 
                  onPress={() => setDocType('license')}
                >
                  <MaterialIcons name="badge" size={28} color={docType === 'license' ? colors['forest-green'] : colors['on-surface-variant']} />
                  <Text style={[styles.docOptionText, docType === 'license' && styles.docOptionTextActive]}>Driver's License</Text>
                  {docType === 'license' && (
                    <View style={styles.checkIcon}>
                      <Ionicons name="checkmark" size={14} color={colors['on-primary']} />
                    </View>
                  )}
                </TouchableOpacity>

              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>DOCUMENT NUMBER</Text>
              <TextInput 
                style={styles.input}
                placeholder="Enter exactly as shown"
                value={docNumber}
                onChangeText={setDocNumber}
                placeholderTextColor={colors['outline-variant']}
              />
            </View>

            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>DOCUMENT PHOTO</Text>
                <Text style={styles.requiredText}>*Required</Text>
              </View>
              <TouchableOpacity style={styles.uploadArea}>
                <View style={styles.uploadIconCircle}>
                  <MaterialIcons name="add-a-photo" size={24} color={colors['forest-green']} />
                </View>
                <Text style={styles.uploadTitle}>Tap to take a photo</Text>
                <Text style={styles.uploadSubtitle}>or upload from gallery</Text>
                <View style={styles.uploadTags}>
                  <View style={styles.uploadTag}><Text style={styles.uploadTagText}>JPG, PNG</Text></View>
                  <View style={styles.uploadTag}><Text style={styles.uploadTagText}>Max 10MB</Text></View>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
              <Text style={styles.primaryButtonText}>Continue</Text>
              <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
            </TouchableOpacity>

            <View style={styles.trustIndicator}>
              <MaterialIcons name="verified-user" size={16} color={colors.outline} />
              <Text style={styles.trustText}>Data is encrypted and securely processed.</Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.marginMobile, height: 56, borderBottomWidth: 1, borderBottomColor: colors['surface-container'] },
  headerButton: { padding: 8, marginHorizontal: -8 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { ...typography.labelMd, color: colors['on-surface-variant'] },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: 80, alignItems: 'center' },
  stepperContainer: { width: '100%', maxWidth: 520, marginBottom: spacing.stackLg, marginTop: spacing.stackMd },
  stepperHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stepperText: { ...typography.labelSm, color: colors['on-surface-variant'], fontSize: 10, letterSpacing: 1 },
  stepperBars: { flexDirection: 'row', gap: 8, height: 4 },
  stepBar: { flex: 1, borderRadius: 2 },
  stepBarComplete: { backgroundColor: colors['forest-green'] },
  stepBarActive: { backgroundColor: colors['forest-green'] },
  stepBarPending: { backgroundColor: colors['surface-container-high'] },
  titleContainer: { width: '100%', maxWidth: 520, marginBottom: spacing.stackLg },
  title: { ...typography.headlineLgMobile, color: colors['forest-green'], marginBottom: 8 },
  subtitle: { ...typography.bodyMd, color: colors['on-surface-variant'] },
  formCard: { width: '100%', maxWidth: 520, backgroundColor: colors['surface-container-lowest'], borderRadius: 16, padding: spacing.stackLg, shadowColor: colors['forest-green'], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 24, elevation: 2, borderWidth: 1, borderColor: colors['surface-container'] },
  formGroup: { marginBottom: spacing.stackLg },
  label: { ...typography.labelSm, color: colors['on-surface-variant'], letterSpacing: 1, marginBottom: 8 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  requiredText: { ...typography.labelSm, color: colors.terracotta },
  docTypeContainer: { flexDirection: 'row', gap: 12 },
  docOption: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 20, borderRadius: 12, borderWidth: 1, borderColor: colors['outline-variant'] },
  docOptionActive: { borderColor: colors['forest-green'], backgroundColor: 'rgba(200, 234, 216, 0.1)' },
  docOptionText: { ...typography.labelMd, color: colors['on-surface-variant'] },
  docOptionTextActive: { color: colors['forest-green'] },
  checkIcon: { position: 'absolute', top: 12, right: 12, width: 20, height: 20, borderRadius: 10, backgroundColor: colors['forest-green'], alignItems: 'center', justifyContent: 'center' },
  input: { borderBottomWidth: 1, borderBottomColor: colors['outline-variant'], paddingVertical: 12, paddingHorizontal: 4, ...typography.bodyMd, color: colors.charcoal },
  uploadArea: { borderWidth: 1, borderStyle: 'dashed', borderColor: colors['outline-variant'], borderRadius: 12, padding: 32, alignItems: 'center', backgroundColor: colors['surface-container-low'] },
  uploadIconCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors['on-primary'], alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, marginBottom: 16 },
  uploadTitle: { ...typography.labelMd, color: colors['forest-green'], marginBottom: 4 },
  uploadSubtitle: { ...typography.bodyMd, fontSize: 14, color: colors['on-surface-variant'], marginBottom: 12 },
  uploadTags: { flexDirection: 'row', gap: 8 },
  uploadTag: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 4, borderWidth: 1, borderColor: colors['surface-variant'] },
  uploadTagText: { ...typography.labelSm, fontSize: 11, color: colors['on-surface-variant'] },
  primaryButton: { backgroundColor: colors['forest-green'], flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 16, borderRadius: 12, marginTop: 16 },
  primaryButtonText: { ...typography.labelMd, color: colors['on-primary'] },
  trustIndicator: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors['surface-variant'] },
  trustText: { ...typography.labelSm, color: colors.outline }
});
