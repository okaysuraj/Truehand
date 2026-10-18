import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';
export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    setProfile(null);
    if (!user) return;
    api
      .get('/users/me')
      .then(({ data }) => {
        if (active) setProfile(data);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.error || 'Unable to load profile.');
      });
    return () => {
      active = false;
    };
  }, [user?.id]);
  return (
    <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <h1 className="font-display-lg text-4xl text-forest-green mb-6">Your account</h1>
      {error && <p role="alert">{error}</p>}
      {profile && (
        <div className="space-y-4">
          <p>{[profile.firstName, profile.lastName].filter(Boolean).join(' ')}</p>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>{profile.bio}</p>
          <p>Account type: {profile.role}</p>
          <p>Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      )}
      <nav className="flex flex-col gap-5 my-8">
        {user ? (
          <>
            {[
              ['/edit-profile', 'Edit profile'],
              ['/orders', 'Your orders'],
              ['/addresses', 'Saved addresses'],
              ['/wishlist', 'Wishlist'],
              ['/notifications', 'Notifications'],
            ].map(([to, label]) => (
              <Link className="underline" key={to} to={to}>
                {label}
              </Link>
            ))}
            {user.role === 'SELLER' && <Link to="/seller/dashboard">Seller dashboard</Link>}
            {user.role === 'DELIVERY' && <Link to="/delivery/dashboard">Delivery dashboard</Link>}
            {user.role === 'ADMIN' && <Link to="/admin/dashboard">Admin dashboard</Link>}
            <button className="text-left underline" onClick={logout}>
              Sign out
            </button>
          </>
        ) : (
          <Link to="/login">Sign in</Link>
        )}
      </nav>
    </main>
  );
}
