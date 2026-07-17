import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function BackInStockAlertsScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Ionicons name="bag-handle-outline" size={24} color={colors['forest-green']} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.introSection}>
          <View style={styles.badgeLabel}>
            <Text style={styles.badgeText}>RESTOCKED</Text>
          </View>
          <Text style={styles.pageTitle}>Returned to the Gallery</Text>
          <Text style={styles.pageSubtitle}>
            Highly anticipated artisan pieces, now available again in strictly limited quantities. Secure these unique works before they return to the archives.
          </Text>
        </View>

        <View style={styles.gridContainer}>
          {/* Main Item */}
          <TouchableOpacity style={styles.mainCard} activeOpacity={0.9}>
            <View style={styles.mainImageContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEa3CPbNbOdnx_Ly7qyLutvuGlxy8WPdTPhDAV5R302a-DPJ2WJVyaa5xnjKZfKvAK3Ro2yZuGRcxjSac3KrWWjvtHZjZg-mF403bs1i34LhsMO48EIk0UUtCvVGlT5UoXmbM30mGrtbPaDExxl-K4GNgy57MleixtHu6IHKVFchabpqtXFEV8Mn-WL9q_Pua-3QCOGPKsg8s6m6-URKcRxDCKLh-6XloVNzHPtz2y02FMJ1vka-r5hA' }} 
                style={styles.mainImage}
              />
              <View style={styles.tagOverlay}>
                <View style={styles.tagRestocked}>
                  <Ionicons name="sparkles" size={14} color={colors.charcoal} />
                  <Text style={styles.tagText}>Restocked</Text>
                </View>
                <View style={styles.tagLimited}>
                  <Text style={styles.tagTextLimited}>Only 2 Left</Text>
                </View>
              </View>
            </View>
            <View style={styles.mainCardDetails}>
              <View style={{ flex: 1 }}>
                <Text style={styles.mainCardTitle}>Kyoto Ribbed Vessel</Text>
                <Text style={styles.mainCardDesc}>Hand-thrown Stoneware, Ash Glaze</Text>
                <Text style={styles.mainCardPrice}>$340</Text>
              </View>
              <TouchableOpacity style={styles.purchaseBtn}>
                <Text style={styles.purchaseBtnText}>Purchase Now</Text>
                <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Secondary Items */}
          <View style={styles.secondaryGrid}>
            <TouchableOpacity style={styles.secondaryCard} activeOpacity={0.9}>
              <View style={styles.secondaryImageContainer}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUSYwKqk1ojeRvgj9HfoUjRRfkAmTsqKrfBT5Okatwc1PnLKt8T7QRztIoz1J_QuTYCcK26GA9WN0lkXikDvGwqoMSwdTvhU1DRHpQjodxgAfulbJSDZJGRomBlZMjAA8uQBuGHAsfEVvx8ApmCTFWCRdXuZ3LN-0msmclRU51jiIvYr-9iL-cqyhGK1n3tErCqi9DSkWs40fOH2yL4XEbVcw75tC9GLilDXhSufuKFZGyjx792-UH5Q' }}
                  style={styles.secondaryImage}
                />
                <View style={styles.tagSmallOverlay}>
                  <View style={styles.tagRestockedSmall}>
                    <Text style={styles.tagTextSmall}>Restocked</Text>
                  </View>
                </View>
              </View>
              <View style={styles.secondaryCardDetails}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.secondaryCardTitle}>Walnut Edge Board</Text>
                  <Text style={styles.secondaryCardPrice}>$185</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                  <Ionicons name="bag-handle-outline" size={20} color={colors['forest-green']} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryCard} activeOpacity={0.9}>
              <View style={styles.secondaryImageContainer}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWq7TzIIIXMLhj2PedqmIH5AmMQ95F3lDfEDVA6raGshRa-_9VRBLZ6zALr961SeOWNOkgyNaNzlpa3N3D2FQUJ0GCb9YGHo5gGLK_X1nMsKvN9oPx5CIWfcwvyTvGnkB-5jc08W4lrPeRbMpL8dXZy6Vvv3KEYaCxoiybeJh8CxONryKb6iiiGRvYY-n7PfAuzalZzXUE9GLJAd7p_VfGja7L840eYQ-vLdneNFLFfJLTdps1eK2Y4Q' }}
                  style={styles.secondaryImage}
                />
                <View style={styles.tagSmallOverlay}>
                  <View style={styles.tagRestockedSmall}>
                    <Text style={styles.tagTextSmall}>Restocked</Text>
                  </View>
                </View>
                <View style={styles.tagDemandOverlay}>
                  <View style={styles.tagHighDemand}>
                    <Text style={styles.tagTextDemand}>High Demand</Text>
                  </View>
                </View>
              </View>
              <View style={styles.secondaryCardDetails}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.secondaryCardTitle}>Aureole Pendant</Text>
                  <Text style={styles.secondaryCardPrice}>$520</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                  <Ionicons name="bag-handle-outline" size={20} color={colors['forest-green']} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  backButton: {
    padding: 8,
    marginHorizontal: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  headerRight: {
    padding: 8,
    marginHorizontal: -8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  badgeLabel: {
    backgroundColor: 'rgba(255, 181, 156, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 16,
  },
  badgeText: {
    ...typography.labelMd,
    color: colors.secondary,
    letterSpacing: 1,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: 16,
    textAlign: 'center',
  },
  pageSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  gridContainer: {
    gap: spacing.stackLg,
  },
  mainCard: {
    gap: 16,
  },
  mainImageContainer: {
    width: '100%',
    height: 400,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors['surface-container-low'],
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  tagOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  tagRestocked: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
  },
  tagText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  tagLimited: {
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
  },
  tagTextLimited: {
    ...typography.labelSm,
    color: colors.secondary,
  },
  mainCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mainCardTitle: {
    ...typography.headlineLgMobile,
    fontSize: 24,
    color: colors['forest-green'],
    marginBottom: 4,
  },
  mainCardDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginBottom: 8,
  },
  mainCardPrice: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  purchaseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors['forest-green'],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  purchaseBtnText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  secondaryCard: {
    width: '47%',
    gap: 12,
    marginBottom: 16,
  },
  secondaryImageContainer: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors['surface-container-low'],
  },
  secondaryImage: {
    width: '100%',
    height: '100%',
  },
  tagSmallOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  tagRestockedSmall: {
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
  },
  tagTextSmall: {
    ...typography.labelSm,
    color: colors.charcoal,
    fontSize: 10,
  },
  tagDemandOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  tagHighDemand: {
    backgroundColor: 'rgba(255, 219, 207, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagTextDemand: {
    ...typography.labelSm,
    color: colors.secondary,
    fontSize: 10,
  },
  secondaryCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  secondaryCardTitle: {
    ...typography.headlineMd,
    fontSize: 20,
    color: colors['forest-green'],
    marginBottom: 4,
  },
  secondaryCardPrice: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  addBtn: {
    padding: 6,
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    borderRadius: 4,
  },
});
