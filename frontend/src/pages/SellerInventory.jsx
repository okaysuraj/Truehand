import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const SellerInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'SELLER') {
      navigate('/');
      return;
    }
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/seller/${user.id}`);
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [user, navigate]);

  const getStatus = (stock) => {
    if (stock <= 0) return 'Out of Stock';
    if (stock < 5) return 'Low Stock';
    return 'Active';
  };

  const filteredProducts = products
    .filter(p => filter === 'all' || getStatus(p.stockQuantity).toLowerCase().replace(' ', '-') === filter)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link to="/seller/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Inventory Management</h1>
              <p className="font-body-md text-on-surface-variant">Manage stock levels and product availability.</p>
            </div>
            <Link to="/seller/dashboard" className="px-6 py-2.5 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0 self-start md:self-auto">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Product
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'low-stock', 'out-of-stock'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize whitespace-nowrap transition-colors ${
                filter === f ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
              }`}>
                {f === 'all' ? 'All' : f.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-variant/20">
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Product</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">SKU</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Price</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Stock</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Status</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8">
                      <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8 font-body-md text-on-surface-variant">No products found.</td>
                  </tr>
                ) : filteredProducts.map((product) => {
                  const status = getStatus(product.stockQuantity);
                  return (
                  <tr key={product.id} className="hover:bg-surface-linen/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.imageUrl || product.image} alt={product.name} className="w-12 h-12 rounded object-cover shrink-0" />
                        <span className="font-label-md text-on-surface truncate max-w-[200px] block">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-body-sm text-on-surface-variant">PROD-{product.id}</td>
                    <td className="p-4 text-right font-label-md text-on-surface">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-right font-label-md text-on-surface">{product.stockQuantity}</td>
                    <td className="p-4">
                      <span className={`font-label-sm px-2.5 py-0.5 rounded ${
                        status === 'Active' ? 'bg-forest-green/10 text-forest-green' : status === 'Low Stock' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'
                      }`}>{status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-forest-green transition-colors p-1">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-outline-variant/30">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-4 flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-14 h-14 rounded object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-on-surface truncate">{product.name}</p>
                  <p className="font-body-sm text-on-surface-variant">{product.sku} · Stock: {product.stock}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-label-md text-on-surface">${product.price}</p>
                  <span className={`font-label-sm ${
                    product.status === 'Active' ? 'text-forest-green' : product.status === 'Low Stock' ? 'text-amber-600' : 'text-red-600'
                  }`}>{product.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SellerInventory;
