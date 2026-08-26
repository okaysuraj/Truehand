import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch, KeyboardAvoidingView, Platform } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

export default function SecuritySettingsScreen() {
  const navigation = useNavigation();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Security</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Header Text */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageSubtitle}>
              Manage your security preferences, monitor account access, and ensure your artisan profile remains protected.
            </Text>
          </View>

          {/* Change Password */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="key-outline" size={24} color={colors['forest-green']} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Change Password</Text>
            </View>
            <Text style={styles.sectionDesc}>Regularly updating your password helps keep your account secure. Ensure it's unique and strong.</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <TextInput style={styles.input} secureTextEntry placeholder="••••••••" placeholderTextColor={colors.outline} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>New Password</Text>
              <TextInput style={styles.input} secureTextEntry placeholder="••••••••" placeholderTextColor={colors.outline} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <TextInput style={styles.input} secureTextEntry placeholder="••••••••" placeholderTextColor={colors.outline} />
            </View>
            
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Update Password</Text>
            </TouchableOpacity>
          </View>

          {/* Two-Factor Authentication */}
          <View style={styles.sectionCard}>
            <View style={styles.rowBetween}>
              <View style={styles.rowLeft}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="shield-checkmark-outline" size={24} color={colors['forest-green']} style={styles.sectionIcon} />
                  <Text style={styles.sectionTitle}>Two-Factor Authentication</Text>
                </View>
                <Text style={styles.sectionDesc}>Add an extra layer of security. We'll ask for a login code in addition to your password.</Text>
              </View>
              <Switch
                trackColor={{ false: colors['outline-variant'], true: colors['forest-green'] }}
                thumbColor={colors['surface-container-lowest']}
                ios_backgroundColor={colors['outline-variant']}
                onValueChange={setTwoFactorEnabled}
                value={twoFactorEnabled}
              />
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="desktop-outline" size={24} color={colors['forest-green']} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Recent Activity</Text>
            </View>

            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="laptop-outline" size={20} color={colors['forest-green']} />
                </View>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityName}>MacBook Pro - Chrome</Text>
                  <Text style={styles.activityMeta}>London, UK · Active Now</Text>
                  <View style={styles.currentSession}>
                    <Ionicons name="checkmark-circle" size={14} color={colors['forest-green']} />
                    <Text style={styles.currentSessionText}>Current session</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.activityItem, styles.lastActivityItem]}>
                <View style={styles.activityIcon}>
                  <Ionicons name="phone-portrait-outline" size={20} color={colors['forest-green']} />
                </View>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityName}>iPhone 14 - Safari</Text>
                  <Text style={styles.activityMeta}>London, UK · Yesterday, 14:32</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.outlineButtonText}>Log out of all devices</Text>
            </TouchableOpacity>
          </View>

          {/* Danger Zone */}
          <View style={styles.dangerZone}>
            <View style={styles.sectionHeader}>
              <Ionicons name="warning-outline" size={24} color={colors['error-red']} style={styles.sectionIconDanger} />
              <Text style={styles.sectionTitleDanger}>Danger Zone</Text>
            </View>
            <Text style={styles.sectionDesc}>Once you delete your account, there is no going back. Please be certain.</Text>
            <TouchableOpacity style={styles.dangerButton}>
              <Text style={styles.dangerButtonText}>Delete Account</Text>
            </TouchableOpacity>
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
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -spacing.stackSm,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  pageHeader: {
    marginBottom: spacing.stackLg,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  sectionCard: {
    backgroundColor: colors['surface-container-lowest'],
    padding: spacing.gutter,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: spacing.stackLg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    marginRight: 8,
    opacity: 0.7,
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  sectionDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginBottom: spacing.stackLg,
  },
  formGroup: {
    marginBottom: spacing.stackMd,
  },
  inputLabel: {
    ...typography.labelSm,
    color: colors.charcoal,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors['surface-linen'],
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  rowLeft: {
    flex: 1,
  },
  activityList: {
    marginBottom: spacing.stackLg,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
    marginBottom: 16,
  },
  lastActivityItem: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['surface-container'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityDetails: {
    flex: 1,
  },
  activityName: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  activityMeta: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginTop: 4,
  },
  currentSession: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  currentSessionText: {
    ...typography.labelSm,
    color: colors['forest-green'],
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  outlineButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  dangerZone: {
    backgroundColor: 'rgba(186, 26, 26, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.2)',
    padding: spacing.gutter,
    borderRadius: 12,
    marginTop: spacing.stackLg,
  },
  sectionIconDanger: {
    marginRight: 8,
  },
  sectionTitleDanger: {
    ...typography.headlineMd,
    color: colors['error-red'],
  },
  dangerButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  dangerButtonText: {
    ...typography.labelMd,
    color: colors['error-red'],
    textDecorationLine: 'underline',
  },
});
