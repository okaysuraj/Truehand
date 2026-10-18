/* Firebase public configuration contains no server credentials. Pin to the app SDK version. */
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js');
firebase.initializeApp(JSON.parse(new URL(self.location.href).searchParams.get('config')));
const messaging = firebase.messaging();
messaging.onBackgroundMessage(async (payload) => {
  const stored = await (await caches.open('truehand-push-owner')).match('/__truehand_push_owner');
  const owner = stored ? (await stored.json()).owner : null;
  if (!owner || String(payload.data?.userId) !== String(owner)) return;
  await self.registration.showNotification(payload.data.title || 'TrueHand', {
    body: payload.data.body || '',
    tag: payload.data.eventKey,
    data: { url: '/notifications' },
  });
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/notifications'));
});
