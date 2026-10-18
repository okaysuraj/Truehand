import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';
export default function RequestPayout() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [banks, setBanks] = useState([]);
  const [history, setHistory] = useState([]);
  const [bankId, setBankId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const key = useRef(crypto.randomUUID());
  const load = async () => {
    if (!user?.id) return;
    const [w, b, p] = await Promise.all([
      api.get('/wallet/' + user.id),
      api.get('/wallet/banks'),
      api.get('/wallet/payouts'),
    ]);
    setWallet(w.data);
    setBanks(b.data);
    setHistory(p.data);
  };
  useEffect(() => {
    load().catch((err) => setError(err.response?.data?.error || 'Unable to load payout details.'));
  }, [user?.id]);
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.post('/wallet/payouts', {
        bankAccountId: Number(bankId),
        amount,
        requestKey: key.current,
      });
      key.current = crypto.randomUUID();
      setAmount('');
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to submit payout request.');
    } finally {
      setSaving(false);
    }
  };
  const verified = banks.filter((b) => b.status === 'VERIFIED');
  return (
    <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <h1 className="font-display-lg text-4xl text-forest-green mb-6">Payout requests</h1>
      {error && <p role="alert">{error}</p>}
      {wallet && <p className="my-4">Available balance: INR {Number(wallet.balance).toFixed(2)}</p>}
      {!verified.length && <p>A verified bank account is required to request a payout.</p>}
      <form onSubmit={submit} className="space-y-4 my-6">
        <label className="block">
          Bank account
          <select
            className="block border p-3 w-full"
            required
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
          >
            <option value="">Select bank account</option>
            {verified.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.bankName} ending {bank.lastFour}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          Amount (INR)
          <input
            className="block border p-3 w-full"
            type="number"
            min="0.01"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button
          className="bg-forest-green text-white px-6 py-3"
          disabled={saving || !wallet || !verified.length}
        >
          {saving ? 'Submitting...' : 'Request payout'}
        </button>
      </form>
      <p>
        Requests reserve the amount from your wallet. Approval does not confirm a bank transfer.
      </p>
      <h2 className="font-headline-lg text-2xl my-6">Request history</h2>
      {!history.length && <p>No payout requests yet.</p>}
      {history.map((p) => (
        <div className="border-b py-4" key={p.id}>
          <p>
            Request #{p.id}: INR {Number(p.amount).toFixed(2)} - {p.status}
          </p>
          <p>{p.bankAccount}</p>
          <p>{new Date(p.requestedAt).toLocaleString()}</p>
        </div>
      ))}
    </main>
  );
}
