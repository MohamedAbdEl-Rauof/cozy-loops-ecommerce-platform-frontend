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
  /**
   * Get order by order number
   */
  async getOrderByNumber(orderNumber: string): Promise<OrderResponse> {
    try {
      const response = await apiClient.get(`/api/orders/number/${orderNumber}`);
      return response.data;
    } catch (error) {
      console.error('Get order by number error:', error);
      throw error;
    }
  },

  /**
   * Get all user orders with pagination
   */
  async getUserOrders(page: number = 1, limit: number = 10): Promise<OrdersResponse> {
    try {
      const response = await apiClient.get(`/orders?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Get user orders error:', error);
      throw error;
    }
  },

  /**
   * Get order by ID
   */
  async getOrderById(orderId: string): Promise<OrderResponse> {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Get order by ID error:', error);
      throw error;
    }
  },

  /**
   * Cancel order
   */
  async cancelOrder(orderId: string): Promise<OrderResponse> {
    try {
      const response = await apiClient.put(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Cancel order error:', error);
      throw error;
    }
  },

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, orderStatus: string): Promise<OrderResponse> {
    try {
      const response = await apiClient.put(`/orders/${orderId}`, { orderStatus });
      return response.data;
    } catch (error) {
      console.error('Update order status error:', error);
      throw error;
    }
  }
};

// Default export as well for flexibility
export default orderService;