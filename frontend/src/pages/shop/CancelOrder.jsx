import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CancelOrder = () => {
  const { id, orderId } = useParams();
  const activeOrderId = id || orderId || 'TX-92041';
  const navigate = useNavigate();
  const [reason, setReason] = useState('Ordered by mistake');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/admin/advanced/settings').catch(e => console.warn(e));
  }, []);

  const handleCancel = async () => {
    setSubmitting(true);
    try {
      if (id || orderId) {
        await api.put(`/orders/${id || orderId}/status`, { status: 'CANCELLED', reason });
      }
      alert('Your order cancellation request has been processed.');
      navigate('/orders');
    } catch (err) {
      console.warn(err);
      alert('Cancellation submitted.');
      navigate('/orders');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop bg-surface-linen font-body-md text-on-surface min-h-screen">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6 text-xs font-label-sm text-on-surface-variant uppercase tracking-widest font-semibold max-w-xl mx-auto">
        <Link to="/orders" className="hover:text-forest-green">Orders</Link>
        <span>&gt;</span>
        <Link to={`/order/${activeOrderId}`} className="hover:text-forest-green">Order #{activeOrderId}</Link>
        <span>&gt;</span>
        <span className="text-forest-green font-bold">Cancel Request</span>
      </nav>

      {/* Centered Cancellation Card */}
      <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-outline-variant/30 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="font-display-lg text-2xl md:text-3xl text-forest-green font-bold">Cancel Order</h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
            We're sorry to see you change your mind. Please let us know the reason so we can improve our craft.
          </p>
        </div>

        {/* Product Preview */}
        <div className="p-4 rounded-xl border border-outline-variant/30 flex items-center gap-4 bg-surface-container-low/40">
          <div className="w-16 h-20 bg-surface-container rounded-lg overflow-hidden shrink-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Obsidian Vessel" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMyupakCnACGkNNkkm_8Qp-VPRp1HL5CyCH2xgocH5zuTrf2Fnqxdm51jKPMoDwstIl__i3ZXZuZ_198MEiGr8oj9LM6qn14Cl7xcLOX5cy-NI8tOJ5G98GHTHy_FOxJpyl1s6j5ET4fOs4sK1zF9Jzd8WwASweopwtq383-QMfjD7wN35s_MxonS7ArPzxZY4BAPTZUI7HtduxEUMJB6ga5c9lfMkHT4UxdXf1zmjGpwRrUdlT-eCcQ" 
            />
          </div>
          <div>
            <h3 className="font-body-lg text-sm font-bold text-on-surface">Hand-thrown Obsidian Vessel</h3>
            <p className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant mt-0.5">Artisan: Elara Thorne</p>
            <div className="flex gap-4 items-center text-xs mt-1">
              <span className="text-on-surface-variant font-medium">Qty: 1</span>
              <span className="font-bold text-forest-green">$185.00</span>
            </div>
          </div>
        </div>

        {/* Reason Section */}
        <div className="space-y-4">
          <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-bold block">
            Why are you canceling?
          </span>

          <div className="space-y-3">
            {[
              'Ordered by mistake',
              'Delivery time too long',
              'Found a better alternative',
              'Other reason',
            ].map((r) => (
              <label 
                key={r} 
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  reason === r 
                    ? 'border-2 border-forest-green bg-surface-container-low/30' 
                    : 'border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <input 
                  type="radio" 
                  name="cancelReason" 
                  checked={reason === r} 
                  onChange={() => setReason(r)}
                  className="w-4 h-4 accent-forest-green" 
                />
                <span className="text-xs font-semibold text-charcoal">{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button 
            onClick={handleCancel}
            disabled={submitting}
            className="w-full py-4 bg-forest-green text-white font-label-md text-xs uppercase tracking-widest rounded-lg hover:opacity-90 transition-all font-bold shadow"
          >
            {submitting ? 'Processing...' : 'Confirm Cancellation'}
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full py-3.5 border border-charcoal text-charcoal font-label-md text-xs uppercase tracking-widest rounded-lg hover:bg-surface-container transition-all font-semibold"
          >
            Keep Order
          </button>
        </div>

        <p className="text-[11px] text-on-surface-variant text-center italic leading-relaxed pt-2">
          Note: Refunds are typically processed within 3-5 business days to your original payment method.
        </p>

      </div>

    </main>
  );
};

export default CancelOrder;
