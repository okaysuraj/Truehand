import { create } from 'zustand';
import { authService } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUnauthorizedHandler } from '../services/api';
let stopAuthObserver;

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  isAuthenticated: false,
  error: null,

  initAuth: async () => {
    if (!stopAuthObserver)
      stopAuthObserver = authService.observeAuth((identity) =>
        set((state) =>
          state.user?.firebaseUid === identity?.uid ? {} : { user: null, isAuthenticated: false },
        ),
      );
    setUnauthorizedHandler(() => set({ user: null, isAuthenticated: false, loading: false }));
    set({ loading: true });
    try {
      const currentUser = await authService.restoreSession();
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
      if (!authService.isCurrentSession(data))
        throw new Error('Your account changed. Please sign in again.');
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data));
      if (!authService.isCurrentSession(data))
        throw new Error('Your account changed. Please sign in again.');
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
    set({ user: null, isAuthenticated: false, loading: false, error: null });
    try {
      await authService.logout();
    } catch (err) {
      set({ error: err.message });
    }
  },
}));
