import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';

export const useProductsByCategorySlug = (categorySlug: string) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug],
    queryFn: () => productService.getProductsByCategorySlug(categorySlug),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  });
};

export const useProductFromCategory = (categorySlug: string, productSlug: string) => {
  const { data: productsData, isLoading, error } = useProductsByCategorySlug(categorySlug);
  
  const product = productsData?.products?.find(
    (p: Product) => {
      console.log('Checking product:', p.slug, 'against:', productSlug);
      return p.slug === productSlug;
    }
  ) || null;

  return {
    data: product,
    isLoading,
    error,
    allProducts: productsData?.products || []
  };
};