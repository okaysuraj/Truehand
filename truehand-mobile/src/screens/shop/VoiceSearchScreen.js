import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

export default function VoiceSearchScreen() {
  const navigation = useNavigation();
  
  // Ripple animations
  const scale1 = useRef(new Animated.Value(0.8)).current;
  const opacity1 = useRef(new Animated.Value(0.4)).current;
  const scale2 = useRef(new Animated.Value(0.8)).current;
  const opacity2 = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const createRipple = (scaleAnim, opacityAnim, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 2.5,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            })
          ]),
          // Reset
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 0.8,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.4,
              duration: 0,
              useNativeDriver: true,
            })
          ])
        ])
      ).start();
    };

    createRipple(scale1, opacity1, 0);
    createRipple(scale2, opacity2, 1000);
  }, [scale1, opacity1, scale2, opacity2]);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={28} color={colors.charcoal} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.micContainer}>
          <Animated.View style={[styles.ripple, { transform: [{ scale: scale1 }], opacity: opacity1 }]} />
          <Animated.View style={[styles.ripple, { transform: [{ scale: scale2 }], opacity: opacity2 }]} />
          
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={40} color={colors['on-primary']} />
          </TouchableOpacity>
        </View>

        <Text style={styles.listeningText}>Listening...</Text>
        <Text style={styles.hintText}>Try saying "handmade ceramics" or "wood dining table"</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(252, 249, 248, 0.95)', // surface-linen with some transparency
  },
  closeButton: {
    position: 'absolute',
    top: spacing.marginDesktop,
    right: spacing.marginDesktop,
    padding: spacing.stackSm,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
  },
  micContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
    marginBottom: spacing.sectionGap,
  },
  ripple: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors['primary-fixed'],
    borderWidth: 1,
    borderColor: colors['primary-container'],
  },
  micButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  listeningText: {
    ...typography.displayLg,
    color: colors.primary,
    marginBottom: spacing.stackMd,
    textAlign: 'center',
  },
  hintText: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    opacity: 0.8,
  },
});
