import React, { useState } from 'react';
import useAccountRecords from '../../hooks/useAccountRecords';
import api from '../../services/api';
export default function AdminProductApprovals() {
  const { data, error, reload } = useAccountRecords(['/admin/products/pending']);
  const [busy, setBusy] = useState(null);
  const [writeError, setWriteError] = useState('');
  const decide = async (id, status) => {
    setBusy(id);
    setWriteError('');
    try {
      await api.put(`/admin/products/${id}/approve`, {
        status,
      });
      reload();
    } catch (failure) {
      setWriteError(failure.response?.data?.error || 'Unable to update listing.');
    } finally {
      setBusy(null);
    }
  };
  return (
    <main className="pt-28 p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="font-display-lg text-3xl">Product approvals</h1>
      {(error || writeError) && (
        <p role="alert">
          {error || writeError}
          <button onClick={reload}>Reload</button>
        </p>
      )}
      {!data && !error && <p>Loading listings...</p>}
      {data && !data[0].length && <p>No pending listings.</p>}
      {data?.[0].map((product) => (
        <article key={product.id} className="border-b py-4 space-y-2">
          <h2>{product.name}</h2>
          <p>Seller: {product.sellerName}</p>
          <p>{product.description}</p>
          <p>
            {product.category} | INR {Number(product.price).toFixed(2)}
          </p>
          <button
            className="border p-2"
            disabled={busy !== null}
            onClick={() => decide(product.id, 'APPROVED')}
          >
            Approve
          </button>{' '}
          <button
            className="border p-2"
            disabled={busy !== null}
            onClick={() => decide(product.id, 'REJECTED')}
          >
            Reject
          </button>
        </article>
      ))}
    </main>
  );
}
