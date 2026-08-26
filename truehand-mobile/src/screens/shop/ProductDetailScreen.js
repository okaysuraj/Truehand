import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useProductStore } from '../../store/useProductStore';
import { useCartStore } from '../../store/useCartStore';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { productId } = route.params || {};
  const fetchProductById = useProductStore(state => state.fetchProductById);
  const currentProduct = useProductStore(state => state.currentProduct);
  const isLoading = useProductStore(state => state.isLoadingCurrentProduct);
  
  const addToCart = useCartStore(state => state.addToCart);

  React.useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId, fetchProductById]);
  
  const handleAddToCart = () => {
    if (currentProduct) {
      addToCart(currentProduct, 1);
      navigation.navigate('Cart');
    }
  };
  
  if (isLoading || !currentProduct) {
  
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors['forest-green']} />
      </SafeAreaView>
    );
  }

  const product = currentProduct;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>TrueHand</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color={colors['on-surface-variant']} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="bag-handle-outline" size={24} color={colors['on-surface-variant']} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          style={styles.imageScrollContainer}
        >
          <Image 
            source={{ uri: product.imageUrl || 'https://via.placeholder.com/400x500' }}
            style={styles.mainImage}
          />
        </ScrollView>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <TouchableOpacity>
            <Text style={styles.artisanName}>{product.seller?.shopName || 'Unknown Artisan'}</Text>
          </TouchableOpacity>
          <Text style={styles.price}>${product.price}</Text>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Hand-thrown Ceramic</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Made in Italy</Text>
            </View>
          </View>

          <Text style={styles.description}>
            {product.description}
          </Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleAddToCart} disabled={isLoading}>
              <Text style={styles.primaryButtonText}>{isLoading ? 'Loading...' : 'Add to Collection'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="heart-outline" size={18} color={colors.charcoal} />
              <Text style={styles.secondaryButtonText}>Save for Later</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.shippingInfo}>
            <Ionicons name="cube-outline" size={16} color={colors['on-surface-variant']} />
            <Text style={styles.shippingText}>Ships worldwide from Studio Arancia.</Text>
          </View>

          <TouchableOpacity 
            style={styles.reviewsButton} 
            onPress={() => navigation.navigate('RatingsReviews', { productId: product.id })}
          >
            <View style={styles.reviewsHeader}>
              <Text style={styles.reviewsButtonText}>Collector Reviews</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.charcoal} />
            </View>
            <View style={styles.starsRow}>
              <Ionicons name="star" size={16} color={colors.terracotta} />
              <Ionicons name="star" size={16} color={colors.terracotta} />
              <Ionicons name="star" size={16} color={colors.terracotta} />
              <Ionicons name="star" size={16} color={colors.terracotta} />
              <Ionicons name="star-half" size={16} color={colors.terracotta} />
              <Text style={styles.ratingScore}>4.8 (124)</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Deep Dive Sections */}
        <View style={styles.deepDiveContainer}>
          
          {/* Material & Craft */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="color-palette-outline" size={20} color={colors['forest-green']} />
              <Text style={styles.cardTitle}>Material & Craft</Text>
            </View>
            
            <View style={styles.bulletItem}>
              <Ionicons name="ellipse" size={6} color={colors.outline} style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Crafted from high-fire speckled stoneware clay, chosen for its durability and earthy texture.</Text>
            </View>
            <View style={styles.bulletItem}>
              <Ionicons name="ellipse" size={6} color={colors.outline} style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Fired at 1200°C to achieve full vitrification, ensuring the piece is water-tight and food safe.</Text>
            </View>
            <View style={styles.bulletItem}>
              <Ionicons name="ellipse" size={6} color={colors.outline} style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Finished with an in-house formulated ash glaze that interacts uniquely with the kiln's atmosphere.</Text>
            </View>
          </View>

          {/* Maker's Note */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="brush-outline" size={20} color={colors['forest-green']} />
              <Text style={styles.cardTitle}>Maker's Note</Text>
            </View>
            <View style={styles.quoteBlock}>
              <Text style={styles.quoteText}>
                "I wanted to create a form that feels grounding to hold. The slight asymmetry is intentional—a reminder of the human hands that shaped the clay on the wheel, standing in contrast to the perfect uniformity of mass production."
              </Text>
            </View>
            <Text style={styles.quoteAuthor}>— Elena Ricci, Studio Arancia</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
    zIndex: 10,
  },
  iconButton: {
    padding: spacing.stackSm,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    fontSize: 24, // Slightly smaller to fit with 2 right icons
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    paddingBottom: spacing.sectionGap,
  },
  imageScrollContainer: {
    width: width,
    height: width * 1.25, // 4:5 aspect ratio
    backgroundColor: colors['surface-variant'],
  },
  mainImage: {
    width: width,
    height: width * 1.25,
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
  },
  productTitle: {
    ...typography.displayLg,
    fontSize: 32, // smaller for mobile detail
    lineHeight: 36,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
  },
  artisanName: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textDecorationLine: 'underline',
  },
  price: {
    ...typography.labelMd,
    color: colors.charcoal,
    fontSize: 18,
    marginTop: spacing.stackSm,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.stackSm,
    marginVertical: spacing.stackLg,
  },
  badge: {
    backgroundColor: colors['surface-variant'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  description: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    lineHeight: 24,
    marginBottom: spacing.stackLg,
  },
  actionsContainer: {
    gap: spacing.stackMd,
    marginBottom: spacing.stackLg,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingVertical: 16,
    borderRadius: 4,
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  shippingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: spacing.stackLg,
    borderTopWidth: 1,
    borderTopColor: colors['surface-variant'],
  },
  shippingText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  reviewsButton: {
    marginTop: spacing.stackLg,
    paddingTop: spacing.stackLg,
    borderTopWidth: 1,
    borderTopColor: colors['surface-variant'],
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewsButtonText: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingScore: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginLeft: 4,
  },
  deepDiveContainer: {
    paddingHorizontal: spacing.marginMobile,
    marginTop: spacing.sectionGap,
    gap: spacing.stackLg,
  },
  infoCard: {
    backgroundColor: colors['surface-container-low'],
    padding: spacing.gutter,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.stackMd,
  },
  cardTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: spacing.stackSm,
  },
  bulletIcon: {
    marginTop: 8, // align with first line of text
  },
  bulletText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    flex: 1,
  },
  quoteBlock: {
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(22, 52, 40, 0.3)', // forest-green/30
    paddingLeft: 16,
    marginBottom: 8,
  },
  quoteText: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    fontStyle: 'italic',
  },
  quoteAuthor: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
});
