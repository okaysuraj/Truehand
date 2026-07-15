import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, qty = 1) => {
        set((state) => {
          const items = state.cartItems;
          const exists = items.find((i) => i.id === product.id);
          if (exists) {
            return {
              cartItems: items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return {
            cartItems: [...items, { ...product, quantity: qty }],
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, qty) => {
        set((state) => ({
          cartItems: state.cartItems.map((i) =>
            i.id === id ? { ...i, quantity: qty } : i
          ),
        }));
      },

      clearCart: () => set({ cartItems: [] }),

      getTotal: () => {
        return get().cartItems.reduce(
          (s, i) => s + (i.price || 0) * (i.quantity || 1),
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
