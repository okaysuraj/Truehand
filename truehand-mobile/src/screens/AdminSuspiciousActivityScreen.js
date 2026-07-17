import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import api from '../services/api';

const AdminSuspiciousActivityScreen = ({ navigation }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/admin/advanced/suspicious-activity');
      setLogs(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await api.post(`/admin/advanced/suspicious-activity/${id}/resolve`);
      fetchLogs();
    } catch (err) {
      Alert.alert('Error', 'Failed to resolve log');
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
        <Text style={styles.headerTitle}>Security Logs</Text>
        <Text style={styles.headerSubtitle}>Review platform security flags.</Text>
        
        {logs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No suspicious activity detected.</Text>
          </View>
        ) : (
          logs.map((log) => (
            <View key={log.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{log.activityType}</Text>
                <Text style={[styles.statusBadge, log.status === 'RESOLVED' ? styles.statusResolved : styles.statusPending]}>
                  {log.status}
                </Text>
              </View>
              <Text style={styles.detailText}>{log.description}</Text>
              <Text style={styles.dateText}>{new Date(log.createdAt).toLocaleDateString()}</Text>

              {log.status !== 'RESOLVED' && (
                <View style={styles.actionsContainer}>
                  <TouchableOpacity 
                    style={styles.btnApprove} 
                    onPress={() => handleResolve(log.id)}
                  >
                    <Text style={styles.btnApproveText}>Mark as Resolved</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E3DD',
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8C1D18',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8C1D18',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  statusPending: {
    backgroundColor: '#FFF0EE',
    color: '#8C1D18',
  },
  statusResolved: {
    backgroundColor: '#E8F5E9',
    color: '#2E6C36',
  },
  detailText: {
    fontSize: 14,
    color: '#1A1C19',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#72796F',
  },
  actionsContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  btnApprove: {
    backgroundColor: '#2E6C36',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  btnApproveText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default AdminSuspiciousActivityScreen;
