import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { useArtisanStore } from '../store/useArtisanStore';

export default function AddEditProductScreen() {
  const navigation = useNavigation();
  const addProduct = useArtisanStore(state => state.addProduct);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');

  const handleSaveDraft = async () => {
    if (!productName) return;
    try {
      await addProduct({
        name: productName,
        description,
        category: 'Uncategorized',
        price: 0,
        stockQuantity: 0,
      });
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.headerBorder} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        <Text style={styles.stepTitle}>Step 1: Media & Details</Text>
        <Text style={styles.stepSubtitle}>
          Present your craftsmanship. High-quality imagery is crucial for our curated gallery.
        </Text>

        {/* Media Upload */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>Media Upload</Text>
            <Text style={styles.sectionLabelSub}>0 / 5 photos</Text>
          </View>
          
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
            <Ionicons name="image-outline" size={32} color={colors.outline} style={{ marginBottom: 8 }} />
            <Text style={styles.uploadText}>
              Tap to add images, or <Text style={styles.uploadTextLink}>browse</Text>
            </Text>
            <Text style={styles.uploadSubtext}>JPG, PNG, WebP up to 10MB. Lifestyle shots recommended.</Text>
          </TouchableOpacity>

          {/* Empty state thumbnails */}
          <View style={styles.thumbnailGrid}>
            <View style={[styles.thumbnailBox, styles.thumbnailBoxFirst]}>
              <Ionicons name="image-outline" size={24} color={colors['outline-variant']} />
            </View>
            <View style={styles.thumbnailBox} />
            <View style={styles.thumbnailBox} />
            <View style={styles.thumbnailBox} />
          </View>
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Info</Text>
          <View style={styles.sectionTitleBorder} />

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Product Name</Text>
            <TextInput 
              style={styles.textInputBorderBottom}
              placeholder="e.g. Hand-thrown Ceramic Vase"
              placeholderTextColor={colors['outline-variant']}
              value={productName}
              onChangeText={setProductName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category</Text>
            <TouchableOpacity style={styles.pickerBox}>
              <Text style={styles.pickerTextPlaceholder}>Select a category</Text>
              <Ionicons name="chevron-down" size={20} color={colors.outline} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput 
              style={styles.textArea}
              placeholder="Describe the materials, process, and inspiration behind this piece..."
              placeholderTextColor={colors['outline-variant']}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

      </ScrollView>

      {/* Bottom Action Area */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
          <Text style={styles.primaryButtonText}>Continue to Pricing</Text>
          <Ionicons name="arrow-forward" size={18} color={colors['on-primary']} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={handleSaveDraft}>
          <Text style={styles.secondaryButtonText}>Save as Draft</Text>
        </TouchableOpacity>
      </View>
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
  },
  headerBorder: {
    height: 1,
    backgroundColor: 'rgba(228, 226, 225, 0.8)', // surface-container-highest
    width: '100%',
  },
  iconButton: {
    padding: spacing.stackSm,
    width: 40,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: 160,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.stackSm,
    marginBottom: spacing.stackLg,
  },
  progressDot: {
    width: 64,
    height: 4,
    backgroundColor: colors['surface-container-highest'],
    borderRadius: 2,
  },
  progressDotActive: {
    backgroundColor: colors['forest-green'],
  },
  stepTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    textAlign: 'center',
    marginBottom: spacing.stackMd,
  },
  stepSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    marginBottom: spacing.sectionGap,
    paddingHorizontal: spacing.stackMd,
  },
  section: {
    marginBottom: spacing.sectionGap,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.stackSm,
  },
  sectionLabel: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  sectionLabelSub: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  uploadBox: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.stackMd,
  },
  uploadText: {
    ...typography.bodyMd,
    color: colors.charcoal,
    textAlign: 'center',
    marginBottom: 4,
  },
  uploadTextLink: {
    color: colors.terracotta,
    textDecorationLine: 'underline',
  },
  uploadSubtext: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  thumbnailGrid: {
    flexDirection: 'row',
    gap: spacing.stackSm,
    marginTop: spacing.stackSm,
  },
  thumbnailBox: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors['surface-container-low'],
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(114, 121, 116, 0.5)',
    borderStyle: 'dashed',
  },
  thumbnailBoxFirst: {
    backgroundColor: colors['surface-container-highest'],
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  sectionTitleBorder: {
    height: 1,
    backgroundColor: colors['surface-container-highest'],
    marginBottom: spacing.stackLg,
  },
  inputGroup: {
    marginBottom: spacing.stackMd,
  },
  inputLabel: {
    ...typography.labelSm,
    color: colors.charcoal,
    marginBottom: 4,
  },
  textInputBorderBottom: {
    width: '100%',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors['clay-outline'],
    paddingVertical: 8,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  pickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pickerTextPlaceholder: {
    ...typography.bodyMd,
    color: colors['outline-variant'],
  },
  textArea: {
    width: '100%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...typography.bodyMd,
    color: colors.charcoal,
    height: 120,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(252, 249, 248, 0.95)',
    borderTopWidth: 1,
    borderTopColor: colors['surface-container-highest'],
    padding: spacing.marginMobile,
    gap: spacing.stackSm,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
});
