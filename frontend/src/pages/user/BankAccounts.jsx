import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAccountRecords from '../../hooks/useAccountRecords';
import api from '../../services/api';
export default function BankAccounts() {
  const { user, data, error, reload } = useAccountRecords(['/wallet/banks']);
  const empty = {
    bankName: '',
    accountName: '',
    accountType: '',
    accountNumber: '',
    routingNumber: '',
  };
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [writeError, setWriteError] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setWriteError('');
    try {
      await api.post('/wallet/banks', form);
      setForm(empty);
      reload();
    } catch (failure) {
      setWriteError(
        failure.response?.data?.error ||
          failure.response?.data?.message ||
          'Unable to add account.',
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="pt-28 p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="font-display-lg text-3xl">Bank accounts</h1>
      {!user ? (
        <Link to="/login">Sign in</Link>
      ) : (
        <>
          {(error || writeError) && (
            <p role="alert">
              {error || writeError} <button onClick={reload}>Reload</button>
            </p>
          )}
          {!data && !error && <p>Loading accounts...</p>}
          {data && !data[0].length && <p>No linked accounts.</p>}
          {data?.[0].map((bank) => (
            <article key={bank.id} className="border-b py-4">
              <h2>{bank.bankName}</h2>
              <p>
                {bank.accountName} | Account ending {bank.lastFour}
              </p>
              <p>
                {bank.status}
                {bank.default ? ' | Default account' : ''}
              </p>
            </article>
          ))}
          <p>New accounts remain pending verification. Payouts require a verified account.</p>
          <form className="space-y-4" onSubmit={submit}>
            {Object.keys(empty).map((field) => (
              <label key={field} className="block">
                {
                  {
                    bankName: 'Bank name',
                    accountName: 'Account holder',
                    accountType: 'Account type',
                    accountNumber: 'Account number',
                    routingNumber: 'Routing number / IFSC',
                  }[field]
                }
                <input
                  required
                  maxLength={field === 'accountNumber' ? 34 : 255}
                  minLength={field === 'accountNumber' ? 6 : 1}
                  pattern={field === 'accountNumber' ? '[0-9]{6,34}' : undefined}
                  autoComplete="off"
                  className="block w-full border p-3"
                  value={form[field]}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      [field]: event.target.value,
                    })
                  }
                />
              </label>
            ))}
            <button className="border p-3" disabled={busy} type="submit">
              {busy ? 'Submitting...' : 'Add account'}
            </button>
          </form>
        </>
      )}
    </main>
  );
}
