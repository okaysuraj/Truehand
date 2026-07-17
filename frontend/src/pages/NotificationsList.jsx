import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NotificationsList = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', title: 'Order Shipped!', message: 'Your order TH-29481 has been shipped and is on its way.', time: '2 hours ago', read: false },
    { id: 2, type: 'promo', title: 'Flash Sale: 40% Off', message: 'Limited time offer on artisan ceramics collection. Shop now before it ends!', time: '5 hours ago', read: false },
    { id: 3, type: 'alert', title: 'Price Drop Alert', message: 'Woven Indigo Throw is now available at your target price of $150.', time: 'Yesterday', read: true },
    { id: 4, type: 'order', title: 'Delivery Confirmed', message: 'Your order TH-28912 has been delivered. How was your experience?', time: '2 days ago', read: true },
    { id: 5, type: 'system', title: 'Account Security', message: 'A new device has been logged into your account from Portland, OR.', time: '3 days ago', read: true },
    { id: 6, type: 'alert', title: 'Back in Stock', message: 'Hand-Forged Nakiri Knife is back in stock. Grab it before it sells out!', time: '4 days ago', read: true }
  ]);

  const iconMap = { order: 'local_shipping', promo: 'sell', alert: 'notifications_active', system: 'security' };
  const colorMap = { order: 'text-blue-600 bg-blue-50', promo: 'text-amber-600 bg-amber-50', alert: 'text-forest-green bg-forest-green/10', system: 'text-charcoal bg-surface-variant' };

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="font-display-md text-display-md text-on-surface mb-2">Notifications</h1>
            <p className="font-body-md text-on-surface-variant">{notifications.filter(n => !n.read).length} unread</p>
          </div>
          <button onClick={markAllRead} className="text-forest-green font-label-md hover:underline">Mark all read</button>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {[{ key: 'all', label: 'All' }, { key: 'order', label: 'Orders' }, { key: 'promo', label: 'Promotions' }, { key: 'alert', label: 'Alerts' }, { key: 'system', label: 'System' }].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${
              filter === f.key ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
            }`}>{f.label}</button>
          ))}
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">notifications_off</span>
              <p className="font-body-md text-on-surface-variant">No notifications in this category.</p>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/30">
              {filtered.map(notif => (
                <div key={notif.id} className={`p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-surface-linen/50 ${!notif.read ? 'bg-forest-green/[0.02]' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorMap[notif.type]}`}>
                    <span className="material-symbols-outlined text-[20px]">{iconMap[notif.type]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-label-md ${!notif.read ? 'text-on-surface' : 'text-on-surface-variant'}`}>{notif.title}</h3>
                      {!notif.read && <div className="w-2 h-2 rounded-full bg-forest-green shrink-0"></div>}
                    </div>
                    <p className="font-body-sm text-on-surface-variant mb-1 line-clamp-2">{notif.message}</p>
                    <p className="font-label-sm text-on-surface-variant/60">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;
