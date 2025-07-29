'use client';

import { useParams } from 'next/navigation';
import { Box, Container, CircularProgress, Alert } from '@mui/material';
import { useProductFromCategory } from '@/hooks/useProducts';
import { ProductImage } from '@/types/product';
import SmallNavbar from "@/components/shared/SmallNavbar";
import ProductDetails from "@/components/shared/PrdouctDetails";
import FeatureCardsSection from "@/components/shared/FeatureCardsSection";
import AbountMaker from "@/components/product-details/AbountMaker";
import SimilarProducts from "@/components/product-details/SimilarProducts";
import Comments from "@/components/product-details/Comments";
import { useMakersBySlug } from "@/hooks/useMakers";
import ExisitingComments from '@/components/about/ExisitingComments';
import { useProductsTestimonialsBySlug } from '@/hooks/useTestimonials';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/hooks/useWishlist';
import { FeatureCardsSectionData, FeatureCardsSectionData2, similarProductsData } from '@/data/pages/productDetailsPageData';

const createImagesArray = (mainImage: string, images: string[] = []): string[] => {
  const imageUrls = new Set<string>();

  if (mainImage) {
    imageUrls.add(mainImage);
  }

  images.forEach(url => imageUrls.add(url));

  return Array.from(imageUrls);
};

const transformImages = (images: string[] = [], productName: string): ProductImage[] => {
  if (!images || images.length === 0) {
    return [
      {
        id: '1',
        url: '/placeholder-product.jpg',
        alt: productName
      }
    ];
  }

  return images.map((url, index) => ({
    id: (index + 1).toString(),
    url,
    alt: `${productName} - Image ${index + 1}`
  }));
};


const transformColors = (colors: string[] = []) => {
  if (!colors || colors.length === 0) {
    return [
      {
        name: "Red",
        value: "#ff6b6b",
        available: true
      },
      {
        name: "Blue",
        value: "#45b7d1",
        available: true
      },
      {
        name: "Green",
        value: "#96ceb4",
        available: true
      },
      {
        name: "Yellow",
        value: "#feca57",
        available: true
      },
      {
        name: "Black",
        value: "#000000",
        available: true
      }
    ];
  }
};

