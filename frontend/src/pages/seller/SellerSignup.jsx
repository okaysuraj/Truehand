import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const SellerSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    studioName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const parts = form.fullName.split(' ');
      await authService.register({
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' '),
        email: form.email,
        password: form.password,
        role: 'SELLER',
        studioName: form.studioName,
      });
      alert('Please verify your email, then sign in to complete seller onboarding.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Unable to register. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-linen font-body-md text-on-surface flex items-center justify-center p-4 md:p-8 pt-24 pb-16">
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white border border-outline-variant/30">
        {/* Left Photo & Atmosphere Panel */}
        <div className="relative min-h-[380px] md:min-h-full flex flex-col justify-end p-8 md:p-12 text-white overflow-hidden">
          <div className="relative z-10 space-y-2">
            <h2 className="font-display-lg text-2xl md:text-3xl font-bold">Elevate your craft.</h2>
            <p className="font-body-md text-xs md:text-sm text-white/90 leading-relaxed">
              Join a global marketplace dedicated to the human touch and timeless design.
            </p>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
          <div className="text-center space-y-1">
            <h1 className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal">
              Join the Circle
            </h1>
            <p className="font-body-md text-xs text-on-surface-variant">
              Begin your journey as a curated artisan.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-error-red">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Elias Thorne"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                Studio Name
              </label>
              <input
                type="text"
                name="studioName"
                required
                value={form.studioName}
                onChange={handleChange}
                placeholder="e.g. Thorne & Co. Ceramics"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="elias@thorneceramics.com"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-label-sm uppercase font-semibold text-on-surface-variant tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow"
              >
                {loading ? 'Submitting...' : 'Apply to Sell'}
              </button>
            </div>

            <p className="text-[10px] text-center text-on-surface-variant leading-relaxed">
              By joining, you agree to our{' '}
              <span className="underline cursor-pointer">Artisan Terms</span> and{' '}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </form>

          <div className="text-center pt-2 border-t border-outline-variant/20 text-xs">
            <span className="text-on-surface-variant">Already an artisan? </span>
            <Link to="/login" className="font-bold text-forest-green hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerSignup;
