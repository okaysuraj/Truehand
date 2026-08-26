import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SAMPLE_REPORTS = [
  {
    id: 'RPT-8992',
    title: 'Counterfeit Material Claim',
    priority: 'HIGH PRIORITY',
    priorityClass: 'bg-red-50 text-red-600',
    timeAgo: '10m ago',
    type: 'Product Content',
    flagsCount: 3,
    description: "Multiple users reported that the 'Hand-thrown Ceramic Vase' appears to be a mass-produced resin item, contradicting the listing.",
    product: {
      title: "Minimalist 'Ceramic' Vase",
      seller: '@ModernCrafts',
      price: '$145.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
      materialsClaim: '"100% hand-thrown organic clay, kiln-fired with custom matte glaze."',
    },
    reporters: [
      { handle: '@JDesign', role: 'Buyer Score: High', initials: 'JD' },
      { handle: '@MikaelaK', role: 'Artisan Score: Trusted', initials: 'MK' },
      { handle: '@ArtLover99', role: 'New User', initials: 'AL' },
    ],
  },
  {
    id: 'RPT-8991',
    title: 'Inappropriate Messaging',
    priority: 'MED PRIORITY',
    priorityClass: 'bg-amber-50 text-amber-700',
    timeAgo: '1h ago',
    type: 'User Behavior',
    flagsCount: 1,
    description: 'Automated system flagged a conversation between Buyer @ArtLover and Seller @WoodCrafts for potential off-platform payment solicitations.',
  },
  {
    id: 'RPT-8985',
    title: 'Tracking Number Invalid',
    priority: 'LOW PRIORITY',
    priorityClass: 'bg-surface-container text-on-surface-variant',
    timeAgo: '3h ago',
    type: 'Shipping',
    flagsCount: 1,
    description: 'Buyer reports the provided DHL tracking number for order #ORD-4421 returns no results after 48 hours.',
  },
];

const ReportsFlagsQueue = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(SAMPLE_REPORTS[0]);
  const [filterTab, setFilterTab] = useState('All Reports');
  const [actionChoice, setActionChoice] = useState('Require Seller Proof of Material');

  const handleApplyResolution = () => {
    alert(`Resolution applied: "${actionChoice}" for report #${selectedReport.id}`);
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisan Panel</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Quiet Luxury Management</p>
          </div>

          <Link to="/new-listing" className="w-full bg-forest-green text-white py-2.5 px-4 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow">
            <span className="material-symbols-outlined text-sm">add</span>
            Add New Product
          </Link>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">group</span>
              Users
            </Link>
            <Link to="/admin/product-approvals" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/admin/finances" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Finances
            </Link>
            <Link to="/admin/moderation" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">security</span>
              Safety
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Split Interface */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Column: Reports List */}
        <div className="w-full md:w-96 border-r border-outline-variant/30 bg-white p-6 flex flex-col justify-between shrink-0 space-y-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-display-lg text-xl font-bold text-charcoal">Reports Queue</h2>
                <p className="text-[11px] text-on-surface-variant">32 Active Issues &bull; <strong className="text-red-600">5 Critical</strong></p>
              </div>
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">tune</span>
                Filter
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 text-[11px] font-semibold">
              {['All Reports', 'Product Content', 'User Behavior', 'Shipping'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterTab(t)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                    filterTab === t ? 'bg-charcoal text-white font-bold' : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Reports Items */}
            <div className="space-y-3">
              {SAMPLE_REPORTS.map(rep => (
                <div 
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 text-xs ${
                    selectedReport?.id === rep.id 
                      ? 'border-forest-green bg-emerald-50/20 shadow-sm' 
                      : 'border-outline-variant/30 hover:border-forest-green/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${rep.priorityClass}`}>
                      {rep.priority}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-mono">{rep.timeAgo}</span>
                  </div>

                  <h4 className="font-headline-md text-xs font-bold text-charcoal">{rep.title}</h4>
                  <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">{rep.description}</p>

                  <div className="flex items-center gap-3 text-[10px] text-on-surface-variant pt-1">
                    <span>&bull; {rep.type}</span>
                    <span>&bull; {rep.flagsCount} Flags</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Report Detail Pane */}
        {selectedReport && selectedReport.product ? (
          <div className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
            
            {/* Header with Quick Actions */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded text-[10px] uppercase font-bold tracking-wider bg-red-50 text-red-600">
                  {selectedReport.priority}
                </span>
                <span className="text-xs text-on-surface-variant font-mono">Report #{selectedReport.id}</span>
                <span className="text-xs text-on-surface-variant">&bull; Opened Oct 24, 2023 at 14:32</span>
              </div>

              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => alert('Message seller modal opened')}
                  className="px-4 py-2 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Message Seller
                </button>
                <button 
                  onClick={() => alert('Listing suspended.')}
                  className="px-5 py-2 bg-red-700 text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:bg-red-800 transition-all shadow"
                >
                  Suspend Listing
                </button>
              </div>
            </div>

            <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal">
              {selectedReport.title}
            </h2>

            {/* 2-Column Details: Subjected Product & Reporting Users */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-xs">
              
              {/* Subjected Product Card */}
              <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                    Subjected Product
                  </span>
                  <Link to="/product/1" className="text-forest-green font-bold text-[11px] hover:underline">
                    View Live Listing
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                    <img src={selectedReport.product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-headline-md text-base font-bold text-charcoal">{selectedReport.product.title}</h4>
                    <p className="text-[11px] text-on-surface-variant">Listed by <strong className="text-charcoal">{selectedReport.product.seller}</strong> &bull; {selectedReport.product.price}</p>
                  </div>
                </div>

                <div className="bg-[#fef8f4] p-4 rounded-xl border-l-4 border-terracotta text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider block">Claimed Materials (Listing)</span>
                  <p className="font-body-md text-xs text-charcoal italic leading-relaxed">
                    {selectedReport.product.materialsClaim}
                  </p>
                </div>
              </div>

              {/* Reporting Users Card */}
              <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
                <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  Reporting Users ({selectedReport.reporters.length})
                </span>

                <div className="space-y-3">
                  {selectedReport.reporters.map(rep => (
                    <div key={rep.handle} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center font-bold text-[10px] text-charcoal">
                          {rep.initials}
                        </div>
                        <div>
                          <h5 className="font-bold text-charcoal leading-none">{rep.handle}</h5>
                          <p className="text-[10px] text-on-surface-variant mt-0.5">{rep.role}</p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-red-600 text-sm">flag</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Floating Action Bar */}
            <div className="bg-white p-4 px-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="font-bold text-charcoal shrink-0">Resolution Action:</span>
                <select 
                  value={actionChoice}
                  onChange={(e) => setActionChoice(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5 text-xs font-semibold text-charcoal focus:outline-none w-full sm:w-72"
                >
                  <option>Require Seller Proof of Material</option>
                  <option>Issue Formal Warning</option>
                  <option>Remove Listing & Refund Buyers</option>
                  <option>Dismiss as Unfounded</option>
                </select>
              </div>

              <button 
                onClick={handleApplyResolution}
                className="px-8 py-3 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow shrink-0 w-full sm:w-auto"
              >
                Apply Resolution &amp; Close
              </button>
            </div>

          </div>
        ) : (
          <div className="flex-1 p-10 flex items-center justify-center text-on-surface-variant text-sm">
            Select a report from the queue to review.
          </div>
        )}

      </main>

    </div>
  );
};

export default ReportsFlagsQueue;
