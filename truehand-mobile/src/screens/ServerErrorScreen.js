import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function ServerErrorScreen() {
  const navigation = useNavigation();
  const pulseAnim = new Animated.Value(0.2);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.2,
          duration: 4000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Abstract Background Element */}
        <Animated.View style={[
          styles.glowBackground,
          { opacity: pulseAnim }
        ]} />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="flame-outline" size={64} color={colors.terracotta} style={styles.icon} />
          </View>
          
          <Text style={styles.title}>Something Went Wrong</Text>
          
          <Text style={styles.subtitle}>
            Our kiln is a bit too hot. We're working to cool things down. Please try again later.
          </Text>

          <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color={colors.charcoal} />
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactSupport}>
            <Text style={styles.contactSupportText}>Contact Support</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  glowBackground: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: colors.terracotta,
    opacity: 0.2,
    shadowColor: colors.terracotta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 10,
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -width * 0.4 },
      { translateY: -width * 0.4 },
    ],
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    maxWidth: 400,
    width: '100%',
    zIndex: 10,
  },
  iconContainer: {
    marginBottom: spacing.stackLg,
  },
  icon: {
    fontWeight: '100',
  },
  title: {
    ...typography.displayLg,
    fontSize: 36, // Slightly scaled down for mobile
    color: colors['forest-green'],
    marginBottom: spacing.stackMd,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.stackLg,
    paddingHorizontal: spacing.stackMd,
  },
  goBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(27, 28, 28, 0.2)', // charcoal/20
    gap: 8,
    width: '100%',
    maxWidth: 200,
    marginBottom: spacing.stackLg,
  },
  goBackText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  contactSupport: {
    padding: spacing.stackSm,
  },
  contactSupportText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    textDecorationLine: 'underline',
  }
});
