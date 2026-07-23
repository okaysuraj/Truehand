import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';

const StorefrontCustomizerScreen = ({ navigation }) => {
  const { user } = useAuthStore();
  const [storefront, setStorefront] = useState({
    bannerImageUrl: '',
    shopDescription: '',
    brandColorHex: '#2E6C36'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStorefront();
  }, []);

  const fetchStorefront = async () => {
    try {
      const res = await api.get(`/sellers/${user.id}/storefront`);
      setStorefront(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/sellers/${user.id}/storefront`, storefront);
      Alert.alert('Success', 'Storefront updated successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to update storefront');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <SafeAreaView style={styles.centered}><ActivityIndicator size="large" color="#2E6C36" /></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Storefront Customizer</Text>
        <Text style={styles.subtitle}>Personalize your shop identity.</Text>

        {/* Live Preview */}
        <View style={styles.previewContainer}>
          <View style={[styles.previewBanner, { backgroundColor: storefront.brandColorHex }]}>
            <Text style={styles.previewTitle}>My Artisan Shop</Text>
          </View>
          <View style={styles.previewBody}>
            <Text style={styles.previewDesc}>
              {storefront.shopDescription || 'Your shop description will appear here.'}
            </Text>
            <TouchableOpacity style={[styles.previewBtn, { backgroundColor: storefront.brandColorHex }]}>
              <Text style={styles.previewBtnText}>Follow Shop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <Text style={styles.label}>Brand Color (Hex)</Text>
        <TextInput 
          style={styles.input}
          value={storefront.brandColorHex}
          onChangeText={t => setStorefront({...storefront, brandColorHex: t})}
          placeholder="#2E6C36"
        />

        <Text style={styles.label}>Banner Image URL</Text>
        <TextInput 
          style={styles.input}
          value={storefront.bannerImageUrl}
          onChangeText={t => setStorefront({...storefront, bannerImageUrl: t})}
          placeholder="https://example.com/banner.jpg"
        />

        <Text style={styles.label}>Shop Description</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          value={storefront.shopDescription}
          onChangeText={t => setStorefront({...storefront, shopDescription: t})}
          placeholder="Tell customers about your craft..."
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveBtnText}>Save Changes</Text>}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFDF9' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1C19', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#424940', marginBottom: 24 },
  previewContainer: {
    borderWidth: 1,
    borderColor: '#E2E3DD',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  previewBanner: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  previewTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  previewBody: { padding: 16 },
  previewDesc: { fontSize: 12, color: '#424940', marginBottom: 16, minHeight: 40 },
  previewBtn: { padding: 8, borderRadius: 4, alignItems: 'center' },
  previewBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#1A1C19', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#E2E3DD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#2E6C36', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  saveBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default StorefrontCustomizerScreen;
