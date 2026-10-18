import React, { useState } from 'react';
import { Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import * as Crypto from 'expo-crypto';
import { useAuthStore } from '../store/useAuthStore';
import api from '../services/api';
import { createProductImportHook, importInstructions } from '../../../shared/product-import';
const button = {
  borderWidth: 1,
  borderColor: '#c1c8c3',
  padding: 14,
  minHeight: 48,
};
const uploadApi = {
  post: (path, body, options) =>
    api.post(path, body, {
      ...options,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};
const useImport = createProductImportHook(
  React,
  uploadApi,
  (file) => ({
    uri: file.uri,
    name: file.name,
    type: file.mimeType || 'text/csv',
  }),
  () => Crypto.randomUUID(),
);
export default function ProductImport({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const state = useImport(user);
  const [error, setError] = useState('');
  async function choose() {
    setError('');
    try {
      const picked = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'text/comma-separated-values', 'application/csv', 'text/plain'],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (!picked.canceled) state.select(picked.assets[0]);
    } catch (failure) {
      setError(failure.message || 'Unable to select CSV.');
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
          gap: 20,
        }}
      >
        <TouchableOpacity style={button} onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Import products
        </Text>
        {!user ? (
          <TouchableOpacity style={button} onPress={() => navigation.navigate('Login')}>
            <Text>Sign in to import products</Text>
          </TouchableOpacity>
        ) : !state.permitted ? (
          <Text>Seller access required.</Text>
        ) : (
          <>
            <Text>{importInstructions}</Text>
            <TouchableOpacity
              style={button}
              onPress={() =>
                navigation.navigate('Feature', {
                  feature: 'categories',
                })
              }
            >
              <Text>View existing categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button} disabled={state.busy} onPress={choose}>
              <Text>Choose CSV</Text>
            </TouchableOpacity>
            {state.file && (
              <>
                <Text>{state.file.name}</Text>
                <TouchableOpacity
                  style={button}
                  disabled={state.busy}
                  onPress={() => state.submit(true)}
                >
                  <Text>Validate and preview</Text>
                </TouchableOpacity>
              </>
            )}
            {!!(error || state.error) && (
              <Text accessibilityRole="alert">{error || state.error}</Text>
            )}
            {state.result?.errors?.map((failure) => (
              <Text accessibilityRole="alert" key={failure.row}>
                Row {failure.row}: {failure.error}
              </Text>
            ))}
            {state.result?.rows && (
              <>
                <Text>Validated {state.result.rows.length} products.</Text>
                {state.result.rows.map((row, index) => (
                  <Text key={index}>
                    {row.name} · {row.category} · INR {Number(row.price).toFixed(2)} · Stock{' '}
                    {row.stockQuantity}
                  </Text>
                ))}
              </>
            )}
            {state.result?.valid && state.result?.rows && (
              <TouchableOpacity
                style={button}
                disabled={state.busy}
                onPress={() => state.submit(false)}
              >
                <Text>Import validated products</Text>
              </TouchableOpacity>
            )}
            {state.result?.createdCount > 0 && (
              <Text accessibilityLiveRegion="polite">
                Imported {state.result.createdCount} products. Product IDs:{' '}
                {state.result.productIds.join(', ')}.
              </Text>
            )}
            {state.busy && <ActivityIndicator />}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
