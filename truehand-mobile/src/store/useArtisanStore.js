import { create } from 'zustand';
import { artisanService } from '../services/artisanService';
import { productService } from '../services/productService';
import { useAuthStore } from './useAuthStore';

export const useArtisanStore = create((set, get) => ({
  stats: null,
  isLoadingStats: false,
  errorStats: null,

  fetchStats: async () => {
    const sellerId = useAuthStore.getState().user?.id;
    if (!sellerId) return;
    set({ isLoadingStats: true, errorStats: null });
    try {
      const data = await artisanService.getStats(sellerId);
      set({ stats: data, isLoadingStats: false });
    } catch (error) {
      set({ errorStats: error.message, isLoadingStats: false });
    }
  },

  orders: [],
  isLoadingOrders: false,
  errorOrders: null,

  fetchOrders: async () => {
    const sellerId = useAuthStore.getState().user?.id;
    if (!sellerId) return;
    set({ isLoadingOrders: true, errorOrders: null });
    try {
      const data = await artisanService.getOrders(sellerId);
      set({ orders: data, isLoadingOrders: false });
    } catch (error) {
      set({ errorOrders: error.message, isLoadingOrders: false });
    }
  },

  updateOrderStatus: async (orderNumber, status) => {
    const sellerId = useAuthStore.getState().user?.id;
    if (!sellerId) return;
    try {
      const updatedOrder = await artisanService.updateOrderStatus(sellerId, orderNumber, status);
      set((state) => ({
        orders: state.orders.map(o => o.orderNumber === orderNumber ? updatedOrder : o)
      }));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  },

  products: [],
  isLoadingProducts: false,
  errorProducts: null,

  fetchProducts: async () => {
    const sellerId = useAuthStore.getState().user?.id;
    if (!sellerId) return;
    set({ isLoadingProducts: true, errorProducts: null });
    try {
      const data = await productService.getProductsBySeller(sellerId);
      // Backend might return page or list
      set({ products: data.content || data, isLoadingProducts: false });
    } catch (error) {
      set({ errorProducts: error.message, isLoadingProducts: false });
    }
  },

  addProduct: async (productData) => {
    try {
      const newProduct = await productService.createProduct(productData);
      set((state) => ({ products: [...state.products, newProduct] }));
      return newProduct;
    } catch (error) {
      console.error('Failed to add product:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const updatedProduct = await productService.updateProduct(id, productData);
      set((state) => ({
        products: state.products.map(p => p.id === id ? updatedProduct : p)
      }));
      return updatedProduct;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      await productService.deleteProduct(id);
      set((state) => ({
        products: state.products.filter(p => p.id !== id)
      }));
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  }
}));
