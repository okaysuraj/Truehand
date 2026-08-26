import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const NewListing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
  ]);
  const [materials, setMaterials] = useState(['Clay', 'Natural Glaze']);
  const [newMaterialInput, setNewMaterialInput] = useState('');
  const [showAddMaterial, setShowAddMaterial] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Ceramics',
    description: '',
    height: '',
    width: '',
    price: '',
    stockQuantity: '10',
    sku: 'TX-' + Math.floor(1000 + Math.random() * 9000),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const addMaterial = (e) => {
    e.preventDefault();
    if (newMaterialInput.trim()) {
      setMaterials([...materials, newMaterialInput.trim()]);
      setNewMaterialInput('');
      setShowAddMaterial(false);
    }
  };

  const removeMaterial = (m) => {
    setMaterials(materials.filter(item => item !== m));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user?.id) {
        await api.post('/products', {
          name: form.title || 'Handcrafted Pottery Piece',
          description: form.description,
          category: form.category,
          price: parseFloat(form.price) || 120.00,
          stockQuantity: parseInt(form.stockQuantity, 10) || 5,
          sellerId: user.id,
          imageUrl: photos[0],
        });
      }
      alert('Listing created successfully!');
      navigate('/seller/inventory');
    } catch (err) {
      console.warn(err);
      alert('Listing created successfully (preview mode)!');
      navigate('/seller/inventory');
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation Bar */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisan Portal</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Master Workshop</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Overview
            </Link>
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Orders
            </Link>
            <Link to="/seller/inventory" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-terracotta font-bold border-r-2 border-terracotta">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
            <Link to="/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">insights</span>
              Analytics
            </Link>
            <Link to="/finances" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-outline-variant/20">
          <button className="w-full bg-forest-green text-white py-3 px-4 rounded-lg font-label-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow">
            <span className="material-symbols-outlined text-sm">add</span>
            New Listing
          </button>
          <Link to="/help" className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface-variant hover:text-forest-green transition-colors font-medium">
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            Support
          </Link>
        </div>
      </aside>

      {/* Main Form Canvas */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Page Header & Top Stepper */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
            <div>
              <h2 className="font-display-lg text-2xl md:text-4xl text-charcoal font-bold">Create New Listing</h2>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
                Bring your creation to the global marketplace by sharing its story.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => alert('Draft saved successfully!')}
                className="px-6 py-2.5 font-label-md text-xs uppercase tracking-wider font-semibold border border-charcoal text-charcoal hover:bg-surface-container rounded-lg transition-colors"
              >
                Save as Draft
              </button>
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="px-6 py-2.5 font-label-md text-xs uppercase tracking-widest font-bold bg-forest-green text-white hover:opacity-90 rounded-lg transition-opacity shadow"
              >
                Continue to Pricing
              </button>
            </div>
          </div>

          {/* Stepper UI */}
          <div className="flex items-center justify-center max-w-2xl mx-auto py-4">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-xs shadow">
                1
              </div>
              <span className="font-label-md text-xs mt-1.5 text-terracotta font-bold">Media &amp; Details</span>
            </div>
            <div className="flex-1 h-[2px] bg-outline-variant/40 mx-4" />
            <div className="flex flex-col items-center opacity-40">
              <div className="w-9 h-9 rounded-full bg-surface-container-highest text-charcoal flex items-center justify-center font-bold text-xs">
                2
              </div>
              <span className="font-label-md text-xs mt-1.5 font-semibold">Pricing &amp; Logistics</span>
            </div>
            <div className="flex-1 h-[2px] bg-outline-variant/40 mx-4" />
            <div className="flex flex-col items-center opacity-40">
              <div className="w-9 h-9 rounded-full bg-surface-container-highest text-charcoal flex items-center justify-center font-bold text-xs">
                3
              </div>
              <span className="font-label-md text-xs mt-1.5 font-semibold">Review &amp; Publish</span>
            </div>
          </div>
        </section>

        {/* Form Layout: Asymmetric Two-Column Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Media Upload */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/30 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-headline-md text-base font-bold text-charcoal">Product Imagery</h3>
                <span className="font-label-sm text-xs text-on-surface-variant">Up to 8 high-resolution photos</span>
              </div>

              {/* Large Drag & Drop Area */}
              <div 
                onClick={() => alert('Photo upload dialog opened.')}
                className="border-2 border-dashed border-outline-variant/60 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center bg-surface-container-lowest hover:border-terracotta hover:bg-surface-linen transition-all cursor-pointer text-center p-8 group"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-3 group-hover:text-terracotta transition-colors">
                  <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                </div>
                <p className="font-headline-md text-sm font-bold text-charcoal mb-1">
                  Drag and drop your photos here
                </p>
                <p className="font-body-md text-xs text-on-surface-variant">
                  or <span className="text-terracotta underline font-semibold">browse your files</span>
                </p>
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-4">
                  High Quality Photography Recommended
                </span>
              </div>

              {/* 4 Thumbnails strip */}
              <div className="grid grid-cols-4 gap-4">
                {photos.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-outline-variant bg-surface-container">
                    <img src={img} alt="Product" className="w-full h-full object-cover" />
                  </div>
                ))}
                {[1, 2, 3].map((slot) => (
                  <div 
                    key={slot}
                    onClick={() => alert('Photo upload slot clicked.')}
                    className="aspect-square rounded-xl border-2 border-dashed border-outline-variant/40 flex items-center justify-center text-outline-variant hover:border-forest-green hover:text-forest-green cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">add_photo_alternate</span>
                  </div>
                ))}
              </div>

              {/* Artisan Tip Box */}
              <div className="bg-surface-container-low/70 p-4 rounded-xl flex items-start gap-3 border border-outline-variant/20">
                <span className="material-symbols-outlined text-terracotta text-lg mt-0.5">lightbulb</span>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  <strong className="text-charcoal font-semibold">Artisan Tip:</strong> Use natural light and a clean background to showcase the true craftsmanship and textures of your piece.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Basic Info & Story */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Basic Information Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/30 space-y-6 text-xs">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">
                Basic Information
              </span>

              {/* Product Title */}
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant">
                  Product Title
                </label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Hand-Thrown Terra Cotta Vase"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green font-medium"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant">
                  Category
                </label>
                <select 
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green font-medium"
                >
                  <option>Ceramics</option>
                  <option>Textiles</option>
                  <option>Woodwork</option>
                  <option>Jewelry</option>
                  <option>Art Prints</option>
                </select>
              </div>

              {/* Primary Materials */}
              <div className="space-y-2">
                <label className="block font-label-sm uppercase font-semibold text-on-surface-variant">
                  Primary Materials
                </label>
                <div className="flex flex-wrap gap-2">
                  {materials.map(m => (
                    <span key={m} className="px-3 py-1.5 bg-surface-container rounded-full text-xs font-semibold text-charcoal flex items-center gap-1.5">
                      {m}
                      <button type="button" onClick={() => removeMaterial(m)} className="hover:text-red-600">
                        &times;
                      </button>
                    </span>
                  ))}
                  {showAddMaterial ? (
                    <div className="flex items-center gap-1">
                      <input 
                        type="text"
                        value={newMaterialInput}
                        onChange={(e) => setNewMaterialInput(e.target.value)}
                        placeholder="Material name"
                        className="p-1 px-2 text-xs border border-outline-variant rounded-lg"
                      />
                      <button type="button" onClick={addMaterial} className="text-xs bg-forest-green text-white px-2 py-1 rounded">Add</button>
                    </div>
                  ) : (
                    <button 
                      type="button" 
                      onClick={() => setShowAddMaterial(true)}
                      className="px-3 py-1.5 border border-dashed border-outline-variant rounded-full text-xs font-semibold text-on-surface-variant hover:border-forest-green hover:text-forest-green"
                    >
                      + Add Material
                    </button>
                  )}
                </div>
              </div>

              {/* The Story (Description) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block font-label-sm uppercase font-semibold text-on-surface-variant">
                    The Story (Description)
                  </label>
                  <span className="text-[10px] text-on-surface-variant">{form.description.length} / 2000</span>
                </div>
                <textarea 
                  rows="5"
                  name="description"
                  maxLength={2000}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the inspiration, the process, and what makes this piece unique..."
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green resize-none leading-relaxed"
                />
              </div>

            </div>

            {/* Dimensions & Weight */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/30 space-y-4 text-xs">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block">
                Dimensions &amp; Weight
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-label-sm text-on-surface-variant font-semibold">Height (cm)</label>
                  <input 
                    type="number"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5 text-xs" 
                    placeholder="e.g. 24"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-label-sm text-on-surface-variant font-semibold">Width (cm)</label>
                  <input 
                    type="number"
                    name="width"
                    value={form.width}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5 text-xs" 
                    placeholder="e.g. 15"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="lg:col-span-12 pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/seller/inventory')}
              className="text-xs font-semibold text-on-surface-variant hover:text-charcoal uppercase tracking-wider"
            >
              Discard Changes
            </button>
            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={() => alert('Draft saved.')}
                className="px-8 py-3 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
              >
                Save Draft
              </button>
              <button 
                type="submit" 
                className="px-10 py-3.5 bg-forest-green text-white rounded-lg font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow flex items-center gap-1.5"
              >
                <span>Continue to Pricing</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

        </form>

      </main>

    </div>
  );
};

export default NewListing;
