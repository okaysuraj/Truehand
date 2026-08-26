import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';;
import { useAuthStore } from '../../store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme/theme';

export default function ProfileScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      // Ignore logout error
    }
  };

  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Julian Thorne';
  const role = user ? 'Member' : 'Master Ceramicist & Collector';
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.brand}>Artisan Profile</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSp22LO2WIyz_K097Vaz9ZUjT0HGApGIqC-E34VmusA8yWFqC8kyP3lz-bO1y0I0nZQwV-jDbZKVOE_22t-dl8OF8vzAb0jBdOweZ05R70f9q0K-3_B-SByawp5tsNGXbCtfiGLDxUi-MQk_-fIt2oTZgDwrwydtP85_TeTdkkFn2DjAjKQxinNLLMbMUZHUTnZZW5Bza9S3qkew5eq_eD9EcUuIlCwh3uJbY7A_Hl1fTy8wZxcTYbUA' }} 
              style={styles.avatar} 
            />
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="person-outline" size={24} color={colors['clay-outline']} />
              <Text style={styles.menuText}>Personal Info</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors['outline-variant']} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Orders')}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="bag-outline" size={24} color={colors['clay-outline']} />
              <Text style={styles.menuText}>My Orders</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors['outline-variant']} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="wallet-outline" size={24} color={colors['clay-outline']} />
              <Text style={styles.menuText}>Digital Wallet</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors['outline-variant']} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="heart-outline" size={24} color={colors['clay-outline']} />
              <Text style={styles.menuText}>Saved Collections</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors['outline-variant']} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { marginTop: spacing.stackMd }]} onPress={() => {}}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="help-circle-outline" size={24} color={colors['clay-outline']} />
              <Text style={styles.menuText}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors['outline-variant']} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
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
  brand: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    fontWeight: 'bold',
  },
  iconButton: {
    padding: spacing.stackSm,
  },
  contentContainer: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.sectionGap,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: spacing.stackLg,
    marginBottom: spacing.sectionGap,
  },
  avatarContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: 'hidden',
    marginBottom: spacing.stackMd,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  role: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  menuContainer: {
    width: '100%',
    maxWidth: 600,
    gap: spacing.base,
  },
  menuItem: {
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
    elevation: 2,
    marginBottom: spacing.stackSm,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
  },
  menuText: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  logoutButton: {
    marginTop: spacing.stackLg,
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    alignItems: 'center',
  },
  logoutText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
});
