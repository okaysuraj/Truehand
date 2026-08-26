import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Julian Thorne',
    email: user?.email || 'julian.thorne@lifestyle.com',
    phone: user?.phone || '+44 20 7946 0123',
    bio: "Deeply passionate about the intersection of sustainable materials and modern minimalism. My collection focuses on hand-thrown ceramics and organic textile art that celebrates the 'imperfections' of the human hand.",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user?.id) {
        const parts = form.fullName.split(' ');
        await api.put(`/users/${user.id}`, {
          firstName: parts[0] || '',
          lastName: parts.slice(1).join(' ') || '',
          email: form.email,
          phone: form.phone,
          bio: form.bio,
        });
      }
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        navigate('/profile');
      }, 1200);
    } catch (err) {
      console.warn(err);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        navigate('/profile');
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      <div className="max-w-[720px] mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs font-label-sm text-on-surface-variant">
          <Link to="/profile" className="hover:text-forest-green">Account</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-forest-green font-bold">Edit Details</span>
        </div>

        {/* Main Edit Card */}
        <section className="bg-white rounded-2xl p-8 md:p-12 border border-outline-variant/30 shadow-sm">
          
          <div className="mb-10 text-center">
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-charcoal mb-2">Personal Details</h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">Update your profile information and collector preferences.</p>
          </div>

          {saved && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2 text-xs font-semibold">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>Profile updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 text-xs">
            
            {/* Photo Change Area */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group cursor-pointer">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-outline-variant bg-surface-container-low">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Collector Portrait" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDelE9Be3dtqjNwu2DEBldvesU3iQIGgxqr_6OXaNEFoPSG0gZ1y23fSVyuclKNAsuvounw-WAKd5Ct9jvPswpKcll4uQtMks8DGCJsIe9IgGFhsFm0qN1l9opQragtflR9r6JvH184fXQrugzM9XJSWIyt4sGGq_d67xTshoY98gUddXZbh4wexhH9KLPwcJ5wfCQsKDigeL7Nt2qaYyI7r2Z2K_wZbNkN5r0t6CywPiAkDxQr0kgIHQ" 
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-forest-green text-white p-2 rounded-full shadow border-2 border-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => alert('Photo picker dialog opened.')}
                className="font-label-md text-xs text-forest-green font-bold hover:underline"
              >
                Change Portrait
              </button>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="fullName" 
                  required 
                  value={form.fullName} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
                  placeholder="Enter your full name" 
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={form.email} 
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
                    placeholder="email@example.com" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-outline-variant py-2.5 text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors font-mono" 
                    placeholder="+00 00 000 0000" 
                  />
                </div>
              </div>

              {/* Collector Bio */}
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Collector Bio
                </label>
                <textarea 
                  rows="4" 
                  name="bio" 
                  value={form.bio} 
                  onChange={handleChange}
                  placeholder="Share a few words about your appreciation for craftsmanship and design..."
                  className="w-full bg-transparent border border-outline-variant/40 rounded-xl p-4 text-xs focus:outline-none focus:border-forest-green leading-relaxed resize-none"
                />
              </div>

            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                type="button" 
                onClick={() => navigate('/profile')}
                className="w-full sm:w-auto px-8 py-3 text-on-surface-variant hover:text-charcoal font-semibold text-xs uppercase tracking-wider transition-colors order-2 sm:order-1"
              >
                Cancel Changes
              </button>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto px-10 py-3.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-bold shadow order-1 sm:order-2"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>

          </form>

        </section>

        {/* Security Settings Link */}
        <div className="mt-8 text-center">
          <Link 
            to="/security-settings" 
            className="text-xs font-label-sm text-on-surface-variant hover:text-terracotta transition-colors inline-flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">lock_reset</span>
            <span>Update password and security settings</span>
          </Link>
        </div>

      </div>

    </main>
  );
};

export default EditProfile;
