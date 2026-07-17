import api from '../services/api';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const DeliveryDetails = () => {
  const { deliveryId } = useParams();
  const [otpVerified, setOtpVerified] = useState(false);

  const delivery = {
    id: deliveryId || 'DEL-4819',
    orderId: 'TH-29462',
    status: 'In Transit',
    customer: { name: 'Michael T.', phone: '+1 (555) 234-5678', address: '456 Market Street, Suite 200, Portland, OR 97204' },
    pickup: { name: 'Tidal Textiles HQ', address: '100 Warehouse Way, Portland, OR 97201' },
    items: [{ name: 'Woven Indigo Throw', qty: 1 }],
    otp: '4829',
    distance: '5.8 km',
    estimatedTime: '25 min'
  };
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Link to="/delivery/assigned" className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>Back to Deliveries
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-display-md text-display-md text-on-surface mb-1">Delivery {delivery.id}</h1>
              <p className="font-body-md text-on-surface-variant">Order {delivery.orderId}</p>
            </div>
            <span className="bg-blue-50 text-blue-700 border border-blue-200 font-label-md px-3 py-1 rounded">{delivery.status}</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Route Info */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-5">Route Details</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-forest-green border-2 border-forest-green"></div>
                  <div className="w-0.5 h-12 bg-outline-variant/40"></div>
                </div>
                <div className="-mt-1">
                  <p className="font-label-sm text-forest-green mb-1">PICKUP</p>
                  <p className="font-label-md text-on-surface">{delivery.pickup.name}</p>
                  <p className="font-body-sm text-on-surface-variant">{delivery.pickup.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-500"></div>
                </div>
                <div className="-mt-1">
                  <p className="font-label-sm text-red-500 mb-1">DROP-OFF</p>
                  <p className="font-label-md text-on-surface">{delivery.customer.name}</p>
                  <p className="font-body-sm text-on-surface-variant">{delivery.customer.address}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-6 pt-4 border-t border-outline-variant/20 font-body-sm text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">straighten</span>{delivery.distance}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span>Est. {delivery.estimatedTime}</span>
            </div>
          </div>

          {/* Items */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Package Contents</h2>
            {delivery.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <p className="font-body-md text-on-surface">{item.name}</p>
                <p className="font-label-sm text-on-surface-variant">Qty: {item.qty}</p>
              </div>
            ))}
          </div>

          {/* Customer Contact */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Customer Contact</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-label-md text-on-surface">{delivery.customer.name}</p>
                <p className="font-body-sm text-on-surface-variant">{delivery.customer.phone}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green hover:bg-forest-green/20 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green hover:bg-forest-green/20 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* OTP Verification */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">Delivery Verification</h2>
            <p className="font-body-sm text-on-surface-variant mb-4">Enter the OTP provided by the customer to confirm delivery.</p>
            {!otpVerified ? (
              <form onSubmit={(e) => { e.preventDefault(); setOtpVerified(true); }} className="flex gap-3">
                <input type="text" maxLength="4" placeholder="Enter 4-digit OTP" className="flex-1 p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface text-center tracking-[0.5em] font-mono" />
                <button type="submit" className="px-6 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">Verify</button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-forest-green/10 border border-forest-green/20 rounded-lg p-4">
                <span className="material-symbols-outlined text-forest-green">check_circle</span>
                <p className="font-label-md text-forest-green">Delivery verified successfully!</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/delivery/proof-upload" className="flex-1 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>Upload Proof of Delivery
            </Link>
            <button className="flex-1 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">navigation</span>Navigate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
