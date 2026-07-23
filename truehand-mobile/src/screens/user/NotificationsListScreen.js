import api from '../../services/api';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const TABS = ['Activity', 'Offers', 'Stories'];

const NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'activity',
    title: 'Order Shipped',
    time: '2h ago',
    message: 'Your Hand-thrown Ceramic Vase is on its way. Track your package for details.',
    icon: 'car-outline', // truck-outline replacement
    iconColor: colors['forest-green'],
    iconBg: colors['surface-container'],
    isUnread: true,
  },
  {
    id: 'n2',
    type: 'activity',
    title: 'Order Delivered',
    time: 'Yesterday',
    message: 'Your package has been delivered to your front porch. Enjoy your new piece.',
    icon: 'cube-outline',
    iconColor: colors.outline,
    iconBg: colors['surface-container'],
    isUnread: false,
  },
  {
    id: 'n3',
    type: 'activity',
    title: 'Price Drop Alert',
    time: '1d ago',
    message: 'An item in your saved list, the Woven Linen Throw, is now 15% off.',
    icon: 'pricetag-outline',
    iconColor: colors.terracotta,
    iconBg: colors['secondary-fixed'],
    isUnread: true,
  },
  {
    id: 'n4',
    type: 'activity',
    title: 'New Artisan Spotlight',
    time: '3d ago',
    message: 'Discover the process behind Elena\'s minimalist ceramics studio in Kyoto.',
    image: 'https://via.placeholder.com/150',
    isUnread: false,
  }
];

export default function NotificationsListScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Activity');
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="checkmark-done" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {TABS.map(tab => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.listContainer}>
          {NOTIFICATIONS.map(notif => (
            <TouchableOpacity 
              key={notif.id} 
              style={[
                styles.notificationCard, 
                notif.isUnread ? styles.cardUnread : styles.cardRead
              ]}
            >
              {notif.isUnread && <View style={styles.unreadDot} />}
              
              {notif.image ? (
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: notif.image }} style={styles.notifImage} />
                </View>
              ) : (
                <View style={[styles.iconWrapper, { backgroundColor: notif.iconBg }]}>
                  <Ionicons name={notif.icon} size={20} color={notif.iconColor} />
                </View>
              )}

              <View style={styles.textContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.notifTitle}>{notif.title}</Text>
                  <Text style={styles.notifTime}>{notif.time}</Text>
                </View>
                <Text style={styles.notifMessage}>{notif.message}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-high'],
  },
  tabsScroll: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    gap: spacing.stackLg,
  },
  tabBtn: {
    paddingBottom: spacing.stackSm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: colors['forest-green'],
  },
  tabText: {
    ...typography.labelMd,
    color: colors.outline,
  },
  tabTextActive: {
    color: colors['forest-green'],
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackMd,
    paddingBottom: spacing.sectionGap,
  },
  listContainer: {
    gap: spacing.stackSm,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: spacing.stackMd,
    borderRadius: 8,
    alignItems: 'flex-start',
    position: 'relative',
  },
  cardUnread: {
    backgroundColor: colors['surface-container-low'],
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  cardRead: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors['surface-container-high'],
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.terracotta,
    position: 'absolute',
    top: spacing.stackMd + 4,
    left: spacing.stackSm,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.stackSm,
    marginRight: spacing.stackMd,
  },
  imageWrapper: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: spacing.stackSm,
    marginRight: spacing.stackMd,
  },
  notifImage: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notifTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
    flex: 1,
    marginRight: 8,
  },
  notifTime: {
    ...typography.labelSm,
    color: colors.outline,
  },
  notifMessage: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  }
});
