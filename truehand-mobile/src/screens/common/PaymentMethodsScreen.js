import React from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function PaymentMethodsScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 32 }}>Payment methods</Text>
        <Text>
          Choose your payment method securely during checkout. Managing saved payment methods is
          currently unavailable.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
