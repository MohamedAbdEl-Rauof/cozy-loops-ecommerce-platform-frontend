import apiClient from '@/lib/apiClient';

interface CheckoutData {
  userId?: string;
  cartId?: string;
  amount?: number;
}

interface VerifyPaymentData {
  orderNumber: string;
  paymentIntentId: string;
}

export const paymentService = {
  createCheckout: async (data: CheckoutData) => {
    try {
      const response = await apiClient.post('/api/payment/checkout', data);
      return response.data.data;
    } catch (error) {
      console.error('Checkout creation failed:', error);
      throw new Error('Failed to create checkout session');
    }
  },

  verifyPayment: async (data: VerifyPaymentData) => {
    try {
      const response = await apiClient.post('/api/payment/verify', data);
      return response.data.data;
    } catch (error) {
      console.error('Payment verification failed:', error);
      throw new Error('Failed to verify payment');
    }
  }
};