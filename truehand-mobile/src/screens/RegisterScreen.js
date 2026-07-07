import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useAuth } from '../services/AuthProvider';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.firstName || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        role: 'CUSTOMER'
      });
      Alert.alert('Success', 'Verification email sent. Please verify your email before logging in.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (err) {
      Alert.alert('Registration Failed', err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>First name</Text>
        <TextInput 
          style={styles.input}
          placeholder="First name"
          value={form.firstName}
          onChangeText={(val) => setForm({...form, firstName: val})}
        />

        <Text style={styles.label}>Last name</Text>
        <TextInput 
          style={styles.input}
          placeholder="Last name"
          value={form.lastName}
          onChangeText={(val) => setForm({...form, lastName: val})}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input}
          placeholder="Email address"
          value={form.email}
          onChangeText={(val) => setForm({...form, email: val})}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input}
          placeholder="At least 6 characters"
          value={form.password}
          onChangeText={(val) => setForm({...form, password: val})}
          secureTextEntry
        />

        <Text style={styles.label}>Re-enter password</Text>
        <TextInput 
          style={styles.input}
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChangeText={(val) => setForm({...form, confirmPassword: val})}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#0f1111" /> : <Text style={styles.buttonText}>Continue</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f1111',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f1111',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
  },
  button: {
    backgroundColor: '#FFD814',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCD200',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f1111',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  footerText: {
    color: '#565959',
    fontSize: 14,
  },
  link: {
    color: '#007185',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
