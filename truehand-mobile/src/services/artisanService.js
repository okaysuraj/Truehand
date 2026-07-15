import api from './api';

export const artisanService = {
  getStats: async (sellerId) => {
    const response = await api.get(`/seller/${sellerId}/stats`);
    return response.data; // Expected format: SellerStatsDTO
  },

  getOrders: async (sellerId) => {
    const response = await api.get(`/seller/${sellerId}/orders`);
    return response.data; // Expected format: List<SellerOrderItemDTO>
  },

  updateOrderStatus: async (sellerId, orderNumber, status) => {
    const response = await api.put(`/seller/${sellerId}/orders/${orderNumber}/status`, { status });
    return response.data; // Expected format: SellerOrderItemDTO
  },

  submitKYC: async (sellerId, profileData) => {
    const response = await api.post(`/seller/${sellerId}/kyc`, profileData);
    return response.data;
  },

  getKYC: async (sellerId) => {
    const response = await api.get(`/seller/${sellerId}/kyc`);
    return response.data;
  }
};
