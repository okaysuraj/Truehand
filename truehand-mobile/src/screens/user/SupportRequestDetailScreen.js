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
export default function SupportRequestDetailScreen({ navigation, route }) {
  const ticketId = route.params?.ticketId;
  const validId = /^\d+$/.test(String(ticketId || ''));
  const { user, data, error, reload } = useAccountRecords(validId ? [`/support/${ticketId}`] : []);
  const ticket = data?.[0];
  return (
    <Frame navigation={navigation} title="Support request">
      <Failure error={error} reload={reload} />
      {!user && <Text>Sign in to view support requests.</Text>}
      {!validId && <Text>Select a request from your support history.</Text>}
      {validId && user && !data && !error && <Text>Loading request...</Text>}
      {ticket && (
        <>
          <Text style={{ fontSize: 24 }}>{ticket.subject}</Text>
          <Text>{ticket.requestId}</Text>
          <Text>Status: {ticket.status}</Text>
          <Text>{ticket.description}</Text>
          <Text>Updated: {ticket.lastUpdate}</Text>
          {ticket.orderId && (
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderDetail', { id: ticket.orderId })}
            >
              <Text>Related order</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </Frame>
  );
}
