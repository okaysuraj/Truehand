import api from '../services/api';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useProductStore } from '../store/useProductStore';
import { colors, typography, spacing } from '../theme/theme';

const { width } = Dimensions.get('window');

export default function HomeFeedScreen() {
  const navigation = useNavigation();

  const fetchTrendingProducts = useProductStore((state) => state.fetchTrendingProducts);
  const trendingProducts = useProductStore((state) => state.trendingProducts);
  const isLoading = useProductStore((state) => state.isLoadingTrending);
  const error = useProductStore((state) => state.errorTrending);

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const categories = [
    { id: 'c1', name: 'Stonework', image: 'https://via.placeholder.com/600x400', isLarge: true },
    { id: 'c2', name: 'Textiles', image: 'https://via.placeholder.com/300x400', isLarge: false },
    { id: 'c3', name: 'Glass', image: 'https://via.placeholder.com/300x400', isLarge: false },
    { id: 'c4', name: 'Ceramics', image: 'https://via.placeholder.com/600x400', isLarge: true },
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>TrueHand</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={24} color={colors['forest-green']} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Hero Story Section */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/800x1200' }} 
            style={styles.heroImage} 
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Featured Artisan</Text>
            </View>
            <Text style={styles.heroTitle}>The Art of Wabi-Sabi</Text>
            <Text style={styles.heroSubtitle}>
              Discover the imperfect beauty of hand-thrown ceramics by master potter Elena Rostova.
            </Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Read the Story</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* New Arrivals (Trending) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="arrow-forward" size={16} color={colors['outline']} />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color={colors['forest-green']} style={{ marginTop: 20 }} />
          ) : error ? (
            <Text style={{ textAlign: 'center', color: colors.error }}>Failed to load products.</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              {trendingProducts?.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.productCard}
                  onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
                >
                  <View style={styles.productImageContainer}>
                    <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/300x400' }} style={styles.productImage} />
                    <TouchableOpacity style={styles.favoriteBtn}>
                      <Ionicons name="heart-outline" size={20} color={colors['forest-green']} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Shop by Discipline */}
        <View style={[styles.section, { paddingHorizontal: spacing.marginMobile }]}>
          <Text style={[styles.sectionTitle, { textAlign: 'center', marginBottom: spacing.stackLg }]}>
            Shop by Discipline
          </Text>
          
          <View style={styles.gridContainer}>
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat.id} 
                style={[styles.categoryCard, cat.isLarge ? styles.categoryCardLarge : styles.categoryCardSmall]}
              >
                <Image source={{ uri: cat.image }} style={styles.categoryImage} />
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryName}>{cat.name}</Text>
                  <Text style={styles.categoryAction}>Explore <Ionicons name="arrow-forward" size={12} /></Text>
                </View>
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
    backgroundColor: colors['surface-linen'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22, 52, 40, 0.05)',
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -8,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: -1,
  },
  content: {
    paddingBottom: spacing.sectionGap,
  },
  heroContainer: {
    height: 530,
    marginHorizontal: spacing.marginMobile,
    marginTop: spacing.stackLg,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.sectionGap,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.gutter,
    backgroundColor: 'rgba(27, 28, 28, 0.4)',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(246, 243, 242, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: spacing.stackSm,
  },
  heroBadgeText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  heroTitle: {
    ...typography.displayLg,
    color: colors['on-primary'],
    marginBottom: spacing.stackSm,
  },
  heroSubtitle: {
    ...typography.bodyLg,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.stackMd,
  },
  heroButton: {
    backgroundColor: colors['primary-container'],
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  heroButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  section: {
    marginBottom: spacing.sectionGap,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.marginMobile,
    marginBottom: spacing.stackLg,
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    ...typography.labelMd,
    color: colors.outline,
  },
  horizontalScroll: {
    paddingHorizontal: spacing.marginMobile,
    gap: spacing.gutter,
  },
  productCard: {
    width: 280,
  },
  productImageContainer: {
    aspectRatio: 3/4,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 8,
    marginBottom: spacing.stackSm,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    ...typography.bodyMd,
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    ...typography.labelMd,
    color: colors.outline,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  categoryCard: {
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  categoryCardLarge: {
    width: '100%',
  },
  categoryCardSmall: {
    width: (width - spacing.marginMobile * 2 - 16) / 2,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  categoryOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.stackMd,
    backgroundColor: 'rgba(27, 28, 28, 0.25)',
  },
  categoryName: {
    ...typography.headlineMd,
    color: colors['on-primary'],
  },
  categoryAction: {
    ...typography.labelSm,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  }
});
