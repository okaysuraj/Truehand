import React from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAccountRecords from '../../hooks/useAccountRecords';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';
import { colors } from '../../theme/theme';
function Frame({ navigation, title, children }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors['surface-linen'] }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 24, gap: 20 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 32, color: colors['forest-green'] }}>{title}</Text>
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
export default function WalletScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const { data, error, reload } = useAccountRecords([
    `/wallet/${user?.id}`,
    `/wallet/${user?.id}/transactions`,
  ]);
  return (
    <Frame navigation={navigation} title="Your wallet">
      <Failure error={error} reload={reload} />
      {!user ? (
        <Text>Sign in to view your wallet.</Text>
      ) : (
        !data && !error && <Text>Loading wallet...</Text>
      )}
      {data && (
        <>
          <Text>Available balance: INR {Number(data[0].balance).toFixed(2)}</Text>
          {['SELLER', 'DELIVERY'].includes(user.role) && (
            <TouchableOpacity onPress={() => navigation.navigate('RequestPayout')}>
              <Text>Request a payout</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('BankAccounts')}>
            <Text>Bank accounts</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 24 }}>Transactions</Text>
          {!data[1].length && <Text>No transactions yet.</Text>}
          {data[1].map((transaction) => (
            <View
              key={transaction.id}
              style={{ borderBottomWidth: 1, paddingVertical: 16, gap: 8 }}
            >
              <Text>{transaction.description}</Text>
              <Text>
                {transaction.type}: INR {Number(transaction.amount).toFixed(2)}
              </Text>
              <Text>{new Date(transaction.createdAt).toLocaleString()}</Text>
            </View>
          ))}
        </>
      )}
    </Frame>
  );
}
