import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, activeOrders: 0, totalProducts: 0 });
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', category: '', price: '', stockQuantity: '', variants: [] });
  const [newVariant, setNewVariant] = useState({ sku: '', size: '', color: '', additionalPrice: '', stockQuantity: '' });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user || user.role !== 'SELLER') {
      navigate('/');
      return;
    }
    fetchProducts();
    fetchStats();
    fetchOrders();
    fetchQuestions();
  }, [user, navigate]);

  const fetchQuestions = async () => {
    try {
      const res = await api.get(`/questions/seller/${user.id}`);
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleUpdateOrderStatus = async (orderNumber, status) => {
    try {
      await api.put(`/seller/${user.id}/orders/${orderNumber}/status`, { status });
      fetchOrders();
    } catch (err) {
      alert('Error updating order status');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImageUrl(res.data.url);
    } catch (err) {
      alert('Error uploading image');
    }
    setUploadingImage(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/products', { ...form, imageUrl, sellerId: user.id });
      setForm({ name: '', description: '', category: '', price: '', stockQuantity: '', variants: [] });
      setImageUrl('');
      fetchProducts();
      fetchStats();
      setActiveTab('inventory');
    } catch (err) {
      alert('Error adding product');
    }
    setLoading(false);
  };

  if (!user || user.role !== 'SELLER') return null;

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-body-md relative">
      
      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-screen flex flex-col py-margin-desktop bg-surface-linen w-64 border-r border-outline-variant/10 shadow-[4px_0_24px_rgba(22,52,40,0.02)] z-40">
        <div className="px-gutter mb-section-gap flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-surface-container mb-stack-md flex items-center justify-center border border-outline-variant/20 shadow-sm overflow-hidden">
            <img 
              alt="Artisan Profile" 
              className="w-full h-full object-cover" 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}&backgroundColor=163428&textColor=ffffff`} 
            />
          </div>
          <h2 className="font-headline-md text-headline-md text-charcoal mb-1">Artisan Portal</h2>
          <p className="font-body-md text-body-md text-outline">{user.firstName}'s Studio</p>
        </div>
        
        <div className="flex-1 px-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out ${activeTab === 'overview' ? 'bg-surface-container text-terracotta border-r-2 border-terracotta' : 'text-outline hover:text-charcoal hover:bg-surface-container'}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-md text-label-md">Overview</span>
          </button>
          
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out ${activeTab === 'orders' ? 'bg-surface-container text-terracotta border-r-2 border-terracotta' : 'text-outline hover:text-charcoal hover:bg-surface-container'}`}>
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="font-label-md text-label-md">Orders</span>
          </button>
          
          <button onClick={() => setActiveTab('inventory')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out ${activeTab === 'inventory' ? 'bg-surface-container text-terracotta border-r-2 border-terracotta' : 'text-outline hover:text-charcoal hover:bg-surface-container'}`}>
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-label-md text-label-md">Inventory</span>
          </button>

          <button onClick={() => setActiveTab('questions')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out ${activeTab === 'questions' ? 'bg-surface-container text-terracotta border-r-2 border-terracotta' : 'text-outline hover:text-charcoal hover:bg-surface-container'}`}>
            <span className="material-symbols-outlined">forum</span>
            <span className="font-label-md text-label-md">Q&A</span>
          </button>
        </div>
        
        <div className="px-4 mt-auto space-y-4">
          <button onClick={() => setActiveTab('add')} className="w-full py-3 px-4 bg-forest-green text-on-primary font-label-md text-label-md rounded-sm shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Listing
          </button>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-32 pb-section-gap px-margin-desktop max-w-container-max mx-auto">
        
        {/* Welcome Header */}
        <div className="mb-section-gap flex justify-between items-end border-b border-outline-variant/20 pb-4">
          <div>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-stack-sm">{activeTab}</p>
            <h1 className="font-display-lg text-display-lg text-charcoal">
              {activeTab === 'overview' && `Welcome back, ${user.firstName}`}
              {activeTab === 'orders' && 'Manage Orders'}
              {activeTab === 'inventory' && 'Studio Inventory'}
              {activeTab === 'questions' && 'Customer Questions'}
              {activeTab === 'add' && 'Create New Listing'}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-outline font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-section-gap">
              {/* Stat Card 1 */}
              <div className="bg-surface-linen p-6 rounded-xl shadow-[0_4px_24px_rgba(22,52,40,0.04)] border border-outline-variant/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[120px] text-forest-green">account_balance_wallet</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-stack-lg text-outline">
                    <span className="material-symbols-outlined">payments</span>
                    <h3 className="font-label-md text-label-md">Total Revenue</h3>
                  </div>
                  <p className="font-headline-lg text-headline-lg text-charcoal mb-stack-sm">${stats.totalRevenue?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
              
              {/* Stat Card 2 */}
              <div className="bg-surface-linen p-6 rounded-xl shadow-[0_4px_24px_rgba(22,52,40,0.04)] border border-outline-variant/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[120px] text-forest-green">local_shipping</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-stack-lg text-outline">
                    <span className="material-symbols-outlined">inventory_2</span>
                    <h3 className="font-label-md text-label-md">Orders to Fulfill</h3>
                  </div>
                  <p className="font-headline-lg text-headline-lg text-charcoal mb-stack-sm">{stats.activeOrders || 0}</p>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-surface-linen p-6 rounded-xl shadow-[0_4px_24px_rgba(22,52,40,0.04)] border border-outline-variant/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[120px] text-forest-green">category</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-stack-lg text-outline">
                    <span className="material-symbols-outlined">storefront</span>
                    <h3 className="font-label-md text-label-md">Active Products</h3>
                  </div>
                  <p className="font-headline-lg text-headline-lg text-charcoal mb-stack-sm">{stats.totalProducts || 0}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface-linen rounded-xl shadow-[0_4px_24px_rgba(22,52,40,0.04)] border border-outline-variant/10 p-6">
              <div className="flex justify-between items-center mb-stack-lg">
                <h2 className="font-headline-md text-headline-md text-charcoal">Recent Orders</h2>
                <button onClick={() => setActiveTab('orders')} className="text-forest-green font-label-md text-label-md hover:underline">View All</button>
              </div>
              <div className="flex flex-col gap-4">
                {orders.slice(0, 3).map((o, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/20 cursor-pointer">
                    <div className="w-12 h-12 rounded bg-surface-container-highest overflow-hidden flex-shrink-0">
                      <img src={o.productImageUrl || `https://picsum.photos/50/50?random=${i}`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-label-md text-label-md text-charcoal truncate">{o.productName}</h4>
                      <p className="font-label-sm text-label-sm text-outline truncate">Order #{o.orderNumber} • {new Date(o.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-label-md text-label-md text-charcoal">${(o.priceAtPurchase * o.quantity).toFixed(2)}</p>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold mt-1 uppercase tracking-widest ${o.orderStatus === 'PENDING' ? 'bg-terracotta/10 text-terracotta' : (o.orderStatus === 'SHIPPED' ? 'bg-surface-tint/10 text-surface-tint' : 'bg-outline/10 text-outline')}`}>
                        {o.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && <p className="text-outline font-body-md">No recent orders.</p>}
              </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-outline">No orders found.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-lowest border-b border-outline-variant/20">
                  <tr>
                    <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">Order #</th>
                    <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">Product</th>
                    <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">Revenue</th>
                    <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest">Status</th>
                    <th className="p-4 font-label-md text-on-surface-variant uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-lowest">
                      <td className="p-4 font-label-md text-forest-green">{o.orderNumber}</td>
                      <td className="p-4 flex items-center gap-3">
                        <img src={o.productImageUrl} className="w-10 h-10 object-cover rounded-sm border border-outline-variant/20" />
                        <div>
                          <p className="font-label-md text-on-surface">{o.productName}</p>
                          <p className="font-label-sm text-outline">Qty: {o.quantity}</p>
                        </div>
                      </td>
                      <td className="p-4 font-label-md text-charcoal">${(o.priceAtPurchase * o.quantity).toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${o.orderStatus === 'PENDING' ? 'bg-terracotta/10 text-terracotta' : (o.orderStatus === 'SHIPPED' ? 'bg-surface-tint/10 text-surface-tint' : (o.orderStatus === 'DELIVERED' ? 'bg-forest-green/10 text-forest-green' : 'bg-error-red/10 text-error-red'))}`}>
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {o.orderStatus === 'PENDING' && (
                          <button onClick={() => handleUpdateOrderStatus(o.orderNumber, 'SHIPPED')} className="px-4 py-2 bg-surface-tint text-white font-label-sm rounded-sm hover:opacity-90 transition-opacity">Ship</button>
                        )}
                        {o.orderStatus === 'SHIPPED' && (
                          <button onClick={() => handleUpdateOrderStatus(o.orderNumber, 'DELIVERED')} className="px-4 py-2 bg-forest-green text-white font-label-sm rounded-sm hover:opacity-90 transition-opacity">Deliver</button>
                        )}
                        {o.orderStatus === 'PENDING' && (
                          <button onClick={() => handleUpdateOrderStatus(o.orderNumber, 'CANCELLED')} className="ml-2 px-4 py-2 border border-error-red text-error-red font-label-sm rounded-sm hover:bg-error-red/5 transition-colors">Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {products.map(p => (
              <div key={p.id} className="bg-white border border-outline-variant/20 rounded-sm overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-surface-container relative overflow-hidden">
                  <img src={p.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-sm font-label-sm uppercase tracking-widest text-forest-green">
                    {p.stockQuantity > 0 ? `${p.stockQuantity} in stock` : 'Out of stock'}
                  </div>
                </div>
                <div className="p-4 border-t border-outline-variant/10">
                  <span className="font-label-sm text-outline uppercase tracking-widest">{p.category}</span>
                  <h3 className="font-headline-md text-charcoal mt-1 truncate">{p.name}</h3>
                  <p className="font-label-md text-terracotta mt-1">${p.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-outline-variant/50 rounded-sm">
                <span className="material-symbols-outlined text-4xl text-outline mb-2">inventory_2</span>
                <p className="font-body-md text-on-surface-variant">No products listed yet.</p>
                <button onClick={() => setActiveTab('add')} className="mt-4 px-6 py-2 border border-forest-green text-forest-green font-label-md rounded-sm">Add First Product</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="max-w-2xl bg-white p-8 rounded-sm shadow-sm border border-outline-variant/20">
            <form onSubmit={handleAddProduct} className="space-y-6">
              
              <div>
                <label className="block font-label-md text-charcoal uppercase tracking-widest mb-2">Product Image</label>
                <div className="border-2 border-dashed border-outline-variant/50 rounded-sm p-6 text-center hover:bg-surface-container-lowest transition-colors cursor-pointer relative">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded-sm shadow-sm" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-outline mb-2">add_photo_alternate</span>
                      <p className="font-body-md text-on-surface-variant">Click or drag image to upload</p>
                    </>
                  )}
                  {uploadingImage && <p className="text-surface-tint font-label-sm mt-2">Uploading...</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block font-label-md text-charcoal uppercase tracking-widest mb-2">Product Name</label>
                  <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full border border-outline-variant/50 rounded-sm px-4 py-3 font-body-md focus:outline-none focus:border-forest-green bg-surface-container-lowest" />
                </div>
                
                <div>
                  <label className="block font-label-md text-charcoal uppercase tracking-widest mb-2">Category</label>
                  <input required value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="w-full border border-outline-variant/50 rounded-sm px-4 py-3 font-body-md focus:outline-none focus:border-forest-green bg-surface-container-lowest" />
                </div>

                <div>
                  <label className="block font-label-md text-charcoal uppercase tracking-widest mb-2">Price ($)</label>
                  <input required type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="w-full border border-outline-variant/50 rounded-sm px-4 py-3 font-body-md focus:outline-none focus:border-forest-green bg-surface-container-lowest" />
                </div>

                <div>
                  <label className="block font-label-md text-charcoal uppercase tracking-widest mb-2">Initial Stock</label>
                  <input required type="number" value={form.stockQuantity} onChange={e=>setForm({...form, stockQuantity: e.target.value})} className="w-full border border-outline-variant/50 rounded-sm px-4 py-3 font-body-md focus:outline-none focus:border-forest-green bg-surface-container-lowest" />
                </div>
              </div>

              <div>
                <label className="block font-label-md text-charcoal uppercase tracking-widest mb-2">Description</label>
                <textarea required rows="4" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="w-full border border-outline-variant/50 rounded-sm px-4 py-3 font-body-md focus:outline-none focus:border-forest-green bg-surface-container-lowest resize-none"></textarea>
              </div>

              <div className="pt-6 border-t border-outline-variant/20 flex justify-end">
                <button type="submit" disabled={loading || uploadingImage} className="px-8 py-3 bg-forest-green text-white font-label-md uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                  {loading ? 'Creating...' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            {questions.map((q, i) => (
              <div key={i} className="bg-white p-6 border border-outline-variant/20 rounded-sm shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-sm text-outline uppercase tracking-widest">Product ID: {q.productId}</span>
                    <span className="font-label-sm text-outline">{q.userName}</span>
                  </div>
                  <p className="font-headline-md text-charcoal mb-6">"{q.content}"</p>
                </div>
                
                {q.answer ? (
                  <div className="p-4 bg-surface-container-low rounded-sm border-l-4 border-forest-green">
                    <span className="font-label-sm text-forest-green uppercase tracking-widest block mb-1">Your Answer</span>
                    <p className="font-body-md text-charcoal">{q.answer}</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const answer = e.target.answer.value;
                    if (!answer) return;
                    api.put(`/questions/${q.id}/answer/seller/${user.id}`, { answer })
                      .then(() => {
                        fetchQuestions();
                      })
                      .catch(() => alert('Error answering question'));
                  }} className="mt-4 pt-4 border-t border-outline-variant/10">
                    <textarea name="answer" placeholder="Write your response..." rows="2" className="w-full border border-outline-variant/50 rounded-sm px-3 py-2 font-body-md focus:outline-none focus:border-forest-green bg-surface-container-lowest mb-3 resize-none"></textarea>
                    <button type="submit" className="w-full py-2 bg-surface-tint text-white font-label-md uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity">Submit Response</button>
                  </form>
                )}
              </div>
            ))}
            {questions.length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-outline-variant/50 rounded-sm">
                <span className="material-symbols-outlined text-4xl text-outline mb-2">forum</span>
                <p className="font-body-md text-on-surface-variant">No customer questions to answer.</p>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default SellerDashboard;
