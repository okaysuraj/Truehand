import React from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAccountRecords from '../../hooks/useAccountRecords';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';
import { colors } from '../../theme/theme';
function Frame({ navigation, title, children }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors['surface-linen'],
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
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
            fontSize: 32,
            color: colors['forest-green'],
          }}
        >
          {title}
        </Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
function Failure({ error, reload }) {
  return error ? (
    <View>
      <Text accessibilityRole="alert">{error}</Text>
      <TouchableOpacity onPress={reload}>
        <Text>Retry</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}
export default function BankAccountsScreen({ navigation }) {
  const { user, data, error, reload } = useAccountRecords(['/wallet/banks']);
  const empty = {
    bankName: '',
    accountName: '',
    accountType: '',
    accountNumber: '',
    routingNumber: '',
  };
  const [form, setForm] = React.useState(empty);
  const [busy, setBusy] = React.useState(false);
  const [writeError, setWriteError] = React.useState('');
  const submit = async () => {
    setBusy(true);
    setWriteError('');
    try {
      await api.post('/wallet/banks', form);
      setForm(empty);
      reload();
    } catch (failure) {
      setWriteError(
        failure.response?.data?.error ||
          failure.response?.data?.message ||
          'Unable to add account.',
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <Frame navigation={navigation} title="Bank accounts">
      <Failure error={error || writeError} reload={reload} />
      {!user ? (
        <Text>Sign in to manage bank accounts.</Text>
      ) : (
        <>
          {!data && !error && <Text>Loading accounts...</Text>}
          {data && !data[0].length && <Text>No linked accounts.</Text>}
          {data?.[0].map((bank) => (
            <View
              key={bank.id}
              style={{
                borderBottomWidth: 1,
                paddingVertical: 16,
                gap: 8,
              }}
            >
              <Text>{bank.bankName}</Text>
              <Text>
                {bank.accountName} | Account ending {bank.lastFour}
              </Text>
              <Text>
                {bank.status}
                {bank.default ? ' | Default account' : ''}
              </Text>
            </View>
          ))}
          <Text>New accounts remain pending verification. Payouts require a verified account.</Text>
          {Object.keys(empty).map((field) => (
            <View key={field}>
              <Text>
                {
                  {
                    bankName: 'Bank name',
                    accountName: 'Account holder',
                    accountType: 'Account type',
                    accountNumber: 'Account number',
                    routingNumber: 'Routing number / IFSC',
                  }[field]
                }
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  padding: 12,
                }}
                maxLength={field === 'accountNumber' ? 34 : 255}
                autoCapitalize="none"
                keyboardType={field === 'accountNumber' ? 'number-pad' : 'default'}
                value={form[field]}
                onChangeText={(value) =>
                  setForm({
                    ...form,
                    [field]: value,
                  })
                }
              />
            </View>
          ))}
          <TouchableOpacity
            disabled={busy || Object.values(form).some((value) => !value.trim())}
            onPress={submit}
          >
            <Text>{busy ? 'Submitting...' : 'Add account'}</Text>
          </TouchableOpacity>
        </>
      )}
    </Frame>
  );
}
