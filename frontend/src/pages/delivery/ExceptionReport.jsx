import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const REASONS = [
  {
    id: 'absent',
    title: 'Recipient Absent',
    desc: 'No one available to accept delivery.',
  },
  {
    id: 'address',
    title: 'Incorrect Address',
    desc: 'Unable to locate the specified address.',
  },
  {
    id: 'restricted',
    title: 'Access Restricted',
    desc: 'Locked gate, no entry code, or pet hazard.',
  },
  {
    id: 'refused',
    title: 'Refused Delivery',
    desc: 'Recipient declined the package at door.',
  },
];

const ExceptionReport = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState('absent');
  const [observations, setObservations] = useState('');

  const handleReschedule = () => {
    alert('Delivery attempt rescheduled. Customer notified.');
    navigate('/delivery/assigned');
  };

  const handleReturnHub = () => {
    alert('Package marked for return to logistics hub.');
    navigate('/delivery/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-surface-linen font-body-md text-on-surface pt-20">
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-outline-variant/30 hidden lg:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="px-1">
            <h1 className="font-display-md text-base font-bold text-charcoal">Logistics Hub</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold mt-0.5">Premium Fulfillment</p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link to="/delivery/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Overview
            </Link>
            <Link to="/delivery/assigned" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface-container text-forest-green font-bold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Active Deliveries
            </Link>
            <Link to="/delivery/history" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">history</span>
              History
            </Link>
            <Link to="/delivery/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">help</span>
              Support
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl space-y-8">
        
        {/* Breadcrumb & Header */}
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-label-sm">
            <Link to="/delivery/assigned" className="hover:text-forest-green">Active Deliveries</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="font-semibold text-charcoal">Delivery Exception</span>
          </nav>
          <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-charcoal">
            Delivery Exception Report
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xl">
            Please document the circumstances regarding the unsuccessful delivery attempt for Order #THL-8829-01. Ensure all details are accurate for the carrier log.
          </p>
        </div>

        {/* 2-Column Section: Reasons/Notes & Photo/Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Reason for Failure & Observations */}
          <div className="lg:col-span-7 space-y-6 text-xs">
            
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-charcoal font-bold pb-2 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-terracotta text-lg">warning</span>
                <span className="font-label-sm uppercase tracking-wider text-[11px]">Select Reason for Failure</span>
              </div>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {REASONS.map(r => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedReason(r.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-1 ${
                      selectedReason === r.id 
                        ? 'border-forest-green bg-emerald-50/20 shadow-sm' 
                        : 'border-outline-variant/30 hover:border-forest-green/40'
                    }`}
                  >
                    <h5 className="font-bold text-charcoal text-xs">{r.title}</h5>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>

              {/* Additional Observations */}
              <div className="space-y-1.5 pt-2">
                <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
                  Additional Observations
                </label>
                <textarea 
                  rows={4}
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Provide specific details about the attempt..."
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs focus:outline-none focus:border-forest-green leading-relaxed"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleReschedule}
                className="flex-1 py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:opacity-90 transition-all shadow"
              >
                Reschedule Delivery Attempt
              </button>
              <button 
                onClick={handleReturnHub}
                className="px-6 py-3.5 border border-charcoal text-charcoal rounded-xl font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors"
              >
                Return to Hub
              </button>
            </div>

          </div>

          {/* Right: Proof of Attempt Photo & Delivery Context */}
          <div className="lg:col-span-5 space-y-6 text-xs">
            
            {/* Proof of Attempt Photo */}
            <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden">
              <div className="h-64 bg-surface-container relative">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ" 
                  alt="Proof" 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur rounded-full text-white text-[10px] font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">photo_camera</span>
                  Proof of Attempt
                </span>
              </div>

              <div className="p-4 px-6 flex justify-between items-center bg-white">
                <div>
                  <h5 className="font-bold text-charcoal">Location Verified</h5>
                  <p className="text-[10px] text-forest-green font-semibold">GPS Match: 100% Precision</p>
                </div>
                <button onClick={() => alert('Retake camera photo')} className="text-forest-green font-bold text-xs hover:underline">
                  Retake Photo
                </button>
              </div>
            </div>

            {/* Delivery Context Card */}
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
              <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block pb-1 border-b border-outline-variant/20">
                Delivery Context
              </span>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Customer</span>
                  <span className="font-bold text-charcoal">Julian Vane-Tempest</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Address</span>
                  <span className="font-semibold text-charcoal text-right">88 Heritage Lane, Apt 4C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Contents</span>
                  <span className="font-bold text-terracotta italic text-right">Hand-thrown Ceramic Vase (Fragile)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default ExceptionReport;
