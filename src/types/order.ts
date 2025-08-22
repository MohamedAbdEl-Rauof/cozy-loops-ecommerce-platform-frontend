export interface OrderData {
    orderNumber: string;
    orderId: string;
    breakdown: {
        subtotal: number;
        shipping: number;
        tax: number;
        total: number;
    };
}

export interface StripeCheckoutFormProps {
    orderData: OrderData;
    onPaymentStatusChange: (_status: 'processing' | 'completed' | 'failed') => void;
}

export interface StripeCheckoutProps {
    clientSecret: string;
    publishableKey?: string;
    orderData: OrderData;
    onPaymentStatusChange: (_status: 'processing' | 'completed' | 'failed') => void;
}

export interface OrderDetails {
    _id: string;
    orderNumber: string;
    totalAmount: number;
    subtotal: number;
    shippingCost: number;
    tax: number;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
    items: Array<{
        product: {
            _id: string;
            name: string;
            images: string[];
        };
        quantity: number;
        price: number;
        totalPrice: number;
    }>;
}

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