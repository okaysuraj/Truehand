import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function AddNewAddressScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleSave = () => {
    // Mock save address logic
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.introSection}>
            <Text style={styles.title}>Add New Address</Text>
            <Text style={styles.subtitle}>Please enter your shipping details for delivery.</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput 
                style={styles.input}
                placeholder="e.g. Eleanor Vance"
                placeholderTextColor={colors['outline-variant']}
                value={form.fullName}
                onChangeText={(text) => setForm({...form, fullName: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address Line 1</Text>
              <TextInput 
                style={styles.input}
                placeholder="123 Artisan Lane"
                placeholderTextColor={colors['outline-variant']}
                value={form.address1}
                onChangeText={(text) => setForm({...form, address1: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address Line 2 <Text style={{fontWeight: 'normal', color: colors.outline}}>(Optional)</Text></Text>
              <TextInput 
                style={styles.input}
                placeholder="Apt, Suite, Unit, etc."
                placeholderTextColor={colors['outline-variant']}
                value={form.address2}
                onChangeText={(text) => setForm({...form, address2: text})}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, paddingRight: 8 }]}>
                <Text style={styles.label}>City</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Portland"
                  placeholderTextColor={colors['outline-variant']}
                  value={form.city}
                  onChangeText={(text) => setForm({...form, city: text})}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 0.5, paddingHorizontal: 4 }]}>
                <Text style={styles.label}>State</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="OR"
                  maxLength={2}
                  autoCapitalize="characters"
                  placeholderTextColor={colors['outline-variant']}
                  value={form.state}
                  onChangeText={(text) => setForm({...form, state: text})}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, paddingLeft: 8 }]}>
                <Text style={styles.label}>Zip Code</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="97204"
                  keyboardType="numeric"
                  placeholderTextColor={colors['outline-variant']}
                  value={form.zip}
                  onChangeText={(text) => setForm({...form, zip: text})}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save & Continue</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors['surface-linen'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: spacing.marginMobile, backgroundColor: 'rgba(252, 249, 248, 0.8)' },
  headerTitle: { ...typography.headlineMd, color: colors['forest-green'], fontWeight: '700' },
  backButton: { padding: 8, marginHorizontal: -8 },
  scrollContent: { padding: spacing.marginMobile, paddingBottom: spacing.sectionGap },
  
  introSection: { marginBottom: spacing.stackLg, marginTop: spacing.stackLg },
  title: { ...typography.headlineLgMobile, color: colors.charcoal, marginBottom: 8 },
  subtitle: { ...typography.bodyMd, color: colors['on-surface-variant'] },
  
  formContainer: { backgroundColor: colors['surface-container-lowest'], padding: spacing.stackLg, borderRadius: 8, shadowColor: colors['forest-green'], shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  inputGroup: { marginBottom: spacing.stackMd },
  label: { ...typography.labelSm, color: colors.charcoal, marginBottom: 8 },
  input: { borderBottomWidth: 1, borderBottomColor: colors['clay-outline'], paddingVertical: 8, ...typography.bodyMd, color: colors.charcoal },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  
  saveBtn: { backgroundColor: colors['forest-green'], paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginTop: spacing.stackLg },
  saveBtnText: { ...typography.labelMd, color: colors['on-primary'] }
});
