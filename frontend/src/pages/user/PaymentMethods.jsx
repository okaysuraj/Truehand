import React from 'react';
import { Link } from 'react-router-dom';
export default function PaymentMethods() {
  return (
    <main className="pt-28 p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="font-display-lg text-3xl">Payment methods</h1>
      <p>
        Choose your payment method securely during checkout. Managing saved payment methods is
        currently unavailable.
      </p>
      <Link to="/cart">View cart</Link>
    </main>
  );
}
