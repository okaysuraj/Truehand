import api from '../../services/api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SellerSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    storeName: '', category: '', bio: '', portfolio: '',
    address: '', city: '', state: '', zip: '',
    accountName: '', accountNumber: '', routingNumber: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const nextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else navigate('/seller/dashboard');
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-10">
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Become an Artisan</h1>
          <p className="font-body-md text-on-surface-variant max-w-lg mx-auto">Join our curated marketplace of skilled craftsmen and creators. Sell your authentic, handmade goods to a global audience.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-outline-variant/30 -z-10 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 h-0.5 bg-forest-green -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          {[
            { num: 1, label: 'Store Info' },
            { num: 2, label: 'Location' },
            { num: 3, label: 'Payouts' }
          ].map(s => (
            <div key={s.num} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md mb-2 transition-colors ${
                step >= s.num ? 'bg-forest-green text-white' : 'bg-surface-variant text-on-surface-variant'
              }`}>{s.num}</div>
              <span className={`font-label-sm ${step >= s.num ? 'text-on-surface' : 'text-on-surface-variant'}`}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8 shadow-sm">
          <form onSubmit={nextStep} className="space-y-6">
            
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Tell us about your craft</h2>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Store Name *</label>
                  <input type="text" name="storeName" required value={form.storeName} onChange={handleChange} placeholder="e.g. Elena Studio" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Primary Craft Category *</label>
                  <select name="category" required value={form.category} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface appearance-none">
                    <option value="">Select category</option>
                    <option>Ceramics</option><option>Textiles</option><option>Woodwork</option><option>Glasswork</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Artisan Bio *</label>
                  <textarea name="bio" required rows="4" value={form.bio} onChange={handleChange} placeholder="Tell your story. How did you learn your craft?" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-y"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Portfolio Link (Optional)</label>
                  <input type="url" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://yourwebsite.com" className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Where is your workshop?</h2>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Street Address *</label>
                  <input type="text" name="address" required value={form.address} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block font-label-sm text-on-surface">City *</label>
                    <input type="text" name="city" required value={form.city} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-sm text-on-surface">State *</label>
                    <input type="text" name="state" required value={form.state} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="block font-label-sm text-on-surface">ZIP / Postal *</label>
                    <input type="text" name="zip" required value={form.zip} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                  </div>
                </div>
                <p className="font-body-sm text-on-surface-variant">We use this to calculate shipping origins for your products.</p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">How should we pay you?</h2>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Account Holder Name *</label>
                  <input type="text" name="accountName" required value={form.accountName} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block font-label-sm text-on-surface">Routing Number *</label>
                    <input type="text" name="routingNumber" required value={form.routingNumber} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-sm text-on-surface">Account Number *</label>
                    <input type="text" name="accountNumber" required value={form.accountNumber} onChange={handleChange} className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
                  </div>
                </div>
                <div className="bg-surface-variant/30 p-4 rounded-lg flex gap-3 items-start">
                  <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                  <p className="font-body-sm text-on-surface-variant">Your financial information is encrypted and securely stored. TrueHand processes payments securely via Stripe.</p>
                </div>
              </div>
            )}

            <div className="pt-6 flex justify-between items-center border-t border-outline-variant/30">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-2.5 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">Back</button>
              ) : (
                <Link to="/" className="text-on-surface-variant font-label-md hover:underline">Cancel</Link>
              )}
              <button type="submit" className="px-8 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
                {step === 3 ? 'Submit Application' : 'Continue'}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;
