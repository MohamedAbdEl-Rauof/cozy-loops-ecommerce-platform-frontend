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
    onPaymentStatusChange: (status: 'processing' | 'completed' | 'failed') => void;
}

export interface StripeCheckoutProps {
    clientSecret: string;
    publishableKey?: string;
    orderData: OrderData;
    onPaymentStatusChange: (status: 'processing' | 'completed' | 'failed') => void;
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