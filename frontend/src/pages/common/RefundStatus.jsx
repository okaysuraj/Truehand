import api from '../../services/api';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const RefundStatus = () => {
  const { orderId } = useParams();

  const refund = {
    orderId: orderId || 'TH-29481',
    requestDate: 'Oct 28, 2023',
    refundAmount: 120.00,
    method: 'Visa ending in 4582',
    status: 'Processing', // 'Submitted', 'Processing', 'Completed'
    timeline: [
      { status: 'Return Requested', date: 'Oct 28, 2023', done: true, description: 'You submitted a return request for 1 item.' },
      { status: 'Return Approved', date: 'Oct 29, 2023', done: true, description: 'Your return has been approved. Ship the item back within 7 days.' },
      { status: 'Item Received', date: 'Nov 2, 2023', done: true, description: 'We have received and inspected your returned item.' },
      { status: 'Refund Processing', date: 'Nov 3, 2023', done: true, description: 'Your refund of $120.00 is being processed.' },
      { status: 'Refund Completed', date: 'Expected Nov 5-7', done: false, description: 'Refund will appear on your original payment method.' }
    ],
    item: {
      name: 'Hand-Thrown Ceramic Vase',
      artisan: 'Elena Studio',
      price: 120,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw'
    }
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link to="/orders" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Orders
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Refund Status</h1>
          <p className="font-body-md text-on-surface-variant">Order {refund.orderId}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main - Timeline */}
          <div className="lg:col-span-2 space-y-8">

            {/* Status Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 flex items-center gap-4">
              <span className="material-symbols-outlined text-amber-600 text-[32px]">hourglass_top</span>
              <div>
                <p className="font-headline-sm text-headline-sm text-amber-800">{refund.status}</p>
                <p className="font-body-sm text-amber-700">Your refund of ${refund.refundAmount.toFixed(2)} is being processed.</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Refund Timeline</h2>
              <div className="relative">
                {refund.timeline.map((step, idx) => (
                  <div key={idx} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        step.done ? 'bg-forest-green border-forest-green' : 'bg-surface-container-lowest border-outline-variant'
                      }`}>
                        {step.done && <span className="material-symbols-outlined text-white text-[12px]">check</span>}
                      </div>
                      {idx < refund.timeline.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-1 ${step.done ? 'bg-forest-green' : 'bg-outline-variant/40'}`}></div>
                      )}
                    </div>
                    <div className="-mt-0.5">
                      <p className={`font-label-md mb-1 ${step.done ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step.status}</p>
                      <p className="font-body-sm text-on-surface-variant mb-1">{step.date}</p>
                      <p className="font-body-sm text-on-surface-variant/80">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Returned Item */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Returned Item</h3>
              <div className="flex gap-4">
                <img src={refund.item.image} alt={refund.item.name} className="w-16 h-16 object-cover rounded shrink-0" />
                <div>
                  <p className="font-label-md text-on-surface">{refund.item.name}</p>
                  <p className="font-body-sm text-on-surface-variant">by {refund.item.artisan}</p>
                  <p className="font-label-md text-on-surface mt-2">${refund.item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Refund Details */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Refund Details</h3>
              <div className="space-y-3 font-body-md">
                <div className="flex justify-between"><span className="text-on-surface-variant">Refund Amount</span><span className="text-on-surface font-label-md">${refund.refundAmount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Refund To</span><span className="text-on-surface font-label-md">{refund.method}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant">Requested</span><span className="text-on-surface">{refund.requestDate}</span></div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm text-center">
              <p className="font-body-sm text-on-surface-variant mb-3">Having trouble with your refund?</p>
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

export default RefundStatus;
