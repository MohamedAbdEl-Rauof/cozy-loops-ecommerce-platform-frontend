// Auth-aware client: refreshes an expired access token and retries on 401.
import apiClient from '@/lib/apiWithAuth';
import { WishlistResponse } from '@/types/wishlist';

export const WishlistService = {
  getWishlistItems: async (): Promise<WishlistResponse> => {
    const response = await apiClient.get<WishlistResponse>(`/api/wishlist`);
    return response.data;
  },

  addWishlistItem: async (productId: string): Promise<WishlistResponse> => {
    const response = await apiClient.post<WishlistResponse>(`/api/wishlist/add`, {
      productId
    });
    return response.data;
  },

  deleteWishlistItem: async (productId: string): Promise<WishlistResponse> => {
    const response = await apiClient.delete<WishlistResponse>(`/api/wishlist/remove`, {
      data: { productId }
    });
    return response.data;
  },
};