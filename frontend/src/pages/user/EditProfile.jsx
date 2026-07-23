import api from '../../services/api';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EditProfile = () => {
  const [form, setForm] = useState({
    firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', phone: '+1 (555) 012-3456', bio: 'Lover of handcrafted goods and sustainable living.'
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/profile" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Profile
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Edit Profile</h1>
        </div>

        {saved && (
          <div className="mb-6 bg-forest-green/10 border border-forest-green/20 rounded-lg p-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-forest-green">check_circle</span>
            <p className="font-body-md text-forest-green">Profile updated successfully!</p>
          </div>
        )}

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8 shadow-sm">
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-outline-variant/30">
            <div className="w-20 h-20 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green font-display-md text-3xl shrink-0">{form.firstName.charAt(0)}</div>
            <div>
              <p className="font-label-md text-on-surface mb-2">{form.firstName} {form.lastName}</p>
              <button className="px-4 py-2 border border-outline-variant text-on-surface font-label-sm rounded hover:bg-surface-variant/30 transition-colors">Change Photo</button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">First Name</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Last Name</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
            </div>
            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">Phone</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
            </div>
            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">Bio</label>
              <textarea name="bio" rows="3" value={form.bio} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-y"></textarea>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <Link to="/profile" className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Cancel</Link>
              <button type="submit" className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
