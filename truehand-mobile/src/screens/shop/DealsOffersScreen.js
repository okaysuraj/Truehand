import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { productService } from '../../services/productService';

export default function DealsOffersScreen() {
  const navigation = useNavigation();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await api.get('/products/flash-sale');
      setDeals(res.data.slice(0, 2) || []);
    } catch (err) {
      console.error('Failed to fetch deals', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.introSection}>
          <Text style={styles.mainTitle}>Seasonal Curations</Text>
          <Text style={styles.subtitle}>
            A mindful selection of artisanal craft, gently priced. Explore stories of the studio, from final kiln firings to archival weaves.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors['forest-green']} style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.grid}>
            {/* Story Card 1 */}
            <TouchableOpacity style={styles.storyCard} onPress={() => navigation.navigate('ProductDetail', { productId: deals[0]?.id || 1 })}>
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: deals[0]?.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA50KNqs2S5bzN9Jn6cHrMeTAIbSide-FDG7A_87UkZcJa2d-io3ov8DsimpCHD7q4IYakFcRQouA5RVK2smZ7weReJTDUzcgCXKHkM-TCIt1tLPxPCAiLz8hT3pCPZn6pNqENPMTz-MKYAImehA9O1Za5N4jR7Fi6DSTytnEXC0gmm5EhOPob6f4j2pQxiNMFrb4nvAMnoLVk6on7H7oUE9WDdONkgp24kpmlE_G-A8rTEhaWV6T29Hg' }} 
                  style={styles.imageFeatured} 
                />
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>-15% Archival</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.categoryBadge}><Text style={styles.categoryText}>Hand-thrown Ceramic</Text></View>
                <Text style={styles.cardTitle}>{deals[0]?.name || 'End of Season Kiln Firing'}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>
                  "These dark-glazed stoneware pieces are the last from our autumn firing. The unique ash deposits make each plate entirely singular. We are making room in the studio for new clay bodies."
                </Text>
                <Text style={styles.priceRow}>
                  From ${deals[0]?.price || '45'} <Text style={styles.originalPrice}>$55</Text>
                </Text>
              </View>
            </TouchableOpacity>

            {/* Story Card 2 */}
            <TouchableOpacity style={styles.storyCard} onPress={() => navigation.navigate('ProductDetail', { productId: deals[1]?.id || 2 })}>
              <View style={[styles.imageContainer, { aspectRatio: 1 }]}>
                <Image 
                  source={{ uri: deals[1]?.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1vfXf5SoNzYKptWAHeOEsDlbSX9kApKPbB_uUuPrAefw1U9r_c1ytQ2uELzI17Njx5fAfZX-lcaIQwrXAo6cKUaCCmp_j5q6klfqJaQmh58TuuInboEh8jhfUNB9526RTIWlGFEPEiYUkDtkfbZZiSZDlmrt4TEJlMBVY2L6RX1pRRWSSO-O6QvX_ch-0og4YaZH7KuHBdn4c3stwGXWWm_lmFqsKwp5ZQzknDxZtTU43WYZrULrHSw' }} 
                  style={styles.imageFeatured} 
                />
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>-20% Studio Clearance</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.categoryBadge}><Text style={styles.categoryText}>Woven Textile</Text></View>
                <Text style={styles.cardTitle}>{deals[1]?.name || "Weaver's Reserve"}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>
                  Select yardage of heavy linen blends, originally woven as test pieces.
                </Text>
                <Text style={styles.priceRow}>
                  From ${deals[1]?.price || '85'} <Text style={styles.originalPrice}>$110</Text>
                </Text>
              </View>
            </TouchableOpacity>

            {/* Quote Block */}
            <View style={styles.quoteBlock}>
              <Text style={styles.quoteText}>"Every object here carries the mark of the maker's hand."</Text>
              <Text style={styles.quoteDesc}>
                Our Seasonal Curations are not merely sales; they are an opportunity to re-home pieces that hold significant narrative weight within our partner studios.
              </Text>
              <TouchableOpacity style={styles.readJournalBtn}>
                <Text style={styles.readJournalText}>Read the Journal</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.charcoal} />
              </TouchableOpacity>
            </View>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, borderBottomWidth: 1, borderBottomColor: colors['surface-container'] },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'], fontWeight: '700' },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  introSection: { marginTop: spacing.stackMd, marginBottom: spacing.stackLg },
  mainTitle: { ...typography.displayLg, color: colors['forest-green'], marginBottom: spacing.stackSm, fontSize: 40 },
  subtitle: { ...typography.bodyLg, color: colors['on-surface-variant'], maxWidth: '90%' },
  grid: { gap: spacing.stackLg },
  storyCard: { width: '100%' },
  imageContainer: { width: '100%', aspectRatio: 1.33, borderRadius: 4, overflow: 'hidden', backgroundColor: colors['surface-container-low'], marginBottom: spacing.stackMd },
  imageFeatured: { width: '100%', height: '100%', resizeMode: 'cover' },
  tagBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: colors.terracotta, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  tagText: { ...typography.labelSm, color: colors['on-primary'], letterSpacing: 0.5 },
  cardContent: { paddingHorizontal: 4 },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: colors['surface-variant'], paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginBottom: 8 },
  categoryText: { ...typography.labelSm, color: colors.charcoal },
  cardTitle: { ...typography.headlineMd, color: colors['forest-green'], marginBottom: 4 },
  cardDesc: { ...typography.bodyMd, color: colors['on-surface-variant'], marginBottom: 12 },
  priceRow: { ...typography.labelMd, color: colors['forest-green'] },
  originalPrice: { textDecorationLine: 'line-through', color: colors.outline, fontWeight: 'normal', marginLeft: 8 },
  quoteBlock: { marginTop: spacing.stackLg, paddingTop: spacing.stackLg, borderTopWidth: 1, borderTopColor: colors['surface-variant'] },
  quoteText: { ...typography.displayLg, fontSize: 32, lineHeight: 36, color: colors['forest-green'], marginBottom: spacing.stackSm },
  quoteDesc: { ...typography.bodyLg, color: colors['on-surface-variant'], marginBottom: spacing.stackMd },
  readJournalBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', borderWidth: 1, borderColor: colors.charcoal, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 4 },
  readJournalText: { ...typography.labelMd, color: colors.charcoal }
});
