import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'it', name: 'Italiano' },
  { id: 'ja', name: '日本語' },
  { id: 'fr', name: 'Français' },
  { id: 'sv', name: 'Svenska' },
];

export default function LanguageSettingsScreen() {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Language</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Select your preferred language for the interface. This will update immediately.
        </Text>

        <View style={styles.listContainer}>
          {LANGUAGES.map((lang, index) => (
            <TouchableOpacity 
              key={lang.id} 
              style={[
                styles.languageItem,
                index === LANGUAGES.length - 1 && styles.lastItem
              ]}
              onPress={() => setSelectedLanguage(lang.id)}
            >
              <Text style={[
                styles.languageName,
                selectedLanguage === lang.id && styles.languageNameSelected
              ]}>
                {lang.name}
              </Text>
              {selectedLanguage === lang.id && (
                <Ionicons name="checkmark" size={24} color={colors['forest-green']} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomIconContainer}>
          <Ionicons name="globe-outline" size={64} color={colors['forest-green']} style={styles.bottomIcon} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -spacing.stackSm,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.sectionGap,
    paddingBottom: spacing.sectionGap,
    alignItems: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.stackLg,
    maxWidth: 300,
  },
  listContainer: {
    width: '100%',
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
    overflow: 'hidden',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.stackMd,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.2)',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  languageName: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  languageNameSelected: {
    color: colors['on-surface'],
    fontWeight: '500',
  },
  bottomIconContainer: {
    marginTop: spacing.sectionGap,
    opacity: 0.4,
  },
  bottomIcon: {
    fontWeight: '100',
  },
});
