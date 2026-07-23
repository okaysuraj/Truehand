import api from '../../services/api';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

export default function SponsoredProductsScreen() {
  const navigation = useNavigation();

  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Hand-thrown Ceramic Vase',
      sku: 'CV-001',
      isFeatured: true,
      impressions: '5,230',
      adRank: '1.2',
      rankUp: true,
      sponsored: true,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      name: 'Walnut Serving Board',
      sku: 'WB-042',
      isFeatured: false,
      impressions: '124',
      adRank: '--',
      rankUp: false,
      sponsored: false,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '3',
      name: 'Forged Carbon Steel Knife',
      sku: 'KN-011',
      isFeatured: true,
      impressions: '3,105',
      adRank: '3.4',
      rankUp: true,
      sponsored: true,
      image: 'https://via.placeholder.com/150'
    }
  ]);

  const toggleSponsorship = (id) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { ...p, sponsored: !p.sponsored };
      }
      return p;
    }));
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/32' }} 
            style={styles.avatar} 
          />
          <Text style={styles.headerTitle}>Artisan Studio</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.introSection}>
          <Text style={styles.pageTitle}>Sponsored Products</Text>
          <Text style={styles.pageSubtitle}>
            Boost visibility for your handcrafted pieces. Select items to feature prominently in TrueHand search results and track their performance.
          </Text>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Active Campaigns</Text>
            <Text style={[styles.metricValue, { color: colors['forest-green'] }]}>3</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Impressions</Text>
            <Text style={styles.metricValue}>12.4k</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Clicks</Text>
            <Text style={styles.metricValue}>842</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Avg. Ad Rank</Text>
            <Text style={[styles.metricValue, { color: colors['forest-green'] }]}>2.1</Text>
          </View>
        </View>

        {/* Product List */}
        <View style={styles.productList}>
          {products.map((product) => (
            <View 
              key={product.id} 
              style={[
                styles.productCard, 
                product.sponsored && styles.productCardActive,
                !product.sponsored && { opacity: 0.8 }
              ]}
            >
              <View style={styles.productInfoRow}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productSku}>SKU: {product.sku}</Text>
                  {product.isFeatured && (
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredText}>Featured</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Impressions</Text>
                  <Text style={styles.statValue}>{product.impressions}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Ad Rank</Text>
                  <View style={styles.rankRow}>
                    {product.rankUp && <Ionicons name="arrow-up" size={12} color={colors['forest-green']} />}
                    <Text style={[styles.statValue, product.rankUp && { color: colors['forest-green'] }]}>
                      {product.adRank}
                    </Text>
                  </View>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Boost Item</Text>
                  <Switch 
                    value={product.sponsored}
                    onValueChange={() => toggleSponsorship(product.id)}
                    trackColor={{ false: colors['surface-container-high'], true: colors['forest-green'] }}
                    thumbColor={colors.surface}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

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
    borderBottomColor: colors['surface-container-highest'],
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors['surface-container-highest'],
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
  introSection: {
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.stackSm,
    marginBottom: spacing.stackLg,
  },
  metricCard: {
    width: '48%',
    backgroundColor: colors['surface-container-lowest'],
    padding: spacing.stackMd,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors['surface-container'],
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  metricLabel: {
    ...typography.labelSm,
    color: colors['clay-outline'],
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  metricValue: {
    ...typography.headlineLg,
    color: colors.charcoal,
  },
  productList: {
    gap: spacing.stackMd,
  },
  productCard: {
    backgroundColor: colors['surface-container-lowest'],
    padding: spacing.stackMd,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors['surface-container'],
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  productCardActive: {
    borderLeftWidth: 4,
    borderLeftColor: colors['forest-green'],
  },
  productInfoRow: {
    flexDirection: 'row',
    gap: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: colors['surface-container-low'],
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    ...typography.bodyMd,
    color: colors.charcoal,
    fontWeight: '500',
  },
  productSku: {
    ...typography.labelSm,
    color: colors['clay-outline'],
    marginTop: 2,
  },
  featuredBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors['surface-container-high'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors['surface-container-highest'],
    paddingTop: spacing.stackMd,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...typography.labelSm,
    color: colors['clay-outline'],
    marginBottom: 4,
  },
  statValue: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  }
});
