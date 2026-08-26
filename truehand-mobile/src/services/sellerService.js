import api from './api';

export const sellerService = {
  // Submit KYC details for a seller
  submitKYC: async (sellerId, kycData) => {
    const response = await api.post(`/seller/${sellerId}/kyc`, kycData);
    return response.data; // Expected format: SellerProfileDTO
  },

  // Get seller stats (dashboard)
  getSellerStats: async (sellerId) => {
    const response = await api.get(`/seller/${sellerId}/stats`);
    return response.data;
  },
  
  // Get seller orders
  getSellerOrders: async (sellerId) => {
    const response = await api.get(`/seller/${sellerId}/orders`);
    return response.data;
  },

  // Get seller KYC profile
  getSellerProfile: async (sellerId) => {
    const response = await api.get(`/seller/${sellerId}/kyc`);
    return response.data;
  }
};
