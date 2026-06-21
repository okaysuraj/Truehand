import React, { useState } from 'react';
import { useAuth } from '../services/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.role === 'SELLER') navigate('/seller/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err?.response?.data || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-on-background antialiased flex flex-col justify-center items-center p-margin-mobile md:p-margin-desktop bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container-low via-background to-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <main className="w-full max-w-md mx-auto">
        {/* Brand / Header */}
        <div className="text-center mb-stack-lg">
          <Link to="/" className="inline-block font-display-lg text-display-lg text-primary tracking-tight hover:opacity-80 transition-opacity duration-200">
            TrueHand
          </Link>
          <p className="mt-stack-sm font-body-md text-body-md text-on-surface-variant">
            Welcome back. Sign in to your account.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest p-margin-desktop md:p-12 rounded-lg shadow-sm border border-surface-container">
          {error && <div className="text-error text-center mb-4 text-sm font-medium w-full">{String(error)}</div>}
          <form onSubmit={submit} className="space-y-gutter">
            {/* Email Field */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-unit" htmlFor="email">Email address</label>
              <div className="relative">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  placeholder="you@example.com"
                  className="block w-full border-0 border-b border-outline-variant bg-transparent py-stack-sm pl-0 pr-10 text-on-surface focus:ring-0 focus:border-primary font-body-md text-body-md transition-colors placeholder:text-outline-variant"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <span className="material-symbols-outlined text-outline-variant" style={{fontVariationSettings: "'FILL' 0"}}>mail</span>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-unit">
                <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">Password</label>
                <div className="text-sm">
                  <Link to="#" className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors underline decoration-transparent hover:decoration-primary underline-offset-4">Forgot password?</Link>
                </div>
              </div>
              <div className="relative">
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="current-password" 
                  required 
                  placeholder="••••••••"
                  className="block w-full border-0 border-b border-outline-variant bg-transparent py-stack-sm pl-0 pr-10 text-on-surface focus:ring-0 focus:border-primary font-body-md text-body-md transition-colors placeholder:text-outline-variant"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <span className="material-symbols-outlined text-outline-variant" style={{fontVariationSettings: "'FILL' 0"}}>lock</span>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center pt-stack-sm">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary bg-transparent cursor-pointer" />
              <label htmlFor="remember-me" className="ml-2 block font-body-md text-body-md text-on-surface-variant cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-stack-md">
              <button disabled={loading} type="submit" className="flex w-full justify-center rounded-DEFAULT bg-primary px-3 py-4 font-label-md text-label-md text-on-primary hover:bg-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 active:scale-[0.98]">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-stack-lg text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Don't have an account?
            <Link to="/register" className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors ml-1 underline decoration-transparent hover:decoration-primary underline-offset-4">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
