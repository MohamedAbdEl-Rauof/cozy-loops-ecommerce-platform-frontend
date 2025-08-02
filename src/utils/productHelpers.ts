import { ProductImage } from '@/types/product';

export const DEFAULT_COLORS = [
  { name: "Red", value: "#ff6b6b", available: true },
  { name: "Blue", value: "#45b7d1", available: true },
  { name: "Green", value: "#96ceb4", available: true },
  { name: "Yellow", value: "#feca57", available: true },
  { name: "Black", value: "#000000", available: true }
];

export const transformProductImages = ( images: string[] = [], productName: string): ProductImage[] => {
  const allImages = [ ...images].filter(Boolean);
  
  if (allImages.length === 0) {
    return [{ id: '1', url: '/placeholder-product.jpg', alt: productName }];
  }

  return allImages.map((url, index) => ({
    id: (index + 1).toString(),
    url,
    alt: `${productName} - Image ${index + 1}`
  }));
};

export const calculateAverageRating = (reviews: Array<{ rating?: number }> = []): number => {
  if (!reviews?.length) return 0;
  const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  return Number((total / reviews.length).toFixed(1));
};

export const formatJoinDate = (joinDate?: string): string => {
  if (!joinDate) return "Unknown";
  try {
    return new Date(joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  } catch {
    return "Unknown";
  }
};

export const getYearsOfExperience = (joinDate?: string): number => {
  if (!joinDate) return 0;
  try {
    return new Date().getFullYear() - new Date(joinDate).getFullYear();
  } catch {
    return 0;
  }
};