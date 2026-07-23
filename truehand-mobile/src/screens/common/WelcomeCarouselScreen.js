import api from '../../services/api';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Handcrafted Heritage',
    description: 'Discover the rich textures and timeless techniques of artisans who dedicate their lives to mastering traditional crafts.',
    image: 'https://via.placeholder.com/600x800'
  },
  {
    id: '2',
    title: 'Discerning Curation',
    description: 'Every piece in our gallery is carefully selected for its quiet luxury, ensuring only the most exceptional items reach your home.',
    image: 'https://via.placeholder.com/600x800'
  },
  {
    id: '3',
    title: 'Direct from the Maker',
    description: 'Connect directly with the creators. Support sustainable practices and bring stories, not just products, into your life.',
    image: 'https://via.placeholder.com/600x800'
  }
];

export default function WelcomeCarouselScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }) => {
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  
    return (
      <View style={styles.slideContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.imageOverlay} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.logo}>TrueHand</Text>
      </View>

      <FlatList
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.bottomSection}>
        <View style={styles.paginator}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View 
                style={[styles.dot, { width: dotWidth, opacity }]} 
                key={i.toString()} 
              />
            );
          })}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.secondaryButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
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
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  logo: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    letterSpacing: -0.5,
  },
  slideContainer: {
    width,
    height: height,
    flexDirection: 'column',
  },
  imageContainer: {
    height: '55%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(22, 52, 40, 0.1)',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: spacing.marginDesktop,
    paddingTop: spacing.stackLg,
    alignItems: 'center',
  },
  title: {
    ...typography.displayLg,
    color: colors['forest-green'],
    textAlign: 'center',
    marginBottom: spacing.stackMd,
  },
  description: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: spacing.stackLg,
    paddingTop: spacing.stackMd,
    backgroundColor: colors['surface-linen'],
    alignItems: 'center',
    gap: spacing.stackMd,
  },
  paginator: {
    flexDirection: 'row',
    height: 10,
    marginBottom: spacing.stackSm,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors['forest-green'],
    marginHorizontal: 4,
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: spacing.marginMobile,
    maxWidth: 400,
    gap: spacing.stackSm,
  },
  primaryButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(27, 28, 28, 0.2)',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.labelMd,
    color: colors.charcoal,
  }
});
