import api from '../../services/api';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

export default function SearchInputScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const recentSearches = [
    'Hand-thrown Ceramics',
    'Linen Weaving Looms',
    'Kyoto Woodworking'
  ];

  const popularSearches = [
    'Wabi-Sabi Tableware',
    'Indigo Dyeing',
    'Hand-blown Glass',
    'Minimalist Furniture',
    'Artisan Knives',
    'Terracotta Vases'
  ];

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', { query: searchQuery });
    }
  };

  const handleSuggestionPress = (query) => {
    setSearchQuery(query);
    navigation.navigate('SearchResults', { query });
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors['on-surface-variant']} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search artisans, materials..."
            placeholderTextColor={colors['outline']}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            autoFocus
          />
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic-outline" size={20} color={colors['on-surface-variant']} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Recent Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity>
              <Text style={styles.clearText}>CLEAR ALL</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recentList}>
            {recentSearches.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recentItem}
                onPress={() => handleSuggestionPress(item)}
              >
                <View style={styles.recentItemLeft}>
                  <Ionicons name="time-outline" size={20} color={colors['on-surface-variant']} />
                  <Text style={styles.recentText}>{item}</Text>
                </View>
                <Ionicons name="arrow-up-left" size={20} color={colors['surface-container-highest']} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Now */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Now</Text>
          </View>
          
          <View style={styles.chipsContainer}>
            {popularSearches.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.chip}
                onPress={() => handleSuggestionPress(item)}
              >
                <Text style={styles.chipText}>{item}</Text>
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    gap: spacing.stackSm,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['surface-container-low'],
    borderBottomWidth: 1,
    borderBottomColor: colors['clay-outline'],
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: 48,
  },
  searchIcon: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    ...typography.bodyLg,
    color: colors['on-surface'],
    height: '100%',
  },
  micButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  section: {
    marginBottom: spacing.stackLg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-highest'],
    paddingBottom: spacing.stackSm,
    marginBottom: spacing.stackSm,
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors['on-surface'],
  },
  clearText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  recentList: {
    flexDirection: 'column',
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recentText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.stackSm,
    paddingTop: spacing.stackSm,
  },
  chip: {
    backgroundColor: colors['surface-container-low'],
    borderWidth: 1,
    borderColor: colors['surface-container-high'],
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    ...typography.labelMd,
    color: colors['on-surface'],
  },
});
