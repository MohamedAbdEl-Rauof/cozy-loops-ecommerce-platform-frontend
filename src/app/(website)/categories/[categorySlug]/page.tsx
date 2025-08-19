'use client';

import { Box, Container, CircularProgress, Alert, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useRef } from 'react';

import CategoriesGrid from '@/components/shared/CategoriesGrid';
import CategoryStatsCard from '@/components/shared/CategoryStatsCard';
import FeaturedCategories from '@/components/shared/FeaturedCategories';
import ProductsOfCategory from '@/components/shared/ProductsOfCategory';
import SmallNavbar from '@/components/shared/SmallNavbar';
import StoryFeature from '@/components/shared/StoryFeature';
import Testimonials from '@/components/shared/Testimonials';
import {
  createCategoriesData,
  createFeaturedCategoriesData,
  createTestimonialsData,
  createProductsConfig
} from '@/data/pages/categoryProductPageData';
import { useCategoryBySlug } from '@/hooks/useCategories';
import { useProductsByCategorySlug } from '@/hooks/useProducts';
import { useTestimonials } from '@/hooks/useTestimonials';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.categorySlug as string;
  const productsGridRef = useRef<HTMLDivElement>(null);

  const {
    data: selectedCategory,
    isLoading: categoryLoading,
    error: categoryError,
  } = useCategoryBySlug(slug);

  const {
    data: testimonialsItems = [],
  } = useTestimonials();

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useProductsByCategorySlug(slug);

  if (categoryLoading || productsLoading) {
    return (
      <Box
        component="main"
        sx={{
          bgcolor: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} sx={{ color: 'var(--primary-color)' }} />
        <Typography variant="h6" sx={{ color: 'var(--text-secondary)' }}>
          Loading {slug} collection...
        </Typography>
      </Box>
    );
  }

  if (categoryError || productsError) {
    const errorMessage =
      categoryError instanceof Error
        ? categoryError.message
        : productsError instanceof Error
          ? productsError.message
          : 'Failed to fetch category data';

    return (
      <Box component="main" sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="md">
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Oops! Something went wrong
            </Typography>
            {errorMessage}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!selectedCategory) {
    return (
      <Box component="main" sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="md">
          <Alert severity="warning" sx={{ mb: 4, borderRadius: '12px' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Category Not Found
            </Typography>
            The category &quot;{slug}&quot; doesn&apos;t exist or has been removed.
          </Alert>
        </Container>
      </Box>
    );
  }

  const categoriesData = createCategoriesData(selectedCategory, productsData);
  const featuredCategories = createFeaturedCategoriesData(selectedCategory, categoriesData);
  const testimonialsData = createTestimonialsData(selectedCategory, testimonialsItems);
  const productsConfig = createProductsConfig(selectedCategory, slug, productsData);

  return (
    <Box component="main" sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <SmallNavbar category="Category" page1={selectedCategory.name} />

      <Container
        maxWidth={false}
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '100%',
            md: '1400px',
            lg: '1600px',
            xl: '1850px',
          },
          px: 0,
          mx: 'auto',
        }}
      >
        <StoryFeature
          title={selectedCategory.heroTitle || `Discover ${selectedCategory.name}`}
          description={
            selectedCategory.heroDescription ||
            selectedCategory.description ||
            `Explore our curated collection of handcrafted ${selectedCategory.name.toLowerCase()}`
          }
          buttonText={selectedCategory.buttonText || `Shop ${selectedCategory.name}`}
          imageSrc={selectedCategory.heroImage || selectedCategory.image || '/images/shared/productImage.jpg'}
          imageAlt={`Beautiful ${selectedCategory.name?.toLowerCase()} collection showcasing artisan craftsmanship`}
          onButtonClick="#products-section"
          badge="Featured Collection"
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
            px: { xs: 2, sm: 3, md: 4, lg: 4 },
            mx: 'auto',
          }}
        >
          <CategoryStatsCard
            categoryName={selectedCategory.name}
            description={
              selectedCategory.description || `Explore our curated collection of handcrafted ${selectedCategory.name.toLowerCase()}`
            }
            totalProducts={productsData?.pagination?.totalItems || 0}
            totalArtisans={categoriesData.categories?.length || 0}
            rating={4.8}
          />

          <Box
            id="products-section"
            ref={productsGridRef}
            sx={{
              py: { xs: 6, sm: 8, md: 10 },
              bgcolor: 'white'
            }}
          >
            <ProductsOfCategory Products={productsConfig} />
          </Box>
        </Container>

        <Box
          sx={{
            bgcolor: '#f8f9fa',
            position: 'relative',
          }}
        >
          <CategoriesGrid categoriesData={categoriesData} />
        </Box>

        {categoriesData.categories && categoriesData.categories.length > 0 && (
          <Box sx={{ py: { xs: 6, md: 12 } }}>
            <FeaturedCategories featuredCategories={featuredCategories} />
          </Box>
        )}

        {testimonialsItems.length > 0 && (
          <Box
            component="section"
            sx={{
              py: { xs: 2, md: 4 },
              bgcolor: '#f8f9fa'
            }}
          >
            <Testimonials testimonialsData={testimonialsData} />
          </Box>
        )}

        {(!productsData?.products || productsData.products.length === 0) && (
          <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'var(--text-secondary)' }}>
              No products found in {selectedCategory.name}
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
              Check back soon for new arrivals in this category.
            </Typography>
          </Container>
        )}
      </Container>
    </Box>
  );
}