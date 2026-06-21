import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// For Android Emulator, localhost is 10.0.2.2. For iOS emulator it's localhost.
// For physical devices, you MUST replace this with your computer's local IP address (e.g., 192.168.1.5).
const API_URL = process.env.EXPO_PUBLIC_API_URL || (Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080');

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  // Fix Axios 404 issue by manually appending /api to the URL
  if (config.url && !config.url.startsWith('/api')) {
    config.url = '/api' + (config.url.startsWith('/') ? config.url : '/' + config.url);
  }

  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
