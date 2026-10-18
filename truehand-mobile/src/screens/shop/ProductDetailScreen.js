import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import {
  createProductDetailHook,
  selectedProduct,
  variantLabel,
} from '../../../../shared/product-detail';
import { formatValue } from '../../../../shared/feature-contract';
const useProductDetail = createProductDetailHook(React, api);
const button = {
  borderWidth: 1,
  borderColor: '#163428',
  padding: 14,
  marginVertical: 6,
};
const input = {
  borderWidth: 1,
  borderColor: '#c1c8c3',
  padding: 12,
  marginVertical: 8,
};
export default function ProductDetailScreen({ route, navigation }) {
  const id = route.params?.productId || route.params?.id || route.params?.product?.id;
  const user = useAuthStore((state) => state.user);
  const addToCart = useCartStore((state) => state.addToCart);
  const { product, reviews, questions, gallery, recommendations, error, loading, reload } =
    useProductDetail(id, user?.id);
  const [variantId, setVariantId] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const variant = product?.variants?.find((item) => item.id === variantId);
  const stock = variant
    ? variant.stockQuantity
    : product?.variants?.length
      ? 0
      : product?.stockQuantity;
  async function mutate(action) {
    setBusy(true);
    setMessage('');
    try {
      const result = await action();
      if (result !== false) {
        setMessage('Saved.');
        reload();
      }
    } catch (failure) {
      setMessage(
        failure.response?.data?.error || failure.message || 'Unable to save. Please retry.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fcf9f8',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          gap: 16,
          paddingBottom: 60,
        }}
      >
        <TouchableOpacity style={button} onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator accessibilityLabel="Loading product" />}
        {error && (
          <View>
            <Text accessibilityRole="alert">{error}</Text>
            <TouchableOpacity style={button} onPress={reload}>
              <Text>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
        {!!message && <Text accessibilityRole="alert">{message}</Text>}
        {product && (
          <>
            {variant?.imageUrl && (
              <Image
                source={{
                  uri: variant.imageUrl,
                }}
                accessibilityLabel={variantLabel(variant)}
                style={{
                  height: 300,
                  width: '100%',
                  resizeMode: 'contain',
                }}
              />
            )}
            {gallery.map((image, index) => (
              <Image
                key={image.id ?? index}
                source={{
                  uri: image.imageUrl,
                }}
                accessibilityLabel={image.caption || product.name}
                style={{
                  height: 300,
                  width: '100%',
                  resizeMode: 'contain',
                }}
              />
            ))}
            {!gallery.length && !variant?.imageUrl && <Text>No product images provided.</Text>}
            <Text
              style={{
                fontSize: 30,
                color: '#163428',
              }}
            >
              {product.name}
            </Text>
            <Text>{product.category}</Text>
            <Text>Sold by {product.sellerName}</Text>
            <Text>
              {formatValue(Number(product.price) + Number(variant?.additionalPrice || 0), 'money')}
            </Text>
            <Text>
              Rating: {product.averageRating ?? 0} / 5 ({product.reviewCount ?? 0} reviews)
            </Text>
            <Text>{product.description}</Text>
            {!!product.variants?.length && (
              <>
                <Text>Product option</Text>
                {product.variants.map((item) => (
                  <TouchableOpacity
                    accessibilityRole="radio"
                    accessibilityState={{
                      selected: variantId === item.id,
                    }}
                    style={[
                      button,
                      variantId === item.id && {
                        backgroundColor: '#e4ebe5',
                      },
                    ]}
                    key={item.id}
                    onPress={() => {
                      setVariantId(item.id);
                      setQuantity('1');
                    }}
                  >
                    <Text>
                      {variantLabel(item)} ? {item.stockQuantity} in stock
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
            <Text>Stock: {stock ?? 0}</Text>
            <Text>Quantity</Text>
            <TextInput
              accessibilityLabel="Quantity"
              style={input}
              keyboardType="number-pad"
              value={quantity}
              onChangeText={setQuantity}
            />
            <TouchableOpacity
              style={button}
              disabled={
                busy ||
                !product.isAvailable ||
                stock < Number(quantity) ||
                Number(quantity) < 1 ||
                !Number.isInteger(Number(quantity))
              }
              onPress={() =>
                mutate(() => addToCart(selectedProduct(product, variant), Number(quantity)))
              }
            >
              <Text>Add to cart</Text>
            </TouchableOpacity>
            {user ? (
              <>
                <TouchableOpacity
                  disabled={busy}
                  style={button}
                  onPress={() =>
                    mutate(() => api.post(`/wishlist/user/${user.id}/product/${product.id}`))
                  }
                >
                  <Text>Save to wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={busy}
                  style={button}
                  onPress={() => mutate(() => api.post(`/account/lists/compare/${product.id}`))}
                >
                  <Text>Add to comparison</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={busy}
                  style={button}
                  onPress={() => mutate(() => api.post(`/account/lists/saved/${product.id}`))}
                >
                  <Text>Save for later</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={button} onPress={() => navigation.navigate('Login')}>
                <Text>Sign in to save products, ask questions, or review</Text>
              </TouchableOpacity>
            )}
            <Text
              style={{
                fontSize: 24,
              }}
            >
              Product questions
            </Text>
            {!questions.length && <Text>No questions yet.</Text>}
            {questions.map((item) => (
              <View key={item.id} style={input}>
                <Text>{item.content}</Text>
                <Text>{item.answer || 'Awaiting a seller response.'}</Text>
              </View>
            ))}
            {user && (
              <>
                <Text>Question</Text>
                <TextInput
                  style={input}
                  accessibilityLabel="Question"
                  multiline
                  maxLength={2000}
                  value={question}
                  onChangeText={setQuestion}
                />
                <TouchableOpacity
                  style={button}
                  disabled={busy || !question.trim()}
                  onPress={() =>
                    mutate(async () => {
                      await api.post(`/questions/product/${product.id}/user/${user.id}`, {
                        content: question,
                      });
                      setQuestion('');
                    })
                  }
                >
                  <Text>Ask question</Text>
                </TouchableOpacity>
              </>
            )}
            <Text
              style={{
                fontSize: 24,
              }}
            >
              Product reviews
            </Text>
            {!reviews.length && <Text>No reviews yet.</Text>}
            {reviews.map((item) => (
              <View key={item.id} style={input}>
                <Text>{item.userName}</Text>
                <Text>{item.rating} / 5</Text>
                <Text>{item.comment}</Text>
              </View>
            ))}
            {user && (
              <>
                <Text>Rating</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                  }}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <TouchableOpacity
                      key={value}
                      style={[
                        button,
                        rating === value && {
                          backgroundColor: '#e4ebe5',
                        },
                      ]}
                      accessibilityState={{
                        selected: rating === value,
                      }}
                      onPress={() => setRating(value)}
                    >
                      <Text>{value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text>Review</Text>
                <TextInput
                  style={input}
                  accessibilityLabel="Review"
                  multiline
                  maxLength={5000}
                  value={comment}
                  onChangeText={setComment}
                />
                <Text>Reviews require a completed purchase.</Text>
                <TouchableOpacity
                  style={button}
                  disabled={busy || !comment.trim()}
                  onPress={() =>
                    mutate(async () => {
                      await api.post('/reviews', {
                        productId: product.id,
                        rating,
                        comment,
                      });
                      setComment('');
                    })
                  }
                >
                  <Text>Submit review</Text>
                </TouchableOpacity>
              </>
            )}
            <Text
              style={{
                fontSize: 24,
              }}
            >
              Related products
            </Text>
            {!recommendations.length && <Text>No related products available.</Text>}
            {recommendations.map((item) => (
              <TouchableOpacity
                style={button}
                key={item.id}
                onPress={() =>
                  navigation.push('ProductDetail', {
                    productId: item.id,
                    id: item.id,
                  })
                }
              >
                <Text>
                  {item.name} ? {formatValue(item.price, 'money')}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
