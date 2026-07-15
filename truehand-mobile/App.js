import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { useAuthStore } from './src/store/useAuthStore';
import { StripeProvider } from '@stripe/stripe-react-native';

LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
  'SafeAreaView has been deprecated',
]);

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

import { useFonts, EBGaramond_500Medium, EBGaramond_400Regular } from '@expo-google-fonts/eb-garamond';
import { HankenGrotesk_400Regular, HankenGrotesk_500Medium, HankenGrotesk_600SemiBold } from '@expo-google-fonts/hanken-grotesk';

export default function App() {
  const initAuth = useAuthStore((state) => state.initAuth);
  const loading = useAuthStore((state) => state.loading);

  React.useEffect(() => {
    initAuth();
  }, []);

  const [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
  });

  if (!fontsLoaded || loading) {
    return null; // Could return a splash screen component here
  }

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <AppNavigator />
      <StatusBar style="auto" />
    </StripeProvider>
  );
}

