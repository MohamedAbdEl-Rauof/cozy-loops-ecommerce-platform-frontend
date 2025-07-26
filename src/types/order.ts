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