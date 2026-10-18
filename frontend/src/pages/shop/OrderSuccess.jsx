import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
export default function OrderSuccess() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    setOrder(null);
    setError('');
    if (!id) {
      setError('Select an order to view its confirmation.');
      return;
    }
    api
      .get('/orders/' + encodeURIComponent(id))
      .then(({ data }) => {
        if (active) setOrder(data);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.error || 'Unable to load this order.');
      });
    return () => {
      active = false;
    };
  }, [id]);
  return (
    <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <h1 className="font-display-lg text-4xl text-forest-green mb-6">
        {order?.paymentStatus === 'PAID' ? 'Thank you for your order' : 'Order status'}
      </h1>
      {error && <p role="alert">{error}</p>}
      {!order && !error && <p>Loading order...</p>}
      {order && (
        <div className="space-y-4">
          <p>Order number: {order.orderNumber}</p>
          <p>Payment: {order.paymentStatus}</p>
          <p>Status: {order.status}</p>
          <p>
            Total:{' '}
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
              order.totalAmount,
            )}
          </p>
          <p>Delivery address: {order.deliveryAddress}</p>
          <p>
            Estimated delivery:{' '}
            {order.delivery?.estimatedDeliveryTime
              ? new Date(order.delivery.estimatedDeliveryTime).toLocaleString()
              : 'Awaiting a delivery estimate'}
          </p>
          <Link className="underline" to={'/order/' + order.id}>
            View order details
          </Link>
        </div>
      )}
      <p className="mt-8">
        <Link className="underline" to="/products">
          Continue shopping
        </Link>
      </p>
    </main>
  );
}
