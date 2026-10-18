import React, { useCallback, useState } from 'react';
import { Text, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';
import { colors } from '../../theme/theme';
export default function ProfileScreen({ navigation }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  useFocusEffect(
    useCallback(() => {
      let active = true;
      setProfile(null);
      setError('');
      if (!user) return;
      api
        .get('/users/me')
        .then(({ data }) => {
          if (active) setProfile(data);
        })
        .catch((err) => {
          if (active) setError(err.response?.data?.error || 'Unable to load profile.');
        });
      return () => {
        active = false;
      };
    }, [user?.id]),
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors['surface-linen'],
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          gap: 20,
        }}
      >
        <Text
          style={{
            fontFamily: 'EBGaramond_500Medium',
            fontSize: 32,
            color: colors['forest-green'],
          }}
        >
          Your account
        </Text>
        {!!error && <Text accessibilityRole="alert">{error}</Text>}
        {profile && (
          <View
            style={{
              gap: 12,
            }}
          >
            <Text>{[profile.firstName, profile.lastName].filter(Boolean).join(' ')}</Text>
            <Text>{profile.email}</Text>
            <Text>{profile.phone}</Text>
            <Text>{profile.bio}</Text>
            <Text>Account type: {profile.role}</Text>
            <Text>Member since: {new Date(profile.createdAt).toLocaleDateString()}</Text>
          </View>
        )}
        {user ? (
          <>
            {[
              ['EditProfile', 'Edit profile'],
              ['Orders', 'Your orders'],
              ['ManageAddresses', 'Saved addresses'],
              ['Wishlist', 'Wishlist'],
              ['NotificationsList', 'Notifications'],
            ].map(([to, label]) => (
              <TouchableOpacity key={to} onPress={() => navigation.navigate(to)}>
                <Text>{label}</Text>
              </TouchableOpacity>
            ))}
            {user.role === 'SELLER' && (
              <TouchableOpacity onPress={() => navigation.navigate('SellerDashboard')}>
                <Text>Seller dashboard</Text>
              </TouchableOpacity>
            )}
            {user.role === 'DELIVERY' && (
              <TouchableOpacity onPress={() => navigation.navigate('DeliveryDashboard')}>
                <Text>Delivery dashboard</Text>
              </TouchableOpacity>
            )}
            {user.role === 'ADMIN' && (
              <TouchableOpacity onPress={() => navigation.navigate('AdminDashboard')}>
                <Text>Admin dashboard</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={logout}>
              <Text>Sign out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text>Sign in</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
