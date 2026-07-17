import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Switch } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { useArtisanStore } from '../store/useArtisanStore';
import { useAuthStore } from '../store/useAuthStore';

export default function InventoryManagementScreen() {
  const navigation = useNavigation();
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useAuthStore();
  const products = useArtisanStore(state => state.products);
  const fetchProducts = useArtisanStore(state => state.fetchProducts);
  const updateProduct = useArtisanStore(state => state.updateProduct);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(product => {
    if (lowStockOnly && product.stockQuantity > 5) return false;
    if (searchQuery && !product.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleStockChange = async (product, change) => {
    const newStock = Math.max(0, (product.stockQuantity || 0) + change);
    try {
      await updateProduct(product.id, { ...product, stockQuantity: newStock });
    } catch (e) {
      console.error(e);
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artisan Studio</Text>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjRLE8aM-Nnyb9joNhwCbB740dFT0wMVddKy5L2jC60c6yepPsPVR0EJWptptZfxc2COc02iFc7gVrTeHCBtwbhg4sjCSyivZmVTxTCiM7jB_ri50FlYYFBoKa2BrKE-JzyHNn6qOsEJggSLjNLPQnpxMbTaOizkX0MhkhZvtC2CgZnottWsl-oF12DcPQc2FXOeUfuYU2xRE5jt90LOirkWxQdRiWwbLPQZ6UB6-PEGXYbbYPfP5VdQ' }} 
            style={styles.avatarImage} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header & Controls */}
        <View style={styles.controlsSection}>
          <View style={styles.titleArea}>
            <Text style={styles.pageTitle}>Inventory Management</Text>
            <Text style={styles.pageSubtitle}>Rapid stock adjustments and tracking.</Text>
          </View>

          <View style={styles.searchFilterRow}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color={colors.outline} style={styles.searchIcon} />
              <TextInput 
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor={colors['outline-variant']}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>Low Stock Only</Text>
              <Switch 
                value={lowStockOnly}
                onValueChange={setLowStockOnly}
                trackColor={{ false: colors['surface-variant'], true: colors['primary-fixed'] }}
                thumbColor={lowStockOnly ? colors['forest-green'] : colors.surface}
              />
            </View>
          </View>
        </View>

        {/* Inventory List */}
        <View style={styles.inventoryList}>
          {filteredProducts.map(product => {
            const isLowStock = product.stockQuantity <= 5;
            return (
              <View key={product.id} style={[styles.itemCard, isLowStock && styles.itemCardError]}>
                <View style={styles.itemCardTop}>
                  <Image 
                    source={{ uri: product.imageUrl || 'https://via.placeholder.com/64' }}
                    style={styles.itemImg}
                  />
                  <View style={styles.itemInfo}>
                    <View style={styles.itemRow1}>
                      <Text style={styles.itemName} numberOfLines={1}>{product.name}</Text>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{product.category || 'Product'}</Text>
                      </View>
                    </View>
                    <Text style={styles.itemSku}>SKU: {product.sku || product.id}</Text>
                  </View>
                </View>
                <View style={styles.itemCardBottom}>
                  {isLowStock ? (
                    <View style={styles.lowStockWarning}>
                      <Ionicons name="warning" size={16} color={colors.error} />
                      <Text style={styles.lowStockText}>Low Stock</Text>
                    </View>
                  ) : (
                    <Text style={styles.stockLabelText}>Stock Level</Text>
                  )}
                  <View style={[styles.stockControls, isLowStock && styles.stockControlsError]}>
                    <TouchableOpacity style={styles.stockBtn} onPress={() => handleStockChange(product, -1)}>
                      <Ionicons name="remove" size={18} color={colors['on-surface-variant']} />
                    </TouchableOpacity>
                    <Text style={[styles.stockValueText, isLowStock && { color: colors.error }]}>
                      {product.stockQuantity || 0}
                    </Text>
                    <TouchableOpacity style={styles.stockBtn} onPress={() => handleStockChange(product, 1)}>
                      <Ionicons name="add" size={18} color={colors['on-surface-variant']} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
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
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    backgroundColor: colors['surface-container'],
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  controlsSection: {
    marginBottom: spacing.stackLg,
  },
  titleArea: {
    marginBottom: spacing.stackMd,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: 4,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  searchFilterRow: {
    flexDirection: 'column',
    gap: spacing.stackSm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['surface-container-lowest'],
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    ...typography.labelMd,
    color: colors.charcoal,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors['surface-container'],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  toggleText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  inventoryList: {
    gap: spacing.gutter,
  },
  itemCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackMd,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    gap: spacing.stackMd,
  },
  itemCardError: {
    backgroundColor: 'rgba(255, 218, 214, 0.2)', // error-container/20
    borderColor: 'rgba(186, 26, 26, 0.3)', // error/30
  },
  itemCardTop: {
    flexDirection: 'row',
    gap: spacing.stackMd,
    alignItems: 'center',
  },
  itemImg: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: colors['surface-container'],
  },
  itemInfo: {
    flex: 1,
  },
  itemRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemName: {
    ...typography.labelMd,
    color: colors.charcoal,
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: colors['surface-container'],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryBadgeText: {
    ...typography.labelSm,
    color: colors.outline,
    fontSize: 10,
  },
  itemSku: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  itemCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors['surface-variant'],
    paddingTop: spacing.stackMd,
  },
  stockLabelText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  stockControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['surface-container'],
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
  },
  stockControlsError: {
    borderColor: 'rgba(186, 26, 26, 0.2)', // error/20
  },
  stockBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  stockValueText: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors['forest-green'],
    width: 32,
    textAlign: 'center',
  },
  lowStockWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lowStockText: {
    ...typography.labelSm,
    color: colors.error,
    fontWeight: '600',
  },
});
