import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const SettingItem = ({ icon, title, subtitle, isSwitch, switchValue, onSwitchChange, onPress }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress} 
      disabled={isSwitch}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={colors['forest-green']} />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.settingRight}>
        {isSwitch ? (
          <Switch
            trackColor={{ false: colors['outline-variant'], true: colors['forest-green'] }}
            thumbColor={colors['surface-container-lowest']}
            ios_backgroundColor={colors['outline-variant']}
            onValueChange={onSwitchChange}
            value={switchValue}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color={colors.outline} />
        )}
      </View>
    </TouchableOpacity>
  );
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferences & Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* General Section */}
        <View style={styles.section}>
          <SectionHeader title="General" />
          <View style={styles.sectionCard}>
            <SettingItem 
              icon="notifications" 
              title="Push Notifications" 
              subtitle="Receive alerts for new messages and activity." 
              isSwitch={true}
              switchValue={pushEnabled}
              onSwitchChange={setPushEnabled}
            />
            <View style={styles.divider} />
            <SettingItem 
              icon="mail" 
              title="Email Digest" 
              subtitle="Weekly summary of your profile performance." 
              isSwitch={true}
              switchValue={emailEnabled}
              onSwitchChange={setEmailEnabled}
            />
            <View style={styles.divider} />
            <SettingItem 
              icon="globe" 
              title="Language" 
              subtitle="English (US)" 
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <SectionHeader title="Account" />
          <View style={styles.sectionCard}>
            <SettingItem 
              icon="lock-closed" 
              title="Security" 
              subtitle="Password, 2FA, and connected devices." 
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <SettingItem 
              icon="eye" 
              title="Privacy" 
              subtitle="Manage who can see your portfolio." 
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <SettingItem 
              icon="card" 
              title="Payment Methods" 
              subtitle="Manage linked accounts and billing." 
              onPress={() => navigation.navigate('PaymentMethods')}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <SectionHeader title="Support" />
          <View style={styles.sectionCard}>
            <SettingItem 
              icon="help-circle" 
              title="FAQ & Help Center" 
              subtitle="Find answers to common questions." 
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <SettingItem 
              icon="headset" 
              title="Contact Us" 
              subtitle="Get in touch with our concierge team." 
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <TouchableOpacity style={styles.deleteButton}>
            <Ionicons name="trash" size={20} color={colors['error-red']} />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
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
  section: {
    marginBottom: spacing.stackLg,
  },
  sectionHeader: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    marginBottom: spacing.stackMd,
  },
  sectionCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.2)',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.stackMd,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['surface-container'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    ...typography.bodyLg,
    color: colors['on-surface'],
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  settingRight: {
    marginLeft: spacing.stackMd,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(193, 200, 195, 0.3)',
  },
  dangerZone: {
    marginTop: spacing.stackLg,
    paddingTop: spacing.stackLg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(193, 200, 195, 0.3)',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: spacing.stackMd,
    borderRadius: 8,
  },
  deleteButtonText: {
    ...typography.labelMd,
    color: colors['error-red'],
  },
});
