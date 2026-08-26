import api from '../../services/api';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const { width } = Dimensions.get('window');

const COMPARE_PRODUCTS = [
  {
    id: '1',
    name: 'Hand-thrown Stoneware Bowl',
    price: '$85.00',
    artisan: 'Elena Rossi Studio',
    material: 'Speckled Stoneware Clay',
    dimensions: '8" W x 3.5" H',
    finish: 'Matte Oat Glaze',
    care: 'Hand wash recommended. Microwave safe. Not oven safe.',
    image: 'https://via.placeholder.com/300',
    isPrimary: true
  },
  {
    id: '2',
    name: 'Porcelain Noodle Bowl',
    price: '$92.00',
    artisan: 'Koji Ceramics',
    material: 'High-fire Porcelain',
    dimensions: '7.5" W x 4" H',
    finish: 'Gloss Clear Glaze',
    care: 'Dishwasher safe. Microwave safe. Handle with care due to thin walls.',
    image: 'https://via.placeholder.com/300',
    isPrimary: false
  },
  {
    id: '3',
    name: 'Rustic Terracotta Server',
    price: '$75.00',
    artisan: 'Earth & Fire Guild',
    material: 'Red Earthenware',
    dimensions: '9.5" W x 2.5" H',
    finish: 'Unglazed Exterior, Gloss Interior',
    care: 'Hand wash only. Dry completely before storing. May patinate over time.',
    image: 'https://via.placeholder.com/300',
    isPrimary: false
  }
];

export default function CompareProductsScreen() {
  const navigation = useNavigation();
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Compare</Text>
        
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Ceramic Bowls</Text>
          <Text style={styles.pageSubtitle}>
            Comparing your selected handcrafted pieces to find the perfect addition to your home.
          </Text>
        </View>

        <View style={styles.swipeHint}>
          <Text style={styles.swipeHintText}>Swipe to compare</Text>
          <Ionicons name="arrow-forward" size={16} color={colors['on-surface-variant']} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {COMPARE_PRODUCTS.map((product) => (
            <View key={product.id} style={styles.productCol}>
              <TouchableOpacity style={styles.removeBtn}>
                <Ionicons name="close" size={18} color={colors['on-surface-variant']} />
              </TouchableOpacity>

              <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.image} />
                {product.isPrimary && (
                  <View style={styles.primaryBadge}>
                    <Ionicons name="star" size={12} color={colors['forest-green']} />
                    <Text style={styles.primaryBadgeText}>Primary Choice</Text>
                  </View>
                )}
              </View>

              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>

              {/* Specs */}
              <View style={styles.specGroup}>
                <Text style={styles.specLabel}>Price</Text>
                <Text style={styles.specValuePrice}>{product.price}</Text>
              </View>

              <View style={styles.specGroup}>
                <Text style={styles.specLabel}>Artisan</Text>
                <Text style={styles.specValue}>{product.artisan}</Text>
              </View>

              <View style={styles.specGroup}>
                <Text style={styles.specLabel}>Material</Text>
                <Text style={styles.specValue}>{product.material}</Text>
              </View>

              <View style={styles.specGroup}>
                <Text style={styles.specLabel}>Dimensions</Text>
                <Text style={styles.specValue}>{product.dimensions}</Text>
              </View>

              <View style={styles.specGroup}>
                <Text style={styles.specLabel}>Finish</Text>
                <Text style={styles.specValue}>{product.finish}</Text>
              </View>

              <View style={styles.specGroup}>
                <Text style={styles.specLabel}>Care</Text>
                <Text style={[styles.specValue, { height: 'auto', paddingVertical: 12 }]}>{product.care}</Text>
              </View>

              <TouchableOpacity style={[styles.addToCartBtn, product.isPrimary ? styles.btnPrimary : styles.btnSecondary]}>
                <Text style={[styles.addToCartText, product.isPrimary ? styles.textPrimary : styles.textSecondary]}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22, 52, 40, 0.05)',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  cartButton: {
    padding: 8,
    marginRight: -8,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
  },
  content: {
    paddingBottom: spacing.sectionGap,
  },
  pageHeader: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    marginBottom: spacing.stackMd,
  },
  pageTitle: {
    ...typography.displayLg,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.marginMobile,
    marginBottom: spacing.stackSm,
  },
  swipeHintText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginRight: 4,
  },
  horizontalScroll: {
    paddingHorizontal: spacing.marginMobile,
    gap: spacing.gutter,
  },
  productCol: {
    width: 260,
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: spacing.stackSm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  primaryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    gap: 4,
  },
  primaryBadgeText: {
    ...typography.labelSm,
    color: colors['forest-green'],
  },
  productName: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    marginBottom: spacing.stackMd,
    height: 60,
  },
  specGroup: {
    marginBottom: 0,
  },
  specLabel: {
    ...typography.labelSm,
    color: colors['clay-outline'],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: spacing.stackSm,
    marginBottom: 4,
  },
  specValue: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
    height: 48,
    textAlignVertical: 'center',
  },
  specValuePrice: {
    ...typography.labelMd,
    color: colors['on-surface'],
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
    height: 48,
    textAlignVertical: 'center',
  },
  addToCartBtn: {
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.stackLg,
  },
  btnPrimary: {
    backgroundColor: colors['forest-green'],
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.charcoal,
  },
  textPrimary: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  textSecondary: {
    ...typography.labelMd,
    color: colors.charcoal,
  }
});
