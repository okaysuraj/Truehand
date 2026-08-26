import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

export default function PriceDropAlertsScreen() {
  const navigation = useNavigation();

  const alerts = [
    {
      id: 1,
      category: 'Ceramics',
      title: 'Hand-thrown Earth Vase',
      desc: 'A minimalist piece crafted from locally sourced clay, featuring a natural, unglazed finish that celebrates the raw material.',
      oldPrice: '$120',
      newPrice: '$85',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBasHhlwSAeE-3HDkqJPg0hnodzq0pBDUg8F7gaX44adHQmiBgGFcLaltQ9qaBugsHVIl5DpUDp_sQ5AQvR0KZqIkfCzjSPngZOSVQGBaDN2x3hmC8t5Arvt7eRdyzlixBlsx4GwJb0H17K7QG7AxNmLbGNS-MfgvXlEnBANW80tJtJaxzu7F0esUdT4NzWLRI1WrdrqN9QJg8TFBStxjntCSDu2o9qvV8nxw6yuHrk9BKqjvNLkxhmlw'
    },
    {
      id: 2,
      category: 'Leather Goods',
      title: 'Artisan Heritage Tote',
      desc: 'Vegetable-tanned full-grain leather that will develop a unique patina over time. Features solid brass hardware and meticulous hand-stitching.',
      oldPrice: '$350',
      newPrice: '$295',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo-J3V6U1X9WHaA22PbYjtXjz8T07M5xu8HvASrLAXQlSvRqwMZAMbEAg5k6x5BLfEAjqdWTnqoVtyt8j6zCE4KnWkH2mAkqs_ggwgbq4aaOKm87nO1wSHFYELlYsYM6J6txYEnX9la7BnSKpQWph4NrQLPXqcOPS0THodSa6_uZSlov695W9PFZu6ABSFIUIMylB8jIKJSESniSc2rSY67ZvnODPIKlul40-QIx1gzcA4FDXnNAqcXg'
    },
    {
      id: 3,
      category: 'Lighting',
      title: 'Forged Brass Study Lamp',
      desc: 'An elegant study in minimalism, this lamp provides focused task lighting while serving as a sculptural element in your workspace.',
      oldPrice: '$210',
      newPrice: '$175',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDScOpoEQxPygePWkbJgZhZYnCU5RIPNiVYHWmc-3yamW_WyNqK5ESfX_pswLnGjV5Di6ZQcKw6EOiABcuBVewBrZaUHSDqT195cf02-CHP77VYnsn6HwcjYCgKL3e87ViF9ZlpQha7ScZ9XYKlTNOA5BIy_NdRqtss60oReeNvGu1OMuOVN6eXY-NkpsEZNzZvHNNSsyCe-4nLYGx3Uo1PS0751PVnS2LPW-rMtxtE4oZnJmnYxBdgsw'
    }
  ];
  

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
          <Text style={styles.pageTitle}>Price Alerts</Text>
          <Text style={styles.pageSubtitle}>Items from your Saved list that have recently dropped in price.</Text>
        </View>

        <View style={styles.listContainer}>
          {alerts.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.9}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <TouchableOpacity style={styles.closeBtn}>
                    <Ionicons name="close" size={20} color={colors.outline} />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>{item.desc}</Text>
                
                <View style={styles.cardFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                    <Text style={styles.newPrice}>{item.newPrice}</Text>
                  </View>
                  <TouchableOpacity style={styles.claimBtn}>
                    <Text style={styles.claimBtnText}>Claim Offer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    backgroundColor: colors.terracotta,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  introSection: {
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: 8,
  },
  pageSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
  },
  listContainer: {
    gap: spacing.stackMd,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 8,
    padding: spacing.stackMd,
    borderWidth: 1,
    borderColor: colors['surface-container-low'],
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    gap: spacing.stackMd,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors['surface-container-low'],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: colors['surface-container-low'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    ...typography.labelSm,
    color: colors.charcoal,
  },
  closeBtn: {
    padding: 4,
    marginRight: -4,
    marginTop: -4,
  },
  itemTitle: {
    ...typography.bodyLg,
    color: colors.charcoal,
    marginBottom: 4,
    fontWeight: '500',
  },
  itemDesc: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    fontSize: 14,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  oldPrice: {
    ...typography.bodyLg,
    color: colors.outline,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    ...typography.headlineMd,
    fontSize: 20,
    color: colors.terracotta,
  },
  claimBtn: {
    backgroundColor: colors['forest-green'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  claimBtnText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});
