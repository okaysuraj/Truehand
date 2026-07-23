import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

export default function OrderSuccessConfirmationScreen() {
  const navigation = useNavigation();
  
  const ring1Scale = useRef(new Animated.Value(1)).current;
  const ring1Opacity = useRef(new Animated.Value(0.5)).current;
  
  const ring2Scale = useRef(new Animated.Value(1)).current;
  const ring2Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateRings = () => {
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.parallel([
              Animated.timing(ring1Scale, { toValue: 1.5, duration: 3000, useNativeDriver: true }),
              Animated.timing(ring1Opacity, { toValue: 0, duration: 3000, useNativeDriver: true })
            ]),
            Animated.parallel([
              Animated.timing(ring1Scale, { toValue: 1, duration: 0, useNativeDriver: true }),
              Animated.timing(ring1Opacity, { toValue: 0.5, duration: 0, useNativeDriver: true })
            ])
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.delay(1000),
            Animated.parallel([
              Animated.timing(ring2Scale, { toValue: 2, duration: 3000, useNativeDriver: true }),
              Animated.timing(ring2Opacity, { toValue: 0, duration: 3000, useNativeDriver: true })
            ]),
            Animated.parallel([
              Animated.timing(ring2Scale, { toValue: 1, duration: 0, useNativeDriver: true }),
              Animated.timing(ring2Opacity, { toValue: 0.3, duration: 0, useNativeDriver: true })
            ])
          ])
        )
      ]).start();
    };
    animateRings();
  }, [ring1Scale, ring1Opacity, ring2Scale, ring2Opacity]);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Checkmark Graphic */}
        <View style={styles.graphicContainer}>
          <Animated.View style={[styles.ring, { transform: [{ scale: ring2Scale }], opacity: ring2Opacity, borderColor: 'rgba(193, 200, 195, 0.1)' }]} />
          <Animated.View style={[styles.ring, { transform: [{ scale: ring1Scale }], opacity: ring1Opacity, borderColor: 'rgba(193, 200, 195, 0.2)' }]} />
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={48} color={colors['forest-green']} style={styles.iconStyle} />
          </View>
        </View>

        <Text style={styles.title}>Thank You</Text>
        <Text style={styles.subtitle}>
          Your order has been successfully placed. We are carefully preparing your items for their journey.
        </Text>

        {/* Order Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>ORDER NUMBER</Text>
              <Text style={styles.detailValue}>#TH-9482-A</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>EST. DELIVERY</Text>
              <Text style={styles.detailValue}>Oct 12 - Oct 14</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.emailRow}>
            <Text style={styles.emailLabel}>A confirmation email has been sent to</Text>
            <Text style={styles.emailValue}>collector@example.com</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('OrderDetail', { orderId: '#TH-9482-A' })}
          >
            <Text style={styles.primaryButtonText}>View Order Status</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
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
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.sectionGap,
    paddingBottom: spacing.sectionGap,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphicContainer: {
    marginBottom: spacing.stackLg,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors['surface-container'],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  iconStyle: {
    fontWeight: '200',
  },
  ring: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
  },
  title: {
    ...typography.displayLg,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.stackLg,
    maxWidth: 320,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.stackLg,
    borderWidth: 1,
    borderColor: colors['surface-container-high'],
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 30,
    elevation: 4,
    marginBottom: spacing.stackLg,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.stackLg,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.labelSm,
    color: colors.outline,
    marginBottom: 4,
  },
  detailValue: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  divider: {
    height: 1,
    backgroundColor: colors['surface-container-high'],
    marginVertical: spacing.stackMd,
  },
  emailRow: {
    alignItems: 'center',
  },
  emailLabel: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  emailValue: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginTop: 2,
    textAlign: 'center',
  },
  actionsContainer: {
    width: '100%',
    gap: spacing.stackMd,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.charcoal,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
});
