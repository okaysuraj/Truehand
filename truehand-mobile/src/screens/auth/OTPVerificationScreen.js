import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/theme';
export default function OTPVerificationScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors['surface-linen'] }}>
      <View style={{ padding: 24, gap: 20 }}>
        <Text
          style={{
            fontFamily: 'EBGaramond_500Medium',
            fontSize: 32,
            color: colors['forest-green'],
          }}
        >
          Verify your email
        </Text>
        <Text>
          Open the verification link in your email, then return to sign in. Account verification
          uses Firebase email verification.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Return to sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
