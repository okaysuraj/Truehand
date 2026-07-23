import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const AdminCustomers = () => {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/users');
        setCustomers(res.data || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchCustomers();
  }, [user, navigate]);

  const filtered = customers.filter(c => {
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    const email = (c.email || '').toLowerCase();
    return fullName.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Customer Management</h1>
          <p className="font-body-md text-on-surface-variant">View and manage all registered customers on the platform.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Total Customers', value: customers.length, icon: 'group' },
            { label: 'Active', value: customers.filter(c => c.isActive !== false).length, icon: 'check_circle' },
          ].map((s, i) => (
            <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-forest-green text-[18px]">{s.icon}</span>
                <span className="font-label-sm text-on-surface-variant">{s.label}</span>
              </div>
              <p className="font-headline-md text-headline-md text-on-surface">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-variant/20">
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Customer</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Email</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Joined</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Orders</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Total Spent</th>
                  <th className="text-left p-4 font-label-sm text-on-surface-variant">Status</th>
                  <th className="text-right p-4 font-label-sm text-on-surface-variant">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8">
                      <span className="material-symbols-outlined animate-spin text-forest-green text-3xl">progress_activity</span>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8 font-body-md text-on-surface-variant">No customers found.</td>
                  </tr>
                ) : filtered.map(customer => (
                  <tr key={customer.id} className="hover:bg-surface-linen/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green font-label-md shrink-0">{(customer.firstName || 'U').charAt(0)}</div>
                        <span className="font-label-md text-on-surface">{customer.firstName} {customer.lastName}</span>
                      </div>
                    </td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{customer.email}</td>
                    <td className="p-4 font-body-sm text-on-surface-variant">{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td className="p-4 text-right font-label-md text-on-surface">-</td>
                    <td className="p-4 text-right font-label-md text-on-surface">-</td>
                    <td className="p-4">
                      <span className={`font-label-sm px-2.5 py-0.5 rounded ${
                        customer.isActive !== false ? 'bg-forest-green/10 text-forest-green' : 'bg-red-50 text-red-600'
                      }`}>{customer.isActive !== false ? 'Active' : 'Suspended'}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-forest-green transition-colors p-1"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                      <button className="text-on-surface-variant hover:text-red-600 transition-colors p-1 ml-1"><span className="material-symbols-outlined text-[20px]">block</span></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-outline-variant/30">
            {filtered.map(customer => (
              <div key={customer.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green font-label-md shrink-0">{customer.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-on-surface truncate">{customer.name}</p>
                  <p className="font-body-sm text-on-surface-variant">{customer.orders} orders · ${customer.spent.toFixed(0)}</p>
                </div>
                <span className={`font-label-sm px-2 py-0.5 rounded shrink-0 ${
                  customer.status === 'Active' ? 'bg-forest-green/10 text-forest-green' : 'bg-red-50 text-red-600'
                }`}>{customer.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
