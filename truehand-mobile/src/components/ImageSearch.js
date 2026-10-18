import React, { useState } from 'react';
import { Text, ScrollView, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/useAuthStore';
import { choosePhotograph } from '../services/photographs';
import api from '../services/api';
import { createImageSearchHook } from '../../../shared/image-search';
import { formatValue } from '../../../shared/feature-contract';
const button = {
  borderWidth: 1,
  borderColor: '#c1c8c3',
  padding: 14,
  minHeight: 48,
};
const uploadApi = {
  get: (path, options) => api.get(path, options),
  post: (path, body) =>
    api.post(path, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};
const useImageSearch = createImageSearchHook(React, uploadApi, (file) => file);
export default function ImageSearch({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const state = useImageSearch(user?.id);
  const [error, setError] = useState('');
  async function choose(camera) {
    setError('');
    try {
      const file = await choosePhotograph(camera);
      if (file) state.select(file);
    } catch (failure) {
      setError(failure.message || 'Unable to choose photograph.');
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
        <TouchableOpacity style={button} onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Search by photograph
        </Text>
        <Text>
          Compare colour and edges with product photographs uploaded to TrueHand. JPEG, PNG and WebP
          up to 10 MB are supported.
        </Text>
        {!user ? (
          <TouchableOpacity style={button} onPress={() => navigation.navigate('Login')}>
            <Text>Sign in to search photographs</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={button} disabled={state.busy} onPress={() => choose(false)}>
              <Text>Choose photograph</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button} disabled={state.busy} onPress={() => choose(true)}>
              <Text>Take photograph</Text>
            </TouchableOpacity>
            {state.file && (
              <Image
                source={{
                  uri: state.file.uri,
                }}
                style={{
                  height: 240,
                  width: '100%',
                }}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              style={button}
              disabled={state.busy || !state.file}
              onPress={state.search}
            >
              <Text>{state.busy ? 'Searching...' : 'Find visually similar products'}</Text>
            </TouchableOpacity>
            {!!(error || state.error) && (
              <Text accessibilityRole="alert">{error || state.error}</Text>
            )}
            {state.result && (
              <>
                <Text>{state.result.method}</Text>
                {!state.result.matches.length && (
                  <Text>
                    No indexed catalog photographs matched. Try another angle or search by product
                    name.
                  </Text>
                )}
                {state.result.matches.map((match) => (
                  <View
                    key={match.productId}
                    style={{
                      gap: 12,
                    }}
                  >
                    {match.product.imageUrl && (
                      <Image
                        source={{
                          uri: match.product.imageUrl,
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
                          productId: match.productId,
                        })
                      }
                    >
                      <Text>{match.product.name}</Text>
                    </TouchableOpacity>
                    <Text>
                      {formatValue(match.product.price, 'money')} · Stock{' '}
                      {match.product.stockQuantity}
                    </Text>
                    <Text>
                      Edge difference: {match.edgeDifference}; colour difference:{' '}
                      {match.colourDifference}
                    </Text>
                  </View>
                ))}
              </>
            )}
            <TouchableOpacity
              style={button}
              onPress={() =>
                navigation.navigate('Feature', {
                  feature: 'catalog',
                })
              }
            >
              <Text>Search catalog by name</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
              }}
            >
              Previous photograph searches
            </Text>
            {state.loading && <ActivityIndicator />}
            {state.history.map((row) => (
              <Text key={row.id}>
                {formatValue(row.createdAt, 'date')} · {row.matchCount} matches
              </Text>
            ))}
            {!state.loading && !state.history.length && (
              <Text>No previous photograph searches.</Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
