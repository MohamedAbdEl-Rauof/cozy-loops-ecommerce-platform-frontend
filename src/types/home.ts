export interface FeaturedCategoriesData {
  title: string;
  isTitleCenter: boolean;
  description: string;
  image: string;
  ctaText: string;
  buttonText: string;
  buttonLink: string;
}

export interface FeaturedCategoriesProps {
    featuredCategories: FeaturedCategoriesData;
}

export interface StoryFeatureData {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  onButtonClick: string;
  badge: string;
  reverse?: boolean;
}

export interface TestimonialItem {
  id: string | number;
  comment: string;
  rating: number;
  date?: string;

  user?: {
    name: string;
    avatar?: string;
  };
}

export interface TestimonialsData {
  title: string;
  description: string;
  items: TestimonialItem[];
}

export interface CraftCategory {
  id: string | number;
  name: string;
  description: string;
  image: string;
  fallbackImage: string;
  link: string;
}

export interface ShopByCraftProps {
  craftCategories: CraftCategory[];
}

export interface ContainerConfig {
  maxWidth: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  px: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
}

export const containerConfig: ContainerConfig = {
  maxWidth: {
    xs: '100%',
    sm: '100%',
    md: '1400px',
    lg: '1600px',
    xl: '1850px'
  },
  px: { xs: 2, sm: 3, md: 4, lg: 6 },
};

export const heroBackgroundGradient = 'linear-gradient(135deg, #FBE8CC 0%, #FFF3E0 100%)';

export const sectionPadding = { xs: 6, md: 8 };