import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MarketplaceFeature from '../components/MarketplaceFeature';
import { useAuthStore } from '../store/useAuthStore';

// An omitted roles field is public; null requires sign-in; an array restricts roles.
export function createScreen({ component: Component, feature, props: defaults, roles }) {
  function Content(props) {
    return feature ? (
      <MarketplaceFeature {...props} feature={feature} />
    ) : (
      <Component {...props} {...defaults} />
    );
  }

  if (roles === undefined) return Component && !defaults ? Component : Content;

  return function ProtectedScreen(props) {
    const user = useAuthStore((state) => state.user);
    if (user && (!roles || roles.includes(user.role))) return <Content {...props} />;

    return (
      <View style={styles.container}>
        <Text>
          {user ? 'Your account does not have access to this screen.' : 'Sign in to continue.'}
        </Text>
        <TouchableOpacity
          onPress={() => (user ? props.navigation.goBack() : props.navigation.navigate('Login'))}
        >
          <Text>{user ? 'Back' : 'Sign in'}</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
});
