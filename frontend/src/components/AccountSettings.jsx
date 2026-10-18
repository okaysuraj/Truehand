import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../context/AuthProvider';
import api from '../services/api';
import settings from '../../../shared/account-settings.json';
import { createPushRegistrationHook } from '../../../shared/push-registration';
import { pushAdapter } from '../services/pushRegistration';
import { createAccountSettingsHook, updatePreference } from '../../../shared/account-settings';
const usePush = createPushRegistrationHook(React, pushAdapter);
const useSettings = createAccountSettingsHook(React, api);
export default function AccountSettings({ section }) {
  const { user } = useAuth();
  const { preferences, error, loading, busy, save, retry } = useSettings(user?.id);
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const push = usePush(user?.id);
  async function security(action) {
    setSending(true);
    setNotice('');
    try {
      if (!auth.currentUser) throw new Error('Please sign in again.');
      if (action === 'reset') await sendPasswordResetEmail(auth, auth.currentUser.email);
      else await sendEmailVerification(auth.currentUser);
      setNotice('Email sent. Check your inbox.');
    } catch (failure) {
      setNotice(failure.message || 'Unable to send email. Please retry.');
    } finally {
      setSending(false);
    }
  }
  return (
    <main className="pt-28 pb-20 px-6 max-w-3xl mx-auto space-y-6">
      <h1 className="font-display-lg text-4xl text-forest-green">
        {section === 'security'
          ? settings.securityTitle
          : section === 'region'
            ? settings.regionTitle
            : settings.title}
      </h1>
      {!user ? (
        <Link to="/login">Sign in to manage your account</Link>
      ) : (
        <>
          {(!section || section === 'region') && (
            <section className="border p-5 space-y-3">
              <h2 className="text-2xl">{settings.regionTitle}</h2>
              {Object.entries(settings.region).map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
            </section>
          )}
          {(!section || section === 'notifications') && (
            <section className="border p-5 space-y-4">
              <h2 className="text-2xl">{settings.notificationTitle}</h2>
              <button className="border px-4 py-3" disabled={push.busy} onClick={push.enable}>
                {push.busy ? 'Registering device...' : 'Enable push on this device'}
              </button>
              {push.notice && <p role="status">{push.notice}</p>}
              {loading && <p>Loading preferences...</p>}
              {error && (
                <p role="alert">
                  {error} <button onClick={retry}>Retry</button>
                </p>
              )}
              {preferences &&
                Object.entries(settings.notificationCategories).map(([category, label]) => (
                  <fieldset key={category} className="space-y-3">
                    <legend>{label}</legend>
                    {['email', 'push'].map((channel) => (
                      <label className="mr-5 inline-flex gap-2" key={channel}>
                        <input
                          type="checkbox"
                          checked={!!preferences[category]?.[channel]}
                          disabled={busy}
                          onChange={(event) =>
                            save(
                              updatePreference(
                                preferences,
                                category,
                                channel,
                                event.target.checked,
                              ),
                            )
                          }
                        />
                        {channel}
                      </label>
                    ))}
                  </fieldset>
                ))}
            </section>
          )}
          {(!section || section === 'security') && (
            <section className="border p-5 space-y-4">
              <h2 className="text-2xl">{settings.securityTitle}</h2>
              <p>{user.email}</p>
              <p>Email verified: {auth.currentUser?.emailVerified ? 'Yes' : 'No'}</p>
              {Object.entries(settings.securityActions)
                .filter(([key]) =>
                  key === 'reset'
                    ? auth.currentUser?.providerData.some(
                        (provider) => provider.providerId === 'password',
                      )
                    : !auth.currentUser?.emailVerified,
                )
                .map(([key, label]) => (
                  <button
                    className="block border px-4 py-3"
                    key={key}
                    disabled={sending}
                    onClick={() => security(key)}
                  >
                    {label}
                  </button>
                ))}
              {notice && <p role="status">{notice}</p>}
            </section>
          )}
          <nav className="space-y-3">
            {settings.links.map((link) => (
              <Link className="block underline" key={link.feature} to={`/features/${link.feature}`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </main>
  );
}
