import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_BANNERS = [
  { id: 1, title: 'Summer Craft Sale', subtitle: 'Up to 40% off handmade goods', image: '', active: true, link: '/flash-sale', startDate: '2024-06-01', endDate: '2024-08-31' },
  { id: 2, title: 'New Artisan Collections', subtitle: 'Fresh arrivals from independent makers', image: '', active: false, link: '/products', startDate: '2024-09-01', endDate: '2024-09-30' },
];

const AdminBannerManagement = () => {
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', image: '', link: '', startDate: '', endDate: '', active: true });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setBanners(b => b.map(ban => ban.id === editing.id ? { ...ban, ...form } : ban));
      setEditing(null);
    } else {
      setBanners(b => [...b, { ...form, id: Date.now() }]);
    }
    setForm({ title: '', subtitle: '', image: '', link: '', startDate: '', endDate: '', active: true });
    setShowForm(false);
  };

  const toggleActive = (id) => setBanners(b => b.map(ban => ban.id === id ? { ...ban, active: !ban.active } : ban));
  const deleteBanner = (id) => { if (window.confirm('Delete this banner?')) setBanners(b => b.filter(ban => ban.id !== id)); };
  const startEdit = (ban) => { setEditing(ban); setForm({ title: ban.title, subtitle: ban.subtitle, image: ban.image, link: ban.link, startDate: ban.startDate, endDate: ban.endDate, active: ban.active }); setShowForm(true); };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Banner Management</h1>
              <p className="font-body-md text-on-surface-variant">Manage homepage banners and promotional content.</p>
            </div>
            <button onClick={() => { setEditing(null); setForm({ title: '', subtitle: '', image: '', link: '', startDate: '', endDate: '', active: true }); setShowForm(true); }}
              className="px-5 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>New Banner
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-6">
            <h2 className="font-headline-sm text-on-surface mb-4">{editing ? 'Edit Banner' : 'New Banner'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <label className="block font-label-sm text-on-surface">Title *</label>
                <input required name="title" value={form.title} onChange={handleChange} placeholder="Banner headline" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block font-label-sm text-on-surface">Subtitle</label>
                <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Supporting text" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Link</label>
                <input name="link" value={form.link} onChange={handleChange} placeholder="/products" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Start Date</label>
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">End Date</label>
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="w-4 h-4 accent-forest-green" />
                <label className="font-label-md text-on-surface">Active immediately</label>
              </div>
              <div className="md:col-span-2 flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {banners.map(ban => (
            <div key={ban.id} className={`bg-surface-container-lowest border rounded-lg p-5 shadow-sm flex gap-4 transition-all ${ban.active ? 'border-forest-green/30' : 'border-outline-variant/30 opacity-70'}`}>
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-forest-green/20 to-terracotta/20 shrink-0 overflow-hidden">
                {ban.image && <img src={ban.image} alt={ban.title} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h3 className="font-headline-sm text-on-surface">{ban.title}</h3>
                    <p className="font-body-sm text-on-surface-variant">{ban.subtitle}</p>
                    <p className="font-label-sm text-on-surface-variant mt-1">{ban.startDate} → {ban.endDate || 'No end'} · <span className="text-forest-green">{ban.link}</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-label-sm px-2.5 py-0.5 rounded ${ban.active ? 'bg-forest-green/10 text-forest-green' : 'bg-surface-variant text-on-surface-variant'}`}>{ban.active ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => toggleActive(ban.id)} className={`p-2 rounded hover:bg-surface-variant/30 transition-colors ${ban.active ? 'text-amber-600' : 'text-forest-green'}`}>
                  <span className="material-symbols-outlined text-[18px]">{ban.active ? 'visibility_off' : 'visibility'}</span>
                </button>
                <button onClick={() => startEdit(ban)} className="p-2 text-on-surface-variant hover:text-forest-green transition-colors rounded hover:bg-surface-variant/30">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button onClick={() => deleteBanner(ban.id)} className="p-2 text-on-surface-variant hover:text-red-600 transition-colors rounded hover:bg-red-50">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBannerManagement;
