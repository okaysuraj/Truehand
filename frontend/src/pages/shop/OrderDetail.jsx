import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import api from '../../services/api';
import { createOrderDetailHook } from '../../../../shared/order-detail';
import { formatValue } from '../../../../shared/feature-contract';
const useOrderDetail = createOrderDetailHook(React, api);
export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const detail = useOrderDetail(id, user?.id);
  const order = detail.order;
  const cancel = () => {
    if (window.confirm('Cancel this unpaid order? Reserved stock will be released.'))
      detail.cancel();
  };
  const resume = () => {
    const current = detail.resumeOrder();
    if (current)
      navigate('/checkout', {
        state: {
          order: current,
        },
      });
  };
  return (
    <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-screen">
      <h1 className="font-display-lg text-4xl text-forest-green mb-6">Order details</h1>
      {detail.loading && <p role="status">Loading order...</p>}
      {detail.error && (
        <p role="alert">
          {detail.error}{' '}
          <button className="underline" onClick={detail.retry}>
            Retry
          </button>
        </p>
      )}
      {order && (
        <div className="space-y-4">
          <p>{order.orderNumber}</p>
          <p>Placed: {formatValue(order.createdAt, 'date')}</p>
          <p>Status: {order.status}</p>
          <p>Payment: {order.paymentStatus}</p>
          <p>Delivery address: {order.deliveryAddress}</p>
          {order.orderItems?.map((item) => (
            <div className="border-b py-4" key={item.id}>
              {item.imageUrl && (
                <img
                  className="w-24 h-24 object-cover"
                  src={item.imageUrl}
                  alt={item.productName}
                />
              )}
              <p>{item.productName}</p>
              {item.variantSku && <p>Purchased SKU: {item.variantSku}</p>}
              {item.variantDescription && <p>Purchased options: {item.variantDescription}</p>}
              <p>
                {item.quantity} x {formatValue(item.priceAtPurchase, 'money')}
              </p>
              {Number(item.discountAmount) > 0 && (
                <p>Line discount: {formatValue(item.discountAmount, 'money')}</p>
              )}
            </div>
          ))}
          <p>Total: {formatValue(order.totalAmount, 'money')}</p>
          <p>
            Estimated delivery:{' '}
            {order.delivery?.estimatedDeliveryTime
              ? formatValue(order.delivery.estimatedDeliveryTime, 'date')
              : 'Awaiting a delivery estimate'}
          </p>
          {detail.canResume && (
            <>
              <button className="underline mr-6" disabled={detail.busy} onClick={resume}>
                Complete payment
              </button>
              <button className="underline" disabled={detail.busy} onClick={cancel}>
                Cancel unpaid order
              </button>
            </>
          )}
          {order.paymentStatus === 'PAID' && (
            <Link className="block underline" to={'/track/' + order.id}>
              Delivery tracking
            </Link>
          )}
          <Link
            className="block underline"
            to={'/features/order-tax-documents?orderId=' + order.id}
          >
            Issued invoices
          </Link>
        </div>
      )}
      <p className="my-8">
        <Link to="/orders">All orders</Link>
      </p>
    </main>
  );
}
