export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Maker {
  _id: string;
  name: string;
  slug: string;
  location: string;
  image: string;
}

export interface ProductAttribute {
  _id: string;
  name: string;
  value: string;
}

export interface ProductVariant {
  _id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
  attributes: ProductAttribute[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  priceBeforeDiscount?: number;
  discountPercentage: number;
  category: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };
  maker: {
    _id: string;
    name: string;
    slug: string;
    location: string;
    image: string;
  };
  tags: string[];
  images?: string[];
  colors?: string[];
  mainImage: string;
  sku: string;
  stock: number;
  attributes: Array<{
    _id: string;
    name: string;
    value: string;
  }>;
  featured: boolean;
  isActive: boolean;
  averageRating: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
  variants: any[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}


export interface MakerInfo {
  name: string;
  location: string;
  miniBio: string;
  avatar?: string;
  joinedDate?: string;
  rating?: number;
  totalReviews?: number;
  specialties?: string[];
  yearsOfExperience?: number;
  isVerified?: boolean;
  totalProducts?: number;
  completedOrders?: number;
}

export interface StoryFeatureProps {
  title: string;
  makerInfo: MakerInfo;
  buttonText1: string;
  buttonText2: string;
  imageSrc: string;
  imageAlt: string;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
}


export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductColor {
  name: string;
  value: string;
  available: boolean;
}

export interface ProductDetailsProps {
  id: string;
  name: string;
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  price: number;
  originalPrice?: number;
  colors: ProductColor[];
  description?: string;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  discountPercentage?: number;
  mainImage: string
}