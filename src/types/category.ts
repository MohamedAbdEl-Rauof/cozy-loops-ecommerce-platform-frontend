export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  buttonText?: string;
  image?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: string;
  parent?: string | null;
  level: number;
  isActive: boolean;
  featured: boolean;
  sortOrder: number;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count: number;
  data: T;
}

export interface CategoryState {
  categories: Category[];
  featuredCategories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
}