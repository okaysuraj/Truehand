import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data; // Expected format: OrderDTO
  },

  getOrder: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data; // Expected format: OrderDTO
  },

  getUserOrders: async () => {
    const response = await api.get('/orders');
    return response.data; // Expected format: List<OrderDTO>
  },

  cancelOrder: async (id, reason) => {
    const response = await api.post(`/orders/${id}/cancel`, { reason });
    return response.data;
  },

  requestReturn: async (id, payload) => {
    // payload = { reason, method, comments }
    const response = await api.post(`/orders/${id}/returns`, payload);
    return response.data;
  },

  reportIssue: async (id, payload) => {
    // payload = { subject, description }
    const response = await api.post(`/orders/${id}/issues`, payload);
    return response.data;
  }
};
