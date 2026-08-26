import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

export default function NotificationPermissionScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const requestPermission = async () => {
    setLoading(true);
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus === 'granted') {
        Alert.alert('Permission Granted', 'You will now receive notifications.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Permission Denied', 'You can enable notifications later in settings.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (err) {
      Alert.alert('Error', 'An error occurred while requesting permission.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background Decorative Element */}
      <ImageBackground 
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdeD-cBSbhrFWVLNxhBeWEsUYbFPhSDzK-etY-YtHADWW3dYsZl9DbMkzTSCXt1FJlXXFab3uZOetr6nsxn3S7IvYIt96oFK4K2sPCmDZXUukbbraj_SjSu99PFEoHh6TjNr2gXuYBhMu_T4njZWj01UJnXqfVVGjyHrnka9oG8Tyw5bMwL9oFEUbERa8_X4hmMUTIeonGlfCAgvlhaCYyBnHOSUPua5DYSSy98Z4VZ27n_ZAC90iiYg' }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.2 }}
      >
        <View style={styles.container}>
          
          <View style={styles.card}>
            {/* Icon Area */}
            <View style={styles.iconCircle}>
              <MaterialIcons name="notifications-active" size={48} color={colors['forest-green']} />
            </View>

            {/* Content Area */}
            <View style={styles.contentSection}>
              <Text style={styles.title}>Stay Connected</Text>
              <Text style={styles.subtitle}>
                Receive updates on your orders, price drops, and new arrivals from your favorite artisans.
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actionGroup}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={requestPermission}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>Turn on Notifications</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                <Text style={styles.secondaryButtonText}>Maybe Later</Text>
              </TouchableOpacity>
            </View>

            {/* Microcopy */}
            <Text style={styles.microcopy}>
              You can change this anytime in settings.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    padding: spacing.marginMobile,
  },
  card: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    padding: spacing.stackLg,
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors['surface-container-low'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  contentSection: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  title: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    maxWidth: 280,
  },
  actionGroup: {
    width: '100%',
    gap: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 14,
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
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  microcopy: {
    ...typography.labelSm,
    color: colors.outline,
    textAlign: 'center',
  },
});
