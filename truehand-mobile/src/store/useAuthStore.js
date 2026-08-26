import { create } from 'zustand';
import { authService } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  isAuthenticated: false,
  error: null,

  initAuth: async () => {
    set({ loading: true });
    try {
      const currentUser = await authService.getCurrentUser();
      set({ user: currentUser, isAuthenticated: !!currentUser, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false, user: null, isAuthenticated: false });
    }
  },

  login: async (email, password) => {
    set({ error: null });
    try {
      const res = await authService.login({ email, password });
      const data = res.data;
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data));
      set({ user: data, isAuthenticated: true, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  register: async (payload) => {
    set({ error: null });
    try {
      const res = await authService.register(payload);
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Logout error:', err.message);
    } finally {
      set({ user: null, isAuthenticated: false, loading: false, error: null });
    }
  },
}));
