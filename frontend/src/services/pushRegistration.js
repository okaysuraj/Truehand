import { getMessaging, getToken, deleteToken, isSupported, onMessage } from 'firebase/messaging';
import app, { auth, firebaseConfig } from '../config/firebase';
import api from './api';
const storageKey = 'truehand-push-device';
async function setOwner(owner) {
  if (!('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.getRegistration('/');
  registration?.active?.postMessage({ type: 'TRUEHAND_PUSH_OWNER', owner });
  // Persist ownership outside the worker lifecycle so logout also survives a cold worker start.
  const cache = await window.caches.open('truehand-push-owner');
  await cache.put('/__truehand_push_owner', new window.Response(JSON.stringify({ owner })));
  if (!owner && registration)
    for (const notification of await registration.getNotifications()) notification.close();
}
export async function clearPushOwner() {
  try {
    await setOwner(null);
  } catch {
    /* Permission or storage may be unavailable. */
  }
}
export async function activatePush(userId, onNotification) {
  if (!userId) {
    await clearPushOwner();
    return () => {};
  }
  let stored;
  try {
    stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
  } catch {
    /* Ignore corrupt metadata. */
  }
  if (Number(stored?.owner) !== Number(userId)) await clearPushOwner();
  if (!(await isSupported())) return () => {};
  const uid = auth.currentUser?.uid;
  return onMessage(getMessaging(app), async (payload) => {
    if (
      auth.currentUser?.uid !== uid ||
      String(payload.data?.userId) !== String(userId) ||
      Notification.permission !== 'granted'
    )
      return;
    let device;
    try {
      device = JSON.parse(localStorage.getItem(storageKey) || 'null');
    } catch {
      return;
    }
    if (Number(device?.owner) !== Number(userId)) return;
    onNotification?.();
    const registration = await navigator.serviceWorker.getRegistration('/');
    if (auth.currentUser?.uid === uid)
      await registration?.showNotification(payload.data.title || 'TrueHand', {
        body: payload.data.body || '',
        tag: payload.data.eventKey,
        data: { url: '/notifications' },
      });
  });
}
export async function unregisterPush() {
  await clearPushOwner();
  let device;
  try {
    device = JSON.parse(localStorage.getItem(storageKey) || 'null');
  } catch {
    /* Invalid local metadata. */
  }
  localStorage.removeItem(storageKey);
  if (device?.id)
    try {
      await api.delete(`/notifications/devices/${device.id}`);
    } catch {
      /* Revocation can fail offline; background notifications are locally suppressed. */
    }
  try {
    if (await isSupported()) await deleteToken(getMessaging(app));
  } catch {
    /* Token may already be revoked. */
  }
}
export const pushAdapter = {
  async register(userId) {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Please sign in again.');
    const key = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    if (!key || !window.isSecureContext || !(await isSupported()))
      throw new Error('Push notifications are unavailable in this browser.');
    if ((await Notification.requestPermission()) !== 'granted')
      throw new Error('Notification permission was not granted.');
    await clearPushOwner();
    const registration = await navigator.serviceWorker.register(
      `/firebase-messaging-sw.js?config=${encodeURIComponent(JSON.stringify(firebaseConfig))}`,
      { scope: '/' },
    );
    await navigator.serviceWorker.ready;
    const token = await getToken(getMessaging(app), {
      vapidKey: key,
      serviceWorkerRegistration: registration,
    });
    if (!token || auth.currentUser?.uid !== uid)
      throw new Error('Your account changed. Please try again.');
    const { data } = await api.post('/notifications/devices', {
      token,
      platform: 'WEB',
      provider: 'FIREBASE',
    });
    if (auth.currentUser?.uid !== uid) {
      await api.delete(`/notifications/devices/${data.id}`).catch(() => {});
      throw new Error('Your account changed. Please try again.');
    }
    localStorage.setItem(storageKey, JSON.stringify({ id: data.id, owner: userId }));
    await setOwner(String(userId));
  },
};
