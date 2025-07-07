import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Category, CategoryState } from '@/types/category';
import { categoryService } from '@/services/categoryService';

interface CategoryActions {
  fetchCategories: () => Promise<void>;
  fetchFeaturedCategories: () => Promise<void>;
  fetchCategoryBySlug: (slug: string) => Promise<void>;
  setSelectedCategory: (category: Category | null) => void;
  clearError: () => void;
}

type CategoryStore = CategoryState & CategoryActions;

export const useCategoryStore = create<CategoryStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      categories: [],
      featuredCategories: [],
      selectedCategory: null,
      loading: false,
      error: null,

      // Actions
      fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
          const categories = await categoryService.getAllCategories();
          set({ categories, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch categories',
            loading: false 
          });
        }
      },

      fetchCategoryBySlug: async (slug: string) => {
        set({ loading: true, error: null });
        try {
          const category = await categoryService.getCategoryBySlug(slug);
          set({ selectedCategory: category, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch category',
            loading: false 
          });
        }
      },

      setSelectedCategory: (category: Category | null) => {
        set({ selectedCategory: category });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'category-store', 
    }
  )
);