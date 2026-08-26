import api from '../../services/api';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../theme/theme';

const { width } = Dimensions.get('window');

const Skeleton = ({ width, height, style, delay = 0 }) => {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          delay: delay,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity, delay]);
  

  return (
    <Animated.View 
      style={[
        styles.skeleton, 
        { width, height, opacity }, 
        style
      ]} 
    />
  );
};

export default function LoadingSkeletonScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color={colors['forest-green']} style={styles.iconPlaceholder} />
        <View style={styles.headerTitlePlaceholder}>
          <Skeleton width={120} height={20} />
        </View>
        <Ionicons name="bag-outline" size={24} color={colors['forest-green']} style={styles.iconPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Category Header Skeleton */}
        <View style={styles.categoryHeader}>
          <Skeleton width={200} height={32} style={styles.marginBottom} />
          <Skeleton width={160} height={16} />
        </View>

        {/* Filter/Sort Bar Skeleton */}
        <View style={styles.filterBar}>
          <View style={styles.filterLeft}>
            <Skeleton width={80} height={32} style={styles.filterChip} />
            <Skeleton width={80} height={32} style={styles.filterChip} />
          </View>
          <Skeleton width={100} height={32} />
        </View>

        {/* Product Grid Skeleton */}
        <View style={styles.grid}>
          {[1, 2, 3, 4].map((item, index) => (
            <View key={item} style={styles.gridItem}>
              <Skeleton 
                width="100%" 
                height={(width / 2 - spacing.marginMobile * 1.5) * 1.33} 
                style={styles.gridImage} 
                delay={index * 200}
              />
              <Skeleton width="80%" height={16} style={styles.gridTitle} delay={index * 200} />
              <Skeleton width="40%" height={16} delay={index * 200} />
            </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22, 52, 40, 0.05)',
  },
  iconPlaceholder: {
    opacity: 0.5,
  },
  headerTitlePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  skeleton: {
    backgroundColor: colors['surface-container-high'],
    borderRadius: 4,
  },
  marginBottom: {
    marginBottom: spacing.stackMd,
  },
  categoryHeader: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.stackLg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.2)', // outline-variant/20
    paddingBottom: spacing.stackSm,
  },
  filterLeft: {
    flexDirection: 'row',
    gap: spacing.stackSm,
  },
  filterChip: {
    borderRadius: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.stackMd,
  },
  gridItem: {
    width: (width - spacing.marginMobile * 2 - spacing.stackMd) / 2,
    alignItems: 'center',
    marginBottom: spacing.stackMd,
  },
  gridImage: {
    borderRadius: 8,
    marginBottom: spacing.stackMd,
  },
  gridTitle: {
    marginBottom: spacing.stackSm,
  }
});
