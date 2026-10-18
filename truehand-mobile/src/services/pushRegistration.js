import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import api from './api';
const storageKey = 'truehand-push-device';
export async function watchPush(userId, onOpen) {
  if (!userId || Constants.executionEnvironment === 'storeClient') return () => {};
  const notifications = await import('expo-notifications');
  let active = true;
  const uid = auth.currentUser?.uid;
  async function owns(data) {
    let device;
    try {
      device = JSON.parse((await AsyncStorage.getItem(storageKey)) || 'null');
    } catch {
      return false;
    }
    return (
      active &&
      !!uid &&
      auth.currentUser?.uid === uid &&
      String(data?.userId) === String(userId) &&
      Number(device?.owner) === Number(userId)
    );
  }
  notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      const show = await owns(notification.request.content.data);
      return {
        shouldShowBanner: show,
        shouldShowList: show,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    },
  });
  const opened = new Set();
  async function handle(response) {
    if (!response || !(await owns(response.notification.request.content.data))) return;
    const id = response.notification.request.identifier;
    if (opened.has(id)) return;
    opened.add(id);
    if ((await AsyncStorage.getItem('truehand-push-response')) === id) return;
    await AsyncStorage.setItem('truehand-push-response', id);
    if (active) onOpen();
    await notifications.clearLastNotificationResponseAsync();
  }
  const listener = notifications.addNotificationResponseReceivedListener((response) =>
    handle(response).catch(() => {}),
  );
  handle(await notifications.getLastNotificationResponseAsync()).catch(() => {});
  return () => {
    active = false;
    listener.remove();
  };
}
export async function unregisterPush() {
  let device;
  try {
    device = JSON.parse((await AsyncStorage.getItem(storageKey)) || 'null');
  } catch {
    /* No valid stored device. */
  }
  await AsyncStorage.removeItem(storageKey);
  if (device?.id)
    try {
      await api.delete(`/notifications/devices/${device.id}`);
    } catch {
      /* Revocation will be retried when a device is explicitly registered again. */
    }
  try {
    const notifications = await import('expo-notifications');
    await notifications.dismissAllNotificationsAsync();
  } catch {
    /* Native notifications may not exist in this build. */
  }
}
export const pushAdapter = {
  async register(userId) {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Please sign in again.');
    const projectId =
      process.env.EXPO_PUBLIC_EAS_PROJECT_ID ||
      Constants.easConfig?.projectId ||
      Constants.expoConfig?.extra?.eas?.projectId;
    if (
      !projectId ||
      Constants.executionEnvironment === 'storeClient' ||
      !['ios', 'android'].includes(Platform.OS)
    )
      throw new Error('Push notifications are unavailable in this build.');
    const notifications = await import('expo-notifications');
    if (Platform.OS === 'android')
      await notifications.setNotificationChannelAsync('default', {
        name: 'TrueHand updates',
        importance: notifications.AndroidImportance.DEFAULT,
      });
    const permission = await notifications.requestPermissionsAsync();
    if (!permission.granted) throw new Error('Notification permission was not granted.');
    const token = (await notifications.getExpoPushTokenAsync({ projectId })).data;
    if (auth.currentUser?.uid !== uid) throw new Error('Your account changed. Please try again.');
    const { data } = await api.post('/notifications/devices', {
      token,
      provider: 'EXPO',
      platform: Platform.OS.toUpperCase(),
    });
    if (auth.currentUser?.uid !== uid) {
      await api.delete(`/notifications/devices/${data.id}`).catch(() => {});
      throw new Error('Your account changed. Please try again.');
    }
    await AsyncStorage.setItem(storageKey, JSON.stringify({ id: data.id, owner: userId }));
  },
};
