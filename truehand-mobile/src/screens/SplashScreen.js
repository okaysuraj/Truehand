import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../theme/theme';
import { useAuthStore } from '../store/useAuthStore';

export default function SplashScreen() {
  const navigation = useNavigation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bgFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in text immediately
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Delayed fade in for background image
    Animated.timing(bgFadeAnim, {
      toValue: 0.2,
      duration: 3000,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    // After animation and auth check, navigate
    const timer = setTimeout(() => {
      if (!loading) {
        if (!isAuthenticated) {
          // If we had a WelcomeCarousel, we might navigate there. 
          // For now, let's navigate to a WelcomeScreen or Login if Welcome doesn't exist yet in the stack.
          // Since WelcomeCarousel is next on the list, let's prepare to route there if not authenticated.
          // In AppNavigator, AuthStack starts with Login. We will update AppNavigator later to start with Splash/Welcome.
          navigation.replace('Welcome');
        }
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [fadeAnim, bgFadeAnim, isAuthenticated, loading, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: bgFadeAnim }]}>
        <ImageBackground
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL1T-TmqnbPrXkFv9m5COEcgQZksY_fw6UHHddsVfBbtlsLmoCCsBBZ2mMS2LE7blNGxAUSBtX5F4eOunRbevvjN0UxsIQQ5_TnkZZzIyjGe-NRbum44ML9z3eC0X1q1WtF-4v0yPn2rD7ttDJYmU_SzDDrIe9iU8EpHX9pZqUDbOunb04xSxhyJYtb8CjM4gNzmQM2NcEyR2KLedLHKh6vL0_QkXYztCcwudPrg7xrnb8DR3AGs4vmw' }}
          style={styles.bgImage}
          resizeMode="cover"
        />
      </Animated.View>
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.brandTitle}>TrueHand</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    ...typography.displayLg,
    color: colors['forest-green'],
  }
});
