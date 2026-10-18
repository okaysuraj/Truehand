import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import useAccountRecords from '../../hooks/useAccountRecords';
export default function DigitalWallet() {
  const { user } = useAuth();
  const { data, error, reload } = useAccountRecords([
    `/wallet/${user?.id}`,
    `/wallet/${user?.id}/transactions`,
  ]);
  return (
    <main className="pt-28 p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-display-lg">Your wallet</h1>
      {!user ? (
        <Link to="/login">Sign in to view your wallet</Link>
      ) : (
        <>
          {error && (
            <div role="alert">
              {error} <button onClick={reload}>Retry</button>
            </div>
          )}
          {!data && !error && <p>Loading wallet...</p>}
          {data && (
            <>
              <p>Available balance: INR {Number(data[0].balance).toFixed(2)}</p>
              {['SELLER', 'DELIVERY'].includes(user.role) && (
                <Link to="/request-payout">Request a payout</Link>
              )}
              <Link className="block underline" to="/bank-accounts">
                Bank accounts
              </Link>
              <h2 className="text-xl">Transactions</h2>
              {!data[1].length && <p>No transactions yet.</p>}
              {data[1].map((transaction) => (
                <article className="py-4 border-b" key={transaction.id}>
                  <p>{transaction.description}</p>
                  <p>
                    {transaction.type}: INR {Number(transaction.amount).toFixed(2)}
                  </p>
                  <time>{new Date(transaction.createdAt).toLocaleString()}</time>
                </article>
              ))}
            </>
          )}
        </>
      )}
    </main>
  );
}
