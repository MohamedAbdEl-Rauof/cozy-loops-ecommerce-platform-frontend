'use client';

import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { Box, Container, CircularProgress, Alert } from '@mui/material';
import { useCategoryBySlug } from '@/hooks/useCategories';
import { useProductsByCategorySlug } from '@/hooks/useProducts';
import SmallNavbar from "@/components/shared/SmallNavbar";
import StoryFeature from "@/components/shared/StoryFeature";
import ProductsOfCategory from "@/components/shared/ProductsOfCategory";
import CategoriesGrid from "@/components/shared/CategoriesGrid";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import Testimonials from "@/components/shared/Testimonials";
import { useTestimonials } from '@/hooks/useTestimonials';

export default function CategoryPage() {
    const params = useParams();
    const slug = params.categorySlug as string;
    const productsGridRef = useRef<HTMLDivElement>(null);
    // React Query for category data
    const {
        data: selectedCategory,
        isLoading: categoryLoading,
        error: categoryError,
    } = useCategoryBySlug(slug);

      const {
        data: testimonialsItems = [],
        isLoading: testimonialsLoading,
        error: testimonialsError,
      } = useTestimonials();

    // React Query for products data
    const {
        data: productsData,
        isLoading: productsLoading,
        error: productsError,
    } = useProductsByCategorySlug(slug);

    const scrollToCategoriesGrid = () => {
        if (productsGridRef.current) {
            productsGridRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    // Show loading if either category or products are loading
    if (categoryLoading || productsLoading) {
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

    // Show error if either category or products have errors
    if (categoryError || productsError) {
        const errorMessage = categoryError instanceof Error
            ? categoryError.message
            : productsError instanceof Error
                ? productsError.message
                : 'Failed to fetch data';

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

    if (!selectedCategory) {
        return (
            <Box component="main" sx={{ bgcolor: 'white', p: 4 }}>
                <Container maxWidth="md">
                    <Alert severity="warning" sx={{ mb: 4 }}>
                        Category not found
                    </Alert>
                </Container>
            </Box>
        );
    }

    if (!selectedCategory) {
        return (
            <Box component="main" sx={{ bgcolor: 'white', p: 4 }}>
                <Container maxWidth="md">
                    <Alert severity="warning" sx={{ mb: 4 }}>
                        Category not found
                    </Alert>
                </Container>
            </Box>
        );
    }

    const categoriesData = {
        title: `Meet the ${selectedCategory.name} Artisans`,
        description: "Meet the talented artisans who bring creativity and passion to every stitch, each with their own unique story and artistic vision.",
        categories: productsData?.products?.reduce((uniqueMakers: any[], product: any) => {
            // Check if maker already exists in the array
            const existingMaker = uniqueMakers.find(maker => maker.id === product.maker._id);

            if (!existingMaker) {
                uniqueMakers.push({
                    id: product.maker._id,
                    title: `${product.maker.name} from ${product.maker.location}`,
                    description: product.maker.message || "Creating beautiful handcrafted pieces with passion and dedication.",
                    image: product.maker.image || "/images/shared/makers/defaultMaker.png",
                    isMaker: true,
                    buttonText: "View Profile",
                    buttonLink: `/makers/${product.maker.slug}`,
                    slug: product.maker.slug
                });
            }

            return uniqueMakers;
        }, []) || []
    };

    const featuredCategories = {
        title: "Meet Fatma from Cairo – Creating jewelry inspired by tradition",
        isTitleCenter: false,
        description: "",
        image: "/images/shared/productImage.jpg",
        ctaText: "",
        buttonText: "View Profile",
        buttonLink: "#"
    }

    const testimonialsData = {
    title: "What Our Shoppers Are Saying",
    description: "Real words from our beloved Cozy Loops community.",
    items: testimonialsItems
  };

    return (
        <Box component="main" sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
            <SmallNavbar
                category="Category"
                page1={selectedCategory.name}
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
                    px: 0,
                    mx: 'auto',
                }}
            >
                <StoryFeature
                    title={selectedCategory.heroTitle || selectedCategory.name || 'Category'}
                    description={selectedCategory.heroDescription || selectedCategory.description || 'Discover our handcrafted collection'}
                    buttonText={selectedCategory.buttonText || `Shop All ${selectedCategory.name}`}
                    imageSrc={selectedCategory.heroImage || selectedCategory.image || '/images/shared/productImage.jpg'}
                    imageAlt={`Beautiful ${selectedCategory.name?.toLowerCase() || 'category'} artwork showcasing vibrant textures and patterns`}
                    onButtonClick={scrollToCategoriesGrid}
                />

                <Box ref={productsGridRef}
                    sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'white' }}>
                    <ProductsOfCategory
                        Products={{
                            title: `Best in ${selectedCategory.name}`,
                            mainSlug: slug,
                            productsData: productsData?.products?.map(product => ({
                                id: product._id,
                                title: product.name,
                                image: product.mainImage || product.images?.[0] || '/images/categories.png',
                                price: product.price,
                                slug: product.slug,
                            })) || []
                        }}
                    />
                </Box>

                <Box sx={{
                    py: { xs: 6, sm: 8, md: 10 },
                    px: { xs: 2, sm: 3, md: 4 },
                    bgcolor: '#f8f9fa'
                }}>
                    <CategoriesGrid categoriesData={categoriesData} />
                </Box>

                <Box sx={{
                    py: { xs: 6, sm: 8, md: 10 },
                    bgcolor: 'white',
                    borderTop: '1px solid #e0e0e0'
                }}>
                    <FeaturedCategories featuredCategories={featuredCategories} />
                </Box>

                <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
                    <Testimonials testimonialsData={testimonialsData} />
                </Box>
            </Container>
        </Box>
    );
}