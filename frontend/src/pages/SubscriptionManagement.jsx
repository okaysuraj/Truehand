import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const SubscriptionManagement = () => {
  const { user } = useAuth();
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    if (user?.role === 'SELLER') fetchSubscription();
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const res = await api.get(`/sellers/${user.id}/subscription`);
      setSub(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planName) => {
    setUpgrading(true);
    try {
      await api.post(`/sellers/${user.id}/subscribe`, { planName });
      fetchSubscription();
      alert(`Successfully subscribed to ${planName}!`);
    } catch (err) {
      alert('Subscription failed');
    } finally {
      setUpgrading(false);
    }
  };

  if (!user || user.role !== 'SELLER') return <div className="p-24 text-center">Unauthorized. Sellers only.</div>;

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16 flex flex-col md:flex-row">
      <nav className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 p-6 hidden md:block">
        <h2 className="font-headline-sm text-forest-green mb-8">Seller Dashboard</h2>
        <Link to="/seller-inventory" className="block text-on-surface-variant hover:text-forest-green mb-4">Inventory</Link>
        <Link to="/seller/storefront" className="block text-on-surface-variant hover:text-forest-green mb-4">Storefront Customizer</Link>
        <Link to="/seller/subscription" className="block text-forest-green font-bold border-l-2 border-forest-green pl-2">Subscription</Link>
      </nav>

      <main className="flex-1 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="font-display-md text-display-md text-on-surface mb-2">Manage Subscription</h1>
            <p className="font-body-md text-on-surface-variant">Upgrade your account for advanced seller features.</p>
          </div>
          {sub && (
            <div className="text-right bg-surface-container px-4 py-2 rounded-lg border border-outline-variant/30">
              <p className="text-xs uppercase tracking-wider text-on-surface-variant">Current Plan</p>
              <p className="font-bold text-forest-green text-lg">{sub.planName}</p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center text-forest-green">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Free Plan */}
            <div className={`bg-surface-container-lowest rounded-xl p-6 border-2 transition-colors ${sub.planName === 'FREE' ? 'border-forest-green' : 'border-outline-variant/30'}`}>
              <h3 className="font-display-sm text-on-surface mb-2">Free</h3>
              <p className="text-3xl font-bold text-forest-green mb-6">$0<span className="text-base text-on-surface-variant font-normal">/mo</span></p>
              <ul className="space-y-3 mb-8 text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-forest-green text-sm">check</span> 50 Product Listings</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-forest-green text-sm">check</span> Standard Support</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-forest-green text-sm">check</span> Basic Analytics</li>
              </ul>
              <button 
                disabled={sub.planName === 'FREE' || upgrading}
                onClick={() => handleSubscribe('FREE')}
                className="w-full py-2 border border-forest-green text-forest-green rounded font-bold disabled:opacity-50 disabled:bg-surface-container"
              >
                {sub.planName === 'FREE' ? 'Current Plan' : 'Downgrade'}
              </button>
            </div>

            {/* Premium Plan */}
            <div className={`bg-forest-green text-white rounded-xl p-6 border-2 transform md:-translate-y-4 shadow-xl ${sub.planName === 'PREMIUM' ? 'border-white' : 'border-forest-green'}`}>
              <div className="bg-white/20 text-xs w-max px-2 py-1 rounded mb-4 font-bold tracking-widest uppercase">Most Popular</div>
              <h3 className="font-display-sm mb-2">Premium</h3>
              <p className="text-3xl font-bold mb-6">$29<span className="text-base text-white/80 font-normal">/mo</span></p>
              <ul className="space-y-3 mb-8 text-white/90">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check</span> Unlimited Listings</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check</span> Priority Support</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check</span> Custom Storefront Colors</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check</span> CSV Bulk Imports</li>
              </ul>
              <button 
                disabled={sub.planName === 'PREMIUM' || upgrading}
                onClick={() => handleSubscribe('PREMIUM')}
                className="w-full py-3 bg-white text-forest-green rounded font-bold hover:bg-surface-linen transition-colors disabled:opacity-90 disabled:text-forest-green"
              >
                {sub.planName === 'PREMIUM' ? 'Current Plan' : 'Upgrade to Premium'}
              </button>
            </div>

            {/* Pro Plan */}
            <div className={`bg-surface-container-lowest rounded-xl p-6 border-2 transition-colors ${sub.planName === 'PRO' ? 'border-forest-green' : 'border-outline-variant/30'}`}>
              <h3 className="font-display-sm text-on-surface mb-2">Pro</h3>
              <p className="text-3xl font-bold text-forest-green mb-6">$99<span className="text-base text-on-surface-variant font-normal">/mo</span></p>
              <ul className="space-y-3 mb-8 text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-forest-green text-sm">check</span> Everything in Premium</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-forest-green text-sm">check</span> Dedicated Account Manager</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-forest-green text-sm">check</span> Advanced API Access</li>
              </ul>
              <button 
                disabled={sub.planName === 'PRO' || upgrading}
                onClick={() => handleSubscribe('PRO')}
                className="w-full py-2 border border-forest-green text-forest-green rounded font-bold disabled:opacity-50 disabled:bg-surface-container"
              >
                {sub.planName === 'PRO' ? 'Current Plan' : 'Upgrade to Pro'}
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default SubscriptionManagement;
