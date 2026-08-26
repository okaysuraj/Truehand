import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const OtpVerificationDesktop2 = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const inputRefs = useRef([]);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasted.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 4; i++) {
        newOtp[i] = pasted[i] || '';
      }
      setOtp(newOtp);
      const focusIndex = Math.min(pasted.length, 3);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 4) {
      setError('Please enter the complete 4-digit code.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Simulate verification — connect to real delivery auth when available
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerified(true);
      setTimeout(() => {
        navigate('/delivery/dashboard');
      }, 1000);
    } catch (err) {
      setError(err?.message || 'Verification failed. Please try again.');
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(120);
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-linen text-on-surface">
      {/* Top Navigation (Transactional Style - Logo Only) */}
      <header className="fixed top-0 w-full z-50 h-20 flex items-center px-margin-desktop bg-surface/40 backdrop-blur-sm">
        <div className="max-w-container-max mx-auto w-full flex justify-center">
          <h1 className="font-display-lg text-headline-md text-forest-green tracking-tight">TrueHand Logistics</h1>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center pt-20 px-margin-mobile md:px-margin-desktop">
        {/* Centered Verification Card */}
        <div className="w-full max-w-md bg-white shadow-sm p-stack-lg flex flex-col items-center">

          {/* Icon/Badge Section */}
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-stack-lg">
            <span className="material-symbols-outlined text-forest-green text-3xl">lock_person</span>
          </div>

          {/* Typography Header */}
          <div className="text-center mb-10">
            <h2 className="font-headline-lg text-headline-lg text-charcoal mb-stack-sm">Verify Identity</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mx-auto">
              We've sent a 4-digit security code to your registered mobile device.
            </p>
            <div className="mt-stack-sm flex items-center justify-center gap-2">
              <span className="font-label-md text-label-md text-forest-green">+1 (555) •••• 829</span>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-error-red text-sm font-medium mb-4 w-full text-center">{String(error)}</div>
          )}

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-stack-lg">
            <div className="flex justify-between gap-4 mb-stack-lg" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  className="w-16 h-20 text-center font-headline-lg text-headline-lg border-0 border-b-2 border-outline-variant bg-surface-container-low focus:bg-white transition-all outline-none focus:border-forest-green"
                  maxLength={1}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={e => handleChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  required
                  disabled={loading || verified}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              disabled={loading || verified}
              className="w-full h-14 bg-forest-green text-white font-label-md text-label-md rounded-lg hover:bg-forest-green/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
              type="submit"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-white">progress_activity</span>
              ) : verified ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span> Verified
                </span>
              ) : (
                <>
                  Verify & Login
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Actions */}
          <div className="mt-stack-lg w-full flex flex-col items-center gap-stack-sm">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Didn't receive code?</span>
              {timeLeft > 0 ? (
                <span className="font-label-sm text-label-sm text-forest-green font-bold opacity-50">
                  Resend in {formatTime(timeLeft)}
                </span>
              ) : (
                <button
                  className="font-label-sm text-label-sm text-forest-green font-bold hover:underline decoration-2 underline-offset-4"
                  onClick={handleResend}
                  type="button"
                >
                  Resend Now
                </button>
              )}
            </div>
            <Link
              to="/login"
              className="font-label-sm text-label-sm text-on-surface-variant/70 hover:text-charcoal transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Sign in with a different account
            </Link>
          </div>

        </div>
      </main>

      {/* Footer Identity */}
      <footer className="w-full py-stack-lg">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-stack-md border-t border-outline-variant/10 pt-stack-lg">
          <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 TrueHand Artisan Marketplace. Logistical Excellence.</p>
          <div className="flex gap-gutter">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-forest-green underline transition-colors" href="#">Carrier Agreement</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-forest-green underline transition-colors" href="#">Security Standards</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OtpVerificationDesktop2;
