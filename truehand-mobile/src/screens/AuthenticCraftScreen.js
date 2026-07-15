import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function AuthenticCraftScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['on-surface-variant']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>The Artisan's Process</Text>
          <Text style={styles.subtitle}>
            Authenticity, craftsmanship, and quiet luxury. We believe in the human touch over mass production.
          </Text>
        </View>

        {/* Story Section */}
        <View style={styles.storyCard}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSLRbRKs3sXNWD1w80IO23EkdciVLtWH-iuJFeIzUtYpICN8yg-P6dN6owfzs8pDdxtnwotVcC0zcJABM06uNKjpQ7WjrP2N78B1MXA_7GHV8sC5SyMYCMl_5KaSGbqOi8gQxGvxxXMhvdT-7sj1d4Uo7VO1vi4Oc41ZCR9XyClqNDg0TX4719Ur2XjyISUV63Z5Q1H-LKyBMl_Wy-JBNwsf07inT0P_L5scsE3SnHUYW_0sq3SjNYTQ' }} 
            style={styles.storyImage} 
          />
          <View style={styles.storyContent}>
            <Text style={styles.storyTitle}>Heritage Woodworking</Text>
            <Text style={styles.storyText}>
              Every piece of wood has a story. Our master woodworkers spend days selecting the perfect grain to ensure that the natural beauty of the timber shines through in the final piece. Hand-carved and assembled using traditional joinery.
            </Text>
          </View>
        </View>

        <View style={styles.storyCard}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAooPlOWH_gwo4VBBW45-eViZCr7kNOUMknQVnFm5XEKbVOWW1YSgR9kbMBpfs8g3-5BG1FWputcOKjUQlzh_tlkL4kfNMmFEFMJsk3mqeYX-TTGhFZrUif2Zoz_xMOw9lwFmM3mhvmGS41B0QB1sbzekivCrqPWeSTGwX9LFz5tzTkUxBUOxayApvdx_RB3rRD99n3M45zWiAk_z8Q3TAnW1qVKG22LYg0bvsZVV9RJsIqipEax6ubCg' }} 
            style={styles.storyImage} 
          />
          <View style={styles.storyContent}>
            <Text style={styles.storyTitle}>Natural Fiber Textiles</Text>
            <Text style={styles.storyText}>
              Sourced directly from organic farms, our textiles are woven by hand on traditional looms. We celebrate the natural imperfections and tactile qualities of raw linen, wool, and cotton.
            </Text>
          </View>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            When you acquire a piece from TrueHand, you are supporting an ecosystem of independent artisans preserving centuries-old techniques.
          </Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('BrandListing')}>
            <Text style={styles.primaryBtnText}>Discover Our Partners</Text>
          </TouchableOpacity>
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
  scrollContent: { padding: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  
  heroSection: { marginBottom: spacing.stackLg, marginTop: spacing.stackSm },
  title: { ...typography.displayLg, color: colors['forest-green'], marginBottom: 12, fontSize: 36 },
  subtitle: { ...typography.bodyLg, color: colors['on-surface-variant'] },
  
  storyCard: { marginBottom: spacing.stackLg, backgroundColor: colors['surface-container-lowest'], borderRadius: 12, overflow: 'hidden', shadowColor: colors['forest-green'], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  storyImage: { width: '100%', height: 250, resizeMode: 'cover' },
  storyContent: { padding: spacing.marginMobile },
  storyTitle: { ...typography.headlineMd, color: colors.charcoal, marginBottom: 8 },
  storyText: { ...typography.bodyMd, color: colors['on-surface-variant'], lineHeight: 24 },

  footerSection: { marginTop: spacing.stackMd, alignItems: 'center' },
  footerText: { ...typography.bodyLg, color: colors.charcoal, textAlign: 'center', fontStyle: 'italic', marginBottom: spacing.stackLg },
  primaryBtn: { backgroundColor: colors['forest-green'], paddingHorizontal: 32, paddingVertical: 14, borderRadius: 4, width: '100%', alignItems: 'center' },
  primaryBtnText: { ...typography.labelMd, color: colors['on-primary'], textTransform: 'uppercase', letterSpacing: 1 }
});
