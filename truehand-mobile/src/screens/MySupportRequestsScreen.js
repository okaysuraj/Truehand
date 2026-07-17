import api from '../services/api';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const REQUESTS = [
  {
    id: 'REQ-8492',
    title: 'Issue with recent ceramic order delivery',
    status: 'Open',
    lastUpdated: '2 hours ago',
  },
  {
    id: 'REQ-8451',
    title: 'Inquiry regarding custom commission timeline',
    status: 'Pending',
    lastUpdated: 'Yesterday',
  },
  {
    id: 'REQ-8302',
    title: 'Return request for textile piece',
    status: 'Resolved',
    lastUpdated: 'Oct 12, 2023',
  }
];

export default function MySupportRequestsScreen() {
  const navigation = useNavigation();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open':
        return { bg: colors['primary-fixed'], text: colors['on-primary-fixed'] };
      case 'Pending':
        return { bg: colors['surface-variant'], text: colors['on-surface-variant'] };
      case 'Resolved':
        return { bg: colors['surface-container-high'], text: colors.outline };
      default:
        return { bg: colors['surface-variant'], text: colors['on-surface-variant'] };
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Support Requests</Text>
          <Text style={styles.pageSubtitle}>Manage and track the status of your inquiries.</Text>
        </View>

        <View style={styles.listContainer}>
          {REQUESTS.map((req, index) => {
            const statusStyle = getStatusColor(req.status);
            const isLast = index === REQUESTS.length - 1;

            return (
              <TouchableOpacity 
                key={req.id} 
                style={[styles.requestCard, isLast && styles.lastCard]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.titleSection}>
                    <Text style={styles.reqId}>#{req.id}</Text>
                    <Text style={styles.reqTitle}>{req.title}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>
                      {req.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Ionicons 
                    name={req.status === 'Resolved' ? 'checkmark-circle-outline' : 'time-outline'} 
                    size={16} 
                    color={colors['on-surface-variant']} 
                  />
                  <Text style={styles.lastUpdated}>Last updated: {req.lastUpdated}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color={colors.surface} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22, 52, 40, 0.05)',
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  pageHeader: {
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  listContainer: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors['surface-container-highest'],
    overflow: 'hidden',
  },
  requestCard: {
    padding: spacing.stackMd,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-highest'],
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.stackSm,
  },
  titleSection: {
    flex: 1,
    paddingRight: spacing.stackMd,
  },
  reqId: {
    ...typography.labelSm,
    color: colors['clay-outline'],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  reqTitle: {
    ...typography.bodyLg,
    color: colors.charcoal,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  statusText: {
    ...typography.labelSm,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lastUpdated: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors['forest-green'],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  }
});
