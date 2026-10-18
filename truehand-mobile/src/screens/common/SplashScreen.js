import React, { useEffect } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/theme';
export default function SplashScreen({ navigation }) {
  const loading = useAuthStore((s) => s.loading);
  const userId = useAuthStore((s) => s.user?.id);
  useEffect(() => {
    if (!loading) navigation.replace(userId ? 'MainTabs' : 'Welcome');
  }, [loading, userId, navigation]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors['surface-linen'],
      }}
    >
      <Image
        source={require('../../../assets/logo.png')}
        style={{
          width: 250,
          height: 80,
        }}
        resizeMode="contain"
      />
      <ActivityIndicator color={colors['forest-green']} />
    </View>
  );
}
