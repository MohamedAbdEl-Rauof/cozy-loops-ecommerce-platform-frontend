'use client';

import { Box, Container } from '@mui/material';
import HeroSection from '@/components/home/HeroSection';
import ShopByCraft from '@/components/home/ShopByCraft';
import FeaturedCategories from '@/components/shared/FeaturedCategories';
import StoryFeature from '@/components/shared/StoryFeature';
import Testimonials from '@/components/shared/Testimonials';

const featuredCategories = {
  title: "Need a gift? Make it personal.",
  isTitleCenter: false,
  description: "Custom handmade gifts that speak louder than words.",
  ctaText: "",
  buttonText: "Explore Custom Picks",
  buttonLink: "categories",
}

const testimonialsData = {
  title: "What Our Shoppers Are Saying",
  description: "Real words from our beloved Cozy Loops community.",
  items: [
    {
      id: 1,
      name: "Mariam S.",
      avatar: "/images/navbarLogo.svg?height=60&width=60",
      text: "Every detail felt personal — I'll definitely order again!",
      rating: 5,
    },
    {
      id: 2,
      name: "Ahmed R.",
      avatar: "/images/navbarLogo.svg?height=60&width=60",
      text: "It's like shopping at a handmade bazaar... from my couch.",
      rating: 5,
    },
    {
      id: 3,
      name: "Dalia A.",
      avatar: "/images/navbarLogo.svg?height=60&width=60",
      text: "Support local talent and get amazing quality? Yes, please.",
      rating: 5,
    },
  ]
};

export default function Home() {
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
            onButtonClick="/"
          />
        </Box>

        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
          <ShopByCraft />
        </Box>

        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
          <Testimonials testimonialsData={testimonialsData} />
        </Box>
      </Container>
    </Box>
  );
}