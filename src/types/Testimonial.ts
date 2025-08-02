
export interface ProductTestimonialsResponse {
  success: boolean;
  data: {
    reviews: ApiReview[];
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    userReview?: ApiReview;
  };
  message?: string;
  reviews?: ApiReview[];
}

export interface ApiError {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
  message: string;
}

export interface UpdateTestimonialResponse {
  success: boolean;
  message: string;
  data?: ApiReview;
}

export interface ApiReview {
  _id: string;
  id?:string;
  user: {
    _id: string;
    id?:string;
    firstName: string;
    lastName: string;
    Avatar: string;
    avatar?:string;
    verified?: boolean;
    name?: string;
    role?: string;
    email?: string;
    phoneNumber?: string;
    addresses?:string[];
    emailVerified?: boolean;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
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
  date?: string;
  dislikes?: number;
  replies?: number;
}

export interface Testimonial {
  reviews: ApiReview[];
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

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  Avatar: string;
}

export interface Review {
  _id: string;
  user: User;
  product: string;
  comment: string;
  rating: number;
  likesCount: number;
  dislikesCount: number;
  likes: unknown[];
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface ExisitingCommentsProps {
  commentsData: Review[];
  onRefresh: () => void;
}