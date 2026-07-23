import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

const StorefrontCustomizer = () => {
  const { user } = useAuth();
  const [storefront, setStorefront] = useState({
    bannerImageUrl: '',
    shopDescription: '',
    brandColorHex: '#2E6C36'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.role === 'SELLER') fetchStorefront();
  }, [user]);

  const fetchStorefront = async () => {
    try {
      const res = await api.get(`/sellers/${user.id}/storefront`);
      setStorefront(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/sellers/${user.id}/storefront`, storefront);
      alert('Storefront updated successfully!');
    } catch (err) {
      alert('Failed to update storefront');
    } finally {
      setSaving(false);
    }
  };

  if (!user || user.role !== 'SELLER') return <div className="p-24 text-center">Unauthorized. Sellers only.</div>;

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16 flex flex-col md:flex-row">
      <nav className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 p-6 hidden md:block">
        <h2 className="font-headline-sm text-forest-green mb-8">Seller Dashboard</h2>
        <Link to="/seller-inventory" className="block text-on-surface-variant hover:text-forest-green mb-4">Inventory</Link>
        <Link to="/seller/storefront" className="block text-forest-green font-bold border-l-2 border-forest-green pl-2 mb-4">Storefront Customizer</Link>
        <Link to="/seller/subscription" className="block text-on-surface-variant hover:text-forest-green">Subscription</Link>
      </nav>

      <main className="flex-1 px-4 md:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Storefront Customizer</h1>
          <p className="font-body-md text-on-surface-variant">Personalize your artisan shop to attract more customers.</p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-forest-green">Loading...</div>
        ) : (
          <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col md:flex-row">
            
            {/* Form */}
            <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-outline-variant/30">
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block font-label-md mb-2">Banner Image URL</label>
                  <input 
                    type="url" 
                    value={storefront.bannerImageUrl || ''}
                    onChange={e => setStorefront({...storefront, bannerImageUrl: e.target.value})}
                    placeholder="https://example.com/banner.jpg"
                    className="w-full px-4 py-2 border border-outline-variant rounded focus:border-forest-green outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-md mb-2">Brand Color</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color" 
                      value={storefront.brandColorHex || '#2E6C36'}
                      onChange={e => setStorefront({...storefront, brandColorHex: e.target.value})}
                      className="w-12 h-12 p-1 border border-outline-variant rounded cursor-pointer"
                    />
                    <span className="font-mono text-on-surface-variant">{storefront.brandColorHex || '#2E6C36'}</span>
                  </div>
                </div>
                <div>
                  <label className="block font-label-md mb-2">Shop Description</label>
                  <textarea 
                    rows={4} 
                    value={storefront.shopDescription || ''}
                    onChange={e => setStorefront({...storefront, shopDescription: e.target.value})}
                    placeholder="Tell customers about your craft..."
                    className="w-full px-4 py-2 border border-outline-variant rounded focus:border-forest-green outline-none resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full py-3 bg-forest-green text-white rounded font-label-md hover:bg-forest-green/90 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>

            {/* Live Preview */}
            <div className="flex-1 p-8 bg-surface-container">
              <h3 className="font-headline-sm mb-6 text-on-surface-variant text-center">Live Preview</h3>
              <div className="border border-outline-variant/50 rounded-lg overflow-hidden bg-white shadow-md max-w-sm mx-auto">
                <div 
                  className="h-32 bg-cover bg-center flex items-end justify-center pb-4" 
                  style={{ 
                    backgroundColor: storefront.brandColorHex,
                    backgroundImage: storefront.bannerImageUrl ? `url(${storefront.bannerImageUrl})` : 'none'
                  }}
                >
                  <h4 className="text-white font-bold text-xl drop-shadow-md">My Artisan Shop</h4>
                </div>
                <div className="p-4">
                  <p className="text-sm text-on-surface mb-4 min-h-[3rem]">
                    {storefront.shopDescription || 'Your description will appear here.'}
                  </p>
                  <button 
                    style={{ backgroundColor: storefront.brandColorHex }}
                    className="w-full py-2 text-white font-bold rounded"
                  >
                    Follow Shop
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default StorefrontCustomizer;
