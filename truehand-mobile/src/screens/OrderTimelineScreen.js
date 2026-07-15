import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function OrderTimelineScreen() {
  const navigation = useNavigation();

  const steps = [
    {
      id: 1,
      title: 'Order Placed',
      timestamp: 'Oct 12, 10:45 AM',
      description: 'Your order has been received and sent to the artisan.',
      icon: 'receipt',
      completed: true,
      current: false,
    },
    {
      id: 2,
      title: 'Confirmed',
      timestamp: 'Oct 12, 02:15 PM',
      description: 'Elena Rostova has accepted your order and begun preparation.',
      icon: 'checkmark-circle',
      completed: true,
      current: false,
    },
    {
      id: 3,
      title: 'Shipped from Studio',
      timestamp: 'Oct 14, 09:30 AM',
      description: 'Your items have been carefully packaged and handed over to our delivery partners.',
      icon: 'cube',
      completed: true,
      current: false,
    },
    {
      id: 4,
      title: 'In Transit',
      timestamp: 'Oct 15, 08:12 AM',
      description: 'Package has arrived at the local sorting facility.',
      icon: 'car',
      completed: false,
      current: true,
      trackingId: 'UXB-77291-K'
    },
    {
      id: 5,
      title: 'Delivered',
      timestamp: 'Estimated: Oct 16 by 8:00 PM',
      description: '',
      icon: 'home',
      completed: false,
      current: false,
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Journey</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.orderHeaderCard}>
          <View style={styles.orderHeaderTop}>
            <View>
              <Text style={styles.orderIdLabel}>Order #</Text>
              <Text style={styles.orderIdValue}>TH-8924-CR</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>In Transit</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.itemRow}>
            <View style={styles.imageContainer}>
              <Ionicons name="image-outline" size={32} color={colors.outline} />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>Hand-thrown Stoneware Mug</Text>
              <Text style={styles.itemMeta}>Qty: 2 • Artisan: Elena Rostova</Text>
            </View>
          </View>
        </View>

        <View style={styles.timelineContainer}>
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const iconBg = step.completed ? colors['forest-green'] : (step.current ? colors['surface-tint'] : colors['surface-dim']);
            const iconColor = (step.completed || step.current) ? colors['on-primary'] : colors.outline;
            
            return (
              <View key={step.id} style={[styles.timelineItem, (!step.completed && !step.current) && {opacity: 0.6}]}>
                <View style={styles.timelineLineContainer}>
                  <View style={[styles.timelineIconContainer, { backgroundColor: iconBg }]}>
                    <Ionicons name={step.icon} size={18} color={iconColor} />
                  </View>
                  {!isLast && <View style={styles.timelineLine} />}
                </View>
                
                <View style={styles.timelineContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepTimestamp}>{step.timestamp}</Text>
                  {!!step.description && (
                    <Text style={styles.stepDescription}>{step.description}</Text>
                  )}
                  
                  {step.trackingId && (
                    <View style={styles.trackingIdCard}>
                      <View>
                        <Text style={styles.trackingIdLabel}>Tracking ID</Text>
                        <Text style={styles.trackingIdValue}>{step.trackingId}</Text>
                      </View>
                      <TouchableOpacity style={styles.copyBtn}>
                        <Ionicons name="copy-outline" size={16} color={colors.charcoal} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.helpBtn}>
          <Text style={styles.helpBtnText}>Need Help with this Order?</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, backgroundColor: 'rgba(252, 249, 248, 0.8)' },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'], fontWeight: '700' },
  backButton: { padding: 8, marginHorizontal: -8 },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  
  orderHeaderCard: { backgroundColor: colors['surface-container-low'], padding: spacing.stackMd, borderRadius: 12, shadowColor: colors.charcoal, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1, marginBottom: spacing.stackLg, borderWidth: 1, borderColor: 'rgba(193, 200, 195, 0.2)' },
  orderHeaderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: spacing.stackSm },
  orderIdLabel: { ...typography.labelSm, color: colors.outline, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  orderIdValue: { ...typography.headlineMd, color: colors.charcoal },
  statusBadge: { backgroundColor: 'rgba(173, 206, 189, 0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  statusBadgeText: { ...typography.labelSm, color: colors['forest-green'] },
  
  divider: { height: 1, backgroundColor: 'rgba(193, 200, 195, 0.3)', marginVertical: 12 },
  
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  imageContainer: { width: 64, height: 64, borderRadius: 8, backgroundColor: colors['surface-container-high'], alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(193, 200, 195, 0.3)' },
  itemInfo: { flex: 1 },
  itemName: { ...typography.bodyMd, color: colors.charcoal, fontWeight: '500' },
  itemMeta: { ...typography.labelSm, color: colors.outline, marginTop: 4 },
  
  timelineContainer: { paddingLeft: 8, paddingVertical: 16 },
  timelineItem: { flexDirection: 'row', marginBottom: spacing.stackLg, minHeight: 64 },
  timelineLineContainer: { alignItems: 'center', marginRight: 16, width: 32 },
  timelineIconContainer: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  timelineLine: { width: 2, height: '100%', backgroundColor: colors['surface-dim'], position: 'absolute', top: 32, bottom: -32, zIndex: 1 },
  
  timelineContent: { flex: 1, paddingTop: 4, paddingBottom: 16 },
  stepTitle: { ...typography.labelMd, color: colors.charcoal },
  stepTimestamp: { ...typography.labelSm, color: colors.outline, marginTop: 4 },
  stepDescription: { ...typography.bodyMd, color: colors['on-surface-variant'], fontSize: 14, marginTop: 8 },
  
  trackingIdCard: { marginTop: 16, backgroundColor: colors['surface-container'], padding: 16, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(193, 200, 195, 0.2)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  trackingIdLabel: { ...typography.labelSm, color: colors.outline },
  trackingIdValue: { ...typography.labelMd, color: colors.charcoal, marginTop: 4, fontFamily: 'monospace' },
  copyBtn: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: colors['clay-outline'], alignItems: 'center', justifyContent: 'center' },
  
  helpBtn: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 4, borderWidth: 1, borderColor: colors.charcoal, marginTop: spacing.stackLg },
  helpBtnText: { ...typography.labelMd, color: colors.charcoal }
});
