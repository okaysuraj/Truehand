import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthProvider';
import api from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({ label: '', streetAddress: '', city: '', state: '', postalCode: '', country: 'India', isDefault: false });

  useEffect(() => {
    if (user) fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const res = await api.get(`/addresses/user/${user.id}`);
      setAddresses(res.data);
    } catch (e) {
      console.error('Failed to fetch addresses', e);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/addresses/user/${user.id}`, addressForm);
      setShowAddressForm(false);
      setAddressForm({ label: '', streetAddress: '', city: '', state: '', postalCode: '', country: 'India', isDefault: false });
      fetchAddresses();
    } catch (e) {
      alert('Failed to add address');
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await api.delete(`/addresses/${id}/user/${user.id}`);
      fetchAddresses();
    } catch (e) {
      alert('Failed to delete address');
    }
  };

  if (!user) return null;

  return (
    <div className="container" style={{padding: '20px 0'}}>
      <h1 style={{fontSize: 28, fontWeight: 400, marginBottom: 20}}>Your Account</h1>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20}}>
        
        <div className="a-box">
          <div className="a-box-inner" style={{display: 'flex', gap: 14}}>
            <div style={{fontSize: 40}}>📦</div>
            <div>
              <h3 style={{fontSize: 18, marginBottom: 4, fontWeight: 400}}>Your Orders</h3>
              <div style={{color: '#565959', fontSize: 14}}>Track, return, or buy things again</div>
            </div>
          </div>
        </div>

        <div className="a-box">
          <div className="a-box-inner" style={{display: 'flex', gap: 14}}>
            <div style={{fontSize: 40}}>🔐</div>
            <div>
              <h3 style={{fontSize: 18, marginBottom: 4, fontWeight: 400}}>Login & security</h3>
              <div style={{color: '#565959', fontSize: 14}}>Edit login, name, and mobile number</div>
            </div>
          </div>
        </div>

        <div className="a-box">
          <div className="a-box-inner" style={{display: 'flex', gap: 14}}>
            <div style={{fontSize: 40}}>prime</div>
            <div>
              <h3 style={{fontSize: 18, marginBottom: 4, fontWeight: 400}}>Prime</h3>
              <div style={{color: '#565959', fontSize: 14}}>View benefits and payment settings</div>
            </div>
          </div>
        </div>

        <div className="a-box" onClick={() => {
          document.getElementById('address-book-section').scrollIntoView({ behavior: 'smooth' });
        }} style={{cursor: 'pointer'}}>
          <div className="a-box-inner" style={{display: 'flex', gap: 14}}>
            <div style={{fontSize: 40}}>📍</div>
            <div>
              <h3 style={{fontSize: 18, marginBottom: 4, fontWeight: 400}}>Your Addresses</h3>
              <div style={{color: '#565959', fontSize: 14}}>Edit addresses for orders and gifts</div>
            </div>
          </div>
        </div>

      </div>

      <h2 style={{fontSize: 24, fontWeight: 400, margin: '30px 0 20px 0'}}>Personal Information</h2>
      <div className="a-box" style={{marginBottom: 30}}>
        <div className="a-box-inner">
          <div style={{display: 'grid', gridTemplateColumns: '200px 1fr', gap: 10, fontSize: 14, marginBottom: 10}}>
            <div style={{fontWeight: 'bold'}}>Name:</div>
            <div>{user.firstName} {user.lastName}</div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '200px 1fr', gap: 10, fontSize: 14, marginBottom: 10}}>
            <div style={{fontWeight: 'bold'}}>Email:</div>
            <div>{user.email}</div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '200px 1fr', gap: 10, fontSize: 14, marginBottom: 10}}>
            <div style={{fontWeight: 'bold'}}>Account Type:</div>
            <div>{user.role}</div>
          </div>
        </div>
      </div>

      <h2 id="address-book-section" style={{fontSize: 24, fontWeight: 400, margin: '30px 0 20px 0'}}>Your Addresses</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20}}>
        <div className="a-box" style={{border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', height: '100%'}} onClick={() => setShowAddressForm(true)}>
          <div className="a-box-inner" style={{textAlign: 'center', color: '#565959'}}>
            <div style={{fontSize: 40}}>+</div>
            <h3 style={{fontSize: 18, fontWeight: 400}}>Add Address</h3>
          </div>
        </div>
        
        {addresses.map(addr => (
          <div key={addr.id} className="a-box" style={{position: 'relative'}}>
            {addr.isDefault && (
              <div style={{position: 'absolute', top: -10, left: 10, background: '#FFD814', padding: '2px 8px', fontSize: 12, borderRadius: 10, border: '1px solid #FCD200'}}>
                Default
              </div>
            )}
            <div className="a-box-inner">
              <h4 style={{margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: 5}}>{addr.label}</h4>
              <p style={{margin: '4px 0', fontSize: 14, fontWeight: 'bold'}}>{user.firstName} {user.lastName}</p>
              <p style={{margin: '4px 0', fontSize: 14}}>{addr.streetAddress}</p>
              <p style={{margin: '4px 0', fontSize: 14}}>{addr.city}, {addr.state} {addr.postalCode}</p>
              <p style={{margin: '4px 0', fontSize: 14}}>{addr.country}</p>
              
              <div style={{marginTop: 15, paddingTop: 10, borderTop: '1px solid #eee'}}>
                <button onClick={() => handleDeleteAddress(addr.id)} style={{background: 'none', border: 'none', color: '#007185', cursor: 'pointer', fontSize: 14, padding: 0}}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddressForm && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div style={{background: '#fff', padding: 30, borderRadius: 8, width: 400, maxWidth: '90%'}}>
            <h2 style={{marginTop: 0}}>Add a new address</h2>
            <form onSubmit={handleAddAddress} style={{display: 'flex', flexDirection: 'column', gap: 15}}>
              <div>
                <label style={{display: 'block', fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>Label (e.g. Home, Office)</label>
                <input required value={addressForm.label} onChange={e=>setAddressForm({...addressForm, label: e.target.value})} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
              </div>
              <div>
                <label style={{display: 'block', fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>Street Address</label>
                <input required value={addressForm.streetAddress} onChange={e=>setAddressForm({...addressForm, streetAddress: e.target.value})} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
              </div>
              <div style={{display: 'flex', gap: 10}}>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>City</label>
                  <input required value={addressForm.city} onChange={e=>setAddressForm({...addressForm, city: e.target.value})} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
                </div>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>State</label>
                  <input required value={addressForm.state} onChange={e=>setAddressForm({...addressForm, state: e.target.value})} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
                </div>
              </div>
              <div>
                <label style={{display: 'block', fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>ZIP Code</label>
                <input required value={addressForm.postalCode} onChange={e=>setAddressForm({...addressForm, postalCode: e.target.value})} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
              </div>
              <div>
                <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 14}}>
                  <input type="checkbox" checked={addressForm.isDefault} onChange={e=>setAddressForm({...addressForm, isDefault: e.target.checked})} />
                  Make this my default address
                </label>
              </div>
              <div style={{display: 'flex', gap: 10, marginTop: 10}}>
                <button type="submit" style={{flex: 1, padding: 10, background: '#FFD814', border: '1px solid #FCD200', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold'}}>Add address</button>
                <button type="button" onClick={() => setShowAddressForm(false)} style={{flex: 1, padding: 10, background: '#f0f2f2', border: '1px solid #d5d9d9', borderRadius: 8, cursor: 'pointer'}}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
