import { useQuery } from '@tanstack/react-query';

import { categoryService } from '@/services/categoryService';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAllCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['categories', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};