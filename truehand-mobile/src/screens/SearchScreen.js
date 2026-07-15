import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator, Modal, Dimensions } from 'react-native';;
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme/theme';

const { width } = Dimensions.get('window');
const numColumns = 2;
const ITEM_WIDTH = (width - spacing.marginMobile * 2 - spacing.stackMd) / numColumns;

export default function SearchScreen() {
  const navigation = useNavigation();

  // Search State
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter State
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating_desc');

  const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Toys'];
  const sortOptions = [
    { label: 'Highest Rated', value: 'rating_desc' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length === 0 || query.length >= 2) {
        fetchFilteredProducts();
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query, category, minRating, sortBy]);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (query) params.query = query;
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (minRating > 0) params.minRating = minRating;
      if (sortBy) params.sortBy = sortBy;

      const res = await api.get('/products/filter', { params });
      setProducts(res.data.content || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchFilteredProducts();
  };

  const applyFilters = () => {
    setFilterModalVisible(false);
    fetchFilteredProducts();
  };

  const clearFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setSortBy('rating_desc');
  };

  const renderHeader = () => (
    <View style={styles.searchHeader}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.outline} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Curation..."
          placeholderTextColor={colors['outline-variant']}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(''); handleSearch(); }}>
            <Ionicons name="close-circle" size={20} color={colors.outline} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.resultInfoContainer}>
        <View style={styles.resultTextContainer}>
          {query ? (
            <>
              <Text style={styles.resultSubtitle}>Showing results for</Text>
              <Text style={styles.resultTitle}>"{query}"</Text>
              <Text style={styles.resultCount}>{products.length} artisan crafted pieces found.</Text>
            </>
          ) : (
            <Text style={styles.resultTitle}>Explore</Text>
          )}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="options-outline" size={18} color={colors.charcoal} />
            <Text style={styles.actionBtnText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="swap-vertical-outline" size={18} color={colors.charcoal} />
            <Text style={styles.actionBtnText}>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Active Filters Display */}
      {category ? (
        <View style={styles.activeFilters}>
          <View style={styles.activeChip}>
            <Text style={styles.activeChipText}>{category}</Text>
            <TouchableOpacity onPress={() => setCategory('')}>
              <Ionicons name="close" size={16} color={colors['on-primary']} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
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
          <Ionicons name="heart-outline" size={20} color={colors['on-surface']} />
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
          <Ionicons name="cart-outline" size={24} color={colors['forest-green']} />
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
        />
      )}

      {/* Filter Modal */}
      <Modal visible={filterModalVisible} animationType="slide">
        <SafeAreaView style={styles.modalSafeArea}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Ionicons name="close" size={28} color={colors.charcoal} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <Text style={styles.filterLabel}>Category</Text>
            <View style={styles.chipContainer}>
              {categories.map(c => (
                <TouchableOpacity 
                  key={c} 
                  style={[styles.filterChip, category === c && styles.filterChipActive]}
                  onPress={() => setCategory(category === c ? '' : c)}
                >
                  <Text style={[styles.filterChipText, category === c && styles.filterChipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>Price Range ($)</Text>
            <View style={styles.priceContainer}>
              <TextInput 
                style={styles.priceInput} 
                placeholder="Min" 
                placeholderTextColor={colors.outline}
                keyboardType="numeric" 
                value={minPrice} 
                onChangeText={setMinPrice} 
              />
              <Text style={styles.priceDash}>-</Text>
              <TextInput 
                style={styles.priceInput} 
                placeholder="Max" 
                placeholderTextColor={colors.outline}
                keyboardType="numeric" 
                value={maxPrice} 
                onChangeText={setMaxPrice} 
              />
            </View>

            <Text style={styles.filterLabel}>Minimum Rating</Text>
            <View style={styles.chipContainer}>
              {[4, 3, 2, 1].map(r => (
                <TouchableOpacity 
                  key={r} 
                  style={[styles.filterChip, minRating === r && styles.filterChipActive]}
                  onPress={() => setMinRating(minRating === r ? 0 : r)}
                >
                  <Text style={[styles.filterChipText, minRating === r && styles.filterChipTextActive]}>{r} & Up</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.clearBtn} onPress={clearFilters}>
              <Text style={styles.clearBtnText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
              <Text style={styles.applyBtnText}>Show Results</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

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
    ...typography.headlineLgMobile,
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
    paddingTop: spacing.stackMd,
    paddingBottom: spacing.stackMd,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
    marginBottom: spacing.stackLg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: spacing.stackLg,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  resultInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  resultTextContainer: {
    flex: 1,
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
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
  },
  actionBtnText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  activeFilters: {
    flexDirection: 'row',
    marginTop: spacing.stackMd,
  },
  activeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['forest-green'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  activeChipText: {
    ...typography.labelSm,
    color: colors['on-primary'],
    marginRight: 8,
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
  },
  productName: {
    ...typography.bodyMd,
    color: colors['on-surface'],
  },
  artisanName: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginBottom: 4,
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
  // Modal styles
  modalSafeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
  },
  modalTitle: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  filterLabel: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginTop: 20,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
  },
  filterChipActive: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
  },
  filterChipText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  filterChipTextActive: {
    color: colors['on-primary'],
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
    padding: 12,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  priceDash: {
    ...typography.bodyLg,
    color: colors.charcoal,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors['surface-variant'],
    gap: 12,
  },
  clearBtn: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
  },
  clearBtnText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  applyBtn: {
    flex: 2,
    backgroundColor: colors['forest-green'],
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  applyBtnText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  }
});
