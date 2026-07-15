import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';;
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Handcrafted Heritage',
    description: 'Discover the rich textures and timeless techniques of artisans who dedicate their lives to mastering traditional crafts.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMlp0QzTEfq4bmggLn_4o07Ni_rYNo4Ee1QNJS9RUnqXdXaQVak7XzHYLGB445p-clnTmALeBbzj_reTxGLPk7EB7l2FrhHDMLhV3DFQ6IwZWw3DOCXAx4OqDGaq6JIQZDIY4hpfGE6gCqctvQfz4J-nBeCsYrOsLIRYDaDQsQQc8jpqp2aDJ8Y6jjqy_eai5Mv0TnIipw2xJHyLGaEevAGe9n7_ZhuyZGW3T56UmTgujeWp5Ji-DZug',
  },
  {
    id: '2',
    title: 'Discerning Curation',
    description: 'Every piece in our gallery is carefully selected for its quiet luxury, ensuring only the most exceptional items reach your home.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-a4wM8OXtQlLhGJSuB2pcYthCUoQ2UYodQkwGKpW5mJyk8TX5LB1atid4um0xGy0mNciGHm3n4kZkRZgkreXfNbqss_YIC1iBlg6extDyHsXIEXDGG6dteYJbHJsUyqRPKdGJ0Zm7aLOQ14AxmBMPi3YusQzbd4MLTLLGTAKVPqXMtyHjqGQ3VR9UeKAdULhoXf1OdFHvfr7kp767DrBPLPaF7fDNN_dqmlHrLd8NZQUFvhbVPjcfYA',
  },
  {
    id: '3',
    title: 'Direct from the Maker',
    description: 'Connect directly with the creators. Support sustainable practices and bring stories, not just products, into your life.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVSEwjFjKxij9EPsf2r3JXHYLDITgPUwY_ikc-ShWfhZ8blnaG1moa5x7Q9K2CfAJEvHZl61XHd7M--IXWzqXvy8rRGK6_F5yl5Ub91JvfS2jAsCtrsahyQ4UjyZ-mx1rW1QBAIYsWUJxlsD4U3x9pH8tCsuGSx2I1WcBKr5U4O0FQaJHtL8-dMKafaQ9RBCb29H0WBbo7zRWNwv6SzS5Z0MLJ4TlbJzVqKaKIoKQElLzK55nfar7JCA',
  }
];

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>TrueHand</Text>
      </View>
      
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfig}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index.toString()}
              style={[
                styles.dot,
                currentIndex === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
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
    top: 50,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  brandTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  carouselContainer: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.55,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(22, 52, 40, 0.1)',
  },
  textContainer: {
    paddingHorizontal: spacing.marginMobile,
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: spacing.stackLg,
    paddingTop: spacing.stackMd,
    paddingHorizontal: spacing.marginMobile,
    backgroundColor: colors['surface-linen'],
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: spacing.stackMd,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: colors['forest-green'],
  },
  dotInactive: {
    backgroundColor: 'rgba(22, 52, 40, 0.3)',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: spacing.stackSm,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors['forest-green'],
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
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
    width: '100%',
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
  },
});
