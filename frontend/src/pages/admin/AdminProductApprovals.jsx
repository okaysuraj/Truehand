import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const AdminProductApprovals = () => {
  const [filter, setFilter] = useState('pending');
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch all products to show approved/rejected history too
      const [pendingRes, allRes] = await Promise.all([
        api.get('/admin/products/pending'),
        api.get('/products?size=200')
      ]);
      const pending = pendingRes.data || [];
      // allRes.data might be a Page object with .content
      const all = allRes.data?.content || allRes.data || [];
      setAllProducts(all);
      // Merge: pending list is the source of truth for PENDING status
      setProducts([...pending, ...all.filter(p => p.status && p.status !== 'PENDING')]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleApprove = async (productId) => {
    try {
      await api.put(`/admin/products/${productId}/approve`, { status: 'APPROVED' });
      fetchProducts();
    } catch (err) {
      alert('Error approving product');
    }
  };

  const handleReject = async (productId) => {
    try {
      await api.put(`/admin/products/${productId}/approve`, { status: 'REJECTED' });
      fetchProducts();
    } catch (err) {
      alert('Error rejecting product');
    }
  };

  const statusColor = (status) => {
    const s = (status || '').toUpperCase();
    if (s === 'PENDING') return 'bg-amber-50 text-amber-700';
    if (s === 'APPROVED') return 'bg-forest-green/10 text-forest-green';
    if (s === 'REJECTED') return 'bg-red-50 text-red-600';
    return 'bg-surface-variant text-on-surface-variant';
  };

  const filtered = filter === 'all'
    ? products
    : products.filter(p => (p.status || 'APPROVED').toLowerCase() === filter.toLowerCase());

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Product Approval Queue</h1>
          <p className="font-body-md text-on-surface-variant">Review and approve new product listings before they go live.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { key: 'pending', label: 'Pending', count: products.filter(p => (p.status || '').toUpperCase() === 'PENDING').length },
            { key: 'approved', label: 'Approved', count: products.filter(p => !p.status || p.status.toUpperCase() === 'APPROVED').length },
            { key: 'rejected', label: 'Rejected', count: products.filter(p => (p.status || '').toUpperCase() === 'REJECTED').length },
            { key: 'all', label: 'All', count: products.length }
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-5 py-2 rounded-full font-label-md transition-colors flex items-center gap-2 ${
              filter === f.key ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
            }`}>
              {f.label}
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${filter === f.key ? 'bg-white/20' : 'bg-surface-variant/80'}`}>{f.count}</span>
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-12 text-center shadow-sm">
              <span className="material-symbols-outlined animate-spin text-forest-green text-4xl">progress_activity</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-12 text-center shadow-sm">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-4 block">inbox</span>
              <p className="font-body-md text-on-surface-variant">No products in this queue.</p>
            </div>
          ) : (
            filtered.map(product => (
              <div key={product.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-48 h-48 md:h-auto shrink-0 bg-surface-variant/30 flex items-center justify-center">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-5xl text-outline-variant">image</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`font-label-sm px-2.5 py-0.5 rounded ${statusColor(product.status)}`}>
                          {product.status || 'APPROVED'}
                        </span>
                        {product.category && (
                          <span className="font-label-sm text-on-surface-variant bg-surface-variant/50 px-2 py-0.5 rounded">{product.category}</span>
                        )}
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">{product.name}</h3>
                      <p className="font-body-sm text-on-surface-variant mb-1">
                        by {product.sellerName || `Seller #${product.sellerId}`}
                      </p>
                      {product.createdAt && (
                        <p className="font-label-sm text-on-surface-variant mb-3">
                          Submitted {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                      )}
                      <p className="font-label-md text-on-surface">${product.price?.toFixed(2)}</p>
                      {product.description && (
                        <p className="font-body-sm text-on-surface-variant mt-2 line-clamp-2">{product.description}</p>
                      )}
                    </div>

                    {(product.status || '').toUpperCase() === 'PENDING' && (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleApprove(product.id)}
                          className="px-5 py-2 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(product.id)}
                          className="px-5 py-2 border border-red-300 text-red-600 font-label-md rounded hover:bg-red-50 transition-colors flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                          Reject
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          className="px-5 py-2 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    )}
                    {(product.status || '').toUpperCase() === 'APPROVED' && (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleReject(product.id)}
                          className="px-5 py-2 border border-red-300 text-red-600 font-label-md rounded hover:bg-red-50 transition-colors flex items-center gap-1.5 text-sm"
                        >
                          <span className="material-symbols-outlined text-[16px]">block</span>
                          Revoke Approval
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          className="px-5 py-2 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    )}
                    {(product.status || '').toUpperCase() === 'REJECTED' && (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleApprove(product.id)}
                          className="px-5 py-2 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-1.5 text-sm"
                        >
                          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                          Re-approve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminProductApprovals;
