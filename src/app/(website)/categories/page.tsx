'use client';

import {Refresh} from "@mui/icons-material";
import {Alert, Box, CircularProgress, Container, Typography} from "@mui/material";
import {useRef, useCallback, useMemo} from "react";

import ImageWithText from "@/components/about/ImageWithText";
import CategoriesGrid from "@/components/shared/CategoriesGrid";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import {
    heroSectionData,
    featuredCategoriesData,
    categoriesGridData,
    pageStructure,
} from "@/data/pages/categoriesPageData";
import {useCategories} from "@/hooks/useCategories";
import {Category} from "@/types/category";

const LoadingState = () => (
    <Box
        component="main"
        sx={{
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            gap: 2
        }}
        role="status"
        aria-label="Loading categories"
    >
        <CircularProgress
            size={60}
            sx={{color: '#FF7043'}}
            aria-label="Loading spinner"
        />
        <Typography
            variant="body1"
            color="text.secondary"
            sx={{mt: 2}}
        >
            {categoriesGridData.loadingText}
        </Typography>
    </Box>
);

const ErrorState = ({error, onRetry}: { error: unknown; onRetry: () => void }) => (
    <Box component="main" sx={{bgcolor: 'white', p: 4}}>
        <Container maxWidth="md">
            <Alert
                severity="error"
                sx={{mb: 4}}
                action={
                    <Box
                        component="button"
                        onClick={onRetry}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            background: 'none',
                            border: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            '&:hover': {opacity: 0.8}
                        }}
                        aria-label="Retry loading categories"
                    >
                        <Refresh fontSize="small"/>
                        Retry
                    </Box>
                }
            >
                <Typography variant="h6" gutterBottom>
                    Unable to load categories
                </Typography>
                <Typography variant="body2">
                    {error instanceof Error ? error.message : 'An unexpected error occurred while fetching categories. Please try again.'}
                </Typography>
            </Alert>
        </Container>
    </Box>
);

const EmptyState = () => (
    <Box
        sx={{
            textAlign: 'center',
            py: 8,
            px: 4
        }}
    >
        <Typography
            variant="h5"
            gutterBottom
            sx={{color: '#333', fontWeight: 600}}
        >
            {categoriesGridData.emptyStateTitle}
        </Typography>
        <Typography
            variant="body1"
            color="text.secondary"
            sx={{maxWidth: '500px', mx: 'auto'}}
        >
            {categoriesGridData.emptyStateDescription}
        </Typography>
    </Box>
);

export default function Categories() {
    const categoriesGridRef = useRef<HTMLDivElement>(null);

    const {
        data: categories = [],
        isLoading: loading,
        error,
        refetch
    } = useCategories();

    const scrollToCategoriesGrid = useCallback(() => {
        if (categoriesGridRef.current) {
            categoriesGridRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, []);

    const enhancedHeroData = useMemo(() => ({
        ...heroSectionData,
        onButtonClick: scrollToCategoriesGrid,
        buttonText: heroSectionData.buttonText || 'Explore Categories',
        buttonLink: heroSectionData.buttonLink || '#categories-grid'
    }), [scrollToCategoriesGrid]);

    const transformedCategoriesData = useMemo(() => ({
        ...categoriesGridData,
        categories: categories.map((category: Category) => ({
            ...category,
            id: category._id,
            title: category.name,
            description: category.description || `Discover beautiful ${category.name.toLowerCase()} crafted by talented artisans`,
            image: category.image || "/images/categories/default-category.png",
            buttonText: category.buttonText || `Shop ${category.name}`,
            isMaker: false,
            buttonLink: `/categories/${category.slug}`,
        }))
    }), [categories]);

    const handleRetry = useCallback(() => {
        refetch();
    }, [refetch]);

    if (loading) {
        return <LoadingState/>;
    }

    if (error) {
        return <ErrorState error={error} onRetry={handleRetry}/>;
    }

    return (
        <Box
            component="main"
            sx={{bgcolor: 'white'}}
            role="main"
            aria-label="Categories page"
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
                    px: {xs: 2, sm: 3, md: 4, lg: 6},
                    mx: 'auto',
                }}
            >
                <Box
                    sx={{
                        mb: {xs: 4, sm: 6, md: 8, lg: 10},
                        pt: {xs: 2, sm: 3, md: 4, lg: 6}
                    }}
                    id={pageStructure.sections.hero.id}
                    aria-label={pageStructure.sections.hero.ariaLabel}
                >
                    <ImageWithText dataContent={enhancedHeroData}/>
                </Box>

                <Box
                    ref={categoriesGridRef}
                    sx={{mb: {xs: 4, sm: 6, md: 8, lg: 10}}}
                    id={pageStructure.sections.categoriesGrid.id}
                    aria-label={pageStructure.sections.categoriesGrid.ariaLabel}
                >
                    {categories.length > 0 ? (
                        <CategoriesGrid
                            categoriesData={transformedCategoriesData}
                        />
                    ) : (
                        <EmptyState/>
                    )}
                </Box>

                <Container
                    maxWidth={false}
                    sx={{
                        maxWidth: {
                            xs: '100%',
                            sm: '100%',
                            md: '1200px',
                            lg: '1400px',
                            xl: '1600px'
                        },
                        px: {xs: 2, sm: 3, md: 4, lg: 6},
                        mx: 'auto',
                    }}
                >
                    <Box
                        sx={{pb: {xs: 4, sm: 6, md: 8, lg: 10}}}
                        id={pageStructure.sections.featuredMaker.id}
                        aria-label={pageStructure.sections.featuredMaker.ariaLabel}
                    >
                        <FeaturedCategories featuredCategories={featuredCategoriesData}/>
                    </Box>
                </Container>
            </Container>
        </Box>
    );
}