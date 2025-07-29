import apiClient from '@/lib/apiClient';
import { AddToCartData, Cart, CartApiResponse, RemoveFromCartData, UpdateCartData } from '@/types/cart';


export const cartService = {
    getCart: async (): Promise<Cart> => {
        try {
            const response = await apiClient.get<CartApiResponse>('/api/cart');
            return response.data.cart;
        } catch (error: unknown) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },

    addToCart: async (data: AddToCartData): Promise<Cart> => {
        try {
            const response = await apiClient.post<CartApiResponse>('/api/cart/add', {
                productId: data.productId,
                quantity: data.quantity || 1,
            });
            return response.data.cart;
        } catch (error: unknown) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    },

    updateCart: async (data: UpdateCartData): Promise<Cart> => {
        try {
            const response = await apiClient.put<CartApiResponse>('/api/cart/update', {
                productId: data.productId,
                quantity: data.quantity,
            });
            return response.data.cart;
        } catch (error: unknown) {
            console.error('Error updating cart:', error);
            throw error;
        }
    },

    deleteItemFromCart: async (data: RemoveFromCartData): Promise<Cart> => {
        try {
            const response = await apiClient.delete<CartApiResponse>('/api/cart/remove', {
                data: {
                    productId: data.productId,
                    variant: data.variant
                }
            });
            return response.data.cart;
        } catch (error: unknown) {
            console.error('Error removing item from cart:', error);
            throw error;
        }
    },

    clearCart: async (): Promise<void> => {
        try {
            const response = await apiClient.delete<{ success: boolean; message: string }>('/api/cart');

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to clear cart');
            }
        } catch (error: unknown) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    },

    checkout: async (data: { shippingCost?: number; shippingAddress?: unknown }) => {
        try {
            const response = await apiClient.post('/api/cart/checkout', data);
            return response.data.order;
        } catch (error: unknown) {
            console.error('Error during checkout:', error);
            throw error;
        }
    },

    getCartHistory: async (page: number = 1, limit: number = 10) => {
        try {
            const response = await apiClient.get(`/api/cart/history?page=${page}&limit=${limit}`);
            return response.data.data;
        } catch (error: unknown) {
            console.error('Error fetching cart history:', error);
            throw error;
        }
    }
};
