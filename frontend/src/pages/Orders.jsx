import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container" style={{padding: '20px 0'}}>
      <div style={{display: 'flex', gap: 20, marginBottom: 20}}>
        <h1 style={{fontSize: 28, fontWeight: 400}}>Your Orders</h1>
      </div>

      <div style={{display: 'flex', gap: 20, borderBottom: '1px solid #ddd', marginBottom: 20}}>
        <div style={{paddingBottom: 8, borderBottom: '2px solid #e77600', color: '#111', fontWeight: 'bold'}}>Orders</div>
        <div style={{paddingBottom: 8, color: '#007185', cursor: 'pointer'}}>Buy Again</div>
        <div style={{paddingBottom: 8, color: '#007185', cursor: 'pointer'}}>Not Yet Dispatched</div>
        <div style={{paddingBottom: 8, color: '#007185', cursor: 'pointer'}}>Cancelled Orders</div>
      </div>

      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          {orders.map(o => (
            <div key={o.id} className="a-box">
              <div style={{background: '#f0f2f2', padding: '14px 18px', borderBottom: '1px solid #d5d9d9', borderTopLeftRadius: 8, borderTopRightRadius: 8, display: 'flex', justifyContent: 'space-between', fontSize: 12}}>
                <div style={{display: 'flex', gap: 40}}>
                  <div>
                    <div style={{color: '#565959', textTransform: 'uppercase'}}>Order Placed</div>
                    <div>{new Date(o.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                  <div>
                    <div style={{color: '#565959', textTransform: 'uppercase'}}>Total</div>
                    <div>₹{o.totalAmount.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{color: '#565959', textTransform: 'uppercase'}}>Dispatch To</div>
                    <div style={{color: '#007185'}}>TrueHand Customer ▾</div>
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{color: '#565959', textTransform: 'uppercase'}}>Order # {o.orderNumber.substring(0, 15)}...</div>
                  <div style={{display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4}}>
                    <span style={{color: '#007185'}}>View order details</span>
                    <span style={{color: '#ddd'}}>|</span>
                    <span style={{color: '#007185'}}>Invoice</span>
                  </div>
                </div>
              </div>

              <div className="a-box-inner" style={{display: 'flex', gap: 20}}>
                <div style={{flexGrow: 1}}>
                  <h3 style={{fontSize: 18, marginBottom: 10}}>
                    {o.status === 'DELIVERED' ? 'Delivered' : (o.status === 'IN_TRANSIT' ? 'Arriving today' : 'Preparing for Dispatch')}
                  </h3>
                  
                  {/* Using a placeholder for the order items since the DTO structure might not have them detailed, but assuming they are accessible or we just show a generic box */}
                  <div style={{display: 'flex', gap: 20, marginBottom: 14}}>
                    <div style={{width: 90, height: 90, background: '#f0f2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#565959', fontSize: 12}}>
                      Items
                    </div>
                    <div>
                      <Link to={`/tracking/${o.id}`} className="btn btn-primary" style={{marginTop: 10}}>Track package</Link>
                    </div>
                  </div>
                </div>

                <div style={{width: 250, display: 'flex', flexDirection: 'column', gap: 10}}>
                  <button className="btn btn-standard w-full">Leave seller feedback</button>
                  <button className="btn btn-standard w-full">Write a product review</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
