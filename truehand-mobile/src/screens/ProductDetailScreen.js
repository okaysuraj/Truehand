import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { useCart } from '../services/CartProvider';
import { useAuth } from '../services/AuthProvider';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  
  // Review Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [productId]);

  const fetchData = async () => {
    try {
      const [prodRes, revRes] = await Promise.all([
        api.get(`/products/${productId}`),
        api.get(`/reviews/product/${productId}`)
      ]);
      setProduct(prodRes.data);
      setReviews(revRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      navigation.navigate('MainTabs', { screen: 'Cart' });
    }
  };

  const submitReview = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to submit a review.');
      setModalVisible(false);
      navigation.navigate('Profile');
      return;
    }
    if (!reviewComment.trim()) {
      Alert.alert('Error', 'Please enter a review comment.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/reviews', {
        productId,
        rating,
        comment: reviewComment
      });
      Alert.alert('Success', 'Review submitted successfully!');
      setModalVisible(false);
      setReviewComment('');
      setRating(5);
      fetchData(); // refresh reviews
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not submit review. Did you actually purchase this item?');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !product) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007185" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0f1111" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Image 
          source={{ uri: product.imageUrl || 'https://via.placeholder.com/400' }} 
          style={styles.image} 
          resizeMode="contain" 
        />

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.ratingRow}>
            {[1,2,3,4,5].map(star => (
              <Ionicons 
                key={star} 
                name={star <= (product.averageRating || 0) ? "star" : "star-outline"} 
                size={16} 
                color="#f0c14b" 
              />
            ))}
            <Text style={styles.ratingCount}> ({product.reviewCount || 0} reviews)</Text>
          </View>
          <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewHeaderRow}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.writeReviewBtn}>Write a Review</Text>
            </TouchableOpacity>
          </View>

          {reviews.length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet. Be the first!</Text>
          ) : (
            reviews.map(rev => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewUserRow}>
                  <Ionicons name="person-circle" size={24} color="#ccc" />
                  <Text style={styles.reviewerName}>{rev.reviewerName}</Text>
                  {rev.verifiedPurchase && (
                    <Text style={styles.verifiedBadge}>Verified Purchase</Text>
                  )}
                </View>
                <View style={styles.reviewStars}>
                  {[1,2,3,4,5].map(star => (
                    <Ionicons key={star} name={star <= rev.rating ? "star" : "star-outline"} size={14} color="#f0c14b" />
                  ))}
                </View>
                <Text style={styles.reviewComment}>{rev.comment}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}>
            <Ionicons name="remove" size={20} color="#0f1111" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.qtyBtn}>
            <Ionicons name="add" size={20} color="#0f1111" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Write Review Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            <Text style={styles.modalSubtitle}>{product.name}</Text>
            
            <View style={styles.modalStars}>
              {[1,2,3,4,5].map(star => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons name={star <= rating ? "star" : "star-outline"} size={32} color="#f0c14b" />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.modalInput}
              multiline
              numberOfLines={4}
              placeholder="What did you like or dislike?"
              value={reviewComment}
              onChangeText={setReviewComment}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalSubmit, submitting && {opacity: 0.7}]} 
                onPress={submitReview}
                disabled={submitting}
              >
                {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.modalSubmitText}>Submit</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f6f6f6',
  },
  infoContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#0f1111',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingCount: {
    color: '#007185',
    marginLeft: 5,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B12704',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  reviewsSection: {
    padding: 20,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  writeReviewBtn: {
    color: '#007185',
    fontWeight: '600',
  },
  noReviews: {
    color: '#555',
    fontStyle: 'italic',
  },
  reviewCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  reviewUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewerName: {
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#0f1111',
  },
  verifiedBadge: {
    marginLeft: 10,
    color: '#c45500',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewStars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewComment: {
    color: '#333',
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 25, // safe area padding
    alignItems: 'center',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d5d9d9',
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#f0f2f2',
  },
  qtyBtn: {
    padding: 10,
  },
  qtyText: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#FFD814',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#0f1111',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    color: '#555',
    marginBottom: 20,
  },
  modalStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancel: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#007185',
    fontWeight: 'bold',
  },
  modalSubmit: {
    flex: 1,
    backgroundColor: '#FFD814',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalSubmitText: {
    color: '#0f1111',
    fontWeight: 'bold',
  }
});
