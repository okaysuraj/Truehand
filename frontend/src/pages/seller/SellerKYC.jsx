import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SellerKYC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ businessName: '', panNumber: '', gstNumber: '', bankAccountNumber: '', ifscCode: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'SELLER') {
      navigate('/');
      return;
    }
    fetchKYC();
  }, [user, navigate]);

  const fetchKYC = async () => {
    try {
      const res = await api.get(`/seller/${user.id}/kyc`);
      if (res.data) {
        setForm(res.data);
        setStatus(res.data.kycStatus);
      }
    } catch (err) {
      console.log('No existing KYC found');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/seller/${user.id}/kyc`, form);
      setForm(res.data);
      setStatus(res.data.kycStatus);
      alert('KYC details submitted successfully.');
    } catch (err) {
      alert('Error submitting KYC');
    }
    setLoading(false);
  };

  if (!user || user.role !== 'SELLER') return null;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h2 style={{ marginBottom: 20, fontSize: 24 }}>Seller Onboarding & KYC</h2>
      
      {status && (
        <div style={{ padding: 15, marginBottom: 20, borderRadius: 8, background: status === 'APPROVED' ? '#d4efdf' : (status === 'REJECTED' ? '#fadbd8' : '#fcf3cf') }}>
          <strong>Status: </strong> {status}
          {form.rejectionReason && <p style={{ marginTop: 8, color: '#c0392b' }}>Reason: {form.rejectionReason}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="a-box" style={{ padding: 20, background: '#fff', border: '1px solid #ddd', borderRadius: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>Business Name</label>
            <input required className="form-control" style={{ width: '100%', padding: 10 }} value={form.businessName || ''} onChange={e=>setForm({...form, businessName: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>PAN Number</label>
            <input required className="form-control" style={{ width: '100%', padding: 10 }} value={form.panNumber || ''} onChange={e=>setForm({...form, panNumber: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>GST Number (Optional)</label>
            <input className="form-control" style={{ width: '100%', padding: 10 }} value={form.gstNumber || ''} onChange={e=>setForm({...form, gstNumber: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>Bank Account Number</label>
            <input required className="form-control" style={{ width: '100%', padding: 10 }} value={form.bankAccountNumber || ''} onChange={e=>setForm({...form, bankAccountNumber: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>IFSC Code</label>
            <input required className="form-control" style={{ width: '100%', padding: 10 }} value={form.ifscCode || ''} onChange={e=>setForm({...form, ifscCode: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ padding: '12px 0', borderRadius: 20, background: '#FFD814', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: 10 }}>
            {loading ? 'Submitting...' : 'Submit KYC Documents'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerKYC;
