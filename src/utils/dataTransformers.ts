import { Maker, MakerProduct, MakerProductsData } from "@/types/maker";
import { Product } from "@/types/product";
import { ApiReview, ProductTestimonialsResponse, TestimonialsResponse } from "@/types/Testimonial";

import { calculateAverageRating, DEFAULT_COLORS, formatJoinDate, getYearsOfExperience, transformProductImages } from "./productHelpers";

export const transformProductData = (
  product: Product,
  testimonials: TestimonialsResponse | undefined,
  isInWishlist: (_id: string) => boolean
) => {
  const reviews = testimonials?.reviews ||
    ('data' in (testimonials || {}) ? (testimonials as ProductTestimonialsResponse).data?.reviews : []) ||
    [];
  return {
    _id: product._id,
    name: product.name,
    images: transformProductImages(product.images, product.name),
    mainImage: product.mainImage,
    rating: calculateAverageRating(reviews),
    reviewCount: reviews.length || 0,
    inStock: product.inStock !== false,
    stockCount: product.stockCount || 10,
    price: product.price,
    originalPrice: product.priceBeforeDiscount,
    colors: DEFAULT_COLORS,
    description: product.shortDescription || product.description,
    discountPercentage: product.discountPercentage || 0,
    isFavorite: isInWishlist(product._id),
    category: product.category
  };
};

export const transformMakerData = (makerData: Maker | undefined, product: Product | undefined) => {
  const makerName = makerData?.name || product?.maker?.name || "Unknown Maker";

  return {
    name: makerName,
    location: makerData?.location || product?.maker?.location || "Unknown Location",
    miniBio: makerData?.aboutMe || product?.maker?.message || "Passionate artisan creating beautiful handcrafted pieces.",
    avatar: makerData?.image || product?.maker?.image || "/images/makers/default-maker.jpg",
    joinedDate: formatJoinDate(makerData?.joinDate),
    rating: makerData?.rating || 4.5,
    totalReviews: 127,
    specialties: makerData?.specialties || ["Handcrafted", "Artisan"],
    yearsOfExperience: getYearsOfExperience(makerData?.joinDate),
    isVerified: true,
    totalProducts: 45,
    completedOrders: 320
  };
};

export const transformSimilarProducts = (
  makerProductsData: MakerProductsData | undefined,
  currentProductId: string,
  makerName: string,
  categoryName?: string
) => {
  if (!makerProductsData?.products?.length) {
    return { title: "Similar Products", productsData: [] };
  }

  const filteredProducts = makerProductsData.products
    .filter((p: MakerProduct) => p._id !== currentProductId)
    .slice(0, 10)
    .map((p: MakerProduct) => ({
      id: p._id,
      title: p.name,
      image: p.mainImage || p.images?.[0] || "/images/shared/featuredCategory.jpg",
      price: p.price,
      categoryId: p.category?.slug,
      categorySlug: p.category?.slug,
      slug: p.slug,
      category: p.category?.name || categoryName
    }));

  return {
    title: `More from ${makerName}`,
    productsData: filteredProducts
  };
};

export const transformCommentsData = (
  testimonials: TestimonialsResponse | undefined,
  productId: string
) => {
  let reviews: ApiReview[] = [];

  if (Array.isArray(testimonials)) {
    reviews = testimonials;
  } else if (testimonials?.reviews) {
    reviews = testimonials.reviews;
  } else if ('data' in (testimonials || {}) && (testimonials as ProductTestimonialsResponse).data?.reviews) {
    reviews = (testimonials as ProductTestimonialsResponse).data.reviews;
  }

  const transformedData = reviews.map((review: ApiReview) => ({
    _id: review._id || review.id || '',
    id: review._id || review.id || '',
    user: {
      _id: review.user?._id || review.user?.id || '',
      firstName: review.user?.firstName || '',
      lastName: review.user?.lastName || '',
      name: `${review.user?.firstName || ''} ${review.user?.lastName || ''}`.trim() || 'Anonymous',
      Avatar: review.user?.Avatar || review.user?.avatar || '/images/default-avatar.jpg',
      verified: review.user?.verified || false,
      email: review.user?.email || '',
      role: review.user?.role || 'user',
      phoneNumber: review.user?.phoneNumber || '',
      addresses: review.user?.addresses || [],
      emailVerified: review.user?.emailVerified || false,
      active: review.user?.active !== false,
      createdAt: review.user?.createdAt || new Date().toISOString(),
      updatedAt: review.user?.updatedAt || new Date().toISOString()
    },
    product: review.product || productId,
    rating: review.rating,
    comment: review.comment,
    date: review.createdAt || review.date || new Date().toISOString(),
    createdAt: review.createdAt || review.date || new Date().toISOString(),
    updatedAt: review.updatedAt || review.createdAt || new Date().toISOString(),
    likes: review.likes || [],
    likesCount: typeof review.likesCount === 'number' ? review.likesCount : (Array.isArray(review.likes) ? review.likes.length : 0),
    dislikesCount: typeof review.dislikesCount === 'number' ? review.dislikesCount : 0,
    replies: review.replies || 0,
    isOwner: false
  }));

  return transformedData;
};