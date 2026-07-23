import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import api from '../../services/api';

const AdminDashboardScreen = ({ navigation }) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await api.get('/admin/metrics');
      setMetrics(res.data);
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
        <Text style={styles.headerTitle}>Platform Overview</Text>
        <Text style={styles.headerSubtitle}>High-level marketplace performance</Text>
        
        {metrics && (
          <View style={styles.metricsContainer}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Users</Text>
              <Text style={styles.metricValue}>{metrics.totalUsers}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Orders</Text>
              <Text style={styles.metricValue}>{metrics.totalOrders}</Text>
            </View>
            <View style={[styles.metricCard, styles.metricCardAlert]}>
              <Text style={[styles.metricLabel, styles.textAlert]}>Pending KYC</Text>
              <Text style={[styles.metricValue, styles.textAlert]}>{metrics.pendingSellers + metrics.pendingDelivery}</Text>
            </View>
          </View>
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
    backgroundColor: '#FBFDF9',
    justifyContent: 'center',
    alignItems: 'center',
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
  metricsContainer: {
    gap: 16,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E3DD',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  metricCardAlert: {
    borderColor: '#F9DEDC',
    backgroundColor: '#FFF0EE',
  },
  metricLabel: {
    fontSize: 14,
    color: '#424940',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1C19',
  },
  textAlert: {
    color: '#8C1D18',
  },
});

export default AdminDashboardScreen;
