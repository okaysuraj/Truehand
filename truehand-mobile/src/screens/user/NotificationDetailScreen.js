import api from '../../services/api';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const { width } = Dimensions.get('window');

export default function NotificationDetailScreen() {
  const navigation = useNavigation();
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Header to match the "Close" instead of "Back" flow */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={styles.rightSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/600x800' }} 
            style={styles.mainImage} 
          />
          <View style={styles.artisanTag}>
            <Ionicons name="brush-outline" size={16} color={colors.charcoal} />
            <Text style={styles.artisanTagText}>Handcrafted by Elena</Text>
          </View>
        </View>

        {/* Messaging */}
        <View style={styles.textSection}>
          <Text style={styles.title}>Your piece is finished.</Text>
          <Text style={styles.message}>
            Elena has completed the final firing of your ceramic vase. The organic glaze has settled beautifully, creating a unique texture that is entirely yours. It is now cooling and preparing for its journey to your home.
          </Text>
        </View>

        {/* Action */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Track Journey</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.primary,
  },
  rightSpacer: {
    width: 44, // Match width of iconButton to keep title centered
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 3/4,
    maxWidth: 500,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors['surface-container-lowest'],
    marginBottom: spacing.stackLg,
    position: 'relative',
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  artisanTag: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    backgroundColor: 'rgba(246, 243, 242, 0.9)', // surface-container-low/90
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
  },
  artisanTagText: {
    ...typography.labelSm,
    color: colors.charcoal,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  textSection: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  title: {
    ...typography.displayLg,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.stackLg,
  },
  message: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    lineHeight: 28,
  },
  actionSection: {
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: colors['forest-green'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 4,
    gap: 12,
    shadowColor: colors['forest-green'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  actionButtonText: {
    ...typography.labelMd,
    color: colors.surface,
  }
});
