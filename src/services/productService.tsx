import apiClient from '@/lib/apiClient';
import { ProductsResponse } from '@/types/product';

export const productService = {
  getProductsByCategorySlug: async (slug: string) => {
    const response = await apiClient.get<ProductsResponse>(`/api/products/category/${slug}`);
    return response.data.data;
  },
};