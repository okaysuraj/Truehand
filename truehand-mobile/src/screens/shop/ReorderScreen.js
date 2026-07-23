import api from '../../services/api';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const { width } = Dimensions.get('window');

const STANDARD_ITEMS = [
  {
    id: '2',
    name: 'Woven Linen Napkins',
    price: '$32.00 / Set of 4',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Carved Walnut Spoon',
    price: '$65.00',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Beeswax Pillar Candle',
    price: '$28.00',
    image: 'https://via.placeholder.com/150',
  }
];

export default function ReorderScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={28} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artisan Goods</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bag-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Rediscover Your Favorites</Text>
          <Text style={styles.pageSubtitle}>Return to the pieces you loved. Handcrafted items available for immediate restock.</Text>
        </View>

        {/* Featured Item */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredImageContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/300x200' }} 
              style={styles.featuredImage} 
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Recently Purchased</Text>
            </View>
          </View>
          
          <View style={styles.featuredInfo}>
            <View style={styles.featuredTopRow}>
              <Text style={styles.featuredTitle}>Earthenware Mug</Text>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color={colors.outline} />
              </TouchableOpacity>
            </View>
            <Text style={styles.featuredDesc} numberOfLines={3}>
              The perfect vessel for your morning ritual. Thrown by hand in small batches, featuring a custom charcoal glaze that develops unique character over time.
            </Text>
            <Text style={styles.featuredPrice}>$48.00</Text>
            
            <TouchableOpacity style={styles.addToCartBtn}>
              <Ionicons name="cart-outline" size={20} color={colors.surface} />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Standard Items Grid */}
        <View style={styles.gridContainer}>
          {STANDARD_ITEMS.map((item) => (
            <View key={item.id} style={styles.gridCard}>
              <View style={styles.gridImageContainer}>
                <Image source={{ uri: item.image }} style={styles.gridImage} />
              </View>
              
              <View style={styles.gridInfo}>
                <Text style={styles.gridTitle} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.gridPrice}>{item.price}</Text>
                
                <TouchableOpacity style={styles.quickAddBtn}>
                  <Ionicons name="add" size={16} color={colors.charcoal} />
                  <Text style={styles.quickAddText}>Quick Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          {/* Decorative Card */}
          <View style={styles.decorativeCard}>
            <Ionicons name="leaf" size={40} color={colors['forest-green']} style={styles.decoIcon} />
            <Text style={styles.decoTitle}>Sustainable Restock</Text>
            <Text style={styles.decoDesc}>
              Every reorder is packaged using 100% biodegradable materials, keeping our commitment to the earth.
            </Text>
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
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  pageHeader: {
    marginBottom: spacing.stackLg,
    alignItems: 'center',
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  featuredCard: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.stackLg,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  featuredImageContainer: {
    width: '100%',
    aspectRatio: 4/3,
    backgroundColor: colors['surface-container'],
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(252, 249, 248, 0.9)', // surface-linen/90
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(114, 121, 116, 0.2)', // clay-outline/20
  },
  badgeText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  featuredInfo: {
    padding: spacing.stackLg,
  },
  featuredTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.stackSm,
  },
  featuredTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    flex: 1,
    marginRight: 16,
  },
  featuredDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginBottom: spacing.stackLg,
  },
  featuredPrice: {
    ...typography.labelMd,
    color: colors.charcoal,
    marginBottom: spacing.stackLg,
  },
  addToCartBtn: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    gap: 8,
  },
  addToCartText: {
    ...typography.labelMd,
    color: colors.surface,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.stackMd,
  },
  gridCard: {
    width: (width - spacing.marginMobile * 2 - spacing.stackMd) / 2,
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  gridImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors['surface-container'],
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridInfo: {
    padding: spacing.stackMd,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  gridTitle: {
    ...typography.bodyLg,
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: 4,
  },
  gridPrice: {
    ...typography.labelMd,
    color: colors.outline,
    textAlign: 'center',
    marginBottom: spacing.stackMd,
  },
  quickAddBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.charcoal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    gap: 4,
    width: '100%',
  },
  quickAddText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  decorativeCard: {
    width: '100%',
    backgroundColor: colors['surface-container-low'],
    borderRadius: 8,
    padding: spacing.stackLg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    marginTop: spacing.stackSm,
  },
  decoIcon: {
    marginBottom: spacing.stackMd,
  },
  decoTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  decoDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  }
});
