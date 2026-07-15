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
  const [showPassword, setShowPassword] = useState(false);

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
    <main className="min-h-screen flex items-center justify-center pt-20 px-margin-mobile">
      {/* Card */}
      <div className="w-full max-w-[480px] bg-white p-12 rounded-lg shadow-[0_4px_24px_rgba(22,52,40,0.06)] animate-in fade-in slide-in-from-bottom-4 duration-700 z-10">
        
        {/* Branding/Heading */}
        <div className="text-center mb-10">
          <h1 className="font-headline-lg text-headline-lg text-forest-green mb-2">Reset Password</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Create a new password for your account.</p>
        </div>

        {message && <div className="text-forest-green bg-primary-fixed text-center mb-4 text-sm font-medium w-full p-3 rounded-md">{message}</div>}
        {error && <div className="text-error-red bg-error-container text-center mb-4 text-sm font-medium w-full p-3 rounded-md">{String(error)}</div>}

        {/* Form */}
        <form onSubmit={submit} className="space-y-stack-md">
          
          <div className="space-y-base relative">
            <label className="font-label-sm text-label-sm text-on-surface-variant block ml-1" htmlFor="password">New Password</label>
            <input 
              className="w-full px-4 py-3 bg-surface-container-lowest border border-clay-outline/20 rounded-lg focus:ring-1 focus:ring-forest-green focus:border-forest-green transition-all outline-none text-body-md" 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button 
              type="button"
              className="absolute right-3 top-9 text-outline hover:text-forest-green transition-colors focus:outline-none" 
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
            </button>
          </div>

          <div className="space-y-base mt-4 relative">
            <label className="font-label-sm text-label-sm text-on-surface-variant block ml-1" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              className="w-full px-4 py-3 bg-surface-container-lowest border border-clay-outline/20 rounded-lg focus:ring-1 focus:ring-forest-green focus:border-forest-green transition-all outline-none text-body-md" 
              id="confirmPassword" 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-forest-green text-white font-label-md text-label-md py-4 rounded-lg hover:shadow-lg active:scale-[0.98] transition-all duration-300 mt-2 flex justify-center items-center h-14" 
            type="submit"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-white">progress_activity</span>
            ) : (
              'Reset password'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-stack-lg text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            <Link to="/login" className="text-forest-green font-bold underline underline-offset-4 decoration-forest-green/30 hover:decoration-forest-green transition-all flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 pointer-events-none -z-10 opacity-30 overflow-hidden">
        <div 
          className="w-[120%] h-full bg-no-repeat bg-cover bg-bottom mix-blend-multiply filter blur-[1px]" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCm61ZjhZLeX2kPEcrqlYwQVA-MhjMgEiGTA_YEKN-xEBjymVOOu5eY375Zfqz0E1-96aPY0aUQS9QU2Nj5W-z3MpzENOSvoU7vy66yRoVuexKoDsxaYoyWkttfIXFf8NXo9bSGwCJjnm3JrTvh36X0jWWVGjlvoz-DB7gkdbL2kBdtTmHyZjs6ku26TUmeQPkGhyn-y2Rv8NZfbOiRS5SwScAQ2JuiVizCJ4R9yyhwVGA5f4DeyVoT3g')" }}
        />
      </div>
    </main>
  );
};

export default ResetPassword;
