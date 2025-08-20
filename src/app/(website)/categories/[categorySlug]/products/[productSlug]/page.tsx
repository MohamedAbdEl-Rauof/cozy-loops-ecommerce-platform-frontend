'use client'

import { Box, Container, CircularProgress, Alert } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

import ExisitingComments from '@/components/about/ExisitingComments';
import AboutMaker from '@/components/product-details/AboutMaker';
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

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.categorySlug as string;
  const productSlug = params.productSlug as string;
  const { isInWishlist } = useWishlist();
  const { addToWishlist } = useAddToWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const { data: product, isLoading, error } = useProductFromCategory(categorySlug, productSlug);
  const { data: testimonials, refetch: refetchTestimonials } = useProductsTestimonialsBySlug(productSlug);
  const { data: makerData } = useMakersBySlug(product?.maker?.slug || '');
  const { data: makerProductsData } = useMakerProducts(product?.maker?._id || '');

  const productData = useMemo(() =>
    product ? transformProductData(product, testimonials, isInWishlist) : null,
    [product, testimonials, isInWishlist]
  );

  const makerInfo = useMemo(() =>
    transformMakerData(makerData, product || undefined),
    [makerData, product]
  );

  const similarProductsData = useMemo(() => {
    if (!product?._id) {
      return { title: "Similar Products", productsData: [] };
    }

    return transformSimilarProducts(makerProductsData, product._id, makerInfo.name, product?.category?.name);
  }, [makerProductsData, product?._id, makerInfo.name, product?.category?.name]);

  const commentsData = useMemo(() => {
    if (!product?._id) {
      return [];
    }

    return transformCommentsData(testimonials, product._id);
  }, [testimonials, product?._id]);

  const handleToggleFavorite = () => {
    if (!product) return;

    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
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

  if (isLoading) {
    return (
      <Box component="main" sx={{ bgcolor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

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
    <Box
      component="main"
      sx={{
        bgcolor: '#fafafa',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <SmallNavbar
        category={"Category"}
        page1={product.category?.name || "Products"}
        page2={product.name}
      />

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: '100%',
          maxWidth: 'none',
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          pb: { xs: 4, sm: 6, md: 8 }
        }}
      >

        <Box
          component="section"
          sx={{
            py: { xs: 4, sm: 6, md: 8 },
            width: '100%'
          }}
        >
          <ProductDetails
            productData={productData}
            onToggleFavorite={handleToggleFavorite}
          />
        </Box>

        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10, lg: 12 },
            mt: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 3, md: 4 },
            width: '100%'
          }}
        >
          <Container maxWidth={false} sx={{ maxWidth: '97%' }}>
            <FeatureCardsSection
              sectionTitle={FeatureCardsSectionData.sectionTitle}
              sectionDescription={FeatureCardsSectionData.sectionDescription}
              cards={FeatureCardsSectionData.cards}
            />
          </Container>
        </Box>

        <Box
          component="section"
          sx={{
            py: { xs: 6, sm: 8, md: 10 },
            mb: { xs: 4, sm: 6, md: 8 },
            mx: { xs: 1, sm: 2, md: 3 },
            width: 'calc(100% - 16px)'
          }}
        >
          <AboutMaker
            title="About The Maker"
            makerInfo={makerInfo}
            imageSrc={makerData?.image || product?.maker?.image || "/images/shared/storyFeature.jpg"}
            imageAlt={`${makerData?.name} crafting beautiful handmade pieces`}
            onShopClick={handleMakerShopClick}
            onViewMoreClick={handleViewMoreClick}
            buttonText1={`Visit Artisan Shop`}
            buttonText2={`View More By ${makerData?.name}`}
          />
        </Box>

        <Box component="section" >
          <Comments onCommentSubmitted={() => refetchTestimonials()} />
        </Box>

        <Box
          component="section"
          sx={{
            py: { xs: 6, sm: 8, md: 10 },
            mb: { xs: 4, sm: 6, md: 8 },
            mx: { xs: 1, sm: 2, md: 3 },
            width: 'calc(100% - 16px)'
          }}
        >
          <Container maxWidth="xl">
            <ExisitingComments commentsData={commentsData} onRefresh={() => refetchTestimonials()} />
          </Container>
        </Box>

        {similarProductsData.productsData.length > 0 && (
          <Box component="section" >
            <SimilarProducts
              productsData={similarProductsData}
              onQuickView={handleQuickView}
            />
          </Box>
        )}

        <Box
          component="section"
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 4, sm: 6 },
            width: '100%'
          }}
        >
          <Container maxWidth="xl">
            <FeatureCardsSection
              sectionTitle={FeatureCardsSectionData2.sectionTitle}
              sectionDescription={FeatureCardsSectionData2.sectionDescription}
              cards={FeatureCardsSectionData2.cards}
            />
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPage;