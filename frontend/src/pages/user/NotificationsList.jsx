import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NOTIFICATIONS = [
  {
    id: 1,
    icon: 'local_shipping',
    iconBg: 'bg-emerald-50 text-forest-green',
    title: 'Order Shipped',
    time: '2h ago',
    unread: true,
    message: "Your 'Hand-Thrown Ceramic Vase' by Artisan Kaito has left the workshop and is on its way.",
    link: '/notifications/1',
  },
  {
    id: 2,
    icon: 'sell',
    iconBg: 'bg-[#ffdecb] text-[#97472a]',
    title: 'Price Drop Alert',
    time: '5h ago',
    unread: false,
    message: "A piece in your wishlist, 'The Weaver's Loom Tapestry', has been updated with a special studio price.",
    link: '/notifications/2',
  },
  {
    id: 3,
    icon: 'auto_awesome',
    iconBg: 'bg-surface-container text-charcoal',
    title: 'New Artisan Spotlight',
    time: 'Yesterday',
    unread: true,
    message: 'Discover the intricate metalwork of Elena Rossi, our newest artisan from the Venetian archives.',
    link: '/notifications/3',
  },
  {
    id: 4,
    icon: 'inventory_2',
    iconBg: 'bg-surface-container text-on-surface-variant',
    title: 'Order Delivered',
    time: '2 days ago',
    unread: false,
    message: 'Your signature Linen Table Runner set has been delivered. We hope it brings warmth to your home.',
    link: '/notifications/4',
  },
];

const NotificationsList = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Activity');

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-12 space-y-8 text-xs">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal">
            Notifications
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant">
            Stay updated with your curated collections and artisan journeys.
          </p>
        </div>

        {/* Tabs Bar */}
        <div className="flex gap-6 border-b border-outline-variant/20 text-xs font-semibold">
          {['Activity', 'Offers', 'Stories'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 transition-all relative ${
                tab === t ? 'text-charcoal font-bold border-b-2 border-charcoal' : 'text-on-surface-variant hover:text-charcoal'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Notification Feed Box */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden divide-y divide-outline-variant/10">
          <div className="p-4 px-6 bg-surface-container-low/40 text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
            RECENT UPDATES
          </div>

          {NOTIFICATIONS.map(notif => (
            <div 
              key={notif.id}
              onClick={() => navigate(notif.link)}
              className="p-6 flex items-start gap-4 hover:bg-surface-container-low/30 transition-colors cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${notif.iconBg}`}>
                <span className="material-symbols-outlined text-lg">{notif.icon}</span>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-charcoal text-xs">{notif.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-on-surface-variant font-mono">{notif.time}</span>
                    {notif.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#97472a]" />
                    )}
                  </div>
                </div>

                <p className="text-on-surface-variant font-body-md text-[11px] leading-relaxed">
                  {notif.message}
                </p>
              </div>
            </div>
          ))}

          {/* Mark All as Read */}
          <div className="p-4 text-center">
            <button 
              onClick={() => alert('All notifications marked as read.')}
              className="text-xs font-bold text-forest-green hover:underline"
            >
              Mark all as read
            </button>
          </div>
        </div>

        {/* End of Updates Watermark */}
        <div className="text-center pt-8 space-y-2 text-on-surface-variant/60">
          <span className="material-symbols-outlined text-3xl">notifications_paused</span>
          <p className="font-serif italic text-xs">End of updates</p>
        </div>

      </main>

    </div>
  );
};

export default NotificationsList;
