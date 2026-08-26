import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12 space-y-10 text-xs">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-charcoal">
            Preferences &amp; Settings
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
            Tailor your curated experience to reflect your personal style and values.
          </p>
        </div>

        {/* 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Profile Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOai5w5doVJG7jbU3S2KjMr-lBrGQpzN4Ax05R4eK0suYlGCaB3JUUkqQEp6Jo9UZewI8iYG_17Ca43RvmQK0eiiWjLKvxfuzaXtKKsJ5M3M8IASzHHgS48pV3CoAIBnMPZ_ebslKrObmJUUOtVfi-O4wlmQgNK4xH6jTGWC0RxbpfFYmz8r_moNtxOmrfig-lmotvCT4sUHfAiWZB76EzdTozSUiXjl2urusX0QN-XoQYO7CNfE5DA" alt="Elena Rossi" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display-md text-base font-bold text-charcoal">Elena Rossi</h3>
                  <p className="text-[10px] text-on-surface-variant">Collector since 2021</p>
                </div>
              </div>

              <nav className="space-y-1 font-semibold pt-2 border-t border-outline-variant/10">
                <a href="#general" className="w-full text-left px-3.5 py-2 rounded-xl bg-surface-container text-forest-green font-bold flex justify-between items-center">
                  <span>General</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </a>
                <a href="#security" className="w-full text-left px-3.5 py-2 rounded-xl text-on-surface-variant hover:text-charcoal flex justify-between items-center">
                  <span>Account Security</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </a>
                <a href="#support" className="w-full text-left px-3.5 py-2 rounded-xl text-on-surface-variant hover:text-charcoal flex justify-between items-center">
                  <span>Support</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Right Bento Sections */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* General Section */}
            <div id="general" className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
              <div className="space-y-0.5 pb-2 border-b border-outline-variant/20">
                <h3 className="font-display-md text-base font-bold text-charcoal">General</h3>
                <p className="text-[11px] text-on-surface-variant">Configure your viewing and notification preferences.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">notifications</span>
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Email Notifications</h5>
                      <p className="text-[10px] text-on-surface-variant">Updates on new artisan drops and story releases.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setEmailNotifs(!emailNotifs)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${emailNotifs ? 'bg-forest-green' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${emailNotifs ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                <div 
                  onClick={() => navigate('/choose-language')}
                  className="flex justify-between items-center pt-3 border-t border-outline-variant/10 cursor-pointer hover:bg-surface-container-low/40 p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">public</span>
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Language &amp; Region</h5>
                      <p className="text-[10px] text-on-surface-variant">English (United Kingdom)</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">chevron_right</span>
                </div>

                <div 
                  onClick={() => alert('Appearance theme switcher modal')}
                  className="flex justify-between items-center pt-3 border-t border-outline-variant/10 cursor-pointer hover:bg-surface-container-low/40 p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">palette</span>
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Appearance</h5>
                      <p className="text-[10px] text-on-surface-variant">Light (Linen Theme)</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">chevron_right</span>
                </div>
              </div>
            </div>

            {/* Account Security Section */}
            <div id="security" className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
              <div className="space-y-0.5 pb-2 border-b border-outline-variant/20">
                <h3 className="font-display-md text-base font-bold text-charcoal">Account Security</h3>
                <p className="text-[11px] text-on-surface-variant">Manage your identity and privacy across the platform.</p>
              </div>

              <div className="space-y-4">
                <div 
                  onClick={() => alert('Change password modal')}
                  className="flex justify-between items-center cursor-pointer hover:bg-surface-container-low/40 p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">lock</span>
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Password</h5>
                      <p className="text-[10px] text-on-surface-variant">Last changed 4 months ago.</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">chevron_right</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-outline-variant/10">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">security</span>
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Two-Factor Authentication</h5>
                      <p className="text-[10px] text-on-surface-variant">Highly recommended for security.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${twoFactor ? 'bg-forest-green' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${twoFactor ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div id="support" className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
              <div className="space-y-0.5 pb-2 border-b border-outline-variant/20">
                <h3 className="font-display-md text-base font-bold text-charcoal">Support</h3>
                <p className="text-[11px] text-on-surface-variant">Need assistance with an order or the marketplace?</p>
              </div>

              <div className="space-y-3">
                <Link 
                  to="/help"
                  className="flex justify-between items-center p-2 rounded-xl hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">help</span>
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Help Centre</h5>
                      <p className="text-[10px] text-on-surface-variant">Browse our frequently asked questions.</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">open_in_new</span>
                </Link>

                <Link 
                  to="/report-issue"
                  className="flex justify-between items-center pt-3 border-t border-outline-variant/10 p-2 rounded-xl hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">mail</span>
                    <div>
                      <h5 className="font-bold text-charcoal text-xs">Contact Concierge</h5>
                      <p className="text-[10px] text-on-surface-variant">Personal assistance for special requests.</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">chevron_right</span>
                </Link>
              </div>
            </div>

            {/* Deactivate Account Card */}
            <div className="p-6 md:p-8 rounded-3xl border border-red-200 bg-red-50/30 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h5 className="font-bold text-red-900 text-xs">Deactivate Account</h5>
                <p className="text-[10px] text-red-800/80 mt-0.5">This will permanently remove your curated lists and purchase history.</p>
              </div>

              <button 
                onClick={() => alert('Account deactivation requested')}
                className="px-5 py-2.5 border border-red-300 text-red-700 rounded-xl font-semibold text-xs hover:bg-red-100 transition-colors shrink-0"
              >
                Delete Account
              </button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Settings;
