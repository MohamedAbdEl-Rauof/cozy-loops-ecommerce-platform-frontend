import { useQuery } from '@tanstack/react-query';

import { testimonialsService } from '@/services/testimonialsService';

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: testimonialsService.getTestimonials,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsTestimonialsBySlug = (slug: string) => {
  const query = useQuery({
    queryKey: ['testimonials', slug],
    queryFn: () => testimonialsService.getProductsTestimonials(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};