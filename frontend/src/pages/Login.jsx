import api from '../services/api';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
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
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <main className="min-h-screen flex items-center justify-center pt-20 px-margin-mobile">
      {/* Login Card */}
      <div className="w-full max-w-[480px] bg-white p-12 rounded-lg shadow-[0_4px_24px_rgba(22,52,40,0.06)] animate-in fade-in slide-in-from-bottom-4 duration-700 z-10">
        
        {/* Branding/Heading */}
        <div className="text-center mb-10">
          <h1 className="font-headline-lg text-headline-lg text-forest-green mb-2">Welcome Back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Access your curated collection of artisanal pieces.</p>
        </div>

        {error && <div className="text-error-red text-center mb-4 text-sm font-medium w-full">{String(error)}</div>}

        {/* Login Form */}
        <form onSubmit={submit} className="space-y-stack-md">
          <div className="space-y-base">
            <label className="font-label-sm text-label-sm text-on-surface-variant block ml-1" htmlFor="email">Email</label>
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
              <label className="font-label-sm text-label-sm text-on-surface-variant block" htmlFor="password">Password</label>
              <Link to="/forgot-password" className="font-label-sm text-label-sm text-forest-green hover:underline decoration-forest-green/30 hover:decoration-forest-green transition-all">Forgot password?</Link>
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
              <span className="material-symbols-outlined animate-spin text-white">progress_activity</span>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-stack-lg">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-clay-outline/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 font-label-sm text-label-sm text-outline-variant">Or continue with</span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-stack-md">
          <button className="flex items-center justify-center gap-2 border border-charcoal/10 py-3 rounded-lg hover:bg-surface-container-low transition-all active:scale-[0.98]">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
            <span className="font-label-sm text-label-sm">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-charcoal/10 py-3 rounded-lg hover:bg-surface-container-low transition-all active:scale-[0.98]">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.8 2.04-.15 3.65.86 4.5 2.14-3.41 1.96-2.83 6.64.67 8.01-.84 2.18-1.92 4.19-3.83 2.82zm-4.32-14.8c-.2-2.25 1.83-4.33 4.12-4.48.33 2.5-1.98 4.73-4.12 4.48z" fill="#000"/></svg>
            <span className="font-label-sm text-label-sm">Apple</span>
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-stack-lg text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Don't have an account?{' '}
            <Link to="/register" className="text-forest-green font-bold underline underline-offset-4 decoration-forest-green/30 hover:decoration-forest-green transition-all">Sign up</Link>
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

export default Login;
