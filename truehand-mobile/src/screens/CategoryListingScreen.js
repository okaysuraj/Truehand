import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const COLLECTIONS = [
  {
    id: '1',
    title: 'Furniture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi1YIQ8Ev38DHGNTw79uWPiy_iZDfv1xeuWGZlpDkO6FojyZfGWSmfX43nOZAR-08jDhpGQC-BOAMeXVF6hw9s3ex5u9FH3yE7g93v2CAgjr0HLVRl6BnIFXpdNfcyGlkSjPk4xgsrnliGQb2fPPaDiMAwjWH8GNMPgX1k8UYiuPK6s4XemLBD2i7PdIziUnJ7AsT_yBK7FV9olP_vh41AF0bpDQmBnJJisqF6pOVTq85U6s32GM8Ycw',
    height: 240,
  },
  {
    id: '2',
    title: 'Tableware',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJTYV3RXOKqpvUhuHVEvHqi4hbx3MRiWJcL-xkR4_Lcfw0d_K_StphETLaFHjVnwgc9LpT_JLxKECyqqLddQeu4VX5GxcFPa56ZUtH82L7NN4S4tPQKa91AYWpRXttKTyHNawmMdd5824j5VodALHtZ6vcnmdieG9QGQ3MK8hbMGrx8VlKGHhMCNbcjaroToQJxGahbz8zj1u7AQCs5ehnk9_vIeLmBw0U7nFVE4EjPoPJCXXWkUnEwA',
    height: 180,
  },
  {
    id: '3',
    title: 'Decor',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwOxhhMEFvFl6uDNcFXG5ntNDYb0nFnfNikla124vu7y1dmpL5JAl6y6LpsoE0oIFN1kos3midW6g1a2CC8nfo7805BqCuiac0ajvMnlnIqmiwvHs_cIOqbqlgKotd3oSNy_m9d4Ku4V_U8cAqk-z9vc9V7EoQHP3oSwyGBd-QJ4VvVsYlZ0B46vnIZhR-a4rlcGCeNJyv6Y2rltuo_3q6AaoZX1JZc67nqLj7vuqVkGv9AsyENynsBQ',
    height: 200,
  },
  {
    id: '4',
    title: 'Lighting',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAO5a-leaNvDcX88iSD2JYpXIuqhht37u-6AihzNi8LessoRjQL8hvJPwAHb7GzWEXvg1xFaY-JFjw8V7bB363XUzByvkg5o7KoNTw3rax2KonZOOOehh7ta9HaBW4V5iJWvmaXq6GPjdRIhn0vqjyJvjpcz_TfoM27yI2YLnaxcP0IWwYB1WXd8Zt8uNcOVgHu8mlcXuJ0CiuV7eotpRCumvtrPVCO_uSbjX0UA5n10F2yvDClQxuwA',
    height: 200,
  }
];

export default function CategoryListingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const title = route.params?.title || 'Home & Living';

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { height: item.height }]}
      onPress={() => navigation.navigate('Subcategories', { categoryId: item.id, title: item.title })}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.gradientOverlay}>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.exploreContainer}>
            <Text style={styles.exploreText}>EXPLORE COLLECTION</Text>
            <Ionicons name="arrow-forward" size={14} color={colors['on-primary']} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

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
        data={COLLECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>{title}</Text>
            <Text style={styles.pageSubtitle}>
              Curated pieces that bring quiet luxury and tactile warmth to your everyday spaces.
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
    marginBottom: spacing.sectionGap,
    alignItems: 'center',
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors.charcoal,
    marginBottom: spacing.stackMd,
    textAlign: 'center',
  },
  pageSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    maxWidth: 320,
  },
  card: {
    width: '100%',
    marginBottom: spacing.gutter,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors['surface-container-lowest'],
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 28, 28, 0.4)', // Simplified gradient effect
    justifyContent: 'flex-end',
    padding: spacing.stackLg,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  cardTitle: {
    ...typography.headlineMd,
    color: colors['on-primary'],
    marginBottom: spacing.stackSm,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  exploreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exploreText: {
    ...typography.labelMd,
    color: colors['on-primary'],
    letterSpacing: 1.5,
    fontSize: 12,
  }
});
