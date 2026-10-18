import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';
import { useAuthStore } from '../store/useAuthStore';
import api from '../services/api';
import { createCatalogAssistanceHook } from '../../../shared/catalog-assistance';
import { formatValue } from '../../../shared/feature-contract';
const button = {
  borderWidth: 1,
  borderColor: '#c1c8c3',
  padding: 14,
  minHeight: 48,
};
const useAssistance = createCatalogAssistanceHook(React, api, () => Crypto.randomUUID());
export default function CatalogAssistance({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const state = useAssistance(user?.id);
  const [question, setQuestion] = useState('');
  const [search, setSearch] = useState('');
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
        <TouchableOpacity style={button} onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Catalog assistant
        </Text>
        <Text>
          Find products using catalog names, descriptions and your budget. Results come from
          available database records.
        </Text>
        {!user ? (
          <TouchableOpacity style={button} onPress={() => navigation.navigate('Login')}>
            <Text>Sign in to continue</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text>What are you looking for?</Text>
            <TextInput
              accessibilityLabel="What are you looking for?"
              style={button}
              multiline
              maxLength={1000}
              value={question}
              onChangeText={setQuestion}
            />
            <Text>Exact search terms (optional)</Text>
            <TextInput
              accessibilityLabel="Exact search terms (optional)"
              style={button}
              maxLength={200}
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity
              style={button}
              disabled={state.busy || !question.trim()}
              onPress={() => state.ask(question, search)}
            >
              <Text>Search catalog</Text>
            </TouchableOpacity>
            {!!state.error && (
              <>
                <Text accessibilityRole="alert">{state.error}</Text>
                <TouchableOpacity style={button} onPress={state.retry}>
                  <Text>Retry</Text>
                </TouchableOpacity>
              </>
            )}
            {state.loading && <ActivityIndicator />}
            {state.reply && (
              <View
                style={{
                  gap: 16,
                }}
              >
                <Text>Catalog query: {state.reply.catalogQuery}</Text>
                <Text>{state.reply.response}</Text>
                {state.reply.products.map((product) => (
                  <View
                    key={product.id}
                    style={{
                      gap: 12,
                    }}
                  >
                    {product.imageUrl && (
                      <Image
                        source={{
                          uri: product.imageUrl,
                        }}
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
                          productId: product.id,
                        })
                      }
                    >
                      <Text>{product.name}</Text>
                    </TouchableOpacity>
                    <Text>
                      {formatValue(product.price, 'money')} · Stock {product.stockQuantity}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={button}
              onPress={() =>
                navigation.navigate('Feature', {
                  feature: 'support',
                })
              }
            >
              <Text>Contact support</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
              }}
            >
              Previous requests
            </Text>
            {state.history.map((row) => (
              <View
                key={row.id}
                style={{
                  gap: 8,
                }}
              >
                <Text>{row.question}</Text>
                <Text>Catalog query: {row.catalogQuery}</Text>
                <Text>{row.response}</Text>
                <Text>{formatValue(row.createdAt, 'date')}</Text>
              </View>
            ))}
            {!state.loading && !state.history.length && <Text>No requests yet.</Text>}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
