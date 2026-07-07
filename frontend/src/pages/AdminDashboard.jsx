import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [pendingSellers, setPendingSellers] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('metrics'); // metrics, sellers, deliveries

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
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 20 }}>
      <h2 style={{ marginBottom: 20, fontSize: 24 }}>Admin Control Panel</h2>
      
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, borderBottom: '1px solid #ddd', paddingBottom: 10 }}>
        <button onClick={() => setActiveTab('metrics')} style={{ padding: '8px 16px', background: activeTab === 'metrics' ? '#007185' : 'transparent', color: activeTab === 'metrics' ? '#fff' : '#007185', border: '1px solid #007185', borderRadius: 4, cursor: 'pointer' }}>Platform Metrics</button>
        <button onClick={() => setActiveTab('sellers')} style={{ padding: '8px 16px', background: activeTab === 'sellers' ? '#007185' : 'transparent', color: activeTab === 'sellers' ? '#fff' : '#007185', border: '1px solid #007185', borderRadius: 4, cursor: 'pointer' }}>Pending Sellers ({pendingSellers.length})</button>
        <button onClick={() => setActiveTab('deliveries')} style={{ padding: '8px 16px', background: activeTab === 'deliveries' ? '#007185' : 'transparent', color: activeTab === 'deliveries' ? '#fff' : '#007185', border: '1px solid #007185', borderRadius: 4, cursor: 'pointer' }}>Pending Deliveries ({pendingDeliveries.length})</button>
      </div>

      {activeTab === 'metrics' && metrics && (
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ padding: 20, background: '#f8f8f8', border: '1px solid #ddd', borderRadius: 8, flex: 1, textAlign: 'center' }}>
            <h3 style={{ margin: 0, color: '#555' }}>Total Users</h3>
            <p style={{ fontSize: 32, fontWeight: 'bold', margin: '10px 0 0 0' }}>{metrics.totalUsers}</p>
          </div>
          <div style={{ padding: 20, background: '#f8f8f8', border: '1px solid #ddd', borderRadius: 8, flex: 1, textAlign: 'center' }}>
            <h3 style={{ margin: 0, color: '#555' }}>Total Orders</h3>
            <p style={{ fontSize: 32, fontWeight: 'bold', margin: '10px 0 0 0' }}>{metrics.totalOrders}</p>
          </div>
          <div style={{ padding: 20, background: '#f8f8f8', border: '1px solid #ddd', borderRadius: 8, flex: 1, textAlign: 'center' }}>
            <h3 style={{ margin: 0, color: '#555' }}>Pending KYC</h3>
            <p style={{ fontSize: 32, fontWeight: 'bold', margin: '10px 0 0 0', color: '#e67e22' }}>{metrics.pendingSellers + metrics.pendingDelivery}</p>
          </div>
        </div>
      )}

      {activeTab === 'sellers' && (
        <div className="a-box" style={{ padding: 20, background: '#fff', border: '1px solid #ddd', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Seller KYC Applications</h3>
          {pendingSellers.length === 0 ? <p>No pending applications.</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>Business Name</th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>PAN</th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>GST</th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSellers.map(s => (
                  <tr key={s.id}>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{s.businessName}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{s.panNumber}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{s.gstNumber || 'N/A'}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => handleSellerApproval(s.user.id, 'APPROVED')} style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>Approve</button>
                        <button onClick={() => {
                          const reason = prompt('Rejection reason:');
                          if(reason) handleSellerApproval(s.user.id, 'REJECTED', reason);
                        }} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'deliveries' && (
        <div className="a-box" style={{ padding: 20, background: '#fff', border: '1px solid #ddd', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Delivery Partner Applications</h3>
          {pendingDeliveries.length === 0 ? <p>No pending applications.</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>Vehicle</th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>Registration</th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>License No.</th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDeliveries.map(d => (
                  <tr key={d.id}>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{d.vehicleType}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{d.vehicleRegistrationNumber}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{d.drivingLicenseNumber}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => handleDeliveryApproval(d.user.id, 'APPROVED')} style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>Approve</button>
                        <button onClick={() => {
                          const reason = prompt('Rejection reason:');
                          if(reason) handleDeliveryApproval(d.user.id, 'REJECTED', reason);
                        }} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
