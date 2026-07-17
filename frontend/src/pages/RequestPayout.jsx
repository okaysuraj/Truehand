import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthProvider';

const RequestPayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [availableBalance, setAvailableBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordRes, accRes] = await Promise.all([
          api.get(`/seller/${user.id}/orders`),
          api.get(`/bank-accounts/user/${user.id}`).catch(() => ({ data: [] }))
        ]);
        const delivered = (ordRes.data || []).filter(o => (o.status||'').toUpperCase() === 'DELIVERED');
        const bal = delivered.reduce((s, o) => s + (parseFloat(o.totalAmount)||0), 0);
        setAvailableBalance(bal);
        setAccounts(accRes.data || []);
        if (accRes.data?.length > 0) setSelectedAccount(accRes.data[0].id);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchData();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (amt <= 0 || amt > availableBalance) {
      setError(`Amount must be between $1 and $${availableBalance.toFixed(2)}.`);
      return;
    }
    if (!selectedAccount) { setError('Please select a bank account.'); return; }
    setSubmitting(true);
    setError('');
    try {
      await api.post(`/seller/${user.id}/payout-request`, { amount: amt, bankAccountId: selectedAccount });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Payout request failed. Please try again.');
    }
    setSubmitting(false);
  };

  if (success) return (
    <div className="pt-24 pb-16 min-h-screen bg-surface-linen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-5xl text-forest-green">check_circle</span>
        </div>
        <h1 className="font-display-sm text-display-sm text-on-surface mb-3">Request Submitted</h1>
        <p className="font-body-md text-on-surface-variant mb-8">
          Your payout request for <strong>${parseFloat(amount).toFixed(2)}</strong> has been submitted. It will be processed within 3-5 business days.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/seller/earnings" className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">
            View Earnings
          </Link>
          <Link to="/seller/dashboard" className="px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">

        <div className="mb-10">
          <Link to="/seller/earnings" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Earnings
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Request Payout</h1>
          <p className="font-body-md text-on-surface-variant">Withdraw your available balance to your bank account.</p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-forest-green to-forest-green/70 text-white rounded-xl p-8 mb-8 shadow-lg">
          <p className="font-label-sm uppercase tracking-wider text-white/70 mb-2">Available Balance</p>
          {loading ? (
            <div className="h-10 w-40 bg-white/20 rounded animate-pulse" />
          ) : (
            <p className="font-display-sm text-display-sm">${availableBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          )}
          <p className="font-body-sm text-white/60 mt-2">From delivered orders · Platform fee already deducted</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-body-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bank Account */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-on-surface mb-4">Destination Bank Account</h2>
            {loading ? (
              <div className="h-12 bg-surface-variant/30 rounded animate-pulse" />
            ) : accounts.length === 0 ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="font-label-md text-amber-800 mb-2">No bank accounts linked</p>
                <Link to="/bank-accounts" className="text-forest-green font-label-sm hover:underline">Add a bank account →</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {accounts.map(acc => (
                  <label key={acc.id} className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAccount === acc.id ? 'border-forest-green bg-forest-green/5' : 'border-outline-variant/30 hover:border-forest-green/50'
                  }`}>
                    <input type="radio" name="account" value={acc.id} checked={selectedAccount === acc.id}
                      onChange={() => setSelectedAccount(acc.id)} className="accent-forest-green" />
                    <div>
                      <p className="font-label-md text-on-surface">{acc.bankName || 'Bank'} •••• {acc.accountNumber?.slice(-4) || '0000'}</p>
                      <p className="font-body-sm text-on-surface-variant">{acc.accountHolderName || ''}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-on-surface mb-4">Withdrawal Amount</h2>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body-md text-on-surface-variant">$</span>
              <input
                type="number" step="0.01" min="1" max={availableBalance}
                value={amount} onChange={e => setAmount(e.target.value)}
                required placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface"
              />
            </div>
            <div className="flex gap-2 mt-3">
              {[25, 50, 100].map(pct => (
                <button key={pct} type="button" onClick={() => setAmount((availableBalance * pct / 100).toFixed(2))}
                  className="px-3 py-1.5 border border-outline-variant/50 text-on-surface-variant font-label-sm rounded hover:border-forest-green hover:text-forest-green transition-colors">
                  {pct}%
                </button>
              ))}
              <button type="button" onClick={() => setAmount(availableBalance.toFixed(2))}
                className="px-3 py-1.5 border border-outline-variant/50 text-on-surface-variant font-label-sm rounded hover:border-forest-green hover:text-forest-green transition-colors">
                Max
              </button>
            </div>
          </div>

          <button type="submit" disabled={submitting || loading || accounts.length === 0}
            className="w-full py-4 bg-forest-green text-white font-label-md rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
            {submitting && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
            {submitting ? 'Submitting...' : 'Request Payout'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPayout;
