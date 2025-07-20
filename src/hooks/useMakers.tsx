import { useQuery } from '@tanstack/react-query';
import { makerService } from '@/services/makerService';

export const useMakersBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['maker', slug],
    queryFn: () => makerService.getMakerById(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};