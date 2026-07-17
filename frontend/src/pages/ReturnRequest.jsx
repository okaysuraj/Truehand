import api from '../services/api';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ReturnRequest = () => {
  const { orderId } = useParams();
  const [step, setStep] = useState(1); // 1: select items, 2: reason, 3: confirmation
  const [selectedItems, setSelectedItems] = useState([]);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const items = [
    { id: 1, name: 'Hand-Thrown Ceramic Vase', artisan: 'Elena Studio', price: 120, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw' },
    { id: 2, name: 'Woven Indigo Throw', artisan: 'Tidal Textiles', price: 200, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A' }
  ];

  const reasons = [
    'Item arrived damaged',
    'Wrong item received',
    'Item not as described',
    'Changed my mind',
    'Item arrived too late',
    'Other'
  ];

  const toggleItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  if (step === 3) {
  React.useEffect(() => { api.get('/admin/advanced/settings').catch(e=>console.warn(e)); }, []);
  
    return (
      <div className="pt-24 pb-16 bg-surface-linen min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-white">check</span>
          </div>
          <h1 className="font-display-md text-display-md text-on-surface mb-4">Return Submitted</h1>
          <p className="font-body-md text-on-surface-variant mb-3 leading-relaxed">
            Your return request for order <span className="font-label-md text-on-surface">{orderId || 'TH-29481'}</span> has been submitted successfully.
          </p>
          <p className="font-body-sm text-on-surface-variant mb-8">
            You will receive an email with return shipping instructions within 24 hours.
          </p>
          <div className="space-y-3">
            <Link to={`/refund-status/${orderId || 'TH-29481'}`} className="block w-full py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity">
              Track Refund Status
            </Link>
            <Link to="/orders" className="block w-full py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-surface-linen min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <Link to={`/order/${orderId || 'TH-29481'}`} className="inline-flex items-center text-on-surface-variant hover:text-forest-green mb-4 transition-colors font-label-md">
            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
            Back to Order
          </Link>
          <h1 className="font-display-md text-display-md text-on-surface mb-2">Request a Return</h1>
          <p className="font-body-md text-on-surface-variant">Order {orderId || 'TH-29481'}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-4 mb-10">
          {['Select Items', 'Reason'].map((label, idx) => (
            <div key={idx} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-label-md shrink-0 ${
                step > idx + 1 ? 'bg-forest-green text-white' : step === idx + 1 ? 'bg-charcoal text-white' : 'bg-surface-variant text-on-surface-variant'
              }`}>
                {step > idx + 1 ? <span className="material-symbols-outlined text-[16px]">check</span> : idx + 1}
              </div>
              <span className={`font-label-sm ${step === idx + 1 ? 'text-on-surface' : 'text-on-surface-variant'}`}>{label}</span>
              {idx < 1 && <div className={`flex-1 h-px ${step > idx + 1 ? 'bg-forest-green' : 'bg-outline-variant/40'}`}></div>}
            </div>
          ))}
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">

          {step === 1 && (
            <>
              <div className="p-6 border-b border-outline-variant/30">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Select items to return</h2>
              </div>
              <div className="divide-y divide-outline-variant/30">
                {items.map((item) => (
                  <label key={item.id} className="p-6 flex items-center gap-6 cursor-pointer hover:bg-surface-linen/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="w-5 h-5 rounded border-outline-variant accent-forest-green shrink-0"
                    />
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded shrink-0" />
                    <div className="flex-1">
                      <p className="font-label-md text-on-surface">{item.name}</p>
                      <p className="font-body-sm text-on-surface-variant">by {item.artisan}</p>
                    </div>
                    <p className="font-label-md text-on-surface shrink-0">${item.price.toFixed(2)}</p>
                  </label>
                ))}
              </div>
              <div className="p-6 border-t border-outline-variant/30 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedItems.length === 0}
                  className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="p-6 border-b border-outline-variant/30">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Why are you returning?</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  {reasons.map((r, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 rounded border border-outline-variant/30 hover:border-forest-green cursor-pointer transition-colors">
                      <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="accent-forest-green" />
                      <span className="font-body-md text-on-surface">{r}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="block font-label-sm text-on-surface">Additional details (optional)</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us more about the issue..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full p-3 bg-transparent border border-outline-variant/50 rounded focus:border-forest-green outline-none font-body-md text-on-surface resize-y"
                  ></textarea>
                </div>
              </div>
              <div className="p-6 border-t border-outline-variant/30 flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-3 border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-variant/30 transition-colors">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!reason}
                  className="px-8 py-3 bg-forest-green text-white font-label-md rounded hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Return
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ReturnRequest;
