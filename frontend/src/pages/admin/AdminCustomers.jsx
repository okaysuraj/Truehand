import React, { useState } from 'react';
import useAccountRecords from '../../hooks/useAccountRecords';
import api from '../../services/api';
export default function AdminCustomers() {
  const { data, error, reload } = useAccountRecords(['/users/customers']);
  const [busy, setBusy] = useState(null);
  const [writeError, setWriteError] = useState('');
  const change = async (user) => {
    setBusy(user.id);
    setWriteError('');
    try {
      await api.put(`/users/${user.id}/status`, {
        status: user.isActive ? 'BLOCKED' : 'ACTIVE',
      });
      reload();
    } catch (failure) {
      setWriteError(failure.response?.data?.error || 'Unable to update account.');
    } finally {
      setBusy(null);
    }
  };
  return (
    <main className="pt-28 p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="font-display-lg text-3xl">Customers</h1>
      {(error || writeError) && (
        <p role="alert">
          {error || writeError}
          <button onClick={reload}>Reload</button>
        </p>
      )}
      {!data && !error && <p>Loading customers...</p>}
      {data && !data[0].length && <p>No customer accounts.</p>}
      {data?.[0].map((user) => (
        <article key={user.id} className="border-b py-4 space-y-2">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
          <p>Status: {user.status}</p>
          <button className="border p-2" disabled={busy !== null} onClick={() => change(user)}>
            {user.isActive ? 'Block account' : 'Activate account'}
          </button>
        </article>
      ))}
    </main>
  );
}
