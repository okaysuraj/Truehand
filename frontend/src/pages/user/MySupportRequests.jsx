import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAccountRecords from '../../hooks/useAccountRecords';
import api from '../../services/api';
export default function MySupportRequests() {
  const { user, data, error, reload } = useAccountRecords(['/support']);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [busy, setBusy] = useState(false);
  const [writeError, setWriteError] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setWriteError('');
    try {
      await api.post('/support', {
        subject,
        description,
        type: 'GENERAL',
      });
      setSubject('');
      setDescription('');
      reload();
    } catch (failure) {
      setWriteError(
        failure.response?.data?.error ||
          failure.response?.data?.message ||
          'Unable to create request.',
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="pt-28 p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="font-display-lg text-3xl">Support requests</h1>
      {!user ? (
        <Link to="/login">Sign in to contact support</Link>
      ) : (
        <>
          {(error || writeError) && (
            <p role="alert">
              {error || writeError} <button onClick={reload}>Reload</button>
            </p>
          )}
          <form className="space-y-3" onSubmit={submit}>
            <label className="block">
              Subject
              <input
                required
                maxLength={255}
                className="block w-full border p-3"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              />
            </label>
            <label className="block">
              Description
              <textarea
                required
                className="block w-full border p-3"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
            <button disabled={busy} type="submit" className="border p-3">
              {busy ? 'Submitting...' : 'Create request'}
            </button>
          </form>
          {!data && !error && <p>Loading requests...</p>}
          {data && !data[0].length && <p>No support requests yet.</p>}
          {data?.[0].map((ticket) => (
            <article className="border-b py-4" key={ticket.id}>
              <Link to={`/support-request/${ticket.id}`}>{ticket.subject}</Link>
              <p>{ticket.requestId}</p>
              <p>
                {ticket.status} | Updated {ticket.lastUpdate}
              </p>
            </article>
          ))}
        </>
      )}
    </main>
  );
}
