import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthProvider';

const SAMPLE_MASTER_ORDERS = [
  {
    id: 'ORD-9082',
    orderNumber: '#ORD-9082',
    dateTime: 'Oct 24, 2023',
    time: '14:32 EST',
    customer: 'Eleanor Sterling',
    initials: 'ES',
    artisan: 'Oak & Iron Forge',
    amount: 1240.00,
    status: 'Delivered',
    statusColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'ORD-9081',
    orderNumber: '#ORD-9081',
    dateTime: 'Oct 23, 2023',
    time: '09:15 EST',
    customer: 'Marcus Vance',
    initials: 'MJ',
    artisan: 'Ceramics by Lin',
    amount: 385.50,
    status: 'Shipped',
    statusColor: 'bg-surface-container-high text-on-surface-variant',
  },
  {
    id: 'ORD-9080',
    orderNumber: '#ORD-9080',
    dateTime: 'Oct 23, 2023',
    time: '16:45 EST',
    customer: 'Aria Loe',
    initials: 'AL',
    artisan: "Weaver's Loom",
    amount: 890.00,
    status: 'Pending',
    statusColor: 'bg-amber-100 text-amber-900',
  },
  {
    id: 'ORD-9079',
    orderNumber: '#ORD-9079',
    dateTime: 'Oct 22, 2023',
    time: '11:10 EST',
    customer: 'Thomas Reid',
    initials: 'TR',
    artisan: 'Glassworks Studio',
    amount: 2150.00,
    status: 'Disputed',
    statusColor: 'bg-red-100 text-red-800',
  },
];

const AdminOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [orders, setOrders] = useState(SAMPLE_MASTER_ORDERS);

  useEffect(() => {
    api.get('/orders/all')
      .then(res => {
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map(o => ({
            id: `ORD-${o.id}`,
            orderNumber: `#ORD-${o.id}`,
            dateTime: new Date(o.createdAt || Date.now()).toLocaleDateString(),
            time: '12:00 EST',
            customer: o.user?.firstName ? `${o.user.firstName} ${o.user.lastName || ''}` : 'Artisan Patron',
            initials: o.user?.firstName ? o.user.firstName.slice(0, 2).toUpperCase() : 'AP',
            artisan: 'TrueHand Studio',
            amount: o.totalAmount || 450.00,
            status: o.status || 'Delivered',
            statusColor: o.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container-high text-on-surface-variant',
          }));
          setOrders(mapped);
        }
      })
      .catch(e => console.warn(e));
  }, []);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = !search || o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()) || o.artisan.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Admin Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          
          {/* Admin Profile */}
          <div className="flex items-center gap-3 pb-6 border-b border-outline-variant/20">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shadow-sm">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU3O6ywVK7jEMLvKVA2kxssgwGL1XlWsOAd84tu2XqZg4CgzMYwltj5tWAQ2Ql8IT5-5vy-eHa4sLDQptw0SRhg91q6t80nQZblBDtMIfRgO6xDTt-aalUaPfafhqNy6M2zGihlYjIFhars6KFVaVaaXuwbb1XPoHyo2Tean4Jy8_9ET7nngtylq-67tC3Lz5ezyZgAqsdw6ASwH_K2vf_bCNtZUQmDTguRdIoB-r5OyDzVc98AqtFxQ" 
                alt="Artisanal Admin" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="font-display-md text-sm font-bold text-forest-green">Artisanal Admin</h2>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Marketplace Manager
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              Dashboard
            </Link>
            <Link to="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">group</span>
              Users
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Orders
            </Link>
            <Link to="/admin/platform-revenue" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/admin/banner-management" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Content
            </Link>
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-outline-variant/20">
          <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Settings
          </Link>
          <Link to="/" className="w-full py-3 bg-forest-green text-white rounded-lg text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow">
            <span>View Storefront</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </Link>
        </div>
      </aside>

      {/* Main Table Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl text-forest-green font-bold mb-1">
              Master Orders List
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Manage and track all physical transactions across the artisan network.
            </p>
          </div>

          <button 
            onClick={() => alert('Exporting orders as CSV...')}
            className="px-5 py-2.5 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export CSV
          </button>
        </div>

        {/* Filter Card */}
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end text-xs">
          
          <div className="space-y-1.5 lg:col-span-2">
            <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Search Orders
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input 
                type="text" 
                placeholder="Order ID, Customer, Artisan..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-forest-green"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Status
            </label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-forest-green cursor-pointer font-medium"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="Shipped">Shipped</option>
              <option value="Pending">Pending</option>
              <option value="Disputed">Disputed</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Date Range
            </label>
            <button className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-2.5 text-xs flex items-center justify-between text-on-surface font-medium">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">calendar_today</span>
                Last 30 Days
              </span>
              <span className="material-symbols-outlined text-[14px]">tune</span>
            </button>
          </div>

        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase tracking-wider font-semibold border-b border-outline-variant/30">
                <tr>
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Date &amp; Time</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Artisan / Workshop</th>
                  <th className="py-3.5 px-6">Total Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer" onClick={() => navigate(`/order/${o.id}`)}>
                    <td className="py-4 px-6 font-mono font-bold text-forest-green">
                      {o.orderNumber}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-charcoal block">{o.dateTime}</span>
                      <span className="text-[10px] text-on-surface-variant">{o.time}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-[11px] text-forest-green">
                          {o.initials}
                        </div>
                        <span className="font-semibold text-charcoal">{o.customer}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant font-medium">
                      {o.artisan}
                    </td>
                    <td className="py-4 px-6 font-semibold text-charcoal">
                      ${o.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${o.statusColor}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Showing 1 to {filteredOrders.length} of 248 orders</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center hover:bg-surface-container">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center hover:bg-surface-container">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};

export default AdminOrders;
