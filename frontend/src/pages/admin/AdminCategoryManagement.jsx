import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/categories');
      setCategories(res.data || []);
    } catch { setCategories([]); }
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (editing) {
        await api.put(`/categories/${editing.id}`, form);
        setEditing(null);
      } else {
        await api.post('/categories', form);
      }
      setForm({ name: '', description: '' });
      fetchCategories();
    } catch (err) { setError('Failed to save category. Try again.'); }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch { alert('Could not delete category.'); }
  };

  const startEdit = (cat) => { setEditing(cat); setForm({ name: cat.name, description: cat.description || '' }); };
  const cancelEdit = () => { setEditing(null); setForm({ name: '', description: '' }); };

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Category Management</h1>
          <p className="font-body-md text-on-surface-variant">Create and manage product categories shown to shoppers.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="font-headline-sm text-on-surface mb-4">{editing ? 'Edit Category' : 'Add Category'}</h2>
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 font-body-sm mb-4">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-label-sm text-on-surface mb-1">Name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Ceramics"
                    className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3} placeholder="Short description..."
                    className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-none" />
                </div>
                <div className="flex gap-2">
                  {editing && <button type="button" onClick={cancelEdit} className="flex-1 py-2.5 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Cancel</button>}
                  <button type="submit" disabled={submitting} className="flex-1 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 disabled:opacity-50 transition-opacity">
                    {submitting ? 'Saving...' : editing ? 'Update' : 'Add Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="md:col-span-3">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-outline-variant/20">
                <h2 className="font-headline-sm text-on-surface">All Categories ({categories.length})</h2>
              </div>
              {loading ? (
                <div className="p-8 text-center"><span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span></div>
              ) : categories.length === 0 ? (
                <div className="p-12 text-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant block mb-3">category</span>
                  <p className="font-body-md text-on-surface-variant">No categories yet. Add your first one!</p>
                </div>
              ) : (
                <ul className="divide-y divide-outline-variant/15">
                  {categories.map(cat => (
                    <li key={cat.id} className="flex items-center justify-between p-4 hover:bg-surface-linen/30">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-forest-green/10 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined text-forest-green text-[18px]">category</span>
                        </div>
                        <div>
                          <p className="font-label-md text-on-surface">{cat.name}</p>
                          {cat.description && <p className="font-body-sm text-on-surface-variant truncate max-w-[200px]">{cat.description}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(cat)} className="p-2 text-on-surface-variant hover:text-forest-green transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(cat.id)} className="p-2 text-on-surface-variant hover:text-red-600 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryManagement;
