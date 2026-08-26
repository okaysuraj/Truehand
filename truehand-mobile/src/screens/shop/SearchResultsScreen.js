import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useProductStore } from '../../store/useProductStore';

const { width } = Dimensions.get('window');
const numColumns = 2;
const ITEM_WIDTH = (width - spacing.marginMobile * 2 - spacing.stackMd) / numColumns;

export default function SearchResultsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const query = route.params?.query || 'Ceramic Bowls';
  const fetchSearchResults = useProductStore((state) => state.fetchSearchResults);
  const products = useProductStore((state) => state.searchResults);
  const loading = useProductStore((state) => state.isLoadingSearch);

  useEffect(() => {
    fetchSearchResults(query);
  }, [query, fetchSearchResults]);

  const renderHeader = () => (
    <View style={styles.searchHeader}>
      <View>
        <Text style={styles.resultSubtitle}>Showing results for</Text>
        <Text style={styles.resultTitle}>"{query}"</Text>
        <Text style={styles.resultCount}>{products.length} artisan crafted pieces found.</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Filters')}>
          <Ionicons name="options-outline" size={18} color={colors.charcoal} />
          <Text style={styles.actionBtnText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('SortOptions')}>
          <Ionicons name="swap-vertical-outline" size={18} color={colors.charcoal} />
          <Text style={styles.actionBtnText}>Sort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: item.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKbK1Cgb7V_LHn6WtbboaglEOXHFg0k_d9h9i93ygP3qRSveC03wQsu3Ou3b7I9lBi8hrU3isXCmfOXFZxk0WW3FEAJa4PIHpBWhT5ObicAcQNNRPo7AO8PXc9dBQgL9QVdnEbe2gCDz1-_MwmZ5u2bOPMszOPw6CtbSQ3m-9pLUj4NKUVeo-dh2utCsC3JsP9u4l-i6P6KuqA4_PkWJyOj7NtSNSKmrmQ883QkWqPFAw1WK6Mkzk-oA' }} 
          style={styles.productImage} 
        />
        <TouchableOpacity style={styles.favoriteBtn}>
          <Ionicons name="heart-outline" size={20} color={colors.charcoal} />
        </TouchableOpacity>
        {item.category && (
          <View style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>{item.category}</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.artisanName}>by TrueHand Artisan</Text>
        <Text style={styles.productPrice}>${Number(item.price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.brand}>TrueHand</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="bag-handle-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors['forest-green']} />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={numColumns}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={64} color={colors['outline-variant']} />
              <Text style={styles.emptyText}>No products found.</Text>
            </View>
          }
          ListFooterComponent={
            products.length > 0 ? (
              <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.loadMoreBtn}>
                  <Text style={styles.loadMoreText}>Load More Pieces</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
  },
  brand: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  iconButton: {
    padding: spacing.stackSm,
  },
  listContent: {
    paddingBottom: spacing.sectionGap,
  },
  searchHeader: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.stackMd,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
    marginBottom: spacing.stackLg,
    flexDirection: 'column',
    gap: spacing.stackMd,
  },
  resultSubtitle: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 4,
  },
  resultTitle: {
    ...typography.headlineLgMobile,
    color: colors.primary,
  },
  resultCount: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
  },
  actionBtnText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
  },
  productCard: {
    width: ITEM_WIDTH,
    marginBottom: spacing.stackLg,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 4/5,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 4,
    marginBottom: spacing.stackSm,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
  categoryChip: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryChipText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  productInfo: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  productName: {
    ...typography.bodyMd,
    color: colors['on-surface'],
    textAlign: 'center',
  },
  artisanName: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 4,
    textAlign: 'center',
  },
  productPrice: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    marginTop: 10,
  },
  footerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.stackLg,
  },
  loadMoreBtn: {
    backgroundColor: colors['forest-green'],
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 4,
  },
  loadMoreText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  }
});
