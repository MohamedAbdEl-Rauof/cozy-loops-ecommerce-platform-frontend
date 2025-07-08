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
  discountPercentage: number;
  category: Category;
  maker: Maker;
  tags: string[];
  images: string[];
  mainImage: string;
  sku: string;
  stock: number;
  attributes: ProductAttribute[];
  featured: boolean;
  isActive: boolean;
  averageRating: number;
  numReviews: number;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}