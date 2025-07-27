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
  id: string;
  title: string;
  isMaker?: boolean;
  buttonLink: string;
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

export interface CategoriesData {
  title: string;
  description: string;
  categories: Category[];
}

export interface CategoriesGridProps {
  categoriesData: CategoriesData;
}

export interface CategoryStatsCardProps {
  categoryName: string;
  description: string;
  totalProducts: number;
  totalArtisans: number;
  rating?: number;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  slug: string;
}

export interface ProductsData {
  title: string;
  mainSlug: string;
  productsData: Product[];
}

export interface ProductsOfCategoryProps {
  Products: ProductsData;
}