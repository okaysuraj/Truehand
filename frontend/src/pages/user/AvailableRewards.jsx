import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const REWARDS = [
  {
    id: 'spring_studio',
    badge: 'LIMITED TIME',
    badgeClass: 'bg-surface-container text-charcoal',
    discount: '15% Off',
    title: 'Spring Studio Collection',
    description: 'Redeemable on all new arrivals from our seasonal pottery and textile collaborations.',
    validity: 'Valid until May 30',
    applied: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A',
    buttonStyle: 'bg-forest-green text-white hover:opacity-90',
  },
  {
    id: 'artisan_weaves',
    badge: 'MEMBER EXCLUSIVE',
    badgeClass: 'bg-surface-container text-charcoal',
    discount: '$20 Off',
    title: 'Artisan Weaves',
    description: "Applicable on any single item from the 'Master Weaver' floor covering series.",
    validity: 'Min. spend $150',
    validityIcon: 'lock',
    applied: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A',
    buttonStyle: 'bg-forest-green text-white hover:opacity-90',
  },
  {
    id: 'ceramic_kit',
    badge: 'SPECIAL GIFT',
    badgeClass: 'bg-[#ffdecb] text-[#97472a]',
    discount: 'Complimentary',
    title: 'Ceramic Care Kit',
    description: 'Add a complimentary artisan cleaning set to any order over $200. Crafted by hand.',
    validity: 'High-priority item',
    validityIcon: 'card_giftcard',
    applied: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEw_f2jMHylziVWvmywfGVy6-kAtNqiIUgLbkahDmRa8e3UK5McvPv7KYDEC8tlOStS2470vzt_SfXG_BL8BgxjsMKFwb7VelYsZ_umF8QUveV5i7Zl2AiWgTgr1C-ePOE5Wl25iIfX2RMqQ5Mo_51kTIJEEtDjCtmAdb8_43wxF96paE82CXy-TMeW1Ml8ess0IoFC7Di6OB4TXDNJ3ctlcBdhoHQfl7AonNDWkDFYXeoqNqYrlYDQ',
    buttonStyle: 'border border-charcoal text-charcoal hover:bg-surface-container',
  },
];

const AvailableRewards = () => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedList, setAppliedList] = useState({});

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode) return;
    alert(`Promo code ${promoCode} applied successfully!`);
    setPromoCode('');
  };

  const toggleReward = (id) => {
    setAppliedList(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-charcoal">
            Available Rewards
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            Enhance your collection with curated offers exclusively for our discerning patrons.
          </p>
        </div>

        {/* Promo Code Input Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm max-w-2xl mx-auto space-y-2">
          <label className="block font-label-sm uppercase font-bold text-on-surface-variant text-[10px] tracking-wider">
            ENTER PROMO CODE
          </label>
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input 
              type="text" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="E.G. ARTISAN2024"
              className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-3 text-xs uppercase font-mono tracking-wider font-bold text-charcoal focus:outline-none focus:border-forest-green"
            >
            </input>
            <button 
              type="submit"
              className="px-6 py-3 bg-charcoal text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-bold hover:bg-black transition-colors"
            >
              APPLY
            </button>
          </form>
        </div>

        {/* Rewards List */}
        <div className="space-y-6">
          {REWARDS.map(reward => {
            const isApplied = !!appliedList[reward.id];

            return (
              <div 
                key={reward.id}
                className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-all text-xs"
              >
                {/* Image */}
                <div className="w-full md:w-64 h-48 md:h-auto bg-surface-container shrink-0 overflow-hidden relative">
                  <img src={reward.image} alt={reward.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${reward.badgeClass}`}>
                        {reward.badge}
                      </span>
                      <span className="font-display-md text-xl md:text-2xl font-bold text-terracotta">
                        {reward.discount}
                      </span>
                    </div>

                    <h3 className="font-display-md text-xl font-bold text-charcoal">
                      {reward.title}
                    </h3>
                    <p className="text-on-surface-variant font-body-md leading-relaxed text-xs">
                      {reward.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
                    <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-sm">
                        {reward.validityIcon || 'info'}
                      </span>
                      <span>{reward.validity}</span>
                    </div>

                    <button 
                      onClick={() => toggleReward(reward.id)}
                      className={`px-5 py-2.5 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold transition-all shadow-sm ${
                        isApplied 
                          ? 'bg-emerald-50 text-forest-green border border-forest-green' 
                          : reward.buttonStyle
                      }`}
                    >
                      {isApplied ? 'Reward Applied' : 'Apply Reward'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Link */}
        <div className="text-center pt-4">
          <button 
            onClick={() => alert('Viewing reward terms and conditions')}
            className="text-xs text-on-surface-variant font-semibold underline hover:text-charcoal transition-colors"
          >
            View reward terms and conditions
          </button>
        </div>

      </main>

    </div>
  );
};

export default AvailableRewards;
