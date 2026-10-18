import React from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { useOrderStore } from '../../store/useOrderStore';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';
import { colors } from '../../theme/theme';
import { createOrderDetailHook } from '../../../../shared/order-detail';
import { formatValue } from '../../../../shared/feature-contract';
const useOrderDetail = createOrderDetailHook(React, api);
export default function OrderDetailScreen({ navigation, route }) {
  const id = route?.params?.id || route?.params?.orderId;
  const userId = useAuthStore((state) => state.user?.id);
  const focused = useIsFocused();
  const detail = useOrderDetail(id, userId, focused);
  const order = detail.order;
  const cancel = () =>
    Alert.alert('Cancel this unpaid order?', 'Reserved stock will be released.', [
      {
        text: 'Keep order',
        style: 'cancel',
      },
      {
        text: 'Cancel order',
        onPress: detail.cancel,
      },
    ]);
  const resume = () => {
    const current = detail.resumeOrder();
    if (!current) return;
    useOrderStore.setState({
      currentOrder: current,
      checkoutData: {
        address: {
          id: current.addressId,
          streetAddress: current.deliveryAddress,
        },
        resume: true,
      },
    });
    navigation.navigate('OrderSummary');
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors['surface-linen'],
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          gap: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'EBGaramond_500Medium',
            fontSize: 32,
            color: colors['forest-green'],
          }}
        >
          Order details
        </Text>
        {detail.loading && <ActivityIndicator />}
        {!!detail.error && (
          <View>
            <Text accessibilityRole="alert">{detail.error}</Text>
            <TouchableOpacity onPress={detail.retry}>
              <Text>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
        {order && (
          <>
            <Text>{order.orderNumber}</Text>
            <Text>Placed: {formatValue(order.createdAt, 'date')}</Text>
            <Text>Status: {order.status}</Text>
            <Text>Payment: {order.paymentStatus}</Text>
            <Text>Delivery address: {order.deliveryAddress}</Text>
            {order.orderItems?.map((item) => (
              <View
                key={item.id}
                style={{
                  borderBottomWidth: 1,
                  borderColor: colors.outline,
                  paddingVertical: 16,
                  gap: 12,
                }}
              >
                {!!item.imageUrl && (
                  <Image
                    style={{
                      width: 96,
                      height: 96,
                    }}
                    source={{
                      uri: item.imageUrl,
                    }}
                    accessibilityLabel={item.productName}
                  />
                )}
                <Text>{item.productName}</Text>
                {!!item.variantSku && <Text>Purchased SKU: {item.variantSku}</Text>}
                {!!item.variantDescription && (
                  <Text>Purchased options: {item.variantDescription}</Text>
                )}
                <Text>
                  {item.quantity} x {formatValue(item.priceAtPurchase, 'money')}
                </Text>
                {Number(item.discountAmount) > 0 && (
                  <Text>Line discount: {formatValue(item.discountAmount, 'money')}</Text>
                )}
              </View>
            ))}
            <Text>Total: {formatValue(order.totalAmount, 'money')}</Text>
            <Text>
              Estimated delivery:{' '}
              {order.delivery?.estimatedDeliveryTime
                ? formatValue(order.delivery.estimatedDeliveryTime, 'date')
                : 'Awaiting a delivery estimate'}
            </Text>
            {detail.canResume && (
              <>
                <TouchableOpacity disabled={detail.busy} onPress={resume}>
                  <Text>Complete payment</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={detail.busy} onPress={cancel}>
                  <Text>Cancel unpaid order</Text>
                </TouchableOpacity>
              </>
            )}
            {order.paymentStatus === 'PAID' && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Tracking', {
                    id: order.id,
                  })
                }
              >
                <Text>Delivery tracking</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Feature', {
                  feature: 'order-tax-documents',
                  orderId: order.id,
                })
              }
            >
              <Text>Issued invoices</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
