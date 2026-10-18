import React, { useEffect, useState } from 'react';
import { Text, TextInput, ScrollView, TouchableOpacity, AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { nativeVoiceRecognition } from '../services/voice-recognition';
import { createVoiceSearchHook } from '../../../shared/voice-search';
const button = {
  borderWidth: 1,
  borderColor: '#c1c8c3',
  padding: 14,
  minHeight: 48,
};
const useVoiceSearch = createVoiceSearchHook(React, nativeVoiceRecognition);
export default function VoiceSearch({ navigation }) {
  const focused = useIsFocused();
  const [foreground, setForeground] = useState(AppState.currentState === 'active');
  const voice = useVoiceSearch(focused && foreground);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (value) =>
      setForeground(value === 'active'),
    );
    return () => subscription.remove();
  }, []);
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
          Voice search
        </Text>
        <Text>
          Speak a product name or description, then review your search text. Speech recognition uses
          your device’s configured recognition service.
        </Text>
        <TouchableOpacity style={button} disabled={voice.busy} onPress={voice.toggle}>
          <Text>
            {voice.busy
              ? 'Preparing microphone...'
              : voice.listening
                ? 'Stop listening'
                : 'Start voice input'}
          </Text>
        </TouchableOpacity>
        {voice.listening && <Text accessibilityLiveRegion="polite">Listening...</Text>}
        {!!voice.error && <Text accessibilityRole="alert">{voice.error}</Text>}
        <Text>Search text</Text>
        <TextInput
          accessibilityLabel="Search text"
          style={button}
          maxLength={200}
          value={voice.query}
          onChangeText={voice.setQuery}
        />
        <TouchableOpacity
          style={button}
          disabled={!voice.query.trim()}
          onPress={() =>
            navigation.navigate('Feature', {
              feature: 'catalog',
              search: voice.query.trim(),
            })
          }
        >
          <Text>Search catalog</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
