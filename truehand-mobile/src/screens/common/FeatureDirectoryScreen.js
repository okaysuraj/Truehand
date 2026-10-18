import React from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import definitions from '../../../../shared/marketplace-features.json';
import { useAuthStore } from '../../store/useAuthStore';
import MarketplaceFeature from '../../components/MarketplaceFeature';
export function FeatureScreen({ route, navigation }) {
  const feature = route.params?.feature;
  return definitions[feature] ? (
    <MarketplaceFeature feature={feature} route={route} navigation={navigation} />
  ) : (
    <SafeAreaView>
      <Text>Feature not found.</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default function FeatureDirectoryScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fcf9f8' }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
        <Text style={{ fontSize: 30 }}>TrueHand features</Text>
        {Object.entries(definitions)
          .filter(([, definition]) => !definition.roles || definition.roles.includes(user?.role))
          .map(([feature, definition]) => (
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: '#c1c8c3', padding: 16 }}
              key={feature}
              onPress={() => navigation.navigate('Feature', { feature })}
            >
              <Text>{definition.title}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
