'use client';

import { Box, Container, CircularProgress, Alert, Typography } from '@mui/material';

import HeroSection from '@/components/home/HeroSection';
import ShopByCraft from '@/components/home/ShopByCraft';
import FeaturedCategories from '@/components/shared/FeaturedCategories';
import StoryFeature from '@/components/shared/StoryFeature';
import Testimonials from '@/components/shared/Testimonials';
import {
  featuredCategoriesData,
  storyFeatureData,
  testimonialsData,
} from '@/data/pages/homePageData';
import { useCategories } from "@/hooks/useCategories";
import { useTestimonials } from '@/hooks/useTestimonials';
import {
  containerConfig,
  heroBackgroundGradient,
  sectionPadding
} from '@/types/home';

export default function Home() {
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    data: testimonialsItems = [],
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useTestimonials();

  const craftCategories = categories.map(category => ({
    id: category._id,
    name: category.name,
    image: category.image || "/images/categories.png",
    fallbackImage: '/images/placeholder.jpg',
    link: `/categories/${category.slug}`,
    description: category.description || `Explore our ${category.name.toLowerCase()} collection`,
  }));

  const testimonialsWithItems = {
    ...testimonialsData,
    items: testimonialsItems
  };

  return (
    <Box component="main" sx={{ bgcolor: 'white' }}>
      <Box
        sx={{
          width: '100%',
          background: heroBackgroundGradient,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            ...containerConfig,
            mx: 'auto',
          }}
        >
          <HeroSection />
        </Container>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          ...containerConfig,
          mx: 'auto',
          gap: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          component="section"
          sx={{ py: sectionPadding }}
          aria-labelledby="featured-categories-title"
        >
          <FeaturedCategories featuredCategories={featuredCategoriesData} />
        </Box>

        <Box
          component="section"
          sx={{ py: sectionPadding }}
          aria-labelledby="story-section-title"
        >
          <StoryFeature
            title={storyFeatureData.title}
            description={storyFeatureData.description}
            buttonText={storyFeatureData.buttonText}
            imageSrc={storyFeatureData.imageSrc}
            imageAlt={storyFeatureData.imageAlt}
            onButtonClick={storyFeatureData.onButtonClick}
            badge={storyFeatureData.badge}
          />
        </Box>

        <Box
          component="section"
          sx={{ py: sectionPadding }}
          aria-labelledby="shop-by-craft-title"
        >
          {categoriesLoading ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CircularProgress size={40} sx={{ color: '#FF7043' }} />
              <Typography variant="body1" sx={{ mt: 2, color: '#5D4037' }}>
                Loading craft categories...
              </Typography>
            </Box>
          ) : categoriesError ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Alert
                severity="error"
                sx={{
                  maxWidth: 400,
                  mx: 'auto',
                  '& .MuiAlert-message': {
                    textAlign: 'center'
                  }
                }}
              >
                Unable to load categories. Please try again later.
              </Alert>
            </Box>
          ) : (
            <ShopByCraft craftCategories={craftCategories} />
          )}
        </Box>
      </Container>
      <Box
        component="section"
        sx={{ py: sectionPadding }}
        aria-labelledby="testimonials-title"
      >
        {testimonialsLoading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress size={40} sx={{ color: '#FF7043' }} />
            <Typography variant="body1" sx={{ mt: 2, color: '#5D4037' }}>
              Loading testimonials...
            </Typography>
          </Box>
        ) : testimonialsError ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert
              severity="info"
              sx={{
                maxWidth: 400,
                mx: 'auto',
                '& .MuiAlert-message': {
                  textAlign: 'center'
                }
              }}
            >
              Testimonials are temporarily unavailable.
            </Alert>
          </Box>
        ) : (
          <Testimonials testimonialsData={testimonialsWithItems} />
        )}
      </Box>
    </Box>
  );
}