
'use client';

import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { Box, Container, CircularProgress, Alert, Typography } from '@mui/material';
import { useCategoryBySlug } from '@/hooks/useCategories';
import { useProductsByCategorySlug } from '@/hooks/useProducts';
import SmallNavbar from "@/components/shared/SmallNavbar";
import StoryFeature from "@/components/shared/StoryFeature";
import ProductsOfCategory from "@/components/shared/ProductsOfCategory";
import CategoriesGrid from "@/components/shared/CategoriesGrid";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import Testimonials from "@/components/shared/Testimonials";
import { useTestimonials } from '@/hooks/useTestimonials';
import CategoryStatsCard from '@/components/shared/CategoryStatsCard';

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
        data: testimonialsItems = []
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
                    gap: 2
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
        const errorMessage = categoryError instanceof Error
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
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
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
                        The category "{slug}" doesn't exist or has been removed.
                    </Alert>
                </Container>
            </Box>
        );
    }

    const categoriesData = {
        title: `Meet the ${selectedCategory.name} Artisans`,
        description: "Discover the talented creators behind every handcrafted piece, each bringing their unique story and artistic vision to life.",
        categories: productsData?.products?.reduce((uniqueMakers: any[], product: any) => {
            if (!product.maker) return uniqueMakers;

            const existingMaker = uniqueMakers.find(maker => maker.id === product.maker._id);
            if (!existingMaker) {
                uniqueMakers.push({
                    id: product.maker._id,
                    title: `${product.maker.name}${product.maker.location ? ` from ${product.maker.location}` : ''}`,
                    description: product.maker.message || `Creating beautiful ${selectedCategory.name.toLowerCase()} with passion and dedication.`,
                    image: product.maker.image || "/images/shared/makers/defaultMaker.png",
                    isMaker: true,
                    buttonText: "View Profile",
                    // buttonLink: `/makers/${product.maker.slug}`,
                    buttonLink: "#",    
                    slug: product.maker.slug
                });
            }
            return uniqueMakers;
        }, []) || []
    };

    const featuredCategories = {
        title: `Featured ${selectedCategory.name} Artisan`,
        isTitleCenter: false,
        description: "Discover the story behind the craft",
        image: "/images/shared/productImage.jpg",
        ctaText: "Explore More",
        buttonText: "View Profile",
        buttonLink: categoriesData.categories[0]?.buttonLink || "#"
    };

    const testimonialsData = {
        title: "What Our Community Says",
        description: `Real experiences from customers who love our ${selectedCategory.name.toLowerCase()} collection.`,
        items: testimonialsItems
    };

    const productsConfig = {
        title: `Best in ${selectedCategory.name}`,
        mainSlug: slug,
        productsData: productsData?.products?.map(product => ({
            id: product._id,
            title: product.name,
            image: product.mainImage || product.images?.[0] || '/images/categories.png',
            price: product.price,
            originalPrice: product.priceBeforeDiscount,
            discount: product.discountPercentage,
            slug: product.slug,
            rating: product.averageRating,
            reviewCount: product.numReviews
        })) || []
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
                    title={selectedCategory.heroTitle || `Discover ${selectedCategory.name}`}
                    description={selectedCategory.heroDescription || selectedCategory.description || `Explore our curated collection of handcrafted ${selectedCategory.name.toLowerCase()}`}
                    buttonText={selectedCategory.buttonText || `Shop ${selectedCategory.name}`}
                    imageSrc={selectedCategory.heroImage || selectedCategory.image || '/images/shared/productImage.jpg'}
                    imageAlt={`Beautiful ${selectedCategory.name?.toLowerCase()} collection showcasing artisan craftsmanship`}
                    onButtonClick="#products-section"
                    badge="Featured Collection"
                />

                <CategoryStatsCard
                    categoryName={selectedCategory.name}
                    description={selectedCategory.description || `Explore our curated collection of handcrafted ${selectedCategory.name.toLowerCase()}`} 
                    totalProducts={productsData?.pagination?.totalItems || 0}
                    totalArtisans={categoriesData.categories.length}
                    rating={4.8}
                />

                <Box
                    id="products-section"
                    ref={productsGridRef}
                    sx={{
                        py: { xs: 6, sm: 8, md: 10 },
                        bgcolor: 'white',
                        borderTop: '1px solid #e0e0e0'
                    }}
                >
                    <ProductsOfCategory Products={productsConfig} />
                </Box>

                <Box sx={{
                    bgcolor: '#f8f9fa',
                    position: 'relative'
                }}>
                    <CategoriesGrid categoriesData={categoriesData} />
                </Box>

                {categoriesData.categories.length > 0 && (
                    <Box>
                        <FeaturedCategories featuredCategories={featuredCategories} />
                    </Box>
                )}

                {testimonialsItems.length > 0 && (
                    <Box
                        component="section"
                        sx={{
                            py: { xs: 6, md: 8 },
                            bgcolor: '#f8f9fa',
                            borderTop: '1px solid #e0e0e0'
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