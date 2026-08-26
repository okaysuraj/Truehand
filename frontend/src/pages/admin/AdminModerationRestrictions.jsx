import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminModerationRestrictions = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = () => {
    api.get('/admin/products/pending')
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleAction = async (id, action) => {
    const status = action === 'approve' ? 'APPROVED' : 'REJECTED';
    
    // Optimistic update
    setItems(items.filter(item => item.id !== id));
    
    try {
      await api.put(`/admin/products/${id}/approve`, { status });
    } catch (err) {
      console.error(err);
      // Revert on failure (simplified)
      fetchPendingProducts();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-linen pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
              <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin Dashboard
            </Link>
            <h1 className="font-display-md text-display-md text-on-surface mb-2">Content Moderation</h1>
            <p className="font-body-md text-on-surface-variant">Review new product submissions before they go live on the storefront.</p>
          </div>
          
          <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-label-md flex items-center gap-2 border border-amber-200">
            <span className="material-symbols-outlined text-sm">pending_actions</span>
            {items.length} Pending Approvals
          </div>
        </div>

        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm flex flex-col md:flex-row gap-5 transition-all hover:shadow-md">
              
              <div className="w-24 h-24 rounded-lg bg-surface-variant shrink-0 overflow-hidden border border-outline-variant/30">
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline-variant">
                    <span className="material-symbols-outlined">image</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-headline-sm text-on-surface mb-1 truncate">{item.name}</h3>
                    <p className="font-label-sm text-forest-green mb-2">${item.price?.toFixed(2)}</p>
                    <p className="font-body-sm text-on-surface-variant line-clamp-2 mb-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">category</span> {item.category}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">storefront</span> Seller ID: {item.sellerId}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={() => handleAction(item.id, 'approve')} 
                      className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">check_circle</span> Approve
                    </button>
                    <button 
                      onClick={() => handleAction(item.id, 'reject')} 
                      className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">block</span> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-20 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm">
              <span className="material-symbols-outlined text-5xl text-forest-green mb-4 opacity-50">verified</span>
              <h3 className="font-headline-sm text-on-surface mb-2">All caught up!</h3>
              <p className="font-body-md text-on-surface-variant">There are no pending products requiring moderation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminModerationRestrictions;
