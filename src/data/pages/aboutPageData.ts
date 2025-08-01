import { FeatureCardsSectionData, FeaturedCategoriesData, ImageWithTextData, StoryFeatureData } from "@/types/about";

export const featureCardsSectionData: FeatureCardsSectionData = {
    sectionTitle: "Why Choose Cozy Loops?",
    sectionDescription: "Browse pieces picked to match your style and story",
    cards: [
        {
            imageUrl: "/images/shared/hand-made.png",
            title: "100% Handmade with Heart",
            description: "Every piece is carefully crafted by skilled artisans who pour their passion into creating unique, high-quality items.",
        },
        {
            imageUrl: "/images/shared/secure-shield.png",
            title: "Ethically Sourced & Fair to Makers",
            description: "We ensure fair compensation for our artisans and use responsibly sourced materials.",
        },
        {
            imageUrl: "/images/shared/gift.png",
            title: "Customizable & Personal Gifts",
            description: "Make it truly yours with personalization options that create meaningful gifts.",
        },
        {
            imageUrl: "/images/shared/working-woman.png",
            title: "Community-Driven and Woman-Led",
            description: "Supporting a vibrant network of female entrepreneurs building their dreams.",
        }
    ]
};

export const missionData: ImageWithTextData = {
    title: "Our Mission",
    description: "To celebrate the art of handmade creation by supporting independent makers and bringing soulful, meaningful products into everyday life.",
    imageSrc: "/images/shared/ImageWithText1.png",
    imageAlt: "Our Mission",
    flipContent: false,
    imageWidth: { xs: '100%', sm: '80%', md: '90%', lg: '100%' },
    imageHeight: { xs: '400px', sm: '700px', md: '1000px', lg: '1100px' }
};

export const madeInEgyptData: ImageWithTextData = {
    title: "Made in Egypt (and Beyond)",
    description: "Every Cozy Loops piece is handmade with care and cultural roots—supporting a vibrant community of local makers and storytellers with every purchase.",
    imageSrc: "/images/shared/ImageWithText2.png",
    imageAlt: "Made in Egypt",
    flipContent: true,
    imageWidth: { xs: '100%', sm: '80%', md: '65%', lg: '70%' },
    imageHeight: { xs: '350px', sm: '380px', md: '500px', lg: '700px' }
};

export const storyFeatureData: StoryFeatureData = {
    title: "Meet the Makers",
    description: "We proudly work with independent artisans—many of them women, small business owners, and traditional crafters—who pour their love into every piece they create.",
    buttonText: "Explore Artisan Stories",
    imageSrc: "/images/shared/storyFeatureAbout.png",
    imageAlt: "Meet the Makers",
    onButtonClick: "#",
    badge: "Meet Maker"
};

export const featuredCategoriesData: FeaturedCategoriesData = {
    title: "Have a Question or Want to Collaborate?",
    isTitleCenter: false,
    image: "/images/shared/featuredCategory.jpg",
    description: "We love hearing from our community.",
    ctaText: "",
    buttonText: "Contact Us",
    buttonLink: "#",
};