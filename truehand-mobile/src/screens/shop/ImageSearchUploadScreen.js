import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const { width } = Dimensions.get('window');

const RECENT_PHOTOS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB2MIhwGBAAxsx9n3GbSz8kDsCqJ9g0cEpvz18A8Hdcv8wF33LCHfdRU12weXVjvFiTsKB-IRiXt6ZMYwZgWIq0eZo3svd3skepPHcI1CDFn5yQvVfz74UjAESyfb-nl8uhNFrRzaUnGIi27evJw8qqh4qaDUsTrVLNRVhhG5zywFuB9FYlwJyfpkxhknAlPcPVjCq7pzeQSqKyA16zrc7SDlfJur46UJsrho-Zc_MkTbqd_6H0GMZgaA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDo_Tp95Fzh4bL2mR9f3u83dyfADiR7zvNLQHOdTyBq1Jb0TmXfzWChPnVV9xqxG1G9ysG3SXkX2muuoTHj0Aw3mxNNWVrrvR-Bx-kLQ4lyKWOGuN_3tsaOvnUcE6I-MNR-iAsw6erbksCj5kU3JWpanqfKUFf36d7EI9SzbjC7JuoNJ4cM7oUus3AUTF_jjk81Y75_SS3eB7EbJ0ikiw8vUR7E1GNudb55H6rlzEotQ3JySAi89ASM5g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBAvdiLsFDa9IKtMvUgW4IXYOrAcQvdzvS3XxkTEhvTexD01WoxVxh3T-K5AmbIXCdHmRdj-dku0uVeX3A2EQSB0VcfUqdeEFSZv1if6msWSgev0-pfgDOvfLAqVs0vtPu9YJNaRv1kC5yxdtVeAlhERDdPaNA9UmG5yLqXOdqkAS0rai9l06hJLUY6NiXVY4DE3jeMAy0IlXr_uGSFJc-QwR4xqi4nn1tg3EqeUY5P1wEAh-tjyvY8PQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCWaR3rbwUQ2Ksz03LR5txdX8LcrzY55Ww7E6NKDwaoWN-VqIup3yowA4ssMuyLB8r6s4xJMNXH1efEUTT7wqkpfHxArmuAkd8uksoUCNVgvdcmhJFK7Nguo_W7M6AbmN-KTNxCDwOdvszUUEvP0rnyNB5mAYNETmNYh6mJQaT4YbyN5mwQSJcH2bPFBrpYTXBgUATzqiMh4IOA3Md8D8AcE4g1hgBYKHeHsb5Whx9CkvPf8oN6DtMUGQ',
];

export default function ImageSearchUploadScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>TrueHand</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Image Search</Text>
          <Text style={styles.pageSubtitle}>Find similar craftsmanship by uploading an image.</Text>
        </View>

        <TouchableOpacity style={styles.uploadArea}>
          <View style={styles.iconCircle}>
            <Ionicons name="camera" size={32} color={colors['forest-green']} />
          </View>
          <Text style={styles.uploadTitle}>Upload or Take a Photo</Text>
          <Text style={styles.uploadSubtitle}>Drag and drop an image here, or click to browse your device.</Text>
          <View style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Select Image</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Photos</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {RECENT_PHOTOS.map((uri, index) => (
              <TouchableOpacity key={index} style={styles.gridItem}>
                <Image source={{ uri }} style={styles.gridImage} />
                <View style={styles.gridOverlay}>
                  <Ionicons name="search" size={24} color={colors['on-primary']} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
  },
  brandTitle: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -spacing.stackSm,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg * 2,
    paddingBottom: spacing.sectionGap,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing.stackLg * 1.5,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.primary,
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  uploadArea: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.stackLg,
    marginBottom: spacing.sectionGap,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors['surface-container-lowest'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.stackLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadTitle: {
    ...typography.labelMd,
    color: colors.primary,
    marginBottom: spacing.stackSm,
  },
  uploadSubtitle: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.stackLg,
    maxWidth: 240,
  },
  selectButton: {
    backgroundColor: colors['forest-green'],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  selectButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  recentSection: {
    width: '100%',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  recentTitle: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  viewAllText: {
    ...typography.labelSm,
    color: colors['forest-green'],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.stackMd,
  },
  gridItem: {
    width: (width - spacing.marginMobile * 2 - spacing.stackMd) / 2,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors['surface-container-low'],
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 31, 20, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
});
