import apiClient from '@/lib/apiClient';
import { Product } from '@/types/product';

interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export const productService = {
  // Get products by category slug
  getProductsByCategorySlug: async (slug: string) => {
    const response = await apiClient.get<ProductsResponse>(`/api/products/category/${slug}`);
    return response.data.data;
  },

};