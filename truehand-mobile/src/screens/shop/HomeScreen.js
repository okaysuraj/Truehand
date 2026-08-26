import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { useProductStore } from '../../store/useProductStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

export default function HomeScreen() {
  const navigation = useNavigation();
  const fetchTrendingProducts = useProductStore((state) => state.fetchTrendingProducts);
  const trendingProducts = useProductStore((state) => state.trendingProducts);
  const isLoadingTrending = useProductStore((state) => state.isLoadingTrending);

  React.useEffect(() => {
    fetchTrendingProducts();
  }, [fetchTrendingProducts]);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>TrueHand</Text>
        
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="bag-handle-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Hero Story Section */}
        <TouchableOpacity activeOpacity={0.9} style={styles.heroSection}>
          <ImageBackground 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOGnr99AtWlnP-QTnPl8TTqkFRMeIZTnGBMLDW49nYI0PnvWjB0pQihS__8m_IpLQeyKFZu1dz31NoasdK5fVuuKfANndfCtSlDHI1wdc9WEcakGMJh7YwXGEg5Je1wMC8p_6EsFnM6iX6ixuYf98RkoIuzqBvCqI6rdU6vTT6GQnNcFna-e6O-KlNlmAvoL2J7YhcYaKF4hBRn5ITWvamoXZ2Aia162cjYElkwEONZ93aEe3tAVfUTA' }}
            style={styles.heroImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.heroOverlay}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>Featured Artisan</Text>
              </View>
              <Text style={styles.heroTitle}>The Art of Wabi-Sabi</Text>
              <Text style={styles.heroDesc} numberOfLines={2}>
                Discover the imperfect beauty of hand-thrown ceramics by master potter Elena Rostova, where every piece tells a story of earth and fire.
              </Text>
              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Read the Story</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* New Arrivals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <TouchableOpacity style={styles.viewAllRow} onPress={() => navigation.navigate('CategoryListing')}>
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.outline} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
          snapToInterval={CARD_WIDTH + spacing.gutter}
          decelerationRate="fast"
        >
          {isLoadingTrending ? (
            <Text style={{ padding: 20 }}>Loading trending products...</Text>
          ) : trendingProducts.map((item, index) => (
            <TouchableOpacity 
              key={item.id || index} 
              style={[styles.productCard, { width: CARD_WIDTH }]}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
              activeOpacity={0.9}
            >
              <View style={styles.productImageContainer}>
                <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/300x400' }} style={styles.productImage} />
                <TouchableOpacity style={styles.favButton}>
                  <Ionicons name="heart-outline" size={20} color={colors['forest-green']} />
                </TouchableOpacity>
              </View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Shop by Discipline */}
        <View style={styles.sectionHeaderCentered}>
          <Text style={styles.sectionTitle}>Shop by Discipline</Text>
        </View>

        <View style={styles.bentoGrid}>
          <TouchableOpacity style={[styles.bentoItem, styles.bentoItemLarge]} onPress={() => navigation.navigate('CategoryListing')}>
            <ImageBackground source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6GwmgW83s2ap67tb8GlSAfnFgXUbyZIngZYx9_PBjeMA9pJSV4u87oKZWmMreA29D7Cc8UBAkkAlD9jXTYOZSTRbbF1Af6a7AaCeq_bGmor8Qdt5jWTTzkfNkjfS8Tq_biA3vKYNEVthYkVbPkK-I4ivXiJXKZKwHInoDfOj7SxeUXD-_a7uYlZOJLKWenYPCeDqRyEkBI0YsTqhDWnoO_5z9GFUeDr04hFxKbf0w2KGe3MhzwHrd8Q' }} style={styles.bentoImage} imageStyle={styles.bentoImageStyle}>
              <View style={styles.bentoOverlay} />
              <View style={styles.bentoContent}>
                <Text style={styles.bentoTitle}>Stonework</Text>
                <Text style={styles.bentoExplore}>EXPLORE →</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.bentoItem, styles.bentoItemSmall]} onPress={() => navigation.navigate('CategoryListing')}>
            <ImageBackground source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeFMZCCE89b7N1xA8o1xpNRhDr7BSryCI1SmAVSAMevNdF9EgD-sa5bBCYNHajKZ80I6_amCWN29KrivN2A1EyUjRGmb3vaIvJO0HdhtSEPbc_BP_yZSAy02Cjx_LNdmrqVSCwLg93v771RobnZXG6n4ZuTYV66ODYHxRz2TGPyWuPjIVwTKWZvfIkRY1mB-1FLjE_k4qWp9fcw-UNtxpDTBkYKtaO4pM8KT-zRnL2PkuRevdb99C6tQ' }} style={styles.bentoImage} imageStyle={styles.bentoImageStyle}>
              <View style={styles.bentoOverlay} />
              <View style={styles.bentoContent}>
                <Text style={styles.bentoTitle}>Textiles</Text>
                <Text style={styles.bentoExplore}>EXPLORE →</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.bentoItem, styles.bentoItemSmall]} onPress={() => navigation.navigate('CategoryListing')}>
            <ImageBackground source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg102SHUQ_bk_FmLw7HF5aaCC9wX2WJBcTDWJt_ZvzhwRnTTdhMTqqv5j3cHiJEc_GWCrUxXSSr-N8JHgMI3CCcmSjBFSqdr6Rl8UdObCzRIiZemMBpNxjjoAFoWM8pQsED507rFy5Ar3lo31MijIrMyW_yJ60kkEGFNqHdz71w6VGZYlHm8ra7mmSps-dE5Nk2fCgwdMvk84WxXSVDMyXLqLG6alO0GYzq4E_kgTVK0a_ip_wKykcxA' }} style={styles.bentoImage} imageStyle={styles.bentoImageStyle}>
              <View style={styles.bentoOverlay} />
              <View style={styles.bentoContent}>
                <Text style={styles.bentoTitle}>Glass</Text>
                <Text style={styles.bentoExplore}>EXPLORE →</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.bentoItem, styles.bentoItemLarge]} onPress={() => navigation.navigate('CategoryListing')}>
            <ImageBackground source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMCJ0Va09h2ABI2gDrNc3MBV5Mn9gyWQN5bpmidKZBGYnTSdT86oNOpc0RSvJpyPATwlotpx7aA2UJ5VChIXNUIDOyMLDrF3coTyn8Y5VaNN_UJdl2u8NOVVLa9maK7fc80_rMz2j84SyyJstqVcr3aqom8e-Z_6caXziaY_kUyfRYH1xtLMN0_zoIXt53DASWAIP4EZGFZE-64PlPXU1fE7QQKBvXwp-LIab03frZeoL6aubSwHkA9g' }} style={styles.bentoImage} imageStyle={styles.bentoImageStyle}>
              <View style={styles.bentoOverlay} />
              <View style={styles.bentoContent}>
                <Text style={styles.bentoTitle}>Ceramics</Text>
                <Text style={styles.bentoExplore}>EXPLORE →</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Removed static NEW_ARRIVALS array

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
  },
  iconButton: {
    padding: spacing.stackSm,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
  },
  content: {
    paddingBottom: spacing.sectionGap,
  },
  heroSection: {
    marginHorizontal: spacing.marginMobile,
    marginTop: spacing.stackLg,
    marginBottom: spacing.sectionGap,
    height: 530,
    borderRadius: 12,
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  heroImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 28, 28, 0.4)', // Gradient simulation
    borderRadius: 12,
    justifyContent: 'flex-end',
    padding: spacing.gutter,
  },
  heroBadge: {
    backgroundColor: 'rgba(246, 243, 242, 0.9)',
    alignSelf: 'flex-start',
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
    fontSize: 40,
    lineHeight: 44,
    color: colors['on-primary'],
    marginBottom: spacing.stackSm,
  },
  heroDesc: {
    ...typography.bodyLg,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.stackMd,
  },
  heroButton: {
    backgroundColor: colors['primary-container'],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.marginMobile,
    marginBottom: spacing.stackLg,
  },
  sectionHeaderCentered: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
    marginTop: spacing.sectionGap,
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  viewAllRow: {
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
    marginRight: spacing.gutter, // Fallback for gap
  },
  productImageContainer: {
    aspectRatio: 3/4,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: spacing.stackSm,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    padding: 8,
    borderRadius: 20,
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
  bentoGrid: {
    paddingHorizontal: spacing.marginMobile,
    gap: spacing.stackMd,
  },
  bentoItem: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bentoItemLarge: {
    height: 250,
  },
  bentoItemSmall: {
    height: 200,
  },
  bentoImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.stackMd,
  },
  bentoImageStyle: {
    borderRadius: 12,
  },
  bentoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 28, 28, 0.2)',
    borderRadius: 12,
  },
  bentoContent: {
    zIndex: 1,
  },
  bentoTitle: {
    ...typography.headlineMd,
    color: colors['on-primary'],
    marginBottom: 4,
  },
  bentoExplore: {
    ...typography.labelSm,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 2,
  },
});
