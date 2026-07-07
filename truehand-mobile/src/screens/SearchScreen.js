import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const numColumns = 2;
const ITEM_WIDTH = (width - 30) / numColumns;

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
    // useEffect will trigger a fetch
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>${Number(item.price).toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#f0c14b" />
          <Text style={styles.ratingText}> {item.averageRating ? item.averageRating.toFixed(1) : 'New'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#555" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search TrueHand..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(''); handleSearch(); }}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="options" size={24} color="#0f1111" />
        </TouchableOpacity>
      </View>

      {/* Active Filters Display */}
      {category ? (
        <View style={styles.activeFilters}>
          <View style={styles.activeChip}>
            <Text style={styles.activeChipText}>{category}</Text>
            <TouchableOpacity onPress={() => setCategory('')}>
              <Ionicons name="close" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007185" />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={64} color="#ccc" />
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
              <Ionicons name="close" size={28} color="#0f1111" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            
            <Text style={styles.filterLabel}>Category</Text>
            <View style={styles.chipContainer}>
              {categories.map(c => (
                <TouchableOpacity 
                  key={c} 
                  style={[styles.chip, category === c && styles.chipActive]}
                  onPress={() => setCategory(category === c ? '' : c)}
                >
                  <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>Price Range ($)</Text>
            <View style={styles.priceContainer}>
              <TextInput 
                style={styles.priceInput} 
                placeholder="Min" 
                keyboardType="numeric" 
                value={minPrice} 
                onChangeText={setMinPrice} 
              />
              <Text style={styles.priceDash}>-</Text>
              <TextInput 
                style={styles.priceInput} 
                placeholder="Max" 
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
                  style={[styles.chip, minRating === r && styles.chipActive]}
                  onPress={() => setMinRating(minRating === r ? 0 : r)}
                >
                  <Text style={[styles.chipText, minRating === r && styles.chipTextActive]}>{r} & Up</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterLabel}>Sort By</Text>
            <View style={styles.chipContainer}>
              {sortOptions.map(opt => (
                <TouchableOpacity 
                  key={opt.value} 
                  style={[styles.chip, sortBy === opt.value && styles.chipActive]}
                  onPress={() => setSortBy(opt.value)}
                >
                  <Text style={[styles.chipText, sortBy === opt.value && styles.chipTextActive]}>{opt.label}</Text>
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
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50, // Top margin for notch without Safe Area view (if needed)
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f2',
    borderWidth: 1,
    borderColor: '#d5d9d9',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f1111',
  },
  filterBtn: {
    marginLeft: 15,
    padding: 5,
  },
  activeFilters: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#eaeded',
  },
  activeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007185',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeChipText: {
    color: '#fff',
    marginRight: 5,
    fontSize: 12,
  },
  listContent: {
    padding: 10,
    paddingBottom: 30,
    backgroundColor: '#eaeded',
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    width: ITEM_WIDTH,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {
    width: '100%',
    height: ITEM_WIDTH,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    color: '#0f1111',
    marginBottom: 5,
    height: 38,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B12704',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#007185',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  // Modal styles
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f1111',
    marginTop: 15,
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: '#d5d9d9',
    backgroundColor: '#f0f2f2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: {
    backgroundColor: '#007185',
    borderColor: '#007185',
  },
  chipText: {
    color: '#0f1111',
  },
  chipTextActive: {
    color: '#fff',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  priceDash: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  clearBtn: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d5d9d9',
    borderRadius: 8,
    marginRight: 10,
  },
  clearBtnText: {
    color: '#0f1111',
    fontWeight: 'bold',
  },
  applyBtn: {
    flex: 2,
    backgroundColor: '#FFD814',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#0f1111',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
