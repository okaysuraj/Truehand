import api from '../../services/api';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const NAV_OPTIONS = [
  { id: '1', title: 'Personal Info', icon: 'person-outline', route: 'PersonalInfoScreen' },
  { id: '2', title: 'My Orders', icon: 'cube-outline', route: 'OrdersListScreen' },
  { id: '3', title: 'Digital Wallet', icon: 'wallet-outline', route: 'DigitalWalletScreen' },
  { id: '4', title: 'Saved Collections', icon: 'heart-outline', route: 'SavedCollectionsScreen' },
  { id: '5', title: 'Help Center', icon: 'help-circle-outline', route: 'HelpCenterScreen' },
];

export default function ProfileDashboardScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artisan Profile</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/300' }} 
              style={styles.profileImage} 
            />
          </View>
          <Text style={styles.userName}>Julian Thorne</Text>
          <Text style={styles.userTitle}>Master Ceramicist & Collector</Text>
        </View>

        {/* Navigation Options */}
        <View style={styles.optionsContainer}>
          {NAV_OPTIONS.map((opt, index) => (
            <TouchableOpacity 
              key={opt.id} 
              style={[
                styles.optionRow, 
                index === NAV_OPTIONS.length - 1 && styles.lastOptionRow
              ]}
            >
              <View style={styles.optionLeft}>
                <Ionicons name={opt.icon} size={24} color={colors['clay-outline']} />
                <Text style={styles.optionTitle}>{opt.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors['outline-variant']} />
            </TouchableOpacity>
          ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
    marginRight: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.sectionGap / 2,
    paddingBottom: spacing.sectionGap,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.sectionGap,
  },
  imageContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
    marginBottom: spacing.stackMd,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: colors['surface-container'],
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  userTitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  optionsContainer: {
    width: '100%',
    maxWidth: 600,
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors['surface-container-lowest'],
    padding: spacing.stackMd,
    borderRadius: 12,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  lastOptionRow: {
    marginTop: spacing.stackMd,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
  },
  optionTitle: {
    ...typography.bodyMd,
    color: colors.charcoal,
  }
});
