export interface Maker {
  _id: string;
  name: string;
  slug: string;
  location: string;
  image: string;
  specialties: string[];
  aboutMe: string;
  joinDate: string;
  website?: string;
  isActive: boolean;
  rating: number;
  totalProducts: number;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MakerProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  priceBeforeDiscount?: number;
  discountPercentage?: number;
  mainImage: string;
  images: string[];
  averageRating: number;
  numReviews: number;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  maker: {
    _id: string;
    name: string;
    slug: string;
    location: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MakerProductsData {
  maker: Maker;
  products: MakerProduct[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface MakerResponse {
  success: boolean;
  data: Maker;
}

export interface MakerProductsResponse {
  success: boolean;
  data: MakerProductsData;
}