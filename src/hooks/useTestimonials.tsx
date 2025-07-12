import { useQuery } from '@tanstack/react-query';
import { testimonialsService } from '@/services/testimonialsService';

export const useTestimonials = () => {
  return useQuery({
        queryKey: ['testimonials'],
        queryFn: testimonialsService.getTestimonials,
        staleTime: 5 * 60 * 1000,
  });
};