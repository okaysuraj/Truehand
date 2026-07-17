import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const NewListing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '', category: '', price: '', description: '',
    material: '', dimensions: '', weight: '', stock: '', sku: '', imageUrl: ''
  });
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // For demo purposes, create a local object URL preview and store the file
    const preview = URL.createObjectURL(file);
    setImages([...images, { file, preview }]);
  };

  const handleRemoveImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e, asDraft = false) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Build description with extra details appended
      let fullDescription = form.description;
      const extras = [];
      if (form.material) extras.push(`Material: ${form.material}`);
      if (form.dimensions) extras.push(`Dimensions: ${form.dimensions}`);
      if (form.weight) extras.push(`Weight: ${form.weight}`);
      if (form.sku) extras.push(`SKU: ${form.sku}`);
      if (extras.length) fullDescription += '\n\n' + extras.join(' | ');

      const payload = {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        description: fullDescription,
        stockQuantity: parseInt(form.stock) || 0,
        imageUrl: form.imageUrl || (images.length > 0 ? images[0].preview : ''),
        isAvailable: !asDraft,
        sellerId: user?.id,
        status: asDraft ? 'DRAFT' : 'PENDING',
      };

      await api.post('/products', payload);
      navigate('/seller/inventory');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create listing. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/seller/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Dashboard
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Create New Listing</h1>
          <p className="font-body-md text-on-surface-variant">Add a new handcrafted product to your storefront. Listings are reviewed before going live.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-body-sm">
            {error}
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
          {/* Images */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Product Images</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="aspect-square bg-surface-variant rounded-lg flex items-center justify-center relative overflow-hidden">
                  <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => handleRemoveImage(i)} className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow">✕</button>
                </div>
              ))}
              <label className="aspect-square border-2 border-dashed border-outline-variant/50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-forest-green transition-colors">
                <span className="material-symbols-outlined text-2xl text-outline-variant mb-1">add_photo_alternate</span>
                <span className="font-label-sm text-on-surface-variant">Add</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>

            {/* Or provide URL directly */}
            <div className="mt-4 space-y-2">
              <label className="block font-label-sm text-on-surface-variant">Or paste an image URL</label>
              <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
            </div>

            <p className="font-body-sm text-on-surface-variant mt-3">Upload up to 8 images. First image will be the cover.</p>
          </div>

          {/* Basic Info */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Basic Information</h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Product Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange}
                  placeholder="e.g. Hand-Thrown Ceramic Vase"
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Category *</label>
                  <select name="category" required value={form.category} onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface appearance-none">
                    <option value="">Select category</option>
                    <option>Ceramics</option><option>Textiles</option><option>Woodwork</option>
                    <option>Glasswork</option><option>Metalwork</option><option>Jewelry</option>
                    <option>Leather</option><option>Sculpture</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Price ($) *</label>
                  <input type="number" name="price" required step="0.01" value={form.price} onChange={handleChange}
                    placeholder="0.00"
                    className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Description *</label>
                <textarea name="description" required rows="4" value={form.description} onChange={handleChange}
                  placeholder="Describe your product, the craft process, and materials used..."
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-y"></textarea>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Material</label>
                <input type="text" name="material" value={form.material} onChange={handleChange} placeholder="e.g. Stoneware clay"
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Dimensions</label>
                <input type="text" name="dimensions" value={form.dimensions} onChange={handleChange} placeholder="e.g. 8×6×6 cm"
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">Weight</label>
                <input type="text" name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 1.2 kg"
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-sm text-on-surface">SKU</label>
                <input type="text" name="sku" value={form.sku} onChange={handleChange} placeholder="e.g. CER-001"
                  className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Inventory</h2>
            <div className="space-y-2 max-w-xs">
              <label className="block font-label-sm text-on-surface">Stock Quantity *</label>
              <input type="number" name="stock" required value={form.stock} onChange={handleChange} placeholder="0"
                className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
            </div>
            <p className="font-body-sm text-on-surface-variant mt-2">
              Products submitted for review will be set to <strong>PENDING</strong> and visible to admins. Drafts are saved privately.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link to="/seller/inventory" className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">
              Cancel
            </Link>
            <button
              type="button"
              disabled={submitting}
              onClick={(e) => handleSubmit(e, true)}
              className="px-8 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {submitting && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewListing;
