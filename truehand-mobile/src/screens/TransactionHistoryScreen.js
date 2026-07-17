import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

const TransactionHistoryScreen = ({ navigation }) => {
  const { user } = useAuthStore();
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    fetchWalletData();
  }, [user]);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const [walletRes, txRes] = await Promise.all([
        api.get(`/wallet/${user.id}`),
        api.get(`/wallet/${user.id}/transactions`)
      ]);
      setWallet(walletRes.data);
      setTransactions(txRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#2E6C36" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Wallet & Transactions</Text>
        <Text style={styles.headerSubtitle}>Manage your funds and history</Text>
        
        {wallet && (
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceValue}>₹{wallet.balance.toFixed(2)}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No transactions found.</Text>
          </View>
        ) : (
          transactions.map(tx => (
            <View key={tx.id} style={styles.txCard}>
              <View style={styles.txInfo}>
                <Text style={styles.txDesc}>{tx.description}</Text>
                <Text style={styles.txDate}>
                  {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString()}
                </Text>
              </View>
              <Text style={[styles.txAmount, tx.type === 'CREDIT' ? styles.txCredit : styles.txDebit]}>
                {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFDF9',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFDF9',
  },
  content: {
    padding: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1C19',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#424940',
    marginBottom: 24,
  },
  balanceCard: {
    backgroundColor: '#2E6C36',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1C19',
    marginBottom: 16,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F5F1',
    borderRadius: 8,
  },
  emptyText: {
    color: '#72796F',
    fontSize: 16,
  },
  txCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E3DD',
    marginBottom: 12,
  },
  txInfo: {
    flex: 1,
    marginRight: 16,
  },
  txDesc: {
    fontSize: 16,
    color: '#1A1C19',
    fontWeight: '500',
    marginBottom: 4,
  },
  txDate: {
    fontSize: 12,
    color: '#72796F',
  },
  txAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txCredit: {
    color: '#2E6C36',
  },
  txDebit: {
    color: '#8C1D18',
  },
});

export default TransactionHistoryScreen;
