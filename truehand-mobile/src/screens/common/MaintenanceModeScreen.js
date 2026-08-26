import api from '../../services/api';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme/theme';

export default function MaintenanceModeScreen() {
  const [returnTime, setReturnTime] = useState('');
  
  // Animation values
  const floatAnim = new Animated.Value(0);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Calculate expected return time (e.g. 2 hours from now)
    const now = new Date();
    now.setHours(now.getHours() + 2);
    
    const options = { 
      weekday: 'long', 
      hour: '2-digit', 
      minute: '2-digit', 
    };
    
    setReturnTime(now.toLocaleTimeString('en-US', options) + ' Local Time');

    // Float animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        })
      ])
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.5,
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
  }, [floatAnim, pulseAnim]);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Icon */}
        <Animated.View style={[styles.iconContainer, { transform: [{ translateY: floatAnim }] }]}>
          <View style={styles.iconCircle}>
            <Ionicons name="hammer-outline" size={48} color={colors.terracotta} />
          </View>
        </Animated.View>

        {/* Typography */}
        <Text style={styles.title}>Refining the Craft</Text>
        <Text style={styles.subtitle}>
          TrueHand is currently undergoing scheduled maintenance to improve your experience. We're carefully polishing things behind the scenes and will be back shortly.
        </Text>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusLine} />
          <Animated.View style={{ opacity: pulseAnim, marginBottom: 8 }}>
            <Ionicons name="time-outline" size={24} color={colors.outline} />
          </Animated.View>
          <Text style={styles.statusLabel}>Expected Return</Text>
          <Text style={styles.statusTime}>{returnTime}</Text>
          
          <View style={styles.statusIndicator}>
            <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
            <Text style={styles.indicatorText}>Work in progress</Text>
          </View>
        </View>

        {/* Brand Signature */}
        <View style={styles.signatureContainer}>
          <Text style={styles.signatureText}>TRUEHAND</Text>
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
  iconContainer: {
    marginBottom: spacing.stackLg,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors['surface-container-lowest'],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)', // outline-variant/30
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
    marginBottom: spacing.sectionGap,
    paddingHorizontal: spacing.stackMd,
    lineHeight: 28,
  },
  statusCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackLg,
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
  },
  statusLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.terracotta, // simplified gradient
  },
  statusLabel: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.base,
  },
  statusTime: {
    ...typography.headlineMd,
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: spacing.stackMd,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing.stackSm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.terracotta,
  },
  indicatorText: {
    ...typography.labelSm,
    color: colors.terracotta,
  },
  signatureContainer: {
    position: 'absolute',
    bottom: spacing.sectionGap,
  },
  signatureText: {
    ...typography.headlineMd,
    fontSize: 16,
    color: 'rgba(22, 52, 40, 0.5)', // forest-green/50
    letterSpacing: 4,
  }
});
