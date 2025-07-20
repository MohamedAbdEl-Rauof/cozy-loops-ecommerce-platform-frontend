import apiClient from '@/lib/apiClient';
import { ApiReview, Testimonial, ApiResponse, CreateTestimonialData } from '@/types/Testimonial';

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    console.log('=== TOKEN DEBUG ===');

    // Check localStorage
    const localToken = localStorage.getItem('accessToken');
    console.log('localStorage accessToken:', localToken);

    // Check sessionStorage
    const sessionToken = sessionStorage.getItem('accessToken');
    console.log('sessionStorage accessToken:', sessionToken);

    // Check all cookies
    console.log('All cookies:', document.cookie);

    // Check for accessToken cookie specifically
    const cookies = document.cookie.split(';');
    console.log('Parsed cookies:', cookies);

    const tokenCookie = cookies.find(cookie =>
      cookie.trim().startsWith('accessToken')
    );
    console.log('Found accessToken cookie:', tokenCookie);

    // Try different cookie names
    const altTokenCookie = cookies.find(cookie =>
      cookie.trim().startsWith('access_token') ||
      cookie.trim().startsWith('token') ||
      cookie.trim().startsWith('authToken')
    );
    console.log('Found alternative token cookie:', altTokenCookie);

    console.log('=== END TOKEN DEBUG ===');

    // Try localStorage first
    if (localToken) {
      return localToken;
    }

    // Try sessionStorage as fallback
    if (sessionToken) {
      return sessionToken;
    }

    // Try to extract from cookies
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }

    return null;
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

      let url = `api/reviews/product/${productSlug}`;

      if (accessToken) {
        try {
          const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
          const userId = tokenPayload.id;

          if (userId) {
            url += `?userId=${userId}`;
          }
        } catch (decodeError) {
          console.warn('Failed to decode token for user ID:', decodeError);
        }
      }

      const response = await apiClient.get<any>(url);

      if (!response.data || !response.data.success) {
        throw new Error('Failed to fetch testimonials.');
      }

      return response.data.data;
    } catch (error: any) {
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

  updateTestimonial: async (testimonialId: string, comment: string, rating: number): Promise<void> => {
    try {
      const response = await apiClient.put<{ success: boolean, message: string, data?: any }>(
        `/api/reviews/${testimonialId}`,
        {
          comment: comment.trim(),
          rating: rating
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true 
        }
      );

      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Failed to update review.');
      }

      return response.data.data;
    } catch (error: any) {
      console.error('Error updating testimonial:', error);

      // Handle specific backend error messages
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }

      // Handle different HTTP status codes
      if (error.response?.status === 401) {
        throw new Error('Session expired. Please log in again.');
      } else if (error.response?.status === 404) {
        throw new Error('Review not found');
      } else if (error.response?.status === 403) {
        throw new Error('Not authorized to update this review');
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid request data');
      }

      throw error;
    }
  },

  deleteTestimonial: async (testimonialId: string): Promise<void> => {
    try {
      const response = await apiClient.delete<{ success: boolean, message: string }>(
        `/api/reviews/${testimonialId}`,
        { 
          withCredentials: true 
        }
      );

      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Failed to delete review.');
      }

      return;
    } catch (error: any) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  },
}