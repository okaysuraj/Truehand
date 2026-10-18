import React, { useState, useRef } from 'react';
import { useCart } from '../../context/CartProvider';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { checkoutLines, checkoutFingerprint } from '../../../../shared/cart-contract';
import { createPromoQuoteHook } from '../../../../shared/promo-quote';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
const usePromoQuote = createPromoQuoteHook(React, api);
const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, getTotal, refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const resumeOrder = useLocation().state?.order;
  const [address, setAddress] = useState('');
  const [addressId, setAddressId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const checkoutKey = useRef(crypto.randomUUID());
  const pendingOrder = useRef(resumeOrder || null);
  const [reservedOrder, setReservedOrder] = useState(resumeOrder || null);
  const [addresses, setAddresses] = useState([]);
  const promo = usePromoQuote(user?.id, cartItems);
  const promoCode = promo.code;
  const setPromoCode = promo.setCode;
  const promoDiscount = promo.discount;
  const promoMessage =
    promo.error || (promo.quote ? 'Offer checked. Discount: INR ' + promoDiscount.toFixed(2) : '');
  const [loading, setLoading] = useState(false);
  const [isGift, setIsGift] = useState(false);
  React.useEffect(() => {
    if (user) {
      api
        .get(`/addresses/user/${user.id}`)
        .then((res) => {
          setAddresses(res.data);
          const def =
            res.data.find((a) => a.id === resumeOrder?.addressId) ||
            res.data.find((a) => a.isDefault) ||
            res.data[0];
          if (def) {
            setAddressId(def.id);
            setAddress(`${def.streetAddress}, ${def.city}, ${def.state} ${def.postalCode}`);
          }
        })
        .catch(() => setErrorMessage('Unable to load your saved addresses. Please retry.'));
    }
  }, [user]);
  const subtotal = getTotal();
  const total = Math.max(0, subtotal - promoDiscount);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (cartItems.length === 0 && !reservedOrder) {
    return (
      <div className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop text-center">
        <h2 className="font-headline-lg text-headline-lg text-forest-green mb-8">
          Your collection is empty
        </h2>
        <button
          onClick={() => navigate('/products')}
          className="px-8 py-4 bg-forest-green text-white font-label-md uppercase tracking-widest hover:bg-forest-green/90 transition-colors"
        >
          Explore Curated Pieces
        </button>
      </div>
    );
  }
  const handleApplyPromo = promo.apply;
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!addressId) {
      alert('Please select a saved delivery address');
      return;
    }
    if (!stripe || !elements) {
      alert('Stripe has not loaded yet.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      // Persist the pending order first; the server determines all prices and discounts.
      if (!pendingOrder.current) {
        const response = await api.post('/orders', {
          addressId,
          checkoutKey: checkoutKey.current,
          promoCode: promo.quote?.code || null,
          specialInstructions: isGift ? 'Gift order' : '',
          orderItems: checkoutLines(reservedOrder ? reservedOrder.orderItems : cartItems),
        });
        pendingOrder.current = response.data;
        setReservedOrder(response.data);
      }
      const fingerprint = checkoutFingerprint;
      if (
        !resumeOrder &&
        (pendingOrder.current.addressId !== addressId ||
          fingerprint(pendingOrder.current.orderItems) !== fingerprint(cartItems))
      )
        throw new Error(
          'Your selection changed. Cancel the reserved order before starting another checkout.',
        );
      const order = (await api.get('/orders/' + pendingOrder.current.id)).data;
      if (order.paymentStatus === 'PAID') {
        await refreshCart();
        navigate('/order-success?id=' + order.id);
        return;
      }
      if (
        Number(order.totalAmount) !== Number(total.toFixed(2)) &&
        !window.confirm(
          'The current order total is INR ' +
            Number(order.totalAmount).toFixed(2) +
            '. Continue with payment?',
        )
      )
        return;
      const { data: intentData } = await api.post('/payment/create-intent', {
        orderId: order.id,
      });

      // 2. Confirm Card Payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
          },
        },
      });
      if (error) {
        alert(`Payment failed: ${error.message}`);
        setLoading(false);
        return;
      }
      if (paymentIntent.status === 'succeeded') {
        const res = await api.post(`/payment/orders/${order.id}/confirm`);
        if (res.data.paymentStatus !== 'PAID') throw new Error('Payment verification is pending');
        await refreshCart();
        alert(`Order Placed Successfully! Order #${res.data.orderNumber}`);
        navigate(`/order-success?id=${res.data.id}`);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.error || err.message || 'Unable to complete checkout.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
      {errorMessage && (
        <p role="alert" className="text-error-red mb-4">
          {errorMessage}
        </p>
      )}
      {!import.meta.env.VITE_STRIPE_PUBLIC_KEY && (
        <p role="alert" className="text-error-red mb-4">
          Payments are currently unavailable.
        </p>
      )}
      {/* Multi-step Progress Indicator */}
      <div className="mb-section-gap max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="flex flex-col items-center z-10">
            <div className="w-10 h-10 rounded-full bg-forest-green text-white flex items-center justify-center mb-stack-sm">
              <span className="material-symbols-outlined text-[20px]">check</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface">Cart</span>
          </div>
          <div className="flex-1 h-[2px] bg-forest-green mx-4 -mt-6"></div>
          <div className="flex flex-col items-center z-10">
            <div className="w-10 h-10 rounded-full border-2 border-forest-green bg-white text-forest-green flex items-center justify-center mb-stack-sm ring-4 ring-forest-green/5">
              <span className="font-label-md">2</span>
            </div>
            <span className="font-label-md text-label-md text-forest-green font-bold">
              Checkout
            </span>
          </div>
          <div className="flex-1 h-[2px] bg-surface-container-highest mx-4 -mt-6"></div>
          <div className="flex flex-col items-center z-10">
            <div className="w-10 h-10 rounded-full border-2 border-surface-container-highest bg-white text-on-surface-variant flex items-center justify-center mb-stack-sm">
              <span className="font-label-md">3</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant">Success</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-gutter items-start">
        {/* Left Column: Form */}
        <div className="col-span-12 lg:col-span-8 space-y-stack-lg">
          {/* Shipping Address */}
          <section>
            <div className="mb-stack-lg border-b border-surface-container pb-stack-sm flex justify-between items-end">
              <h2 className="font-headline-md text-headline-md text-forest-green">
                1. Shipping Address
              </h2>
            </div>
            <div className="bg-surface border border-surface-container p-stack-lg rounded-sm">
              <textarea
                rows="3"
                value={address}
                readOnly
                placeholder="Select a saved delivery address"
                className="w-full bg-transparent border border-outline-variant p-4 font-body-md focus:outline-none focus:border-forest-green rounded-sm mb-4 resize-none"
                required
              />
              <Link to="/add-address" className="underline">
                Add delivery address
              </Link>
              {addresses.length > 0 && (
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">
                    Or select a saved address:
                  </p>
                  <select
                    value={addressId || ''}
                    onChange={(e) => {
                      const addr = addresses.find((a) => a.id === parseInt(e.target.value));
                      setAddressId(addr?.id || null);
                      setAddress(
                        addr
                          ? `${addr.streetAddress}, ${addr.city}, ${addr.state} ${addr.postalCode}`
                          : '',
                      );
                    }}
                    className="w-full bg-white border border-outline-variant p-3 font-body-md focus:outline-none focus:border-forest-green rounded-sm"
                  >
                    <option value="">-- Select Saved Address --</option>
                    {addresses.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.label} - {a.streetAddress}, {a.city}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </section>

          {/* Payment Method */}
          <section className="pt-stack-lg">
            <div className="mb-stack-lg border-b border-surface-container pb-stack-sm">
              <h2 className="font-headline-md text-headline-md text-forest-green">
                2. Payment Method
              </h2>
            </div>
            <div className="bg-surface border border-surface-container p-stack-lg rounded-sm">
              <div className="p-4 bg-white border border-outline-variant rounded-sm shadow-sm">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        fontFamily: '"Hanken Grotesk", sans-serif',
                        color: '#1b1c1b',
                        '::placeholder': {
                          color: '#989692',
                        },
                      },
                      invalid: {
                        color: '#ba1a1a',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </section>

          {/* Additional Options */}
          <section className="pt-stack-lg">
            <div className="flex items-center gap-stack-md p-stack-md bg-surface-container-low border border-dashed border-outline-variant rounded-sm">
              <span className="material-symbols-outlined text-forest-green">redeem</span>
              <div className="flex-1">
                <p className="font-label-md text-label-md text-on-surface">Is this a gift?</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">
                  We'll remove pricing from the invoice.
                </p>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isGift}
                    onChange={() => setIsGift(!isGift)}
                  />
                  <div
                    className={`block w-10 h-6 rounded-full transition-colors ${isGift ? 'bg-forest-green' : 'bg-surface-dim'}`}
                  ></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isGift ? 'transform translate-x-4' : ''}`}
                  ></div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="col-span-12 lg:col-span-4 sticky top-32 space-y-stack-lg">
          <div className="bg-white p-stack-lg border border-surface-container shadow-sm shadow-forest-green/5 rounded-sm">
            <h2 className="font-headline-md text-headline-md text-forest-green mb-stack-lg">
              Order Summary
            </h2>

            {/* Items Mini Preview */}
            <div className="space-y-stack-md mb-stack-lg pb-stack-lg border-b border-surface-container max-h-[300px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId ?? item.id}:${item.variantId ?? 0}`}
                  className="flex gap-stack-md"
                >
                  <div className="w-16 h-20 bg-surface-container flex-shrink-0 rounded-sm overflow-hidden">
                    <img
                      src={item.imageUrl || undefined}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1 flex-1">
                    <div>
                      <h4 className="font-label-md text-label-md text-forest-green leading-tight truncate w-[180px]">
                        {item.name}
                      </h4>
                      <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-label-md text-label-md text-forest-green">
                      INR {item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-stack-sm mb-stack-lg">
              <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span>INR {subtotal.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between font-body-md text-body-md text-error-red">
                  <span>Promo Discount</span>
                  <span>-INR {promoDiscount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-baseline pt-stack-md border-t border-forest-green/10 mb-stack-lg">
              <span className="font-headline-md text-headline-md text-forest-green">Total</span>
              <span className="font-display-lg text-[24px] text-forest-green font-bold">
                INR {Number(reservedOrder?.totalAmount ?? total).toFixed(2)}
              </span>
            </div>

            {reservedOrder && (
              <button
                disabled={loading}
                className="underline mb-4"
                onClick={async () => {
                  try {
                    await api.post(`/payment/orders/${reservedOrder.id}/cancel`);
                    pendingOrder.current = null;
                    setReservedOrder(null);
                    checkoutKey.current = crypto.randomUUID();
                    navigate('/checkout', {
                      replace: true,
                      state: null,
                    });
                  } catch (err) {
                    setErrorMessage(err.response?.data?.error || err.message);
                  }
                }}
              >
                Cancel reserved order
              </button>
            )}
            {/* CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading || !stripe}
              className="w-full bg-forest-green text-white py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-forest-green/90 transition-all active:scale-[0.98] shadow-lg shadow-forest-green/20 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Place Order & Pay'}
            </button>
            <div className="mt-stack-md flex items-center justify-center gap-2 text-on-surface-variant opacity-60">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span className="text-label-sm font-label-sm">Secure Encrypted Transaction</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="p-stack-lg bg-surface border border-surface-container rounded-sm">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
              Have a promo code?
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  disabled={!!reservedOrder || promo.busy}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 bg-white border border-surface-container px-3 py-2 text-label-sm focus:ring-1 focus:ring-forest-green focus:outline-none placeholder:text-outline-variant rounded-sm"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={!!reservedOrder || promo.busy || !promoCode.trim()}
                  className="px-4 py-2 border border-forest-green text-forest-green font-label-sm hover:bg-forest-green hover:text-white transition-all rounded-sm"
                >
                  Apply
                </button>
              </div>
            </label>
            {promoMessage && (
              <p
                className={`text-label-sm font-label-sm mt-2 ${promoDiscount > 0 ? 'text-on-primary-container' : 'text-error-red'}`}
              >
                {promoMessage}
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};
export default Checkout;
