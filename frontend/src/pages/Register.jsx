import React, { useState } from 'react';
import { useAuth } from '../services/AuthProvider';
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
    
    // Split full name
    const nameParts = fullName.trim().split(' ');
    const fName = nameParts[0] || '';
    const lName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    
    try {
      const data = await register({
        ...form,
        firstName: fName,
        lastName: lName
      });
      if (data.role === 'SELLER') navigate('/seller/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err?.response?.data || 'Error creating account');
    }
    setLoading(false);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body-md text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23163428' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-stack-lg md:p-[48px] relative z-10 flex flex-col items-center">
          <Link to="/" className="mb-stack-lg inline-block hover:opacity-80 transition-opacity duration-200">
            <h1 className="font-display-lg text-display-lg text-primary tracking-tight">TrueHand</h1>
          </Link>
          
          <div className="text-center mb-stack-lg w-full">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">Join the Community</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Experience craftsmanship and quiet luxury.</p>
          </div>
          
          {error && <div className="text-error text-center mb-4 text-sm font-medium w-full">{String(error)}</div>}

          <form onSubmit={submit} className="w-full flex flex-col gap-stack-md">
            <div className="w-full mb-stack-sm">
              <fieldset className="w-full">
                <legend className="sr-only">Choose your role</legend>
                <div className="flex rounded-lg overflow-hidden border border-outline-variant p-1 bg-surface-container-low">
                  <div className="flex-1 relative">
                    <input 
                      type="radio" 
                      id="role-buyer" 
                      name="user_role" 
                      value="CUSTOMER" 
                      className="role-toggle-input sr-only" 
                      checked={form.role === 'CUSTOMER'}
                      onChange={e => setForm({...form, role: e.target.value})}
                    />
                    <label htmlFor="role-buyer" className="flex items-center justify-center w-full py-2 px-4 rounded-md font-label-md text-label-md cursor-pointer transition-all duration-200 text-center" style={{ backgroundColor: form.role === 'CUSTOMER' ? '#163428' : 'transparent', color: form.role === 'CUSTOMER' ? '#ffffff' : '#1b1c1c' }}>
                      I'm a Buyer
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      type="radio" 
                      id="role-seller" 
                      name="user_role" 
                      value="SELLER" 
                      className="role-toggle-input sr-only" 
                      checked={form.role === 'SELLER'}
                      onChange={e => setForm({...form, role: e.target.value})}
                    />
                    <label htmlFor="role-seller" className="flex items-center justify-center w-full py-2 px-4 rounded-md font-label-md text-label-md cursor-pointer transition-all duration-200 text-center" style={{ backgroundColor: form.role === 'SELLER' ? '#163428' : 'transparent', color: form.role === 'SELLER' ? '#ffffff' : '#1b1c1c' }}>
                      I'm a Seller
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            
            <div className="w-full">
              <label htmlFor="name" className="block font-label-sm text-label-sm text-on-surface-variant mb-unit">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Jane Doe" 
                  required 
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder-on-surface-variant/50 transition-colors" 
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full">
              <label htmlFor="email" className="block font-label-sm text-label-sm text-on-surface-variant mb-unit">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="jane@example.com" 
                  required 
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder-on-surface-variant/50 transition-colors" 
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="w-full">
              <label htmlFor="password" className="block font-label-sm text-label-sm text-on-surface-variant mb-unit">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder-on-surface-variant/50 transition-colors" 
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                />
                <button 
                  type="button" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none" 
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>
            
            <div className="w-full mt-stack-sm">
              <button disabled={loading} type="submit" className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 px-6 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300 flex justify-center items-center gap-2 group">
                {loading ? 'Creating...' : 'Create Account'}
                {!loading && <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              </button>
            </div>
          </form>
          
          <div className="mt-stack-lg text-center w-full">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Already have an account? 
              <Link to="/login" className="text-primary hover:underline font-label-md text-label-md ml-1 transition-all">Sign In</Link>
            </p>
          </div>
          
          <div className="mt-stack-md text-center w-full max-w-[280px]">
            <p className="font-label-sm text-label-sm text-on-surface-variant/70">
              By joining, you agree to our <Link to="#" className="underline hover:text-primary transition-colors">Terms of Service</Link> and <Link to="#" className="underline hover:text-primary transition-colors">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
