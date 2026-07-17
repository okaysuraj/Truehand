import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function LocationPermissionScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const requestPermission = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Alert.alert('Permission Granted', 'Thank you for enabling location.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Permission Denied', 'You can enable it later in settings.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (err) {
      Alert.alert('Error', 'An error occurred while requesting permission.');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Image Section */}
        <View style={styles.imageSection}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYoqCw1Qusd2TkxlEZLMA4NTSDBM5ugmA8_xJpoaSCO8xb--2WPb65_9bwdumi62HDddV7OrVPfrI9iqNOvooxuYkKLbjvPzA2GTNaww20M5Q1DrvWEYF9kkzLo2W1JDXzeWx00gS55MvRMvmGThTXTyibouBdENrS12Nm0y7qWOrDUXNJurhjGyGw39Xaiap2U1xKngOZguBm1VMJzRA5vwJhrodNxKzyi03F5YaRmG0ysNdhEZ_Opg' }} 
            style={styles.image} 
          />
          <View style={styles.gradientOverlay} />
          <View style={styles.iconCircle}>
            <MaterialIcons name="my-location" size={32} color={colors['forest-green']} />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.title}>Find Artisans Near You</Text>
          <Text style={styles.subtitle}>
            To discover local workshops, hidden studios, and exclusive community events, we need your permission to access your location.
          </Text>

          {/* Actions */}
          <View style={styles.actionGroup}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={requestPermission}
              disabled={loading}
            >
              <Text style={styles.primaryButtonText}>Allow Access</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.secondaryButtonText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    overflow: 'hidden',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  imageSection: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.8)', // Simulated gradient
  },
  iconCircle: {
    position: 'absolute',
    bottom: -24,
    left: '50%',
    transform: [{ translateX: -24 }],
    backgroundColor: colors['surface-container-lowest'],
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentSection: {
    paddingHorizontal: spacing.gutter,
    paddingTop: 48,
    paddingBottom: spacing.stackLg,
    alignItems: 'center',
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
  },
  actionGroup: {
    width: '100%',
    gap: spacing.stackMd,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 16,
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
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
});
