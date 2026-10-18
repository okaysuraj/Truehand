import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { useAuthStore } from './src/store/useAuthStore';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useCartStore } from './src/store/useCartStore';

import { useFonts } from 'expo-font';
import { EBGaramond_400Regular } from '@expo-google-fonts/eb-garamond/400Regular';
import { EBGaramond_500Medium } from '@expo-google-fonts/eb-garamond/500Medium';
import { HankenGrotesk_400Regular } from '@expo-google-fonts/hanken-grotesk/400Regular';
import { HankenGrotesk_500Medium } from '@expo-google-fonts/hanken-grotesk/500Medium';
import { HankenGrotesk_600SemiBold } from '@expo-google-fonts/hanken-grotesk/600SemiBold';

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_KEY || '';

export default function App() {
  const initAuth = useAuthStore((state) => state.initAuth);
  const loading = useAuthStore((state) => state.loading);
  const userId = useAuthStore((state) => state.user?.id);
  React.useEffect(() => {
    useCartStore.getState().syncForUser(userId);
  }, [userId]);

  React.useEffect(() => {
    initAuth();
  }, [initAuth]);

  const [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
  });

  if (!fontsLoaded || loading) {
    // Navigation starts only after the persisted session and fonts are ready.
    return null;
  }

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <AppNavigator />
      <StatusBar style="auto" />
    </StripeProvider>
  );
}
