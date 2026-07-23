import api from '../../services/api';
import React from 'react';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  const order = { id: 'TH-29481', expected: 'Nov 2, 2023', carrier: 'TrueHand Express', trackingNumber: 'TRK987654321', status: 'in-transit' };

  const timeline = [
    { status: 'Order Placed', time: 'Oct 28, 9:00 AM', detail: 'We have received your order.', completed: true },
    { status: 'Processed', time: 'Oct 29, 2:30 PM', detail: 'Your order has been packed and is ready to ship.', completed: true },
    { status: 'In Transit', time: 'Oct 30, 8:15 AM', detail: 'Package arrived at Portland sorting facility.', completed: true, current: true },
    { status: 'Out for Delivery', time: 'Pending', detail: '', completed: false },
    { status: 'Delivered', time: 'Pending', detail: '', completed: false }
  ];
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <Link to="/profile" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Orders
          </Link>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-2">Track Order {order.id}</h1>
              <p className="font-body-md text-on-surface-variant">Expected Delivery: <span className="text-on-surface font-label-md">{order.expected}</span></p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 px-4 py-2 rounded-lg inline-block">
              <p className="font-label-sm text-on-surface-variant mb-1">{order.carrier}</p>
              <p className="font-body-md text-forest-green font-mono">{order.trackingNumber}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 md:p-8 shadow-sm">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-outline-variant/30">
            {timeline.map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className={`absolute left-0 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-surface-container-lowest z-10 ${
                  step.current ? 'bg-forest-green text-white shadow-[0_0_0_4px_rgba(33,94,62,0.1)]' : 
                  step.completed ? 'bg-forest-green text-white' : 'bg-surface-variant text-outline-variant'
                }`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {step.completed ? 'check' : 'schedule'}
                  </span>
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-auto md:ml-0 md:odd:text-right p-4 rounded-lg bg-surface-linen/50 border border-outline-variant/10 shadow-sm">
                  <h3 className={`font-label-md mb-1 ${step.current ? 'text-forest-green' : step.completed ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step.status}</h3>
                  <p className="font-body-sm text-on-surface-variant mb-2">{step.time}</p>
                  {step.detail && <p className="font-body-sm text-on-surface">{step.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Support Alert */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 flex gap-4 items-start">
          <span className="material-symbols-outlined text-blue-600 shrink-0">info</span>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-blue-900 mb-1">Having trouble with your delivery?</h3>
            <p className="font-body-sm text-blue-800 mb-3">If your tracking hasn't updated in 3 days, or if your package was marked delivered but you haven't received it, let us know.</p>
            <Link to="/support-requests" className="font-label-md text-blue-700 hover:underline">Contact Support</Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TrackOrder;
