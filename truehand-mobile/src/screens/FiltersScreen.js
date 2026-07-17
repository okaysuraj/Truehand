import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const MATERIALS = ['Ceramic', 'Wood', 'Textile', 'Glass', 'Metal'];
const REGIONS = ['Japan', 'Scandinavia', 'Mediterranean', 'South America'];
const SUSTAINABILITY = [
  { id: 'any', label: 'Any Rating', icons: 1 },
  { id: 'high', label: 'High Impact Focus', icons: 2 },
  { id: 'cert', label: 'Certified Regenerative', icons: 3 },
];

export default function FiltersScreen() {
  const navigation = useNavigation();
  const [selectedMaterials, setSelectedMaterials] = useState(['Ceramic']);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [sustainability, setSustainability] = useState('any');

  const toggleMaterial = (mat) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const toggleRegion = (reg) => {
    if (selectedRegions.includes(reg)) {
      setSelectedRegions(selectedRegions.filter(r => r !== reg));
    } else {
      setSelectedRegions([...selectedRegions, reg]);
    }
  };

  const clearAll = () => {
    setSelectedMaterials([]);
    setSelectedRegions([]);
    setSustainability('any');
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Material */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Material</Text>
          <View style={styles.grid}>
            {MATERIALS.map(mat => (
              <TouchableOpacity key={mat} style={styles.checkboxRow} onPress={() => toggleMaterial(mat)}>
                <View style={[styles.checkbox, selectedMaterials.includes(mat) && styles.checkboxChecked]}>
                  {selectedMaterials.includes(mat) && <Ionicons name="checkmark" size={14} color={colors['on-primary']} />}
                </View>
                <Text style={styles.checkboxLabel}>{mat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Range (Mock visual) */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <Text style={styles.priceValue}>$50 - $800+</Text>
          </View>
          <View style={styles.sliderMock}>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { left: '10%', right: '30%' }]} />
              <View style={[styles.sliderThumb, { left: '10%' }]} />
              <View style={[styles.sliderThumb, { right: '30%' }]} />
            </View>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Min</Text>
              <Text style={styles.sliderLabelText}>Max</Text>
            </View>
          </View>
        </View>

        {/* Artisan Region */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Artisan Region</Text>
          <View style={styles.chipsContainer}>
            {REGIONS.map(reg => (
              <TouchableOpacity 
                key={reg} 
                style={[styles.chip, selectedRegions.includes(reg) && styles.chipSelected]}
                onPress={() => toggleRegion(reg)}
              >
                <Text style={[styles.chipText, selectedRegions.includes(reg) && styles.chipTextSelected]}>
                  {reg}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sustainability Rating */}
        <View style={[styles.section, { borderBottomWidth: 0 }]}>
          <Text style={styles.sectionTitle}>Sustainability Rating</Text>
          <View style={styles.radioGroup}>
            {SUSTAINABILITY.map(sus => (
              <TouchableOpacity key={sus.id} style={styles.radioRow} onPress={() => setSustainability(sus.id)}>
                <View style={[styles.radio, sustainability === sus.id && styles.radioChecked]}>
                  {sustainability === sus.id && <View style={styles.radioInner} />}
                </View>
                <View style={styles.radioLabelContainer}>
                  <View style={styles.iconsRow}>
                    {[...Array(sus.icons)].map((_, i) => (
                      <Ionicons key={i} name="leaf" size={16} color={colors['forest-green']} style={styles.leafIcon} />
                    ))}
                  </View>
                  <Text style={styles.radioLabel}>{sus.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={() => navigation.goBack()}>
          <Text style={styles.applyText}>Apply Filters</Text>
          <Text style={styles.applyCount}>(24 items)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-container-lowest'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  closeButton: {
    padding: spacing.stackSm,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.stackLg,
  },
  section: {
    marginBottom: spacing.sectionGap,
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors.primary,
    marginBottom: spacing.stackMd,
    fontSize: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.stackMd,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    gap: spacing.stackSm,
    marginBottom: spacing.stackSm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
  },
  checkboxLabel: {
    ...typography.bodyMd,
    color: colors['on-surface'],
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.stackMd,
  },
  priceValue: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
  },
  sliderMock: {
    paddingHorizontal: 8,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: colors['surface-variant'],
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors['forest-green'],
  },
  sliderThumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors['forest-green'],
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.stackSm,
  },
  sliderLabelText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.stackSm,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    backgroundColor: colors['surface-container-lowest'],
  },
  chipSelected: {
    backgroundColor: colors['surface-container'],
    borderColor: 'transparent',
  },
  chipText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  chipTextSelected: {
    color: colors.charcoal,
  },
  radioGroup: {
    gap: spacing.stackMd,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackSm,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioChecked: {
    borderColor: colors['forest-green'],
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors['forest-green'],
  },
  radioLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconsRow: {
    flexDirection: 'row',
  },
  leafIcon: {
    marginRight: 2,
  },
  radioLabel: {
    ...typography.bodyMd,
    color: colors['on-surface'],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors['surface-variant'],
    backgroundColor: colors['surface-container-lowest'],
  },
  clearText: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
    textDecorationLine: 'underline',
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['forest-green'],
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 4,
    gap: 8,
  },
  applyText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  applyCount: {
    ...typography.bodyMd,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
});
