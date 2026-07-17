import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const GLAZES = [
  { id: 'speckled-white', label: 'Speckled White', color: '#f4f1eb' },
  { id: 'iron-red', label: 'Iron Red', color: '#8b3a2b' },
  { id: 'midnight-blue', label: 'Midnight Blue', color: '#1c2841' },
];

const SIZES = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];

export default function ProductVariantSelectionModal() {
  const navigation = useNavigation();
  const [selectedGlaze, setSelectedGlaze] = useState('speckled-white');
  const [selectedSize, setSelectedSize] = useState('medium');

  const handleConfirm = () => {
    // Navigate back with selected options
    navigation.goBack();
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Options</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color={colors.outline} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Glaze Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>GLAZE</Text>
            <Text style={styles.sectionSubtitle}>Choose your finish. Each piece fires uniquely.</Text>
            
            <View style={styles.gridContainer}>
              {GLAZES.map((glaze) => {
                const isSelected = selectedGlaze === glaze.id;
                return (
                  <TouchableOpacity
                    key={glaze.id}
                    style={[
                      styles.glazeOption,
                      isSelected && styles.glazeOptionSelected
                    ]}
                    onPress={() => setSelectedGlaze(glaze.id)}
                  >
                    <View style={[styles.glazeColor, { backgroundColor: glaze.color }]} />
                    <Text style={styles.glazeLabel}>{glaze.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Size Section */}
          <View style={styles.section}>
            <View style={styles.sizeHeader}>
              <Text style={styles.sectionTitle}>SIZE</Text>
              <TouchableOpacity>
                <Text style={styles.sizeGuideText}>Size Guide</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.pillContainer}>
              {SIZES.map((size) => {
                const isSelected = selectedSize === size.id;
                return (
                  <TouchableOpacity
                    key={size.id}
                    style={[
                      styles.sizePill,
                      isSelected && styles.sizePillSelected
                    ]}
                    onPress={() => setSelectedSize(size.id)}
                  >
                    <Text style={[styles.sizePillText, isSelected && styles.sizePillTextSelected]}>
                      {size.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Footer Action */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm Selection</Text>
            <Ionicons name="checkmark" size={18} color={colors['on-primary']} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors['surface-linen'],
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.stackLg,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.stackLg,
  },
  section: {
    marginBottom: spacing.stackLg,
  },
  sectionTitle: {
    ...typography.labelMd,
    color: colors.charcoal,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.stackSm,
  },
  sectionSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    fontSize: 14,
    marginBottom: spacing.stackMd,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  glazeOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    padding: spacing.base,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  glazeOptionSelected: {
    borderColor: colors['forest-green'],
    backgroundColor: 'rgba(200, 234, 216, 0.2)', // primary-fixed/20 roughly
  },
  glazeColor: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
    marginBottom: 8,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  glazeLabel: {
    ...typography.labelSm,
    color: colors.charcoal,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors['surface-variant'],
    marginBottom: spacing.stackLg,
  },
  sizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  sizeGuideText: {
    ...typography.labelSm,
    color: colors.outline,
    textDecorationLine: 'underline',
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.stackSm,
  },
  sizePill: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    backgroundColor: colors.surface,
  },
  sizePillSelected: {
    borderColor: colors['forest-green'],
    backgroundColor: colors['forest-green'],
  },
  sizePillText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  sizePillTextSelected: {
    color: colors.white || '#fff',
  },
  footer: {
    padding: spacing.marginMobile,
    paddingBottom: spacing.stackLg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(228, 226, 225, 0.5)',
    backgroundColor: colors['surface-linen'],
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors['forest-green'],
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});
