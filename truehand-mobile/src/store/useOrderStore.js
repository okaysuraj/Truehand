import { create } from 'zustand';
import { orderService } from '../services/orderService';
import { useCartStore } from './useCartStore';
import { useAuthStore } from './useAuthStore';
import * as Crypto from 'expo-crypto';
import api from '../services/api';
import { createOrderState } from '../../../shared/order-state';
export const useOrderStore = create(
  createOrderState({
    orderService,
    cart: useCartStore,
    auth: useAuthStore,
    api,
    uuid: () => Crypto.randomUUID(),
  }),
);
useAuthStore.subscribe((state, previous) => {
  if (state.user !== previous.user) useOrderStore.getState().resetForAccount();
});
