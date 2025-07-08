'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Box, Container, CircularProgress, Alert } from '@mui/material';
import { useCategoryStore } from '@/store/categoryStore';
import SmallNavbar from "@/components/shared/SmallNavbar";
import StoryFeature from "@/components/shared/StoryFeature";
import ProductsOfCategory from "@/components/shared/ProductsOfCategory";
import CategoriesGrid from "@/components/shared/CategoriesGrid";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import Testimonials from "@/components/shared/Testimonials";

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const productsGridRef = useRef<HTMLDivElement>(null);

    const scrollToCategoriesGrid = () => {
        if (productsGridRef.current) {
            productsGridRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    const {
        selectedCategory,
        loading,
        error,
        fetchCategoryBySlug
    } = useCategoryStore();

    useEffect(() => {
        console.log('Effect running with slug:', slug);
        if (slug) {
            fetchCategoryBySlug(slug);
        }
    }, [slug, fetchCategoryBySlug]);

    console.log('Component render - loading:', loading, 'error:', error, 'selectedCategory:', selectedCategory);

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
                        {error}
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
                        Category not found - Debug info: loading={String(loading)}, error={error || 'null'}, selectedCategory={selectedCategory ? 'exists' : 'null'}
                    </Alert>
                </Container>
            </Box>
        );
    }

    const Products = {
        title: "Handcrafted Punch Needle Collection",
        description: "Discover our curated selection of premium punch needle supplies and artisan-made pieces, perfect for every skill level.",
        productsData: [
            {
                id: '1',
                title: 'Beginner Punch Needle Kit',
                image: '/images/categories.png',
                price: 29.99
            },
            {
                id: '2',
                title: 'Premium Wool Yarn Set',
                image: '/images/categories.png',
                price: 45.99
            },
            {
                id: '3',
                title: 'Adjustable Punch Needle',
                image: '/images/categories.png',
                price: 24.99
            },
            {
                id: '4',
                title: 'Embroidery Hoop Set',
                image: '/images/categories.png',
                price: 18.99
            },
            {
                id: '5',
                title: 'Pattern Collection Book',
                image: '/images/categories.png',
                price: 32.99
            },
            {
                id: '6',
                title: 'Monk\'s Cloth Fabric',
                image: '/images/categories.png',
                price: 15.99
            },
            {
                id: '7',
                title: 'Deluxe Starter Bundle',
                image: '/images/categories.png',
                price: 89.99
            },
            {
                id: '8',
                title: 'Metallic Thread Collection',
                image: '/images/categories.png',
                price: 28.99
            },
            {
                id: '9',
                title: 'Advanced Pattern Set',
                image: '/images/categories.png',
                price: 42.99
            }
        ]
    }

    const categoriesData = {
        title: `Meet the ${selectedCategory.name} Artisans`,
        description: "Meet the talented artisans who bring creativity and passion to every stitch, each with their own unique story and artistic vision.",
        categories: [
            {
                id: "1",
                title: "Nour from Mansoura",
                description: "I see color as emotion—and every loop tells a feeling.",
                image: "/images/shared/makers/makerNoura.png",
                isMaker: true,
                buttonText: "View Profile",
                buttonLink: "/makers/nour",
                slug: "nour-mansoura"
            },
            {
                id: "2",
                title: "Khaled from Alexandria",
                description: `"${selectedCategory.name} gave me a new voice—each design is a rhythm in thread."`,
                image: "/images/shared/makers/makerKhaled.png",
                isMaker: true,
                buttonText: "View Profile",
                buttonLink: "/makers/khaled",
                slug: "khaled-alexandria"
            },
            {
                id: "3",
                title: "Rania from Giza",
                description: "Inspired by nature and folk tales, I create joy in every stitch.",
                image: "/images/shared/makers/makerRania.png",
                isMaker: true,
                buttonText: "View Profile",
                buttonLink: "/makers/rania",
                slug: "rania-giza"
            },
        ]
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
        title: "Why Shoppers Love Our Loops",
        description: "From thoughtful gifts to home highlights, our customers can't get enough of the charm and quality behind each handmade loop.",
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
                    <ProductsOfCategory Products={Products} onAddToCart={() => { }} />
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