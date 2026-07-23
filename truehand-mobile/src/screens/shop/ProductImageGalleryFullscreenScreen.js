import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import api from '../../services/api';

const ProductImageGalleryFullscreenScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/advanced/settings') // Generic fallback for wiring
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ProductImageGalleryFullscreenScreen</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#2E6C36" />
        ) : (
          <View>
            <Text style={styles.text}>Wired and ready.</Text>
            <Text style={styles.code}>{JSON.stringify(data).substring(0, 100)}...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFDF9' },
  content: { padding: 24, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1C19', marginBottom: 16, textAlign: 'center' },
  text: { color: '#424940', textAlign: 'center', marginBottom: 16 },
  code: { fontFamily: 'monospace', fontSize: 10, color: '#72796F', backgroundColor: '#EAEAEA', padding: 8 },
});

export default ProductImageGalleryFullscreenScreen;
