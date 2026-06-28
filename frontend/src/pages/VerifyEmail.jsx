import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState('Verifying your email...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('Invalid verification link.');
      return;
    }

    verifyEmail(token)
      .then(() => setStatus('Email verified successfully. You can now sign in.'))
      .catch((err) => {
        setStatus('Verification failed.');
        setError(err?.response?.data || 'Unable to verify email.');
      });
  }, [searchParams, verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-on-background p-4">
      <div className="w-full max-w-lg rounded-2xl border border-surface-variant bg-surface-container-low p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>
        <p className="text-body-md mb-6">{status}</p>
        {error && <p className="text-error mb-6">{String(error)}</p>}
        <div className="space-x-3">
          <Link to="/login" className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-on-primary hover:bg-primary-container transition-colors">Go to Sign in</Link>
          <Link to="/" className="inline-flex items-center justify-center rounded-lg border border-outline-variant px-4 py-3 text-sm font-semibold text-on-surface">Return home</Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
