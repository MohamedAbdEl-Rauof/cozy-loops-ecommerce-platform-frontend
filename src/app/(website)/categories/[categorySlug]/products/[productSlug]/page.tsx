'use client'

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Container, CircularProgress, Alert } from '@mui/material';

import ExisitingComments from '@/components/about/ExisitingComments';
import Comments from '@/components/product-details/Comments';
import SimilarProducts from '@/components/product-details/SimilarProducts';
import FeatureCardsSection from '@/components/shared/FeatureCardsSection';
import ProductDetails from '@/components/shared/PrdouctDetails';
import SmallNavbar from '@/components/shared/SmallNavbar';

import { FeatureCardsSectionData, FeatureCardsSectionData2 } from '@/data/pages/productDetailsPageData';
import { useMakerProducts, useMakersBySlug } from '@/hooks/useMakers';
import { useProductFromCategory } from '@/hooks/useProducts';
import { useProductsTestimonialsBySlug } from '@/hooks/useTestimonials';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/hooks/useWishlist';

import {
  transformProductData,
  transformMakerData,
  transformSimilarProducts,
  transformCommentsData
} from '@/utils/dataTransformers';
import AboutMaker from '@/components/product-details/AboutMaker';

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.categorySlug as string;
  const productSlug = params.productSlug as string;

  // Hooks
  const { isInWishlist } = useWishlist();
  const { addToWishlist } = useAddToWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();

  // Data fetching
  const { data: product, isLoading, error } = useProductFromCategory(categorySlug, productSlug);
  const { data: testimonials, refetch: refetchTestimonials } = useProductsTestimonialsBySlug(productSlug);
  const { data: makerData } = useMakersBySlug(product?.maker?.slug || '');
  const { data: makerProductsData } = useMakerProducts(product?.maker?._id || '');

  // Transformed data
  const productData = useMemo(() =>
    product ? transformProductData(product, testimonials, isInWishlist) : null,
    [product, testimonials, isInWishlist]
  );

  const makerInfo = useMemo(() =>
    transformMakerData(makerData, product),
    [makerData, product]
  );

  const similarProductsData = useMemo(() =>
    transformSimilarProducts(makerProductsData, product?._id, makerInfo.name, product?.category?.name),
    [makerProductsData, product?._id, makerInfo.name, product?.category?.name]
  );

  const commentsData = useMemo(() =>
    transformCommentsData(testimonials, product?._id),
    [testimonials, product?._id]
  );

  // Event handlers
  const handleToggleFavorite = () => {
    if (!product) return;
    isInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product._id);
  };

  const handleQuickView = (categorySlug: string, productSlug: string) => {
    router.push(`/categories/${categorySlug}/products/${productSlug}`);
  };

  const handleMakerShopClick = () => {
    console.log(`Navigate to ${makerInfo.name}'s artisan shop`);
    // router.push(`/makers/${makerData?.slug}`);
  };

  const handleViewMoreClick = () => {
    console.log(`View more products by ${makerInfo.name}`);
    // router.push(`/products?maker=${makerData?.slug}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <Box component="main" sx={{ bgcolor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }


  // Error states
  if (error || !product) {
    const errorMessage = error instanceof Error ? error.message : 'Product not found';
    return (
      <Box component="main" sx={{ bgcolor: 'white', p: 4 }}>
        <Container maxWidth="md">
          <Alert severity={error ? "error" : "warning"} sx={{ mb: 4 }}>
            {errorMessage}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
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
        {/* Product Details Section */}
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
            productData={productData}
            onToggleFavorite={handleToggleFavorite}
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
          <AboutMaker
            title="About The Maker"
            makerInfo={makerInfo}
            imageSrc={makerData?.image || product?.maker?.image || "/images/shared/storyFeature.jpg"}
            imageAlt={`${makerData?.name} crafting beautiful handmade pieces`}
            onShopClick={handleMakerShopClick}
            onViewMoreClick={handleViewMoreClick}
          />
        </Box>

        {/* Comments Section */}
        <Box
          component="section"
          sx={{
            py: { xs: 6, sm: 8, md: 10 },
            mb: { xs: 4, sm: 6, md: 8 },
            bgcolor: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)',
            mx: { xs: 1, sm: 2, md: 3 }
          }}
        >
          <Comments onCommentSubmitted={() => refetchTestimonials()} />
        </Box>

        {/* Existing Comments Section */}
        <Box
          component="section"
          sx={{
            py: { xs: 6, sm: 8, md: 10 },
            mb: { xs: 4, sm: 6, md: 8 },
            bgcolor: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)',
            mx: { xs: 1, sm: 2, md: 3 }
          }}
        >
          <ExisitingComments commentsData={commentsData} onRefresh={() => refetchTestimonials()} />
        </Box>

        {/* Similar Products Section */}
        {similarProductsData.productsData.length > 0 && (
          <Box
            component="section"
            sx={{
              py: { xs: 6, sm: 8, md: 10 },
              mb: { xs: 4, sm: 6, md: 8 },
              bgcolor: 'white',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.04)',
              mx: { xs: 1, sm: 2, md: 3 }
            }}
          >
            <SimilarProducts
              productsData={similarProductsData.productsData}
              onQuickView={handleQuickView}
            />
          </Box>
        )}

        {/* Second Feature Cards Section */}
        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10, lg: 12 },
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