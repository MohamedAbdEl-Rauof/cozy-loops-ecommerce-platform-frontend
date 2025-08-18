import { FeatureCardsSectionData, FeaturedCategoriesData, ImageWithTextData, StoryFeatureData } from "@/types/about";

export const featureCardsSectionData: FeatureCardsSectionData = {
    sectionTitle: "Why Choose Cozy Loops?",
    sectionDescription: "Browse pieces picked to match your style and story",
    cards: [
        {
            imageUrl: "/images/shared/hand-made.png",
            title: "100% Handmade with Heart",
            description: "",
        },
        {
            imageUrl: "/images/shared/secure-shield.png",
            title: "Ethically Sourced & Fair to Makers",
            description: "",
        },
        {
            imageUrl: "/images/shared/gift.png",
            title: "Customizable & Personal Gifts",
            description: "",
        },
        {
            imageUrl: "/images/shared/working-woman.png",
            title: "Community-Driven and Woman-Led",
            description: "",
        }
    ]
};

export const missionData: ImageWithTextData = {
    title: "Our Mission",
    description: "To celebrate the art of handmade creation by supporting independent makers and bringing soulful, meaningful products into everyday life.",
    imageSrc: "/images/shared/ImageWithText1.jpg",
    imageAlt: "Our Mission",
    flipContent: true,
    imageWidth: { xs: '100%', sm: '90%', md: '80%', lg: '75%' },
    imageHeight: { xs: '300px', sm: '400px', md: '500px', lg: '600px' }
};

export const madeInEgyptData: ImageWithTextData = {
    title: "Made in Egypt",
    description: "Every Cozy Loops piece is handmade with care and cultural roots—supporting a vibrant community of local makers and storytellers with every purchase.",
    imageSrc: "/images/shared/ImageWithText2.jpg",
    imageAlt: "Made in Egypt",
    flipContent: false,
    imageWidth: { xs: '100%', sm: '90%', md: '80%', lg: '75%' },
    imageHeight: { xs: '300px', sm: '400px', md: '500px', lg: '600px' }
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
    image: "/images/shared/featuredAbout.jpg",
    description: "We love hearing from our community.",
    ctaText: "",
    buttonText: "Contact Us",
    buttonLink: "#",
};