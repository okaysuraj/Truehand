import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import api from '../../services/api';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!email) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await api.post('/auth/password/forgot', { email });
      setMessage(`Recovery email sent! (Token: ${res.data.token})`);
    } catch (err) {
      Alert.alert('Error', err.response?.data || 'Failed to send recovery email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email address to receive a password reset link.</Text>

        {message ? (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSend}
          disabled={loading || !email}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Send Reset Link</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backLink} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backLinkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFDF9',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1C19',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#424940',
    marginBottom: 32,
    textAlign: 'center',
  },
  messageBox: {
    backgroundColor: '#F3F5F1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  messageText: {
    color: '#2E6C36',
    textAlign: 'center',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#1A1C19',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E3DD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1C19',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#2E6C36',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#2E6C36',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
