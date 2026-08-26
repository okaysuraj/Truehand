import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useUserStore } from '../../store/useUserStore';

const { width } = Dimensions.get('window');
const numColumns = 2;
const cardWidth = (width - spacing.marginMobile * 2 - spacing.gutter * (numColumns - 1)) / numColumns;

export default function WishlistScreen() {
  const navigation = useNavigation();
  const wishlist = useUserStore(state => state.wishlist);
  const fetchWishlist = useUserStore(state => state.fetchWishlist);
  const removeFromWishlist = useUserStore(state => state.removeFromWishlist);

  React.useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="menu" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bag-outline" size={24} color={colors['forest-green']} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageTitle}>My Collections</Text>
            <Text style={styles.pageSubtitle}>Curated artifacts and future heirlooms.</Text>
          </View>
          <TouchableOpacity style={styles.newCollectionBtn}>
            <Ionicons name="add" size={18} color={colors['on-surface-variant']} />
            <Text style={styles.newCollectionText}>New</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {wishlist.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.9} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} style={styles.image} />
                <TouchableOpacity style={styles.favoriteButton} onPress={() => removeFromWishlist(item.id)}>
                  <Ionicons name="heart" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <View style={styles.cardInfo}>
                <View style={styles.textContainer}>
                  <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price?.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.addToCartBtn}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          
          {/* Discover More Card */}
          <TouchableOpacity style={[styles.card, styles.discoverCard]}>
            <Ionicons name="compass-outline" size={32} color={colors['outline-variant']} />
            <Text style={styles.discoverText}>Discover more artisans</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  iconButton: {
    padding: spacing.stackSm,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 64,
  },
  pageTitle: {
    ...typography.displayLg,
    color: colors.primary,
    marginBottom: 8,
    fontSize: 40,
  },
  pageSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  newCollectionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  newCollectionText: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.gutter,
  },
  card: {
    width: cardWidth,
    marginBottom: spacing.stackLg,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4/5,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    padding: 8,
    borderRadius: 20,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardInfo: {
    flexDirection: 'column',
    gap: 8,
  },
  textContainer: {
    gap: 4,
  },
  itemName: {
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  itemPrice: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
  },
  addToCartBtn: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 4,
  },
  addToCartText: {
    ...typography.labelSm,
    color: colors['on-primary'],
  },
  discoverCard: {
    aspectRatio: 4/5,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors['surface-container-lowest'],
    padding: 16,
  },
  discoverText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginTop: 8,
  },
});
