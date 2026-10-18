import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { guardApiSession } from '../../../shared/api-session';

// Production: Render cloud backend. Override via EXPO_PUBLIC_API_URL in .env.local for local dev.
const configuredUrl = (process.env.EXPO_PUBLIC_API_URL || 'https://truehand.onrender.com').replace(
  /\/$/,
  '',
);
const API_URL = configuredUrl.endsWith('/api') ? configuredUrl : `${configuredUrl}/api`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (config.url?.startsWith('/api/')) {
    config.url = config.url.slice(4);
  }
  return config;
});

let onUnauthorized = () => {};
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};
const sessionApi = guardApiSession(
  api,
  auth,
  (message) => new axios.CanceledError(message),
  async () => {
    onUnauthorized();
    await AsyncStorage.multiRemove(['token', 'user']);
  },
);

export default sessionApi;
