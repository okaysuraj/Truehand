import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (user?.id) {
      api.get(`/addresses/user/${user.id}`)
        .then(res => setAddresses(res.data || []))
        .catch(e => console.warn(e));
    }
  }, [user]);

  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Julian Vanhoutte' : 'Julian Vanhoutte';

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Profile Hero Section */}
      <section className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
        <div className="relative mb-6">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30">
            <img 
              className="w-full h-full object-cover" 
              alt={userName} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU3O6ywVK7jEMLvKVA2kxssgwGL1XlWsOAd84tu2XqZg4CgzMYwltj5tWAQ2Ql8IT5-5vy-eHa4sLDQptw0SRhg91q6t80nQZblBDtMIfRgO6xDTt-aalUaPfafhqNy6M2zGihlYjIFhars6KFVaVaaXuwbb1XPoHyo2Tean4Jy8_9ET7nngtylq-67tC3Lz5ezyZgAqsdw6ASwH_K2vf_bCNtZUQmDTguRdIoB-r5OyDzVc98AqtFxQ" 
            />
          </div>
          <Link 
            to="/edit-profile" 
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white shadow-md border border-outline-variant/40 flex items-center justify-center text-charcoal hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </Link>
        </div>

        <h1 className="font-display-lg text-3xl md:text-5xl text-charcoal font-bold mb-1">
          {userName}
        </h1>
        <span className="font-label-sm text-xs uppercase tracking-widest text-terracotta font-bold mb-4">
          Master Ceramist &amp; Sculptor
        </span>

        <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed mb-6">
          Dedicated to the philosophy of 'Wabi-Sabi', I create hand-thrown ceramic pieces that celebrate imperfection and the raw beauty of natural materials. My work is a dialogue between ancient techniques and contemporary minimalist forms, designed for the quiet moments of daily life.
        </p>

        <div className="flex gap-4">
          <Link 
            to="/edit-profile" 
            className="px-6 py-2.5 bg-forest-green text-white font-label-md text-xs uppercase tracking-wider rounded-lg hover:opacity-90 transition-all font-semibold shadow"
          >
            Edit Bio
          </Link>
          <Link 
            to="/artisan-profile-1" 
            className="px-6 py-2.5 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-wider rounded-lg hover:bg-surface-container transition-all font-semibold"
          >
            View Public Gallery
          </Link>
        </div>
      </section>

      {/* 6 Bento Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        
        {/* 1. Personal Info */}
        <Link 
          to="/edit-profile" 
          className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-green mb-4 group-hover:bg-forest-green group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">person</span>
            </div>
            <h3 className="font-headline-md text-base text-charcoal font-bold mb-1">Personal Info</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Update your identity, contact details, and secure your artisan credentials.
            </p>
          </div>
          <span className="font-label-md text-xs font-bold text-forest-green mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Manage Account &rarr;
          </span>
        </Link>

        {/* 2. My Orders */}
        <Link 
          to="/orders" 
          className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-green mb-4 group-hover:bg-forest-green group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">package_2</span>
            </div>
            <h3 className="font-headline-md text-base text-charcoal font-bold mb-1">My Orders</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Track shipments, view detailed history, and manage your recent acquisitions.
            </p>
          </div>
          <span className="font-label-md text-xs font-bold text-forest-green mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View History &rarr;
          </span>
        </Link>

        {/* 3. Wallet */}
        <Link 
          to="/digital-wallet" 
          className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-green mb-4 group-hover:bg-forest-green group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            </div>
            <h3 className="font-headline-md text-base text-charcoal font-bold mb-1">Wallet</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Manage payout methods, view balance, and download financial statements.
            </p>
          </div>
          <span className="font-label-md text-xs font-bold text-forest-green mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Balance &rarr;
          </span>
        </Link>

        {/* 4. Saved Collections */}
        <Link 
          to="/wishlist" 
          className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-green mb-4 group-hover:bg-forest-green group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">favorite</span>
            </div>
            <h3 className="font-headline-md text-base text-charcoal font-bold mb-1">Saved Collections</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Curated inspirations and items you've bookmarked for future craft sessions.
            </p>
          </div>
          <span className="font-label-md text-xs font-bold text-forest-green mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Explore Saves &rarr;
          </span>
        </Link>

        {/* 5. Handprint Score (Dark Forest Green Bento) */}
        <div className="bg-[#163428] text-white p-8 rounded-2xl shadow-md flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 mb-4">
              <span className="material-symbols-outlined text-xl">eco</span>
            </div>
            <h3 className="font-headline-md text-base font-bold text-white mb-1">Handprint Score</h3>
            <p className="font-body-md text-xs text-white/80 leading-relaxed">
              Your craftsmanship has saved 42kg of carbon through ethical material sourcing.
            </p>
          </div>
          <Link 
            to="/authenticity" 
            className="font-label-md text-xs font-bold text-emerald-300 mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            Sustainability Metrics &rarr;
          </Link>
        </div>

        {/* 6. Help Center */}
        <Link 
          to="/help" 
          className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-forest-green mb-4 group-hover:bg-forest-green group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">headset_mic</span>
            </div>
            <h3 className="font-headline-md text-base text-charcoal font-bold mb-1">Help Center</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Need assistance? Access our guides or start a conversation with our concierge.
            </p>
          </div>
          <span className="font-label-md text-xs font-bold text-forest-green mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Get Support &rarr;
          </span>
        </Link>

      </div>

      {/* Logout & Quick Actions */}
      <div className="text-center pt-8 border-t border-outline-variant/20 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/manage-addresses" className="text-xs text-on-surface-variant hover:text-forest-green font-semibold">
          Manage Delivery Addresses ({addresses.length})
        </Link>
        <button 
          onClick={logout}
          className="px-6 py-2.5 border border-outline-variant text-on-surface-variant hover:text-red-700 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-red-50 transition-colors"
        >
          Sign Out of Account
        </button>
      </div>

    </main>
  );
};

export default Profile;
