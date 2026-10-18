import api from '../../services/api';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
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
      else navigate('/profile');
    } catch (err) {
      const errorMessage = err?.message || err?.response?.data || 'Invalid email or password';
      setError(errorMessage);
    }
    setLoading(false);
  };
  React.useEffect(() => {}, []);

  return (
    <main className="min-h-screen flex items-center justify-center pt-20 px-margin-mobile">
      {/* Login Card */}
      <div className="w-full max-w-[480px] bg-white p-12 rounded-lg shadow-[0_4px_24px_rgba(22,52,40,0.06)] animate-in fade-in slide-in-from-bottom-4 duration-700 z-10">
        {/* Branding/Heading */}
        <div className="text-center mb-10">
          <h1 className="font-headline-lg text-headline-lg text-forest-green mb-2">Welcome Back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Access your curated collection of artisanal pieces.
          </p>
        </div>

        {error && (
          <div className="text-error-red text-center mb-4 text-sm font-medium w-full">
            {String(error)}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={submit} className="space-y-stack-md">
          <div className="space-y-base">
            <label
              className="font-label-sm text-label-sm text-on-surface-variant block ml-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-3 bg-surface-container-lowest border border-clay-outline/20 rounded-lg focus:ring-1 focus:ring-forest-green focus:border-forest-green transition-all outline-none text-body-md"
              id="email"
              type="email"
              placeholder="artisanal.life@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-base mt-4">
            <div className="flex justify-between items-center ml-1">
              <label
                className="font-label-sm text-label-sm text-on-surface-variant block"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="font-label-sm text-label-sm text-forest-green hover:underline decoration-forest-green/30 hover:decoration-forest-green transition-all"
              >
                Forgot password?
              </Link>
            </div>
            <input
              className="w-full px-4 py-3 bg-surface-container-lowest border border-clay-outline/20 rounded-lg focus:ring-1 focus:ring-forest-green focus:border-forest-green transition-all outline-none text-body-md"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-forest-green text-white font-label-md text-label-md py-4 rounded-lg hover:shadow-lg active:scale-[0.98] transition-all duration-300 mt-2 flex justify-center items-center h-14"
            type="submit"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-white">
                progress_activity
              </span>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-stack-lg text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-forest-green font-bold underline underline-offset-4 decoration-forest-green/30 hover:decoration-forest-green transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 pointer-events-none -z-10 opacity-30 overflow-hidden">
        <div className="w-[120%] h-full bg-no-repeat bg-cover bg-bottom mix-blend-multiply filter blur-[1px]" />
      </div>
    </main>
  );
};

export default Login;
