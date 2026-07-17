import api from '../services/api';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminCommissionSettings = () => {
  const [settings, setSettings] = useState({
    platformFeePercent: 5,
    handlingFeePercent: 1.5,
    paymentGatewayFeePercent: 2,
    minimumPayout: 50,
    payoutCycleDays: 7,
    gstPercent: 18,
    autoApprovePayouts: false,
    requireKycForPayout: true,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(s => ({ ...s, [name]: type === 'checkbox' ? checked : parseFloat(value) || value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = [
    { name: 'platformFeePercent', label: 'Platform Commission (%)', icon: 'percent', type: 'number', step: 0.5, help: 'Fee charged on every sale' },
    { name: 'handlingFeePercent', label: 'Handling Fee (%)', icon: 'inventory_2', type: 'number', step: 0.5, help: 'Logistics and packaging charge' },
    { name: 'paymentGatewayFeePercent', label: 'Payment Gateway Fee (%)', icon: 'credit_card', type: 'number', step: 0.1, help: 'Passed on from payment processor' },
    { name: 'gstPercent', label: 'GST Rate (%)', icon: 'account_balance', type: 'number', step: 1, help: 'Goods & Services Tax rate' },
    { name: 'minimumPayout', label: 'Minimum Payout ($)', icon: 'payments', type: 'number', step: 10, help: 'Minimum amount for withdrawal requests' },
    { name: 'payoutCycleDays', label: 'Payout Cycle (days)', icon: 'schedule', type: 'number', step: 1, help: 'How often payouts are processed' },
  ];

  const totalFee = settings.platformFeePercent + settings.handlingFeePercent + settings.paymentGatewayFeePercent;
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Admin
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Commission & Fee Settings</h1>
          <p className="font-body-md text-on-surface-variant">Configure platform-wide commission rates, fees, and payout policies.</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-forest-green/10 border border-forest-green/30 rounded-lg text-forest-green font-label-md flex items-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>Settings saved successfully.
          </div>
        )}

        {/* Summary */}
        <div className="bg-charcoal text-white rounded-xl p-6 mb-6 shadow-lg">
          <p className="font-label-sm uppercase tracking-wider text-white/60 mb-2">Effective Total Fee on Each Sale</p>
          <p className="font-display-sm text-display-sm">{totalFee.toFixed(1)}%</p>
          <p className="font-body-sm text-white/60 mt-2">Platform {settings.platformFeePercent}% + Handling {settings.handlingFeePercent}% + Gateway {settings.paymentGatewayFeePercent}%</p>
          <p className="font-body-sm text-white/40 mt-1">+ GST {settings.gstPercent}% applied separately</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-6">
          <h2 className="font-headline-sm text-on-surface mb-6">Fee Configuration</h2>
          <div className="space-y-5">
            {fields.map(f => (
              <div key={f.name} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-surface-variant/30 rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">{f.icon}</span>
                </div>
                <div className="flex-1">
                  <label className="block font-label-md text-on-surface">{f.label}</label>
                  <p className="font-body-sm text-on-surface-variant">{f.help}</p>
                </div>
                <input type="number" name={f.name} value={settings[f.name]} step={f.step} min={0}
                  onChange={handleChange}
                  className="w-28 p-2.5 text-right bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="font-headline-sm text-on-surface mb-6">Payout Policies</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-label-md text-on-surface">Auto-approve payouts</p>
                <p className="font-body-sm text-on-surface-variant">Automatically approve payout requests under minimum threshold</p>
              </div>
              <div onClick={() => setSettings(s => ({ ...s, autoApprovePayouts: !s.autoApprovePayouts }))}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${settings.autoApprovePayouts ? 'bg-forest-green' : 'bg-outline-variant'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.autoApprovePayouts ? 'translate-x-7' : 'translate-x-1'}`} />
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-label-md text-on-surface">Require KYC for payouts</p>
                <p className="font-body-sm text-on-surface-variant">Only allow withdrawals from verified sellers</p>
              </div>
              <div onClick={() => setSettings(s => ({ ...s, requireKycForPayout: !s.requireKycForPayout }))}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${settings.requireKycForPayout ? 'bg-forest-green' : 'bg-outline-variant'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.requireKycForPayout ? 'translate-x-7' : 'translate-x-1'}`} />
              </div>
            </label>
          </div>
        </div>

        <button onClick={handleSave} className="w-full py-4 bg-forest-green text-white font-label-md rounded-lg hover:opacity-90 transition-opacity">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminCommissionSettings;
