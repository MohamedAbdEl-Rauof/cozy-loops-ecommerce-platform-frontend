import apiClient from '@/lib/apiClient';
import { Category } from '@/types/category';

export const categoryService = {
    getAllCategories: async (): Promise<Category[]> => {
        const response = await apiClient.get('/api/categories');
        return response.data.data;
    },

    getCategoryBySlug: async (slug: string): Promise<Category> => {
        const response = await apiClient.get(`/api/categories/${slug}`);
        return response.data.data.category;
    },
};