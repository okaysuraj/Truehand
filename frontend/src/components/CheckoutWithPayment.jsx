import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../pages/shop/Checkout';
export default function CheckoutWithPayment() {
  const [stripePromise] = React.useState(() =>
    import.meta.env.VITE_STRIPE_PUBLIC_KEY
      ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY).catch(() => null)
      : null,
  );
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
