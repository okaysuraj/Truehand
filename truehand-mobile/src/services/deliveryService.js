import api from './api';

export const deliveryService = {
  getDelivery: async (orderId) => {
    const response = await api.get(`/deliveries/${orderId}`);
    return response.data;
  },

  submitKYC: async (userId, kycData) => {
    const response = await api.post(`/delivery-personnel/${userId}/kyc`, kycData);
    return response.data;
  },

  assignDelivery: async (orderId, deliveryBoyId) => {
    const response = await api.post(`/deliveries/${orderId}/assign/${deliveryBoyId}`);
    return response.data;
  },

  getDeliveriesByPartner: async (deliveryBoyId) => {
    const response = await api.get(`/deliveries/partner/${deliveryBoyId}`);
    return response.data;
  },

  startDelivery: async (orderId) => {
    const response = await api.post(`/deliveries/${orderId}/start`);
    return response.data;
  },

  updateLocation: async (orderId, latitude, longitude, accuracy = 5.0) => {
    const response = await api.post(`/deliveries/${orderId}/location?latitude=${latitude}&longitude=${longitude}&accuracy=${accuracy}`);
    return response.data;
  },

  completeDelivery: async (orderId) => {
    const response = await api.post(`/deliveries/${orderId}/complete`);
    return response.data;
  },

  simulateLocation: async (orderId) => {
    const response = await api.post(`/deliveries/${orderId}/simulate`);
    return response.data;
  }
};
