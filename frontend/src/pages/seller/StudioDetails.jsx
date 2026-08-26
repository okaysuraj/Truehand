import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const StudioDetails = () => {
  const navigate = useNavigate();
  const [studioName, setStudioName] = useState('The Earthenware Atelier');
  const [category, setCategory] = useState('Ceramics & Pottery');
  const [street, setStreet] = useState('482 Artisans Row, Suite 12');
  const [city, setCity] = useState('Asheville');
  const [state, setState] = useState('North Carolina');
  const [zip, setZip] = useState('28801');
  const [bio, setBio] = useState(
    'Founded in the heart of the Blue Ridge Mountains, The Earthenware Atelier focuses on small-batch functional ceramics. Our process honors traditional wheel-throwing techniques while experimenting with locally sourced minerals for unique glaze finishes. Every piece is a dialogue between the tactile earth and the modern table.'
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface">
      
      {/* Side Navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-linen border-r border-outline-variant/30 fixed top-0 bottom-0 z-30">
        <div className="px-6 py-8">
          <h1 className="font-headline-md text-xl text-forest-green font-bold">Artisanal Admin</h1>
          <p className="font-label-sm text-xs text-on-surface-variant opacity-70 tracking-wider">Marketplace Manager</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <Link to="/admin" className="flex items-center text-on-surface-variant px-4 py-3 hover:bg-surface-container transition-colors rounded-lg font-label-md text-xs font-semibold">
            <span className="material-symbols-outlined mr-3 text-[20px]">dashboard</span>
            Dashboard
          </Link>
          <Link to="/admin/users" className="flex items-center text-forest-green font-bold border-l-4 border-forest-green px-4 py-3 bg-surface-container-low font-label-md text-xs">
            <span className="material-symbols-outlined mr-3 text-[20px]">group</span>
            Users &amp; Studios
          </Link>
          <Link to="/admin/products" className="flex items-center text-on-surface-variant px-4 py-3 hover:bg-surface-container transition-colors rounded-lg font-label-md text-xs font-semibold">
            <span className="material-symbols-outlined mr-3 text-[20px]">inventory_2</span>
            Products
          </Link>
          <Link to="/admin/orders" className="flex items-center text-on-surface-variant px-4 py-3 hover:bg-surface-container transition-colors rounded-lg font-label-md text-xs font-semibold">
            <span className="material-symbols-outlined mr-3 text-[20px]">shopping_bag</span>
            Orders
          </Link>
          <Link to="/admin/finances" className="flex items-center text-on-surface-variant px-4 py-3 hover:bg-surface-container transition-colors rounded-lg font-label-md text-xs font-semibold">
            <span className="material-symbols-outlined mr-3 text-[20px]">payments</span>
            Finances
          </Link>
          <Link to="/settings" className="flex items-center text-on-surface-variant px-4 py-3 hover:bg-surface-container transition-colors rounded-lg font-label-md text-xs font-semibold">
            <span className="material-symbols-outlined mr-3 text-[20px]">settings</span>
            Settings
          </Link>
        </nav>

        <div className="p-6 border-t border-outline-variant/30">
          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 bg-forest-green text-white font-label-md text-xs rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 font-semibold shadow-sm"
          >
            <span>View Storefront</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 px-8 flex justify-between items-center bg-surface/90 backdrop-blur-md border-b border-outline-variant/40 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input 
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-2 pl-9 pr-4 font-body-md text-xs focus:outline-none focus:border-forest-green" 
                placeholder="Search studio records..." 
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-on-surface-variant hover:text-forest-green transition-colors relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-outline-variant/40"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-label-md text-xs text-on-surface font-bold">Alex Rivera</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-tighter">Admin Manager</p>
              </div>
              <img 
                className="h-10 w-10 rounded-full border border-outline-variant object-cover" 
                alt="Alex Rivera" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsc1rH-1BtYmvSFgebHaVQCLNvDN2GPfcRyk4ZHbqayQE9nHg2UsZ_6jnPpcVyDs2Q9sCcTh-330Mp3ZnbKlJKI3W2tJ69OlTl3YWpMDJJHU0iOVd11hfmWrrAq1Px6T77fCY1VL3M6OAglRv_knCSumd6MhNYoHapG5Qp8mUKL1AAEZSXeriga7H-yQYOYBImF6wm-ZFQckTxuV3HwA3xVx8KcbVONQ-W6vQYmjbqphLqlpxIN-lQIA" 
              />
            </div>
          </div>
        </header>

        {/* Form Main Canvas */}
        <main className="p-8 md:p-12 max-w-[900px] mx-auto w-full pb-24">
          
          {/* Page Header */}
          <div className="mb-10 flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-outline-variant/30 pb-6">
            <div>
              <nav className="flex items-center gap-2 mb-2 text-on-surface-variant font-label-sm text-xs">
                <Link to="/admin/users" className="hover:text-forest-green font-semibold">Studios</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-forest-green font-semibold">Studio Details</span>
              </nav>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-forest-green font-bold">Studio Configuration</h2>
              <p className="text-on-surface-variant text-xs mt-1">Edit and refine the public profile of the artisan workspace.</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => navigate(-1)}
                className="px-5 py-2 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-wider rounded hover:bg-surface-container transition-colors font-semibold"
              >
                Discard
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-forest-green text-white font-label-md text-xs uppercase tracking-wider rounded shadow-sm hover:opacity-90 transition-all font-semibold"
              >
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-8">
            
            {/* Primary Identity Section */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-forest-green shrink-0">
                  <span className="material-symbols-outlined text-2xl">store</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-lg text-on-surface font-bold">Primary Identity</h3>
                  <p className="text-on-surface-variant text-xs">Define the core branding and classification of this studio.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Studio Name</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant py-2 font-body-lg text-sm text-on-surface focus:outline-none focus:border-forest-green transition-colors" 
                    type="text" 
                    value={studioName}
                    onChange={(e) => setStudioName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Primary Category</label>
                  <select 
                    className="w-full bg-transparent border-b border-outline-variant py-2 font-body-lg text-sm text-on-surface focus:outline-none focus:border-forest-green cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Ceramics &amp; Pottery</option>
                    <option>Fine Woodworking</option>
                    <option>Textile Arts</option>
                    <option>Glassblowing</option>
                    <option>Jewelry Design</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Physical Location Section */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-forest-green shrink-0">
                  <span className="material-symbols-outlined text-2xl">location_on</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-lg text-on-surface font-bold">Studio Location</h3>
                  <p className="text-on-surface-variant text-xs">Manage the physical address and shipping origins.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Street Address</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant py-2 text-sm text-on-surface focus:outline-none focus:border-forest-green" 
                    type="text" 
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">City</label>
                    <input 
                      className="w-full bg-transparent border-b border-outline-variant py-2 text-sm text-on-surface focus:outline-none focus:border-forest-green" 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">State / Province</label>
                    <input 
                      className="w-full bg-transparent border-b border-outline-variant py-2 text-sm text-on-surface focus:outline-none focus:border-forest-green" 
                      type="text" 
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Zip Code</label>
                    <input 
                      className="w-full bg-transparent border-b border-outline-variant py-2 text-sm text-on-surface focus:outline-none focus:border-forest-green" 
                      type="text" 
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                </div>

                {/* Map Preview */}
                <div className="relative h-40 w-full rounded-lg overflow-hidden border border-outline-variant/20 group">
                  <img 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-500" 
                    alt="Map of Asheville" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9sLL9JIqWYcZyiXC4PiCwpfwOWftaTlB2UgiFq58PjMAr9iGw4TefDE_FpwooRqfB3-KSaV69AfgT5bwQRfODFk3Uz4phVlpUEnueeslL6ur8ihub3Z9U1NN0kusAbLdqj9nNa5XPOuJo3HwMwOmHTKBnPrYI7Gl_gSx3wa-wRbQOupwC6z-aW3JtF6zmQQDIzl8QGg-EDzrnN81mGAjmaGgyUOtUwvx5CmVVpq14WpsQSgLP0l9f_g" 
                  />
                  <div className="absolute inset-0 bg-forest-green/10 flex items-center justify-center pointer-events-none">
                    <span className="material-symbols-outlined text-forest-green text-3xl">explore</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Studio Narrative Section */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-forest-green shrink-0">
                  <span className="material-symbols-outlined text-2xl">ink_pen</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-lg text-on-surface font-bold">Studio Bio</h3>
                  <p className="text-on-surface-variant text-xs">The narrative that connects customers to the maker's process.</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Artist Statement &amp; Process</label>
                <textarea 
                  className="w-full bg-surface-container-lowest border border-outline-variant p-4 font-body-md text-xs text-on-surface leading-relaxed focus:outline-none focus:border-forest-green rounded-lg resize-none" 
                  rows="5"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <div className="flex justify-between items-center text-[11px] text-on-surface-variant">
                  <span className="italic opacity-60">Markdown supported for formatting.</span>
                  <span>{bio.length} / 1000 characters</span>
                </div>
              </div>
            </section>

            {/* Additional Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
                <h4 className="font-label-md text-xs text-on-surface mb-4 uppercase tracking-widest font-bold">Studio Hours</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-surface-container">
                    <span className="text-on-surface-variant font-medium">Mon - Fri</span>
                    <span className="font-semibold text-on-surface">09:00 AM - 05:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-surface-container">
                    <span className="text-on-surface-variant font-medium">Saturday</span>
                    <span className="font-semibold text-on-surface">11:00 AM - 04:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 opacity-60">
                    <span className="text-on-surface-variant font-medium">Sunday</span>
                    <span className="font-semibold text-on-surface">Closed</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-forest-green p-6 rounded-xl text-white flex flex-col justify-center items-center text-center shadow-sm">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-90 text-white">workspace_premium</span>
                <h4 className="font-headline-md text-base mb-1 font-bold">Verified Artisan</h4>
                <p className="font-body-md text-xs opacity-80 mb-4">This studio has completed the craftsmanship verification process.</p>
                <button className="w-full py-2 border border-white/40 text-white font-label-md text-xs uppercase tracking-wider rounded hover:bg-white/10 transition-colors font-semibold">
                  Manage Credentials
                </button>
              </div>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default StudioDetails;
