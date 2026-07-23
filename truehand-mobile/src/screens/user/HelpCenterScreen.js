import api from '../../services/api';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const CATEGORIES = [
  { id: '1', title: 'Orders', desc: 'Track shipments, view history, and manage returns.', icon: 'cube-outline' },
  { id: '2', title: 'Payments', desc: 'Manage payment methods, invoices, and billing issues.', icon: 'card-outline' },
  { id: '3', title: 'Shipping', desc: 'Delivery times, international shipping, and policies.', icon: 'boat-outline' },
  { id: '4', title: 'Artisan Workshop', desc: 'Learn about our craftsmen, materials, and care guides.', icon: 'hammer-outline' },
];

export default function HelpCenterScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bag-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>How can we help?</Text>
          <Text style={styles.heroSubtitle}>
            Find answers to your questions, manage your orders, or reach out to our concierge team.
          </Text>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.outline} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help..."
              placeholderTextColor={colors.outline}
            />
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard}>
              <View style={styles.iconWrapper}>
                <Ionicons name={cat.icon} size={24} color={colors['forest-green']} />
              </View>
              <View style={styles.categoryTextWrapper}>
                <Text style={styles.categoryTitle}>{cat.title}</Text>
                <Text style={styles.categoryDesc}>{cat.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Concierge */}
        <View style={styles.conciergeSection}>
          <View style={styles.conciergeBg}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/800x400' }} 
              style={styles.conciergeImage} 
              blurRadius={10} 
            />
            <View style={styles.conciergeOverlay} />
          </View>
          
          <View style={styles.conciergeContent}>
            <Text style={styles.conciergeTitle}>Contact Concierge</Text>
            <Text style={styles.conciergeDesc}>
              Our dedicated team is available to assist you with personalized recommendations, styling advice, or any complex inquiries.
            </Text>
            
            <View style={styles.conciergeButtons}>
              <TouchableOpacity style={styles.emailBtn}>
                <Ionicons name="mail-outline" size={18} color={colors.surface} />
                <Text style={styles.emailBtnText}>Email Us</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.chatBtn}>
                <Ionicons name="chatbubble-outline" size={18} color={colors.charcoal} />
                <Text style={styles.chatBtnText}>Live Chat</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.hoursText}>Available Monday - Friday, 9am - 6pm EST</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
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
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.sectionGap,
  },
  heroTitle: {
    ...typography.displayLg,
    color: colors['forest-green'],
    marginBottom: spacing.stackMd,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.stackLg,
  },
  searchContainer: {
    width: '100%',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: colors['surface-linen'],
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.5)',
    borderRadius: 4,
    height: 48,
    paddingLeft: 44,
    paddingRight: 16,
    ...typography.bodyMd,
    color: colors['on-surface'],
  },
  grid: {
    gap: spacing.stackMd,
    marginBottom: spacing.sectionGap,
  },
  categoryCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    borderRadius: 12,
    padding: spacing.stackLg,
    flexDirection: 'column',
    alignItems: 'flex-start',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors['surface-container'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  categoryTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
  },
  categoryDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  conciergeSection: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  conciergeBg: {
    ...StyleSheet.absoluteFillObject,
  },
  conciergeImage: {
    width: '100%',
    height: '100%',
  },
  conciergeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(246, 243, 242, 0.85)',
  },
  conciergeContent: {
    padding: spacing.stackLg,
    position: 'relative',
    zIndex: 1,
  },
  conciergeTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackMd,
  },
  conciergeDesc: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    marginBottom: spacing.stackLg,
  },
  conciergeButtons: {
    flexDirection: 'column',
    gap: spacing.stackSm,
    marginBottom: spacing.stackMd,
  },
  emailBtn: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    gap: 8,
  },
  emailBtnText: {
    ...typography.labelMd,
    color: colors.surface,
  },
  chatBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.charcoal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    gap: 8,
  },
  chatBtnText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  hoursText: {
    ...typography.labelSm,
    color: colors.outline,
    textAlign: 'center',
  }
});
