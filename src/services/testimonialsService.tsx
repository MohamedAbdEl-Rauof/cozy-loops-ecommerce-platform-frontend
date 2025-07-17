import apiClient from '@/lib/apiClient';
import { ApiReview, Testimonial, ApiResponse, CreateTestimonialData } from '@/types/Testimonial';

const getAccessToken = () => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie =>
      cookie.trim().startsWith('accessToken')
    );
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  return null;
};

export const testimonialsService = {


  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const response = await apiClient.get<ApiResponse>('api/reviews/user?sort=-createdAt');
      console.log('responseresponseresponse', response);
      const reviews: ApiReview[] = response.data.data;

      const transformedItems: Testimonial[] = reviews.map((review) => ({
        id: review._id,
        user: {
          name: `${review.user.firstName} ${review.user.lastName.charAt(0)}.`,
          avatar: review.user.Avatar || "/images/navbarLogo.svg",
          verified: true
        },
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.createdAt).toISOString().split('T')[0],
        likes: review.likesCount,
        dislikes: review.dislikesCount,
        replies: 0
      }));

      return transformedItems;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },


  getProductsTestimonials: async (productSlug: string): Promise<any> => {
    try {
      const accessToken = getAccessToken();

      const headers: Record<string, string> = {};
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await apiClient.get<any>(
        `api/reviews/product/${productSlug}`,
        { headers }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error fetching product testimonials:', error);
      throw error;
    }
  },


  createTestimonial: async (data: CreateTestimonialData): Promise<Testimonial> => {
    try {
      const accessToken = getAccessToken();

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      };

      const response = await apiClient.post<{ success: boolean, message: string }>(
        '/api/reviews',
        {
          productSlug: data.productSlug,
          comment: data.comment.trim(),
          rating: data.rating
        },
        { headers }
      );

      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Failed to create review.');
      }

    } catch (error: any) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  },
}