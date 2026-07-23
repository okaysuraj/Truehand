import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useOrderStore } from '../../store/useOrderStore';

export default function ReportIssueScreen() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [description, setDescription] = useState('');

  const reportIssue = useOrderStore(state => state.reportIssue);
  const currentOrder = useOrderStore(state => state.currentOrder);

  // Prefill order ref if we have a current order
  React.useEffect(() => {
    if (currentOrder?.orderNumber && !orderRef) {
      setOrderRef(currentOrder.orderNumber);
    }
  }, [currentOrder, orderRef]);

  const handleSubmit = async () => {
    try {
      if (currentOrder?.id) {
        await reportIssue(currentOrder.id, { subject, description });
      }
      navigation.goBack(); // or navigate to a success screen
    } catch (error) {
      console.error('Failed to submit report', error);
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.introSection}>
            <Text style={styles.pageTitle}>Tell us what happened</Text>
            <Text style={styles.pageSubtitle}>
              We hold our artisans to the highest standards. Please share the details of your experience so we can make it right.
            </Text>
          </View>

          <View style={styles.formContainer}>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Subject</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.input}
                  placeholder="Select an issue category"
                  placeholderTextColor={colors['outline-variant']}
                  value={subject}
                  onChangeText={setSubject}
                />
                <Ionicons name="chevron-down" size={20} color={colors['clay-outline']} />
              </View>
            </View>

            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Order Reference</Text>
                <Text style={styles.optionalText}>Optional</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.input}
                  placeholder="e.g. TH-8924-CER"
                  placeholderTextColor={colors['outline-variant']}
                  value={orderRef}
                  onChangeText={setOrderRef}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Detailed Description</Text>
              <View style={[styles.inputWrapper, { height: 120, alignItems: 'flex-start' }]}>
                <TextInput 
                  style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
                  placeholder="Please describe the issue with as much detail as possible..."
                  placeholderTextColor={colors['outline-variant']}
                  multiline
                  numberOfLines={5}
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Upload Evidence</Text>
              <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
                <Ionicons name="cloud-upload-outline" size={32} color={colors['forest-green']} style={{ marginBottom: 8 }} />
                <Text style={styles.uploadText}>Click to upload or tap here</Text>
                <Text style={styles.uploadSubText}>Photos or documents (Max 5MB)</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={[styles.submitButton, (!subject || !description) && { opacity: 0.5 }]} 
                onPress={handleSubmit}
                disabled={!subject || !description}
              >
                <Text style={styles.submitButtonText}>Submit Report</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  backButton: {
    padding: 8,
    marginHorizontal: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  introSection: {
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: 8,
  },
  pageSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  formContainer: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.gutter,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formGroup: {
    marginBottom: spacing.stackMd,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  label: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 8,
  },
  optionalText: {
    ...typography.labelSm,
    color: colors['outline-variant'],
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.charcoal,
    padding: 0,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: colors['clay-outline'],
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: spacing.stackLg,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  uploadText: {
    ...typography.labelMd,
    color: colors['forest-green'],
  },
  uploadSubText: {
    ...typography.labelSm,
    color: colors.outline,
    marginTop: 4,
  },
  actionSection: {
    marginTop: spacing.stackMd,
    paddingTop: spacing.stackMd,
    borderTopWidth: 1,
    borderTopColor: colors['surface-variant'],
  },
  submitButton: {
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
  submitButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  footerNote: {
    ...typography.labelSm,
    color: colors.outline,
    textAlign: 'center',
    marginTop: spacing.stackLg,
  },
});
