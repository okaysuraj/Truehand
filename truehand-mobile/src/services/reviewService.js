import api from './api';

export const reviewService = {
  getReviewsByProduct: async (productId) => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  },

  addReview: async (reviewDTO) => {
    const response = await api.post('/reviews', reviewDTO);
    return response.data;
  }
};
