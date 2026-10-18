import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import api from '../../services/api';
import { colors } from '../../theme/theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function AddAddressScreen({ navigation, route }) {
  const userId = useAuthStore((state) => state.user?.id);
  const existing = route?.params?.address;
  const [fullName, setFullName] = useState(existing?.fullName || '');
  const [phone, setPhone] = useState(existing?.phone || '');
  const [street, setStreet] = useState(existing?.streetAddress || '');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState(existing?.city || '');
  const [state, setState] = useState(existing?.state || '');
  const [postalCode, setPostalCode] = useState(existing?.postalCode || '');
  const [country, setCountry] = useState(existing?.country || 'India');
  const [isDefault, setIsDefault] = useState(existing?.isDefault ?? false);
  const [addressType, setAddressType] = useState(existing?.label || 'HOME');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !street.trim() ||
      !city.trim() ||
      !state.trim() ||
      !country.trim() ||
      !postalCode.trim()
    ) {
      Alert.alert('Missing Fields', 'Please complete all required address fields.');
      return;
    }

    try {
      if (!userId) throw new Error('Please sign in before saving an address.');
      setLoading(true);
      const payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        streetAddress: apartment ? `${apartment.trim()}, ${street.trim()}` : street.trim(),
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        isDefault,
        label: addressType,
      };

      if (existing) await api.put(`/addresses/${existing.id}/user/${userId}`, payload);
      else await api.post(`/addresses/user/${userId}`, payload);

      Alert.alert('Address Added', 'Your new shipping address has been saved.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert('Error', err.response?.data?.error || err.message || 'Failed to save address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Address</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Address Type Selector */}
        <View style={styles.typeRow}>
          {['HOME', 'WORK', 'OTHER'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.typeChip, addressType === t && styles.typeChipActive]}
              onPress={() => setAddressType(t)}
            >
              <Ionicons
                name={t === 'HOME' ? 'home' : t === 'WORK' ? 'briefcase' : 'location'}
                size={16}
                color={addressType === t ? '#ffffff' : colors.outline}
              />
              <Text style={[styles.typeText, addressType === t && styles.typeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipient Details</Text>

          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Priya Sharma"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Mobile Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Address Fields */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Coordinates</Text>

          <Text style={styles.label}>Flat, House No., Building *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. B-402, Green Glen Heights"
            value={apartment}
            onChangeText={setApartment}
          />

          <Text style={styles.label}>Area, Street, Sector, Village *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 14th Main Road, Bellandur"
            value={street}
            onChangeText={setStreet}
          />

          <View style={styles.row}>
            <View style={styles.halfCol}>
              <Text style={styles.label}>City *</Text>
              <TextInput
                style={styles.input}
                placeholder="Bengaluru"
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View style={styles.halfCol}>
              <Text style={styles.label}>PIN Code *</Text>
              <TextInput
                style={styles.input}
                placeholder="560103"
                keyboardType="numeric"
                value={postalCode}
                onChangeText={setPostalCode}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfCol}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                placeholder="Karnataka"
                value={state}
                onChangeText={setState}
              />
            </View>
            <View style={styles.halfCol}>
              <Text style={styles.label}>Country</Text>
              <TextInput style={styles.input} value={country} onChangeText={setCountry} />
            </View>
          </View>
        </View>

        {/* Default toggle */}
        <View style={styles.defaultRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.defaultTitle}>Set as Default Shipping Address</Text>
            <Text style={styles.defaultSub}>
              Use this address by default for all marketplace orders
            </Text>
          </View>
          <Switch
            value={isDefault}
            onValueChange={setIsDefault}
            trackColor={{ false: '#ccc', true: colors['forest-green'] }}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>Save Delivery Address</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors['forest-green'] },
  scroll: { padding: 16, paddingBottom: 40 },
  typeRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  typeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors['surface-container'],
    paddingVertical: 10,
    borderRadius: 8,
  },
  typeChipActive: { backgroundColor: colors['forest-green'] },
  typeText: { fontSize: 12, fontWeight: '700', color: colors.outline },
  typeTextActive: { color: '#ffffff' },
  section: {
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.charcoal, marginBottom: 12 },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors['on-surface-variant'],
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.charcoal,
  },
  row: { flexDirection: 'row', gap: 12 },
  halfCol: { flex: 1 },
  defaultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['surface-container-lowest'],
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    marginBottom: 20,
  },
  defaultTitle: { fontSize: 14, fontWeight: '700', color: colors.charcoal },
  defaultSub: { fontSize: 11, color: colors.outline, marginTop: 2 },
  saveBtn: {
    backgroundColor: colors['forest-green'],
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
});
