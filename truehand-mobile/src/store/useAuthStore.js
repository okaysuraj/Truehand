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
    set({ loading: true, error: null });
    try {
      const res = await authService.login({ email, password });
      const data = res.data;
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data));
      set({ user: data, isAuthenticated: true, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await authService.register(payload);
      // Wait for email verification if that's the flow, 
      // or set user if it's auto-login.
      // Currently authService.register returns { data: { message, email } }
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await authService.logout();
      set({ user: null, isAuthenticated: false, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
