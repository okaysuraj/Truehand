import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const SecuritySettings = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      alert('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 800);
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Header */}
      <header className="mb-12 max-w-3xl mx-auto text-center space-y-2">
        <h1 className="font-display-lg text-3xl md:text-5xl text-charcoal font-bold">
          Account Security
        </h1>
        <p className="font-body-lg text-xs md:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Manage your authentication methods and monitor account access to ensure your artisanal collection remains private.
        </p>
      </header>

      <div className="max-w-3xl mx-auto space-y-8 text-xs">
        
        {/* Section 1: Change Password */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-forest-green text-2xl">lock</span>
            <h2 className="font-headline-md text-lg text-charcoal font-bold">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            <div className="space-y-1.5 max-w-md">
              <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Current Password
              </label>
              <input 
                type="password" 
                required 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-surface-container-low border-b border-outline-variant py-2.5 px-3 text-sm focus:outline-none focus:border-forest-green rounded-t"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  New Password
                </label>
                <input 
                  type="password" 
                  required 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-surface-container-low border-b border-outline-variant py-2.5 px-3 text-sm focus:outline-none focus:border-forest-green rounded-t"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Confirm New Password
                </label>
                <input 
                  type="password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-surface-container-low border-b border-outline-variant py-2.5 px-3 text-sm focus:outline-none focus:border-forest-green rounded-t"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="submit" 
                disabled={updating}
                className="bg-forest-green text-white px-8 py-3 rounded-lg font-label-md text-xs uppercase tracking-widest hover:opacity-90 transition-all font-bold shadow"
              >
                {updating ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </section>

        {/* Section 2: Two-Factor Authentication */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-forest-green text-2xl">verified_user</span>
              <h2 className="font-headline-md text-lg text-charcoal font-bold">Two-Factor Authentication</h2>
            </div>
            <span className="bg-[#ffdecb] text-[#97472a] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
              Highly Recommended
            </span>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="max-w-md">
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4">
                Add an extra layer of security to your account by requiring a code from your phone in addition to your password.
              </p>
              <button 
                onClick={() => alert('Authenticator app setup guide opened.')}
                className="flex items-center gap-1.5 text-forest-green font-label-md text-xs font-bold hover:underline"
              >
                <span>Setup Authenticator App</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Toggle switch */}
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input 
                type="checkbox" 
                checked={twoFactorEnabled} 
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-green"></div>
            </label>
          </div>
        </section>

        {/* Section 3: Recent Activity */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-forest-green text-2xl">history</span>
            <h2 className="font-headline-md text-lg text-charcoal font-bold">Recent Activity</h2>
          </div>

          <div className="divide-y divide-outline-variant/20">
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-charcoal">
                  <span className="material-symbols-outlined text-lg">desktop_windows</span>
                </div>
                <div>
                  <p className="font-label-md text-xs font-bold text-on-surface">macOS Sonoma &bull; Chrome 124</p>
                  <p className="text-[11px] text-on-surface-variant">London, United Kingdom &bull; Active now</p>
                </div>
              </div>
              <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Current Session
              </span>
            </div>

            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-charcoal">
                  <span className="material-symbols-outlined text-lg">smartphone</span>
                </div>
                <div>
                  <p className="font-label-md text-xs font-bold text-on-surface">iPhone 15 Pro &bull; Mobile App</p>
                  <p className="text-[11px] text-on-surface-variant">Paris, France &bull; 2 hours ago</p>
                </div>
              </div>
              <button 
                onClick={() => alert('Session revoked.')}
                className="text-xs text-on-surface-variant hover:text-red-700 underline font-semibold"
              >
                Revoke
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => alert('Viewing all active sessions...')}
              className="text-on-surface-variant font-label-md text-xs hover:text-charcoal transition-colors flex items-center gap-1 font-semibold"
            >
              View all activity sessions
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        </section>

        {/* Section 4: Danger Zone */}
        <section className="bg-red-50/50 p-6 md:p-8 rounded-2xl border border-red-200/60 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-700 text-2xl">warning</span>
            <h2 className="font-headline-md text-lg text-red-900 font-bold">Danger Zone</h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-red-200/40">
            <div>
              <h4 className="font-headline-md text-sm text-charcoal font-bold">Deactivate Account</h4>
              <p className="font-body-md text-xs text-on-surface-variant">Temporarily disable your profile and artisanal listings.</p>
            </div>
            <button 
              onClick={() => alert('Account deactivation initiated.')}
              className="px-5 py-2.5 border border-outline-variant text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
            >
              Deactivate
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h4 className="font-headline-md text-sm text-red-800 font-bold">Delete Account</h4>
              <p className="font-body-md text-xs text-on-surface-variant">Permanently remove all data, order history, and artisan connections.</p>
            </div>
            <button 
              onClick={() => {
                if (confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
                  alert('Account deletion requested.');
                }
              }}
              className="px-6 py-2.5 bg-red-700 text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:bg-red-800 transition-colors shadow"
            >
              Delete Permanently
            </button>
          </div>
        </section>

      </div>

    </main>
  );
};

export default SecuritySettings;
