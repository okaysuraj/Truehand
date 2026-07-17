import api from '../services/api';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function SaveForLaterScreen() {
  const navigation = useNavigation();
  
  const [savedItems, setSavedItems] = useState([
    {
      id: '1',
      name: 'Hand-thrown Vase',
      category: 'Ceramics',
      price: '$145.00',
      description: 'Artisan crafted in Kyoto. Unglazed exterior with a waterproof interior lining. Perfect for minimal floral arrangements.',
      image: 'https://via.placeholder.com/400',
      isFeatured: true
    },
    {
      id: '2',
      name: 'Linen Throw',
      category: 'Textiles',
      price: '$85.00',
      description: 'Soft, diffused lighting creates gentle shadows, highlighting the material\'s organic quality.',
      image: 'https://via.placeholder.com/300x400',
      isFeatured: false
    },
    {
      id: '3',
      name: 'Carved Serving Spoon',
      category: 'Woodwork',
      price: '$45.00',
      description: 'The wood grain is rich and prominent, exhibiting a warm walnut tone.',
      image: 'https://via.placeholder.com/300x400',
      isFeatured: false
    }
  ]);

  const removeItem = (id) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setSavedItems([]);
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Page Header */}
        <View style={styles.pageHeaderRow}>
          <View>
            <Text style={styles.pageTitle}>Saved for Later</Text>
            <Text style={styles.pageSubtitle}>{savedItems.length} items waiting for you.</Text>
          </View>
          {savedItems.length > 0 && (
            <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
              <Text style={styles.clearBtnText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {savedItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={48} color={colors['surface-dim']} style={{ marginBottom: spacing.stackMd }} />
            <Text style={styles.emptyTitle}>Nothing saved yet</Text>
            <Text style={styles.emptySubtitle}>Items you save for later will appear here.</Text>
            <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.continueBtnText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.grid}>
            {savedItems.map((item) => {
              if (item.isFeatured) {
                return (
                  <View key={item.id} style={styles.featuredCard}>
                    <View style={styles.featuredImageContainer}>
                      <Image source={{ uri: item.image }} style={styles.imageFull} />
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{item.category}</Text>
                      </View>
                    </View>
                    <View style={styles.featuredInfo}>
                      <View>
                        <View style={styles.featuredHeaderRow}>
                          <Text style={styles.productName}>{item.name}</Text>
                          <TouchableOpacity onPress={() => removeItem(item.id)}>
                            <Ionicons name="close" size={24} color={colors.outline} />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.productDescription}>{item.description}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                      </View>
                      <TouchableOpacity style={styles.moveToCartBtnPrimary}>
                        <Ionicons name="cart-outline" size={18} color={colors.surface} />
                        <Text style={styles.moveToCartTextPrimary}>Move to Cart</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={item.id} style={styles.standardCard}>
                    <View style={styles.standardImageContainer}>
                      <Image source={{ uri: item.image }} style={styles.imageFull} />
                      <TouchableOpacity style={styles.deleteBtn} onPress={() => removeItem(item.id)}>
                        <Ionicons name="trash-outline" size={16} color={colors.outline} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.standardInfo}>
                      <View style={styles.standardTextCenter}>
                        <Text style={styles.productNameSmall}>{item.name}</Text>
                        <Text style={styles.categoryTextSmall}>{item.category}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                      </View>
                      <TouchableOpacity style={styles.moveToCartBtnSecondary}>
                        <Text style={styles.moveToCartTextSecondary}>Move to Cart</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            })}
          </View>
        )}
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
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  pageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-dim'],
    paddingBottom: spacing.stackLg,
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: 4,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors.outline,
  },
  clearBtn: {
    borderWidth: 1,
    borderColor: colors['surface-dim'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  clearBtnText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featuredCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 8,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: spacing.gutter,
    overflow: 'hidden',
  },
  featuredImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors['surface-container-low'],
    position: 'relative',
  },
  imageFull: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors['surface-dim'],
  },
  categoryBadgeText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  featuredInfo: {
    padding: spacing.stackLg,
  },
  featuredHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.stackMd,
  },
  productName: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  productDescription: {
    ...typography.bodyMd,
    color: colors.outline,
    marginBottom: spacing.stackLg,
  },
  productPrice: {
    ...typography.labelMd,
    color: colors.terracotta,
    marginBottom: spacing.stackLg,
  },
  moveToCartBtnPrimary: {
    flexDirection: 'row',
    backgroundColor: colors['forest-green'],
    paddingVertical: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  moveToCartTextPrimary: {
    ...typography.labelMd,
    color: colors.surface,
  },
  standardCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 8,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: spacing.gutter,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  standardImageContainer: {
    width: '100%',
    aspectRatio: 3/4,
    backgroundColor: colors['surface-container-low'],
    position: 'relative',
  },
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  standardInfo: {
    padding: spacing.stackMd,
    flex: 1,
    justifyContent: 'space-between',
  },
  standardTextCenter: {
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  productNameSmall: {
    ...typography.bodyLg,
    color: colors['forest-green'],
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryTextSmall: {
    ...typography.labelSm,
    color: colors.outline,
    marginBottom: 8,
  },
  moveToCartBtnSecondary: {
    borderWidth: 1,
    borderColor: colors['forest-green'],
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveToCartTextSecondary: {
    ...typography.labelSm,
    color: colors['forest-green'],
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  emptySubtitle: {
    ...typography.bodyMd,
    color: colors.outline,
    marginBottom: spacing.stackLg,
    textAlign: 'center',
  },
  continueBtn: {
    backgroundColor: colors['forest-green'],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  continueBtnText: {
    ...typography.labelMd,
    color: colors.surface,
  }
});
