import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '', category: '', price: '', description: '',
    stockQuantity: '', imageUrl: '', isAvailable: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const p = res.data;
        setForm({
          name: p.name || '',
          category: p.category || '',
          price: p.price?.toString() || '',
          description: p.description || '',
          stockQuantity: p.stockQuantity?.toString() || '',
          imageUrl: p.imageUrl || '',
          isAvailable: p.isAvailable !== false,
        });
      } catch (err) {
        setError('Product not found or you do not have permission to edit it.');
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.put(`/products/${id}`, {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        description: form.description,
        stockQuantity: parseInt(form.stockQuantity) || 0,
        imageUrl: form.imageUrl,
        isAvailable: form.isAvailable,
        sellerId: user?.id,
      });
      navigate('/seller/inventory');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product. Please try again.');
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="pt-24 min-h-screen bg-surface-linen flex items-center justify-center">
      <span className="material-symbols-outlined animate-spin text-forest-green text-4xl">progress_activity</span>
    </div>
  );

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/seller/inventory" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Inventory
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Edit Product</h1>
          <p className="font-body-md text-on-surface-variant">Update your product listing. Changes are saved immediately.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-body-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Preview */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Product Image</h2>
            {form.imageUrl && (
              <div className="w-48 h-48 rounded-lg overflow-hidden mb-4 border border-outline-variant/30">
                <img src={form.imageUrl} alt="Product" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-2">
              <label className="block font-label-sm text-on-surface">Image URL</label>
              <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Basic Information</h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Product Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange}
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Category *</label>
                  <select name="category" required value={form.category} onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface">
                    <option value="">Select category</option>
                    {['Ceramics','Textiles','Woodwork','Glasswork','Metalwork','Jewelry','Leather','Sculpture'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Price ($) *</label>
                  <input type="number" name="price" required step="0.01" value={form.price} onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Description *</label>
                <textarea name="description" required rows="4" value={form.description} onChange={handleChange}
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-y" />
              </div>
            </div>
          </div>

          {/* Inventory & Availability */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Inventory & Availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Stock Quantity *</label>
                <input type="number" name="stockQuantity" required value={form.stockQuantity} onChange={handleChange}
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setForm(f => ({ ...f, isAvailable: !f.isAvailable }))}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${form.isAvailable ? 'bg-forest-green' : 'bg-outline-variant'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${form.isAvailable ? 'translate-x-7' : 'translate-x-1'}`} />
              </div>
              <span className="font-label-md text-on-surface">Product is available for purchase</span>
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <Link to="/seller/inventory" className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
              {saving && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
