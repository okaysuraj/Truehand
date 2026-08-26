import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [objective, setObjective] = useState('brand');
  const [budget, setBudget] = useState(45);
  const [duration, setDuration] = useState('7 Days');

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Top Header */}
      <header className="max-w-5xl w-full mx-auto px-6 md:px-12 pt-6 flex justify-between items-center">
        <div className="font-display-md text-lg font-bold text-charcoal">ArtisanStudio</div>
        <button 
          onClick={() => navigate('/admin/campaigns/email')}
          className="text-xs font-semibold text-on-surface-variant hover:text-charcoal flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">close</span>
          Cancel
        </button>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-12 space-y-10 text-xs">
        
        {/* Stepper Header */}
        <div className="flex justify-between items-center text-center border-b border-outline-variant/20 pb-4">
          <div className="flex-1 space-y-1">
            <span className="font-label-sm text-[9px] uppercase font-bold text-forest-green tracking-wider block">STEP 01</span>
            <span className="font-bold text-charcoal text-xs">Setup</span>
            <div className="w-full bg-forest-green h-0.5 mt-2 rounded-full" />
          </div>

          <div className="flex-1 space-y-1 opacity-40">
            <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">STEP 02</span>
            <span className="font-semibold text-charcoal text-xs">Creative</span>
            <div className="w-full bg-outline-variant h-0.5 mt-2 rounded-full" />
          </div>

          <div className="flex-1 space-y-1 opacity-40">
            <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">STEP 03</span>
            <span className="font-semibold text-charcoal text-xs">Review</span>
            <div className="w-full bg-outline-variant h-0.5 mt-2 rounded-full" />
          </div>
        </div>

        {/* Section 1: Campaign Objective */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="font-display-lg text-2xl font-bold text-charcoal">
              Campaign Objective
            </h2>
            <p className="text-on-surface-variant text-[11px]">
              Choose the primary goal for this advertisement. We'll optimize your delivery based on this selection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              onClick={() => setObjective('brand')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer space-y-3 ${
                objective === 'brand' ? 'border-charcoal bg-white shadow-md' : 'border-outline-variant/30 bg-white/60 hover:border-outline-variant'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-charcoal">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  objective === 'brand' ? 'border-charcoal bg-charcoal text-white' : 'border-outline-variant'
                }`}>
                  {objective === 'brand' && <span className="material-symbols-outlined text-xs">check</span>}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-charcoal text-sm">Brand Awareness</h4>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-1">
                  Reach new audiences interested in artisanal craftsmanship and high-quality studio goods.
                </p>
              </div>
            </div>

            <div 
              onClick={() => setObjective('sales')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer space-y-3 ${
                objective === 'sales' ? 'border-charcoal bg-white shadow-md' : 'border-outline-variant/30 bg-white/60 hover:border-outline-variant'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-charcoal">
                  <span className="material-symbols-outlined text-lg">shopping_bag</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  objective === 'sales' ? 'border-charcoal bg-charcoal text-white' : 'border-outline-variant'
                }`}>
                  {objective === 'sales' && <span className="material-symbols-outlined text-xs">check</span>}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-charcoal text-sm">Drive Sales</h4>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-1">
                  Prioritize clicks and conversions. Best for promoting specific shop listings or new collections.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Daily Budget */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="font-display-lg text-2xl font-bold text-charcoal">
                Daily Budget
              </h2>
              <p className="text-on-surface-variant text-[11px]">
                Adjust how much you want to spend each day.
              </p>
            </div>
            <div className="text-right">
              <span className="font-display-lg text-3xl font-bold text-charcoal">${budget}</span>
              <span className="text-[10px] text-on-surface-variant font-mono"> USD/day</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
            <input 
              type="range"
              min="10"
              max="200"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-forest-green cursor-pointer"
            />

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline-variant/10 text-center sm:text-left">
              <div>
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  ESTIMATED DAILY REACH
                </span>
                <h5 className="font-bold text-charcoal text-sm mt-0.5">
                  {(budget * 28).toLocaleString()} - {(budget * 75).toLocaleString()} people
                </h5>
              </div>

              <div>
                <span className="font-label-sm text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block">
                  ESTIMATED CONVERSIONS
                </span>
                <h5 className="font-bold text-charcoal text-sm mt-0.5">
                  {Math.round(budget * 0.3)} - {Math.round(budget * 0.6)} sales
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Duration */}
        <div className="space-y-4">
          <h2 className="font-display-lg text-2xl font-bold text-charcoal">
            Duration
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['7 Days', '14 Days', '30 Days', 'Custom'].map(d => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`py-3 rounded-2xl font-bold text-xs transition-all ${
                  duration === d 
                    ? 'bg-charcoal text-white shadow-sm' 
                    : 'bg-white border border-outline-variant/30 text-charcoal hover:bg-surface-container'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-outline-variant/20">
          <p className="text-[11px] text-on-surface-variant italic">
            Next: Upload high-resolution images &amp; copy.
          </p>

          <button 
            onClick={() => alert('Proceeding to Step 02 Creative...')}
            className="w-full sm:w-auto px-8 py-3.5 bg-forest-green text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow flex items-center justify-center gap-2"
          >
            <span>Continue to Creative</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </main>

    </div>
  );
};

export default CreateCampaign;
