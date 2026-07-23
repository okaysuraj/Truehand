import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import api from '../../services/api';

const ResetPasswordScreen = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!token || !password) return;
    setLoading(true);
    try {
      await api.post('/auth/password/reset', { token, password });
      Alert.alert('Success', 'Password successfully reset!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (err) {
      Alert.alert('Error', err.response?.data || 'Failed to reset password. Token may be invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your reset token and new password.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Reset Token</Text>
          <TextInput
            style={styles.input}
            placeholder="Paste token here"
            value={token}
            onChangeText={setToken}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleReset}
          disabled={loading || !token || !password}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Reset Password</Text>
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
  inputContainer: {
    marginBottom: 20,
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
    marginTop: 12,
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

export default ResetPasswordScreen;
