import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

const mapFirebaseAuthError = (error) => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Please choose a stronger password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is disabled for this Firebase project. Enable it in Firebase Console > Authentication > Sign-in method.';
    case 'auth/invalid-api-key':
      return 'Firebase API key is invalid. Check the mobile environment values.';
    default:
      return error?.message || 'Unable to complete the request.';
  }
};

export const authService = {
  register: async (data) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ').trim();
      if (fullName) {
        await updateProfile(cred.user, { displayName: fullName });
      }
      await sendEmailVerification(cred.user);
      return {
        data: {
          message: 'Verification email sent. Please verify your email before logging in.',
          email: cred.user.email
        }
      };
    } catch (error) {
      throw new Error(mapFirebaseAuthError(error));
    }
  },
  login: async (data) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, data.email, data.password);
      if (!cred.user.emailVerified) {
        await signOut(auth);
        throw new Error('Please verify your email before logging in.');
      }
      const idToken = await cred.user.getIdToken();
      const backendRes = await api.post('/auth/firebase-login', { idToken, role: 'CUSTOMER' });
      return backendRes;
    } catch (error) {
      throw new Error(mapFirebaseAuthError(error));
    }
  },
  getCurrentUser: async () => {
    const u = await AsyncStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },
  logout: async () => {
    await signOut(auth);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  },
  observeAuth: (callback) => onAuthStateChanged(auth, callback)
};
