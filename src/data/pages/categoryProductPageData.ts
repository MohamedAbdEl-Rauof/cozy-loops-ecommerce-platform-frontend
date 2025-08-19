import { CategoriesData, ProductsData } from '@/types/category';
import { TestimonialsData } from '@/types/home';
import { MakerCategory } from '@/types/maker';
import { ApiReview, Testimonial } from '@/types/Testimonial';

import { FeaturedCategoriesData } from './categoriesPageData';

interface Maker {
  _id: string;
  name: string;
  location?: string;
  message?: string;
  image?: string;
  slug: string;
}

interface ProductData {
  _id: string;
  name: string;
  mainImage?: string;
  images?: string[];
  price: number;
  priceBeforeDiscount?: number;
  discountPercentage?: number;
  slug: string;
  averageRating?: number;
  numReviews?: number;
  maker?: Maker;
}

interface ProductsApiResponse {
  products?: ProductData[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const transformApiReviewToTestimonial = (apiReview: ApiReview): Testimonial => ({
  id: apiReview._id,
  user: {
    name: `${apiReview.user.firstName} ${apiReview.user.lastName}`,
    avatar: apiReview.user.Avatar || '/images/shared/default-avatar.png',
    verified: true,
  },
  rating: apiReview.rating,
  comment: apiReview.comment,
  date: new Date(apiReview.createdAt).toLocaleDateString(),
  likes: 0,
  dislikes: 0,
  replies: 0,
});

export const createCategoriesData = (
  selectedCategory: { name: string },
  productsData?: ProductsApiResponse
): CategoriesData => ({
  title: `Meet the ${selectedCategory.name} Artisans`,
  description:
    'Discover the talented creators behind every handcrafted piece, each bringing their unique story and artistic vision to life.',
  categories:
    productsData?.products?.reduce((uniqueMakers: MakerCategory[], product: ProductData) => {
      if (!product.maker) return uniqueMakers;

      const existingMaker = uniqueMakers.find((maker) => maker.id === product.maker!._id);
      if (!existingMaker) {
        const makerCategory: MakerCategory = {
          _id: product.maker._id,
          id: product.maker._id,
          name: product.maker.name,
          title: `${product.maker.name}${product.maker.location ? ` from ${product.maker.location}` : ''}`,
          slug: product.maker.slug,
          description:
            product.maker.message ||
            `Creating beautiful ${selectedCategory.name.toLowerCase()} with passion and dedication.`,
          image: product.maker.image || '/images/shared/makers/defaultMaker.png',
          isMaker: true,
          buttonText: 'View Profile',
          buttonLink: `/makers/${product.maker.slug}`,
          parent: null,
          level: 0,
          isActive: true,
          featured: false,
          sortOrder: 0,
          productCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        uniqueMakers.push(makerCategory);
      }
      return uniqueMakers;
    }, []) || [],
});

export const createFeaturedCategoriesData = (
  selectedCategory: { name: string },
  categoriesData: CategoriesData
): FeaturedCategoriesData => ({
  title: `Featured ${selectedCategory.name} Artisan`,
  isTitleCenter: false,
  description: 'Discover the story behind the craft',
  image: '/images/shared/productImage.jpg',
  ctaText: 'Explore More',
  buttonText: 'View Profile',
  buttonLink: categoriesData.categories?.[0]?.buttonLink || '#',
});

export const createTestimonialsData = (
  selectedCategory: { name: string },
  testimonialsItems: Testimonial[]
): TestimonialsData => ({
  title: 'What Our Community Says',
  description: `Real experiences from customers who love our ${selectedCategory.name.toLowerCase()} collection.`,
  items: testimonialsItems,
});

export const createTestimonialsDataFromApiReviews = (
  selectedCategory: { name: string },
  apiReviews: ApiReview[]
): TestimonialsData => ({
  title: 'What Our Community Says',
  description: `Real experiences from customers who love our ${selectedCategory.name.toLowerCase()} collection.`,
  items: apiReviews.map(transformApiReviewToTestimonial),
});

export const createProductsConfig = (
  selectedCategory: { name: string },
  slug: string,
  productsData?: ProductsApiResponse
): ProductsData => ({
  title: `Best in ${selectedCategory.name}`,
  mainSlug: slug,
  productsData:
    productsData?.products?.map((product: ProductData) => ({
      id: product._id,
      title: product.name,
      image: product.mainImage || product.images?.[0] || '/images/categories.png',
      price: product.price,
      originalPrice: product.priceBeforeDiscount,
      discount: product.discountPercentage,
      slug: product.slug,
      rating: product.averageRating,
      reviewCount: product.numReviews,
    })) || [],
}); 