'use client';

import ImageWithText from "@/components/about/ImageWithText";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import { Box, Container } from "@mui/material";

const featuredCategories = {
  title: "Meet Fatma from Cairo – Creating jewelry inspired by tradition",
  isTitleCenter: false,
  description: "We love hearing from our community.",
  ctaText: "",
  buttonText: "View Profile",
  buttonLink: "View Profile ",
}

const categoriesData = {
  title: "Explore Our Categories",
  description: "Discover unique handcrafted items across various categories, each telling its own story.",
  categories: [
    {
      id: "1",
      title: "Handmade Jewelry",
      description: "Beautiful, unique jewelry pieces crafted with love and attention to detail.",
      image: "/images/categories.png",
      buttonText: "Shop Jewelry",
      buttonLink: "/categories/jewelry",
      slug: "handmade-jewelry"
    },
    {
      id: "2",
      title: "Home Decor",
      description: "Transform your space with our carefully curated home decoration items.",
      image: "/images/categories.png",
      buttonText: "Shop Decor",
      buttonLink: "/categories/home-decor",
      slug: "home-decor"
    },
    {
      id: "3",
      title: "Textiles & Fabrics",
      description: "Premium quality textiles and fabrics for all your creative projects.",
      image: "/images/categories.png",
      buttonText: "Shop Textiles",
      buttonLink: "/categories/textiles",
      slug: "textiles-and-fabrics"
    },
    {
      id: "4",
      title: "Pottery & Ceramics",
      description: "Handcrafted pottery and ceramic pieces that bring warmth to any space.",
      image: "/images/categories.png",
      buttonText: "Shop Pottery",
      buttonLink: "/categories/pottery",
      slug: "pottery-and-ceramics"
    },
    {
      id: "5",
      title: "Art & Paintings",
      description: "Original artwork and paintings from talented local artists.",
      image: "/images/categories.png",
      buttonText: "Shop Art",
      buttonLink: "/categories/art",
      slug: "art-and-paintings"
    },
    {
      id: "6",
      title: "Accessories",
      description: "Stylish accessories to complement your unique style and personality.",
      image: "/images/categories.png",
      buttonText: "Shop Accessories",
      buttonLink: "/categories/accessories",
      slug: "accessories"
    }
  ]
};

export default function Categories() {
  return (
    <Box component="main" sx={{ bgcolor: 'white' }}>
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
        <Box sx={{ mb: { xs: 8, sm: 10, md: 12, lg: 16 }, pt: { xs: 4, sm: 6, md: 8, lg: 10 } }}>
          <ImageWithText
            title="Find Your Favorite Craft"
            description="Browse through a world of handmade wonders, each with its own texture, soul, and story."
            imageSrc="/images/shared/mainCategoriesImage.png"
            imageAlt="Find Your Favorite Craft"
            flipContent={false}
            imageWidth={{ xs: '100%', sm: '80%', md: '90%', lg: '100%' }}
            imageHeight={{ xs: '500px', sm: '600px', md: '750px', lg: '850px' }}
            buttonText="Explore All Categories  "
            buttonLink="/products"
          />
        </Box>

        <Box sx={{ mb: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
          <CategoriesGrid 
            title={categoriesData.title}
            description={categoriesData.description}
            categories={categoriesData.categories}
          />
        </Box>

        <Box sx={{ pb: { xs: 6, sm: 8, md: 10, lg: 12 } }}>
          <FeaturedCategories featuredCategories={featuredCategories} />
        </Box>
      </Container>
    </Box>
  );
}