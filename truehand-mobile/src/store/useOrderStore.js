import { create } from 'zustand';
import { orderService } from '../services/orderService';
import { useCartStore } from './useCartStore';

export const useOrderStore = create((set, get) => ({
  orders: [],
  isLoadingOrders: false,
  errorOrders: null,

  fetchUserOrders: async () => {
    set({ isLoadingOrders: true, errorOrders: null });
    try {
      const data = await orderService.getUserOrders();
      set({ orders: data, isLoadingOrders: false });
    } catch (error) {
      set({ errorOrders: error.message, isLoadingOrders: false });
    }
  },

  currentOrder: null,
  isCreatingOrder: false,
  createOrderError: null,
  
  checkoutData: {
    address: null,
    paymentMethod: null,
  },

  setCheckoutData: (data) => {
    set((state) => ({
      checkoutData: { ...state.checkoutData, ...data }
    }));
  },

  createOrder: async () => {
    set({ isCreatingOrder: true, createOrderError: null });
    try {
      const cartItems = useCartStore.getState().cartItems;
      const totalAmount = useCartStore.getState().getTotal();
      const checkoutData = get().checkoutData;
      
      const payload = {
        totalAmount,
        status: 'PENDING',
        shippingAddress: checkoutData.address?.street || '123 Test St',
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const order = await orderService.createOrder(payload);
      set({ currentOrder: order, isCreatingOrder: false });
      
      // Clear cart on success
      useCartStore.getState().clearCart();
      return order;
    } catch (error) {
      set({ createOrderError: error.message, isCreatingOrder: false });
      throw error;
    }
  },

  cancelOrder: async (id, reason) => {
    try {
      const updatedOrder = await orderService.cancelOrder(id, reason);
      // Update in local store
      set(state => ({
        orders: state.orders.map(o => o.id === id ? updatedOrder : o),
        currentOrder: state.currentOrder?.id === id ? updatedOrder : state.currentOrder
      }));
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  },

  requestReturn: async (id, payload) => {
    try {
      const updatedOrder = await orderService.requestReturn(id, payload);
      set(state => ({
        orders: state.orders.map(o => o.id === id ? updatedOrder : o),
        currentOrder: state.currentOrder?.id === id ? updatedOrder : state.currentOrder
      }));
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  },

  reportIssue: async (id, payload) => {
    try {
      const response = await orderService.reportIssue(id, payload);
      return response;
    } catch (error) {
      throw error;
    }
  }
}));
