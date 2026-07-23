import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import api from '../../services/api';

const AdminDeliveryAgentManagementScreen = ({ navigation }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(null);

  useEffect(() => {
    fetchPendingAgents();
  }, []);

  const fetchPendingAgents = async () => {
    try {
      const res = await api.get('/admin/kyc/delivery/pending');
      setAgents(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (agentId, status) => {
    setActioning(agentId);
    try {
      await api.put(`/admin/kyc/delivery/${agentId}`, { status, reason: 'Admin Action' });
      fetchPendingAgents();
    } catch (err) {
      Alert.alert('Error', 'Failed to update status');
    } finally {
      setActioning(null);
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
        <Text style={styles.headerTitle}>Delivery Partners</Text>
        <Text style={styles.headerSubtitle}>Review and approve pending delivery agents</Text>
        
        {agents.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No pending delivery applications.</Text>
          </View>
        ) : (
          agents.map((a, idx) => (
            <View key={a.id || idx} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{a.vehicleType || 'Unknown Vehicle'}</Text>
                <Text style={styles.statusBadge}>PENDING</Text>
              </View>
              <Text style={styles.detailText}>License: {a.drivingLicenseNumber || 'N/A'}</Text>
              <Text style={styles.detailText}>Reg: {a.vehicleRegistrationNumber || 'N/A'}</Text>

              <View style={styles.actionsContainer}>
                <TouchableOpacity 
                  style={[styles.btn, styles.btnReject]} 
                  disabled={actioning === a.user?.id}
                  onPress={() => handleApproval(a.user?.id, 'REJECTED')}
                >
                  <Text style={styles.btnRejectText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.btn, styles.btnApprove]} 
                  disabled={actioning === a.user?.id}
                  onPress={() => handleApproval(a.user?.id, 'APPROVED')}
                >
                  {actioning === a.user?.id ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={styles.btnApproveText}>Approve</Text>
                  )}
                </TouchableOpacity>
              </View>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E6C36',
  },
  statusBadge: {
    backgroundColor: '#FFF0EE',
    color: '#8C1D18',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  detailText: {
    fontSize: 14,
    color: '#424940',
    marginBottom: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnReject: {
    borderWidth: 1,
    borderColor: '#8C1D18',
    backgroundColor: '#FFF',
  },
  btnRejectText: {
    color: '#8C1D18',
    fontWeight: '600',
  },
  btnApprove: {
    backgroundColor: '#2E6C36',
  },
  btnApproveText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default AdminDeliveryAgentManagementScreen;
