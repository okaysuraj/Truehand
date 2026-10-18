import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { Alert } from 'react-native';
import { cartReference, cartIdentity } from '../../../shared/cart-contract';
let authenticatedOwner = null;
let pending = Promise.resolve();
export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      error: null,
      syncForUser: async (userId) => {
        authenticatedOwner = userId;
        set({
          cartItems: [],
          error: null,
        });
        if (!userId) return;
        try {
          const res = await api.get('/cart');
          if (authenticatedOwner === userId)
            set({
              cartItems: res.data,
            });
        } catch (error) {
          if (authenticatedOwner === userId)
            set({
              error: error.response?.data?.error || 'Unable to load your cart.',
            });
        }
      },
      save: (method, url, body) => {
        const userId = authenticatedOwner;
        pending = pending.then(async () => {
          if (authenticatedOwner !== userId) return false;
          try {
            const res = await api[method](url, body);
            if (authenticatedOwner === userId)
              set({
                cartItems: method === 'delete' && url === '/cart' ? [] : res.data,
                error: null,
              });
            return true;
          } catch (error) {
            const message =
              error.response?.data?.error || 'Unable to save your cart. Please retry.';
            if (authenticatedOwner === userId) {
              set({
                error: message,
              });
              Alert.alert('Cart', message);
            }
            return false;
          }
        });
        return pending;
      },
      addToCart: (product, qty = 1) => {
        const reference = cartReference(product);
        const id = cartIdentity(product);
        if (!Number.isInteger(qty) || qty < 1 || qty > 1000) return false;
        if (authenticatedOwner)
          return get().save('post', `/cart/items/${reference.productId}`, {
            quantity: qty,
            variantId: reference.variantId,
          });
        if (!Number.isInteger(product.stockQuantity) || product.stockQuantity < 1) return false;
        set((state) => {
          const items = state.cartItems;
          const exists = items.find((i) => i.id === id);
          if (exists) {
            return {
              cartItems: items.map((i) =>
                i.id === id
                  ? {
                      ...i,
                      quantity: Math.min(i.stockQuantity, 1000, i.quantity + qty),
                    }
                  : i,
              ),
            };
          }
          return {
            cartItems: [
              ...items,
              {
                ...product,
                ...reference,
                id,
                quantity: Math.min(product.stockQuantity, qty),
              },
            ],
          };
        });
      },
      removeFromCart: (id) => {
        const reference = cartReference(id);
        if (authenticatedOwner)
          return get().save(
            'delete',
            `/cart/items/${reference.productId}${reference.variantId ? '?variantId=' + reference.variantId : ''}`,
          );
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.id !== id),
        }));
      },
      updateQuantity: (id, qty) => {
        if (!Number.isInteger(qty) || qty < 1 || qty > 1000) return false;
        const reference = cartReference(id);
        if (authenticatedOwner)
          return get().save('put', `/cart/items/${reference.productId}`, {
            quantity: qty,
            variantId: reference.variantId,
          });
        set((state) => ({
          cartItems: state.cartItems.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity: Math.min(i.stockQuantity, qty),
                }
              : i,
          ),
        }));
      },
      clearCart: () =>
        authenticatedOwner
          ? get().save('delete', '/cart')
          : set({
              cartItems: [],
            }),
      getTotal: () => {
        return get().cartItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
      },
    }),
    {
      name: 'cart-storage',
      version: 2,
      migrate: () => ({
        cartItems: [],
      }),
      storage: createJSONStorage(() => AsyncStorage),
      partialize: () => ({}),
    },
  ),
);
