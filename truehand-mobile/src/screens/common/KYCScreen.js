import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

export default function KYCScreen() {
  const navigation = useNavigation();
  const [vehicleDetails, setVehicleDetails] = useState({ plate: '', type: '' });
  
  const handleSaveVehicle = () => {
    if (!vehicleDetails.plate || !vehicleDetails.type) {
      Alert.alert('Error', 'Please fill in all vehicle details.');
      return;
    }
    Alert.alert('Success', 'Vehicle details saved temporarily (not wired to backend yet).');
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artisan Delivery</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Agent Onboarding</Text>
            <Text style={styles.subtitle}>Complete these steps to activate your delivery account.</Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressLineBg} />
            <View style={styles.progressLineActive} />
            
            <View style={styles.step}>
              <View style={[styles.stepCircle, styles.stepComplete]}>
                <Ionicons name="checkmark" size={18} color={colors['on-primary']} />
              </View>
              <Text style={[styles.stepText, styles.stepTextComplete]}>Basic Info</Text>
            </View>
            
            <View style={styles.step}>
              <View style={[styles.stepCircle, styles.stepActive]}>
                <Text style={styles.stepActiveNumber}>2</Text>
              </View>
              <Text style={[styles.stepText, styles.stepTextActive]}>Verification</Text>
            </View>

            <View style={styles.step}>
              <View style={[styles.stepCircle, styles.stepPending]}>
                <Text style={styles.stepPendingNumber}>3</Text>
              </View>
              <Text style={[styles.stepText, styles.stepTextPending]}>Training</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Verification Documents</Text>

            {/* ID Verification - Complete */}
            <View style={[styles.itemBox, styles.itemCompleteBox]}>
              <MaterialIcons name="check-circle" size={24} color={colors['forest-green']} />
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>ID Verification</Text>
                <Text style={styles.itemSubtitle}>Government issued ID successfully verified.</Text>
                <View style={styles.tagsRow}>
                  <View style={styles.tag}><Text style={styles.tagText}>Driver's License</Text></View>
                  <View style={styles.tag}><Text style={styles.tagText}>Exp: 10/2026</Text></View>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Vehicle Details - Error/Action */}
            <View style={[styles.itemBox, styles.itemErrorBox]}>
              <MaterialIcons name="error" size={24} color={colors['error-red'] || '#ba1a1a'} />
              <View style={styles.itemContent}>
                <Text style={[styles.itemTitle, { color: colors['error-red'] || '#ba1a1a' }]}>Vehicle Details</Text>
                <Text style={styles.itemSubtitle}>Please provide your vehicle registration and license plate.</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>License Plate</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="e.g. ABC-123"
                    value={vehicleDetails.plate}
                    onChangeText={(val) => setVehicleDetails({...vehicleDetails, plate: val})}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Vehicle Type</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="e.g. Sedan, SUV, Van"
                    value={vehicleDetails.type}
                    onChangeText={(val) => setVehicleDetails({...vehicleDetails, type: val})}
                  />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveVehicle}>
                  <Text style={styles.saveButtonText}>Save Vehicle</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Profile Photo - Pending */}
            <View style={[styles.itemBox, styles.itemPendingBox]}>
              <MaterialIcons name="pending" size={24} color={colors.outline} />
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>Profile Photo</Text>
                <Text style={styles.itemSubtitle}>Take a clear selfie for your delivery agent profile.</Text>
                <TouchableOpacity style={styles.photoUploadBox}>
                  <MaterialIcons name="photo-camera" size={32} color={colors.outline} />
                  <Text style={styles.photoUploadText}>Tap to capture</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.actionArea}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Save for Later</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.primaryButton, { opacity: 1 }]} 
              onPress={() => navigation.navigate('KYCVerification')}
            >
              <Text style={styles.primaryButtonText}>Continue to Verification</Text>
              <MaterialIcons name="arrow-forward" size={18} color={colors['on-primary']} />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.marginMobile, height: 56, backgroundColor: colors['surface-container-lowest'] },
  backButton: { padding: 8, marginLeft: -8 },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'] },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: 80 },
  titleContainer: { alignItems: 'center', marginBottom: 40 },
  title: { ...typography.headlineLgMobile, color: colors['forest-green'], marginBottom: 8 },
  subtitle: { ...typography.bodyMd, color: colors['on-surface-variant'], textAlign: 'center' },
  progressContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, position: 'relative' },
  progressLineBg: { position: 'absolute', top: 16, left: 0, right: 0, height: 1, backgroundColor: colors['outline-variant'], zIndex: -1 },
  progressLineActive: { position: 'absolute', top: 16, left: 0, right: '50%', height: 1, backgroundColor: colors['forest-green'], zIndex: -1 },
  step: { alignItems: 'center', backgroundColor: colors['surface-linen'], paddingHorizontal: 8 },
  stepCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  stepComplete: { backgroundColor: colors['forest-green'] },
  stepActive: { borderWidth: 2, borderColor: colors['forest-green'], backgroundColor: colors['surface-container-lowest'] },
  stepPending: { borderWidth: 1, borderColor: colors['outline-variant'], backgroundColor: colors['surface-container-lowest'] },
  stepActiveNumber: { ...typography.labelMd, color: colors['forest-green'] },
  stepPendingNumber: { ...typography.labelMd, color: colors.outline },
  stepText: { ...typography.labelSm, marginTop: 8 },
  stepTextComplete: { color: colors['forest-green'] },
  stepTextActive: { color: colors['forest-green'] },
  stepTextPending: { color: colors.outline },
  card: { backgroundColor: colors['surface-container-lowest'], borderRadius: 12, padding: spacing.stackLg, borderWidth: 1, borderColor: colors['surface-container-highest'], marginBottom: 40 },
  cardTitle: { ...typography.headlineMd, color: colors['forest-green'], marginBottom: 16 },
  itemBox: { flexDirection: 'row', padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 16 },
  itemCompleteBox: { backgroundColor: colors['surface-container-low'], borderColor: 'transparent' },
  itemErrorBox: { backgroundColor: 'rgba(186, 26, 26, 0.1)', borderColor: 'rgba(186, 26, 26, 0.2)' },
  itemPendingBox: { backgroundColor: colors['surface-linen'], borderColor: colors['surface-container-highest'] },
  itemContent: { flex: 1, marginLeft: 12 },
  itemTitle: { ...typography.labelMd, color: colors.charcoal, marginBottom: 4 },
  itemSubtitle: { ...typography.bodyMd, color: colors['on-surface-variant'], marginBottom: 8 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: colors['surface-container-highest'], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  tagText: { ...typography.labelSm, color: colors.charcoal },
  editText: { ...typography.labelSm, color: colors['forest-green'], textDecorationLine: 'underline' },
  inputGroup: { marginTop: 12 },
  label: { ...typography.labelSm, color: colors.charcoal, marginBottom: 4 },
  input: { borderBottomWidth: 1, borderBottomColor: colors.outline, paddingVertical: 8, ...typography.bodyMd },
  saveButton: { backgroundColor: colors['forest-green'], paddingVertical: 10, paddingHorizontal: 16, borderRadius: 4, marginTop: 16, alignSelf: 'flex-start' },
  saveButtonText: { ...typography.labelMd, color: colors['on-primary'] },
  photoUploadBox: { marginTop: 16, height: 100, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.outline, borderRadius: 8, backgroundColor: colors['surface-container-low'], alignItems: 'center', justifyContent: 'center' },
  photoUploadText: { ...typography.labelSm, color: colors.outline, marginTop: 8 },
  actionArea: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, borderTopWidth: 1, borderTopColor: colors['surface-container-highest'], paddingTop: 24 },
  secondaryButton: { flex: 1, minWidth: '45%', paddingVertical: 12, borderWidth: 1, borderColor: colors.charcoal, borderRadius: 4, alignItems: 'center' },
  secondaryButtonText: { ...typography.labelMd, color: colors.charcoal },
  primaryButton: { flex: 1, minWidth: '45%', paddingVertical: 12, backgroundColor: colors['forest-green'], borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0.5 },
  primaryButtonText: { ...typography.labelMd, color: colors['on-primary'] }
});
