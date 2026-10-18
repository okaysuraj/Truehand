import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api';
import { colors } from '../../theme/theme';
export default function OrderSuccessConfirmationScreen({ navigation, route }) {
  const id = route?.params?.id || route?.params?.orderId;
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    setOrder(null);
    setError('');
    if (!id) {
      setError('Select an order to view its confirmation.');
      return;
    }
    api
      .get('/orders/' + encodeURIComponent(id))
      .then(({ data }) => {
        if (active) setOrder(data);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.error || 'Unable to load this order.');
      });
    return () => {
      active = false;
    };
  }, [id]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors['surface-linen'] }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 20 }}>
        <Text
          style={{
            fontFamily: 'EBGaramond_500Medium',
            fontSize: 32,
            color: colors['forest-green'],
          }}
        >
          {order?.paymentStatus === 'PAID' ? 'Thank you for your order' : 'Order status'}
        </Text>
        {!!error && <Text accessibilityRole="alert">{error}</Text>}
        {!order && !error && <Text>Loading order...</Text>}
        {order && (
          <>
            <Text>Order number: {order.orderNumber}</Text>
            <Text>Payment: {order.paymentStatus}</Text>
            <Text>Status: {order.status}</Text>
            <Text>
              Total:{' '}
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                order.totalAmount,
              )}
            </Text>
            <Text>Delivery address: {order.deliveryAddress}</Text>
            <Text>
              Estimated delivery:{' '}
              {order.delivery?.estimatedDeliveryTime
                ? new Date(order.delivery.estimatedDeliveryTime).toLocaleString()
                : 'Awaiting a delivery estimate'}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OrderDetail', { id: order.id, orderId: order.id })
              }
            >
              <Text style={{ color: colors['forest-green'], textDecorationLine: 'underline' }}>
                View order details
              </Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{ color: colors['forest-green'], textDecorationLine: 'underline' }}>
            Continue shopping
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
