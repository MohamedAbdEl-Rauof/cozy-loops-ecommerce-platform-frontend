import apiClient from '@/lib/apiClient'
import { OrderResponse, OrdersResponse } from '@/types/order'

export const orderService = {
  getUserOrders: async (page = 1, limit = 10): Promise<OrdersResponse> => {
    const response = await apiClient.get(`/api/orders?page=${page}&limit=${limit}`)
    return response.data
  },

  getOrderById: async (orderId: string): Promise<OrderResponse> => {
    const response = await apiClient.get(`/api/orders/${orderId}`)
    return response.data
  },

  getOrderByNumber: async (orderNumber: string): Promise<OrderResponse> => {
    const response = await apiClient.get(`/api/orders/number/${orderNumber}`)
    return response.data
  },
}