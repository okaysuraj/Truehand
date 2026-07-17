import api from '../services/api';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function EmptyCartScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={28} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artisanal Market</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bag" size={24} color={colors.terracotta} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        
        {/* Background glow effects could be approximated with a background image or just a color */}
        
        <View style={styles.emptyStateContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="bag-outline" size={120} color={'rgba(193, 200, 195, 0.4)'} />
          </View>
          
          <Text style={styles.title}>Your Gallery is Empty</Text>
          
          <Text style={styles.subtitle}>
            Discover unique pieces crafted by master artisans from around the world.
          </Text>
          
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('HomeFeedScreen')}>
            <Text style={styles.primaryBtnText}>Start Exploring</Text>
            <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
          </TouchableOpacity>
        </View>

      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.marginMobile,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  iconContainer: {
    marginBottom: spacing.stackLg,
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.stackLg,
    paddingHorizontal: spacing.stackMd,
  },
  primaryBtn: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    gap: spacing.stackSm,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryBtnText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  }
});
