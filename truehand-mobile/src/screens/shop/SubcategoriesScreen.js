import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const SUBCATEGORIES = [
  {
    id: '1',
    title: 'Earthenware',
    description: 'Celebrated for its porous nature and warm, organic tones. Pieces that bring a rustic, grounded presence to any space.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVXxpRcAWR_2BeUvoc759nksouLb2qXyKfft0EZ6Kr3wM8dlqr23K2vOz2qDBiz8XcMBF24YV8vV5G0Ql9elE-xDQu1WOrPMLygMfemb9pcU4FYaBNMTsb6u2l0aLu24f46EDEGLqlLCGpAgoZOQ3j2NtVStgZvhraSpNkHy89qeZ83qkVvk_UJrHIzB42FFxI9xUbkS_kl_E7IcxNtCUgBwnQKl-ncSwIHkUDLycxbWWNDI__yg4Ivw',
  },
  {
    id: '2',
    title: 'Stoneware',
    description: 'Fired at high temperatures for durability. Characterized by its dense, stone-like quality and subtle, earthy finishes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-yUa3SOLdNOALyO1bbhg7zdhxKpFO_sSbXTy4gxldvIpjSK5w_vtNZUSipWCwoPOmKxmzbzIx7FSVxXH3Zjn-bbsbVqMrmnlHVOq-sKIxWVx69H5NBUw5y_avJsrrxFrOiB3TRTcJbI8WiuLqSKSVRPLPn7KB6AWLryrZrLqYyJAzA8uTV_FruN2T1Z-kEuCiOvdIfntzLnAGlM2gG-itOSK0IMMPZGoWODW3G8q0bMx8_4EAhHij6Q',
  },
  {
    id: '3',
    title: 'Porcelain',
    description: 'The epitome of refinement. Known for its pure white color, delicate translucency, and incredible strength when fired.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv5O5ay5TJ_HbpW-vxgAuDJppWuERIi9m8_iHsM94h17e2evWN3n9F7mmzeDsuSUV42lEMaANB2ovtt76cCorPV85nlg92LePqqrWHE2X26pVtg01c67jLEnwnl6QOyyY94G7tKIbG10eEnmDkN2qVScXoMNs-1foWlB7qC0QYbqBpR8J7M4ivoQc6V_06Xkr34x6c8CuiCoIGDr6yffNebAhl_Qq0w_oU30CR7xt_ylZJCHcMpQl2pg',
  },
  {
    id: '4',
    title: 'Glazed Objects',
    description: 'Where alchemy meets art. Featuring unique surface treatments, from glossy reflective pools to complex, matte crystal formations.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVYOovdRbDshxnfEqB2M6awWRTffTOy21fs_dcIi_rrf0d4XTrxbWLF8afpgI4YHCcUrPCLKadr21IL--StG3euQXUlzxMNGKzyjDBQgEEabFZ7ZZONzV4Uv1Ui3OFMLgQIYi4Yrt0ZxL1g4at8K9yxXE5byRi4WLBvaNd1QKp7QJygZ9kj8cdmkVxq_HeSqR_N3nxqZP3w2Qmm1Q6_Wm1cepk8nb-LOGn4W1KiFi8SqP1KcgWpGNcyg',
  }
];

export default function SubcategoriesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const categoryTitle = route.params?.title || 'Ceramics';

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('SearchResults', { query: item.title })} // Redirect to search/products feed
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
        <View style={styles.exploreContainer}>
          <Text style={styles.exploreText}>Explore Collection</Text>
          <Ionicons name="arrow-forward" size={16} color={colors['forest-green']} />
        </View>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.charcoal} />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>TrueHand</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="bag-handle-outline" size={24} color={colors.charcoal} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={SUBCATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.pageHeader}>
            <View style={styles.breadcrumbs}>
              <Text style={styles.breadcrumbText}>Curation</Text>
              <Ionicons name="chevron-forward" size={12} color={colors['on-surface-variant']} />
              <Text style={styles.breadcrumbTextActive}>{categoryTitle}</Text>
            </View>
            <Text style={styles.pageTitle}>{categoryTitle}</Text>
            <Text style={styles.pageSubtitle}>
              Discover the tactile beauty of earth shaped by hand and fire. Our curated selection encompasses diverse techniques and traditions, each piece a testament to quiet luxury and timeless craftsmanship.
            </Text>
          </View>
        }
      />
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
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22, 52, 40, 0.05)',
  },
  brandTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
  },
  iconButton: {
    padding: spacing.stackSm,
  },
  listContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.sectionGap,
    paddingTop: spacing.stackLg,
  },
  pageHeader: {
    marginBottom: spacing.stackLg,
  },
  breadcrumbs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.stackSm,
  },
  breadcrumbText: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  breadcrumbTextActive: {
    ...typography.labelSm,
    color: colors.primary,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.primary,
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: spacing.stackMd,
    marginBottom: spacing.gutter,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
    gap: spacing.stackMd,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors['surface-container-low'],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    ...typography.headlineMd,
    color: colors.primary,
    marginBottom: 4,
    fontSize: 20,
  },
  cardDescription: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginBottom: spacing.stackMd,
    fontSize: 14,
    lineHeight: 20,
  },
  exploreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 'auto',
  },
  exploreText: {
    ...typography.labelMd,
    color: colors['forest-green'],
  }
});
