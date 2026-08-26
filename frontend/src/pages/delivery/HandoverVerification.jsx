import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HandoverVerification = () => {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);

  const handleKeyPress = (num) => {
    const nextIdx = digits.findIndex(d => d === '');
    if (nextIdx !== -1) {
      const copy = [...digits];
      copy[nextIdx] = num.toString();
      setDigits(copy);
    }
  };

  const handleBackspace = () => {
    const lastFilledIdx = [...digits].reverse().findIndex(d => d !== '');
    if (lastFilledIdx !== -1) {
      const idx = 5 - lastFilledIdx;
      const copy = [...digits];
      copy[idx] = '';
      setDigits(copy);
    }
  };

  const handleVerify = () => {
    if (digits.some(d => d === '')) {
      alert('Please enter all 6 digits of the client authorization code.');
      return;
    }
    alert('Code verified! Handover authenticated.');
    navigate('/delivery/success');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20">
      
      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Handover Details & Security Badges */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-charcoal mb-2">
              Secure Handover
            </h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed max-w-md">
              Verify the 6-digit authentication code provided by the client to finalize the logistical chain.
            </p>
          </div>

          {/* Item Card */}
          <div className="bg-white p-5 rounded-3xl border border-outline-variant/30 shadow-sm flex items-center gap-4 text-xs">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEnG8NDjIN-1fYsguVvbxY_KcuIEwgS3ANzKAEfYxDl7eZ-ALXNFmFH6OSX7f-kSQOBHkSskNlDpEF9tw5pdNzKyNjJcLjGbrJ_-8qKkQFcj0D_sm81jZcFejDYcmRkVgDWpwNt_QuughiZbyOh2E3Z-NH2GvPbhX8tcJXnYbVyhf4PUd19u4abuU2e9eNzGnRhpHze5__XkEy24yymg1-Wb89UMFnnU-nSAW7h6ue6GjSxfCGHQO5A" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-terracotta font-bold">ITEM ID: #TH-9021</span>
              <h4 className="font-headline-md text-sm font-bold text-charcoal mt-0.5">Hand-thrown Obsidian Vessel</h4>
              <p className="text-[11px] text-on-surface-variant">Premium Fulfillment Service</p>
            </div>
          </div>

          {/* Trust points */}
          <div className="space-y-4 pt-2 text-xs text-on-surface-variant">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-forest-green text-lg">verified_user</span>
              <div>
                <strong className="text-charcoal font-bold block">Confirm Identity</strong>
                <span>Ensure the recipient matches the order profile.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-forest-green text-lg">package_2</span>
              <div>
                <strong className="text-charcoal font-bold block">Condition Inspection</strong>
                <span>Recipient has inspected the packaging for integrity.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Boxes & Keypad Card */}
        <div className="md:col-span-6 bg-white p-8 md:p-10 rounded-3xl border border-outline-variant/30 shadow-xl space-y-8 max-w-md mx-auto w-full text-center">
          
          {/* 6 Digit Input Display */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {digits.map((digit, idx) => (
              <div 
                key={idx}
                className={`w-12 h-14 rounded-2xl border-2 flex items-center justify-center font-display-lg text-2xl font-bold transition-all ${
                  digit ? 'border-charcoal bg-surface-container-lowest text-charcoal' : 'border-outline-variant/40 bg-surface-container-low'
                }`}
              >
                {digit}
              </div>
            ))}
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num)}
                className="py-4 rounded-2xl bg-surface-container-low hover:bg-surface-container font-display-md text-xl font-bold text-charcoal transition-colors active:scale-95"
              >
                {num}
              </button>
            ))}
            <div />
            <button
              type="button"
              onClick={() => handleKeyPress(0)}
              className="py-4 rounded-2xl bg-surface-container-low hover:bg-surface-container font-display-md text-xl font-bold text-charcoal transition-colors active:scale-95"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-4 rounded-2xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-charcoal transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">backspace</span>
            </button>
          </div>

          {/* Submit Button & Secondary Links */}
          <div className="space-y-4 pt-2">
            <button 
              type="button"
              onClick={handleVerify}
              className="w-full py-4 bg-[#6e857b] text-white rounded-2xl font-label-md text-xs uppercase tracking-widest font-bold hover:bg-forest-green transition-all shadow"
            >
              Verify &amp; Handover
            </button>

            <div className="flex justify-center items-center gap-4 text-xs text-on-surface-variant font-semibold">
              <button onClick={() => alert('OTP resent to buyer.')} className="hover:text-charcoal hover:underline">Resend OTP</button>
              <span>&bull;</span>
              <button onClick={() => alert('Discrepancy reported to hub.')} className="hover:text-charcoal hover:underline">Report Discrepancy</button>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-5 border-t border-outline-variant/20 bg-white flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-on-surface-variant">
        <span>&copy; 2024 TrueHand Artisan Marketplace. Logistical Excellence.</span>
        <div className="flex items-center gap-6">
          <Link to="/settings" className="hover:text-charcoal">Terms of Service</Link>
          <Link to="/settings" className="hover:text-charcoal">Privacy Policy</Link>
          <Link to="/settings" className="hover:text-charcoal">Carrier Agreement</Link>
        </div>
      </footer>

    </div>
  );
};

export default HandoverVerification;
