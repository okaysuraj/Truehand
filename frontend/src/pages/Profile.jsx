import React from 'react';
import { useAuth } from '../services/AuthProvider';

const Profile = () => {
  const { user } = useAuth();

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

        <div className="a-box">
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
      <div className="a-box">
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
          <div style={{display: 'grid', gridTemplateColumns: '200px 1fr', gap: 10, fontSize: 14}}>
            <div style={{fontWeight: 'bold'}}>Default Address:</div>
            <div>{user.address}, {user.city}, {user.state} {user.postalCode}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
