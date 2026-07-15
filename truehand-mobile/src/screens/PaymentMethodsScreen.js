import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const PAYMENT_METHODS = [
  {
    id: 1,
    type: 'card',
    name: 'Chase Sapphire Reserve',
    number: '•••• 4242',
    meta: 'Expires 12/25',
    isDefault: true,
  },
  {
    id: 2,
    type: 'bank',
    name: 'Bank of America Checking',
    number: '•••• 9876',
    meta: '',
    isDefault: false,
  },
  {
    id: 3,
    type: 'contactless',
    name: 'Apple Pay',
    number: '',
    meta: 'Linked to Device',
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Preferences</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
        
        <View style={styles.methodsList}>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity key={method.id} style={styles.methodCard}>
              <View style={styles.methodInfo}>
                <View style={styles.iconContainer}>
                  <Ionicons 
                    name={
                      method.type === 'card' ? 'card' : 
                      method.type === 'bank' ? 'business' : 'phone-portrait'
                    } 
                    size={20} 
                    color={colors['forest-green']} 
                  />
                </View>
                <View style={styles.methodDetails}>
                  <View style={styles.nameRow}>
                    <Text style={styles.methodName}>{method.name}</Text>
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>Default</Text>
                      </View>
                    )}
                  </View>
                  {!!method.number && (
                    <Text style={styles.methodNumber}>{method.number}</Text>
                  )}
                  {!!method.meta && (
                    <Text style={styles.methodMeta}>{method.meta}</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={20} color={colors['outline-variant']} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color={colors['forest-green']} />
          <Text style={styles.addButtonText}>ADD PAYMENT METHOD</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -spacing.stackSm,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.sectionGap,
    paddingBottom: spacing.sectionGap,
  },
  sectionTitle: {
    ...typography.bodyLg,
    color: colors.charcoal,
    marginBottom: spacing.stackMd,
  },
  methodsList: {
    gap: spacing.stackMd,
    marginBottom: spacing.stackLg,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors['surface-container-lowest'],
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 32,
    backgroundColor: colors['surface-container'],
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.5)',
  },
  methodDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  methodName: {
    ...typography.bodyMd,
    color: colors['on-surface'],
  },
  defaultBadge: {
    backgroundColor: colors['surface-container'],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  defaultBadgeText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  methodNumber: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    letterSpacing: 2,
    marginTop: 4,
  },
  methodMeta: {
    ...typography.labelSm,
    color: colors.outline,
    marginTop: 4,
  },
  deleteButton: {
    padding: spacing.stackSm,
  },
  addButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderStyle: 'dashed',
    gap: 8,
  },
  addButtonText: {
    ...typography.labelMd,
    color: colors['forest-green'],
    letterSpacing: 1.5,
  },
});
