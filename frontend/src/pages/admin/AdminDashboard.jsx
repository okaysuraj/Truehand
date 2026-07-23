import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [pendingSellers, setPendingSellers] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // overview, sellers, deliveries

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchMetrics();
    fetchPendingSellers();
    fetchPendingDeliveries();
  }, [user, navigate]);

  const fetchMetrics = async () => {
    try {
      const res = await api.get('/admin/metrics');
      setMetrics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingSellers = async () => {
    try {
      const res = await api.get('/admin/kyc/seller/pending');
      setPendingSellers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingDeliveries = async () => {
    try {
      const res = await api.get('/admin/kyc/delivery/pending');
      setPendingDeliveries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSellerApproval = async (sellerId, status, reason = null) => {
    try {
      await api.put(`/admin/kyc/seller/${sellerId}`, { status, reason });
      fetchPendingSellers();
      fetchMetrics();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDeliveryApproval = async (deliveryId, status, reason = null) => {
    try {
      await api.put(`/admin/kyc/delivery/${deliveryId}`, { status, reason });
      fetchPendingDeliveries();
      fetchMetrics();
    } catch (err) {
      alert('Error updating status');
    }
  };

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <div className="min-h-screen bg-surface-linen text-on-surface font-body-md flex">
      {/* SideNavBar */}
      <nav className="bg-surface-container-lowest shadow-sm h-screen w-64 fixed left-0 top-0 flex flex-col py-base z-50 hidden md:flex border-r border-outline-variant/20">
        <div className="px-6 py-8 border-b border-surface-variant mb-6">
          <h1 className="font-headline-md text-headline-md text-forest-green tracking-tight">Artisanal Admin</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 uppercase tracking-wider">Marketplace Manager</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center pl-4 py-3 transition-all duration-200 ${activeTab === 'overview' ? 'text-forest-green font-bold border-l-4 border-forest-green bg-surface-container-low' : 'text-on-surface-variant border-l-4 border-transparent hover:bg-surface-container'}`}>
                <span className="material-symbols-outlined mr-4">dashboard</span>
                <span className="font-label-md text-label-md">Overview</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('sellers')} className={`w-full flex items-center pl-4 py-3 transition-all duration-200 ${activeTab === 'sellers' ? 'text-forest-green font-bold border-l-4 border-forest-green bg-surface-container-low' : 'text-on-surface-variant border-l-4 border-transparent hover:bg-surface-container'}`}>
                <span className="material-symbols-outlined mr-4">group</span>
                <span className="font-label-md text-label-md">Pending Sellers</span>
                {pendingSellers.length > 0 && <span className="ml-auto mr-4 bg-terracotta text-white text-[10px] px-2 py-0.5 rounded-full">{pendingSellers.length}</span>}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('deliveries')} className={`w-full flex items-center pl-4 py-3 transition-all duration-200 ${activeTab === 'deliveries' ? 'text-forest-green font-bold border-l-4 border-forest-green bg-surface-container-low' : 'text-on-surface-variant border-l-4 border-transparent hover:bg-surface-container'}`}>
                <span className="material-symbols-outlined mr-4">local_shipping</span>
                <span className="font-label-md text-label-md">Pending Deliveries</span>
                {pendingDeliveries.length > 0 && <span className="ml-auto mr-4 bg-terracotta text-white text-[10px] px-2 py-0.5 rounded-full">{pendingDeliveries.length}</span>}
              </button>
            </li>
          </ul>
        </div>
        <div className="px-6 py-6 border-t border-surface-variant mt-auto">
          <div className="flex items-center mb-6">
            <img className="w-10 h-10 rounded-full object-cover border border-outline-variant" src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}&backgroundColor=163428&textColor=ffffff`} alt="Admin Avatar" />
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
      <main className="flex-1 flex flex-col md:ml-64 w-full pt-20">
        
        <div className="p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full space-y-section-gap pb-24">
          
          {/* Page Header */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md border-b border-outline-variant/20 pb-4">
            <div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-forest-green">
                {activeTab === 'overview' && 'Platform Overview'}
                {activeTab === 'sellers' && 'Seller Applications'}
                {activeTab === 'deliveries' && 'Delivery Partner Applications'}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
                {activeTab === 'overview' && 'A high-level view of marketplace performance and recent artisanal activity.'}
                {activeTab === 'sellers' && 'Review and approve new artisan shops to maintain platform quality.'}
                {activeTab === 'deliveries' && 'Review and approve delivery partner KYC documents.'}
              </p>
            </div>
          </section>

          {activeTab === 'overview' && metrics && (
            <>
              {/* KPIs Bento Grid */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="bg-surface-container-lowest rounded-sm p-6 shadow-[0_4px_24px_-4px_rgba(22,52,40,0.04)] flex flex-col justify-between h-40 border border-surface-variant relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-[100px] text-forest-green">group</span>
                  </div>
                  <div className="flex justify-between items-start relative z-10">
                    <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Users</h3>
                    <span className="material-symbols-outlined text-forest-green text-[20px]">people</span>
                  </div>
                  <div className="relative z-10">
                    <span className="font-headline-md text-headline-md text-on-surface">{metrics.totalUsers}</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-sm p-6 shadow-[0_4px_24px_-4px_rgba(22,52,40,0.04)] flex flex-col justify-between h-40 border border-surface-variant relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-[100px] text-forest-green">shopping_bag</span>
                  </div>
                  <div className="flex justify-between items-start relative z-10">
                    <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Orders</h3>
                    <span className="material-symbols-outlined text-forest-green text-[20px]">local_shipping</span>
                  </div>
                  <div className="relative z-10">
                    <span className="font-headline-md text-headline-md text-on-surface">{metrics.totalOrders}</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-sm p-6 shadow-[0_4px_24px_-4px_rgba(22,52,40,0.04)] flex flex-col justify-between h-40 border border-surface-variant relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-[100px] text-terracotta">assignment_late</span>
                  </div>
                  <div className="flex justify-between items-start relative z-10">
                    <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Pending KYC</h3>
                    <span className="material-symbols-outlined text-terracotta text-[20px]">pending_actions</span>
                  </div>
                  <div className="relative z-10">
                    <span className="font-headline-md text-headline-md text-terracotta">{metrics.pendingSellers + metrics.pendingDelivery}</span>
                  </div>
                </div>
              </section>

              {/* Quick Actions Banner */}
              {(pendingSellers.length > 0 || pendingDeliveries.length > 0) && (
                <section className="bg-forest-green text-on-primary rounded-sm p-8 flex flex-col md:flex-row items-center justify-between shadow-[0_4px_24px_-4px_rgba(22,52,40,0.04)] relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-primary-fixed/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                  <div className="relative z-10 mb-6 md:mb-0 max-w-xl">
                    <h3 className="font-headline-md text-headline-md mb-2">Action Required: KYC Approvals</h3>
                    <p className="font-body-md text-body-md text-on-primary/80">
                      There are {pendingSellers.length} seller applications and {pendingDeliveries.length} delivery partner applications awaiting manual review.
                    </p>
                  </div>
                  <div className="relative z-10 flex gap-4 w-full md:w-auto">
                    <button onClick={() => setActiveTab(pendingSellers.length > 0 ? 'sellers' : 'deliveries')} className="bg-on-primary text-forest-green font-label-md text-label-md py-3 px-6 rounded-sm hover:bg-surface-container-low transition-colors w-full md:w-auto text-center shadow-sm">
                      Review Applications
                    </button>
                  </div>
                </section>
              )}
            </>
          )}

          {activeTab === 'sellers' && (
            <div className="bg-surface-container-lowest rounded-sm shadow-sm border border-surface-variant overflow-hidden">
              {pendingSellers.length === 0 ? (
                <div className="p-12 text-center text-outline">
                  <span className="material-symbols-outlined text-4xl mb-2">done_all</span>
                  <p>No pending seller applications.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container-low border-b border-surface-variant">
                      <tr>
                        <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">Business Name</th>
                        <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">PAN Number</th>
                        <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">GST Number</th>
                        <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingSellers.map(s => (
                        <tr key={s.id} className="border-b border-surface-variant/50 hover:bg-surface-container-lowest transition-colors">
                          <td className="p-4 font-label-md text-forest-green">{s.businessName}</td>
                          <td className="p-4 font-body-md text-on-surface">{s.panNumber}</td>
                          <td className="p-4 font-body-md text-on-surface">{s.gstNumber || 'N/A'}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleSellerApproval(s.user.id, 'APPROVED')} className="px-4 py-2 bg-forest-green text-white font-label-sm rounded-sm hover:opacity-90 transition-opacity">Approve</button>
                              <button onClick={() => {
                                const reason = prompt('Rejection reason:');
                                if(reason) handleSellerApproval(s.user.id, 'REJECTED', reason);
                              }} className="px-4 py-2 border border-error-red text-error-red font-label-sm rounded-sm hover:bg-error-red/5 transition-colors">Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'deliveries' && (
            <div className="bg-surface-container-lowest rounded-sm shadow-sm border border-surface-variant overflow-hidden">
              {pendingDeliveries.length === 0 ? (
                <div className="p-12 text-center text-outline">
                  <span className="material-symbols-outlined text-4xl mb-2">done_all</span>
                  <p>No pending delivery applications.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container-low border-b border-surface-variant">
                      <tr>
                        <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">Vehicle Type</th>
                        <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">Registration</th>
                        <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">License Number</th>
                        <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingDeliveries.map(d => (
                        <tr key={d.id} className="border-b border-surface-variant/50 hover:bg-surface-container-lowest transition-colors">
                          <td className="p-4 font-label-md text-forest-green">{d.vehicleType}</td>
                          <td className="p-4 font-body-md text-on-surface">{d.vehicleRegistrationNumber}</td>
                          <td className="p-4 font-body-md text-on-surface">{d.drivingLicenseNumber}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleDeliveryApproval(d.user.id, 'APPROVED')} className="px-4 py-2 bg-forest-green text-white font-label-sm rounded-sm hover:opacity-90 transition-opacity">Approve</button>
                              <button onClick={() => {
                                const reason = prompt('Rejection reason:');
                                if(reason) handleDeliveryApproval(d.user.id, 'REJECTED', reason);
                              }} className="px-4 py-2 border border-error-red text-error-red font-label-sm rounded-sm hover:bg-error-red/5 transition-colors">Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
