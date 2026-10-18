import React, { useEffect, useState } from 'react';
import { Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';
import { colors } from '../../theme/theme';
export default function EditProfileScreen({ navigation }) {
  const userId = useAuthStore((s) => s.user?.id);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    let active = true;
    api
      .get('/users/me')
      .then(({ data }) => {
        if (active) setForm(data);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.error || 'Unable to load profile.');
      });
    return () => {
      active = false;
    };
  }, [userId]);
  const save = async () => {
    setSaving(true);
    setError('');
    try {
      await api.put('/users/' + userId, {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        bio: form.bio,
      });
      navigation.goBack();
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to save profile.');
    } finally {
      setSaving(false);
    }
  };
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'EBGaramond_500Medium',
            fontSize: 32,
            color: colors['forest-green'],
          }}
        >
          Edit profile
        </Text>
        {!!error && <Text accessibilityRole="alert">{error}</Text>}
        {form && (
          <>
            <Text>Email: {form.email}</Text>
            {[
              ['firstName', 'First name'],
              ['lastName', 'Last name'],
              ['phone', 'Phone number'],
              ['bio', 'Biography'],
            ].map(([key, label]) => (
              <React.Fragment key={key}>
                <Text>{label}</Text>
                <TextInput
                  accessibilityLabel={label}
                  style={{
                    borderWidth: 1,
                    padding: 12,
                  }}
                  value={form[key] || ''}
                  maxLength={key === 'bio' ? 2000 : key === 'phone' ? 30 : 100}
                  editable={!saving}
                  onChangeText={(value) =>
                    setForm({
                      ...form,
                      [key]: value,
                    })
                  }
                />
              </React.Fragment>
            ))}
            <TouchableOpacity disabled={saving || !form.firstName?.trim()} onPress={save}>
              <Text>{saving ? 'Saving...' : 'Save profile'}</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
