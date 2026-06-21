import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, activeOrders: 0, totalProducts: 0 });
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', category: '', price: '', stockQuantity: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'SELLER') {
      navigate('/');
      return;
    }
    fetchProducts();
    fetchStats();
    fetchOrders();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products/seller/${user.id}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get(`/seller/${user.id}/stats`);
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/seller/${user.id}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/products', { ...form, sellerId: user.id });
      setForm({ name: '', description: '', category: '', price: '', stockQuantity: '' });
      fetchProducts();
      fetchStats();
    } catch (err) {
      alert('Error adding product');
    }
    setLoading(false);
  };

  if (!user || user.role !== 'SELLER') return null;

  return (
    <div className="dashboard-container" style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <div className="dashboard-header" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, marginBottom: 8 }}>Seller Central Dashboard</h2>
        <div style={{ color: '#565959' }}>Store: {user.firstName} {user.lastName}</div>
      </div>

      {/* Analytics */}
      <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
        <div className="stat-card" style={{ padding: 24, background: '#fff', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#565959', fontSize: 14, marginBottom: 8 }}>Total Products</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold', color: '#0f1111' }}>{stats.totalProducts}</p>
        </div>
        <div className="stat-card" style={{ padding: 24, background: '#fff', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#565959', fontSize: 14, marginBottom: 8 }}>Total Revenue</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold', color: '#007185' }}>₹{stats.totalRevenue ? stats.totalRevenue.toFixed(2) : '0.00'}</p>
        </div>
        <div className="stat-card" style={{ padding: 24, background: '#fff', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#565959', fontSize: 14, marginBottom: 8 }}>Active Orders (Pending/Processing)</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold', color: '#B12704' }}>{stats.activeOrders}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24, marginBottom: 40 }}>
        {/* Add Product Form */}
        <div className="a-box" style={{ background: '#f8f8f8', padding: 20, border: '1px solid #ddd', borderRadius: 8, height: 'fit-content' }}>
          <h3 style={{ marginBottom: 16 }}>Add New Product</h3>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>Product Name</label>
              <input required className="form-control" style={{ width: '100%', padding: 8 }} value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>Category</label>
              <input required className="form-control" style={{ width: '100%', padding: 8 }} value={form.category} onChange={e=>setForm({...form, category: e.target.value})} />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>Price (₹)</label>
              <input required type="number" step="0.01" className="form-control" style={{ width: '100%', padding: 8 }} value={form.price} onChange={e=>setForm({...form, price: e.target.value})} />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>Stock Quantity</label>
              <input required type="number" className="form-control" style={{ width: '100%', padding: 8 }} value={form.stockQuantity} onChange={e=>setForm({...form, stockQuantity: e.target.value})} />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>Description</label>
              <textarea required className="form-control" rows="3" style={{ width: '100%', padding: 8 }} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ padding: '8px 0', borderRadius: 20, background: '#FFD814', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="dashboard-products">
          <h3 style={{ marginBottom: 16 }}>Manage Inventory</h3>
          {products.length === 0 ? (
            <div style={{ padding: 20, background: '#f0f2f2', border: '1px solid #ddd' }}>You haven't added any products yet.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
              <thead style={{ background: '#f8f8f8' }}>
                <tr>
                  <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Image</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}><img src={p.imageUrl || `https://picsum.photos/50/50?random=${p.id}`} alt="" style={{width: 40, height: 40, objectFit: 'contain'}}/></td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{p.name}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{p.category}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>₹{p.price}</td>
                    <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{p.stockQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div>
        <h3 style={{ marginBottom: 16 }}>Pending Fulfillment (Your Items)</h3>
        {orders.length === 0 ? (
          <div style={{ padding: 20, background: '#f0f2f2', border: '1px solid #ddd' }}>No active orders need fulfillment.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead style={{ background: '#f8f8f8' }}>
              <tr>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Order #</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Date</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Product</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Qty</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Revenue</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Ship To</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <td style={{ padding: 12, borderBottom: '1px solid #ddd', color: '#007185', fontWeight: 'bold' }}>{o.orderNumber}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={o.productImageUrl || `https://picsum.photos/30/30?random=${i}`} alt="" style={{width: 30, height: 30, objectFit: 'contain'}}/>
                    {o.productName}
                  </td>
                  <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{o.quantity}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>₹{(o.priceAtPurchase * o.quantity).toFixed(2)}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>{o.customerCity}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 'bold',
                      background: o.orderStatus === 'PENDING' ? '#fcf3cf' : (o.orderStatus === 'SHIPPED' ? '#d4efdf' : '#fadbd8'),
                      color: o.orderStatus === 'PENDING' ? '#b9770e' : (o.orderStatus === 'SHIPPED' ? '#1d8348' : '#922b21')
                    }}>
                      {o.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default SellerDashboard;
