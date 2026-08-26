import React from 'react';
import { Link } from 'react-router-dom';

const AgentProfile = () => {
  return (
    <div className="flex min-h-screen bg-[#faf8f5] font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-1">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-display-md text-sm font-bold text-charcoal">Julian V.</h2>
              <p className="text-[10px] text-forest-green font-semibold">Verified Premium Agent</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/delivery/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Dashboard
            </Link>
            <Link to="/delivery/onboarding" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">description</span>
              My Documents
            </Link>
            <Link to="/delivery/availability" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Shift Schedule
            </Link>
            <Link to="/delivery/profile" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              Settings
            </Link>
          </nav>
        </div>

        {/* Active Status Badge */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-forest-green">
          <span className="w-2.5 h-2.5 rounded-full bg-forest-green animate-pulse" />
          <span>Active Status: On Duty</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-10">
        
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden h-80 bg-surface-container">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj7IISN_7_oHxrRMUyMUiLa0g-qyTMzVaezbLlTmzVom90-X4IuHa2YQEzW8BCySHkzrFgttfdXpQ1MALR4pWvivmsW5X3XbudnO8NdtWqOx77sswNbf6w86WW37rfU6FVFdUe8BO7DNrR84ogZobRgKV6_koHV-kIXcA7uM9OHBo6GFiCTFBeyWoCM33qPHCx_NzzY53RIXwJ0pMG9fu07JWVPRNz5gKYjq_sxjTyExB267wER1wmA" 
              alt="Julian Valerius" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-lg space-y-0.5">
              <span className="font-mono text-[9px] text-terracotta font-bold">AGENT ID: #AZ-9912</span>
              <h3 className="font-display-lg text-lg font-bold text-charcoal">Julian Valerius</h3>
              <span className="px-2 py-0.5 rounded text-[8px] uppercase font-bold bg-surface-container text-forest-green flex items-center gap-1 w-max">
                <span className="material-symbols-outlined text-[10px]">verified</span>
                PREMIUM COURIER
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal italic leading-snug">
                Efficiency. Care. Trust.
              </h1>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
                Committed to the safe transport of artisanal goods, ensuring every package arrives with the same care it was crafted with.
              </p>
            </div>

            <div className="flex items-center gap-8 pt-2">
              <div>
                <span className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal">4.9</span>
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block mt-0.5">RATING</span>
              </div>
              <div className="w-[1px] h-8 bg-outline-variant/30" />
              <div>
                <span className="font-display-lg text-2xl md:text-3xl font-bold text-charcoal">1.2k</span>
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block mt-0.5">DELIVERIES</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Active Vehicle & Quick Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Vehicle Card */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <div>
                <h3 className="font-display-md text-base font-bold text-charcoal">Active Vehicle</h3>
                <p className="text-[11px] text-on-surface-variant">Primary fulfillment asset</p>
              </div>
              <button className="text-on-surface-variant hover:text-charcoal"><span className="material-symbols-outlined text-lg">edit</span></button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-6 h-44 rounded-2xl overflow-hidden bg-surface-container">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" 
                  alt="Vehicle" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="sm:col-span-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">MODEL</span>
                    <strong className="text-charcoal font-bold text-xs">Artisan EV-7</strong>
                  </div>
                  <div>
                    <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">LICENSE</span>
                    <strong className="text-charcoal font-bold text-xs font-mono">ART-2024</strong>
                  </div>
                  <div>
                    <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">CAPACITY</span>
                    <strong className="text-charcoal font-bold text-xs">450 kg</strong>
                  </div>
                  <div>
                    <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">BATTERY</span>
                    <strong className="text-forest-green font-bold text-xs">88% (Optimal)</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-forest-green inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    Inspection Valid
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Settings Links */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <Link to="/delivery/onboarding" className="p-4 rounded-2xl bg-white border border-outline-variant/30 flex items-center justify-between hover:bg-surface-container transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-charcoal text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">description</span>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal">Documents</h4>
                  <p className="text-[10px] text-on-surface-variant">4 Required Files</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-base text-on-surface-variant">chevron_right</span>
            </Link>

            <Link to="/delivery/availability-settings" className="p-4 rounded-2xl bg-white border border-outline-variant/30 flex items-center justify-between hover:bg-surface-container transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-green text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">settings</span>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal">Vehicle Settings</h4>
                  <p className="text-[10px] text-on-surface-variant">System calibration</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-base text-on-surface-variant">chevron_right</span>
            </Link>

            <button onClick={() => alert('Emergency contacts list')} className="w-full p-4 rounded-2xl bg-white border border-outline-variant/30 flex items-center justify-between hover:bg-surface-container transition-colors shadow-sm text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-terracotta text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">contacts</span>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal">Emergency Contacts</h4>
                  <p className="text-[10px] text-on-surface-variant">2 contacts set</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-base text-on-surface-variant">chevron_right</span>
            </button>
          </div>

        </div>

        {/* Recent History 4 Bento Cards */}
        <div className="space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <h3 className="font-display-md text-base font-bold text-charcoal">Recent History</h3>
            <Link to="/delivery/history" className="text-forest-green font-bold hover:underline">View Fulfillment History</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-1">
              <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">ON-TIME RATE</span>
              <h4 className="font-display-lg text-2xl font-bold text-charcoal">98.4%</h4>
              <p className="text-[10px] text-forest-green font-semibold">+2.1% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-1">
              <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">AVG HAND-OFF</span>
              <h4 className="font-display-lg text-2xl font-bold text-charcoal">4.2m</h4>
              <p className="text-[10px] text-on-surface-variant">Consistent performance</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-1">
              <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">ARTISAN TIPS</span>
              <h4 className="font-display-lg text-2xl font-bold text-charcoal">$842</h4>
              <p className="text-[10px] text-terracotta font-semibold">Top 5% of couriers</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-1">
              <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">DISTANCE</span>
              <h4 className="font-display-lg text-2xl font-bold text-charcoal">14k</h4>
              <p className="text-[10px] text-on-surface-variant">Kilometers this year</p>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};

export default AgentProfile;
