import api from '../services/api';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const NotificationDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Get notification id from URL (used as index into stored notifications)
  const id = window.location.pathname.split('/').pop();

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Load from local mock store (notifications are typically push-delivered)
    const stored = JSON.parse(localStorage.getItem('truehand_notifications') || '[]');
    const found = stored.find(n => String(n.id) === String(id));
    if (found) {
      setNotification(found);
      // Mark as read
      const updated = stored.map(n => n.id === found.id ? { ...n, read: true } : n);
      localStorage.setItem('truehand_notifications', JSON.stringify(updated));
    } else {
      // Demo notification
      setNotification({
        id,
        title: 'Order Shipped!',
        body: 'Your order #TH-12345 has been shipped and is on its way. Expected delivery: 2-3 business days.',
        type: 'order',
        icon: 'local_shipping',
        timestamp: new Date().toISOString(),
        read: true,
        action: { label: 'Track Order', path: '/orders' }
      });
    }
  }, [id]);

  if (!notification) return (
    <div className="pt-24 pb-16 min-h-screen bg-surface-linen flex items-center justify-center">
      <span className="material-symbols-outlined animate-spin text-forest-green text-4xl">progress_activity</span>
    </div>
  );

  const iconColor = {
    order: 'bg-blue-50 text-blue-600',
    promo: 'bg-amber-50 text-amber-600',
    system: 'bg-surface-variant text-on-surface-variant',
    review: 'bg-forest-green/10 text-forest-green',
  }[notification.type] || 'bg-surface-variant text-on-surface-variant';
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">

        <div className="mb-8">
          <Link to="/notifications" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            All Notifications
          </Link>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm p-8">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-full ${iconColor} flex items-center justify-center mb-6`}>
            <span className="material-symbols-outlined text-3xl">{notification.icon || 'notifications'}</span>
          </div>

          {/* Title & Time */}
          <div className="mb-6">
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">{notification.title}</h1>
            <p className="font-label-sm text-on-surface-variant">
              {notification.timestamp ? new Date(notification.timestamp).toLocaleString() : 'Just now'}
            </p>
          </div>

          {/* Body */}
          <div className="border-t border-outline-variant/20 pt-6 mb-8">
            <p className="font-body-md text-on-surface leading-relaxed">{notification.body}</p>
          </div>

          {/* Action */}
          {notification.action && (
            <button
              onClick={() => navigate(notification.action.path)}
              className="w-full py-3 bg-forest-green text-white font-label-md rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              {notification.action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
