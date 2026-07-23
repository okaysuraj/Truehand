import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { productService } from '../../services/productService';

export default function RecentlyViewedScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await productService.getAllProducts();
      setProducts(res.slice(0, 6)); // Mocking recent history
    } catch (err) {
      console.error('Failed to fetch recently viewed', err);
    } finally {
      setLoading(false);
    }
  };

  const removeHistoryItem = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const clearAll = () => {
    setProducts([]);
  };

  const renderProduct = ({ item, index }) => {
    // Make every 3rd item span wider or taller to simulate bento layout
    const isLarge = index === 2;
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

    return (
      <TouchableOpacity 
        style={[styles.cardContainer, isLarge && styles.cardContainerLarge]} 
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      >
        <View style={[styles.imageContainer, isLarge && styles.imageContainerLarge]}>
          <Image 
            source={{ uri: item.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv4cyjxV-vTfS3vI121SIMfXS0L7ZhZgspzBponytk5HOCPZJJXqA1w_mBHK-Nd37FMRFNM82wv0mZf01P2ByjxDcThkSVIzX63boNQdhN10Twpn5RnzSLgPRnkbVdOonWaMve_KE1Zmd9SoW5YXIJD-dk2vdL2ib9GP7MMbKIAOia0Oq07_uUrJ_uK7LG-eQU0GmiiVEVEtb8uXlV5bYDgMhrFxEVZ9gIaxo3xcCho_d_8p3XdBHIRw' }} 
            style={styles.productImage} 
          />
          <TouchableOpacity 
            style={styles.removeBtn} 
            onPress={(e) => { e.stopPropagation(); removeHistoryItem(item.id); }}
          >
            <Ionicons name="close" size={16} color={colors['on-surface-variant']} />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.productName, isLarge && styles.productNameLarge]} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.artisanName}>by {item.sellerId ? `Artisan ${item.sellerId}` : 'Elias Stoneworks'}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.title}>Recently Viewed</Text>
            <Text style={styles.subtitle}>Rediscover your past inspirations.</Text>
          </View>
          <TouchableOpacity onPress={clearAll}>
            <Text style={styles.clearBtnText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors['forest-green']} style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, borderBottomWidth: 1, borderBottomColor: colors['surface-container'] },
  headerTitle: { ...typography.headlineLgMobile, color: colors['forest-green'], fontWeight: '700' },
  backButton: { padding: 8, marginHorizontal: -8 },
  content: { flex: 1 },
  headerSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: spacing.marginMobile, paddingBottom: spacing.stackSm, borderBottomWidth: 1, borderBottomColor: colors['surface-variant'], marginBottom: spacing.stackMd },
  title: { ...typography.headlineMd, color: colors.charcoal, marginBottom: 4 },
  subtitle: { ...typography.bodyMd, color: colors['on-surface-variant'] },
  clearBtnText: { ...typography.labelSm, color: colors.outline, textDecorationLine: 'underline' },
  
  listContent: { paddingHorizontal: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  row: { justifyContent: 'space-between' },
  cardContainer: { width: '48%', backgroundColor: colors['surface-container-lowest'], borderRadius: 8, shadowColor: colors['forest-green'], shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1, marginBottom: spacing.stackMd, overflow: 'hidden' },
  cardContainerLarge: { width: '100%', flexDirection: 'column' },
  imageContainer: { width: '100%', aspectRatio: 1, position: 'relative' },
  imageContainerLarge: { aspectRatio: 16/9 },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  removeBtn: { position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.8)', alignItems: 'center', justifyContent: 'center' },
  textContainer: { padding: spacing.stackSm, alignItems: 'center', justifyContent: 'center' },
  productName: { ...typography.bodyMd, color: colors.charcoal, textAlign: 'center' },
  productNameLarge: { ...typography.headlineMd },
  artisanName: { ...typography.labelSm, color: colors['on-surface-variant'], marginTop: 4 },
  price: { ...typography.labelMd, color: colors['forest-green'], marginTop: 8 }
});
