import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const LANGUAGES = [
  { id: 'en', label: 'English (US)' },
  { id: 'es', label: 'Español' },
  { id: 'fr', label: 'Français' },
  { id: 'de', label: 'Deutsch' },
];

export default function ChooseLanguageScreen() {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSave = () => {
    // In a real app, save to user settings / localization context
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.charcoal} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.headerSection}>
          <Text style={styles.title}>Select Your Language</Text>
          <Text style={styles.subtitle}>
            Choose the language you prefer to experience TrueHand. You can always change this later in your settings.
          </Text>
        </View>

        <View style={styles.listContainer}>
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <TouchableOpacity 
                key={lang.id} 
                style={[styles.optionCard, isSelected && styles.optionCardActive]}
                onPress={() => setSelectedLanguage(lang.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>
                  {lang.label}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={24} color={colors['forest-green']} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Preference</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  header: {
    paddingHorizontal: spacing.marginMobile,
    height: 56,
    justifyContent: 'center',
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginLeft: -8,
  },
  backText: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginLeft: 4,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.sectionGap,
    paddingBottom: spacing.sectionGap,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: spacing.sectionGap,
  },
  title: {
    ...typography.displayLg,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.stackSm,
  },
  subtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  listContainer: {
    gap: spacing.stackMd,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.stackLg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionCardActive: {
    backgroundColor: 'rgba(246, 243, 242, 0.5)', // surface-container-low/50
    shadowOpacity: 0.1,
    borderColor: 'rgba(22, 52, 40, 0.05)',
  },
  optionText: {
    ...typography.bodyLg,
    color: colors['on-surface'],
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: '500',
  },
  footer: {
    padding: spacing.marginMobile,
    backgroundColor: colors['surface-linen'],
  },
  saveButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: spacing.stackMd,
    borderRadius: 4,
    alignItems: 'center',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  }
});
