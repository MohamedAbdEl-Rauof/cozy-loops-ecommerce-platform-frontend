import apiClient from '@/lib/apiClient';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const paymentService = {
  getOrderForPayment: async (orderId: string) => {
    try {
      const response = await apiClient.get(`/api/orders/${orderId}/payment`);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(apiError.response?.data?.message || 'Failed to fetch order for payment');
    }
  },

  createPaymentIntent: async (data: { orderId: string }) => {
    try {
      const response = await apiClient.post('/api/payment/create-intent', data);
      return response.data.data; 
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(apiError.response?.data?.message || 'Failed to create payment intent');
    }
  },

  verifyPayment: async (data: { paymentIntentId: string }) => {
    try {
      const response = await apiClient.post('/api/payment/verify', data);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(apiError.response?.data?.message || 'Failed to verify payment');
    }
  }
};