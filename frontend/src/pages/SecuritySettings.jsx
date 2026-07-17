import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SecuritySettings = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/profile" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Profile
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Security Settings</h1>
          <p className="font-body-md text-on-surface-variant">Manage your password and account security.</p>
        </div>

        <div className="space-y-6">
          {/* Password */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Password</h3>
                  <p className="font-body-sm text-on-surface-variant">Last changed 30 days ago</p>
                </div>
              </div>
              <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="text-forest-green font-label-md hover:underline">{showPasswordForm ? 'Cancel' : 'Change'}</button>
            </div>
            {showPasswordForm && (
              <form className="space-y-4 pt-4 border-t border-outline-variant/30" onSubmit={(e) => { e.preventDefault(); setShowPasswordForm(false); }}>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Current Password</label>
                  <input type="password" required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">New Password</label>
                  <input type="password" required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Confirm New Password</label>
                  <input type="password" required className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
                </div>
                <button type="submit" className="px-6 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">Update Password</button>
              </form>
            )}
          </div>

          {/* Two-Factor */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">smartphone</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Two-Factor Authentication</h3>
                  <p className="font-body-sm text-on-surface-variant">Add an extra layer of security to your account.</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-forest-green text-forest-green font-label-sm rounded hover:bg-forest-green/5 transition-colors">Enable</button>
            </div>
          </div>

          {/* Sessions */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">devices</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Active Sessions</h3>
                  <p className="font-body-sm text-on-surface-variant">Manage devices where you're logged in.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-outline-variant/30">
              {[
                { device: 'Chrome on Windows', location: 'Portland, OR', time: 'Active now', current: true },
                { device: 'Safari on iPhone', location: 'Portland, OR', time: '2 hours ago', current: false }
              ].map((session, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">{session.current ? 'computer' : 'phone_iphone'}</span>
                    <div>
                      <p className="font-label-md text-on-surface">{session.device} {session.current && <span className="text-forest-green font-label-sm">(This device)</span>}</p>
                      <p className="font-body-sm text-on-surface-variant">{session.location} · {session.time}</p>
                    </div>
                  </div>
                  {!session.current && <button className="text-red-600 font-label-sm hover:underline">Revoke</button>}
                </div>
              ))}
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600 shrink-0 mt-0.5">warning</span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-red-800 mb-2">Delete Account</h3>
                <p className="font-body-sm text-red-700 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                <button className="px-5 py-2 border border-red-300 text-red-600 font-label-md rounded hover:bg-red-100 transition-colors">Delete My Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
