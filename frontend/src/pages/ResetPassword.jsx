import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('No reset token found in the link.');
    }
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!token) {
      setError('Reset link is invalid.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword({ token, newPassword: password });
      setMessage(res.message || 'Password updated successfully.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err?.response?.data || 'Unable to reset password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-on-background p-4">
      <div className="w-full max-w-md rounded-2xl border border-surface-variant bg-surface-container-low p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
        <p className="text-body-md text-on-surface-variant mb-6">Create a new password for your account.</p>

        {message && <div className="rounded-lg bg-surface-success p-4 text-success-on-surface mb-4">{message}</div>}
        {error && <div className="rounded-lg bg-surface-error p-4 text-error-on-surface mb-4">{String(error)}</div>}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2" htmlFor="password">New password</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="New password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2" htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Confirm new password"
            />
          </div>

          <button disabled={loading} type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary-container">
            {loading ? 'Resetting...' : 'Reset password'}
          </button>
        </form>

        <div className="mt-6 text-sm text-on-surface-variant">
          <Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
