import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import api from '../services/api';
import { useCart } from '../services/CartProvider';
import { useAuth } from '../services/AuthProvider';
import { Ionicons } from '@expo/vector-icons';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { cartItems, getTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(user?.address || '');

  const fetchPaymentSheetParams = async () => {
    const response = await api.post('/payment/create-intent', {
      amount: getTotal(),
      currency: 'inr'
    });
    return response.data;
  };

  const openPaymentSheet = async () => {
    if (!address) {
      Alert.alert('Address Required', 'Please enter your delivery address.');
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty.');
      return;
    }

    setLoading(true);
    try {
      // 1. Fetch Intent Client Secret from backend
      const { clientSecret } = await fetchPaymentSheetParams();

      // 2. Initialize the Payment Sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'TrueHand',
        paymentIntentClientSecret: clientSecret,
        defaultBillingDetails: {
          name: user ? `${user.firstName} ${user.lastName}` : 'Guest User',
        },
        returnURL: 'truehand://stripe-redirect', // Required for some local payment methods
      });

      if (initError) {
        Alert.alert('Initialization Error', initError.message);
        setLoading(false);
        return;
      }

      // 3. Present the Payment Sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        // User cancelled or payment failed
        if (presentError.code !== 'Canceled') {
          Alert.alert('Payment Error', presentError.message);
        }
      } else {
        // 4. Payment Succeeded, Create Order
        const orderData = {
          totalAmount: getTotal(),
          deliveryAddress: address,
          paymentStatus: 'PAID',
          status: 'CONFIRMED'
        };
        const res = await api.post('/orders', orderData);
        
        clearCart();
        Alert.alert('Success', 'Your order is confirmed!');
        navigation.navigate('Tracking', { id: res.data.id });
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0f1111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Delivery Address</Text>
          <TextInput
            style={styles.addressInput}
            multiline
            numberOfLines={3}
            placeholder="Enter your full delivery address"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.summaryItem}>
              <Text style={styles.summaryItemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.summaryItemPrice}>{item.quantity} x ${Number(item.price).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Order Total:</Text>
            <Text style={styles.totalValue}>${getTotal().toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Payment</Text>
          <Text style={styles.paymentInfo}>
            TrueHand uses Stripe for secure, encrypted payments. You can use any major credit card.
          </Text>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.checkoutBtn, loading && styles.checkoutBtnDisabled]} 
          onPress={openPaymentSheet}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0f1111" />
          ) : (
            <Text style={styles.checkoutBtnText}>Pay Securely with Stripe</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eaeded',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backBtn: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  content: {
    padding: 15,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f1111',
    marginBottom: 15,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    height: 100,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryItemName: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginRight: 10,
  },
  summaryItemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B12704',
  },
  paymentInfo: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  checkoutBtn: {
    backgroundColor: '#FFD814',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutBtnDisabled: {
    opacity: 0.7,
  },
  checkoutBtnText: {
    color: '#0f1111',
    fontWeight: 'bold',
    fontSize: 18,
  }
});
