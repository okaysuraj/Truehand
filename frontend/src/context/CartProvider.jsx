import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthProvider';
import api from '../services/api';
import { cartReference, cartIdentity } from '../../../shared/cart-contract';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const user = useAuth()?.user;
  const owner = useRef(user?.id);
  owner.current = user?.id;
  const queue = useRef(Promise.resolve());
  useEffect(() => {
    let active = true;
    setCartItems([]);
    setError('');
    if (user?.id)
      api
        .get('/cart')
        .then((res) => {
          if (active) setCartItems(res.data);
        })
        .catch((err) => {
          if (active) setError(err.response?.data?.error || 'Unable to load your cart.');
        });
    return () => {
      active = false;
    };
  }, [user?.id]);
  const persist = (method, url, body) => {
    const userId = user?.id;
    queue.current = queue.current.then(async () => {
      if (owner.current !== userId) return;
      try {
        const res = await api[method](url, body);
        if (owner.current === userId) {
          setCartItems(method === 'delete' && url === '/cart' ? [] : res.data);
          setError('');
        }
        return true;
      } catch (err) {
        if (owner.current === userId) {
          const message = err.response?.data?.error || 'Unable to save your cart. Please retry.';
          setError(message);
          window.alert(message);
        }
        return false;
      }
    });
    return queue.current;
  };
  const addToCart = (product, qty = 1) => {
    if (!Number.isInteger(qty) || qty < 1 || qty > 1000) return false;
    const reference = cartReference(product);
    const id = cartIdentity(product);
    if (user?.id)
      return persist('post', `/cart/items/${reference.productId}`, {
        quantity: qty,
        variantId: reference.variantId,
      });
    if (!Number.isInteger(product.stockQuantity) || product.stockQuantity < 1) return false;
    setCartItems((items) => {
      const exists = items.find((i) => i.id === id);
      if (exists)
        return items.map((i) =>
          i.id === id
            ? {
                ...i,
                quantity: Math.min(i.stockQuantity, 1000, i.quantity + qty),
              }
            : i,
        );
      return [
        ...items,
        {
          ...product,
          ...reference,
          id,
          quantity: Math.min(product.stockQuantity, qty),
        },
      ];
    });
  };
  const removeFromCart = (id) => {
    const reference = cartReference(id);
    return user?.id
      ? persist(
          'delete',
          `/cart/items/${reference.productId}${reference.variantId ? '?variantId=' + reference.variantId : ''}`,
        )
      : setCartItems((items) => items.filter((i) => i.id !== id));
  };
  const updateQuantity = (id, qty) => {
    if (!Number.isInteger(qty) || qty < 1 || qty > 1000) return false;
    const reference = cartReference(id);
    return user?.id
      ? persist('put', `/cart/items/${reference.productId}`, {
          quantity: qty,
          variantId: reference.variantId,
        })
      : setCartItems((items) =>
          items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity: Math.min(i.stockQuantity, qty),
                }
              : i,
          ),
        );
  };
  const clearCart = () => (user?.id ? persist('delete', '/cart') : setCartItems([]));
  const refreshCart = async () => {
    const userId = user?.id;
    await queue.current;
    if (!userId) return;
    const { data } = await api.get('/cart');
    if (owner.current === userId) setCartItems(data);
  };
  const getTotal = () => cartItems.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        getTotal,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
