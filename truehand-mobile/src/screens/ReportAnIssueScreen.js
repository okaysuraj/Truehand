import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function ReportAnIssueScreen() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [description, setDescription] = useState('');
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);

  const SUBJECT_OPTIONS = [
    'Craftsmanship Quality Issue',
    'Shipping & Delivery Delay',
    'Item Not As Described',
    'Other Inquiry'
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={styles.rightSpacer} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Tell us what happened</Text>
            <Text style={styles.pageSubtitle}>
              We hold our artisans to the highest standards. Please share the details of your experience so we can make it right.
            </Text>
          </View>

          <View style={styles.formContainer}>
            
            {/* Subject Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subject</Text>
              <TouchableOpacity 
                style={styles.pickerButton} 
                onPress={() => setShowSubjectPicker(!showSubjectPicker)}
              >
                <Text style={[styles.pickerText, !subject && styles.placeholderText]}>
                  {subject || 'Select an issue category'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={colors['clay-outline']} />
              </TouchableOpacity>
              
              {showSubjectPicker && (
                <View style={styles.pickerDropdown}>
                  {SUBJECT_OPTIONS.map((opt, idx) => (
                    <TouchableOpacity 
                      key={idx} 
                      style={styles.pickerOption}
                      onPress={() => {
                        setSubject(opt);
                        setShowSubjectPicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Order Ref Field */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Order Reference</Text>
                <Text style={styles.optionalText}>Optional</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="e.g. TH-8924-CER"
                placeholderTextColor={colors['outline-variant']}
                value={orderRef}
                onChangeText={setOrderRef}
              />
            </View>

            {/* Description Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Detailed Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Please describe the issue with as much detail as possible..."
                placeholderTextColor={colors['outline-variant']}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>

            {/* Upload Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Upload Evidence</Text>
              <TouchableOpacity style={styles.uploadArea}>
                <Ionicons name="cloud-upload-outline" size={32} color={colors['forest-green']} style={styles.uploadIcon} />
                <Text style={styles.uploadTitle}>Tap to upload photos or documents</Text>
                <Text style={styles.uploadSubtitle}>Max 5MB</Text>
              </TouchableOpacity>
            </View>

            {/* Submit */}
            <View style={styles.submitContainer}>
              <TouchableOpacity style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>Submit Report</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          
          <Text style={styles.footerNote}>
            Your trust is our priority. A member of our concierge team will review your submission and respond within 24 hours.
          </Text>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22, 52, 40, 0.05)',
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  rightSpacer: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  pageHeader: {
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  formContainer: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.marginMobile,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: spacing.stackMd,
    position: 'relative',
    zIndex: 1, // needed for picker dropdown to overlap next elements if we didn't use native picker
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  label: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 4,
  },
  optionalText: {
    ...typography.labelSm,
    color: colors['outline-variant'],
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  pickerText: {
    ...typography.bodyMd,
    color: colors['on-surface'],
  },
  placeholderText: {
    color: colors['outline-variant'],
  },
  pickerDropdown: {
    position: 'absolute',
    top: 70, // Below picker button
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 8,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  pickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-high'],
  },
  pickerOptionText: {
    ...typography.bodyMd,
    color: colors['on-surface'],
  },
  input: {
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...typography.bodyMd,
    color: colors['on-surface'],
    backgroundColor: 'transparent',
  },
  textArea: {
    height: 120,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: colors['clay-outline'],
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: spacing.stackLg,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  uploadIcon: {
    marginBottom: 8,
  },
  uploadTitle: {
    ...typography.labelMd,
    color: colors['forest-green'],
    marginBottom: 4,
  },
  uploadSubtitle: {
    ...typography.labelSm,
    color: colors.outline,
  },
  submitContainer: {
    marginTop: spacing.stackLg,
    paddingTop: spacing.stackMd,
    borderTopWidth: 1,
    borderTopColor: colors['surface-variant'],
  },
  submitBtn: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  submitBtnText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  footerNote: {
    ...typography.labelSm,
    color: colors.outline,
    textAlign: 'center',
    marginTop: spacing.stackLg,
    paddingHorizontal: 16,
  }
});
