import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RESTRICTED_ACCOUNTS = [
  {
    id: 1,
    name: 'Elias Thorne',
    handle: '@ethorne_art',
    status: 'SUSPENDED',
    badgeClass: 'bg-red-50 text-red-600',
    duration: '28 Days Left',
    reason: 'Repeated violation of authentic materials policy. Listed mass-produced resin items as hand-carved wood.',
    notes: 'Third warning. Issued 30-day suspension pending review of inventory.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA',
  },
  {
    id: 2,
    name: "Miriam's Loom",
    handle: '@loom_miriam',
    status: 'SHADOWBANNED',
    badgeClass: 'bg-surface-container text-on-surface-variant',
    duration: 'Indefinite',
    reason: 'Aggressive spam messaging to potential buyers regarding off-platform sales.',
    notes: 'Automated flag. Awaiting manual review by community team.',
    initials: 'M',
  },
  {
    id: 3,
    name: 'Rustic Finds Ltd.',
    handle: '@rusticfinds',
    status: 'BANNED',
    badgeClass: 'bg-red-100 text-red-800',
    duration: 'Permanent',
    reason: 'Confirmed dropshipping operation. Zero artisanal involvement.',
    notes: 'Account terminated. Appealed denied on 10/24.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA',
  },
];

const ModerationRestrictions = () => {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState(['wholesale', 'dropship', 'factory direct', 'mass produced']);
  const [newKeyword, setNewKeyword] = useState('');
  const [announcementActive, setAnnouncementActive] = useState(true);

  const removeKeyword = (kw) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const addKeyword = (e) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    setKeywords([...keywords, newKeyword.trim()]);
    setNewKeyword('');
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Artisanal Admin</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Marketplace Manager</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">group</span>
              Users
            </Link>
            <Link to="/admin/moderation" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">security</span>
              Moderation
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Orders
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl">
        
        {/* Header & CTAs */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal mb-1">
              Safety &amp; Moderation Hub
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl">
              Manage platform integrity, restricted users, and global communications.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => alert('Exporting moderation audit log...')}
              className="px-5 py-2.5 border border-charcoal text-charcoal rounded-lg font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Export Log
            </button>
            <button 
              onClick={() => alert('New restriction modal opened')}
              className="px-6 py-2.5 bg-[#97472a] text-white rounded-lg font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-base">block</span>
              New Restriction
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Restricted Accounts */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-600 text-lg">block</span>
                <h3 className="font-display-md text-base font-bold text-charcoal">Restricted Accounts</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-charcoal">
                42 Active
              </span>
            </div>

            <div className="space-y-4">
              {RESTRICTED_ACCOUNTS.map(acc => (
                <div key={acc.id} className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {acc.image ? (
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                          <img src={acc.image} alt={acc.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center font-bold text-sm text-charcoal shrink-0">
                          {acc.initials}
                        </div>
                      )}
                      <div>
                        <h4 className="font-headline-md text-sm font-bold text-charcoal">{acc.name}</h4>
                        <span className="text-[11px] text-on-surface-variant font-mono">{acc.handle}</span>
                        <div className="mt-1">
                          <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${acc.badgeClass}`}>
                            {acc.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] text-red-600 font-semibold">{acc.duration}</span>
                  </div>

                  <div className="space-y-1 bg-surface-container-low/60 p-3.5 rounded-xl border border-outline-variant/20">
                    <p className="text-[11px] text-charcoal leading-relaxed">
                      <strong>Reason:</strong> {acc.reason}
                    </p>
                    <p className="text-[10px] text-on-surface-variant leading-relaxed">
                      <strong>Admin Notes:</strong> {acc.notes}
                    </p>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button 
                      onClick={() => alert(`Managing restrictions for ${acc.name}`)}
                      className="text-forest-green font-bold text-xs hover:underline"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Restricted Keywords & Global Announcement */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Restricted Keywords */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 text-charcoal font-bold">
                <span className="material-symbols-outlined text-base">match_word</span>
                <h3 className="font-headline-md text-sm font-bold">Restricted Keywords</h3>
              </div>

              <p className="text-on-surface-variant leading-relaxed">
                Terms flagged for automated review in product listings to ensure authenticity.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {keywords.map(kw => (
                  <span key={kw} className="px-3 py-1.5 bg-surface-container rounded-lg font-semibold text-charcoal flex items-center gap-2">
                    <span>"{kw}"</span>
                    <button onClick={() => removeKeyword(kw)} className="text-on-surface-variant hover:text-charcoal">&times;</button>
                  </span>
                ))}
              </div>

              <form onSubmit={addKeyword} className="flex gap-2 pt-2">
                <input 
                  type="text" 
                  value={newKeyword} 
                  onChange={(e) => setNewKeyword(e.target.value)} 
                  placeholder="Add restricted term..."
                  className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-forest-green" 
                />
                <button type="submit" className="px-4 py-2 bg-charcoal text-white rounded-lg font-bold text-xs uppercase tracking-wider">
                  + Add
                </button>
              </form>
            </div>

            {/* Global Announcement */}
            <div className="bg-[#fff7f2] p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-terracotta font-bold">
                  <span className="material-symbols-outlined text-lg">campaign</span>
                  <h3 className="font-headline-md text-sm font-bold">Global Announcement</h3>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={announcementActive} 
                    onChange={(e) => setAnnouncementActive(e.target.checked)} 
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#97472a]"></div>
                </label>
              </div>

              <p className="text-on-surface-variant leading-relaxed">
                Active broadcast displayed across all user dashboards.
              </p>

              <div className="bg-white p-4 rounded-xl border border-outline-variant/30 space-y-3">
                <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  Message Banner
                </span>
                <p className="text-xs text-charcoal font-semibold leading-relaxed">
                  Scheduled Maintenance: The platform will be undergoing artisan verification updates on Saturday 2:00 AM UTC.
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-outline-variant/20">
                  <span className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">warning</span>
                    Priority Alert
                  </span>
                  <button onClick={() => alert('Announcement updated')} className="text-forest-green font-bold text-[11px] hover:underline">
                    Update
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default ModerationRestrictions;
