import React, { useState } from 'react';
import { useAuth } from '../services/AuthProvider';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await forgotPassword(email);
      setMessage(res.message || 'If that email is registered, check your inbox.');
    } catch (err) {
      setError(err?.response?.data || 'Unable to send reset email.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-on-background p-4">
      <div className="w-full max-w-md rounded-2xl border border-surface-variant bg-surface-container-low p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <p className="text-body-md text-on-surface-variant mb-6">Enter your email to receive a password reset link.</p>

        {message && <div className="rounded-lg bg-surface-success p-4 text-success-on-surface mb-4">{message}</div>}
        {error && <div className="rounded-lg bg-surface-error p-4 text-error-on-surface mb-4">{String(error)}</div>}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="you@example.com"
            />
          </div>
          <button disabled={loading} type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary-container">
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        <div className="mt-6 text-sm text-on-surface-variant">
          <Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
