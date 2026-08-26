import api from '../../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_BANNERS = [
  { id: 1, title: 'Summer Craft Sale', subtitle: 'Up to 40% off handmade goods', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80', active: true, link: '/flash-sale', startDate: '2024-06-01', endDate: '2024-08-31' },
  { id: 2, title: 'New Artisan Collections', subtitle: 'Fresh arrivals from independent makers', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80', active: false, link: '/products', startDate: '2024-09-01', endDate: '2024-09-30' },
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
      setBanners(b => [{ ...form, id: Date.now() }, ...b]);
    }
    setForm({ title: '', subtitle: '', image: '', link: '', startDate: '', endDate: '', active: true });
    setShowForm(false);
  };

  const toggleActive = (id) => setBanners(b => b.map(ban => ban.id === id ? { ...ban, active: !ban.active } : ban));
  const deleteBanner = (id) => { if (window.confirm('Delete this banner?')) setBanners(b => b.filter(ban => ban.id !== id)); };
  
  const startEdit = (ban) => { 
    setEditing(ban); 
    setForm({ title: ban.title, subtitle: ban.subtitle, image: ban.image, link: ban.link, startDate: ban.startDate, endDate: ban.endDate, active: ban.active }); 
    setShowForm(true); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Banner CMS</h1>
              <p className="font-body-md text-on-surface-variant">Manage the storefront carousel, promotional banners, and featured artisan spotlights.</p>
            </div>
            <button onClick={() => { setEditing(null); setForm({ title: '', subtitle: '', image: '', link: '', startDate: '', endDate: '', active: true }); setShowForm(true); }}
              className="px-5 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add</span>Create Campaign
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-sm mb-10 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-forest-green/5 blur-3xl rounded-full"></div>
            
            <h2 className="font-headline-sm text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-forest-green">{editing ? 'edit' : 'campaign'}</span>
              {editing ? 'Edit Banner Campaign' : 'New Banner Campaign'}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="md:col-span-2 space-y-2">
                <label className="block font-label-sm text-on-surface uppercase tracking-wider">Campaign Headline *</label>
                <input required name="title" value={form.title} onChange={handleChange} placeholder="e.g. Summer Craft Sale" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block font-label-sm text-on-surface uppercase tracking-wider">Supporting Subtitle</label>
                <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="e.g. Up to 40% off handmade goods" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface uppercase tracking-wider">Hero Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
                <p className="text-xs text-on-surface-variant mt-1">Recommended: 1920x600px High-Res JPEG</p>
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface uppercase tracking-wider">Call to Action Link</label>
                <input name="link" value={form.link} onChange={handleChange} placeholder="/flash-sale" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface uppercase tracking-wider">Launch Date</label>
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface uppercase tracking-wider">End Date (Optional)</label>
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              
              <div className="md:col-span-2 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-outline-variant/30 mt-2">
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-green"></div>
                    <span className="ml-3 font-label-md text-on-surface">Publish Immediately</span>
                  </label>
                </div>
                
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity shadow-sm">{editing ? 'Save Changes' : 'Publish Campaign'}</button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {banners.map(ban => (
            <div key={ban.id} className={`bg-surface-container-lowest border rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row transition-all duration-300 ${ban.active ? 'border-forest-green/30 hover:shadow-md' : 'border-outline-variant/30 opacity-70'}`}>
              
              <div className="md:w-64 h-48 md:h-auto relative bg-surface-variant shrink-0 overflow-hidden group">
                {ban.image ? (
                  <img src={ban.image} alt={ban.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline">No Image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent md:hidden"></div>
              </div>
              
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-label-sm px-2.5 py-0.5 rounded-full ${ban.active ? 'bg-green-100 text-green-800' : 'bg-surface-variant text-on-surface-variant'}`}>
                        {ban.active ? 'Live on Storefront' : 'Draft / Inactive'}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-on-surface mb-1">{ban.title}</h3>
                    <p className="font-body-md text-on-surface-variant mb-4">{ban.subtitle}</p>
                    
                    <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm">
                      <div>
                        <span className="text-on-surface-variant font-label-sm mr-2 uppercase">Duration:</span>
                        <span className="text-charcoal">{ban.startDate} &rarr; {ban.endDate || 'No end'}</span>
                      </div>
                      <div>
                        <span className="text-on-surface-variant font-label-sm mr-2 uppercase">Link:</span>
                        <span className="text-forest-green hover:underline cursor-pointer">{ban.link}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col gap-2">
                    <button onClick={() => toggleActive(ban.id)} className={`p-2.5 rounded-full border transition-colors ${ban.active ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100' : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'}`} title={ban.active ? "Pause Campaign" : "Activate Campaign"}>
                      <span className="material-symbols-outlined text-[20px]">{ban.active ? 'pause' : 'play_arrow'}</span>
                    </button>
                    <button onClick={() => startEdit(ban)} className="p-2.5 rounded-full border border-outline-variant/50 text-on-surface-variant hover:text-forest-green hover:border-forest-green transition-colors bg-surface-container-lowest" title="Edit">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button onClick={() => deleteBanner(ban.id)} className="p-2.5 rounded-full border border-outline-variant/50 text-on-surface-variant hover:text-red-600 hover:border-red-600 hover:bg-red-50 transition-colors bg-surface-container-lowest" title="Delete">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
          
          {banners.length === 0 && !showForm && (
            <div className="text-center py-16 bg-surface-container-lowest border border-outline-variant/30 rounded-xl">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">campaign</span>
              <p className="font-body-md text-on-surface-variant">No campaigns found. Create one to populate the storefront.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBannerManagement;
