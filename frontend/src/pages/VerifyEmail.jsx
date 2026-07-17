import api from '../services/api';
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

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
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <main className="flex-grow flex items-center justify-center pt-24 px-margin-mobile md:px-margin-desktop min-h-screen relative bg-surface-linen text-on-surface">
      <div className="w-full max-w-md mx-auto text-center space-y-stack-lg z-10">
        
        {/* Header Section */}
        <div className="space-y-stack-sm bg-surface-container-lowest p-12 rounded-lg shadow-[0_8px_30px_rgb(22,52,40,0.04)]">
          <h1 className="font-headline-lg text-headline-lg text-forest-green mb-4">Email Verification</h1>
          
          <div className="mb-8">
            {error ? (
              <span className="material-symbols-outlined text-error-red text-6xl mb-4">error</span>
            ) : status === 'Verifying your email...' ? (
              <span className="material-symbols-outlined text-forest-green text-6xl animate-spin mb-4">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-forest-green text-6xl mb-4">check_circle</span>
            )}
            
            <p className="font-body-md text-on-surface-variant text-lg">
              {status}
            </p>
            {error && <p className="text-error-red mt-2">{String(error)}</p>}
          </div>

          <div className="pt-stack-md flex flex-col gap-4">
            <Link 
              to="/login" 
              className="w-full bg-forest-green text-white py-4 px-stack-lg rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm inline-block"
            >
              Go to Sign In
            </Link>
            <Link 
              to="/" 
              className="w-full bg-surface-container text-on-surface py-4 px-stack-lg rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-all active:scale-[0.98] inline-block"
            >
              Return Home
            </Link>
          </div>
        </div>
        
      </div>
      
      {/* Decorative Background Element */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[60%] bg-primary-fixed opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[50%] bg-secondary-fixed-dim opacity-10 blur-[100px] rounded-full"></div>
      </div>
    </main>
  );
};

export default VerifyEmail;
