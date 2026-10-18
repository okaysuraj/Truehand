import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useOrderStore } from '../store/useOrderStore';
import { colors } from '../theme/theme';
import { createPromoQuoteHook } from '../../../shared/promo-quote';
import { cartIdentity } from '../../../shared/cart-contract';
const usePromoQuote = createPromoQuoteHook(React, api);

const money = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value));
const addressText = (address) =>
  [address?.streetAddress, address?.city, address?.state, address?.postalCode, address?.country]
    .filter(Boolean)
    .join(', ');
function Frame({ navigation, title, children }) {
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
function Button({ children, disabled, onPress }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

export function ShippingCheckout({ navigation }) {
  const userId = useAuthStore((state) => state.user?.id);
  const address = useOrderStore((state) => state.checkoutData.address);
  const setCheckoutData = useOrderStore((state) => state.setCheckoutData);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useFocusEffect(
    useCallback(() => {
      let active = true;
      if (!userId) {
        setLoading(false);
        setError('Please sign in to check out.');
        return;
      }
      setLoading(true);
      setError('');
      api
        .get(`/addresses/user/${userId}`)
        .then(({ data }) => {
          if (!active) return;
          setAddresses(data);
          const selected =
            data.find((item) => item.id === address?.id) || data.find((item) => item.isDefault);
          setCheckoutData({ address: selected || null });
        })
        .catch((err) => {
          if (active) setError(err.response?.data?.error || 'Unable to load addresses.');
        })
        .finally(() => {
          if (active) setLoading(false);
        });
      return () => {
        active = false;
      };
    }, [userId]),
  );
  return (
    <Frame navigation={navigation} title="Shipping details">
      {loading && <ActivityIndicator color={colors['forest-green']} />}
      {!!error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
      {!userId && <Button onPress={() => navigation.navigate('Login')}>Sign in</Button>}
      {addresses.map((item) => (
        <TouchableOpacity
          accessibilityRole="radio"
          accessibilityState={{ checked: item.id === address?.id }}
          key={item.id}
          onPress={() => setCheckoutData({ address: item })}
          style={[styles.card, item.id === address?.id && styles.selected]}
        >
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.body}>{addressText(item)}</Text>
        </TouchableOpacity>
      ))}
      {!loading && userId && !addresses.length && (
        <Text style={styles.body}>Add a delivery address to continue.</Text>
      )}
      {!!userId && (
        <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
          <Text style={styles.link}>Add address</Text>
        </TouchableOpacity>
      )}
      <Button
        disabled={!address || loading || !!error}
        onPress={() => navigation.navigate('PaymentMethodSelection')}
      >
        Continue to payment
      </Button>
    </Frame>
  );
}

export function PaymentSelection({ navigation }) {
  return (
    <Frame navigation={navigation} title="Payment">
      <Text style={styles.body}>
        Enter your payment details in the secure payment sheet after reviewing your order.
      </Text>
      {!process.env.EXPO_PUBLIC_STRIPE_KEY && (
        <Text style={styles.error}>Payments are currently unavailable.</Text>
      )}
      <Button
        disabled={!process.env.EXPO_PUBLIC_STRIPE_KEY}
        onPress={() => navigation.navigate('OrderSummary')}
      >
        Review order
      </Button>
    </Frame>
  );
}

export function OrderReview({ navigation }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const cartItems = useCartStore((state) => state.cartItems);
  const address = useOrderStore((state) => state.checkoutData.address);
  const currentOrder = useOrderStore((state) => state.currentOrder);
  const userId = useAuthStore((state) => state.user?.id);
  const promo = usePromoQuote(userId, cartItems);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const pay = async () => {
    if (paying) return;
    setPaying(true);
    setError('');
    try {
      if (!currentOrder || currentOrder.paymentStatus !== 'PENDING')
        useOrderStore.getState().setCheckoutData({ promoCode: promo.quote?.code || null });
      const order = await useOrderStore.getState().createOrder();
      const latest = (await api.get(`/orders/${order.id}`)).data;
      if (latest.paymentStatus !== 'PAID') {
        const intent = (await api.post('/payment/create-intent', { orderId: order.id })).data;
        const initialized = await initPaymentSheet({
          merchantDisplayName: 'TrueHand',
          paymentIntentClientSecret: intent.clientSecret,
          allowsDelayedPaymentMethods: false,
        });
        if (initialized.error) throw new Error(initialized.error.message);
        const presented = await presentPaymentSheet();
        if (presented.error) {
          if (presented.error.code === 'Canceled') return;
          throw new Error(presented.error.message);
        }
      }
      const confirmed = (await api.post(`/payment/orders/${order.id}/confirm`)).data;
      if (confirmed.paymentStatus !== 'PAID')
        throw new Error('Payment verification is pending. Please retry.');
      await useOrderStore.getState().completeCheckout(confirmed);
      navigation.replace('OrderSuccessConfirmation', { id: confirmed.id });
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Unable to complete checkout.');
    } finally {
      setPaying(false);
    }
  };
  return (
    <Frame navigation={navigation} title="Review order">
      {!!error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
      {(currentOrder?.paymentStatus === 'PENDING' ? currentOrder.orderItems : cartItems).map(
        (item) => (
          <View style={styles.card} key={cartIdentity(item)}>
            <Text style={styles.label}>{item.productName || item.name}</Text>
            <Text style={styles.body}>
              {item.quantity} × {money(item.priceAtPurchase ?? item.price)}
            </Text>
          </View>
        ),
      )}
      <Text style={styles.label}>Delivery address</Text>
      <Text style={styles.body}>{addressText(address) || 'Select a saved address.'}</Text>
      {currentOrder && (
        <Text style={styles.total}>Order total: {money(currentOrder.totalAmount)}</Text>
      )}
      {!currentOrder && (
        <Text style={styles.body}>
          The payment sheet will show the current total calculated by TrueHand.
        </Text>
      )}
      {currentOrder?.paymentStatus !== 'PENDING' && (
        <View style={styles.card}>
          <Text style={styles.label}>Promo code</Text>
          <TextInput
            accessibilityLabel="Promo code"
            style={styles.card}
            value={promo.code}
            editable={!promo.busy && !paying}
            maxLength={50}
            autoCapitalize="characters"
            onChangeText={promo.setCode}
          />
          <Button disabled={promo.busy || paying || !promo.code.trim()} onPress={promo.apply}>
            {promo.busy ? 'Checking offer…' : 'Apply offer'}
          </Button>
          {!!promo.error && (
            <Text accessibilityRole="alert" style={styles.error}>
              {promo.error}
            </Text>
          )}
          {promo.quote && (
            <Text style={styles.body}>
              Offer checked. Discount: {money(promo.discount)}. Final pricing appears in the payment
              sheet.
            </Text>
          )}
        </View>
      )}
      <Button
        disabled={
          paying ||
          !address ||
          (!cartItems.length && currentOrder?.paymentStatus !== 'PENDING') ||
          !process.env.EXPO_PUBLIC_STRIPE_KEY
        }
        onPress={pay}
      >
        {paying ? 'Processing…' : 'Pay securely'}
      </Button>
      {currentOrder?.paymentStatus === 'PENDING' && (
        <Button
          disabled={paying}
          onPress={async () => {
            try {
              await useOrderStore.getState().cancelCheckout();
            } catch (err) {
              setError(err.response?.data?.error || err.message);
            }
          }}
        >
          Cancel reserved order
        </Button>
      )}
    </Frame>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors['surface-linen'] },
  content: { padding: 24, gap: 16 },
  title: {
    fontFamily: 'EBGaramond_500Medium',
    fontSize: 32,
    color: colors['forest-green'],
    marginVertical: 16,
  },
  label: { fontFamily: 'HankenGrotesk_600SemiBold', fontSize: 16, color: colors.charcoal },
  body: {
    fontFamily: 'HankenGrotesk_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.charcoal,
  },
  card: { padding: 16, borderWidth: 1, borderColor: colors.outline, borderRadius: 8, gap: 8 },
  selected: { borderColor: colors['forest-green'], borderWidth: 2 },
  button: {
    backgroundColor: colors['forest-green'],
    padding: 18,
    borderRadius: 4,
    alignItems: 'center',
  },
  disabled: { opacity: 0.5 },
  buttonText: { fontFamily: 'HankenGrotesk_600SemiBold', color: '#fff', fontSize: 16 },
  link: { color: colors['forest-green'], fontSize: 16, paddingVertical: 8 },
  error: { color: colors['error-red'], fontSize: 16 },
  total: { color: colors['forest-green'], fontSize: 24, fontFamily: 'EBGaramond_500Medium' },
});
