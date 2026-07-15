import { create } from 'zustand';
import { deliveryService } from '../services/deliveryService';
import { useAuthStore } from './useAuthStore';

export const useDeliveryStore = create((set, get) => ({
  deliveries: [],
  activeDelivery: null,
  isLoading: false,
  error: null,

  fetchDeliveries: async () => {
    const deliveryBoyId = useAuthStore.getState().user?.id;
    if (!deliveryBoyId) return;
    
    set({ isLoading: true, error: null });
    try {
      const data = await deliveryService.getDeliveriesByPartner(deliveryBoyId);
      set({ deliveries: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  startDelivery: async (orderId) => {
    try {
      await deliveryService.startDelivery(orderId);
      set(state => ({
        deliveries: state.deliveries.map(d => 
          d.orderId === orderId ? { ...d, status: 'IN_TRANSIT' } : d
        )
      }));
    } catch (error) {
      console.error('Failed to start delivery:', error);
    }
  },

  completeDelivery: async (orderId) => {
    try {
      await deliveryService.completeDelivery(orderId);
      set(state => ({
        deliveries: state.deliveries.map(d => 
          d.orderId === orderId ? { ...d, status: 'DELIVERED' } : d
        )
      }));
    } catch (error) {
      console.error('Failed to complete delivery:', error);
    }
  },

  setActiveDelivery: (delivery) => {
    set({ activeDelivery: delivery });
  }
}));
