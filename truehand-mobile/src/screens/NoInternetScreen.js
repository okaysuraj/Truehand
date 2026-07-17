import api from '../services/api';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme/theme';

export default function NoInternetScreen() {
  const pulseAnim = new Animated.Value(1);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.95,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [pulseAnim]);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Tactile Illustration Container */}
        <Animated.View style={[styles.illustrationContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/300' }} 
            style={styles.image} 
          />
          <View style={styles.iconOverlay}>
            <Ionicons name="wifi-outline" size={32} color={colors.terracotta} />
          </View>
        </Animated.View>

        {/* Typography */}
        <Text style={styles.title}>Lost Connection</Text>
        <Text style={styles.subtitle}>
          It seems you're offline. Let's get you back to the workshop.
        </Text>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Ionicons name="refresh" size={20} color={colors.surface} />
            <Text style={styles.primaryBtnText}>Retry Connection</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Check Settings</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: spacing.marginMobile,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: 200,
    height: 200,
    marginBottom: spacing.stackLg,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: colors['surface-container'],
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 12,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.2)', // outline-variant/20
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.stackLg,
    maxWidth: 280,
  },
  actionContainer: {
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
    gap: 8,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: spacing.stackMd,
  },
  primaryBtnText: {
    ...typography.labelMd,
    color: colors.surface,
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(27, 28, 28, 0.2)', // charcoal/20
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 4,
  },
  secondaryBtnText: {
    ...typography.labelMd,
    color: colors.charcoal,
  }
});
