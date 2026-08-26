import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RECENT_PUSH_CAMPAIGNS = [
  {
    name: 'Winter Linen Restock',
    sentDate: 'Oct 12, 2023',
    audience: 'All Subscribers',
    openRate: '24.5%',
    tapRate: '8.2%',
    status: 'Sent',
    statusClass: 'bg-surface-container text-on-surface-variant',
  },
  {
    name: 'Exclusive: Bronze Sculptures',
    sentDate: 'Sep 28, 2023',
    audience: 'VIP Collectors',
    openRate: '42.1%',
    tapRate: '15.4%',
    status: 'Sent',
    statusClass: 'bg-surface-container text-on-surface-variant',
  },
  {
    name: 'Abandoned Cart Reminder',
    sentDate: 'Automated',
    audience: 'Cart Abandoners',
    openRate: '38.0%',
    tapRate: '12.1%',
    status: 'Active',
    statusClass: 'bg-emerald-50 text-forest-green',
  },
];

const PushNotificationCampaigns = () => {
  const navigate = useNavigate();
  const [campaignName, setCampaignName] = useState('Spring Ceramics Launch');
  const [title, setTitle] = useState('New Arrivals: Hand-thrown Teapots');
  const [body, setBody] = useState('Discover the latest collection from Kyoto-based masters. Limited availability.');

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
            <Link to="/admin/campaigns/push" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              Marketing
            </Link>
            <Link to="/admin/moderation" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shield</span>
              Safety
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Header & Action */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-2 border-b border-outline-variant/20">
          <div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-charcoal">
              Push Notification Campaigns
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1 max-w-xl leading-relaxed">
              Curate and schedule direct communications. Engage your collectors with crafted messages delivered straight to their devices.
            </p>
          </div>

          <button 
            onClick={() => alert('Drafting new push campaign...')}
            className="px-6 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow flex items-center gap-2 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">edit_note</span>
            Draft Campaign
          </button>
        </div>

        {/* 2-Column Section: Active Builder & Device Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-xs">
          
          {/* Left: Active Builder */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
            <h3 className="font-display-md text-base font-bold text-charcoal">Active Builder</h3>

            {/* Stepper Header */}
            <div className="flex items-center gap-6 text-[11px] font-semibold border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-2 text-forest-green font-bold">
                <span className="w-5 h-5 rounded-full bg-forest-green text-white flex items-center justify-center text-[10px]">1</span>
                Content
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-[10px]">2</span>
                Audience
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-[10px]">3</span>
                Schedule
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-1">
                <label className="block font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                  Campaign Name (Internal)
                </label>
                <input 
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-semibold text-charcoal focus:outline-none focus:border-forest-green"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                  Notification Title
                </label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-semibold text-charcoal focus:outline-none focus:border-forest-green"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                    Message Body
                  </label>
                  <span className="text-[10px] text-on-surface-variant font-mono">{body.length} / 140</span>
                </div>
                <textarea 
                  rows={3}
                  maxLength={140}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs font-body-md text-charcoal focus:outline-none focus:border-forest-green"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                  Attached Media (Optional)
                </label>
                <div 
                  onClick={() => alert('Upload media modal')}
                  className="p-6 border-2 border-dashed border-outline-variant/60 rounded-2xl text-center space-y-1 cursor-pointer hover:border-forest-green transition-colors bg-surface-container-lowest"
                >
                  <span className="material-symbols-outlined text-2xl text-on-surface-variant">image</span>
                  <p className="font-bold text-charcoal text-xs">Click to upload or drag and drop</p>
                  <p className="text-[10px] text-on-surface-variant font-mono">JPEG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button 
                  type="button"
                  onClick={() => alert('Draft saved')}
                  className="px-5 py-2.5 border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
                >
                  Save Draft
                </button>
                <button 
                  type="button"
                  onClick={() => alert('Proceeding to Audience step...')}
                  className="px-6 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow"
                >
                  Next: Audience
                </button>
              </div>
            </form>
          </div>

          {/* Right: Device Preview */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display-md text-base font-bold text-charcoal">Device Preview</h3>

            {/* Simulated Phone Frame */}
            <div className="bg-slate-900 rounded-[40px] p-4 shadow-2xl border-4 border-slate-700 max-w-sm mx-auto">
              <div className="bg-slate-100 rounded-[32px] overflow-hidden p-4 pt-3 min-h-[380px] space-y-4 relative">
                {/* Phone Status Bar */}
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-800 px-2">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">signal_cellular_alt</span>
                    <span className="material-symbols-outlined text-xs">wifi</span>
                    <span className="material-symbols-outlined text-xs">battery_full</span>
                  </div>
                </div>

                {/* Simulated Notification Banner */}
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white/60 space-y-2 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-forest-green text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-base">eco</span>
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex justify-between items-center">
                        <h6 className="font-bold text-charcoal text-[11px] leading-tight line-clamp-1">{title}</h6>
                        <span className="text-[9px] text-on-surface-variant/60 font-mono">now</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant line-clamp-3 leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Targeting Estimates Card */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Targeting Estimates
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Recent Buyers (30d)</span>
                  <span className="font-mono font-bold text-charcoal">1,240</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Lapsed Collectors (&gt;90d)</span>
                  <span className="font-mono font-bold text-charcoal">3,892</span>
                </div>
                <div className="pt-2 border-t border-outline-variant/20 flex justify-between font-bold text-charcoal text-sm">
                  <span>Total Estimated Reach</span>
                  <span className="font-mono text-forest-green">~5,100</span>
                </div>
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
                  <th className="p-4">Sent Date</th>
                  <th className="p-4">Audience</th>
                  <th className="p-4">Open Rate</th>
                  <th className="p-4">Tap Rate</th>
                  <th className="p-4 text-right pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {RECENT_PUSH_CAMPAIGNS.map(p => (
                  <tr key={p.name} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 pl-6 font-bold text-charcoal">{p.name}</td>
                    <td className="p-4 text-on-surface-variant font-mono">{p.sentDate}</td>
                    <td className="p-4 text-on-surface-variant">{p.audience}</td>
                    <td className="p-4 font-mono font-semibold text-charcoal">{p.openRate}</td>
                    <td className="p-4 font-mono font-semibold text-charcoal">{p.tapRate}</td>
                    <td className="p-4 text-right pr-6">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${p.statusClass}`}>
                        {p.status}
                      </span>
                    </td>
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

export default PushNotificationCampaigns;
