import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminReturnRequests = () => {
  const [filter, setFilter] = useState('pending');
  
  const returns = [
    { id: 'RET-091', orderId: 'TH-29481', customer: 'Jane Doe', item: 'Ceramic Vase', reason: 'Damaged in transit', date: 'Oct 28, 2023', status: 'pending', amount: 120.00 },
    { id: 'RET-088', orderId: 'TH-29462', customer: 'Michael T.', item: 'Woven Throw', reason: 'Not as described', date: 'Oct 26, 2023', status: 'approved', amount: 200.00 },
    { id: 'RET-085', orderId: 'TH-29440', customer: 'Sarah L.', item: 'Sandstone Sculpture', reason: 'Changed mind', date: 'Oct 24, 2023', status: 'rejected', amount: 450.00 },
    { id: 'RET-082', orderId: 'TH-29388', customer: 'Emma W.', item: 'Walnut Nesting Set', reason: 'Wrong item sent', date: 'Oct 20, 2023', status: 'completed', amount: 240.00 }
  ];

  const filtered = filter === 'all' ? returns : returns.filter(r => r.status === filter);

  const statusColor = (s) => {
    switch(s) {
      case 'pending': return 'bg-amber-50 text-amber-700';
      case 'approved': return 'bg-blue-50 text-blue-700';
      case 'completed': return 'bg-forest-green/10 text-forest-green';
      case 'rejected': return 'bg-red-50 text-red-600';
      default: return 'bg-surface-variant text-on-surface-variant';
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="flex h-screen bg-surface-linen">
      {/* Sidebar Placeholder (assuming layout handles this, but for standalone preview) */}
      <div className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 hidden md:block">
        <div className="p-6">
          <Link to="/admin/dashboard" className="font-display-md text-xl text-forest-green">TrueHand Admin</Link>
        </div>
        <nav className="px-4 space-y-1">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant rounded-md hover:bg-surface-variant/30"><span className="material-symbols-outlined">dashboard</span>Dashboard</Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant rounded-md hover:bg-surface-variant/30"><span className="material-symbols-outlined">shopping_bag</span>Orders</Link>
          <Link to="/admin/returns" className="flex items-center gap-3 px-3 py-2 bg-forest-green/10 text-forest-green rounded-md font-label-md"><span className="material-symbols-outlined">assignment_return</span>Returns</Link>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="font-display-md text-display-md text-on-surface mb-2">Return Requests</h1>
            <p className="font-body-md text-on-surface-variant">Review and manage customer return and refund requests.</p>
          </div>

          <div className="flex gap-2 mb-6">
            {['pending', 'approved', 'completed', 'rejected', 'all'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-label-sm capitalize transition-colors ${
                filter === f ? 'bg-charcoal text-white' : 'bg-surface-container border border-outline-variant/30 text-on-surface hover:border-forest-green'
              }`}>{f}</button>
            ))}
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-variant/30 border-b border-outline-variant/30">
                    <th className="p-4 font-label-sm text-on-surface-variant font-normal">Request ID</th>
                    <th className="p-4 font-label-sm text-on-surface-variant font-normal">Order</th>
                    <th className="p-4 font-label-sm text-on-surface-variant font-normal">Item</th>
                    <th className="p-4 font-label-sm text-on-surface-variant font-normal">Reason</th>
                    <th className="p-4 font-label-sm text-on-surface-variant font-normal">Status</th>
                    <th className="p-4 font-label-sm text-on-surface-variant font-normal text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filtered.map(req => (
                    <tr key={req.id} className="hover:bg-surface-linen/50 transition-colors">
                      <td className="p-4 font-label-md text-on-surface">{req.id}</td>
                      <td className="p-4 font-body-sm text-on-surface"><Link to={`/order/${req.orderId}`} className="text-forest-green hover:underline">{req.orderId}</Link></td>
                      <td className="p-4 font-body-sm text-on-surface">{req.item}</td>
                      <td className="p-4 font-body-sm text-on-surface-variant">{req.reason}</td>
                      <td className="p-4">
                        <span className={`font-label-sm px-2.5 py-0.5 rounded capitalize ${statusColor(req.status)}`}>{req.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        <Link to={`/admin/returns/${req.id}`} className="text-forest-green font-label-sm hover:underline">Review</Link>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-on-surface-variant font-body-md">No return requests found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReturnRequests;
