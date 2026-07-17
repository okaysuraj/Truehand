import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';

const ManageVariants = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId') || 1; // Default to 1 for demo if none provided

  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [sku, setSku] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [additionalPrice, setAdditionalPrice] = useState('0');
  const [stockQuantity, setStockQuantity] = useState('0');

  useEffect(() => {
    fetchVariants();
  }, [productId]);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${productId}/variants`);
      setVariants(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/products/${productId}/variants`, {
        sku, size, color, additionalPrice, stockQuantity
      });
      fetchVariants();
      setSku(''); setSize(''); setColor(''); setAdditionalPrice('0'); setStockQuantity('0');
    } catch (err) {
      alert('Failed to add variant. Ensure product ID exists.');
    }
  };

  const handleDelete = async (variantId) => {
    try {
      await api.delete(`/products/${productId}/variants/${variantId}`);
      fetchVariants();
    } catch (err) {
      alert('Failed to delete variant.');
    }
  };

  return (
    <div className="min-h-screen bg-surface-linen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Manage Variants</h1>
          <p className="font-body-md text-on-surface-variant">Add sizes, colors, and SKUs to product #{productId}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Add Form */}
          <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant/30 h-fit">
            <h2 className="font-headline-sm text-on-surface mb-4">New Variant</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block font-label-md mb-1 text-on-surface">SKU</label>
                <input required value={sku} onChange={e=>setSku(e.target.value)} className="w-full px-3 py-2 border border-outline-variant rounded" placeholder="e.g. TSHIRT-BL-M" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md mb-1 text-on-surface">Size</label>
                  <input value={size} onChange={e=>setSize(e.target.value)} className="w-full px-3 py-2 border border-outline-variant rounded" placeholder="M" />
                </div>
                <div>
                  <label className="block font-label-md mb-1 text-on-surface">Color</label>
                  <input value={color} onChange={e=>setColor(e.target.value)} className="w-full px-3 py-2 border border-outline-variant rounded" placeholder="Blue" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md mb-1 text-on-surface">+ Price (₹)</label>
                  <input type="number" required value={additionalPrice} onChange={e=>setAdditionalPrice(e.target.value)} className="w-full px-3 py-2 border border-outline-variant rounded" />
                </div>
                <div>
                  <label className="block font-label-md mb-1 text-on-surface">Stock</label>
                  <input type="number" required value={stockQuantity} onChange={e=>setStockQuantity(e.target.value)} className="w-full px-3 py-2 border border-outline-variant rounded" />
                </div>
              </div>
              <button type="submit" className="w-full py-2 bg-forest-green text-white rounded font-label-md hover:bg-forest-green/90 transition-colors">
                Add Variant
              </button>
            </form>
          </div>

          {/* List */}
          <div className="md:col-span-2 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center"><span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span></div>
            ) : variants.length === 0 ? (
              <div className="p-12 text-center text-outline-variant">
                <span className="material-symbols-outlined text-4xl mb-2">style</span>
                <p>No variants added yet.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-surface-container-low border-b border-surface-variant/50">
                  <tr>
                    <th className="p-4 font-label-sm text-on-surface-variant">SKU</th>
                    <th className="p-4 font-label-sm text-on-surface-variant">Attributes</th>
                    <th className="p-4 font-label-sm text-on-surface-variant text-right">Price Mod</th>
                    <th className="p-4 font-label-sm text-on-surface-variant text-right">Stock</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {variants.map(v => (
                    <tr key={v.id} className="hover:bg-surface-container-lowest">
                      <td className="p-4 font-body-sm font-semibold">{v.sku}</td>
                      <td className="p-4 font-body-sm text-on-surface-variant">
                        {v.size && <span className="mr-2 px-2 py-0.5 bg-outline-variant/10 rounded">{v.size}</span>}
                        {v.color && <span className="px-2 py-0.5 bg-outline-variant/10 rounded">{v.color}</span>}
                      </td>
                      <td className="p-4 font-body-sm text-right text-forest-green">+{v.additionalPrice}</td>
                      <td className="p-4 font-body-sm text-right">{v.stockQuantity}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(v.id)} className="text-error-red hover:text-error-red/80">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageVariants;
