import React, { useCallback, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';
import { colors } from '../../theme/theme';
export default function RequestPayoutScreen({ navigation }) {
  const userId = useAuthStore((s) => s.user?.id);
  const [wallet, setWallet] = useState(null);
  const [banks, setBanks] = useState([]);
  const [history, setHistory] = useState([]);
  const [bankId, setBankId] = useState(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const key = useRef(Crypto.randomUUID());
  const load = async () => {
    if (!userId) return;
    const [w, b, p] = await Promise.all([
      api.get('/wallet/' + userId),
      api.get('/wallet/banks'),
      api.get('/wallet/payouts'),
    ]);
    setWallet(w.data);
    setBanks(b.data);
    setHistory(p.data);
  };
  useFocusEffect(
    useCallback(() => {
      load().catch((err) =>
        setError(err.response?.data?.error || 'Unable to load payout details.'),
      );
    }, [userId]),
  );
  const submit = async () => {
    setSaving(true);
    setError('');
    try {
      await api.post('/wallet/payouts', {
        bankAccountId: bankId,
        amount,
        requestKey: key.current,
      });
      key.current = Crypto.randomUUID();
      setAmount('');
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to submit payout request.');
    } finally {
      setSaving(false);
    }
  };
  const verified = banks.filter((b) => b.status === 'VERIFIED');
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
          Payout requests
        </Text>
        {!!error && <Text accessibilityRole="alert">{error}</Text>}
        {wallet && <Text>Available balance: INR {Number(wallet.balance).toFixed(2)}</Text>}
        {!verified.length && <Text>A verified bank account is required to request a payout.</Text>}
        {verified.map((b) => (
          <TouchableOpacity
            key={b.id}
            accessibilityRole="radio"
            accessibilityState={{
              checked: bankId === b.id,
            }}
            onPress={() => setBankId(b.id)}
          >
            <Text>
              {bankId === b.id ? 'Selected: ' : ''}
              {b.bankName} ending {b.lastFour}
            </Text>
          </TouchableOpacity>
        ))}
        <Text>Amount (INR)</Text>
        <TextInput
          accessibilityLabel="Payout amount"
          style={{
            borderWidth: 1,
            padding: 12,
          }}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity disabled={saving || !wallet || !bankId || !amount} onPress={submit}>
          <Text>{saving ? 'Submitting...' : 'Request payout'}</Text>
        </TouchableOpacity>
        <Text>
          Requests reserve the amount from your wallet. Approval does not confirm a bank transfer.
        </Text>
        <Text>Request history</Text>
        {!history.length && <Text>No payout requests yet.</Text>}
        {history.map((p) => (
          <View key={p.id}>
            <Text>
              Request #{p.id}: INR {Number(p.amount).toFixed(2)} - {p.status}
            </Text>
            <Text>{p.bankAccount}</Text>
            <Text>{new Date(p.requestedAt).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
