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
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 24 }}>Delivery Partner Dashboard</h2>
        {profile && (
          <button 
            onClick={handleToggleAvailability}
            style={{ 
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 'bold',
              background: profile.isAvailable ? '#2ecc71' : '#95a5a6', color: '#fff' 
            }}
          >
            {profile.isAvailable ? 'Go Offline' : 'Go Online'}
          </button>
        )}
      </div>

      {!profile || profile.kycStatus !== 'APPROVED' ? (
        <div style={{ padding: 20, background: '#fcf3cf', borderRadius: 8, color: '#b9770e', fontWeight: 'bold' }}>
          Please complete your KYC onboarding and wait for approval to start accepting deliveries.
          <br /><br />
          <button onClick={() => navigate('/delivery/kyc')} style={{ padding: '8px 16px', background: '#e67e22', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            Go to KYC Profile
          </button>
        </div>
      ) : (
        <div className="a-box" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20 }}>
          <h3 style={{ marginTop: 0, marginBottom: 15, fontSize: 18 }}>Assigned Deliveries</h3>
          {deliveries.length === 0 ? (
            <p>No active deliveries assigned.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>Order ID</th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>Customer Address</th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>Status</th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map(d => (
                  <tr key={d.id}>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>#{d.order.orderNumber}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
                      {d.order.shippingAddress.street}, {d.order.shippingAddress.city}, {d.order.shippingAddress.zipCode}
                    </td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 'bold',
                        background: d.status === 'PENDING' || d.status === 'ASSIGNED' ? '#fcf3cf' : (d.status === 'IN_TRANSIT' ? '#d4efdf' : (d.status === 'DELIVERED' ? '#d5f5e3' : '#fadbd8')),
                        color: d.status === 'PENDING' || d.status === 'ASSIGNED' ? '#b9770e' : (d.status === 'IN_TRANSIT' ? '#1d8348' : (d.status === 'DELIVERED' ? '#145a32' : '#922b21'))
                      }}>
                        {d.status}
                      </span>
                    </td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {(d.status === 'PENDING' || d.status === 'ASSIGNED') && (
                          <button onClick={() => updateDeliveryStatus(d.order.id, 'start')} style={{ fontSize: 12, padding: '4px 8px', cursor: 'pointer', background: '#3498db', color: 'white', border: 'none', borderRadius: 4 }}>Start Delivery</button>
                        )}
                        {d.status === 'IN_TRANSIT' && (
                          <button onClick={() => updateDeliveryStatus(d.order.id, 'complete')} style={{ fontSize: 12, padding: '4px 8px', cursor: 'pointer', background: '#2ecc71', color: 'white', border: 'none', borderRadius: 4 }}>Complete</button>
                        )}
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

export default DeliveryDashboard;
