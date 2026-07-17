import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { productService } from '../services/productService';

export default function TrendingProductsScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      const res = await productService.getAllProducts();
      setProducts(res); // Mocking trending products
    } catch (err) {
      console.error('Failed to fetch trending products', err);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item, index }) => {
    // To simulate masonry, we can alternate aspect ratios
    const isTall = index % 3 === 0;
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

    return (
      <TouchableOpacity 
        style={styles.cardContainer} 
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      >
        <View style={[styles.imageContainer, { aspectRatio: isTall ? 0.75 : 1 }]}>
          <Image 
            source={{ uri: item.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9a7bR5NxVjSoX1Sl6tupxtO3Rxd8-NxNkt9fFH_zT-beGdEdB4n7GC3FghNk4OoBZBojX102CHyy0Pioxiqa_z4BX-rqjEiGS0JBwTBA-bJsf72D3P3MfJWlQ7KgdVXHaLoFqDQt2_rpjoDkgoLBQoUbjR9IGq1WqZCWsm1Epq6FbZZqMIEK77GoGaU9b9TVAGAZERfXiAbeE_1jf6ZR_Xh9a_qjicH0hGieIXu9ISsrUU1ltuKG7g' }} 
            style={styles.productImage} 
          />
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{item.category || 'Handcrafted'}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.artisanName}>by {item.sellerId ? `Artisan ${item.sellerId}` : 'Elena Rostova'}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.charcoal} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color={colors.charcoal} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.title}>Trending Now</Text>
            <Text style={styles.subtitle}>Curated works gaining attention. Authentic materials, masterfully crafted.</Text>
          </View>
          <View style={styles.sortRow}>
            <Text style={styles.sortLabel}>SORT BY:</Text>
            <TouchableOpacity style={styles.sortBtnActive}>
              <Text style={styles.sortBtnTextActive}>Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortBtn}>
              <Text style={styles.sortBtnText}>Popular</Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors['forest-green']} style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, borderBottomWidth: 1, borderBottomColor: colors['surface-container'] },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'], fontWeight: '700' },
  content: { flex: 1 },
  headerSection: { padding: spacing.marginMobile, paddingBottom: spacing.stackSm },
  title: { ...typography.displayLg, color: colors['forest-green'], marginBottom: 8, fontSize: 36 },
  subtitle: { ...typography.bodyMd, color: colors['on-surface-variant'], marginBottom: 16 },
  sortRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sortLabel: { ...typography.labelSm, color: colors.outline, letterSpacing: 1, marginRight: 8 },
  sortBtnActive: { backgroundColor: colors['surface-container'], paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  sortBtnTextActive: { ...typography.labelSm, color: colors['forest-green'] },
  sortBtn: { backgroundColor: 'transparent', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors['clay-outline'] },
  sortBtnText: { ...typography.labelSm, color: colors.charcoal },
  
  listContent: { paddingHorizontal: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  row: { justifyContent: 'space-between' },
  cardContainer: { width: '48%', marginBottom: spacing.stackLg },
  imageContainer: { width: '100%', backgroundColor: colors['surface-container-low'], borderRadius: 8, overflow: 'hidden', marginBottom: 12 },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  tagBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(252,249,248,0.9)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4 },
  tagText: { ...typography.labelSm, color: colors.charcoal },
  textContainer: { alignItems: 'center' },
  productName: { ...typography.bodyMd, color: colors.charcoal, marginBottom: 4, textAlign: 'center' },
  artisanName: { ...typography.labelSm, color: colors['on-surface-variant'], marginBottom: 4 },
  price: { ...typography.labelMd, color: colors['forest-green'] }
});
