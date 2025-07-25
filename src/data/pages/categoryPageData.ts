export interface CategoryPageMetadata {
    titleTemplate: string;
    descriptionTemplate: string;
    keywords: string[];
}

export interface StoryFeatureData {
    badge: string;
    fallbackTitle: string;
    fallbackDescription: string;
    fallbackButtonText: string;
    fallbackImage: string;
    imageAltTemplate: string;
}

export interface CategoriesGridData {
    titleTemplate: string;
    description: string;
    fallbackMakerDescription: string;
    defaultMakerImage: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
}

export interface FeaturedCategoriesData {
    title: string;
    isTitleCenter: boolean;
    description: string;
    image: string;
    ctaText: string;
    buttonText: string;
    buttonLink: string;
}

export interface TestimonialsData {
    title: string;
    description: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
    loadingText: string;
    errorText: string;
}

export interface ProductsSectionData {
    titleTemplate: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
    defaultProductImage: string;
}

export interface NavigationData {
    categoryLabel: string;
}

export interface ErrorMessages {
    categoryNotFound: string;
    dataFetchError: string;
    loadingText: string;
    retryText: string;
    generalError: string;
}

export const categoryPageMetadata: CategoryPageMetadata = {
    titleTemplate: "{categoryName} - Handmade Collection | Cozy Loops",
    descriptionTemplate: "Discover beautiful handmade {categoryName} crafted by talented artisans. Shop unique, authentic pieces with cultural heritage and personal stories.",
    keywords: ["handmade", "artisan", "crafts", "unique", "authentic", "cultural", "heritage", "traditional", "contemporary"]
};

export const storyFeatureData: StoryFeatureData = {
    badge: "Featured Category",
    fallbackTitle: "Handcrafted Collection",
    fallbackDescription: "Discover our beautiful handcrafted collection, where each piece tells a unique story of artisan craftsmanship and cultural heritage.",
    fallbackButtonText: "Shop Collection",
    fallbackImage: "/images/shared/default-category-hero.jpg",
    imageAltTemplate: "Beautiful {categoryName} artwork showcasing vibrant textures and artisan craftsmanship"
};

export const categoriesGridData: CategoriesGridData = {
    titleTemplate: "Meet the {categoryName} Artisans",
    description: "Meet the talented artisans who bring creativity and passion to every piece, each with their own unique story and artistic vision.",
    fallbackMakerDescription: "Creating beautiful handcrafted pieces with passion, dedication, and years of traditional expertise.",
    defaultMakerImage: "/images/shared/makers/defaultMaker.png",
    emptyStateTitle: "No Artisans Available",
    emptyStateDescription: "We're currently working with artisans to bring you amazing {categoryName} pieces. Check back soon for updates!"
};

export const featuredCategoriesData: FeaturedCategoriesData = {
    title: "Meet Fatma from Cairo – Creating jewelry inspired by tradition",
    isTitleCenter: false,
    description: "Discover the inspiring stories of our featured artisans and their journey in preserving traditional craftsmanship while creating contemporary masterpieces.",
    image: "/images/shared/featured-artisan.jpg",
    ctaText: "Featured Artisan",
    buttonText: "View Profile",
    buttonLink: "#"
};

export const testimonialsData: TestimonialsData = {
    title: "What Our Shoppers Are Saying",
    description: "Real words from our beloved Cozy Loops community who have experienced the magic of handmade craftsmanship.",
    emptyStateTitle: "No Reviews Yet",
    emptyStateDescription: "Be the first to share your experience with our {categoryName} collection!",
    loadingText: "Loading customer reviews...",
    errorText: "Unable to load testimonials at this time."
};

export const productsSectionData: ProductsSectionData = {
    titleTemplate: "Best in {categoryName}",
    emptyStateTitle: "No Products Available",
    emptyStateDescription: "We're currently updating our {categoryName} collection. Please check back soon for new arrivals!",
    defaultProductImage: "/images/categories/default-product.png"
};

export const navigationData: NavigationData = {
    categoryLabel: "Category"
};

export const errorMessages: ErrorMessages = {
    categoryNotFound: "The requested category could not be found. It may have been moved or is temporarily unavailable.",
    dataFetchError: "Unable to load category information. Please check your connection and try again.",
    loadingText: "Loading category details...",
    retryText: "Retry",
    generalError: "Something went wrong while loading this page."
};

export const layoutConfig = {
    container: {
        maxWidth: {
            xs: '100%',
            sm: '100%',
            md: '1400px',
            lg: '1600px',
            xl: '1850px'
        },
        padding: 0
    },
    sections: {
        hero: {
            padding: { xs: 0 }
        },
        products: {
            padding: { xs: 4, sm: 6, md: 8 },
            backgroundColor: 'white'
        },
        artisans: {
            padding: { xs: 6, sm: 8, md: 10 },
            innerPadding: { xs: 2, sm: 3, md: 4 },
            backgroundColor: '#f8f9fa'
        },
        featured: {
            padding: { xs: 6, sm: 8, md: 10 },
            backgroundColor: 'white',
            borderTop: '1px solid #e0e0e0'
        },
        testimonials: {
            padding: { xs: 6, md: 8 }
        }
    }
};

export const pageStructure = {
    sections: {
        navigation: {
            id: "category-navigation",
            ariaLabel: "Category navigation breadcrumb"
        },
        hero: {
            id: "category-hero",
            ariaLabel: "Category hero section"
        },
        products: {
            id: "category-products",
            ariaLabel: "Category products showcase"
        },
        artisans: {
            id: "category-artisans",
            ariaLabel: "Featured artisans section"
        },
        featured: {
            id: "featured-maker",
            ariaLabel: "Featured maker spotlight"
        },
        testimonials: {
            id: "customer-testimonials",
            ariaLabel: "Customer testimonials"
        }
    }
};