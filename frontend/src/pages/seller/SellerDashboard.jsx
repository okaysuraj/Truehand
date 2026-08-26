import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const RECENT_ORDERS_DATA = [
  {
    id: 1,
    name: 'Walnut Serving Bowl',
    orderNum: 'Order #8829 • 2 items',
    price: 145,
    status: 'Pending',
    statusBg: 'bg-amber-100 text-amber-900',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5LUJsR8fkJOTzvyhHwchvDPjR1q0fruU949k_rHczPObgMLlEpu5O1VUY_A1OF_pK7nbzFScYlfETZjxFDzxHQ6kVthhgV1PXPFGvVYo8VXDfGlg8UzdreBP91eMwHJJ2-v0uR07Dkp6I-iT52vSkn76DQpZkTJCxO9HtBsiqfse1H3sTmyUagH9hx7MmVjrweUY46wdxEX8pM4L_arvaBptPr46X6MAqqIJp7TET1FXsPXkM8Hyjw',
  },
  {
    id: 2,
    name: 'Earthy Mug Set (4pc)',
    orderNum: 'Order #8828 • 1 item',
    price: 85,
    status: 'Shipped',
    statusBg: 'bg-emerald-100 text-emerald-800',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ',
  },
  {
    id: 3,
    name: 'Artisan Studio Apron',
    orderNum: 'Order #8827 • 1 item',
    price: 110,
    status: 'Shipped',
    statusBg: 'bg-emerald-100 text-emerald-800',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
  },
];

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRevenue: 12450.00,
    ordersToFulfill: 18,
    storeVisits: 3892,
  });
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  useEffect(() => {
    if (user?.id) {
      api.get(`/seller/${user.id}/stats`)
        .then(res => {
          if (res.data) {
            setStats(prev => ({
              ...prev,
              totalRevenue: res.data.totalRevenue || prev.totalRevenue,
              ordersToFulfill: res.data.activeOrders || prev.ordersToFulfill,
            }));
          }
        })
        .catch(e => console.warn(e));
    }
  }, [user]);

  const userName = user?.firstName || 'Julian';

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Sidebar: Artisan Portal */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/40">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" 
                alt="Artisan Portal" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="font-display-md text-base font-bold text-forest-green">Artisan Portal</h2>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Master Workshop</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/seller/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              Overview
            </Link>
            <Link to="/seller/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Orders
            </Link>
            <Link to="/seller/inventory" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Inventory
            </Link>
            <Link to="/analytics" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">insights</span>
              Analytics
            </Link>
            <Link to="/finances" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-outline-variant/20">
          <Link 
            to="/new-listing" 
            className="w-full py-3 bg-forest-green text-white rounded-lg text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Listing
          </Link>
          <Link 
            to="/help" 
            className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface-variant hover:text-forest-green transition-colors font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
            Support
          </Link>
        </div>
      </aside>

      {/* Main Studio Area */}
      <main className="flex-1 p-6 md:p-12 max-w-6xl">
        
        {/* Top Navbar items */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Overview
            </span>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal">
              Welcome back to the Studio, {userName}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-outline-variant/30 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              Oct 24, 2023
            </span>
          </div>
        </div>

        {/* 3 Stats Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-xs uppercase tracking-wider mb-2 font-semibold">
                <span className="material-symbols-outlined text-base">payments</span>
                <span>Total Revenue</span>
              </div>
              <h3 className="font-display-lg text-3xl font-bold text-charcoal">
                ${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+14.5% vs last month</span>
            </div>
            <div className="absolute -right-2 -bottom-2 text-surface-container-low opacity-40 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">account_balance_wallet</span>
            </div>
          </div>

          {/* Orders to Fulfill */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-xs uppercase tracking-wider mb-2 font-semibold">
                <span className="material-symbols-outlined text-base">inventory_2</span>
                <span>Orders to Fulfill</span>
              </div>
              <h3 className="font-display-lg text-3xl font-bold text-charcoal">
                {stats.ordersToFulfill}
              </h3>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-900 font-semibold bg-amber-50 w-fit px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span>3 require attention</span>
            </div>
            <div className="absolute -right-2 -bottom-2 text-surface-container-low opacity-40 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">local_shipping</span>
            </div>
          </div>

          {/* Store Visits */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-xs uppercase tracking-wider mb-2 font-semibold">
                <span className="material-symbols-outlined text-base">storefront</span>
                <span>Store Visits</span>
              </div>
              <h3 className="font-display-lg text-3xl font-bold text-charcoal">
                {stats.storeVisits.toLocaleString()}
              </h3>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+5.2% this week</span>
            </div>
            <div className="absolute -right-2 -bottom-2 text-surface-container-low opacity-40 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">visibility</span>
            </div>
          </div>

        </div>

        {/* Bottom Section: Chart + Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Studio Performance Bar Chart */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-base md:text-lg text-charcoal font-bold">Studio Performance</h3>
              <select 
                value={timeframe} 
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/40 rounded-lg text-xs font-semibold px-3 py-1.5 text-on-surface focus:outline-none"
              >
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last Quarter</option>
              </select>
            </div>

            {/* Simulated Bar Graph */}
            <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 border-b border-outline-variant/20">
              {[
                { day: 'Mon', height: '40%', val: '2.8k' },
                { day: 'Tue', height: '60%', val: '3.4k' },
                { day: 'Wed', height: '30%', val: '2.5k', custom: 'bg-[#7a9486]' },
                { day: 'Thu', height: '75%', val: '4.2k' },
                { day: 'Fri', height: '70%', val: '3.9k' },
                { day: 'Sat', height: '95%', val: '5.1k', active: true },
                { day: 'Sun', height: '45%', val: '3.0k' },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div 
                    style={{ height: bar.height }}
                    className={`w-full max-w-[36px] rounded-t-md transition-all duration-500 ${
                      bar.active 
                        ? 'bg-forest-green shadow-md group-hover:opacity-90' 
                        : bar.custom || 'bg-surface-container-highest hover:bg-forest-green/60'
                    }`}
                  />
                  <span className={`text-[11px] font-semibold ${bar.active ? 'text-forest-green font-bold' : 'text-on-surface-variant'}`}>
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Widget */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-base md:text-lg text-charcoal font-bold">Recent Orders</h3>
                <Link to="/seller/orders" className="text-xs text-forest-green font-bold hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {RECENT_ORDERS_DATA.map(ord => (
                  <div key={ord.id} className="flex items-center justify-between gap-3 pb-3 border-b border-outline-variant/10 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0">
                        <img src={ord.image} alt={ord.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-headline-md text-xs font-bold text-charcoal line-clamp-1">{ord.name}</h4>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">{ord.orderNum}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-headline-md text-xs font-bold text-charcoal block">${ord.price}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${ord.statusBg}`}>
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              to="/seller/orders"
              className="mt-6 w-full py-2.5 border border-outline-variant text-charcoal text-center rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-surface-container transition-colors block"
            >
              Fulfill Orders
            </Link>
          </div>

        </div>

      </main>

    </div>
  );
};

export default SellerDashboard;
