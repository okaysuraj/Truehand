import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const MaintenanceMode = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    maintenanceMessage: '',
    registrationsEnabled: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/admin/advanced/settings');
      setSettings(res.data || {});
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
      await api.post('/admin/advanced/settings', settings);
      alert('Settings saved successfully');
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (!user || user.role !== 'ADMIN') return <div className="p-24 text-center">Unauthorized. Admins only.</div>;

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16 flex flex-col md:flex-row">
      <nav className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 p-6 hidden md:block">
        <h2 className="font-headline-sm text-forest-green mb-8">Admin Navigation</h2>
        <Link to="/admin" className="block text-on-surface-variant hover:text-forest-green mb-4">Dashboard</Link>
        <Link to="/admin/maintenance" className="block text-forest-green font-bold border-l-2 border-forest-green pl-2">Platform Settings</Link>
      </nav>

      <main className="flex-1 px-4 md:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Platform Settings & Maintenance</h1>
          <p className="font-body-md text-on-surface-variant">Control master platform switches and maintenance windows.</p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-forest-green">Loading...</div>
        ) : (
          <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-8">
            <form onSubmit={handleSave} className="space-y-8">
              
              <div>
                <h3 className="font-headline-sm mb-4 border-b border-outline-variant/20 pb-2 text-error-red">Danger Zone</h3>
                
                <label className="flex items-center gap-4 p-4 border border-outline-variant/30 rounded mb-4 cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input 
                    type="checkbox" 
                    checked={settings.maintenanceMode}
                    onChange={e => setSettings({...settings, maintenanceMode: e.target.checked})}
                    className="w-5 h-5 accent-error-red"
                  />
                  <div>
                    <p className="font-bold text-on-surface">Enable Maintenance Mode</p>
                    <p className="text-sm text-on-surface-variant">Takes the entire platform offline for non-admins.</p>
                  </div>
                </label>

                {settings.maintenanceMode && (
                  <div className="ml-9 mb-4">
                    <label className="block text-sm font-bold mb-1">Maintenance Message</label>
                    <textarea 
                      rows={2} 
                      className="w-full border border-outline-variant rounded p-2"
                      value={settings.maintenanceMessage}
                      onChange={e => setSettings({...settings, maintenanceMessage: e.target.value})}
                      placeholder="We'll be back shortly..."
                    />
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-headline-sm mb-4 border-b border-outline-variant/20 pb-2">Access Control</h3>
                
                <label className="flex items-center gap-4 p-4 border border-outline-variant/30 rounded cursor-pointer hover:bg-surface-container-low transition-colors">
                  <input 
                    type="checkbox" 
                    checked={settings.registrationsEnabled}
                    onChange={e => setSettings({...settings, registrationsEnabled: e.target.checked})}
                    className="w-5 h-5 accent-forest-green"
                  />
                  <div>
                    <p className="font-bold text-on-surface">Allow New Registrations</p>
                    <p className="text-sm text-on-surface-variant">Uncheck to pause new user signups.</p>
                  </div>
                </label>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="bg-forest-green text-white px-8 py-3 rounded font-bold hover:bg-forest-green/90 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>

            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default MaintenanceMode;
