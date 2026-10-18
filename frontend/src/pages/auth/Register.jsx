import api from '../../services/api';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'CUSTOMER' });
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const nameParts = fullName.trim().split(' ');
    const fName = nameParts[0] || '';
    const lName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    try {
      await register({
        ...form,
        firstName: fName,
        lastName: lName,
      });
      setError(null);
      navigate('/login');
    } catch (err) {
      setError(err?.message || 'Error creating account');
    }
    setLoading(false);
  };
  React.useEffect(() => {}, []);

  return (
    <main className="flex-grow flex items-center justify-center pt-20 px-margin-mobile md:px-margin-desktop min-h-screen relative">
      {/* Visual Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[60%] bg-primary-fixed opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[50%] bg-secondary-fixed-dim opacity-10 blur-[100px] rounded-full"></div>
      </div>

      {/* Registration Card Container */}
      <div className="relative z-10 w-full max-w-[480px] my-section-gap">
        <div className="bg-surface-container-lowest rounded-lg shadow-[0_8px_30px_rgb(22,52,40,0.04)] overflow-hidden">
          {/* Card Header */}
          <div className="pt-stack-lg px-stack-lg md:px-12 text-center">
            <h1 className="font-headline-lg text-headline-lg text-forest-green mb-stack-sm">
              Create Your Account
            </h1>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Join a collective of artisans and connoisseurs who value the soul of crafted goods.
            </p>
          </div>

          {error && (
            <div className="text-error-red text-center mt-4 px-12 text-sm font-medium w-full">
              {String(error)}
            </div>
          )}

          {/* Form Section */}
          <form onSubmit={submit} className="p-stack-lg md:p-12 space-y-stack-md">
            {/* Role Selection */}
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                Account Type
              </label>
              <div className="flex rounded-lg overflow-hidden border border-outline-variant p-1 bg-surface-container-low mt-2">
                <div className="flex-1 relative">
                  <input
                    type="radio"
                    id="role-buyer"
                    name="user_role"
                    value="CUSTOMER"
                    className="sr-only"
                    checked={form.role === 'CUSTOMER'}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                  <label
                    htmlFor="role-buyer"
                    className="flex items-center justify-center w-full py-2 px-4 rounded-md font-label-md text-label-md cursor-pointer transition-all duration-200 text-center"
                    style={{
                      backgroundColor: form.role === 'CUSTOMER' ? '#163428' : 'transparent',
                      color: form.role === 'CUSTOMER' ? '#ffffff' : '#1b1c1b',
                    }}
                  >
                    I'm a Buyer
                  </label>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="radio"
                    id="role-seller"
                    name="user_role"
                    value="SELLER"
                    className="sr-only"
                    checked={form.role === 'SELLER'}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                  <label
                    htmlFor="role-seller"
                    className="flex items-center justify-center w-full py-2 px-4 rounded-md font-label-md text-label-md cursor-pointer transition-all duration-200 text-center"
                    style={{
                      backgroundColor: form.role === 'SELLER' ? '#163428' : 'transparent',
                      color: form.role === 'SELLER' ? '#ffffff' : '#1b1c1b',
                    }}
                  >
                    I'm a Seller
                  </label>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label
                className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block"
                htmlFor="full_name"
              >
                Full Name
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-on-surface placeholder:text-outline focus:ring-0 transition-all outline-none"
                id="full_name"
                type="text"
                placeholder="E.g. Julian Vaus"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label
                className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-on-surface placeholder:text-outline focus:ring-0 transition-all outline-none"
                id="email"
                type="email"
                placeholder="julian@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <label
                className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-on-surface placeholder:text-outline focus:ring-0 transition-all outline-none"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                className="absolute right-0 bottom-3 text-outline hover:text-forest-green transition-colors focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 pt-stack-sm">
              <div className="flex items-center h-5">
                <input
                  className="h-4 w-4 rounded-sm border-outline-variant text-forest-green focus:ring-forest-green focus:ring-offset-0 cursor-pointer"
                  id="terms"
                  type="checkbox"
                  required
                />
              </div>
              <label
                className="font-label-sm text-label-sm text-on-surface-variant leading-tight cursor-pointer"
                htmlFor="terms"
              >
                I agree to the{' '}
                <Link
                  to="/features/terms"
                  className="text-forest-green font-semibold hover:underline underline-offset-2"
                >
                  Terms &amp; Conditions
                </Link>{' '}
                and acknowledge the{' '}
                <Link
                  to="/features/policies"
                  className="text-forest-green font-semibold hover:underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Primary Action */}
            <button
              disabled={loading}
              className="w-full mt-stack-lg bg-forest-green text-white py-4 rounded-lg font-label-md text-label-md tracking-widest uppercase hover:bg-primary-container active:scale-[0.98] transition-all duration-300 shadow-md flex justify-center items-center h-14"
              type="submit"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-white">
                  progress_activity
                </span>
              ) : (
                'Join the Collective'
              )}
            </button>
          </form>

          {/* Card Footer */}
          <div className="bg-surface-container-low p-6 text-center">
            <p className="font-body-md text-on-surface-variant">
              Already have an account?
              <Link
                to="/login"
                className="text-forest-green font-bold hover:underline underline-offset-4 ml-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Branding Accent */}
        <p className="mt-stack-md text-center font-label-sm text-outline-variant uppercase tracking-widest">
          Est. 2024 • Genuine Craftsmanship
        </p>
      </div>
    </main>
  );
};

export default Register;
