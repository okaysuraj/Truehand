import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const OtpVerificationDesktop1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [resendStatus, setResendStatus] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  useEffect(() => {
    // Auto-focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);

    // Auto-focus next input
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
      // Use token from URL params if available, otherwise use the OTP code
      const token = searchParams.get('token') || code;
      await verifyEmail(token);
      setVerified(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err?.response?.data || err?.message || 'Verification failed. Please try again.');
      setLoading(false);
    }
  };

  const handleResend = () => {
    setResendStatus('Code Sent!');
    setTimeout(() => {
      setResendStatus(null);
    }, 3000);
  };

  return (
    <main className="flex-grow flex items-center justify-center pt-24 px-margin-mobile md:px-margin-desktop min-h-screen">
      <div className="w-full max-w-md mx-auto text-center space-y-stack-lg">

        {/* Header Section */}
        <div className="space-y-stack-sm">
          <h1 className="font-headline-lg text-headline-lg text-forest-green">Verify Your Identity</h1>
          <p className="font-body-md text-on-surface-variant">
            We've sent a 4-digit verification code to your registered email. Please enter it below to continue.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="text-error-red text-sm font-medium">{String(error)}</div>
        )}

        {/* OTP Input Section */}
        <form onSubmit={handleSubmit} className="space-y-stack-lg">
          <div className="flex justify-center gap-stack-md" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                className="w-16 h-20 text-center text-headline-md font-headline-md bg-white border border-outline-variant rounded-lg transition-all focus:ring-1 focus:ring-forest-green focus:border-forest-green outline-none"
                maxLength={1}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                required
                disabled={loading || verified}
              />
            ))}
          </div>

          <div className="pt-stack-md">
            <button
              disabled={loading || verified}
              className="w-full bg-forest-green text-white py-4 px-stack-lg rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm flex justify-center items-center h-14"
              type="submit"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-white">progress_activity</span>
              ) : verified ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span> Verified
                </span>
              ) : (
                'Verify & Continue'
              )}
            </button>
          </div>
        </form>

        {/* Footer Action */}
        <div className="flex flex-col items-center gap-stack-sm">
          <p className="font-body-md text-on-surface-variant">Didn't receive the code?</p>
          <button
            className={`font-label-md text-label-md ${resendStatus ? 'text-on-surface-variant' : 'text-forest-green'} hover:underline underline-offset-4 decoration-1 transition-all`}
            onClick={handleResend}
            disabled={!!resendStatus}
            type="button"
          >
            {resendStatus || 'Resend Code'}
          </button>
        </div>

      </div>
    </main>
  );
};

export default OtpVerificationDesktop1;
