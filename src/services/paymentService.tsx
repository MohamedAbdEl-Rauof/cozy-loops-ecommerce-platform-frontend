import apiClient from '@/lib/apiClient';

interface CreatePaymentIntentData {
  orderId: string;
}

interface VerifyPaymentData {
  paymentIntentId: string;
}

export const paymentService = {
  createPaymentIntent: async (data: CreatePaymentIntentData) => {
    try {
      const response = await apiClient.post('/api/payment/checkout', data);
      return response.data.data;
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      throw new Error('Failed to create payment intent');
    }
  },

  verifyPayment: async (data: VerifyPaymentData) => {
    try {
      const response = await apiClient.post('/api/payment/verify', data);
      return response.data;
    } catch (error) {
      console.error('Payment verification failed:', error);
      throw new Error('Failed to verify payment');
    }
  }
};
