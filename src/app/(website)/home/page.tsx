'use client';

import { Box } from '@mui/material';
import HeroSection from '@/components/home/HeroSection';
import ShopByCraft from '@/components/home/ShopByCraft';
import FeaturedCategories from '@/components/shared/FeaturedCategories';
import Footer from '@/components/shared/Footer';
import StoryFeature from '@/components/shared/StoryFeature';
import Testimonials from '@/components/shared/Testimonials';

const testimonialsData = {
  title: "What Our Shoppers Are Saying",
  description: "Real words from our beloved Cozy Loops community.",
  items: [
    {
      id: 1,
      name: "Mariam S.",
      avatar: "/placeholder.svg?height=60&width=60",
      text: "Every detail felt personal — I'll definitely order again!",
      rating: 5,
    },
    {
      id: 2,
      name: "Ahmed R.",
      avatar: "/placeholder.svg?height=60&width=60",
      text: "It's like shopping at a handmade bazaar... from my couch.",
      rating: 5,
    },
    {
      id: 3,
      name: "Dalia A.",
      avatar: "/placeholder.svg?height=60&width=60",
      text: "Support local talent and get amazing quality? Yes, please.",
      rating: 5,
    },
  ]
};

export default function Home() {
  return (
    <Box component="main" sx={{ bgcolor: 'white'}}>
      <HeroSection />
      
      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <FeaturedCategories
          title="Need a gift? Make it personal."
          isTitleCenter={false}
          description="Custom handmade gifts that speak louder than words."
          ctaText=""
          buttonText="Explore Custom Picks"
          onButtonClick="/category"
        />
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
      
      <Footer />
    </Box>
  );
}