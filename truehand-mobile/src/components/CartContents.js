import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import api from '../services/api';
import { formatValue } from '../../../shared/feature-contract';
const button = {
  borderWidth: 1,
  borderColor: '#c1c8c3',
  padding: 14,
  minHeight: 48,
};
export default function CartContents({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart, getTotal, error } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  async function save(item) {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    setBusy(true);
    setNotice('');
    try {
      await api.post(`/account/lists/saved/${item.productId ?? item.id}`);
      const removed = await removeFromCart(item.id);
      setNotice(
        removed === false
          ? 'Saved for later. The cart item could not be removed; please retry.'
          : 'Saved for later.',
      );
    } catch (failure) {
      setNotice(failure.response?.data?.error || 'Unable to save for later. Please retry.');
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
          gap: 24,
        }}
      >
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Your cart
        </Text>
        {!!error && <Text accessibilityRole="alert">{error}</Text>}
        {!!notice && <Text accessibilityLiveRegion="polite">{notice}</Text>}
        {!cartItems.length && <Text>Your cart is empty.</Text>}
        {cartItems.map((item) => (
          <View
            key={item.id}
            style={{
              gap: 12,
              borderBottomWidth: 1,
              borderColor: '#c1c8c3',
              paddingBottom: 20,
            }}
          >
            {item.imageUrl && (
              <Image
                source={{
                  uri: item.imageUrl,
                }}
                accessibilityLabel={item.name}
                style={{
                  height: 200,
                  width: '100%',
                }}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              style={button}
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  productId: item.productId ?? item.id,
                })
              }
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
            {item.sellerName && <Text>{item.sellerName}</Text>}
            {item.variantId && (
              <Text>
                {[item.size, item.color, item.variantSku || item.sku].filter(Boolean).join(' · ')}
              </Text>
            )}
            <Text>{formatValue(item.price, 'money')}</Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 16,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={button}
                disabled={busy || item.quantity <= 1}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Text>−</Text>
              </TouchableOpacity>
              <Text>Quantity {item.quantity}</Text>
              <TouchableOpacity
                style={button}
                disabled={busy || item.quantity >= Math.min(1000, item.stockQuantity)}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={button} disabled={busy} onPress={() => save(item)}>
              <Text>Save for later</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={button}
              disabled={busy}
              onPress={() => removeFromCart(item.id)}
            >
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text>Subtotal: {formatValue(getTotal(), 'money')}</Text>
        <Text>Checkout confirms the current stock, prices and total.</Text>
        <TouchableOpacity
          style={button}
          onPress={() =>
            navigation.navigate('Feature', {
              feature: 'catalog',
            })
          }
        >
          <Text>Browse products</Text>
        </TouchableOpacity>
        {cartItems.length > 0 && (
          <TouchableOpacity style={button} onPress={() => navigation.navigate('Checkout')}>
            <Text>Proceed to checkout</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
