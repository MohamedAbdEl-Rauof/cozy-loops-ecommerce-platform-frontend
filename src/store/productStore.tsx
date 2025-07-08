import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';

interface ProductPagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
}

interface ProductState {
    products: Product[];
    featuredProducts: Product[];
    selectedProduct: Product | null;
    categoryProducts: Product[];
    pagination: ProductPagination | null;
    loading: boolean;
    error: string | null;
}

interface ProductActions {
    fetchProducts: (page?: number, limit?: number) => Promise<void>;
    fetchFeaturedProducts: () => Promise<void>;
    fetchProductBySlug: (slug: string) => Promise<void>;
    fetchProductsByCategorySlug: (slug: string) => Promise<void>;
    setSelectedProduct: (product: Product | null) => void;
    clearError: () => void;
    clearProducts: () => void;
}

type ProductStore = ProductState & ProductActions;

export const useProductStore = create<ProductStore>()(
    devtools(
        (set, get) => ({
            // Initial state
            products: [],
            featuredProducts: [],
            selectedProduct: null,
            categoryProducts: [],
            pagination: null,
            loading: false,
            error: null,


            fetchProductsByCategorySlug: async (slug: string) => {
                set({ loading: true, error: null });
                try {
                    const data = await productService.getProductsByCategorySlug(slug);
                    set({
                        categoryProducts: data.products,
                        pagination: data.pagination,
                        loading: false
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Failed to fetch category products',
                        loading: false
                    });
                }
            },

            setSelectedProduct: (product: Product | null) => {
                set({ selectedProduct: product });
            },

            clearError: () => {
                set({ error: null });
            },

            clearProducts: () => {
                set({
                    products: [],
                    categoryProducts: [],
                    selectedProduct: null,
                    pagination: null
                });
            },
        }),
        {
            name: 'product-store',
        }
    )
);