
import { useQuery } from '@tanstack/react-query';

import { makerService } from '@/services/makerService';

export const useMakersBySlug = (slug: string) => {  
  return useQuery({
    queryKey: ['maker', slug],
    queryFn: async () => {
      try {
        const result = await makerService.getMakerById(slug);
        return result;
      } catch (error) {
        console.error('❌ Maker fetch failed:', error);
        throw error;
      }
    },
    enabled: !!slug && slug.length > 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 1000,
  });
};

export const useMakerProducts = (slug: string) => {
  return useQuery({
    queryKey: ['maker-products', slug],
    queryFn: async () => {
      try {
        const result = await makerService.getMakerProducts(slug);
        return result;
      } catch (error) {
        console.error('❌ Maker products fetch failed:', error);
        throw error;
      }
    },
    enabled: !!slug && slug.length > 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 1000,
  });
};