import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { productService } from '../services/productService';

export default function PersonalizedRecommendationsScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await productService.getAllProducts();
      setProducts(res.slice(1, 5)); // Mock recommendations
    } catch (err) {
      console.error('Failed to fetch recommendations', err);
    } finally {
      setLoading(false);
    }
  };

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.carouselItem} 
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.carouselImageContainer}>
        <Image 
          source={{ uri: item.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo7vl-_DUzTaWgoKAm_hlH8qW5pX003HV0t9xqlB8waB3V88nBvqBl5GYeIDQXTKIvXzUD4QcgzQNzUxMaUx48n9G8E9rZ-v6F9TdP_BshR0FWHP7B2WyP1533y8qXVFkb0gBsMRVnFoHXxuIDeBPjfRtzCN50__m2t8pTksNvAPVwvqZ65vb05r8agbfLfR2n3N7Lfzh61sU1OwYqzIfcpgS6lYixRS3DMJ54u0P8rQaSZ4EEmid0Og' }} 
          style={styles.carouselImage} 
        />
        <TouchableOpacity style={styles.favBtn}>
          <Ionicons name="heart-outline" size={20} color={colors.charcoal} />
        </TouchableOpacity>
        <View style={styles.materialBadge}>
          <Text style={styles.materialText}>{item.category || 'Stoneware'}</Text>
        </View>
      </View>
      <View style={styles.carouselTextContainer}>
        <Text style={styles.carouselName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.carouselArtisan}>By {item.sellerId ? `Artisan ${item.sellerId}` : 'Studio Kura'}</Text>
        <Text style={styles.carouselPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color={colors.charcoal} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.introSection}>
          <Text style={styles.title}>For You</Text>
          <Text style={styles.subtitle}>
            A curated selection of craftsmanship, tailored to the materials and makers you've previously admired.
          </Text>
        </View>

        {/* Carousel Section */}
        <View style={styles.carouselSection}>
          <View style={styles.carouselHeaderRow}>
            <Text style={styles.carouselHeaderTitle}>Because you admired <Text style={{ fontStyle: 'italic', color: colors.terracotta }}>Ceramics</Text></Text>
            <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
          </View>
          
          {loading ? (
            <ActivityIndicator size="small" color={colors['forest-green']} />
          ) : (
            <FlatList 
              data={products}
              renderItem={renderCarouselItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: spacing.marginMobile, gap: spacing.stackMd }}
              snapToInterval={280 + spacing.stackMd}
              decelerationRate="fast"
            />
          )}
        </View>

        {/* Daily Discovery Bento */}
        <View style={styles.dailyDiscoverySection}>
          <Text style={styles.dailyDiscoveryTitle}>Daily Discovery</Text>
          
          <TouchableOpacity style={styles.bentoHero} onPress={() => {}}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSLRbRKs3sXNWD1w80IO23EkdciVLtWH-iuJFeIzUtYpICN8yg-P6dN6owfzs8pDdxtnwotVcC0zcJABM06uNKjpQ7WjrP2N78B1MXA_7GHV8sC5SyMYCMl_5KaSGbqOi8gQxGvxxXMhvdT-7sj1d4Uo7VO1vi4Oc41ZCR9XyClqNDg0TX4719Ur2XjyISUV63Z5Q1H-LKyBMl_Wy-JBNwsf07inT0P_L5scsE3SnHUYW_0sq3SjNYTQ' }} 
              style={styles.bentoHeroImage} 
            />
            <View style={styles.bentoHeroOverlay}>
              <View style={styles.bentoBadge}><Text style={styles.bentoBadgeText}>Artisan Spotlight</Text></View>
              <Text style={styles.bentoHeroTitle}>The Oak Series</Text>
              <Text style={styles.bentoHeroDesc}>Meet the maker dedicating his life to sustainable, heritage woodworking.</Text>
              <TouchableOpacity style={styles.bentoHeroBtn}>
                <Text style={styles.bentoHeroBtnText}>Read Story</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.bentoRow}>
            <TouchableOpacity style={styles.bentoSmallCard}>
              <MaterialIcons name="local-florist" size={24} color={colors['forest-green']} />
              <View style={{ marginTop: 16 }}>
                <Text style={styles.bentoSmallTitle}>Linen Weaves</Text>
                <Text style={styles.bentoSmallDesc}>Sourced directly from Flanders, celebrating natural imperfections.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bentoSmallCard, { padding: 0, overflow: 'hidden' }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAooPlOWH_gwo4VBBW45-eViZCr7kNOUMknQVnFm5XEKbVOWW1YSgR9kbMBpfs8g3-5BG1FWputcOKjUQlzh_tlkL4kfNMmFEFMJsk3mqeYX-TTGhFZrUif2Zoz_xMOw9lwFmM3mhvmGS41B0QB1sbzekivCrqPWeSTGwX9LFz5tzTkUxBUOxayApvdx_RB3rRD99n3M45zWiAk_z8Q3TAnW1qVKG22LYg0bvsZVV9RJsIqipEax6ubCg' }} 
                style={styles.bentoSmallImage} 
              />
              <View style={styles.bentoSmallOverlay}>
                <Text style={styles.bentoSmallImageTitle}>Textiles</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, borderBottomWidth: 1, borderBottomColor: colors['surface-container'] },
  headerTitle: { ...typography.headlineLgMobile, color: colors['forest-green'], fontWeight: '700' },
  backButton: { padding: 8, marginHorizontal: -8 },
  scrollContent: { paddingBottom: spacing.sectionGap },
  
  introSection: { padding: spacing.marginMobile, marginBottom: spacing.stackLg },
  title: { ...typography.displayLg, color: colors.charcoal, marginBottom: 8, fontSize: 36 },
  subtitle: { ...typography.bodyLg, color: colors['on-surface-variant'], maxWidth: '90%' },
  
  carouselSection: { marginBottom: spacing.sectionGap },
  carouselHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: spacing.marginMobile, marginBottom: spacing.stackMd },
  carouselHeaderTitle: { ...typography.headlineMd, color: colors.charcoal, flex: 1 },
  viewAllText: { ...typography.labelMd, color: colors['forest-green'], textDecorationLine: 'underline', marginBottom: 4 },
  
  carouselItem: { width: 280 },
  carouselImageContainer: { width: '100%', aspectRatio: 0.8, backgroundColor: colors['surface-container-low'], borderRadius: 8, overflow: 'hidden', marginBottom: 12 },
  carouselImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  favBtn: { position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(252,249,248,0.7)', alignItems: 'center', justifyContent: 'center' },
  materialBadge: { position: 'absolute', bottom: 12, left: 12, backgroundColor: colors['surface-container-highest'], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  materialText: { ...typography.labelSm, color: colors.charcoal },
  carouselTextContainer: { alignItems: 'center' },
  carouselName: { ...typography.bodyMd, color: colors.charcoal, marginBottom: 4 },
  carouselArtisan: { ...typography.labelMd, color: colors['on-surface-variant'], marginBottom: 4 },
  carouselPrice: { ...typography.labelMd, color: colors.charcoal },

  dailyDiscoverySection: { paddingHorizontal: spacing.marginMobile },
  dailyDiscoveryTitle: { ...typography.headlineMd, color: colors.charcoal, marginBottom: spacing.stackLg, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors['surface-variant'] },
  
  bentoHero: { width: '100%', aspectRatio: 0.8, borderRadius: 12, overflow: 'hidden', backgroundColor: colors.charcoal, marginBottom: spacing.stackMd },
  bentoHeroImage: { width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.8 },
  bentoHeroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, paddingTop: 60, backgroundColor: 'rgba(0,0,0,0.4)' },
  bentoBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(252,249,248,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4, marginBottom: 12 },
  bentoBadgeText: { ...typography.labelSm, color: colors['on-primary'] },
  bentoHeroTitle: { ...typography.displayLg, color: colors['on-primary'], fontSize: 32, marginBottom: 8 },
  bentoHeroDesc: { ...typography.bodyLg, color: colors['on-primary'], opacity: 0.9, marginBottom: 24 },
  bentoHeroBtn: { alignSelf: 'flex-start', backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 4 },
  bentoHeroBtnText: { ...typography.labelMd, color: colors['on-primary'] },

  bentoRow: { flexDirection: 'row', gap: spacing.stackMd, height: 200 },
  bentoSmallCard: { flex: 1, backgroundColor: colors['surface-container-low'], borderRadius: 12, padding: 24, justifyContent: 'space-between' },
  bentoSmallTitle: { ...typography.headlineMd, color: colors.charcoal, marginBottom: 4, fontSize: 20 },
  bentoSmallDesc: { ...typography.bodyMd, color: colors['on-surface-variant'], fontSize: 14 },
  bentoSmallImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  bentoSmallOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: 'rgba(0,0,0,0.2)' },
  bentoSmallImageTitle: { ...typography.headlineMd, color: colors['on-primary'], fontSize: 20 }
});
