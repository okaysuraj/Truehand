import api from '../services/api';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { orderId } = useParams();

  const order = {
    id: orderId || 'TH-29481',
    date: 'October 24, 2023',
    status: 'Shipped',
    estimatedDelivery: 'October 30 – November 2, 2023',
    items: [
      {
        id: 1,
        name: 'Hand-Thrown Ceramic Vase',
        artisan: 'Elena Studio',
        price: 120,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw'
      },
      {
        id: 2,
        name: 'Woven Indigo Throw',
        artisan: 'Tidal Textiles',
        price: 200,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A'
      }
    ],
    shippingAddress: {
      name: 'Jane Doe',
      line1: '123 Artisan Lane',
      city: 'Portland',
      state: 'OR',
      zip: '97201'
    },
    paymentMethod: 'Visa ending in 4582',
    subtotal: 320,
    shipping: 12,
    tax: 28.80,
    total: 360.80,
    timeline: [
      { status: 'Order Placed', date: 'Oct 24, 2023 – 2:30 PM', done: true },
      { status: 'Payment Confirmed', date: 'Oct 24, 2023 – 2:31 PM', done: true },
      { status: 'Artisan Preparing', date: 'Oct 25, 2023 – 10:00 AM', done: true },
      { status: 'Shipped', date: 'Oct 27, 2023 – 4:15 PM', done: true },
      { status: 'Out for Delivery', date: 'Estimated Oct 30', done: false },
      { status: 'Delivered', date: '', done: false }
    ]
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link to="/orders" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Orders
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-1">Order {order.id}</h1>
              <p className="font-body-md text-on-surface-variant">Placed on {order.date}</p>
            </div>
            <div className="flex gap-3">
              <Link to={`/reorder/${order.id}`} className="px-5 py-2.5 border border-forest-green text-forest-green font-label-md rounded hover:bg-forest-green/5 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">replay</span>
                Reorder
              </Link>
              <Link to={`/return-request/${order.id}`} className="px-5 py-2.5 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">assignment_return</span>
                Return
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Status Banner */}
            <div className="bg-forest-green/5 border border-forest-green/20 rounded-lg p-5 flex items-center gap-4">
              <span className="material-symbols-outlined text-forest-green text-[32px]">local_shipping</span>
              <div>
                <p className="font-headline-sm text-headline-sm text-forest-green">{order.status}</p>
                <p className="font-body-sm text-on-surface-variant">Estimated delivery: {order.estimatedDelivery}</p>
              </div>
              <Link to={`/track/${order.id}`} className="ml-auto px-4 py-2 bg-forest-green text-white font-label-sm rounded hover:opacity-90 transition-opacity whitespace-nowrap">
                Track Package
              </Link>
            </div>

            {/* Order Timeline */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Order Timeline</h2>
              <div className="relative">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                        step.done ? 'bg-forest-green border-forest-green' : 'bg-surface-container-lowest border-outline-variant'
                      }`}>
                        {step.done && <span className="material-symbols-outlined text-white text-[10px] flex items-center justify-center w-full h-full">check</span>}
                      </div>
                      {idx < order.timeline.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-1 ${step.done ? 'bg-forest-green' : 'bg-outline-variant/40'}`}></div>
                      )}
                    </div>
                    <div className="-mt-1">
                      <p className={`font-label-md ${step.done ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step.status}</p>
                      {step.date && <p className="font-body-sm text-on-surface-variant">{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-outline-variant/30">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Items ({order.items.length})</h2>
              </div>
              <div className="divide-y divide-outline-variant/30">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-6">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded shrink-0" />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="font-headline-sm text-headline-sm text-on-surface hover:text-forest-green transition-colors">{item.name}</Link>
                      <p className="font-body-sm text-on-surface-variant mt-1">by {item.artisan}</p>
                      <p className="font-body-sm text-on-surface-variant mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-label-md text-on-surface shrink-0">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Payment Summary */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6">Payment Summary</h3>
              <div className="space-y-3 font-body-md text-on-surface-variant">
                <div className="flex justify-between"><span>Subtotal</span><span className="text-on-surface">${order.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="text-on-surface">${order.shipping.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span className="text-on-surface">${order.tax.toFixed(2)}</span></div>
                <div className="border-t border-outline-variant/30 pt-3 flex justify-between font-label-md text-on-surface">
                  <span>Total</span><span className="font-headline-sm">${order.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">credit_card</span>
                <span className="font-body-sm text-on-surface-variant">{order.paymentMethod}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Shipping Address</h3>
              <div className="font-body-md text-on-surface-variant leading-relaxed">
                <p className="text-on-surface font-label-md mb-1">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.line1}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm text-center">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-3">help_outline</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Need Help?</h3>
              <p className="font-body-sm text-on-surface-variant mb-4">Having an issue with this order?</p>
              <Link to="/report-issue" className="inline-flex items-center gap-1 text-forest-green font-label-md hover:underline">
                Contact Support <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
