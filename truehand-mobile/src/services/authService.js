import { requireAuthIdentity, serializeAuthOperations } from '../../../shared/auth-operations';
import api from './api';
import { unregisterPush } from './pushRegistration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';
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
  restoreSession: async () => {
    await auth.authStateReady();
    if (!auth.currentUser || !auth.currentUser.emailVerified) {
      await AsyncStorage.multiRemove(['user', 'token']);
      return null;
    }
    const identity = auth.currentUser;
    const idToken = await identity.getIdToken();
    const role = (await AsyncStorage.getItem('pendingRole')) || 'CUSTOMER';
    requireAuthIdentity(auth, identity);
    const { data } = await api.post('/auth/firebase-login', { idToken, role });
    requireAuthIdentity(auth, identity);
    const user = { ...data, id: data.userId, firebaseUid: identity.uid };
    await AsyncStorage.multiSet([
      ['user', JSON.stringify(user)],
      ['token', idToken],
    ]);
    requireAuthIdentity(auth, identity);
    return user;
  },
  register: async (data) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const fullName =
        data.name || [data.firstName, data.lastName].filter(Boolean).join(' ').trim();
      if (fullName) {
        await updateProfile(cred.user, { displayName: fullName });
      }
      await sendEmailVerification(cred.user);
      await AsyncStorage.setItem('pendingRole', data.role || 'CUSTOMER');
      await signOut(auth);
      return {
        data: {
          message: 'Verification email sent. Please verify your email before logging in.',
          email: cred.user.email,
        },
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
      const role = data.role || (await AsyncStorage.getItem('pendingRole')) || 'CUSTOMER';
      requireAuthIdentity(auth, cred.user);
      const backendRes = await api.post('/auth/firebase-login', { idToken, role });
      requireAuthIdentity(auth, cred.user);
      backendRes.data = {
        ...backendRes.data,
        id: backendRes.data.userId,
        firebaseUid: cred.user.uid,
      };
      await AsyncStorage.removeItem('pendingRole');
      requireAuthIdentity(auth, cred.user);
      return backendRes;
    } catch (error) {
      throw new Error(mapFirebaseAuthError(error));
    }
  },
  isCurrentSession: (user) => !!user && auth.currentUser?.uid === user.firebaseUid,
  getCurrentUser: async () => {
    const u = await AsyncStorage.getItem('user');
    try {
      const data = u ? JSON.parse(u) : null;
      return data ? { ...data, id: data.id ?? data.userId } : null;
    } catch {
      return null;
    }
  },
  forgotPassword: async ({ email }) => {
    await sendPasswordResetEmail(auth, email);
    return { data: { message: 'Password reset instructions sent.' } };
  },
  resetPassword: async ({ token, oobCode, password }) => {
    await confirmPasswordReset(auth, oobCode || token, password);
    return { data: { message: 'Password reset completed.' } };
  },
  logout: async () => {
    const identity = auth.currentUser;
    await unregisterPush();
    requireAuthIdentity(auth, identity);
    await signOut(auth);
    if (auth.currentUser) return;
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  },
  observeAuth: (callback) => onAuthStateChanged(auth, callback),
};

serializeAuthOperations(authService);
