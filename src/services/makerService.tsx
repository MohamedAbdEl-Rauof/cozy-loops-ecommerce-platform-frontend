
import apiClient from '@/lib/apiClient';
import { Maker, MakerProductsData, MakerProductsResponse, MakerResponse } from '@/types/maker';

export const makerService = {
  async getMakerById(makerId: string): Promise<Maker> {
    try {
      const response = await apiClient.get<MakerResponse>(`/api/makers/${makerId}`);

      if (!response.data.success) {
        throw new Error('API returned success: false');
      }

      return response.data.data;
    } catch (error: unknown) {
      console.error('🚨 API Error Details:', error);

      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { status?: number } };

        if (apiError.response?.status === 404) {
          throw new Error(`Maker with ID/slug "${makerId}" not found`);
        }
      }

      const errorMessage = error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : 'Unknown error occurred';

      throw new Error(`Failed to fetch maker: ${errorMessage}`);
    }
  },

  async getMakerProducts(makerId: string): Promise<MakerProductsData> {
    try {
      const response = await apiClient.get<MakerProductsResponse>(
        `/api/makers/${makerId}/products`
      );

      if (!response.data.success) {
        throw new Error('API returned success: false');
      }

      return response.data.data;
    } catch (error: unknown) {
      console.error('🚨 API Error Details:', error);

      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { status?: number } };

        if (apiError.response?.status === 404) {
          throw new Error(`Maker with ID/slug "${makerId}" not found`);
        }
      }

      const errorMessage = error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : 'Unknown error occurred';

      throw new Error(`Failed to fetch maker products: ${errorMessage}`);
    }
  }
};