import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const numColumns = 2;
const ITEM_WIDTH = (width - 45) / numColumns; // adjusting for side padding and gap

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      // Take only the first 4 for 'New Arrivals'
      setProducts((res.data.content || res.data).slice(0, 4));
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Image 
          source={{uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070'}} 
          style={styles.heroImage} 
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Handmade with Intention</Text>
          <Text style={styles.heroSubtitle}>
            Discover curated pieces from independent makers, crafted with care and designed to bring warmth and authenticity into your space.
          </Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>Explore the Collection</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Curated Categories */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Curated Categories</Text>
        <Text style={styles.sectionSubtitle}>Explore by material and discipline</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <View style={styles.categoryCard}>
            <Image source={{uri: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800'}} style={styles.categoryImg} />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryName}>Ceramics</Text>
              <View style={styles.categoryChip}><Text style={styles.categoryChipText}>Earthy Textures</Text></View>
            </View>
          </View>
          
          <View style={styles.categoryCard}>
            <Image source={{uri: 'https://images.unsplash.com/photo-1528340155208-25176161aa52?auto=format&fit=crop&q=80&w=800'}} style={styles.categoryImg} />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryName}>Textiles</Text>
              <View style={styles.categoryChip}><Text style={styles.categoryChipText}>Woven Comfort</Text></View>
            </View>
          </View>

          <View style={styles.categoryCard}>
            <Image source={{uri: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'}} style={styles.categoryImg} />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryName}>Jewelry</Text>
              <View style={styles.categoryChip}><Text style={styles.categoryChipText}>Fine Details</Text></View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* The Human Touch */}
      <View style={styles.humanTouchContainer}>
        <Ionicons name="leaf-outline" size={32} color="#4A4A4A" style={{marginBottom: 10}} />
        <Text style={styles.humanTouchTitle}>The Human Touch</Text>
        <Text style={styles.humanTouchText}>
          In a world of mass production, we champion the slow, the deliberate, and the beautifully imperfect. Every piece on TrueHand carries the story of its maker—a testament to skill, patience, and the enduring value of human craftsmanship.
        </Text>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Read Our Story</Text>
        </TouchableOpacity>
      </View>

      {/* New Arrivals Header */}
      <View style={[styles.sectionContainer, { paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <Text style={styles.viewAllText}>View All &rarr;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>${Number(item.price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>TrueHand</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6', 
  },
  header: {
    backgroundColor: '#FAF9F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  logo: {
    color: '#333',
    fontSize: 22,
    fontWeight: 'bold',
  },
  heroContainer: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 25,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 15,
    lineHeight: 40,
  },
  heroSubtitle: {
    color: '#f8f8f8',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  heroBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FAF9F6',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  categoryScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  categoryCard: {
    width: 250,
    height: 320,
    marginRight: 15,
    position: 'relative',
  },
  categoryImg: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  categoryName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryChip: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  categoryChipText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  humanTouchContainer: {
    backgroundColor: '#EAE5D9',
    padding: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  humanTouchTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  humanTouchText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 30,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  secondaryBtnText: {
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  viewAllText: {
    color: '#555',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  productCard: {
    backgroundColor: '#fff',
    width: ITEM_WIDTH,
    marginBottom: 15,
  },
  productImage: {
    width: '100%',
    height: ITEM_WIDTH * 1.25,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 14,
    color: '#777',
  },
});
