import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const AdminEmailCampaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [campaignName, setCampaignName] = useState('');
  const [targetAudience, setTargetAudience] = useState('ALL_USERS');
  const [emailBody, setEmailBody] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await api.get('/admin/advanced/campaigns');
      setCampaigns(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/advanced/campaigns', {
        campaignName, targetAudience, emailBody
      });
      fetchCampaigns();
      setCampaignName('');
      setEmailBody('');
    } catch (err) {
      alert('Failed to create campaign');
    }
  };

  if (!user || user.role !== 'ADMIN') return <div className="p-24 text-center">Unauthorized. Admins only.</div>;

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16 flex flex-col md:flex-row">
      <nav className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 p-6 hidden md:block">
        <h2 className="font-headline-sm text-forest-green mb-8">Admin Navigation</h2>
        <Link to="/admin" className="block text-on-surface-variant hover:text-forest-green mb-4">Dashboard</Link>
        <Link to="/admin/campaigns" className="block text-forest-green font-bold border-l-2 border-forest-green pl-2">Email Campaigns</Link>
      </nav>

      <main className="flex-1 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Email Campaigns</h1>
          <p className="font-body-md text-on-surface-variant">Create and manage marketing email broadcasts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Form */}
          <div className="lg:col-span-1 bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant/30 h-fit">
            <h2 className="font-headline-sm text-on-surface mb-4">New Campaign</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block font-label-md mb-1">Campaign Name</label>
                <input required value={campaignName} onChange={e=>setCampaignName(e.target.value)} className="w-full px-3 py-2 border border-outline-variant rounded" />
              </div>
              <div>
                <label className="block font-label-md mb-1">Target Audience</label>
                <select value={targetAudience} onChange={e=>setTargetAudience(e.target.value)} className="w-full px-3 py-2 border border-outline-variant rounded">
                  <option value="ALL_USERS">All Users</option>
                  <option value="SELLERS">Sellers</option>
                  <option value="INACTIVE_USERS">Inactive Users</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md mb-1">Email Body (HTML/Text)</label>
                <textarea required rows={5} value={emailBody} onChange={e=>setEmailBody(e.target.value)} className="w-full px-3 py-2 border border-outline-variant rounded resize-none" />
              </div>
              <button type="submit" className="w-full py-2 bg-forest-green text-white rounded font-label-md">
                Create Draft
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-forest-green">Loading...</div>
            ) : campaigns.length === 0 ? (
              <div className="p-12 text-center text-outline-variant">No campaigns created yet.</div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-surface-container-low border-b border-surface-variant/50">
                  <tr>
                    <th className="p-4 font-label-md">Name</th>
                    <th className="p-4 font-label-md">Audience</th>
                    <th className="p-4 font-label-md">Status</th>
                    <th className="p-4 font-label-md">Sent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {campaigns.map(c => (
                    <tr key={c.id} className="hover:bg-surface-container-lowest">
                      <td className="p-4 font-body-md font-bold">{c.campaignName}</td>
                      <td className="p-4 font-body-sm text-on-surface-variant">{c.targetAudience}</td>
                      <td className="p-4 font-body-sm">
                        <span className="px-2 py-1 bg-outline-variant/10 rounded text-xs">{c.status}</span>
                      </td>
                      <td className="p-4 font-body-sm">{c.sentCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEmailCampaigns;
