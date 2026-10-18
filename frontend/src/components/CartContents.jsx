import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartProvider';
import { useAuth } from '../context/AuthProvider';
import api from '../services/api';
import { formatValue } from '../../../shared/feature-contract';
export default function CartContents() {
  const { cartItems, updateQuantity, removeFromCart, getTotal, error } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  async function save(item) {
    if (!user) {
      navigate('/login');
      return;
    }
    setBusy(true);
    setNotice('');
    try {
      await api.post(`/account/lists/saved/${item.productId ?? item.id}`);
      const removed = await removeFromCart(item.id);
      setNotice(
        removed === false
          ? 'Saved for later. The cart item could not be removed; please retry.'
          : 'Saved for later.',
      );
    } catch (failure) {
      setNotice(failure.response?.data?.error || 'Unable to save for later. Please retry.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-4xl font-display-lg text-forest-green">Your cart</h1>
      {error && <p role="alert">{error}</p>}
      {notice && <p role="status">{notice}</p>}
      {!cartItems.length && <p>Your cart is empty.</p>}
      {cartItems.map((item) => (
        <article className="border-b py-5 space-y-3" key={item.id}>
          {item.imageUrl && (
            <img className="h-48 object-contain" src={item.imageUrl} alt={item.name} />
          )}
          <Link className="block underline" to={`/product/${item.productId ?? item.id}`}>
            {item.name}
          </Link>
          {item.sellerName && <p>{item.sellerName}</p>}
          {item.variantId && (
            <p>
              {[item.size, item.color, item.variantSku || item.sku].filter(Boolean).join(' · ')}
            </p>
          )}
          <p>{formatValue(item.price, 'money')}</p>
          <label>
            Quantity
            <input
              className="border p-2 ml-3"
              type="number"
              min="1"
              max={Math.min(1000, item.stockQuantity)}
              value={item.quantity}
              disabled={busy}
              onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
            />
          </label>
          <div className="flex gap-4">
            <button className="border p-3" disabled={busy} onClick={() => save(item)}>
              Save for later
            </button>
            <button className="border p-3" disabled={busy} onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </article>
      ))}
      <p>Subtotal: {formatValue(getTotal(), 'money')}</p>
      <p>Checkout confirms the current stock, prices and total.</p>
      <Link className="block underline" to="/products">
        Browse products
      </Link>
      {cartItems.length > 0 && (
        <Link className="block border p-3" to="/checkout">
          Proceed to checkout
        </Link>
      )}
    </main>
  );
}
