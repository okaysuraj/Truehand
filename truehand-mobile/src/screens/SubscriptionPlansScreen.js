import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

const SubscriptionPlansScreen = ({ navigation }) => {
  const { user } = useAuthStore();
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const res = await api.get(`/sellers/${user.id}/subscription`);
      setSub(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planName) => {
    setUpgrading(true);
    try {
      await api.post(`/sellers/${user.id}/subscribe`, { planName });
      fetchSubscription();
      Alert.alert('Success', `Successfully subscribed to ${planName}!`);
    } catch (err) {
      Alert.alert('Error', 'Subscription failed');
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return <SafeAreaView style={styles.centered}><ActivityIndicator size="large" color="#2E6C36" /></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Manage Subscription</Text>
          <Text style={styles.subtitle}>Current Plan: <Text style={styles.currentPlan}>{sub?.planName}</Text></Text>
        </View>

        {/* Free Plan */}
        <View style={[styles.card, sub?.planName === 'FREE' && styles.cardActive]}>
          <Text style={styles.planName}>Free</Text>
          <Text style={styles.planPrice}>$0<Text style={styles.planFreq}>/mo</Text></Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>✓ 50 Product Listings</Text>
            <Text style={styles.featureItem}>✓ Standard Support</Text>
          </View>
          <TouchableOpacity 
            style={[styles.btn, sub?.planName === 'FREE' && styles.btnDisabled]}
            disabled={sub?.planName === 'FREE' || upgrading}
            onPress={() => handleSubscribe('FREE')}
          >
            <Text style={[styles.btnText, sub?.planName === 'FREE' && styles.btnTextDisabled]}>
              {sub?.planName === 'FREE' ? 'Current Plan' : 'Downgrade'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Premium Plan */}
        <View style={[styles.card, styles.cardPremium, sub?.planName === 'PREMIUM' && styles.cardActivePremium]}>
          <View style={styles.popularBadge}><Text style={styles.popularText}>MOST POPULAR</Text></View>
          <Text style={[styles.planName, {color: '#FFF'}]}>Premium</Text>
          <Text style={[styles.planPrice, {color: '#FFF'}]}>$29<Text style={[styles.planFreq, {color: '#E0E0E0'}]}>/mo</Text></Text>
          <View style={styles.featuresList}>
            <Text style={[styles.featureItem, {color: '#FFF'}]}>✓ Unlimited Listings</Text>
            <Text style={[styles.featureItem, {color: '#FFF'}]}>✓ Priority Support</Text>
            <Text style={[styles.featureItem, {color: '#FFF'}]}>✓ Custom Storefront</Text>
          </View>
          <TouchableOpacity 
            style={[styles.btn, styles.btnPremium, sub?.planName === 'PREMIUM' && styles.btnPremiumDisabled]}
            disabled={sub?.planName === 'PREMIUM' || upgrading}
            onPress={() => handleSubscribe('PREMIUM')}
          >
            <Text style={[styles.btnText, {color: '#2E6C36'}, sub?.planName === 'PREMIUM' && {color: '#666'}]}>
              {sub?.planName === 'PREMIUM' ? 'Current Plan' : 'Upgrade to Premium'}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFDF9' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A1C19', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#424940' },
  currentPlan: { color: '#2E6C36', fontWeight: 'bold' },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E3DD',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  cardActive: { borderColor: '#2E6C36' },
  cardPremium: { backgroundColor: '#2E6C36', borderColor: '#2E6C36' },
  cardActivePremium: { borderColor: '#1A1C19' },
  popularBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 16,
  },
  popularText: { color: '#FFF', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  planName: { fontSize: 20, fontWeight: 'bold', color: '#1A1C19', marginBottom: 8 },
  planPrice: { fontSize: 36, fontWeight: 'bold', color: '#2E6C36', marginBottom: 24 },
  planFreq: { fontSize: 16, fontWeight: 'normal' },
  featuresList: { marginBottom: 32 },
  featureItem: { fontSize: 14, color: '#424940', marginBottom: 12 },
  btn: {
    borderWidth: 1,
    borderColor: '#2E6C36',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnPremium: { backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' },
  btnDisabled: { borderColor: '#E2E3DD', backgroundColor: '#F3F5F1' },
  btnPremiumDisabled: { backgroundColor: '#E0E0E0' },
  btnText: { color: '#2E6C36', fontWeight: 'bold', fontSize: 16 },
  btnTextDisabled: { color: '#9E9E9E' },
});

export default SubscriptionPlansScreen;
