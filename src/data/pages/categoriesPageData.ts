export interface ImageWithTextData {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    flipContent: boolean;
    imageWidth: { xs: string; sm: string; md: string; lg: string };
    imageHeight: { xs: string; sm: string; md: string; lg: string };
    buttonText?: string;
    buttonLink?: string;
    onButtonClick?: () => void;
}

export interface FeaturedCategoriesData {
    title: string;
    isTitleCenter: boolean;
    image: string;
    description: string;
    ctaText: string;
    buttonText: string;
    buttonLink: string;
}

export const heroSectionData: ImageWithTextData = {
    title: "Find Your Favorite Craft",
    description: "Browse through a world of handmade wonders, each with its own texture, soul, and story. Discover unique pieces crafted by talented artisans from around the world.",
    imageSrc: "/images/shared/mainCategoriesImage.jpg",
    imageAlt: "Find Your Favorite Craft - Handmade Items Collection",
    flipContent: true,
    imageWidth: { xs: '100%', sm: '80%', md: '90%', lg: '100%' },
    imageHeight: { xs: '300px', sm: '400px', md: '550px', lg: '650px' },
    buttonText: "Explore All Categories"
};

export const featuredCategoriesData: FeaturedCategoriesData = {
    title: "Creating jewelry inspired by tradition.",
    isTitleCenter: false,
    description: "Discover the stories behind our talented makers.",
    ctaText: "Featured Maker",
    image: "/images/shared/featuredCategories.jpg",
    buttonText: "View Profile",
    buttonLink: "#"
};

export const categoriesGridData = {
    title: "Explore Our Categories",
    description: "Discover unique handcrafted items across various categories, each telling its own story. From traditional crafts to modern designs, find the perfect piece that speaks to you.",
    emptyStateTitle: "No Categories Available",
    emptyStateDescription: "We're currently updating our categories. Please check back soon for our amazing collection of handmade items.",
    loadingText: "Loading categories..."
};

export const pageStructure = {
    sections: {
        hero: {
            id: "hero-section",
            ariaLabel: "Categories page hero section"
        },
        categoriesGrid: {
            id: "categories-grid",
            ariaLabel: "Browse all categories"
        },
        featuredMaker: {
            id: "featured-maker",
            ariaLabel: "Featured maker spotlight"
        }
    }
};