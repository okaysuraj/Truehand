import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await api.post('/auth/password/forgot', { email });
      setMessage(`Recovery email sent! (Dev note: Token is ${res.data.token})`);
    } catch (err) {
      setError(err.response?.data || 'Failed to send recovery email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-md w-full bg-surface-container-lowest p-8 rounded-lg shadow-sm border border-outline-variant/30">
        <h1 className="font-display-md text-3xl text-on-surface mb-2 text-center">Forgot Password</h1>
        <p className="font-body-md text-on-surface-variant mb-6 text-center">Enter your email address to receive a password reset link.</p>

        {message && <div className="mb-4 p-4 bg-forest-green/10 text-forest-green rounded text-sm">{message}</div>}
        {error && <div className="mb-4 p-4 bg-error-red/10 text-error-red rounded text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-label-md text-on-surface mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-outline-variant rounded focus:border-forest-green outline-none" 
              placeholder="you@example.com" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-forest-green text-white rounded font-label-md hover:bg-forest-green/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="font-label-md text-forest-green hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
