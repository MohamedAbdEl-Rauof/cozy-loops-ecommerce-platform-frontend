import { Testimonial } from "./Testimonial";

import type { FeaturedCategoriesData } from "@/data/pages/categoriesPageData";

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

export interface TestimonialsData {
  title: string;
  description: string;
  items: Testimonial[];
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
    md: '1300px',
    lg: '1400px',
    xl: '1600px'
  },
  px: { xs: 2, sm: 3, md: 4, lg: 6 },
};

export const heroBackgroundGradient = 'linear-gradient(135deg, #FBE8CC 0%, #FFF3E0 100%)';

export const sectionPadding = { xs: 6, md: 8 };