
export interface FeatureCard {
    imageUrl: string;
    title: string;
    description: string;
}

export interface FeatureCardsSectionData {
    sectionTitle: string;
    sectionDescription: string;
    cards: FeatureCard[];
}

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

export interface ImageWithTextProps {
    dataContent: ImageWithTextData;
}

export interface StoryFeatureData {
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    imageAlt: string;
    onButtonClick: string;
    badge: string;
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