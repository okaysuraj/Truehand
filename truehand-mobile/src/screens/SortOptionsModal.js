import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const OPTIONS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
];

export default function SortOptionsModal() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('relevance');

  const handleSelect = (id) => {
    setSelected(id);
    // In a real app, we'd apply sorting logic or pass it back via navigation.navigate/params
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const renderItem = ({ item }) => {
    const isSelected = selected === item.id;
    return (
      <TouchableOpacity 
        style={styles.optionRow} 
        onPress={() => handleSelect(item.id)}
      >
        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
          {item.label}
        </Text>
        {isSelected && <Ionicons name="checkmark" size={24} color={colors['forest-green']} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sort By</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <FlatList
          data={OPTIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container'],
  },
  closeButton: {
    padding: spacing.stackSm,
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingTop: spacing.stackLg,
  },
  listContent: {
    paddingHorizontal: spacing.marginMobile,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.stackMd,
    paddingHorizontal: spacing.stackSm,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container-high'],
    borderRadius: 4,
  },
  optionText: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  optionTextSelected: {
    color: colors.charcoal,
    fontWeight: '500',
  },
});
