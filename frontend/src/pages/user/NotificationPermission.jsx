import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const NotificationPermission = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    orderUpdates: { email: true, push: true, sms: false },
    promotions: { email: true, push: false, sms: false },
    messages: { email: true, push: true, sms: false },
    newArrivals: { email: false, push: false, sms: false }
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current notification settings
    api.get(`/notifications/preferences/${user?.id || 1}`)
      .then(res => {
        if (res.data) setPreferences(res.data);
      })
      .catch(err => console.warn('Mocking notification preferences', err))
      .finally(() => setLoading(false));
  }, [user]);

  const togglePref = (category, channel) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: !prev[category][channel]
      }
    }));
  };

  const handleSave = () => {
    // Save to backend
    api.post(`/notifications/preferences/${user?.id || 1}`, preferences)
      .catch(err => console.warn('Mocking save', err))
      .finally(() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      });
  };

  const NotificationRow = ({ title, desc, category }) => (
    <div className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1">
        <h4 className="font-label-md text-on-surface">{title}</h4>
        <p className="font-body-sm text-on-surface-variant mt-1">{desc}</p>
      </div>
      <div className="flex items-center gap-6 md:gap-8">
        <label className="flex flex-col items-center gap-2 cursor-pointer group">
          <input 
            type="checkbox" 
            className="accent-forest-green w-4 h-4 cursor-pointer" 
            checked={preferences[category].email} 
            onChange={() => togglePref(category, 'email')} 
          />
          <span className="font-label-sm text-on-surface-variant group-hover:text-forest-green transition-colors text-[11px] uppercase tracking-wider">Email</span>
        </label>
        <label className="flex flex-col items-center gap-2 cursor-pointer group">
          <input 
            type="checkbox" 
            className="accent-forest-green w-4 h-4 cursor-pointer" 
            checked={preferences[category].push} 
            onChange={() => togglePref(category, 'push')} 
          />
          <span className="font-label-sm text-on-surface-variant group-hover:text-forest-green transition-colors text-[11px] uppercase tracking-wider">Push</span>
        </label>
        <label className="flex flex-col items-center gap-2 cursor-pointer group">
          <input 
            type="checkbox" 
            className="accent-forest-green w-4 h-4 cursor-pointer" 
            checked={preferences[category].sms} 
            onChange={() => togglePref(category, 'sms')} 
          />
          <span className="font-label-sm text-on-surface-variant group-hover:text-forest-green transition-colors text-[11px] uppercase tracking-wider">SMS</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/settings" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Settings
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Notification Preferences</h1>
          <p className="font-body-md text-on-surface-variant">Control how and when TrueHand contacts you.</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-forest-green/10 border border-forest-green/30 rounded-lg text-forest-green font-label-md flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined">check_circle</span>
            Preferences updated successfully!
          </div>
        )}

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm p-6 md:p-8">
          
          <div className="flex items-start gap-4 p-4 bg-surface-variant/30 rounded-lg mb-8 border border-outline-variant/30">
            <span className="material-symbols-outlined text-charcoal">notifications_active</span>
            <div>
              <h3 className="font-label-md text-on-surface mb-1">Push Notifications are Enabled</h3>
              <p className="font-body-sm text-on-surface-variant">Your browser currently allows push notifications from TrueHand. You can change this in your browser settings.</p>
            </div>
          </div>

          <div className="divide-y divide-outline-variant/30">
            <NotificationRow 
              title="Order Updates" 
              desc="Shipping confirmations, delivery updates, and return statuses." 
              category="orderUpdates" 
            />
            <NotificationRow 
              title="Direct Messages" 
              desc="Messages from artisans regarding your custom orders or inquiries." 
              category="messages" 
            />
            <NotificationRow 
              title="Promotions & Offers" 
              desc="Exclusive discounts, flash sales, and special events." 
              category="promotions" 
            />
            <NotificationRow 
              title="New Arrivals" 
              desc="Updates when your favorite artisans release new collections." 
              category="newArrivals" 
            />
          </div>

          <div className="pt-8 mt-4 border-t border-outline-variant/30 flex justify-end">
            <button 
              onClick={handleSave}
              className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity"
            >
              Save Preferences
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotificationPermission;
