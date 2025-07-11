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

export interface ProductColor {
  name: string;
  value: string;
  available: boolean;
}