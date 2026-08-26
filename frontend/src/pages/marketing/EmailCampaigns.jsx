import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RECENT_EMAIL_CAMPAIGNS = [
  {
    name: 'Autumn Collection Preview',
    status: 'Sent',
    statusClass: 'bg-surface-container text-on-surface-variant',
    sent: 'Oct 12, 2023',
    openRate: '68%',
    revenue: '$4,200',
  },
  {
    name: 'Studio Notes: Volume 4',
    status: 'Sent',
    statusClass: 'bg-surface-container text-on-surface-variant',
    sent: 'Sep 28, 2023',
    openRate: '72%',
    revenue: '$1,150',
  },
  {
    name: 'Holiday Pre-Sale Announcement',
    status: 'Draft',
    statusClass: 'border border-outline-variant text-on-surface-variant',
    sent: '—',
    openRate: '—',
    revenue: '—',
  },
];

const EmailCampaigns = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisan Panel</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Quiet Luxury Management</p>
          </div>

          <button 
            onClick={() => navigate('/seller/new-listing')}
            className="w-full py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 shadow flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add New Product
          </button>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
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
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/platform-revenue" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/admin/campaigns/email" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              Marketing
            </Link>
            <Link to="/admin/moderation" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shield</span>
              Safety
            </Link>
          </nav>
        </div>

        <div className="space-y-2 text-xs text-on-surface-variant">
          <Link to="/help" className="flex items-center gap-2 px-3.5 py-2 rounded-lg hover:text-charcoal">
            <span className="material-symbols-outlined text-base">help</span>
            Support
          </Link>
          <button onClick={() => alert('Logged out')} className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg hover:text-red-600 text-left">
            <span className="material-symbols-outlined text-base">logout</span>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Create Action */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Email Marketing
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
              Design, send, and analyze your artisanal communications.
            </p>
          </div>

          <button 
            onClick={() => navigate('/admin/campaigns/create')}
            className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow flex items-center gap-2 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">edit_document</span>
            Create Email
          </button>
        </div>

        {/* 2-Column Section: Curated Templates & 30-Day Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-xs">
          
          {/* Curated Templates 3-Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display-md text-base font-bold text-charcoal">Curated Templates</h3>
              <button onClick={() => alert('Browse all templates')} className="text-forest-green font-bold hover:underline">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div 
                onClick={() => navigate('/admin/campaigns/create')}
                className="bg-white p-4 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3 cursor-pointer hover:shadow-md transition-all group"
              >
                <div className="h-44 bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/20">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" 
                    alt="The Newsletter" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal text-xs">The Newsletter</h4>
                  <p className="text-[10px] text-on-surface-variant">Editorial &amp; Storytelling</p>
                </div>
              </div>

              <div 
                onClick={() => navigate('/admin/campaigns/create')}
                className="bg-white p-4 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3 cursor-pointer hover:shadow-md transition-all group"
              >
                <div className="h-44 bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/20">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A" 
                    alt="New Arrival" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal text-xs">New Arrival</h4>
                  <p className="text-[10px] text-on-surface-variant">Product Showcase</p>
                </div>
              </div>

              <div 
                onClick={() => navigate('/admin/campaigns/create')}
                className="bg-white p-4 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3 cursor-pointer hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="h-44 bg-surface-container rounded-2xl flex items-center justify-center text-on-surface-variant/40 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-4xl">receipt_long</span>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal text-xs">Order Follow-up</h4>
                  <p className="text-[10px] text-on-surface-variant">Transactional &amp; Care</p>
                </div>
              </div>

            </div>
          </div>

          {/* 30-Day Overview Box */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
            <h3 className="font-display-md text-base font-bold text-charcoal pb-2 border-b border-outline-variant/20">
              30-Day Overview
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  AVERAGE OPEN RATE
                </span>
                <div className="flex items-baseline gap-2">
                  <h4 className="font-display-lg text-3xl font-bold text-charcoal">64.2%</h4>
                  <span className="text-[10px] text-forest-green font-bold">↗ 2.1%</span>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-outline-variant/10">
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  CLICK-TO-OPEN RATE
                </span>
                <h4 className="font-display-lg text-3xl font-bold text-charcoal">18.5%</h4>
              </div>

              <div className="space-y-1 pt-2 border-t border-outline-variant/10">
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  REVENUE GENERATED
                </span>
                <h4 className="font-display-lg text-3xl font-bold text-charcoal">$12,450</h4>
              </div>
            </div>
          </div>

        </div>

        {/* Recent Campaigns Table */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden text-xs">
          <div className="p-6 pb-4">
            <h3 className="font-display-md text-base font-bold text-charcoal">Recent Campaigns</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold border-y border-outline-variant/20">
                <tr>
                  <th className="p-4 pl-6">Campaign Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Sent</th>
                  <th className="p-4">Open Rate</th>
                  <th className="p-4 text-right pr-6">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {RECENT_EMAIL_CAMPAIGNS.map(c => (
                  <tr key={c.name} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6 font-bold text-charcoal">{c.name}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${c.statusClass}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-on-surface-variant font-mono">{c.sent}</td>
                    <td className="p-4 font-mono font-semibold text-charcoal">{c.openRate}</td>
                    <td className="p-4 text-right pr-6 font-mono font-bold text-charcoal">{c.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

    </div>
  );
};

export default EmailCampaigns;
