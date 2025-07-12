export interface ApiReview {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    Avatar?: string;
  };
  comment: string;
  rating: number;
  createdAt: string;
}

export interface ApiResponse {
  data: ApiReview[];
}

export interface Testimonial {
  id: string | number;
  name: string;
  avatar?: string;
  text: string;
  rating: number;
  createdAt?: Date | string;
}

export interface TestimonialsData {
  title: string;
  description: string;
  items: Testimonial[];
}