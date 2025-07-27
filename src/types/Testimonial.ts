export interface ApiReview {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    Avatar: string;
  };
  product: string;
  comment: string;
  rating: number;
  likesCount: number;
  dislikesCount: number;
  likes: Array<{
    user: string;
    type: 'like' | 'dislike';
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Testimonial {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rating: number;
  comment: string;
  date: string;
  likes: number;
  dislikes: number;
  replies: number;
}

export interface TestimonialsProps {
  testimonialsData: {
    title: string;
    description: string;
    items: Testimonial[];
  }
}

export interface ApiResponse {
  success: boolean;
  data: ApiReview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CreateTestimonialData {
  productSlug: string;
  comment: string;
  rating: number;
}