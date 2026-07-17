import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { artisanService } from '../services/artisanService';

export default function BrandListingScreen() {
  const navigation = useNavigation();
  const [artisansByLetter, setArtisansByLetter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      // Mocking fetch all artisans and grouping them
      // Real implementation would use artisanService.getAll()
      const mockData = {
        'A': [
          { id: 1, name: 'Aether Ceramics', category: 'Hand-thrown Stoneware' },
          { id: 2, name: 'Alpen Forge', category: 'Custom Metalwork' },
          { id: 3, name: 'Artisan Looms', category: 'Natural Fiber Textiles' },
        ],
        'B': [
          { id: 4, name: 'Bower Woodworking', category: 'Master Woodworking' },
          { id: 5, name: 'Brass & Bone', category: 'Fine Jewelry' },
        ],
        'E': [
          { id: 6, name: 'Earthen Kiln', category: 'Terracotta & Clay' },
        ]
      };
      setArtisansByLetter(mockData);
    } catch (err) {
      console.error('Failed to fetch artisans', err);
    } finally {
      setLoading(false);
    }
  };
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
          <Text style={styles.title}>Partner Studios</Text>
          <Text style={styles.subtitle}>
            A curated directory of our artisan partners, dedicated to authentic craftsmanship and quiet luxury.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors['forest-green']} style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.directoryContainer}>
            {Object.keys(artisansByLetter).sort().map(letter => (
              <View key={letter} style={styles.letterSection}>
                <View style={styles.letterHeader}>
                  <Text style={styles.letterTitle}>{letter}</Text>
                </View>
                
                <View style={styles.artisanGrid}>
                  {artisansByLetter[letter].map(artisan => (
                    <TouchableOpacity 
                      key={artisan.id} 
                      style={styles.artisanCard}
                      onPress={() => {
                        // Navigate to Artisan Profile (to be implemented later)
                        // navigation.navigate('ArtisanProfile', { artisanId: artisan.id });
                      }}
                    >
                      <Text style={styles.artisanName}>{artisan.name}</Text>
                      <Text style={styles.artisanCategory}>{artisan.category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, borderBottomWidth: 1, borderBottomColor: colors['surface-container'] },
  headerTitle: { ...typography.headlineLgMobile, color: colors['forest-green'], fontWeight: '700' },
  backButton: { padding: 8, marginHorizontal: -8 },
  scrollContent: { paddingBottom: spacing.sectionGap },
  
  introSection: { padding: spacing.marginMobile, marginBottom: spacing.stackLg },
  title: { ...typography.displayLg, color: colors['forest-green'], marginBottom: 8, fontSize: 36 },
  subtitle: { ...typography.bodyLg, color: colors['on-surface-variant'], maxWidth: '90%' },
  
  directoryContainer: { paddingHorizontal: spacing.marginMobile },
  letterSection: { marginBottom: spacing.stackLg },
  letterHeader: { borderBottomWidth: 1, borderBottomColor: colors['surface-variant'], paddingBottom: 8, marginBottom: 16 },
  letterTitle: { ...typography.headlineMd, color: colors['forest-green'] },
  
  artisanGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between' },
  artisanCard: { width: '47%', backgroundColor: colors['surface-container-lowest'], padding: 16, borderRadius: 8, shadowColor: colors['forest-green'], shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  artisanName: { ...typography.bodyLg, color: colors.charcoal, marginBottom: 4 },
  artisanCategory: { ...typography.labelMd, color: colors['on-surface-variant'] }
});
