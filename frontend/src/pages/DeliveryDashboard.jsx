import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';

const DeliveryDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'DELIVERY') {
      navigate('/');
      return;
    }
    fetchProfile();
    fetchDeliveries();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/delivery-personnel/${user.id}/kyc`);
      setProfile(res.data);
    } catch (err) {
      console.log('Profile not found');
    }
  };

  const fetchDeliveries = async () => {
    try {
      const res = await api.get(`/deliveries/partner/${user.id}`);
      setDeliveries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleAvailability = async () => {
    if (!profile) return;
    try {
      const res = await api.put(`/delivery-personnel/${user.id}/availability`, { isAvailable: !profile.isAvailable });
      setProfile(res.data);
    } catch (err) {
      alert('Error updating availability');
    }
  };

  const updateDeliveryStatus = async (orderId, endpoint) => {
    try {
      await api.post(`/deliveries/${orderId}/${endpoint}`);
      fetchDeliveries();
    } catch (err) {
      alert('Error updating delivery status');
    }
  };

  if (!user || user.role !== 'DELIVERY') return null;

  return (
    <div className="min-h-screen bg-surface-linen text-on-surface font-body-md flex">
      {/* SideNavBar */}
      <nav className="bg-surface shadow-sm h-screen w-64 fixed left-0 top-0 flex flex-col py-stack-lg border-r border-outline-variant/30 z-40">
        <div className="px-6 mb-8">
          <h2 className="font-display-lg text-headline-md text-forest-green leading-tight">Logistics Hub</h2>
          <p className="font-label-md text-label-md text-on-surface-variant/70">Premium Fulfillment</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          <button className={`w-full flex items-center gap-3 px-4 py-3 font-label-md text-label-md transition-all group border-r-2 border-forest-green bg-surface-container-low text-forest-green font-bold`}>
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            Active Deliveries
          </button>
        </div>
        <div className="px-6 py-6 border-t border-surface-variant/30 mt-auto">
          {profile && (
            <button 
              onClick={handleToggleAvailability}
              className={`w-full py-3 rounded-sm font-label-md text-label-md hover:opacity-90 transition-opacity active:scale-[0.98] mb-6 ${profile.isAvailable ? 'bg-error-red text-white' : 'bg-forest-green text-white'}`}
            >
              {profile.isAvailable ? 'Go Offline' : 'Go Online'}
            </button>
          )}
          <div className="flex items-center mb-6">
            <img className="w-10 h-10 rounded-full object-cover border border-outline-variant" src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}&backgroundColor=163428&textColor=ffffff`} alt="Courier Avatar" />
            <div className="ml-3">
              <p className="font-label-sm text-label-sm text-on-surface font-semibold">{user.firstName} {user.lastName}</p>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="w-full border border-charcoal text-charcoal font-label-md text-label-md py-2 px-4 rounded-sm hover:bg-surface-container transition-colors flex items-center justify-center">
            <span>View Storefront</span>
            <span className="material-symbols-outlined ml-2 text-[18px]">open_in_new</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-64 w-full pt-10">
        
        <div className="p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full space-y-section-gap pb-24">
          
          {/* Page Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md border-b border-outline-variant/20 pb-4">
            <div className="space-y-2">
              <span className="font-label-md text-label-md text-terracotta tracking-widest uppercase">Courier Operations</span>
              <h1 className="font-display-lg text-display-lg text-forest-green">Assigned Deliveries</h1>
              <p className="text-on-surface-variant font-body-md max-w-xl">A curated view of your current logistical commitments. Prioritize based on proximity and collection windows.</p>
            </div>
          </header>

          {!profile || profile.kycStatus !== 'APPROVED' ? (
            <div className="bg-error-container/30 border border-error-container text-terracotta p-6 rounded-sm">
              <h3 className="font-headline-md text-headline-md mb-2">KYC Approval Pending</h3>
              <p className="font-body-md mb-4">Please complete your KYC onboarding and wait for approval to start accepting deliveries.</p>
              <button onClick={() => navigate('/delivery/kyc')} className="bg-terracotta text-white font-label-md text-label-md py-2 px-6 rounded-sm hover:bg-terracotta/90 transition-colors">
                Go to KYC Profile
              </button>
            </div>
          ) : (
            <>
              {/* Deliveries Table Container */}
              <section className="bg-surface shadow-[0_4px_24px_-4px_rgba(22,52,40,0.04)] rounded-sm overflow-hidden border border-outline-variant/20">
                {deliveries.length === 0 ? (
                  <div className="p-12 text-center text-outline">
                    <span className="material-symbols-outlined text-4xl mb-2">local_shipping</span>
                    <p>No active deliveries assigned.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low border-b border-outline-variant/30">
                          <th className="px-6 py-5 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-5 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Customer Address</th>
                          <th className="px-6 py-5 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                          <th className="px-6 py-5 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20">
                        {deliveries.map(d => (
                          <tr key={d.id} className="group hover:bg-surface-container-lowest transition-colors">
                            <td className="px-6 py-8 font-label-md text-forest-green">#{d.order.orderNumber}</td>
                            <td className="px-6 py-8">
                              <div className="flex flex-col">
                                <span className="font-bold text-on-surface">{d.order.shippingAddress.fullName || d.order.user.firstName + ' ' + d.order.user.lastName}</span>
                                <span className="text-on-surface-variant text-label-sm">{d.order.shippingAddress.street}, {d.order.shippingAddress.city}, {d.order.shippingAddress.zipCode}</span>
                              </div>
                            </td>
                            <td className="px-6 py-8">
                              {d.status === 'PENDING' || d.status === 'ASSIGNED' ? (
                                <span className="px-3 py-1 bg-terracotta/10 text-terracotta text-label-sm rounded-full border border-terracotta/20">{d.status}</span>
                              ) : d.status === 'IN_TRANSIT' ? (
                                <span className="px-3 py-1 bg-forest-green/10 text-forest-green text-label-sm rounded-full border border-forest-green/20">In Transit</span>
                              ) : (
                                <span className="px-3 py-1 bg-outline-variant/30 text-on-surface text-label-sm rounded-full border border-outline-variant/40">{d.status}</span>
                              )}
                            </td>
                            <td className="px-6 py-8 text-right">
                              <div className="flex justify-end gap-2">
                                {(d.status === 'PENDING' || d.status === 'ASSIGNED') && (
                                  <button onClick={() => updateDeliveryStatus(d.order.id, 'start')} className="px-4 py-2 border border-forest-green text-forest-green font-label-sm rounded-sm hover:bg-forest-green hover:text-white transition-colors">Start Delivery</button>
                                )}
                                {d.status === 'IN_TRANSIT' && (
                                  <button onClick={() => updateDeliveryStatus(d.order.id, 'complete')} className="px-4 py-2 bg-forest-green text-white font-label-sm rounded-sm hover:opacity-90 transition-opacity">Complete</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              {/* Bottom Dashboard Statistics */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="bg-surface p-stack-md border border-outline-variant/20 shadow-sm flex items-center justify-between rounded-sm">
                  <div>
                    <span className="block text-label-sm text-on-surface-variant uppercase tracking-widest">Total Active</span>
                    <span className="font-headline-md text-forest-green">{deliveries.filter(d => ['PENDING','ASSIGNED','IN_TRANSIT'].includes(d.status)).length}</span>
                  </div>
                  <span className="material-symbols-outlined text-terracotta text-[32px]">local_shipping</span>
                </div>
                <div className="bg-surface p-stack-md border border-outline-variant/20 shadow-sm flex items-center justify-between rounded-sm">
                  <div>
                    <span className="block text-label-sm text-on-surface-variant uppercase tracking-widest">Completed</span>
                    <span className="font-headline-md text-forest-green">{deliveries.filter(d => d.status === 'DELIVERED').length}</span>
                  </div>
                  <span className="material-symbols-outlined text-terracotta text-[32px]">check_circle</span>
                </div>
              </section>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default DeliveryDashboard;
