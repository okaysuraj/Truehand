import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import useAccountRecords from '../../hooks/useAccountRecords';
export default function SellerDashboard() {
  const { user } = useAuth();
  const { data, error, reload } = useAccountRecords([`/seller/${user?.id}/stats`]);
  return (
    <main className="pt-28 p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="font-display-lg text-3xl">Your seller dashboard</h1>
      {error && (
        <p role="alert">
          {error} <button onClick={reload}>Retry</button>
        </p>
      )}
      {!data && !error && <p>Loading dashboard...</p>}
      {data && (
        <>
          <p>Paid order revenue: INR {Number(data[0].totalRevenue).toFixed(2)}</p>
          <p>Active orders: {data[0].activeOrders}</p>
          <p>Listings: {data[0].totalProducts}</p>
        </>
      )}
      <nav className="flex flex-wrap gap-6">
        <Link to="/seller/orders">Orders</Link>
        <Link to="/seller/inventory">Inventory</Link>
        <Link to="/wallet">Wallet</Link>
        <Link to="/request-payout">Payouts</Link>
      </nav>
    </main>
  );
}
