import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import api from '../services/api';

const OTPDeliveryVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid', 'Please enter a 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/delivery/verify-otp', { otp });
      if (res.data.success) {
        Alert.alert('Success', 'Delivery confirmed!', [
          { text: 'OK', onPress: () => navigation.navigate('DeliveryMap') }
        ]);
      }
    } catch (err) {
      Alert.alert('Error', err.response?.data || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🛡️</Text>
        </View>
        <Text style={styles.title}>Verify Delivery</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code provided by the customer to mark this order as delivered.</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.otpInput}
            placeholder="0 0 0 0 0 0"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
            textAlign="center"
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, (loading || otp.length < 6) && styles.buttonDisabled]} 
          onPress={verifyOTP}
          disabled={loading || otp.length < 6}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Confirm Delivery</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Cancel</Text>
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
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
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
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 32,
  },
  otpInput: {
    borderWidth: 2,
    borderColor: '#2E6C36',
    borderRadius: 12,
    paddingVertical: 16,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1C19',
    backgroundColor: '#FFFFFF',
    letterSpacing: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#2E6C36',
    paddingVertical: 16,
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
  backBtn: {
    marginTop: 20,
  },
  backBtnText: {
    color: '#424940',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default OTPDeliveryVerificationScreen;
