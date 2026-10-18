import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthStore } from '../store/useAuthStore';
import api from '../services/api';
import settings from '../../../shared/account-settings.json';
import { createPushRegistrationHook } from '../../../shared/push-registration';
import { pushAdapter } from '../services/pushRegistration';
import { createAccountSettingsHook, updatePreference } from '../../../shared/account-settings';
const usePush = createPushRegistrationHook(React, pushAdapter);
const useSettings = createAccountSettingsHook(React, api);
const button = {
  padding: 14,
  borderWidth: 1,
  borderColor: '#c1c8c3',
  minHeight: 48,
};
export default function AccountSettings({ section, navigation }) {
  const user = useAuthStore((state) => state.user);
  const { preferences, error, loading, busy, save, retry } = useSettings(user?.id);
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const push = usePush(user?.id);
  async function security(action) {
    setSending(true);
    setNotice('');
    try {
      if (!auth.currentUser) throw new Error('Please sign in again.');
      if (action === 'reset') await sendPasswordResetEmail(auth, auth.currentUser.email);
      else await sendEmailVerification(auth.currentUser);
      setNotice('Email sent. Check your inbox.');
    } catch (failure) {
      setNotice(failure.message || 'Unable to send email. Please retry.');
    } finally {
      setSending(false);
    }
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fcf9f8',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          gap: 24,
        }}
      >
        <TouchableOpacity style={button} onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
          }}
        >
          {section === 'security'
            ? settings.securityTitle
            : section === 'region'
              ? settings.regionTitle
              : settings.title}
        </Text>
        {!user ? (
          <TouchableOpacity style={button} onPress={() => navigation.navigate('Login')}>
            <Text>Sign in to manage your account</Text>
          </TouchableOpacity>
        ) : (
          <>
            {(!section || section === 'region') && (
              <View
                style={{
                  gap: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  {settings.regionTitle}
                </Text>
                {Object.entries(settings.region).map(([key, value]) => (
                  <Text key={key}>
                    {key}: {value}
                  </Text>
                ))}
              </View>
            )}
            {(!section || section === 'notifications') && (
              <View
                style={{
                  gap: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  {settings.notificationTitle}
                </Text>
                <TouchableOpacity style={button} disabled={push.busy} onPress={push.enable}>
                  <Text>{push.busy ? 'Registering device...' : 'Enable push on this device'}</Text>
                </TouchableOpacity>
                {!!push.notice && <Text accessibilityLiveRegion="polite">{push.notice}</Text>}
                {loading && <ActivityIndicator />}
                {!!error && (
                  <>
                    <Text accessibilityRole="alert">{error}</Text>
                    <TouchableOpacity style={button} onPress={retry}>
                      <Text>Retry</Text>
                    </TouchableOpacity>
                  </>
                )}
                {preferences &&
                  Object.entries(settings.notificationCategories).map(([category, label]) => (
                    <View
                      key={category}
                      style={{
                        gap: 12,
                      }}
                    >
                      <Text>{label}</Text>
                      {['email', 'push'].map((channel) => (
                        <View
                          key={channel}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>{channel}</Text>
                          <Switch
                            accessibilityLabel={label + ' ' + channel}
                            value={!!preferences[category]?.[channel]}
                            disabled={busy}
                            onValueChange={(value) =>
                              save(updatePreference(preferences, category, channel, value))
                            }
                          />
                        </View>
                      ))}
                    </View>
                  ))}
              </View>
            )}
            {(!section || section === 'security') && (
              <View
                style={{
                  gap: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  {settings.securityTitle}
                </Text>
                <Text>{user.email}</Text>
                <Text>Email verified: {auth.currentUser?.emailVerified ? 'Yes' : 'No'}</Text>
                {Object.entries(settings.securityActions)
                  .filter(([key]) =>
                    key === 'reset'
                      ? auth.currentUser?.providerData.some(
                          (provider) => provider.providerId === 'password',
                        )
                      : !auth.currentUser?.emailVerified,
                  )
                  .map(([key, label]) => (
                    <TouchableOpacity
                      style={button}
                      key={key}
                      disabled={sending}
                      onPress={() => security(key)}
                    >
                      <Text>{label}</Text>
                    </TouchableOpacity>
                  ))}
                {!!notice && <Text accessibilityLiveRegion="polite">{notice}</Text>}
              </View>
            )}
            {settings.links.map((link) => (
              <TouchableOpacity
                style={button}
                key={link.feature}
                onPress={() =>
                  navigation.navigate('Feature', {
                    feature: link.feature,
                  })
                }
              >
                <Text>{link.label}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
