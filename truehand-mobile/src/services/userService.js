import api from './api';

export const userService = {
  getWishlist: async (userId) => {
    const response = await api.get(`/wishlist/user/${userId}`);
    return response.data;
  },

  addToWishlist: async (userId, productId) => {
    const response = await api.post(`/wishlist/user/${userId}/product/${productId}`);
    return response.data;
  },

  removeFromWishlist: async (userId, productId) => {
    const response = await api.delete(`/wishlist/user/${userId}/product/${productId}`);
    return response.data;
  }
};
