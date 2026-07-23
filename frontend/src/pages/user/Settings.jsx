import api from '../../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const sections = [
    {
      title: 'Account',
      items: [
        { icon: 'person', label: 'Edit Profile', desc: 'Update your name, photo, and bio', link: '/edit-profile' },
        { icon: 'lock', label: 'Security', desc: 'Password, 2FA, and active sessions', link: '/security-settings' },
        { icon: 'location_on', label: 'Addresses', desc: 'Manage your shipping addresses', link: '/addresses' },
        { icon: 'credit_card', label: 'Payment Methods', desc: 'Credit cards and linked accounts', link: '/bank-accounts' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'notifications', label: 'Notifications', desc: 'Email, push, and SMS preferences', link: '/notifications' },
        { icon: 'language', label: 'Language', desc: 'Change your display language', link: '#' },
        { icon: 'dark_mode', label: 'Appearance', desc: 'Light mode, dark mode, system', link: '#' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'help', label: 'Help Center', desc: 'FAQs and troubleshooting', link: '/help' },
        { icon: 'bug_report', label: 'Report an Issue', desc: 'Contact our support team', link: '/report-issue' },
        { icon: 'description', label: 'Terms & Privacy', desc: 'Legal documents and policies', link: '#' }
      ]
    }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/profile" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Profile
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Settings</h1>
        </div>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">{section.title}</h2>
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden divide-y divide-outline-variant/30">
                {section.items.map((item, i) => (
                  <Link key={i} to={item.link} className="flex items-center gap-4 p-4 hover:bg-surface-linen/50 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant w-10 h-10 flex items-center justify-center bg-surface-variant/40 rounded-full shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-on-surface">{item.label}</p>
                      <p className="font-body-sm text-on-surface-variant truncate">{item.desc}</p>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant text-[18px] shrink-0">chevron_right</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Version */}
        <div className="mt-10 text-center">
          <p className="font-body-sm text-on-surface-variant/50">TrueHand v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
