import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserProfileDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState('Profile Info');

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
            <Link to="/admin/customers" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
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
            <Link to="/admin/banners" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">view_carousel</span>
              Content
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        <button 
          onClick={() => navigate('/store/elias-thorne')}
          className="w-full py-3 border border-outline-variant text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Storefront</span>
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8 text-xs">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold">
          <Link to="/admin/customers" className="hover:text-charcoal">Users</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-charcoal font-bold">Elias Thorne</span>
        </div>

        {/* User Hero Banner Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30 shadow-sm">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" 
                alt="Elias Thorne" 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal">Elias Thorne</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-forest-green">
                  Verified Artisan
                </span>
              </div>

              <p className="text-on-surface-variant text-xs">
                Member since Oct 2021 &bull; London, UK
              </p>

              <div className="flex items-center gap-4 text-[11px] text-on-surface-variant font-semibold pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-forest-green">storefront</span>
                  Active Store
                </span>
                <span className="flex items-center gap-1 text-charcoal">
                  <span className="material-symbols-outlined text-sm text-amber-500">star</span>
                  4.9 (128 Reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert('Editing user profile')}
              className="px-5 py-2.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-surface-container transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit
            </button>
            <button 
              onClick={() => alert('Messaging user')}
              className="px-5 py-2.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
              Message
            </button>
            <button 
              onClick={() => alert('Restricting or suspending account')}
              className="w-10 h-10 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-base">block</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-outline-variant/20 text-xs font-semibold overflow-x-auto">
          {[
            'Profile Info',
            'Storefront Performance',
            'Transaction History',
            'KYC Documents',
            'Support Tickets',
            'Security & Logs',
          ].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 transition-all whitespace-nowrap ${
                tab === t ? 'text-charcoal font-bold border-b-2 border-charcoal' : 'text-on-surface-variant hover:text-charcoal'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 2-Column Details: Contact Details & Account Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Contact Details Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
            <h3 className="font-display-md text-base font-bold text-charcoal pb-2 border-b border-outline-variant/20">
              Contact Details
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">EMAIL ADDRESS</span>
                <p className="font-semibold text-charcoal mt-0.5">elias.thorne@example.com</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">PHONE NUMBER</span>
                <p className="font-semibold text-charcoal font-mono mt-0.5">+44 7700 900077</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">REGISTERED ADDRESS</span>
                <p className="text-on-surface-variant mt-0.5 leading-relaxed font-body-md">
                  14 Willow Creek Workshop, Brick Lane<br />
                  London, E1 6QL<br />
                  United Kingdom
                </p>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
            <h3 className="font-display-md text-base font-bold text-charcoal pb-2 border-b border-outline-variant/20">
              Account Status
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Platform Status</span>
                <span className="font-bold text-forest-green flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Active
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Payout Account</span>
                <span className="font-bold text-charcoal">Connected</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Last Login</span>
                <span className="font-semibold text-on-surface-variant font-mono">2 hours ago</span>
              </div>
            </div>
          </div>

        </div>

        {/* Storefront Biography Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
            <h3 className="font-display-md text-base font-bold text-charcoal">Storefront Biography</h3>
            <button onClick={() => alert('Edit Bio modal')} className="text-forest-green font-bold hover:underline">
              Edit Bio
            </button>
          </div>

          <p className="text-on-surface-variant font-body-md text-xs leading-relaxed">
            Specializing in hand-carved, ethically sourced hardwood homewares. Every piece is crafted using traditional joinery techniques learned over two decades in the trade. My philosophy centers on letting the natural grain and texture of the wood dictate the final form, resulting in functional art that brings warmth and quiet luxury to modern living spaces.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {['Woodworking', 'Sustainable Materials', 'Bespoke Furniture'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold text-charcoal">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
};

export default UserProfileDetail;
