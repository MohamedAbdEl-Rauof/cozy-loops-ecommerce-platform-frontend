import apiClient from '@/lib/apiClient';
import { ApiReview, Testimonial, ApiResponse } from '@/types/Testimonial';

export const testimonialsService = {
  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const response = await apiClient.get<ApiResponse>('api/reviews/user?sort=-createdAt');
      console.log('responseresponseresponse', response);
      const reviews: ApiReview[] = response.data.data;
      
      const transformedItems: Testimonial[] = reviews.map((review, index) => ({
        id: index + 1, 
        name: `${review.user.firstName} ${review.user.lastName.charAt(0)}.`,
        avatar: review.user.Avatar || "/images/navbarLogo.svg", 
        text: review.comment,
        rating: review.rating,
        createdAt: new Date(review.createdAt),
      }));

      return transformedItems;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  }
};