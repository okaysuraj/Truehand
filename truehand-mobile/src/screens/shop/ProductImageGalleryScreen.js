import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { typography, spacing } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const MOCK_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4uJq5-0dd8TzOOGPs8z2_ZtuqVBEE91Vtf25rvL_NpkwwHu6ifKMtyJKW4EarjqaoKdm4iFporbYlwkOqp4DPTzpcBsqx70v741wik2arhZMBYlur-39NMasuys6CqGvI7iTwF5GXK-sMIg-JEPTi9EkXJCz3z2_823k0IsM28xmCtOZQCLHMMXAw242khjIsIMG0BjbfTL2M1NzXDHatKgYiIFVE3oGZd2pb8zFaBdpJzl27R5MBqQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB63IUjSdJRN-ymkofSQ5sdcnuXLNAFzgA6sjb9RfBPWclTX-pWv8UPmXrO6oKjSG-hhnRLhlOQha1DSPLHNQ_ssU9pr0L_kZM9ITCTOBQ9clXaUe-sQJZKoEapsyjCqKjqC6C7Ef9L0qdB5sYBtFrmRPzXV2ussS6vaHRRCQppxIh1OvPBy3n5Qf7QDUI8vajbYjcXLw10IA_bsyhgj9MrV8VwkZ7rN0iMvlCqXrUe_jYBTQBZwanKAA',
];

export default function ProductImageGalleryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { images = MOCK_IMAGES, initialIndex = 0, productName = 'Hand-thrown Stoneware Bowl', collectionName = 'Artisan Collection' } = route.params || {};
  
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const currentImage = images[currentIndex] || images[0];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <View style={styles.container}>
      {/* Background Layer with blurred image */}
      <View style={StyleSheet.absoluteFillObject}>
        <Image 
          source={{ uri: currentImage }} 
          style={styles.bgImage} 
          blurRadius={40}
        />
        <View style={styles.bgOverlay} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Top Action Bar */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          <FlatList
            data={images}
            keyExtractor={(_, idx) => idx.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={initialIndex}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: item }} 
                  style={styles.productImage} 
                  resizeMode="contain"
                />
              </View>
            )}
          />
          
          <View style={styles.infoContainer}>
            <Text style={styles.productTitle}>{productName}</Text>
            <Text style={styles.collectionTitle}>{collectionName}</Text>
          </View>
        </View>

        {/* Bottom Pagination */}
        <View style={styles.paginationContainer}>
          <View style={styles.dotsWrapper}>
            {images.map((_, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.dot, 
                  currentIndex === idx ? styles.dotActive : styles.dotInactive
                ]} 
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1c1c', // charcoal
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
    transform: [{ scale: 1.2 }],
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 28, 28, 0.6)', // charcoal with opacity
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.marginMobile,
    zIndex: 10,
  },
  closeBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '90%',
    height: '100%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  productTitle: {
    ...typography.headlineLgMobile,
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  collectionTitle: {
    ...typography.labelMd,
    color: '#e5e2dd', // tertiary-fixed
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    opacity: 0.8,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: spacing.marginMobile,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dotsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 8,
  },
  dot: {
    borderRadius: 5,
  },
  dotActive: {
    width: 10,
    height: 10,
    backgroundColor: '#ffffff',
  },
  dotInactive: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
