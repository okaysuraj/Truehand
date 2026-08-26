import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';
import { productService } from '../../services/productService';

export default function FlashSaleScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: '04', minutes: '27', seconds: '45' });

  useEffect(() => {
    fetchFlashSaleProducts();

    // Simple timer interval
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let s = parseInt(prev.seconds) - 1;
        let m = parseInt(prev.minutes);
        let h = parseInt(prev.hours);
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        return {
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0')
        };
      });
    }, 1000);
  

    return () => clearInterval(timer);
  }, []);

  const fetchFlashSaleProducts = async () => {
    try {
      const res = await productService.getFlashSaleProducts();
      setProducts(res);
    } catch (err) {
      console.error('Failed to fetch flash sale products', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.charcoal} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color={colors.charcoal} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.badgeLabel}>
            <MaterialIcons name="schedule" size={16} color={colors.terracotta} />
            <Text style={styles.badgeText}>FLASH SALE</Text>
          </View>
          <Text style={styles.title}>Limited Release</Text>
          <Text style={styles.subtitle}>
            A curated selection of exclusive, handcrafted pieces. Available in strictly limited quantities. 
            Once these pieces are acquired, they will not return.
          </Text>

          {/* Timer */}
          <View style={styles.timerRow}>
            <View style={styles.timerBlock}>
              <Text style={styles.timerValue}>{timeLeft.hours}</Text>
              <Text style={styles.timerLabel}>HRS</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>
            <View style={styles.timerBlock}>
              <Text style={styles.timerValue}>{timeLeft.minutes}</Text>
              <Text style={styles.timerLabel}>MIN</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>
            <View style={styles.timerBlock}>
              <Text style={[styles.timerValue, { color: colors.terracotta }]}>{timeLeft.seconds}</Text>
              <Text style={styles.timerLabel}>SEC</Text>
            </View>
          </View>
        </View>

        {/* Product Grid */}
        {loading ? (
          <ActivityIndicator size="large" color={colors['forest-green']} />
        ) : (
          <View style={styles.grid}>
            
            {/* Product 1 */}
            <View style={styles.productCard}>
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: products[0]?.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9rKhD4_Os1V4ijzWEQe5BSugmnZ0nObHqqqw7ffBw4zewtcikDwB_ekzlPA1mIIr58jJwWQMIzYNAPM0Yuq_iTYPudqZR3InoSc6GL2XeZ11ds1RijwnPfBQIRP4m44QKUjkQ5kJi-3lkWdYE4uKNp8FCFvV0pAJw0tCl4_Igib7ksOqcQ14munxsFLexE11vyoCAU18ZRNW68r5RhfKuVRrmOq_Xp5CUeTkeBh1c4yZdSIZUvkjogg' }} 
                  style={styles.productImage} 
                />
                <View style={styles.imageTag}>
                  <Text style={styles.imageTagText}>Hand-thrown Ceramic</Text>
                </View>
              </View>
              
              <Text style={styles.productName}>{products[0]?.name || 'Charcoal vessel no. 4'}</Text>
              <Text style={styles.productPrice}>${products[0]?.price || '185.00'}</Text>
              
              <View style={styles.stockContainer}>
                <View style={styles.stockRow}>
                  <Text style={styles.stockLabel}>CLAIMED</Text>
                  <Text style={styles.stockValue}>8/12</Text>
                </View>
                <View style={styles.stockBarBg}>
                  <View style={[styles.stockBarFill, { width: '66%' }]} />
                </View>
              </View>

              <TouchableOpacity style={styles.acquireBtn} onPress={() => navigation.navigate('ProductDetail', { productId: products[0]?.id || 1 })}>
                <Text style={styles.acquireBtnText}>ACQUIRE PIECE</Text>
              </TouchableOpacity>
            </View>

            {/* Product 2 */}
            <View style={styles.productCard}>
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: products[1]?.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_5pot7uLUYUjOKWfxnu0LqFt5mebTivi4scTOv7JkFPMjTCIwSURMESjs7cxVj-eSSzxTvdYhqpa8LBwzZTXct7h2g1xyf5xmCjpFgyPZ9MUwkqIYw5naAa3d6AU9IokxRsBL6zHmNOXKenOCKRwhStfworcB5HFrGkH3Fl_-jwm-LGbaGamn8kOaYbkcIAAwvExHJEjsTsdzNzwpu6oNw2XWH5W-ciBpUaD4EO1P5lzVAoNFLN5a7Q' }} 
                  style={styles.productImage} 
                />
                <View style={styles.imageTag}>
                  <Text style={styles.imageTagText}>Natural Fiber</Text>
                </View>
                <View style={[styles.imageTag, { right: 16, left: 'auto', backgroundColor: colors.terracotta }]}>
                  <Text style={[styles.imageTagText, { color: colors['on-primary'] }]}>LAST 2</Text>
                </View>
              </View>
              
              <Text style={styles.productName}>{products[1]?.name || 'Earthweave Throw'}</Text>
              <Text style={styles.productPrice}>${products[1]?.price || '320.00'}</Text>
              
              <View style={styles.stockContainer}>
                <View style={styles.stockRow}>
                  <Text style={styles.stockLabel}>CLAIMED</Text>
                  <Text style={[styles.stockValue, { color: colors.terracotta }]}>18/20</Text>
                </View>
                <View style={styles.stockBarBg}>
                  <View style={[styles.stockBarFill, { width: '90%', backgroundColor: colors.terracotta }]} />
                </View>
              </View>

              <TouchableOpacity style={styles.acquireBtn} onPress={() => navigation.navigate('ProductDetail', { productId: products[1]?.id || 2 })}>
                <Text style={styles.acquireBtnText}>ACQUIRE PIECE</Text>
              </TouchableOpacity>
            </View>

            {/* Product 3 (Sold out) */}
            <View style={styles.productCard}>
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoFpuiEiKobW5V7UeJXJCjhU-VJeZeNaSss1W9LoIEbYP6V9OXiJqy5bG_lszgZl1l8dlL_DuRJQAnCBCW71QLv1noPmeiE5fTe_JshEp9_Gkw6f1Ot1hZAE512jKINHVaKpZH8mE4zkmnoT5Wzeas4LCG0LuEjSrDBOFFYCXGrzYtTfulm_pb1J61BHE79Q4Thq4IMzOK0rllG0AxdGmJI8Xb46LibEMhKFy1gzyEXr80fZfZlKssuQ' }} 
                  style={[styles.productImage, { opacity: 0.6 }]} 
                />
                <View style={styles.soldOutOverlay}>
                  <Text style={styles.soldOutText}>Sold Out</Text>
                </View>
              </View>
              
              <View style={{ opacity: 0.6, alignItems: 'center', width: '100%' }}>
                <Text style={styles.productName}>Lumina Pendant</Text>
                <Text style={styles.productPrice}>$450.00</Text>
                
                <View style={styles.stockContainer}>
                  <View style={styles.stockRow}>
                    <Text style={styles.stockLabel}>CLAIMED</Text>
                    <Text style={[styles.stockValue, { color: colors.outline }]}>5/5</Text>
                  </View>
                  <View style={styles.stockBarBg}>
                    <View style={[styles.stockBarFill, { width: '100%', backgroundColor: colors.outline }]} />
                  </View>
                </View>

                <TouchableOpacity style={[styles.acquireBtn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.charcoal }]} disabled={true}>
                  <Text style={[styles.acquireBtnText, { color: colors.charcoal }]}>UNAVAILABLE</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, borderBottomWidth: 1, borderBottomColor: colors['surface-container'] },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'], fontWeight: '700' },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  
  heroSection: { alignItems: 'center', marginVertical: spacing.stackLg },
  badgeLabel: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors['surface-container'], paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginBottom: 16 },
  badgeText: { ...typography.labelSm, color: colors.terracotta, letterSpacing: 1 },
  title: { ...typography.displayLg, color: colors['forest-green'], marginBottom: 8 },
  subtitle: { ...typography.bodyLg, color: colors['on-surface-variant'], textAlign: 'center', maxWidth: 300, marginBottom: 24 },
  
  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  timerBlock: { alignItems: 'center' },
  timerValue: { ...typography.headlineLg, color: colors['forest-green'] },
  timerLabel: { ...typography.labelSm, color: colors.outline, letterSpacing: 1 },
  timerColon: { ...typography.headlineLg, color: colors['forest-green'], marginBottom: 16 },

  grid: { gap: 32 },
  productCard: { alignItems: 'center', width: '100%' },
  imageContainer: { width: '100%', aspectRatio: 0.8, backgroundColor: colors['surface-container-low'], marginBottom: 16, position: 'relative' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageTag: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(252,249,248,0.9)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  imageTagText: { ...typography.labelSm, color: colors.charcoal },
  soldOutOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(252,249,248,0.4)', justifyContent: 'center', alignItems: 'center' },
  soldOutText: { ...typography.headlineMd, backgroundColor: 'rgba(252,249,248,0.9)', paddingHorizontal: 24, paddingVertical: 8, borderRadius: 4, color: colors.charcoal },
  
  productName: { ...typography.bodyMd, color: colors.charcoal, marginBottom: 4 },
  productPrice: { ...typography.labelMd, color: colors.outline, marginBottom: 16 },
  
  stockContainer: { width: '100%', maxWidth: 200, marginBottom: 24 },
  stockRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stockLabel: { ...typography.labelSm, color: colors.outline, letterSpacing: 1 },
  stockValue: { ...typography.labelSm, color: colors['forest-green'], fontWeight: '700' },
  stockBarBg: { height: 4, width: '100%', backgroundColor: colors['surface-variant'], borderRadius: 2, overflow: 'hidden' },
  stockBarFill: { height: '100%', backgroundColor: colors['forest-green'], borderRadius: 2 },
  
  acquireBtn: { width: '100%', backgroundColor: colors['forest-green'], paddingVertical: 14, alignItems: 'center', borderRadius: 4 },
  acquireBtnText: { ...typography.labelMd, color: colors['on-primary'], letterSpacing: 1 }
});
