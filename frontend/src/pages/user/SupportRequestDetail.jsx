import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useAccountRecords from '../../hooks/useAccountRecords';
export default function SupportRequestDetail() {
  const { ticketId } = useParams();
  const validId = /^\d+$/.test(ticketId || '');
  const { user, data, error, reload } = useAccountRecords(validId ? [`/support/${ticketId}`] : []);
  const ticket = data?.[0];
  return (
    <main className="pt-28 p-6 max-w-4xl mx-auto space-y-6">
      <Link to="/support/requests">All requests</Link>
      <h1 className="font-display-lg text-3xl">Support request</h1>
      {!user && <Link to="/login">Sign in</Link>}
      {!validId && <p>Select a request from your support history.</p>}
      {error && (
        <p role="alert">
          {error} <button onClick={reload}>Retry</button>
        </p>
      )}
      {validId && user && !data && !error && <p>Loading request...</p>}
      {ticket && (
        <>
          <h2 className="text-xl">{ticket.subject}</h2>
          <p>{ticket.requestId}</p>
          <p>Status: {ticket.status}</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{ticket.description}</p>
          <p>Updated: {ticket.lastUpdate}</p>
          {ticket.orderId && <Link to={`/order/${ticket.orderId}`}>Related order</Link>}
        </>
      )}
    </main>
  );
}
