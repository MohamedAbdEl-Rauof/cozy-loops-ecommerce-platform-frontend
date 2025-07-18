'use client';

import { Box, Container } from '@mui/material';
import HeroSection from '@/components/home/HeroSection';
import ShopByCraft from '@/components/home/ShopByCraft';
import FeaturedCategories from '@/components/shared/FeaturedCategories';
import StoryFeature from '@/components/shared/StoryFeature';
import Testimonials from '@/components/shared/Testimonials';
import { useCategories } from "@/hooks/useCategories";
import { useTestimonials } from '@/hooks/useTestimonials';

const featuredCategories = {
  title: "Need a gift? Make it personal.",
  isTitleCenter: false,
  description: "Custom handmade gifts that speak louder than words.",
  image: "/images/shared/featuredCategory.jpg",
  ctaText: "",
  buttonText: "Explore Custom Picks",
  buttonLink: "categories",
}



export default function Home() {
  const {
    data: categories = [],
    isLoading: loading,
    error,
  } = useCategories();

  const {
    data: testimonialsItems = [],
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useTestimonials();


  const testimonialsData = {
    title: "What Our Shoppers Are Saying",
    description: "Real words from our beloved Cozy Loops community.",
    items: testimonialsItems
  };

  const craftCategories = categories.map(category => ({
    id: category._id,
    name: category.name,
    image: category.image || "/images/categories.png",
    fallbackImage: '/images/placeholder.jpg',
    link: `/categories/${category.slug}`,
    description: category.description || '',
  }))


  return (
    <Box component="main" sx={{ bgcolor: 'white' }}>
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(135deg, #FBE8CC 0%, #FFF3E0 100%)',
        }}
      >
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
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
            mx: 'auto',
          }}
        >
          <HeroSection />
        </Container>
      </Box>

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
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          mx: 'auto',
        }}
      >
        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
          <FeaturedCategories featuredCategories={featuredCategories} />
        </Box>

        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
          <StoryFeature
            title="Our Story"
            description="At Cozy Loops, we believe in the beauty of handmade craftsmanship. Each bag is knitted with care, blending comfort and style to create pieces that are as unique as you are."
            buttonText="Meet the Maker"
            imageSrc="/images/shared/storyFeature.jpg"
            imageAlt="Hands crafting a knitted bag"
            onButtonClick="/test"
            badge="Our Story"
          />
        </Box>

        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
          <ShopByCraft craftCategories={craftCategories} />
        </Box>

        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
            {testimonialsLoading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <p>Loading testimonials...</p>
            </Box>
          ) : testimonialsError ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <p>Unable to load testimonials at the moment.</p>
            </Box>
          ) : (
            <Testimonials testimonialsData={testimonialsData} />
          )}
        </Box>
      </Container>
    </Box>
  );
}