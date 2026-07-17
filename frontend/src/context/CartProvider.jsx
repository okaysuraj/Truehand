import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCartItems((items) => {
      const exists = items.find(i => i.id === product.id);
      if (exists) return items.map(i => i.id === product.id ? {...i, quantity: i.quantity + qty} : i);
      return [...items, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id) => setCartItems(items => items.filter(i => i.id !== id));
  const updateQuantity = (id, qty) => setCartItems(items => items.map(i => i.id === id ? {...i, quantity: qty} : i));
  const clearCart = () => setCartItems([]);
  const getTotal = () => cartItems.reduce((s, i) => s + (i.price * (i.quantity||1)), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
