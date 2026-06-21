import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: async () => {
    const u = await AsyncStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },
  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  }
};
