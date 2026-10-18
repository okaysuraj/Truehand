import React from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAccountRecords from '../../hooks/useAccountRecords';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';
import { colors } from '../../theme/theme';
function Frame({ navigation, title, children }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors['surface-linen'] }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 24, gap: 20 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 32, color: colors['forest-green'] }}>{title}</Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
function Failure({ error, reload }) {
  return error ? (
    <View>
      <Text accessibilityRole="alert">{error}</Text>
      <TouchableOpacity onPress={reload}>
        <Text>Retry</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}
export default function SellerDashboardScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const { data, error, reload } = useAccountRecords([`/seller/${user?.id}/stats`]);
  return (
    <Frame navigation={navigation} title="Your seller dashboard">
      <Failure error={error} reload={reload} />
      {!data && !error && <Text>Loading dashboard...</Text>}
      {data && (
        <>
          <Text>Paid order revenue: INR {Number(data[0].totalRevenue).toFixed(2)}</Text>
          <Text>Active orders: {data[0].activeOrders}</Text>
          <Text>Listings: {data[0].totalProducts}</Text>
        </>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('IncomingOrders')}>
        <Text>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('InventoryManagement')}>
        <Text>Inventory</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
        <Text>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RequestPayout')}>
        <Text>Payouts</Text>
      </TouchableOpacity>
    </Frame>
  );
}
