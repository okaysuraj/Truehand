import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - spacing.marginMobile * 2 - spacing.gutter) / 2;

const CATEGORIES = [
  {
    id: '1',
    title: 'Ceramics',
    subtitle: 'Earthenware & Stoneware',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3bxjRJo-URsNVY3ocM1JSEzcue8k3JfUmpsy9M_c9tuxCQpTwUOrBwHDHydfY9ttULPhZGAS2lrBXPJOmKGcJTpNuEjCiOuf574u4OQKGNhi50kCXOnk0LgB_ZT0dVMeO9kVeoovjH-ZYyk1etzI8vvggOg39Ytsz2ts0DAYzQTLKh-b36NkclaOUTv4XGXny7oggOZzk9BMhlSj0F0Bqc-vwbUU43GrfqBwDUiYZP0mGVCN2z6krKQ',
    offset: false,
  },
  {
    id: '2',
    title: 'Woodwork',
    subtitle: 'Carved & Turned Objects',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjhFadZhQlQfS7zHvYjS1c0pnMqPwJEZJhCm4QqGDT0lqhYdvCjkhkTcNeoJ9fVe9FYCDndvZuQyd7KHTPinUh-hHNvViEfpe_1640AlGKIxSK1CKYTk82UXaLbOCm4kB2Ytsy1kCo7_dyj7rhT-42I29AMclSwF7dPLxprpfuAS7YxQDQ24rjj3DMcEw_3hHEfWqxOl2RZOJx3rCDuj_hT04rSEguwmaqKo-_AaBFDGvL3KL4J0eGzA',
    offset: true,
  },
  {
    id: '3',
    title: 'Textiles',
    subtitle: 'Woven & Dyed Fabrics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp310W7oO8jsJuq5NaLmCJqJJPzW_nx8tfu5uk_jQpITOtWRW4nAygiSfI_c5kawjZv1hVHPB1qH4VvtyMcRd_c5Hw6RLYMW46MQISdHAlUlgtd-EA8PK2NJIYYVNb22GBZV6C9BMd2i2pIhLNPL7nlzmBehqTGkuwxaqtE4-_AdMBhtqOVUexJbCoOrJkEreXMKia7zd9zj_YIMYtc9ec6NQk2ofxRPrkHTqU4ZC8Y_mNF72gED68Gw',
    offset: false,
  },
  {
    id: '4',
    title: 'Glassware',
    subtitle: 'Blown & Cast Forms',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB74K6ukZVIB8IkNA4V40ZBL0nRZEr_1JuvC451p_61hNOKno7LmV13ng1c1of-7ET1dTZ5QeZ9T__5lu2CgHPNg3LauibR1boTqwztwjSDxo-6gAOxlOpDz4u0Vs7f6bI9R1L7Kn3XN8LriQi0mjOZMHZWcuCdSMgvMsjuiJbFn-Pgfa22P34FnZFgtpfg445p0WLAx4YEKNb3lW7erC6ep11GF-lpFhFqCT1wWXvb99aMeA1eoxtWOA',
    offset: true,
  }
];

export default function CategoryGridScreen() {
  const navigation = useNavigation();

  const renderCategoryItem = ({ item }) => {
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  
    return (
      <TouchableOpacity 
        style={[styles.cardContainer, item.offset && styles.cardOffset]}
        onPress={() => navigation.navigate('CategoryListing', { categoryId: item.id, title: item.title })}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          <View style={styles.imageOverlay} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>TrueHand</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="bag-handle-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Curated Disciplines</Text>
            <Text style={styles.pageSubtitle}>
              Explore our collection of handcrafted pieces, thoughtfully categorized by the materials and techniques that bring them to life.
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
    color: colors['forest-green'],
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
    alignItems: 'center',
  },
  pageTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    maxWidth: 320,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.stackLg,
  },
  cardContainer: {
    width: ITEM_WIDTH,
  },
  cardOffset: {
    marginTop: spacing.stackLg * 1.5,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors['surface-container-low'],
    marginBottom: spacing.stackSm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  textContainer: {
    alignItems: 'center',
  },
  cardTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    opacity: 0.8,
  }
});
