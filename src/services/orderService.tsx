import apiClient from '@/lib/apiClient'

export interface OrderItem {
  product: {
    _id: string
    name: string
    images: string[]
    price: number
  }
  quantity: number
  price: number
  totalPrice: number
}

export interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  _id: string
  orderNumber: string
  user: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  tax: number
  totalAmount: number
  shippingAddress: ShippingAddress
  paymentIntentId?: string
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface OrdersResponse {
  success: boolean
  count: number
  totalOrders: number
  totalPages: number
  currentPage: number
  orders: Order[]
}

export interface OrderResponse {
  success: boolean
  order: Order
}

export interface CreateOrderData {
  items: Array<{
    product: string
    quantity: number
    price: number
  }>
  shippingAddress: ShippingAddress
  paymentIntentId: string
}

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