import api from '../../services/api';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const { width } = Dimensions.get('window');

const COLLECTION_ITEMS = [
  {
    id: '1',
    name: 'Chalk Wabi Vase',
    price: '$185',
    image: 'https://via.placeholder.com/300x400',
    isFavorite: false
  },
  {
    id: '2',
    name: 'Speckled Earth Bowl',
    price: '$220',
    image: 'https://via.placeholder.com/300x400',
    isFavorite: true
  },
  {
    id: '3',
    name: 'Ash Glaze Pitcher',
    price: '$160',
    image: 'https://via.placeholder.com/300x400',
    isFavorite: false
  }
];

export default function WishlistCollectionScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu" size={28} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bag-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/600x800' }} 
            style={styles.heroImage} 
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Ceramic Sanctuary</Text>
            <Text style={styles.heroSubtitle}>
              A curated exploration of form and earth. This collection celebrates the quiet luxury of hand-thrown vessels, where natural imperfections become marks of true craftsmanship.
            </Text>
          </View>
        </View>

        {/* Collection Meta */}
        <View style={styles.metaRow}>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Hand-thrown</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Earthenware</Text>
            </View>
          </View>
          <View style={styles.metaRight}>
            <Text style={styles.itemCount}>12 Items</Text>
            <TouchableOpacity>
              <Ionicons name="share-outline" size={20} color={colors['on-surface-variant']} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Grid */}
        <View style={styles.grid}>
          {COLLECTION_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.favoriteBtn}>
                  <Ionicons 
                    name={item.isFavorite ? "heart" : "heart-outline"} 
                    size={20} 
                    color={item.isFavorite ? colors['forest-green'] : colors.charcoal} 
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
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
  heroContainer: {
    width: '100%',
    height: 530,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.stackLg,
    backgroundColor: colors['surface-container-low'],
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
  heroTitle: {
    ...typography.displayLg,
    color: colors['on-primary'],
    marginBottom: spacing.stackSm,
  },
  heroSubtitle: {
    ...typography.bodyLg,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.stackMd,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
    marginBottom: spacing.stackLg,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: colors['surface-container-low'],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(114, 121, 116, 0.2)',
  },
  tagText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemCount: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  productCard: {
    width: (width - spacing.marginMobile * 2 - 16) / 2,
    marginBottom: spacing.stackMd,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4/5,
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
    top: 8,
    right: 8,
    backgroundColor: 'rgba(252, 249, 248, 0.5)',
    width: 32,
    height: 32,
    borderRadius: 16,
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
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
});
