'use client';

import ImageWithText from "@/components/about/ImageWithText";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import CategoriesGrid from "@/components/shared/CategoriesGrid";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import { useCategories } from "@/hooks/useCategories";
import { useRef } from "react";

export default function Categories() {
  const categoriesGridRef = useRef<HTMLDivElement>(null);
  
   const {
    data: categories = [],
    isLoading: loading,
    error,
  } = useCategories();

  const scrollToCategoriesGrid = () => {
    if (categoriesGridRef.current) {
      categoriesGridRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const heroSectionData = {
    title: "Find Your Favorite Craft",
    description: "Browse through a world of handmade wonders, each with its own texture, soul, and story.",
    imageSrc: "/images/shared/mainCategoriesImage.png",
    imageAlt: "Find Your Favorite Craft",
    flipContent: false,
    imageWidth: { xs: '100%', sm: '80%', md: '90%', lg: '100%' },
    imageHeight: { xs: '500px', sm: '600px', md: '750px', lg: '850px' },
    buttonText: "Explore All Categories",
    buttonLink: "", 
    onButtonClick: scrollToCategoriesGrid
  };

  const featuredCategories = {
    title: "Meet Fatma from Cairo – Creating jewelry inspired by tradition",
    isTitleCenter: false,
    description: "We love hearing from our community.",
    ctaText: "",
    image: "/images/shared/featuredCategory.jpg",
    buttonText: "View Profile",
    buttonLink: "View Profile ",
  }

  const transformedCategoriesData = {
    title: "Explore Our Categories",
    description: "Discover unique handcrafted items across various categories, each telling its own story.",
    categories: categories.map(category => ({
      id: category._id,
      title: category.name,
      description: category.description || '',
      image: category.image || "/images/categories.png",
      buttonText: category.buttonText || `Shop ${category.name}`,
      isMaker: false,
      buttonLink: `/categories/${category.slug}`
    }))
  };

  if (loading) {
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
    return (
      <Box component="main" sx={{ bgcolor: 'white', p: 4 }}>
        <Container maxWidth="md">
          <Alert severity="error" sx={{ mb: 4 }}>
            {error instanceof Error ? error.message : 'Failed to fetch categories'}
          </Alert>
        </Container>
      </Box>
    );
  }

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
          <ImageWithText dataContent={heroSectionData} />
        </Box>

        <Box 
          ref={categoriesGridRef}
          sx={{ mb: { xs: 8, sm: 10, md: 12, lg: 16 } }}
        >
          <CategoriesGrid
            categoriesData={transformedCategoriesData}
          />
        </Box>

        <Box sx={{ pb: { xs: 6, sm: 8, md: 10, lg: 12 } }}>
          <FeaturedCategories featuredCategories={featuredCategories} />
        </Box>
      </Container>
    </Box>
  );
}