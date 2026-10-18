import React from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';
import { colors } from '../theme/theme';
import { createServiceStatusHook } from '../../../shared/service-status';
const useServiceStatus = createServiceStatusHook(React, api);
export default function ServiceStatus({ navigation }) {
  const state = useServiceStatus();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors['surface-linen'] }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
        <Text style={{ fontSize: 32, color: colors['forest-green'] }}>Service status</Text>
        {state.loading ? (
          <Text>Checking connection…</Text>
        ) : state.error ? (
          <Text accessibilityRole="alert">{state.error}</Text>
        ) : (
          <>
            <Text>
              {state.data.maintenanceMode ? 'Maintenance is enabled.' : 'Connected to TrueHand.'}
            </Text>
            {state.data.message && <Text>{state.data.message}</Text>}
          </>
        )}
        <TouchableOpacity accessibilityRole="button" disabled={state.loading} onPress={state.retry}>
          <Text>Retry connection</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Return to marketplace</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Feature', { feature: 'help' })}>
          <Text>Help</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
