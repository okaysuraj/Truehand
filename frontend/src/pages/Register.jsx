import api from '../services/api';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
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
        lastName: lName
      });
      setError(null);
      navigate('/login');
    } catch (err) {
      setError(err?.message || 'Error creating account');
    }
    setLoading(false);
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

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
            <h1 className="font-headline-lg text-headline-lg text-forest-green mb-stack-sm">Create Your Account</h1>
            <p className="font-body-md text-on-surface-variant leading-relaxed">Join a collective of artisans and connoisseurs who value the soul of crafted goods.</p>
          </div>

          {error && <div className="text-error-red text-center mt-4 px-12 text-sm font-medium w-full">{String(error)}</div>}

          {/* Form Section */}
          <form onSubmit={submit} className="p-stack-lg md:p-12 space-y-stack-md">
            
            {/* Role Selection */}
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">Account Type</label>
              <div className="flex rounded-lg overflow-hidden border border-outline-variant p-1 bg-surface-container-low mt-2">
                <div className="flex-1 relative">
                  <input 
                    type="radio" 
                    id="role-buyer" 
                    name="user_role" 
                    value="CUSTOMER" 
                    className="sr-only" 
                    checked={form.role === 'CUSTOMER'}
                    onChange={e => setForm({...form, role: e.target.value})}
                  />
                  <label htmlFor="role-buyer" className="flex items-center justify-center w-full py-2 px-4 rounded-md font-label-md text-label-md cursor-pointer transition-all duration-200 text-center" style={{ backgroundColor: form.role === 'CUSTOMER' ? '#163428' : 'transparent', color: form.role === 'CUSTOMER' ? '#ffffff' : '#1b1c1b' }}>
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
                    onChange={e => setForm({...form, role: e.target.value})}
                  />
                  <label htmlFor="role-seller" className="flex items-center justify-center w-full py-2 px-4 rounded-md font-label-md text-label-md cursor-pointer transition-all duration-200 text-center" style={{ backgroundColor: form.role === 'SELLER' ? '#163428' : 'transparent', color: form.role === 'SELLER' ? '#ffffff' : '#1b1c1b' }}>
                    I'm a Seller
                  </label>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block" htmlFor="full_name">Full Name</label>
              <input 
                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-on-surface placeholder:text-outline focus:ring-0 transition-all outline-none" 
                id="full_name" 
                type="text"
                placeholder="E.g. Julian Vaus" 
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block" htmlFor="email">Email Address</label>
              <input 
                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-on-surface placeholder:text-outline focus:ring-0 transition-all outline-none" 
                id="email" 
                type="email"
                placeholder="julian@example.com" 
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block" htmlFor="password">Password</label>
              <input 
                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-on-surface placeholder:text-outline focus:ring-0 transition-all outline-none" 
                id="password" 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••" 
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                required
              />
              <button 
                className="absolute right-0 bottom-3 text-outline hover:text-forest-green transition-colors focus:outline-none" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
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
              <label className="font-label-sm text-label-sm text-on-surface-variant leading-tight cursor-pointer" htmlFor="terms">
                I agree to the <Link to="#" className="text-forest-green font-semibold hover:underline underline-offset-2">Terms &amp; Conditions</Link> and acknowledge the <Link to="#" className="text-forest-green font-semibold hover:underline underline-offset-2">Privacy Policy</Link>.
              </label>
            </div>

            {/* Primary Action */}
            <button 
              disabled={loading}
              className="w-full mt-stack-lg bg-forest-green text-white py-4 rounded-lg font-label-md text-label-md tracking-widest uppercase hover:bg-primary-container active:scale-[0.98] transition-all duration-300 shadow-md flex justify-center items-center h-14" 
              type="submit"
            >
              {loading ? <span className="material-symbols-outlined animate-spin text-white">progress_activity</span> : 'Join the Collective'}
            </button>

            {/* Divider */}
            <div className="relative py-stack-md">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-container-high"></div></div>
              <div className="relative flex justify-center text-label-sm uppercase tracking-widest"><span className="bg-surface-container-lowest px-4 text-outline">Or register with</span></div>
            </div>

            {/* Social Actions */}
            <div className="grid grid-cols-2 gap-stack-md">
              <button type="button" className="flex items-center justify-center gap-2 border border-outline-variant py-3 rounded-lg font-label-sm text-on-surface hover:bg-surface-container-low transition-all active:scale-[0.98]">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 border border-outline-variant py-3 rounded-lg font-label-sm text-on-surface hover:bg-surface-container-low transition-all active:scale-[0.98]">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.8 2.04-.15 3.65.86 4.5 2.14-3.41 1.96-2.83 6.64.67 8.01-.84 2.18-1.92 4.19-3.83 2.82zm-4.32-14.8c-.2-2.25 1.83-4.33 4.12-4.48.33 2.5-1.98 4.73-4.12 4.48z" fill="#000"/></svg>
                Apple
              </button>
            </div>
          </form>

          {/* Card Footer */}
          <div className="bg-surface-container-low p-6 text-center">
            <p className="font-body-md text-on-surface-variant">
              Already have an account? 
              <Link to="/login" className="text-forest-green font-bold hover:underline underline-offset-4 ml-1">Log In</Link>
            </p>
          </div>
        </div>

        {/* Branding Accent */}
        <p className="mt-stack-md text-center font-label-sm text-outline-variant uppercase tracking-widest">Est. 2024 • Genuine Craftsmanship</p>
      </div>
    </main>
  );
};

export default Register;
