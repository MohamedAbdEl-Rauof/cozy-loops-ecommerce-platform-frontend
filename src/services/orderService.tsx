import apiClient from '@/lib/apiClient';

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
  price: number;
  totalPrice: number;
  variant?: any;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  paymentIntentId?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  success: boolean;
  order: Order;
  message?: string;
}

export interface OrdersResponse {
  success: boolean;
  count: number;
  totalOrders: number;
  totalPages: number;
  currentPage: number;
  orders: Order[];
}

export const orderService = {
  getOrderByNumber: async (orderNumber: string): Promise<OrderResponse> => {
    try {
      const response = await apiClient.get(`/api/orders/number/${orderNumber}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch order by number:', error);
      throw new Error('Could not retrieve order details');
    }
  },

  getUserOrders: async (page = 1, limit = 10): Promise<OrdersResponse> => {
    try {
      const response = await apiClient.get(`/orders?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
      throw new Error('Could not fetch user orders');
    }
  },

};

export default orderService;