const ProductPage = () => {
  const params = useParams();
  const { isInWishlist } = useWishlist();
  const { addToWishlist } = useAddToWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();

  const categorySlug = params.categorySlug as string;
  const productSlug = params.productSlug as string;

  const {
    data: product,
    isLoading,
    error,
  } = useProductFromCategory(categorySlug, productSlug);

  console.log('Product data:', product);

  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
    refetch: refetchTestimonials
  } = useProductsTestimonialsBySlug(productSlug);

  const actualReviewCount = testimonials?.length || 0;

  const calculateAverageRating = (testimonials: any[] = []): number => {
    if (!testimonials || testimonials.length === 0) return 0;

    const totalRating = testimonials.reduce((sum, testimonial) => {
      return sum + (testimonial.rating || 0);
    }, 0);

    return Number((totalRating / testimonials.length).toFixed(1));
  };

  const actualAverageRating = calculateAverageRating(testimonials);

  const { data: makerData, isLoading: makerLoading, error: makerError } = useMakersBySlug(product?.maker?.slug || '');
  console.log('Maker data:', makerData);



  const handleCommentSubmitted = () => {
    refetchTestimonials();
  };

  if (isLoading) {
    return (
      <Box
        component="main"
        sx={{
          bgcolor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
    return (
      <Box component="main" sx={{ bgcolor: 'white', p: 4 }}>
        <Container maxWidth="md">
          <Alert severity="error" sx={{ mb: 4 }}>
            {errorMessage}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box component="main" sx={{ bgcolor: 'white', p: 4 }}>
        <Container maxWidth="md">
          <Alert severity="warning" sx={{ mb: 4 }}>
            Product not found
          </Alert>
        </Container>
      </Box>
    );
  }

  // Create images array with mainImage first, then other images
  const allImages = createImagesArray(product.mainImage, product.images);
  const transformedImages = transformImages(allImages, product.name);
  const transformedColors = transformColors(product.colors);

  const handleToggleFavorite = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };
  // Helper function to safely calculate years of experience
  const calculateYearsOfExperience = (joinDate: string | undefined): number => {
    if (!joinDate) return 0;
    try {
      return new Date().getFullYear() - new Date(joinDate).getFullYear();
    } catch {
      return 0;
    }
  };

  // Helper function to safely format join date
  const formatJoinDate = (joinDate: string | undefined): string => {
    if (!joinDate) return "Unknown";
    try {
      return new Date(joinDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    } catch {
      return "Unknown";
    }
  };

  const makerName = makerData?.name || product?.maker?.name || "Unknown Maker";

  return (
    <Box component="main" sx={{ bgcolor: '#fafafa' }}>
      <SmallNavbar
        category={product.category?.name || "Category"}
        page1={product.category?.name || "Products"}
        page2={product.name}
      />

      <Container
        maxWidth={false}
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '100%',
            md: '1400px',
            lg: '1600px',
            xl: '1850px'
          },
          mx: 'auto',
        }}
      >
        <Box
          component="section"
          sx={{
            py: { xs: 4, sm: 6, md: 8 },
            bgcolor: 'white',
            borderRadius: { xs: 0, md: '16px 16px 0 0' },
            boxShadow: { xs: 'none', md: '0 4px 20px rgba(0,0,0,0.08)' }
          }}
        >
          <ProductDetails
            id={product._id}
            name={product.name}
            images={transformedImages}
            mainImage={product.mainImage}
            rating={actualAverageRating}
            reviewCount={actualReviewCount}
            inStock={product.inStock !== false}
            stockCount={product.stockCount || 10}
            price={product.price}
            originalPrice={product.priceBeforeDiscount}
            colors={transformedColors || []}
            description={product.shortDescription || product.description}
            discountPercentage={product.discountPercentage || 0}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isInWishlist(product._id)}
          />
        </Box>

        {/* Feature Cards Section */}
        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10, lg: 12 },
            mt: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <FeatureCardsSection
            sectionTitle={FeatureCardsSectionData.sectionTitle}
            sectionDescription={FeatureCardsSectionData.sectionDescription}
            cards={FeatureCardsSectionData.cards}
          />
        </Box>

        {/* About The Maker Section */}
        <Box
          component="section"
          sx={{
            py: { xs: 6, sm: 8, md: 10 },
            mb: { xs: 4, sm: 6, md: 8 },
            bgcolor: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)',
            mx: { xs: 1, sm: 2, md: 3 },
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #1976d2, #42a5f5, #1976d2)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s ease-in-out infinite',
            },
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200% 0' },
              '100%': { backgroundPosition: '200% 0' }
            }
          }}
        >
          <AbountMaker
            title="About The Maker"
            makerInfo={{
              name: makerName,
              location: makerData?.location || product?.maker?.location || "Unknown Location",
              miniBio: makerData?.aboutMe || product?.maker?.message || "Passionate artisan creating beautiful handcrafted pieces.",
              avatar: makerData?.image || product?.maker?.image || "/images/makers/default-maker.jpg",
              joinedDate: formatJoinDate(makerData?.joinDate),
              rating: makerData?.rating || 4.5,
              totalReviews: 127,
              specialties: makerData?.specialties || ["Handcrafted", "Artisan"],
              yearsOfExperience: calculateYearsOfExperience(makerData?.joinDate),
              isVerified: true,
              totalProducts: 45,
              completedOrders: 320
            }}
            buttonText1="Visit Artisan Shop"
            buttonText2={`View More by ${makerName}`}
            imageSrc={makerData?.image || product?.maker?.image || "/images/shared/storyFeature.jpg"}
            imageAlt={`${makerName} crafting beautiful handmade pieces`}
            onButton1Click={() => {
              console.log(`Navigate to ${makerName}'s artisan shop`);
              // router.push(`/makers/${makerData?.slug}`);
            }}
            onButton2Click={() => {
              console.log(`View more products by ${makerName}`);
              // router.push(`/products?maker=${makerData?.slug}`);
            }}
          />
        </Box>

        {/* Similar Products Section */}
        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <SimilarProducts
            Products={similarProductsData}
            onAddToCart={() => console.log("Product added to cart")}
          />
        </Box>

        {/* Comments Section */}
        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <Comments onCommentSubmitted={handleCommentSubmitted} />
        </Box>

        {/* Existing Comments Section */}
        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <ExisitingComments
            mockComments={testimonials || []}
            onRefetch={refetchTestimonials}
          />
        </Box>

        {/* Second Feature Cards Section */}
        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10, lg: 12 },
            mt: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <FeatureCardsSection
            sectionTitle={FeatureCardsSectionData2.sectionTitle}
            sectionDescription={FeatureCardsSectionData2.sectionDescription}
            cards={FeatureCardsSectionData2.cards}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPage;